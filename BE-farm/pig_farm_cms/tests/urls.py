from django.http import HttpResponse
from django.urls import path


def admin_echo_view(request):
    """Simple view used for exercising middleware behaviour in tests."""

    return HttpResponse("ok")


urlpatterns = [
    path("admin/test/", admin_echo_view, name="middleware-test-admin"),
]
