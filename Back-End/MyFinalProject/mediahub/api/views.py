"""API views for media library endpoints."""
from rest_framework import generics, permissions

from mediahub.api.serializers import MediaLibraryItemSerializer
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
