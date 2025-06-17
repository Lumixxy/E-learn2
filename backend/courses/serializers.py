from rest_framework import serializers
from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'course', 'module', 'topic', 'websiteLink', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at'] 