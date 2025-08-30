from django.contrib import admin
from .models import Roadmap, RoadmapNode, UserProgress


@admin.register(Roadmap)
class RoadmapAdmin(admin.ModelAdmin):
    list_display = ['title', 'course_id', 'skill_tag', 'created_at']
    list_filter = ['skill_tag', 'created_at']
    search_fields = ['title', 'course_id', 'description']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'description', 'course_id', 'skill_tag')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(RoadmapNode)
class RoadmapNodeAdmin(admin.ModelAdmin):
    list_display = ['roadmap', 'node_id', 'label', 'position_x', 'position_y']
    list_filter = ['roadmap']
    search_fields = ['label', 'description']
    ordering = ['roadmap', 'node_id']


@admin.register(UserProgress)
class UserProgressAdmin(admin.ModelAdmin):
    list_display = ['user_id', 'roadmap', 'node', 'completed', 'score', 'completed_at']
    list_filter = ['completed', 'roadmap', 'completed_at']
    search_fields = ['user_id']
    ordering = ['-completed_at']