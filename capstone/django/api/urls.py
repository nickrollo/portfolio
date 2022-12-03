from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('sleeps', views.PostSleepSet, basename='sleep')
router.register('users', views.SleepAPIView, basename='users')


urlpatterns = router.urls + [
    # path('', views.SleepAPIView.as_view()),
]