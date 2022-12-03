from django.db import models
from users.models import CustomUser

# Create your models here.

class Sleep(models.Model):
    user_id = models.ForeignKey(CustomUser, related_name="sleeps", on_delete=models.CASCADE)
    sleep_hours = models.IntegerField()
    date = models.DateField()

    def __str__(self):
        return str(self.user_id)
