from wagtail_modeladmin.options import ModelAdmin, modeladmin_register
from . import sql_models

class MedicineAdmin(ModelAdmin):
    model = sql_models.Medicine
    menu_label = "Thuốc (SQL)"
    menu_icon = "doc-full-inverse"
    list_display = ("id", "name", "price_unit", "is_published", "updated_at")
    search_fields = ("name",)

class PigAdmin(ModelAdmin):
    model = sql_models.Pig
    menu_label = "Lợn (SQL)"
    menu_icon = "snippet"  # Changed icon for compatibility
    list_display = ("id", "name", "price", "is_published", "updated_at")
    search_fields = ("name",)

modeladmin_register(MedicineAdmin)
modeladmin_register(PigAdmin)
