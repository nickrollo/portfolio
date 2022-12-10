from rest_framework import serializers
from users.models import CustomUser
from sleep_app.models import Sleep
from .models import Quote, Mood


class NestedSleepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sleep
        fields = ('id', 'date', 'sleep_hours')

class NestedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username')

class NestedQuoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quote
        fields = ('id', 'text', 'source',)        


class SleepSerializer(serializers.ModelSerializer):
    user_detail = NestedUserSerializer(source='user_id', read_only=True)
    class Meta:
        model = Sleep
        fields = ('id', 'user_id', 'sleep_hours', 'date', 'user_detail')

class UserSerializer(serializers.ModelSerializer):
    sleeps = NestedSleepSerializer(many=True, read_only=True, required=False)
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'user_first_name', 'user_last_name', 'user_age', 'user_sex', 'sleeps')

class QuoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quote
        fields = ('id', 'text', 'source', 'mood')

class MoodSerializer(serializers.ModelSerializer):
    quotes = NestedQuoteSerializer(source='quote_set', many=True)
    class Meta:
        model = Mood
        fields = ('id', 'name', 'quotes')