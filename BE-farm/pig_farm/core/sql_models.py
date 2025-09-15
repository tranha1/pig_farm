
from django.db import models

class Medicine(models.Model):
    class Meta:
        db_table = "product_medicine"
        managed = False

    id = models.BigAutoField(primary_key=True)
    name = models.TextField()
    packaging = models.TextField(null=True, blank=True)
    price_unit = models.DecimalField(max_digits=14, decimal_places=2, null=True, blank=True)
    price_total = models.DecimalField(max_digits=14, decimal_places=2, null=True, blank=True)
    is_published = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)  # Soft delete
    published_at = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)  # Auto update on save
    deleted_at = models.DateTimeField(null=True, blank=True)  # Timestamp when deleted
    
    def __str__(self):
        return self.name or f"Medicine #{self.id}"


class Pig(models.Model):
    class Meta:
        db_table = "product_pig"
        managed = False

    id = models.BigAutoField(primary_key=True)
    name = models.TextField()
    price = models.DecimalField(max_digits=14, decimal_places=2, null=True, blank=True)
    is_published = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)  # Soft delete
    published_at = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)  # Auto update on save
    deleted_at = models.DateTimeField(null=True, blank=True)  # Timestamp when deleted
    
    def __str__(self):
        return self.name or f"Pig #{self.id}"


class CmsContentEntry(models.Model):
    class Meta:
        db_table = "cms_content_entry"
        managed = False

    id = models.BigAutoField(primary_key=True)
    kind_id = models.SmallIntegerField()
    slug = models.TextField(null=True, blank=True)
    title = models.TextField()
    is_published = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)  # Soft delete
    published_at = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)  # Auto update on save
    deleted_at = models.DateTimeField(null=True, blank=True)  # Timestamp when deleted
    
    def __str__(self):
        return self.title or f"Content #{self.id}"


class PigImage(models.Model):
    """Unmanaged model cho bảng pig_images - lưu hình ảnh lợn"""
    class Meta:
        db_table = "pig_images"
        managed = False

    id = models.BigAutoField(primary_key=True)
    title = models.TextField()
    description = models.TextField(null=True, blank=True)
    image_url = models.TextField()  # URL hoặc path đến file ảnh
    pig_id = models.BigIntegerField(null=True, blank=True)  # Liên kết với bảng product_pig
    image_type = models.CharField(max_length=50, null=True, blank=True)  # 'main', 'gallery', 'thumbnail'
    file_size = models.IntegerField(null=True, blank=True)  # Size file tính bằng bytes
    width = models.IntegerField(null=True, blank=True)
    height = models.IntegerField(null=True, blank=True)
    is_published = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)  # Soft delete
    published_at = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)  # Auto update on save
    created_at = models.DateTimeField(auto_now_add=True)  # Auto set on create
    deleted_at = models.DateTimeField(null=True, blank=True)  # Timestamp when deleted
    
    def __str__(self):
        return self.title or f"PigImage #{self.id}"

    def get_file_size_display(self):
        """Hiển thị kích thước file theo MB"""
        if self.file_size:
            return f"{self.file_size / (1024 * 1024):.1f} MB"
        return "N/A"

    def get_dimensions_display(self):
        """Hiển thị kích thước ảnh"""
        if self.width and self.height:
            return f"{self.width}×{self.height}"
        return "N/A"


class NewsCategory(models.Model):
    """Unmanaged model cho bảng news_categories - phân loại bài viết"""
    class Meta:
        db_table = "news_categories"
        managed = False

    id = models.BigAutoField(primary_key=True)
    name = models.TextField()
    slug = models.TextField(unique=True)
    description = models.TextField(null=True, blank=True)
    color = models.CharField(max_length=7, null=True, blank=True)  # Hex color code
    icon = models.CharField(max_length=50, null=True, blank=True)  # CSS icon class
    parent_id = models.BigIntegerField(null=True, blank=True)  # Self-referencing cho nested categories
    sort_order = models.IntegerField(default=0)
    is_published = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)  # Soft delete
    published_at = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)  # Auto update on save
    created_at = models.DateTimeField(auto_now_add=True)  # Auto set on create
    deleted_at = models.DateTimeField(null=True, blank=True)  # Timestamp when deleted
    
    def __str__(self):
        return self.name or f"Category #{self.id}"

    def get_full_path(self):
        """Lấy đường dẫn đầy đủ của danh mục"""
        path = [self.name]
        # Note: Trong unmanaged model, không thể dùng related fields
        # Nên method này chỉ trả về tên hiện tại
        return " > ".join(path)

    def get_color_display(self):
        """Hiển thị màu với preview"""
        if self.color:
            return f"🎨 {self.color}"
        return "Mặc định"
