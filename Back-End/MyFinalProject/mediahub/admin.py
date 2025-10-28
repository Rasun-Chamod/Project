from django.contrib import admin
from .models import Genre, Platform, Tag, MediaItem

admin.site.register(Genre)
admin.site.register(Platform)
admin.site.register(Tag)

@admin.register(MediaItem)
class MediaItemAdmin(admin.ModelAdmin):
    list_display = ("title", "media_type", "is_active", "created_at")
    list_filter = ("media_type", "is_active", "genres")
    search_fields = ("title", "slug", "description")