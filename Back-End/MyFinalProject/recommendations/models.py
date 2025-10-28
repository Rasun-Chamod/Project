from django.db import models

# Create your models here.
class RecommendationCache(models.Model):
    MOVIE = "movie"
    GAME = "game"
    MIXED = "mixed"
    REC_TYPES = [(MOVIE, "Movie"), (GAME, "Game"), (MIXED, "Mixed")]

    user = models.ForeignKey("accounts.User", on_delete=models.CASCADE, related_name="recommendation_cache")
    recommendation_type = models.CharField(max_length=10, choices=REC_TYPES)
    payload = models.JSONField()
    scoring_version = models.CharField(max_length=50, blank=True, null=True)
    generated_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        unique_together = ("user", "recommendation_type")