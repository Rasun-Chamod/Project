from django.contrib import admin
from .models import DownloadLink

@admin.register(DownloadLink)
class DownloadLinkAdmin(admin.ModelAdmin):
    list_display = ("mediaitem", "user", "download_token", "expires_at", "download_count")
    list_filter = ("expires_at",)
    search_fields = ("mediaitem__title", "user__username", "download_token")