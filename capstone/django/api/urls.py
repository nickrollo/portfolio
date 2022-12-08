from django.urls import path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('users', views.PostSleepSet, basename='users')
router.register('sleeps', views.SleepAPIView, basename='sleeps')
router.register('quotes', views.QuoteViewSet)
router.register('moods', views.MoodViewSet)

urlpatterns = router.urls + [
    # path('', views.SleepAPIView.as_view()),
]