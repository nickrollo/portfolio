from django.db import models

# Create your models here.

class Mood(models.Model):
    name = models.CharField(max_length=255)
    def __str__(self):
        return str(self.name)

class Quote(models.Model):
    text = models.TextField()
    source = models.CharField(max_length=200, null=True)
    mood = models.ForeignKey(Mood, on_delete=models.CASCADE)
    def __str__(self):
        return str(self.source)