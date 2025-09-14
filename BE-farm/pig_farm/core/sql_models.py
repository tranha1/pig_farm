
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
    published_at = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)  # Auto update on save
    
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
    published_at = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)  # Auto update on save
    
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
    published_at = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)  # Auto update on save
    
    def __str__(self):
        return self.title or f"Content #{self.id}"
