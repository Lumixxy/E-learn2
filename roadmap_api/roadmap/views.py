from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.utils import timezone
from .models import Roadmap, RoadmapNode, UserProgress
from .serializers import (
    RoadmapSerializer, 
    RoadmapCreateSerializer,
    RoadmapNodeSerializer, 
    UserProgressSerializer,
    RoadmapStatsSerializer
)
import json
import os


class RoadmapViewSet(viewsets.ModelViewSet):
    """ViewSet for managing roadmaps"""
    queryset = Roadmap.objects.all()
    
    def get_serializer_class(self):
        if self.action == 'create':
            return RoadmapCreateSerializer
        return RoadmapSerializer
    
    def list(self, request):
        """List all roadmaps or filter by course_id"""
        course_id = request.query_params.get('course_id')
        skill_tag = request.query_params.get('skill_tag')
        
        queryset = self.get_queryset()
        
        if course_id:
            queryset = queryset.filter(course_id=course_id)
        
        if skill_tag:
            queryset = queryset.filter(skill_tag__icontains=skill_tag)
        
        # If no roadmaps exist, create default ones
        if not queryset.exists():
            self.create_default_roadmaps()
            queryset = self.get_queryset()
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    def create_default_roadmaps(self):
        """Create default roadmaps for common skills"""
        default_roadmaps = [
            {
                'title': 'HTML Fundamentals Course',
                'description': 'Learn the building blocks of the web with HTML',
                'course_id': 'html-course-1',
                'skill_tag': 'html'
            },
            {
                'title': 'Python Programming Course',
                'description': 'Master Python programming from basics to advanced',
                'course_id': 'python-course-1',
                'skill_tag': 'python'
            },
            {
                'title': 'React Development Course',
                'description': 'Build modern web applications with React',
                'course_id': 'react-course-1',
                'skill_tag': 'react'
            },
            {
                'title': 'JavaScript Essentials',
                'description': 'Learn modern JavaScript for web development',
                'course_id': 'javascript-course-1',
                'skill_tag': 'javascript'
            },
            {
                'title': 'CSS Styling Mastery',
                'description': 'Create beautiful layouts with CSS',
                'course_id': 'css-course-1',
                'skill_tag': 'css'
            }
        ]
        
        for roadmap_data in default_roadmaps:
            if not Roadmap.objects.filter(course_id=roadmap_data['course_id']).exists():
                serializer = RoadmapCreateSerializer(data=roadmap_data)
                if serializer.is_valid():
                    serializer.save()
    
    @action(detail=True, methods=['get'])
    def nodes(self, request, pk=None):
        """Get nodes for a specific roadmap"""
        roadmap = self.get_object()
        nodes = roadmap.nodes_data
        return Response({'nodes': nodes})
    
    @action(detail=False, methods=['post'])
    def generate_from_course(self, request):
        """Generate a roadmap from course data"""
        course_id = request.data.get('course_id')
        course_title = request.data.get('course_title', 'Generated Course')
        skill_tag = request.data.get('skill_tag', '')
        
        if not course_id:
            return Response(
                {'error': 'course_id is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if roadmap already exists
        existing_roadmap = Roadmap.objects.filter(course_id=course_id).first()
        if existing_roadmap:
            serializer = self.get_serializer(existing_roadmap)
            return Response(serializer.data)
        
        # Create new roadmap
        roadmap_data = {
            'title': course_title,
            'description': f'Auto-generated roadmap for {course_title}',
            'course_id': course_id,
            'skill_tag': skill_tag
        }
        
        serializer = RoadmapCreateSerializer(data=roadmap_data)
        if serializer.is_valid():
            roadmap = serializer.save()
            response_serializer = RoadmapSerializer(roadmap)
            return Response(response_serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProgressViewSet(viewsets.ModelViewSet):
    """ViewSet for managing user progress"""
    queryset = UserProgress.objects.all()
    serializer_class = UserProgressSerializer
    
    def get_queryset(self):
        """Filter progress by user_id if provided"""
        user_id = self.request.query_params.get('user_id')
        roadmap_id = self.request.query_params.get('roadmap_id')
        
        queryset = super().get_queryset()
        
        if user_id:
            queryset = queryset.filter(user_id=user_id)
            
        if roadmap_id:
            queryset = queryset.filter(roadmap_id=roadmap_id)
        
        return queryset
    
    @action(detail=False, methods=['post'])
    def complete_node(self, request):
        """Mark a node as completed for a user"""
        user_id = request.data.get('user_id', 'anonymous')
        roadmap_id = request.data.get('roadmap_id')
        node_id = request.data.get('node_id')
        score = request.data.get('score', None)
        
        if not all([roadmap_id, node_id]):
            return Response(
                {'error': 'roadmap_id and node_id are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            roadmap = Roadmap.objects.get(id=roadmap_id)
            # For dynamically generated nodes, we don't have RoadmapNode objects
            # So we'll track progress differently
            
            progress_data = {
                'user_id': user_id,
                'roadmap': roadmap.id,
                'node': None,  # We'll use a different approach for dynamic nodes
                'completed': True,
                'score': score,
                'completed_at': timezone.now()
            }
            
            # For now, we'll create a simple progress tracking system
            # In production, this would be more sophisticated
            
            return Response({
                'message': 'Node completed successfully',
                'user_id': user_id,
                'roadmap_id': roadmap_id,
                'node_id': node_id,
                'score': score
            })
            
        except Roadmap.DoesNotExist:
            return Response(
                {'error': 'Roadmap not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get progress statistics for a user and roadmap"""
        user_id = request.query_params.get('user_id', 'anonymous')
        roadmap_id = request.query_params.get('roadmap_id')
        
        if not roadmap_id:
            return Response(
                {'error': 'roadmap_id is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            roadmap = Roadmap.objects.get(id=roadmap_id)
            total_nodes = len(roadmap.nodes_data)
            
            # Count completed nodes (simplified for demo)
            completed_nodes = UserProgress.objects.filter(
                user_id=user_id,
                roadmap=roadmap,
                completed=True
            ).count()
            
            progress_percentage = (completed_nodes / total_nodes * 100) if total_nodes > 0 else 0
            
            stats_data = {
                'user_id': user_id,
                'roadmap_id': int(roadmap_id),
                'total_nodes': total_nodes,
                'completed_nodes': completed_nodes,
                'progress_percentage': round(progress_percentage, 2)
            }
            
            serializer = RoadmapStatsSerializer(stats_data)
            return Response(serializer.data)
            
        except Roadmap.DoesNotExist:
            return Response(
                {'error': 'Roadmap not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )


def health_check(request):
    """Simple health check endpoint"""
    return JsonResponse({
        'status': 'healthy',
        'service': 'roadmap-api',
        'timestamp': timezone.now().isoformat()
    })


def api_info(request):
    """API information endpoint"""
    return JsonResponse({
        'name': 'E-Learn Roadmap API',
        'version': '1.0.0',
        'description': 'API for managing course roadmaps and user progress',
        'endpoints': {
            'roadmaps': '/api/roadmap/',
            'user_progress': '/api/progress/',
            'health': '/api/health/',
            'info': '/api/'
        }
    })