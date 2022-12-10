from django.shortcuts import render
from django.views.generic import ListView
from .models import Sleep


# Create your views here.

class SleepListView(ListView):
    model = Sleep
    template_name = 'home.html'

def home_template(request):
    return render(request, 'home.html')

def post_sleep_record(request):
    return render(request, 'user_update.html')