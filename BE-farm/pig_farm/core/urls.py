from django.urls import path
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

@require_http_methods(["GET"])
def api_health(request):
    """Health check endpoint"""
    return JsonResponse({
        "status": "ok", 
        "service": "pig_farm_api",
        "version": "1.0.0"
    })

@require_http_methods(["GET"])
def api_medicines(request):
    """API endpoint for medicines (placeholder)"""
    # TODO: Implement actual medicine listing from SQL
    return JsonResponse({
        "message": "Medicines API coming soon",
        "count": 0,
        "results": []
    })

@require_http_methods(["GET"])
def api_pigs(request):
    """API endpoint for pigs (placeholder)"""
    # TODO: Implement actual pig listing from SQL
    return JsonResponse({
        "message": "Pigs API coming soon", 
        "count": 0,
        "results": []
    })

# URL patterns
urlpatterns = [
    path("health/", api_health, name="api_health"),
    path("medicines/", api_medicines, name="api_medicines"),
    path("pigs/", api_pigs, name="api_pigs"),
]