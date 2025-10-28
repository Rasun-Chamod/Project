from django.contrib import admin
from .models import UserActivity

@admin.register(UserActivity)
class UserActivityAdmin(admin.ModelAdmin):
    list_display = ("user", "mediaitem", "activity_type", "created_at")
    list_filter = ("activity_type", "created_at")
    search_fields = ("user__username", "mediaitem__title")