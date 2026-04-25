"""URL configuration for media library endpoints."""
from django.urls import path

from mediahub.api.views import MediaLibraryListView

app_name = "mediahub_api"

urlpatterns = [
    path("library/", MediaLibraryListView.as_view(), name="library"),
]
