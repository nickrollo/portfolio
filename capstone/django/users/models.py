from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    MALE = True
    FEMALE = False
    GENDER_CHOICES = [
        (MALE, 'Male'),
        (FEMALE, 'Female'),
    ]
    username = models.CharField(max_length=50, unique=True)
    user_first_name = models.CharField(max_length=50)
    user_last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=254)
    user_age = models.IntegerField(default=None, blank=True, null=True)
    user_sex = models.BooleanField(choices=GENDER_CHOICES, null=True)

    def __str__(self):
        return self.username
# Create your models here.
