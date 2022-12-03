from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    username = models.CharField(max_length=50, unique=True)
    user_first_name = models.CharField(max_length=50)
    user_last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=254)
    user_age = models.IntegerField(default=None, blank=True, null=True)

    def __str__(self):
        return self.username
# Create your models here.
