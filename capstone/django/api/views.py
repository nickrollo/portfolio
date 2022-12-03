from django.shortcuts import render
from rest_framework import generics, viewsets

from users.models import CustomUser
from sleep_app.models import Sleep
from .serializers import UserSerializer, SleepSerializer

# Create your views here.

class SleepAPIView(viewsets.ModelViewSet):
    queryset = Sleep.objects.all()
    serializer_class = SleepSerializer

class PostSleepSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer