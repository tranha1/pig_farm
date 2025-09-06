# Đặc Tả Dự Án: ChănNuôi Pro - Platform Giống Chăn Nuôi

## 1. Tổng Quan Dự Án

### 1.1 Thông Tin Cơ Bản
- **Tên dự án**: ChănNuôi Pro
- **Lĩnh vực**: Cung cấp giống chăn nuôi chất lượng cao (GGP, GP, PS)
- **Mục tiêu**: Số hóa hoạt động kinh doanh giống chăn nuôi với focus vào trải nghiệm người dùng và quản lý leads hiệu quả
- **Đối tượng**: Nông dân, doanh nghiệp chăn nuôi, đại lý phân phối

### 1.2 Kiến Trúc Hệ Thống
```
Frontend (React + TypeScript)  →  Backend (Django + Wagtail)  →  Database (PostgreSQL)
                                      ↓
                                Cache (Redis) + Search (MeiliSearch) + Queue (Celery)
```

## 2. Kiến Trúc Frontend

### 2.1 Tech Stack
- **Framework**: React 18.3.1 với TypeScript
- **Build Tool**: Vite 5.4.19
- **UI Library**: Tailwind CSS + Shadcn/ui components
- **Routing**: React Router DOM 6.30.1
- **Form Management**: React Hook Form 7.61.1
- **State Management**: TanStack Query 5.83.0 + Context API
- **Package Manager**: Bun

### 2.2 Cấu Trúc Components
```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Navigation với menu responsive
│   │   ├── Footer.tsx          # Footer với thông tin liên hệ
│   │   └── Breadcrumb.tsx      # SEO breadcrumb navigation
│   ├── sections/
│   │   ├── Hero.tsx            # Landing section với CTA
│   │   ├── Products.tsx        # Catalog sản phẩm với filtering
│   │   └── Services.tsx        # Gói dịch vụ hỗ trợ
│   ├── forms/
│   │   ├── ContactForm.tsx     # Form liên hệ
│   │   ├── QuoteForm.tsx       # Form yêu cầu báo giá
│   │   └── NewsletterForm.tsx  # Đăng ký newsletter
│   └── ui/                     # Shadcn/ui components
├── pages/
│   ├── Index.tsx               # Homepage
│   ├── Products/
│   │   ├── ProductList.tsx     # Danh sách sản phẩm
│   │   ├── ProductDetail.tsx   # Chi tiết sản phẩm
│   │   └── ProductCompare.tsx  # So sánh sản phẩm
│   ├── Services/
│   ├── News/
│   ├── About.tsx
│   ├── Contact.tsx
│   └── NotFound.tsx
├── hooks/
│   ├── useApi.ts               # API calls với TanStack Query
│   ├── useUrlRedirect.ts       # SEO URL handling
│   └── useSearch.ts            # Search functionality
└── lib/
    ├── utils.ts                # Utility functions
    ├── api.ts                  # API configuration
    └── seo.ts                  # SEO utilities
```

### 2.3 URL Structure & SEO
#### URL Patterns
- **Category**: `/category/slug` (VD: `/giong-heo/landrace`)
- **Tag**: `/tag/slug` (VD: `/tag/f1-hybrid`)
- **Post**: `/post/slug` (VD: `/post/ky-thuat-nuoi-heo`)
- **Product**: `/san-pham/slug`
- **Service**: `/dich-vu/slug`
- **News**: `/tin-tuc/slug`

#### SEO Requirements
- ✅ Clean URLs không có `/index.html`
- ✅ Slug chuẩn không dấu, thống nhất EN/VI
- ✅ Canonical URL duy nhất cho mỗi nội dung
- ✅ Block UTM parameters và trang filter/search
- ✅ Breadcrumb: Home → Category → Content
- ✅ Auto redirect URLs không hợp lệ

## 3. Kiến Trúc Backend

### 3.1 Tech Stack
- **Framework**: Django 4.2+ với Wagtail CMS 5.2+
- **Database**: PostgreSQL với Redis cache
- **Search**: MeiliSearch cho full-text search
- **Queue**: Celery với Redis broker
- **Static Files**: WhiteNoise với compression
- **Image Processing**: Wagtail Images + Sorl Thumbnail

### 3.2 Django Apps Structure
```
farm_project/
├── settings/
│   ├── base.py                 # Common settings
│   ├── development.py          # Dev environment
│   ├── production.py           # Production settings
│   └── staging.py              # Staging environment
├── farm/                       # Main app
│   ├── models/
│   │   ├── __init__.py
│   │   ├── pages.py            # Wagtail page models
│   │   ├── snippets.py         # Reusable content
│   │   └── products.py         # Product models
│   ├── views/
│   │   ├── api.py              # REST API views
│   │   └── feeds.py            # RSS/Atom feeds
│   ├── middleware/
│   │   └── performance.py      # Performance optimizations
│   ├── tasks/
│   │   ├── ml.py               # ML-related tasks
│   │   └── seo.py              # SEO automation
│   ├── management/commands/
│   │   ├── update_search.py    # Update search index
│   │   └── generate_sitemap.py # Sitemap generation
│   └── templates/
├── static/
├── media/
└── requirements/
    ├── base.txt
    ├── development.txt
    └── production.txt
```

