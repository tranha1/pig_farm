from django.apps import AppConfig


class HomeConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "home"

    def ready(self) -> None:  # pragma: no cover - startup wiring
        # Import signal handlers that harden document uploads.
        from . import signals  # noqa: F401
