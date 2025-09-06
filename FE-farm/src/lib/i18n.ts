import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'vi',
    lng: 'vi', // default language
    debug: import.meta.env.DEV,
    
    interpolation: {
      escapeValue: false,
    },

    backend: {
      loadPath: `${API_BASE_URL}/api/v1/translations/`,
      parse: (data: string) => {
        const parsed = JSON.parse(data);
        return parsed.translations;
      },
    },

    detection: {
      order: ['localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'i18nextLng',
      lookupSessionStorage: 'i18nextLng',
      caches: ['localStorage', 'sessionStorage'],
    },

    resources: {
      vi: {
        translation: {
          // Navigation
          'nav.home': 'Trang chủ',
          'nav.products': 'Sản phẩm',
          'nav.services': 'Dịch vụ',
          'nav.news': 'Tin tức',
          'nav.about': 'Về chúng tôi',
          'nav.contact': 'Liên hệ',
          
          // Common
          'common.welcome': 'Chào mừng',
          'common.learn_more': 'Tìm hiểu thêm',
          'common.contact_us': 'Liên hệ với chúng tôi',
          'common.read_more': 'Đọc thêm',
          'common.submit': 'Gửi',
          'common.search': 'Tìm kiếm',
          'common.language': 'Ngôn ngữ',
          
          // Hero section
          'hero.title': 'Chăn Nuôi Pro - Giống Chăn Nuôi Chất Lượng Cao',
          'hero.subtitle': 'Cung cấp giống GGP, GP, PS chất lượng cao cho ngành chăn nuôi Việt Nam',
          'hero.cta': 'Khám phá sản phẩm',
          
          // Products
          'products.title': 'Sản phẩm của chúng tôi',
          'products.ggp': 'Giống ông bà (GGP)',
          'products.gp': 'Giống bố mẹ (GP)',
          'products.ps': 'Giống thương phẩm (PS)',
          
          // Services
          'services.title': 'Dịch vụ hỗ trợ',
          'services.consulting': 'Tư vấn kỹ thuật',
          'services.training': 'Đào tạo',
          'services.support': 'Hỗ trợ sau bán hàng',
          
          // Footer
          'footer.copyright': '© 2025 Chăn Nuôi Pro. Tất cả quyền được bảo lưu.',
          'footer.address': 'Địa chỉ',
          'footer.phone': 'Điện thoại',
          'footer.email': 'Email',
          
          // Contact form
          'contact.name': 'Họ và tên',
          'contact.email': 'Email',
          'contact.phone': 'Số điện thoại',
          'contact.message': 'Tin nhắn',
          'contact.send': 'Gửi tin nhắn',
          'contact.success': 'Gửi tin nhắn thành công!',
          'contact.error': 'Có lỗi xảy ra, vui lòng thử lại.',
        }
      },
      en: {
        translation: {
          // Navigation
          'nav.home': 'Home',
          'nav.products': 'Products',
          'nav.services': 'Services',
          'nav.news': 'News',
          'nav.about': 'About Us',
          'nav.contact': 'Contact',
          
          // Common
          'common.welcome': 'Welcome',
          'common.learn_more': 'Learn More',
          'common.contact_us': 'Contact Us',
          'common.read_more': 'Read More',
          'common.submit': 'Submit',
          'common.search': 'Search',
          'common.language': 'Language',
          
          // Hero section
          'hero.title': 'ChănNuôi Pro - High Quality Livestock Breeding',
          'hero.subtitle': 'Providing high quality GGP, GP, PS breeding stock for Vietnam\'s livestock industry',
          'hero.cta': 'Explore Products',
          
          // Products
          'products.title': 'Our Products',
          'products.ggp': 'Great Grand Parent (GGP)',
          'products.gp': 'Grand Parent (GP)',
          'products.ps': 'Parent Stock (PS)',
          
          // Services
          'services.title': 'Support Services',
          'services.consulting': 'Technical Consulting',
          'services.training': 'Training',
          'services.support': 'After-sales Support',
          
          // Footer
          'footer.copyright': '© 2025 ChănNuôi Pro. All rights reserved.',
          'footer.address': 'Address',
          'footer.phone': 'Phone',
          'footer.email': 'Email',
          
          // Contact form
          'contact.name': 'Full Name',
          'contact.email': 'Email',
          'contact.phone': 'Phone Number',
          'contact.message': 'Message',
          'contact.send': 'Send Message',
          'contact.success': 'Message sent successfully!',
          'contact.error': 'An error occurred, please try again.',
        }
      }
    }
  });

export default i18n;
