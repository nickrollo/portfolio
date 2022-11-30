from django.shortcuts import render
from rest_framework import generics, viewsets

from sleep_app.models import Sleep
from .serializers import SleepSerializer

# Create your views here.

class SleepAPIView(generics.ListAPIView):
    queryset = Sleep.objects.all()
    serializer_class = SleepSerializer

class PostSleepSet(viewsets.ModelViewSet):
    queryset = Sleep.objects.all()
    serializer_class = SleepSerializer