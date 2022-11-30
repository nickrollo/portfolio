from django.urls import path
from . import views

app_name = 'sleep_app'

urlpatterns = [
    path('', views.SleepListView.as_view(), name='home')
]