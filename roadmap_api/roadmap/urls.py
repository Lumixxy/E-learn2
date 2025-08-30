from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RoadmapViewSet, UserProgressViewSet, health_check, api_info

# Create router for ViewSets
router = DefaultRouter()
router.register(r'roadmap', RoadmapViewSet, basename='roadmap')
router.register(r'progress', UserProgressViewSet, basename='progress')

urlpatterns = [
    path('', api_info, name='api_info'),
    path('health/', health_check, name='health_check'),
    path('', include(router.urls)),
]