from django.db import models

# Create your models here.
class UserActivity(models.Model):
    WATCHED = "watched"
    PLAYED = "played"
    DOWNLOADED = "downloaded"
    LIKED = "liked"
    RATED = "rated"
    ACTIVITY_TYPES = [
        (WATCHED, "Watched"),
        (PLAYED, "Played"),
        (DOWNLOADED, "Downloaded"),
        (LIKED, "Liked"),
        (RATED, "Rated"),
    ]

    user = models.ForeignKey("accounts.User", on_delete=models.CASCADE, related_name="activities")
    mediaitem = models.ForeignKey("mediahub.MediaItem", on_delete=models.CASCADE, related_name="activities")
    activity_type = models.CharField(max_length=20, choices=ACTIVITY_TYPES)
    progress_percent = models.PositiveSmallIntegerField(blank=True, null=True)
    rating = models.SmallIntegerField(blank=True, null=True)
    duration_minutes = models.PositiveSmallIntegerField(blank=True, null=True)
    payload = models.JSONField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]