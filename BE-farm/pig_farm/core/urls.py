from django.urls import path
from . import views

# URL patterns
urlpatterns = [
    path("health/", views.api_health, name="api_health"),
    path("medicines/", views.api_medicines, name="api_medicines"),
    path("pigs/", views.api_pigs, name="api_pigs"),
]