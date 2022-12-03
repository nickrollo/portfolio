from rest_framework import serializers
from users.models import CustomUser
from sleep_app.models import Sleep


class NestedSleepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sleep
        fields = ['id', 'date', 'sleep_hours']

class NestedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'user_first_name', 'user_last_name', 'user_age')


class SleepSerializer(serializers.ModelSerializer):
    user_detail = NestedUserSerializer(source='user_id', read_only=True)
    class Meta:
        model = Sleep
        fields = ('id', 'user_id', 'sleep_hours', 'date', 'user_detail')

class UserSerializer(serializers.ModelSerializer):
    sleep_detail = NestedSleepSerializer(many=True, read_only=True, source='sleeps')
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'user_first_name', 'user_last_name', 'user_age', 'sleep_detail']