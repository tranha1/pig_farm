import os

from django.core.exceptions import ImproperlyConfigured

from .base import *


if os.environ.get("DJANGO_ENV") not in (None, "", "development"):
    raise ImproperlyConfigured(
        "pig_farm_cms.settings.dev should not be imported outside of a development environment."
    )

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY")
if not SECRET_KEY:
    raise ImproperlyConfigured(
        "DJANGO_SECRET_KEY must be set when using pig_farm_cms.settings.dev."
    )

# SECURITY WARNING: define the correct hosts in production!
ALLOWED_HOSTS = ["localhost", "127.0.0.1", "[::1]"]

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"


try:
    from .local import *
except ImportError:
    pass
