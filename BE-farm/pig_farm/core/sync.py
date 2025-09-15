
from django.db import transaction, DatabaseError
from wagtail import hooks
from django.utils import timezone
from django.core.exceptions import ValidationError, PermissionDenied
import logging
from . import sql_models
from .pages import MedicineProductPage, PigPage, PigImagePage, NewsCategoryPage
from .signals import notify_dev

logger = logging.getLogger(__name__)

def upsert_medicine(page: MedicineProductPage):
    """Sync MedicineProductPage to SQL medicine table."""
    try:
        with transaction.atomic():
            if page.external_id:
                try:
                    obj = sql_models.Medicine.objects.get(id=page.external_id)
                except sql_models.Medicine.DoesNotExist:
                    obj = sql_models.Medicine()
                    page.external_id = None
            else:
                obj = sql_models.Medicine()
            obj.name = page.name
            obj.packaging = page.packaging or None
            obj.price_unit = page.price_unit
            obj.price_total = page.price_total
            obj.is_published = True
            obj.published_at = timezone.now()
            obj.is_deleted = False
            obj.deleted_at = None
            obj.save()
            if not page.external_id:
                page.external_id = obj.id
                page.save(update_fields=["external_id"])
        notify_dev(f"✅ [Wagtail] Medicine upserted → SQL: {page.title} (id={page.external_id})")
    except DatabaseError as e:
        logger.error(f"Medicine sync failed for {page.title}: {e}")
        notify_dev(f"❌ [Wagtail] Medicine sync failed: {page.title} - {str(e)}")

def upsert_pig(page: PigPage):
    """Sync PigPage to SQL pig table."""
    try:
        with transaction.atomic():
            if page.external_id:
                try:
                    obj = sql_models.Pig.objects.get(id=page.external_id)
                except sql_models.Pig.DoesNotExist:
                    obj = sql_models.Pig()
                    page.external_id = None
            else:
                obj = sql_models.Pig()
            obj.name = page.name
            obj.price = page.price
            obj.is_published = True
            obj.published_at = timezone.now()
            obj.is_deleted = False
            obj.deleted_at = None
            obj.save()
            if not page.external_id:
                page.external_id = obj.id
                page.save(update_fields=["external_id"])
        notify_dev(f"✅ [Wagtail] Pig upserted → SQL: {page.title} (id={page.external_id})")
    except DatabaseError as e:
        logger.error(f"Pig sync failed for {page.title}: {e}")
        notify_dev(f"❌ [Wagtail] Pig sync failed: {page.title} - {str(e)}")


def upsert_pig_image(page: PigImagePage):
    """Sync PigImagePage to SQL pig_images table"""
    try:
        with transaction.atomic():
            if page.external_id:
                try:
                    obj = sql_models.PigImage.objects.get(id=page.external_id)
                except sql_models.PigImage.DoesNotExist:
                    obj = sql_models.PigImage()
                    page.external_id = None
            else:
                obj = sql_models.PigImage()
            
            obj.title = page.title
            obj.description = page.description or None
            obj.image_url = page.image.file.url if page.image else None
            obj.pig_id = page.pig_reference.external_id if page.pig_reference and page.pig_reference.external_id else None
            obj.image_type = page.image_type
            obj.file_size = page.file_size
            obj.width = page.width
            obj.height = page.height
            obj.is_published = True
            obj.published_at = timezone.now()
            obj.is_deleted = False
            obj.deleted_at = None
            obj.save()
            
            if not page.external_id:
                page.external_id = obj.id
                page.save(update_fields=["external_id"])
                
        notify_dev(f"✅ [Wagtail] PigImage upserted → SQL: {page.title} (id={obj.id})")
        
    except sql_models.PigImage.DoesNotExist:
        logger.error(f"PigImage with id={page.external_id} not found for {page.title}")
        notify_dev(f"❌ [Wagtail] PigImage not found for {page.title} (id={page.external_id})")
    except DatabaseError as e:
        logger.error(f"Database error during PigImage sync for {page.title}: {e}")
        notify_dev(f"❌ [Wagtail] Database error for {page.title}: {str(e)}")


def upsert_news_category(page: NewsCategoryPage):
    """Sync NewsCategoryPage to SQL news_categories table"""
    try:
        with transaction.atomic():
            if page.external_id:
                try:
                    obj = sql_models.NewsCategory.objects.get(id=page.external_id)
                except sql_models.NewsCategory.DoesNotExist:
                    obj = sql_models.NewsCategory()
                    page.external_id = None
            else:
                obj = sql_models.NewsCategory()
            
            obj.name = page.title
            obj.slug = page._slug_value()
            obj.description = page.description or None
            obj.color = page.color
            obj.icon = page.icon
            obj.parent_id = page.parent_category.external_id if page.parent_category and page.parent_category.external_id else None
            obj.sort_order = page.sort_order
            obj.is_published = True
            obj.published_at = timezone.now()
            obj.is_deleted = False
            obj.deleted_at = None
            obj.save()
            
            if not page.external_id:
                page.external_id = obj.id
                page.save(update_fields=["external_id"])
                
        notify_dev(f"✅ [Wagtail] NewsCategory upserted → SQL: {page.title} (id={obj.id})")
        
    except sql_models.NewsCategory.DoesNotExist:
        logger.error(f"NewsCategory with id={page.external_id} not found for {page.title}")
        notify_dev(f"❌ [Wagtail] NewsCategory not found for {page.title} (id={page.external_id})")
    except DatabaseError as e:
        logger.error(f"Database error during NewsCategory sync for {page.title}: {e}")
        notify_dev(f"❌ [Wagtail] Database error for {page.title}: {str(e)}")

