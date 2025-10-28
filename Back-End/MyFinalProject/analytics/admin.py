from django.contrib import admin
from .models import UserAggregate

@admin.register(UserAggregate)
class UserAggregateAdmin(admin.ModelAdmin):
    list_display = ("user", "period", "period_start", "total_watch_minutes", "total_play_minutes")
    list_filter = ("period", "period_start")