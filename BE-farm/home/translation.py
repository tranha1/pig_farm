from modeltranslation.translator import TranslationOptions, translator
from .models import HomePage


class HomePageTranslationOptions(TranslationOptions):
    fields = (
        'hero_title',
        'hero_subtitle',
        'hero_cta_text',
        'body',
    )


translator.register(HomePage, HomePageTranslationOptions)
