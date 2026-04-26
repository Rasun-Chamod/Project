"""URL configuration for media library endpoints."""
from django.urls import path

from mediahub.api.views import GamesListView, MediaLibraryListView, MoviesListView, TVShowsListView

app_name = "mediahub_api"

urlpatterns = [
    path("library/", MediaLibraryListView.as_view(), name="library"),
    path("movies/", MoviesListView.as_view(), name="movies"),
    path("tvshows/", TVShowsListView.as_view(), name="tvshows"),
    path("games/", GamesListView.as_view(), name="games"),
]
