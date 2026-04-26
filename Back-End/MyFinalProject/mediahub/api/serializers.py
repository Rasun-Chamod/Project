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


class MediaCatalogItemSerializer(serializers.ModelSerializer):
    genres = serializers.SlugRelatedField(many=True, read_only=True, slug_field="name")

    class Meta:
        model = MediaItem
        fields = [
            "id",
            "title",
            "media_type",
            "synopsis",
            "genres",
            "thumbnail",
            "release_date",
            "rating_average",
        ]
