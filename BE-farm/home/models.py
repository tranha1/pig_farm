from django.db import models
from django.utils.translation import gettext_lazy as _

from wagtail.models import Page
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel


class HomePage(Page):
    hero_title = models.CharField(
        max_length=200,
        blank=True,
        verbose_name=_("Hero Title"),
        help_text=_("Main title displayed on the homepage hero section")
    )
    
    hero_subtitle = models.CharField(
        max_length=500,
        blank=True,
        verbose_name=_("Hero Subtitle"),
        help_text=_("Subtitle displayed below the main title")
    )
    
    hero_cta_text = models.CharField(
        max_length=100,
        blank=True,
        verbose_name=_("Call to Action Text"),
        help_text=_("Text displayed on the main call-to-action button")
    )
    
    body = RichTextField(
        blank=True,
        verbose_name=_("Body"),
        help_text=_("Main content for the homepage")
    )

    content_panels = Page.content_panels + [
        FieldPanel('hero_title'),
        FieldPanel('hero_subtitle'),
        FieldPanel('hero_cta_text'),
        FieldPanel('body'),
    ]

    class Meta:
        verbose_name = _("Home Page")
        verbose_name_plural = _("Home Pages")
