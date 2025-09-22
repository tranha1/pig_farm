from __future__ import annotations

from django.conf import settings
from wagtail import hooks
from wagtail.admin.ui.components import Component


class DocumentPolicyPanel(Component):
    order = 100
    template_name = "home/admin/document_policy_panel.html"

    def get_context_data(self, parent_context):
        allowed_extensions = ", ".join(sorted(settings.WAGTAILDOCS_EXTENSIONS))
        return {
            "allowed_extensions": allowed_extensions,
            "archive_scan_enabled": bool(settings.DOCUMENT_ARCHIVE_SCAN_COMMAND),
        }


@hooks.register("construct_homepage_panels")
def add_document_policy_panel(request, panels):
    """Surface secure upload guidance to content editors."""

    panels.append(DocumentPolicyPanel())
