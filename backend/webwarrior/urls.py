from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('webwarrior_app.urls')),
    path('api/', include('roadmap.urls')),  # Include roadmap API endpoints
]