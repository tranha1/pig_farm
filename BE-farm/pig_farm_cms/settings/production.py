import os

from .base import *


def _get_bool_from_env(var_name: str, default: bool) -> bool:
    """Return a boolean from an environment variable."""

    value = os.environ.get(var_name)
    if value is None:
        return default

    return value.strip().lower() in {"1", "true", "yes", "on"}


def _get_int_from_env(var_name: str, default: int) -> int:
    """Return an integer from an environment variable."""

    value = os.environ.get(var_name)
    if value is None or value.strip() == "":
        return default

    try:
        return int(value)
    except ValueError as exc:
        raise ValueError(f"{var_name} must be an integer if set.") from exc

DEBUG = False

# ManifestStaticFilesStorage is recommended in production, to prevent
# outdated JavaScript / CSS assets being served from cache
# (e.g. after a Wagtail upgrade).
# See https://docs.djangoproject.com/en/5.2/ref/contrib/staticfiles/#manifeststaticfilesstorage
STORAGES["staticfiles"]["BACKEND"] = "django.contrib.staticfiles.storage.ManifestStaticFilesStorage"

SECURE_SSL_REDIRECT = _get_bool_from_env("SECURE_SSL_REDIRECT", True)
SESSION_COOKIE_SECURE = _get_bool_from_env("SESSION_COOKIE_SECURE", True)
CSRF_COOKIE_SECURE = _get_bool_from_env("CSRF_COOKIE_SECURE", True)
SECURE_CONTENT_TYPE_NOSNIFF = _get_bool_from_env("SECURE_CONTENT_TYPE_NOSNIFF", True)
SECURE_REFERRER_POLICY = os.environ.get(
    "SECURE_REFERRER_POLICY", "strict-origin-when-cross-origin"
)

SECURE_HSTS_SECONDS = _get_int_from_env("SECURE_HSTS_SECONDS", 31_536_000)
SECURE_HSTS_INCLUDE_SUBDOMAINS = _get_bool_from_env(
    "SECURE_HSTS_INCLUDE_SUBDOMAINS", SECURE_HSTS_SECONDS > 0
)
SECURE_HSTS_PRELOAD = _get_bool_from_env(
    "SECURE_HSTS_PRELOAD",
    SECURE_HSTS_INCLUDE_SUBDOMAINS and SECURE_HSTS_SECONDS >= 31_536_000,
)

try:
    from .local import *
except ImportError:
    pass
