"""Custom middleware for managing large form submissions."""

from __future__ import annotations

import logging
from typing import Iterable

from django.conf import settings
from django.core.exceptions import TooManyFieldsSent
from django.http import HttpResponseForbidden


class LargeFormSubmissionControlMiddleware:
    """Log and restrict unusually large form submissions.

    Django applies :setting:`DATA_UPLOAD_MAX_NUMBER_FIELDS` globally, which means that
    increasing it to support the Wagtail admin also affects anonymous endpoints. This
    middleware adds authentication requirements for anonymous users that attempt to submit
    very large payloads, and instruments submissions so operations teams can monitor them.
    """

    request_methods: Iterable[str] = ("POST", "PUT", "PATCH")

    def __init__(self, get_response):
        self.get_response = get_response
        self.logger = logging.getLogger("pig_farm.security")

    def __call__(self, request):
        if request.method in self.request_methods:
            user = getattr(request, "user", None)
            try:
                total_fields = self._count_fields(request)
            except TooManyFieldsSent:
                self.logger.warning(
                    "Rejected %s request to %s with too many fields (limit=%s) from %s",
                    request.method,
                    request.path,
                    settings.DATA_UPLOAD_MAX_NUMBER_FIELDS,
                    request.META.get("REMOTE_ADDR", "unknown"),
                )
                raise

            if total_fields >= settings.LARGE_FORM_LOG_THRESHOLD:
                self.logger.info(
                    "Large form submission detected: %s fields on %s request to %s (authenticated=%s)",
                    total_fields,
                    request.method,
                    request.path,
                    getattr(user, "is_authenticated", False),
                )

            if (
                total_fields > settings.ANONYMOUS_MAX_FORM_FIELDS
                and not getattr(user, "is_authenticated", False)
                and self._is_protected_path(request.path)
            ):
                self.logger.warning(
                    "Blocked anonymous large form submission: %s fields on %s request to %s from %s",
                    total_fields,
                    request.method,
                    request.path,
                    request.META.get("REMOTE_ADDR", "unknown"),
                )
                return HttpResponseForbidden("Too many form fields submitted.")

        response = self.get_response(request)
        return response

    @staticmethod
    def _is_protected_path(path: str) -> bool:
        return any(
            path.startswith(prefix) for prefix in settings.LARGE_FORM_PROTECTED_PATH_PREFIXES
        )

    @staticmethod
    def _count_fields(request) -> int:
        post_field_count = sum(len(values) for _, values in request.POST.lists())
        file_field_count = sum(len(values) for _, values in request.FILES.lists())
        return post_field_count + file_field_count
