from django.db import models
from wagtail.models import Page
from wagtail.admin.panels import FieldPanel

class MedicineProductPage(Page):
    """Page mỏng để biên tập viên nhập thuốc; đồng bộ sang bảng SQL qua hooks."""
    external_id = models.BigIntegerField(null=True, editable=False)
    name = models.CharField(max_length=255)
    packaging = models.CharField(max_length=200, blank=True)
    price_unit = models.DecimalField(max_digits=14, decimal_places=2, null=True, blank=True)
    price_total = models.DecimalField(max_digits=14, decimal_places=2, null=True, blank=True)

    content_panels = Page.content_panels + [
        FieldPanel("name"),
        FieldPanel("packaging"),
        FieldPanel("price_unit"),
        FieldPanel("price_total"),
    ]
    
    def __str__(self):
        return f"Medicine: {self.name}" if self.name else f"Medicine Page #{self.id}"

class PigPage(Page):
    """Page mỏng để biên tập viên nhập lợn; đồng bộ sang bảng SQL qua hooks."""
    external_id = models.BigIntegerField(null=True, editable=False)
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=14, decimal_places=2, null=True, blank=True)

    content_panels = Page.content_panels + [
        FieldPanel("name"),
        FieldPanel("price"),
    ]
    
    def __str__(self):
        return f"Pig: {self.name}" if self.name else f"Pig Page #{self.id}"