@hooks.register("after_publish_page")
def on_publish(request, page):
    if isinstance(page, MedicineProductPage):
        upsert_medicine(page)
    elif isinstance(page, PigPage):
        upsert_pig(page)
    elif isinstance(page, PigImagePage):
        upsert_pig_image(page)
    elif isinstance(page, NewsCategoryPage):
        upsert_news_category(page)


@hooks.register("after_unpublish_page")
def on_unpublish(request, page):
    """Mark SQL record as unpublished."""
    try:
        model_mapping = {
            MedicineProductPage: (sql_models.Medicine, "Medicine"),
            PigPage: (sql_models.Pig, "Pig"),
            PigImagePage: (sql_models.PigImage, "PigImage"),
            NewsCategoryPage: (sql_models.NewsCategory, "NewsCategory"),
        }
        model, model_name = model_mapping.get(type(page), (None, None))
        if model and page.external_id:
            model.objects.filter(id=page.external_id).update(is_published=False)
            notify_dev(f"📤 [Wagtail] {model_name} unpublished: {page.title} (id={page.external_id})")
    except DatabaseError as e:
        logger.error(f"Unpublish failed for {page.title}: {e}")
        notify_dev(f"❌ [Wagtail] Unpublish failed: {page.title} - {str(e)}")


@hooks.register("before_delete_page")
def prevent_hard_delete_and_log(request, page):
    """
    Block all hard deletes, including for superusers.
    Only developers can delete directly in the database.
    """
    # Log delete attempt đầu tiên
    logger.info(f"🔍 DELETE ATTEMPT: {page.__class__.__name__} '{page.title}' by {request.user.username}")
    notify_dev(f"🔍 [DEBUG] Delete attempt: {page.__class__.__name__} '{page.title}' by {request.user.username}")
    
    if isinstance(page, (MedicineProductPage, PigPage, PigImagePage, NewsCategoryPage)):
        logger.info(f"🚫 Blocking hard delete for {page.title} by user {request.user.username} (superuser: {request.user.is_superuser})")
        
        raise PermissionDenied(
            f"⛔ DELETE BLOCKED! "
            f"Cannot delete '{page.title}'. "
            f"Only developers can delete directly in the database. "
            f"Please use 'Unpublish' instead."
        )

# XÓA hook log_delete_attempt riêng biệt vì đã merge vào hook chính
# @hooks.register("before_delete_page")
# def log_delete_attempt(request, page):
#     ...

@hooks.register("after_delete_page")
def handle_soft_delete_fallback(request, page):
    """
    Fallback handler - nếu somehow page vẫn bị delete, thực hiện soft delete
    """
    if isinstance(page, (MedicineProductPage, PigPage, PigImagePage, NewsCategoryPage)):
        logger.warning(f"🚨 FALLBACK: Page was deleted despite prevention: {page.title}")
        
        try:
            current_time = timezone.now()
            
            # Thực hiện soft delete trong SQL database
            if isinstance(page, MedicineProductPage) and page.external_id:
                sql_models.Medicine.objects.filter(id=page.external_id).update(
                    is_published=False,
                    is_deleted=True,
                    deleted_at=current_time
                )
                notify_dev(f"🗑️ [FALLBACK SOFT DELETE] Medicine: {page.title} (id={page.external_id})")
                
            elif isinstance(page, PigPage) and page.external_id:
                sql_models.Pig.objects.filter(id=page.external_id).update(
                    is_published=False,
                    is_deleted=True,
                    deleted_at=current_time
                )
                notify_dev(f"🗑️ [FALLBACK SOFT DELETE] Pig: {page.title} (id={page.external_id})")
                
            elif isinstance(page, PigImagePage) and page.external_id:
                sql_models.PigImage.objects.filter(id=page.external_id).update(
                    is_published=False,
                    is_deleted=True,
                    deleted_at=current_time
                )
                notify_dev(f"🗑️ [FALLBACK SOFT DELETE] PigImage: {page.title} (id={page.external_id})")
                
            elif isinstance(page, NewsCategoryPage) and page.external_id:
                sql_models.NewsCategory.objects.filter(id=page.external_id).update(
                    is_published=False,
                    is_deleted=True,
                    deleted_at=current_time
                )
                notify_dev(f"🗑️ [FALLBACK SOFT DELETE] NewsCategory: {page.title} (id={page.external_id})")
                
        except Exception as e:
            logger.error(f"Fallback soft delete failed for {page.title}: {e}")
            notify_dev(f"❌ [FALLBACK] Soft delete failed: {page.title} - {str(e)}")