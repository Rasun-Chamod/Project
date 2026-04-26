"""API views for media library endpoints."""
from rest_framework import generics, permissions

from mediahub.api.serializers import MediaCatalogItemSerializer, MediaLibraryItemSerializer
from mediahub.models import MediaItem


class MediaLibraryListView(generics.ListAPIView):
    serializer_class = MediaLibraryItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = MediaItem.objects.filter(is_active=True).order_by("title")
        media_type = self.request.query_params.get("type")
        if media_type:
            queryset = queryset.filter(media_type=media_type)
        return queryset


class MediaCatalogListView(generics.ListAPIView):
    serializer_class = MediaCatalogItemSerializer
    permission_classes = [permissions.IsAuthenticated]
    media_type = None

    def get_queryset(self):
        queryset = MediaItem.objects.filter(is_active=True).order_by("-created_at")
        if self.media_type:
            queryset = queryset.filter(media_type=self.media_type)
        return queryset


class MoviesListView(MediaCatalogListView):
    media_type = MediaItem.MOVIE


class TVShowsListView(MediaCatalogListView):
    media_type = MediaItem.TV_SHOW


class GamesListView(MediaCatalogListView):
    media_type = MediaItem.GAME
