from django.db import models

# Create your models here.
class Genre(models.Model):
    name = models.CharField(max_length=150, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True)

class Platform(models.Model):
    name = models.CharField(max_length=150, unique=True)
    slug = models.SlugField(max_length=100, unique=True)

class Tag(models.Model):
    name = models.CharField(max_length=150, unique=True)
    slug = models.SlugField(max_length=100, unique=True)

class MediaItem(models.Model):
    MOVIE = "movie"
    GAME = "game"
    TV_SHOW = "tv"
    MEDIA_TYPES = [(MOVIE, "Movie"), (GAME, "Game"), (TV_SHOW, "TV Show")]

    media_type = models.CharField(max_length=10, choices=MEDIA_TYPES)
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=150, unique=True)
    synopsis = models.TextField(blank=True)
    release_date = models.DateField(blank=True, null=True)
    duration_minutes = models.PositiveSmallIntegerField(blank=True, null=True)
    rating_average = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)
    thumbnail = models.ImageField(upload_to="thumbnails/", blank=True, null=True)
    storage_path = models.CharField(max_length=500, blank=True, null=True)
    external_url = models.URLField(blank=True, null=True)
    metadata = models.JSONField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    genres = models.ManyToManyField(Genre, related_name="media_items", blank=True)
    tags = models.ManyToManyField(Tag, related_name="media_items", blank=True)
    platforms = models.ManyToManyField(Platform, related_name="media_items", blank=True)


class MediaItemQuerySet(models.QuerySet):
    def movies(self):
        return self.filter(media_type=MediaItem.MOVIE)

    def games(self):
        return self.filter(media_type=MediaItem.GAME)

    def tv_shows(self):
        return self.filter(media_type=MediaItem.TV_SHOW)


class MediaItemManager(models.Manager):
    def get_queryset(self):
        return MediaItemQuerySet(self.model, using=self._db)

    def movies(self):
        return self.get_queryset().movies()

    def games(self):
        return self.get_queryset().games()

    def tv_shows(self):
        return self.get_queryset().tv_shows()


class Movie(MediaItem):
    objects = MediaItemManager()

    class Meta:
        proxy = True
        verbose_name = "Movie"
        verbose_name_plural = "Movies"

    def save(self, *args, **kwargs):
        self.media_type = MediaItem.MOVIE
        return super().save(*args, **kwargs)


class TVShow(MediaItem):
    objects = MediaItemManager()

    class Meta:
        proxy = True
        verbose_name = "TV Show"
        verbose_name_plural = "TV Shows"

    def save(self, *args, **kwargs):
        self.media_type = MediaItem.TV_SHOW
        return super().save(*args, **kwargs)


class Game(MediaItem):
    objects = MediaItemManager()

    class Meta:
        proxy = True
        verbose_name = "Game"
        verbose_name_plural = "Games"

    def save(self, *args, **kwargs):
        self.media_type = MediaItem.GAME
        return super().save(*args, **kwargs)