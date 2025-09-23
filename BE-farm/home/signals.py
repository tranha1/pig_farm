from __future__ import annotations

import logging
import shutil
import subprocess
import tempfile
from pathlib import Path, PurePosixPath
from zipfile import BadZipFile, ZipFile

from django.conf import settings
from django.core.exceptions import ValidationError
from django.db.models.signals import pre_save
from django.dispatch import receiver

from wagtail.documents import get_document_model

logger = logging.getLogger(__name__)

ARCHIVE_EXTENSIONS = {"zip"}
ALLOWED_DOCUMENT_EXTENSIONS = {
    ext.lower() for ext in getattr(settings, "WAGTAILDOCS_EXTENSIONS", [])
}


@receiver(pre_save, sender=get_document_model())
def validate_document_archives(sender, instance, **kwargs):
    """Ensure archive uploads are unpacked and validated before saving."""

    file_field = getattr(instance, "file", None)
    if not file_field:
        return

    extension = Path(file_field.name).suffix.lower().lstrip(".")
    if extension not in ARCHIVE_EXTENSIONS:
        return

    start_position = _rewind(file_field)
    try:
        _validate_zip_archive(file_field)
    finally:
        _restore(file_field, start_position)


def _rewind(file_obj):
    try:
        position = file_obj.tell()
    except (AttributeError, OSError, ValueError):
        position = None
    try:
        file_obj.seek(0)
    except (AttributeError, OSError, ValueError):
        logger.debug("Unable to rewind file pointer for %s", getattr(file_obj, "name", "document"))
    return position


def _restore(file_obj, position):
    if position is None:
        return
    try:
        file_obj.seek(position)
    except (AttributeError, OSError, ValueError):
        logger.debug("Unable to restore file pointer for %s", getattr(file_obj, "name", "document"))


def _validate_zip_archive(file_obj):
    try:
        with ZipFile(file_obj) as archive:
            members = archive.infolist()
            if not members:
                raise ValidationError(
                    "Uploaded archive is empty. Please include one or more supported documents."
                )

            for member in members:
                if member.is_dir():
                    continue
                _validate_member_metadata(member)
                _maybe_scan_member(archive, member)
    except BadZipFile as exc:
        raise ValidationError("Uploaded archive is not a valid ZIP file.") from exc


def _validate_member_metadata(member):
    filename = member.filename
    if _path_is_unsafe(filename):
        raise ValidationError(
            "Archive contains files with unsafe paths. Remove items that use absolute paths or '..'."
        )

    extension = Path(filename).suffix.lower().lstrip(".")
    if extension not in ALLOWED_DOCUMENT_EXTENSIONS:
        allowed = ", ".join(sorted(ALLOWED_DOCUMENT_EXTENSIONS))
        raise ValidationError(
            f"Archive contains unsupported file type '{extension}'. Allowed types: {allowed}."
        )

    max_member_size = getattr(settings, "DOCUMENT_ARCHIVE_MAX_MEMBER_SIZE", None)
    if max_member_size and member.file_size > max_member_size:
        raise ValidationError(
            f"Archive member '{filename}' exceeds the maximum size of {max_member_size // (1024 * 1024)}MB."
        )

    ratio_limit = getattr(settings, "DOCUMENT_ARCHIVE_MAX_COMPRESSION_RATIO", None)
    if ratio_limit and member.compress_size:
        compression_ratio = member.file_size / max(member.compress_size, 1)
        if compression_ratio > ratio_limit:
            raise ValidationError(
                f"Archive member '{filename}' is overly compressed (ratio {compression_ratio:.0f}:1)."
            )


def _maybe_scan_member(archive: ZipFile, member):
    command = getattr(settings, "DOCUMENT_ARCHIVE_SCAN_COMMAND", None)
    success_codes = getattr(settings, "DOCUMENT_ARCHIVE_SCAN_SUCCESS_CODES", {0})
    if not command:
        return

    with archive.open(member) as extracted, tempfile.NamedTemporaryFile(
        suffix=Path(member.filename).suffix or ""
    ) as temp_file:
        shutil.copyfileobj(extracted, temp_file)
        temp_file.flush()

        run_command = [
            part.replace("{file}", temp_file.name)
            for part in command
        ]
        result = subprocess.run(
            run_command,
            capture_output=True,
            text=True,
        )
        if result.returncode not in success_codes:
            logger.warning(
                "Archive virus scan failed for %%s: %%s", member.filename, result.stderr.strip()
            )
            raise ValidationError(
                "Archive failed antivirus scanning. Please remove infected files and try again."
            )


def _path_is_unsafe(filename: str) -> bool:
    path = PurePosixPath(filename.replace("\\", "/"))
    if path.is_absolute():
        return True
    return any(part in {"..", ""} for part in path.parts)
