from django.urls import path
from . import views

# URL patterns
urlpatterns = [
    path("health/", views.api_health, name="api_health"),
    path("medicines/", views.api_medicines, name="api_medicines"),
    path("pigs/", views.api_pigs, name="api_pigs"),
    path("news/", views.api_news_articles, name="api_news_articles"),
    path("news/<int:article_id>/", views.api_news_article_detail, name="api_news_article_detail"),
    path("news/categories/", views.api_news_categories, name="api_news_categories"),
]