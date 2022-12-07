from django.shortcuts import render
from rest_framework import generics, viewsets

from users.models import CustomUser
from sleep_app.models import Sleep
from .models import Quote, Mood
from .serializers import UserSerializer, SleepSerializer, QuoteSerializer, MoodSerializer

# Create your views here.

class SleepAPIView(viewsets.ModelViewSet):
    queryset = Sleep.objects.all()
    serializer_class = SleepSerializer

class PostSleepSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

class QuoteViewSet(viewsets.ModelViewSet):
    queryset = Quote.objects.all()
    serializer_class = QuoteSerializer

class MoodViewSet(viewsets.ModelViewSet):
    queryset = Mood.objects.all()
    serializer_class = MoodSerializer




