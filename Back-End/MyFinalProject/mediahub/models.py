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
    MEDIA_TYPES = [(MOVIE, "Movie"), (GAME, "Game")]

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