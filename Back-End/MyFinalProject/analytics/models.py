from django.db import models

# Create your models here.
class UserAggregate(models.Model):
    DAILY = "daily"
    WEEKLY = "weekly"
    MONTHLY = "monthly"
    PERIOD_CHOICES = [(DAILY, "Daily"), (WEEKLY, "Weekly"), (MONTHLY, "Monthly")]

    user = models.ForeignKey("accounts.User", on_delete=models.CASCADE, related_name="aggregates")
    period = models.CharField(max_length=10, choices=PERIOD_CHOICES)
    period_start = models.DateField()
    period_end = models.DateField()
    genre_breakdown = models.JSONField(blank=True, null=True)
    total_watch_minutes = models.PositiveIntegerField(default=0)
    total_play_minutes = models.PositiveIntegerField(default=0)
    top_titles = models.JSONField(blank=True, null=True)
    generated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "period", "period_start")