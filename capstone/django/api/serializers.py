from rest_framework import serializers

from sleep_app.models import Sleep

class SleepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sleep
        fields = ('id', 'user_first_name', 'user_last_name', 'user_age')