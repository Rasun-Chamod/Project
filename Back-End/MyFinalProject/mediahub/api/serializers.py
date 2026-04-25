"""Serializers for media library endpoints."""
from rest_framework import serializers

from mediahub.models import MediaItem


class MediaLibraryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaItem
        fields = [
            "id",
            "title",
            "media_type",
            "synopsis",
            "thumbnail",
            "release_date",
            "rating_average",
        ]
