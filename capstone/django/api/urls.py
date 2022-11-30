from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('sleep_app', views.PostSleepSet, basename='sleep')

urlpatterns = router.urls + [
    path('', views.SleepAPIView.as_view()),
]