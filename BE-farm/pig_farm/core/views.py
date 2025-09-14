from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator
from .sql_models import Medicine, Pig, CmsContentEntry
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
    """API endpoint for medicines"""
    try:
        # Get query parameters
        page = int(request.GET.get('page', 1))
        page_size = int(request.GET.get('page_size', 20))
        search = request.GET.get('search', '')
        published_only = request.GET.get('published', 'true').lower() == 'true'
        
        # Build queryset
        queryset = Medicine.objects.all()
        
        if published_only:
            queryset = queryset.filter(is_published=True)
        
        if search:
            queryset = queryset.filter(name__icontains=search)
        
        # Order by updated_at desc
        queryset = queryset.order_by('-updated_at')
        
        # Paginate
        paginator = Paginator(queryset, page_size)
        page_obj = paginator.get_page(page)
        
        # Serialize data
        medicines = []
        for medicine in page_obj:
            medicines.append({
                'id': medicine.id,
                'name': medicine.name,
                'packaging': medicine.packaging,
                'price_unit': float(medicine.price_unit) if medicine.price_unit else None,
                'price_total': float(medicine.price_total) if medicine.price_total else None,
                'is_published': medicine.is_published,
                'published_at': medicine.published_at.isoformat() if medicine.published_at else None,
                'updated_at': medicine.updated_at.isoformat() if medicine.updated_at else None,
            })
        
        return JsonResponse({
            'status': 'success',
            'data': medicines,
            'pagination': {
                'current_page': page,
                'total_pages': paginator.num_pages,
                'total_items': paginator.count,
                'page_size': page_size,
                'has_next': page_obj.has_next(),
                'has_previous': page_obj.has_previous(),
            }
        })
        
    except Exception as e:
        return JsonResponse({
            'status': 'error',
            'message': str(e)
        }, status=500)

@require_http_methods(["GET"])
def api_pigs(request):
    """API endpoint for pigs"""
    try:
        page = int(request.GET.get('page', 1))
        page_size = int(request.GET.get('page_size', 20))
        search = request.GET.get('search', '')
        published_only = request.GET.get('published', 'true').lower() == 'true'
        
        queryset = Pig.objects.all()
        
        if published_only:
            queryset = queryset.filter(is_published=True)
        
        if search:
            queryset = queryset.filter(name__icontains=search)
        
        queryset = queryset.order_by('-updated_at')
        
        paginator = Paginator(queryset, page_size)
        page_obj = paginator.get_page(page)
        
        pigs = []
        for pig in page_obj:
            pigs.append({
                'id': pig.id,
                'name': pig.name,
                'price': float(pig.price) if pig.price else None,
                'is_published': pig.is_published,
                'published_at': pig.published_at.isoformat() if pig.published_at else None,
                'updated_at': pig.updated_at.isoformat() if pig.updated_at else None,
            })
        
        return JsonResponse({
            'status': 'success',
            'data': pigs,
            'pagination': {
                'current_page': page,
                'total_pages': paginator.num_pages,
                'total_items': paginator.count,
                'page_size': page_size,
                'has_next': page_obj.has_next(),
                'has_previous': page_obj.has_previous(),
            }
        })
        
    except Exception as e:
        return JsonResponse({
            'status': 'error',
            'message': str(e)
        }, status=500)