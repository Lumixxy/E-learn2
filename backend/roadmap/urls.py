from django.urls import path, include

urlpatterns = [
    # Include all roadmap API endpoints from the roadmap_api project
    path('', include('roadmap_api.roadmap.urls')),
]