### 3.3 Core Models
```python
# Page Models (Wagtail)
- HomePage: Landing page với hero section
- ProductIndexPage: Danh mục sản phẩm với routing
- ProductPage: Chi tiết sản phẩm với specs
- ServicePage: Trang dịch vụ
- BlogIndexPage: Danh sách bài viết
- BlogPage: Chi tiết bài viết
- ContactPage: Trang liên hệ

# Product Models
- ProductCategory: Danh mục (GGP, GP, PS)
- Product: Sản phẩm giống
- ProductSpec: Thông số kỹ thuật
- ProductImage: Hình ảnh sản phẩm
- ProductDocument: File PDF/specs

# Content Models
- BlogPost: Bài viết tin tức
- Service: Dịch vụ hỗ trợ
- Testimonial: Chứng thực khách hàng
- FAQ: Câu hỏi thường gặp

# Lead Models
- ContactForm: Form liên hệ
- QuoteRequest: Yêu cầu báo giá
- Newsletter: Đăng ký tin tức
- JobApplication: Đơn ứng tuyển
```

### 3.4 Required Packages
```python
# Core
Django>=4.2
wagtail>=5.2
psycopg2-binary
python-decouple

# SEO & Performance  
wagtail-seo
wagtail-modeltranslation
django-robots
django-redis
whitenoise
sorl-thumbnail

# Search & ML
meilisearch
scikit-learn
numpy
celery[redis]

# API & Forms
djangorestframework
django-cors-headers
django-crispy-forms

# Monitoring
django-extensions
django-debug-toolbar
sentry-sdk
```

## 4. Performance & SEO Features

### 4.1 Performance Optimizations
#### Cache Strategy
```python
# HTML pages: 5 minutes với stale-while-revalidate 24h
# Static files: 1 year
# Media files: 30 days
# API responses: 15 minutes với vary headers
```

#### Compression
- **Brotli** compression cho modern browsers
- **Gzip** fallback cho legacy browsers
- **WebP** images với fallback

#### Critical Performance
- **Early Hints**: Preload fonts và critical CSS
- **Server-Timing**: Debug performance headers
- **Core Web Vitals**: Optimized từ server
- **Image Optimization**: Responsive images với lazy loading

### 4.2 SEO Features
#### Sitemap & Feeds
- **Multi-section sitemap**: Pages, Products, Blog với priorities
- **RSS/Atom feeds**: Latest posts tự động cập nhật
- **Search engine ping**: Auto ping Google/Bing khi sitemap update

#### Robots & Meta
- **robots.txt**: HTTP 200 status với proper directives
- **Meta tags**: Open Graph, Twitter Cards
- **Structured data**: JSON-LD cho products và articles
- **Canonical URLs**: Prevent duplicate content

## 5. Search & ML Features

### 5.1 Site Search (MeiliSearch)
```python
# Index Fields
- title, excerpt, content
- tags, categories
- language, popularity score
- last_modified, author

# Search Features
- Typo tolerance
- Faceted search (category, tags)
- Highlighting
- Auto-complete suggestions
```

### 5.2 Related Content (ML)
```python
# Algorithm: TF-IDF + Cosine Similarity
# Process:
1. Extract text content from pages
2. Generate TF-IDF vectors
3. Calculate cosine similarity
4. Cache results for 24h
5. Update async với Celery

# Features:
- Related products based on description
- Similar blog posts
- Cross-category recommendations
```

## 6. API Design

### 6.1 REST API Endpoints
```
GET /api/v1/products/           # List products với filtering
GET /api/v1/products/{id}/      # Product detail
GET /api/v1/categories/         # Product categories
GET /api/v1/services/           # Available services
GET /api/v1/blog/               # Blog posts
GET /api/v1/search/?q=term      # Search across content

POST /api/v1/contact/           # Submit contact form
POST /api/v1/quote/             # Request quote
POST /api/v1/newsletter/        # Newsletter signup
```

### 6.2 Response Format
```json
{
  "success": true,
  "data": {
    "results": [...],
    "pagination": {
      "page": 1,
      "pages": 10,
      "per_page": 20,
      "total": 200
    }
  },
  "meta": {
    "timestamp": "2025-09-04T10:00:00Z",
    "version": "1.0"
  }
}
```

## 7. Security & Compliance

### 7.1 Security Measures
- **HTTPS**: SSL/TLS encryption
- **CSRF Protection**: Django CSRF middleware
- **XSS Prevention**: Content Security Policy
- **SQL Injection**: ORM usage, parameterized queries
- **Rate Limiting**: API throttling
- **Input Validation**: Form validation với sanitization

