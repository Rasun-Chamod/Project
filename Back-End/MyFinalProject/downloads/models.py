from django.db import models

# Create your models here.
import uuid

class DownloadLink(models.Model):
    mediaitem = models.ForeignKey("mediahub.MediaItem", on_delete=models.CASCADE, related_name="download_links")
    user = models.ForeignKey("accounts.User", on_delete=models.SET_NULL, null=True, blank=True, related_name="download_links")
    file_path = models.CharField(max_length=500)
    file_size_bytes = models.BigIntegerField(blank=True, null=True)
    checksum = models.CharField(max_length=128, blank=True, null=True)
    download_token = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    expires_at = models.DateTimeField(blank=True, null=True)
    max_downloads = models.PositiveIntegerField(default=1)
    download_count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)