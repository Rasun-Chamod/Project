from django.contrib import admin
from .models import Game, Genre, MediaItem, Movie, Platform, Tag, TVShow

admin.site.register(Genre)
admin.site.register(Platform)
admin.site.register(Tag)


class MediaItemBaseAdmin(admin.ModelAdmin):
    list_display = ("title", "media_type", "genre_list", "rating_average", "is_active")
    list_filter = ("media_type", "is_active", "genres", "release_date")
    search_fields = ("title", "slug", "synopsis")
    ordering = ("-created_at",)

    def genre_list(self, obj):
        return ", ".join(obj.genres.values_list("name", flat=True))

    genre_list.short_description = "Genres"


class MediaTypeAdmin(MediaItemBaseAdmin):
    media_type = None

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        if self.media_type:
            return queryset.filter(media_type=self.media_type)
        return queryset


@admin.register(MediaItem)
class MediaItemAdmin(MediaItemBaseAdmin):
    pass


@admin.register(Movie)
class MovieAdmin(MediaTypeAdmin):
    media_type = MediaItem.MOVIE


@admin.register(TVShow)
class TVShowAdmin(MediaTypeAdmin):
    media_type = MediaItem.TV_SHOW


@admin.register(Game)
class GameAdmin(MediaTypeAdmin):
    media_type = MediaItem.GAME