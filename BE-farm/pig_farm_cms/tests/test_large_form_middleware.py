from __future__ import annotations

from unittest.mock import patch

from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.exceptions import TooManyFieldsSent
from django.test import TestCase, override_settings


@override_settings(
    ROOT_URLCONF="pig_farm_cms.tests.urls",
    DATA_UPLOAD_MAX_NUMBER_FIELDS=200,
    ANONYMOUS_MAX_FORM_FIELDS=20,
    LARGE_FORM_LOG_THRESHOLD=50,
    LARGE_FORM_PROTECTED_PATH_PREFIXES=("/admin/",),
)
class LargeFormMiddlewareTests(TestCase):
    def _build_payload(self, field_count: int) -> dict[str, str]:
        return {f"field_{index}": "value" for index in range(field_count)}

    def test_blocks_anonymous_large_admin_submission(self):
        payload = self._build_payload(settings.ANONYMOUS_MAX_FORM_FIELDS + 1)
        response = self.client.post("/admin/test/", data=payload)
        self.assertEqual(response.status_code, 403)

    def test_allows_authenticated_large_submission(self):
        user_model = get_user_model()
        user = user_model.objects.create_user(
            username="editor",
            email="editor@example.com",
            password="test-pass-123",
            is_staff=True,
        )
        self.client.force_login(user)

        payload = self._build_payload(settings.ANONYMOUS_MAX_FORM_FIELDS + 5)
        response = self.client.post("/admin/test/", data=payload)
        self.assertEqual(response.status_code, 200)

    def test_logs_when_threshold_reached(self):
        user_model = get_user_model()
        user = user_model.objects.create_user(
            username="logger",
            email="logger@example.com",
            password="test-pass-123",
            is_staff=True,
        )
        self.client.force_login(user)

        payload = self._build_payload(settings.LARGE_FORM_LOG_THRESHOLD)
        with self.assertLogs("pig_farm.security", level="INFO") as logs:
            response = self.client.post("/admin/test/", data=payload)

        self.assertEqual(response.status_code, 200)
        self.assertTrue(
            any("Large form submission detected" in message for message in logs.output),
            msg="Expected info log when large form threshold is reached.",
        )

    def test_logs_when_limit_is_exceeded(self):
        payload = self._build_payload(15)
        from pig_farm_cms.middleware import LargeFormSubmissionControlMiddleware

        with patch.object(
            LargeFormSubmissionControlMiddleware,
            "_count_fields",
            side_effect=TooManyFieldsSent("test"),
        ):
            with self.assertLogs("pig_farm.security", level="WARNING") as logs:
                response = self.client.post("/admin/test/", data=payload)

        self.assertEqual(response.status_code, 400)

        self.assertTrue(
            any("with too many fields" in message for message in logs.output),
            msg="Expected warning log when the upload limit is exceeded.",
        )
