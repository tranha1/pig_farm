from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.translation import activate, get_language
from django.conf import settings
import json


@csrf_exempt
def set_language(request):
    """
    API endpoint to set the language preference
    """
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            language = data.get('language', 'vi')
            
            # Validate language
            if language in dict(settings.LANGUAGES):
                activate(language)
                request.session['django_language'] = language
                
                return JsonResponse({
                    'success': True,
                    'language': language,
                    'message': f'Language set to {language}'
                })
            else:
                return JsonResponse({
                    'success': False,
                    'error': 'Invalid language code'
                }, status=400)
                
        except json.JSONDecodeError:
            return JsonResponse({
                'success': False,
                'error': 'Invalid JSON'
            }, status=400)
    
    return JsonResponse({
        'success': False,
        'error': 'Method not allowed'
    }, status=405)


def get_language_info(request):
    """
    API endpoint to get current language and available languages
    """
    return JsonResponse({
        'current_language': get_language(),
        'available_languages': [
            {
                'code': code,
                'name': name,
            }
            for code, name in settings.LANGUAGES
        ]
    })


def get_translations(request):
    """
    API endpoint to get all translations for frontend
    """
    from django.utils.translation import gettext as _
    
    translations = {
        # Navigation
        'nav.home': _('Trang chủ'),
        'nav.products': _('Sản phẩm'),
        'nav.services': _('Dịch vụ'),
        'nav.news': _('Tin tức'),
        'nav.about': _('Về chúng tôi'),
        'nav.contact': _('Liên hệ'),
        
        # Common
        'common.welcome': _('Chào mừng'),
        'common.learn_more': _('Tìm hiểu thêm'),
        'common.contact_us': _('Liên hệ với chúng tôi'),
        'common.read_more': _('Đọc thêm'),
        'common.submit': _('Gửi'),
        'common.search': _('Tìm kiếm'),
        'common.language': _('Ngôn ngữ'),
        
        # Hero section
        'hero.title': _('Chăn Nuôi Pro - Giống Chăn Nuôi Chất Lượng Cao'),
        'hero.subtitle': _('Cung cấp giống GGP, GP, PS chất lượng cao cho ngành chăn nuôi Việt Nam'),
        'hero.cta': _('Khám phá sản phẩm'),
        
        # Products
        'products.title': _('Sản phẩm của chúng tôi'),
        'products.ggp': _('Giống ông bà (GGP)'),
        'products.gp': _('Giống bố mẹ (GP)'),
        'products.ps': _('Giống thương phẩm (PS)'),
        
        # Services
        'services.title': _('Dịch vụ hỗ trợ'),
        'services.consulting': _('Tư vấn kỹ thuật'),
        'services.training': _('Đào tạo'),
        'services.support': _('Hỗ trợ sau bán hàng'),
        
        # Footer
        'footer.copyright': _('© 2025 Chăn Nuôi Pro. Tất cả quyền được bảo lưu.'),
        'footer.address': _('Địa chỉ'),
        'footer.phone': _('Điện thoại'),
        'footer.email': _('Email'),
        
        # Contact form
        'contact.name': _('Họ và tên'),
        'contact.email': _('Email'),
        'contact.phone': _('Số điện thoại'),
        'contact.message': _('Tin nhắn'),
        'contact.send': _('Gửi tin nhắn'),
        'contact.success': _('Gửi tin nhắn thành công!'),
        'contact.error': _('Có lỗi xảy ra, vui lòng thử lại.'),
    }
    
    return JsonResponse({
        'translations': translations,
        'language': get_language()
    })
