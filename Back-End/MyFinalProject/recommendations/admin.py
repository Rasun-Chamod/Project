from django.contrib import admin
from .models import RecommendationCache

@admin.register(RecommendationCache)
class RecommendationCacheAdmin(admin.ModelAdmin):
    list_display = ("user", "recommendation_type", "generated_at", "expires_at")
    list_filter = ("recommendation_type",)
    search_fields = ("user__username",)