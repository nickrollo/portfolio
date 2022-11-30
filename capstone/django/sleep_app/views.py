from django.shortcuts import render
from django.views.generic import ListView

from .models import Sleep
# Create your views here.

class SleepListView(ListView):
    model = Sleep
    template_name = 'home.html'
