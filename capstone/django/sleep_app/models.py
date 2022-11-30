from django.db import models

# Create your models here.

class Sleep(models.Model):
    user_first_name = models.CharField(max_length=200)
    user_last_name = models.CharField(max_length=200)
    user_age = models.IntegerField()

    def __str__(self):
        return self.user_first_name
