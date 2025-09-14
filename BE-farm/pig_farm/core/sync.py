
from django.db import transaction
from wagtail import hooks
from django.utils import timezone
from . import sql_models
from .pages import MedicineProductPage, PigPage
from .signals import notify_dev

def upsert_medicine(page: MedicineProductPage):
    with transaction.atomic():
        if page.external_id:
            obj = sql_models.Medicine.objects.select_for_update().get(id=page.external_id)
        else:
            obj = sql_models.Medicine()
        obj.name = page.name
        obj.packaging = page.packaging or None
        obj.price_unit = page.price_unit
        obj.price_total = page.price_total
        obj.is_published = True
        obj.published_at = timezone.now()
        obj.save()
        if not page.external_id:
            page.external_id = obj.id
            page.save(update_fields=["external_id"])
    notify_dev(f"[Wagtail] Medicine upserted → SQL: {page.title} (id={page.external_id})")

def upsert_pig(page: PigPage):
    with transaction.atomic():
        if page.external_id:
            obj = sql_models.Pig.objects.select_for_update().get(id=page.external_id)
        else:
            obj = sql_models.Pig()
        obj.name = page.name
        obj.price = page.price
        obj.is_published = True
        obj.published_at = timezone.now()
        obj.save()
        if not page.external_id:
            page.external_id = obj.id
            page.save(update_fields=["external_id"])
    notify_dev(f"[Wagtail] Pig upserted → SQL: {page.title} (id={page.external_id})")

@hooks.register("after_publish_page")
def on_publish(request, page):
    if isinstance(page, MedicineProductPage):
        upsert_medicine(page)
    elif isinstance(page, PigPage):
        upsert_pig(page)

@hooks.register("after_unpublish_page")
def on_unpublish(request, page):
    if isinstance(page, MedicineProductPage) and page.external_id:
        sql_models.Medicine.objects.filter(id=page.external_id).update(is_published=False)
        notify_dev(f"[Wagtail] Medicine unpublished: {page.title} (id={page.external_id})")
    if isinstance(page, PigPage) and page.external_id:
        sql_models.Pig.objects.filter(id=page.external_id).update(is_published=False)
        notify_dev(f"[Wagtail] Pig unpublished: {page.title} (id={page.external_id})")

@hooks.register("after_delete_page")
def on_delete(request, page):
    if isinstance(page, MedicineProductPage) and page.external_id:
        sql_models.Medicine.objects.filter(id=page.external_id).update(is_published=False)
        notify_dev(f"[Wagtail] Medicine deleted (soft): {page.title} (id={page.external_id})")
    if isinstance(page, PigPage) and page.external_id:
        sql_models.Pig.objects.filter(id=page.external_id).update(is_published=False)
        notify_dev(f"[Wagtail] Pig deleted (soft): {page.title} (id={page.external_id})")