### 7.2 Privacy Compliance
- **GDPR Compliance**: Cookie consent, data export/delete
- **Privacy Policy**: Transparent data usage
- **Data Retention**: Auto-cleanup old leads
- **User Rights**: Access, rectification, erasure

## 8. Deployment & DevOps

### 8.1 Environment Setup
```yaml
# Development
- Docker Compose với services: Django, PostgreSQL, Redis, MeiliSearch
- Hot reload cho development
- Debug toolbar enabled

# Staging  
- Docker containers
- Automated testing
- Performance monitoring

# Production
- Container orchestration (Docker Swarm/Kubernetes)
- Load balancing
- Auto-scaling
- Monitoring & alerts
```

### 8.2 CI/CD Pipeline
```yaml
# GitHub Actions Workflow
1. Code Quality:
   - ESLint, Prettier (Frontend)
   - Black, Flake8 (Backend)
   - Type checking

2. Testing:
   - Unit tests
   - Integration tests
   - E2E tests với Playwright

3. Build:
   - Frontend build với Vite
   - Docker image build
   - Static files collection

4. Deploy:
   - Staging deployment
   - Production deployment
   - Database migrations
```

## 9. Monitoring & Analytics

### 9.1 Performance Monitoring
- **Application Performance**: Django performance metrics
- **Infrastructure**: Server resources, database performance
- **User Experience**: Core Web Vitals, error tracking
- **Search Analytics**: Query analysis, conversion tracking

### 9.2 Business Analytics
- **Lead Tracking**: Form submissions, quote requests
- **Content Performance**: Page views, engagement metrics
- **Search Behavior**: Popular queries, zero-result queries
- **Conversion Funnel**: Visitor → Lead → Customer

## 10. Content Management

### 10.1 Wagtail CMS Features
- **Page Management**: Hierarchical page structure
- **Media Library**: Organized asset management
- **Workflow**: Draft → Review → Publish
- **Version Control**: Page history và rollback
- **Multi-language**: Content translation support

### 10.2 Content Types
```python
# Marketing Content
- Landing pages với customizable blocks
- Product showcases với rich media
- Blog posts với SEO optimization
- Service pages với pricing tables

# Dynamic Content
- FAQ management
- Testimonial rotation
- News và announcements
- Job listings với application forms
```

## 11. Integration Requirements

### 11.1 Third-party Integrations
- **CRM Integration**: Lead export to external CRM
- **Email Marketing**: Newsletter automation
- **Analytics**: Google Analytics 4, Google Tag Manager
- **Payment**: Future payment gateway integration
- **Social Media**: Social sharing, feeds

### 11.2 Internal Systems
- **ERP Integration**: Product inventory sync
- **Email System**: SMTP cho notifications
- **File Storage**: Local storage với CDN option
- **Backup System**: Automated database backups

## 12. Testing Strategy

### 12.1 Frontend Testing
```javascript
// Unit Tests
- Component testing với React Testing Library
- Hook testing
- Utility function tests

// Integration Tests  
- API integration tests
- Form submission flows
- Navigation testing

// E2E Tests
- Critical user journeys
- Cross-browser testing
- Mobile responsive testing
```

### 12.2 Backend Testing
```python
# Unit Tests
- Model tests
- View tests
- Utility function tests

# Integration Tests
- API endpoint tests
- Database interaction tests
- External service mocks

# Performance Tests
- Load testing
- Database query optimization
- Cache effectiveness
```

## 13. Launch Plan

### 13.1 Phase 1: MVP (Tháng 1-2)
- ✅ Core frontend components
- ✅ Wagtail CMS setup
- ✅ Product catalog
- ✅ Contact forms
- ✅ Basic SEO setup

### 13.2 Phase 2: Enhancement (Tháng 3)
- 🔄 Advanced search với MeiliSearch
- 🔄 Related content algorithm
- 🔄 Performance optimizations
- 🔄 Analytics integration

### 13.3 Phase 3: Scale (Tháng 4+)
- 📋 Multi-language support
- 📋 Advanced CRM integration
- 📋 Mobile app API
- 📋 Advanced personalization

## 14. Success Metrics

### 14.1 Technical KPIs
- **Page Load Speed**: < 2s first contentful paint
- **Core Web Vitals**: All metrics in "Good" range
- **Uptime**: 99.9% availability
- **SEO**: Top 3 rankings cho target keywords

### 14.2 Business KPIs
- **Lead Generation**: 50+ qualified leads/month
- **Conversion Rate**: 15% contact form submissions
- **User Engagement**: 3+ pages per session
- **Content Performance**: 70% organic traffic growth

---

**Tài liệu này sẽ được cập nhật thường xuyên theo tiến độ phát triển dự án.**

*Phiên bản: 1.0 | Ngày cập nhật: 04/09/2025*
