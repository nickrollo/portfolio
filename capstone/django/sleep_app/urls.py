from django.urls import path
from . import views

app_name = 'sleep_app'

urlpatterns = [
    path('', views.home_template, name='home'),
    path('account/', views.post_sleep_record, name='post_sleep_record'),
]