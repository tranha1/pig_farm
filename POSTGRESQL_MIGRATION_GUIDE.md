# 🐷 Hướng dẫn chuyển đổi từ SQLite sang PostgreSQL

## ✅ Đã hoàn thành

Dự án **Pig Farm CMS** đã được chuyển đổi thành công từ SQLite sang PostgreSQL với đầy đủ schema và dữ liệu.

## 🗄️ Cấu hình Database

**Database:** `pig_farm_cms`  
**User:** `pig_farm_user`  
**Password:** `pig_farm_pass`  
**Host:** `localhost`  
**Port:** `5432`

## 📋 Schema đã áp dụng

### 1. **Extensions** (`00_extensions.sql`)
```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm;      -- Full-text search
CREATE EXTENSION IF NOT EXISTS btree_gin;    -- Advanced indexing
```

### 2. **Lookup Tables** (`10_lookups.sql`)
- `lu_unit` - Đơn vị bán (con, hộp, chai...)
- `lu_dose_unit` - Đơn vị liều (ml, viên, g...)
- `lu_medicine_category` - Danh mục thuốc
- `lu_medicine_line` - Dòng thuốc
- `lu_pig_type` - Loại lợn (breeding/sow)
- `lu_pig_breed_line` - Dòng/giống lợn
- `lu_content_kind` - Loại nội dung (contact/news/process)

### 3. **Core Products** (`20_core_products.sql`)
- `product_pig` - Sản phẩm lợn giống
- `product_medicine` - Sản phẩm thuốc

### 4. **CMS Content** (`30_cms_content.sql`)
- `cms_content_entry` - Nội dung CMS chung

### 5. **Images & Views** (`40_images_views_triggers.sql`)
- `product_pig_image`, `product_medicine_image` - Quan hệ ảnh
- `v_pig_public`, `v_medicine_public` - Views cho API
- Triggers tự động cập nhật `updated_at`
- Trigger đảm bảo singleton Contact

## 🔧 Sử dụng Makefile

### Setup lần đầu:
```bash
make setup
make create-superuser
```

### Development thường ngày:
```bash
# Terminal 1
make run-be

# Terminal 2  
make run-fe
```

### Các lệnh khác:
```bash
make backup          # Backup database
make check-db         # Kiểm tra database
make clean           # Dọn dẹp cache
make reset-db        # Reset database (Cẩn thận!)
```

## 🌐 URLs quan trọng

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:8000
- **Wagtail Admin:** http://localhost:8000/admin/
- **API Translations:** http://localhost:8000/api/v1/translations/

## 📊 Kiểm tra dữ liệu

```sql
-- Kiểm tra lookup data
SELECT code, label FROM lu_content_kind;
SELECT code, label FROM lu_pig_type;

-- Kiểm tra structure
\dt                  -- List tables
\dv                  -- List views
```

## 🔄 Workflow phát triển

1. **Content Management:** Dùng Wagtail Admin để tạo/sửa nội dung
2. **API Integration:** Frontend lấy data từ API endpoints
3. **Database Sync:** Wagtail hooks tự động sync với PostgreSQL tables
4. **Translation:** Hỗ trợ đa ngôn ngữ Vi/En tự động

## 🏗️ Kiến trúc mới

```
Frontend (React + Vite)
    ↓ API calls
Backend (Django + Wagtail)
    ↓ Hooks & Sync
PostgreSQL Database
    ├── Wagtail tables (CMS)
    └── Custom tables (Products, Content)
```

## ⚠️ Lưu ý quan trọng

1. **Virtual Environment:** Luôn kích hoạt `.venv` khi chạy Python commands
2. **Environment Settings:** Sử dụng `--settings=pig_farm_cms.settings.dev`
3. **Backup thường xuyên:** Chạy `make backup` trước khi thay đổi lớn
4. **Extension dependencies:** PostgreSQL cần có `pg_trgm` và `btree_gin`

## 🐛 Troubleshooting

### Lỗi kết nối PostgreSQL:
```bash
# Kiểm tra service
services.msc → PostgreSQL

# Kiểm tra kết nối
psql -h localhost -U postgres -l
```

### Lỗi permission:
```sql
GRANT ALL PRIVILEGES ON DATABASE pig_farm_cms TO pig_farm_user;
GRANT ALL ON SCHEMA public TO pig_farm_user;
```

### Lỗi encoding:
```bash
export PGCLIENTENCODING=UTF8
```

## 🎯 Next Steps

1. ✅ Database schema setup
2. ✅ Django integration  
3. ✅ API endpoints
4. 🔄 Frontend integration testing
5. 📋 Content migration (nếu có data cũ)
6. 📋 Production deployment setup

---

**Dự án đã sẵn sàng cho development với PostgreSQL!** 🚀
