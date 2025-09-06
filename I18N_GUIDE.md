# Hướng dẫn triển khai đa ngôn ngữ (i18n) cho Pig Farm Project

## Tổng quan

Dự án đã được cấu hình để hỗ trợ 2 ngôn ngữ:
- **Tiếng Việt (vi)** - Ngôn ngữ mặc định
- **Tiếng Anh (en)** - Ngôn ngữ phụ

## Cấu trúc Backend (Django)

### 1. Cài đặt dependencies

```bash
cd BE-farm
pip install -r requirements.txt
```

### 2. Cấu hình đã có sẵn

#### Settings (pig_farm_cms/settings/base.py):
- Đã cấu hình `LANGUAGE_CODE = 'vi'`
- Đã thêm `LocaleMiddleware`
- Đã cài đặt `wagtail-modeltranslation` và `django-modeltranslation`
- Cấu hình `LOCALE_PATHS` và `LANGUAGES`

#### Models đã được cấu hình translation:
- `HomePage` model có các trường có thể dịch: `hero_title`, `hero_subtitle`, `hero_cta_text`, `body`

#### API Endpoints đã có sẵn:
- `POST /api/v1/set-language/` - Thay đổi ngôn ngữ
- `GET /api/v1/language-info/` - Lấy thông tin ngôn ngữ hiện tại
- `GET /api/v1/translations/` - Lấy tất cả translations cho frontend

### 3. Cập nhật translations

```bash
# Cách 1: Sử dụng management command
python manage.py update_translations

# Cách 2: Sử dụng script Python
python update_translations.py

# Chỉ compile (không tạo file mới)
python manage.py update_translations --compile-only

# Cập nhật cho ngôn ngữ cụ thể
python manage.py update_translations --language en
```

### 4. Migrate database với translation fields

```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Tạo superuser và thêm content

```bash
python manage.py createsuperuser
python manage.py runserver
```

Truy cập admin tại: `http://localhost:8000/admin/`

## Cấu trúc Frontend (React)

### 1. Cài đặt dependencies

```bash
cd FE-farm
npm install
```

Dependencies đã được thêm:
- `react-i18next`
- `i18next`
- `i18next-http-backend`
- `i18next-browser-languagedetector`

### 2. Cấu hình đã có sẵn

#### i18n Setup (src/lib/i18n.ts):
- Kết nối với Django API để lấy translations
- Auto-detect ngôn ngữ từ localStorage và browser
- Fallback translations nếu API không khả dụng

#### Hook và Component:
- `useLanguage` hook để quản lý ngôn ngữ
- `LanguageSwitcher` component để chuyển đổi ngôn ngữ

### 3. Sử dụng translations trong components

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('nav.home')}</h1>
      <p>{t('hero.subtitle')}</p>
    </div>
  );
}
```

### 4. Environment variables

Tạo file `.env` trong thư mục `FE-farm`:
```
VITE_API_BASE_URL=http://localhost:8000
```

### 5. Khởi chạy development server

```bash
npm run dev
```

## Translation Keys có sẵn

### Navigation
- `nav.home` - Trang chủ / Home
- `nav.products` - Sản phẩm / Products
- `nav.services` - Dịch vụ / Services
- `nav.news` - Tin tức / News
- `nav.about` - Về chúng tôi / About Us
- `nav.contact` - Liên hệ / Contact

### Common
- `common.welcome` - Chào mừng / Welcome
- `common.learn_more` - Tìm hiểu thêm / Learn More
- `common.contact_us` - Liên hệ với chúng tôi / Contact Us
- `common.read_more` - Đọc thêm / Read More
- `common.submit` - Gửi / Submit
- `common.search` - Tìm kiếm / Search
- `common.language` - Ngôn ngữ / Language

### Hero Section
- `hero.title` - Tiêu đề chính
- `hero.subtitle` - Mô tả phụ
- `hero.cta` - Khám phá sản phẩm / Explore Products

### Products
- `products.title` - Sản phẩm của chúng tôi / Our Products
- `products.ggp` - Giống ông bà (GGP) / Great Grand Parent (GGP)
- `products.gp` - Giống bố mẹ (GP) / Grand Parent (GP)
- `products.ps` - Giống thương phẩm (PS) / Parent Stock (PS)

### Services
- `services.title` - Dịch vụ hỗ trợ / Support Services
- `services.consulting` - Tư vấn kỹ thuật / Technical Consulting
- `services.training` - Đào tạo / Training
- `services.support` - Hỗ trợ sau bán hàng / After-sales Support

## Thêm translation mới

### 1. Backend (Django)

1. Thêm text cần dịch vào `home/api_views.py` trong function `get_translations()`
2. Chạy command để cập nhật .po files:
   ```bash
   python manage.py update_translations
   ```
3. Sửa file `.po` trong `locale/en/LC_MESSAGES/django.po` và `locale/vi/LC_MESSAGES/django.po`
4. Compile translations:
   ```bash
   python manage.py update_translations --compile-only
   ```

### 2. Frontend (React)

1. Thêm translation key vào `src/lib/i18n.ts` trong cả `vi` và `en` resources
2. Sử dụng trong component:
   ```tsx
   const { t } = useTranslation();
   return <span>{t('your.new.key')}</span>;
   ```

## Cấu trúc files

```
BE-farm/
├── locale/
│   ├── en/LC_MESSAGES/
│   │   ├── django.po
│   │   └── django.mo
│   └── vi/LC_MESSAGES/
│       ├── django.po
│       └── django.mo
├── home/
│   ├── translation.py
│   ├── api_views.py
│   └── management/commands/
│       └── update_translations.py
└── pig_farm_cms/
    ├── settings/base.py (đã cấu hình i18n)
    └── urls.py (đã thêm i18n_patterns)

FE-farm/
├── src/
│   ├── lib/
│   │   └── i18n.ts
│   ├── hooks/
│   │   └── useLanguage.ts
│   ├── components/
│   │   ├── LanguageSwitcher.tsx
│   │   ├── Header.tsx (đã cập nhật)
│   │   ├── Hero.tsx (đã cập nhật)
│   │   └── Products.tsx (đã cập nhật)
│   └── main.tsx (đã import i18n)
└── .env (cấu hình API URL)
```

## Workflow phát triển

1. **Thêm translation mới:**
   - Cập nhật backend API (`api_views.py`)
   - Cập nhật frontend resources (`i18n.ts`)
   - Cập nhật .po files nếu cần

2. **Test translations:**
   - Khởi động cả backend và frontend
   - Kiểm tra Language Switcher
   - Verify API responses

3. **Deployment:**
   - Đảm bảo .mo files được compiled
   - Set environment variables đúng
   - Test trên production domain

## Troubleshooting

### Backend issues:
- Nếu translations không load: kiểm tra .mo files đã được compiled chưa
- Nếu API error: kiểm tra CORS settings và URL patterns
- Nếu database error: chạy migrations với translation fields

### Frontend issues:
- Nếu i18next không load: kiểm tra VITE_API_BASE_URL
- Nếu translations không update: clear browser cache và localStorage
- Nếu Language Switcher không hoạt động: kiểm tra API endpoint

### Debug commands:
```bash
# Backend
python manage.py runserver --verbosity=2

# Frontend  
npm run dev

# Check compiled translations
find . -name "*.mo" -ls
```

## Production Notes

1. Set `DEBUG = False` trong Django settings
2. Cấu hình CORS properly cho production domain
3. Use proper HTTPS URLs
4. Consider CDN for static translation files
5. Monitor API performance cho translation endpoints
