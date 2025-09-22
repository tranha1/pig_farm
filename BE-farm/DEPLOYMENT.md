# Deployment

The Wagtail backend ships with multiple Django settings modules for different purposes. **Only `pig_farm_cms.settings.production` must be used for any live or customer-facing environment.**

Set the `DJANGO_SETTINGS_MODULE` environment variable to `pig_farm_cms.settings.production` for production deployments and ensure the `DJANGO_ENV` environment variable is set to `production` so that development-only settings cannot be imported accidentally.

Other settings modules (such as `pig_farm_cms.settings.dev`) are intended strictly for local development and require additional environment variables like `DJANGO_SECRET_KEY` to be configured when used.
