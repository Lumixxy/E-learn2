from rest_framework import serializers
from .models import Roadmap, RoadmapNode, UserProgress


class RoadmapNodeSerializer(serializers.ModelSerializer):
    """Serializer for individual roadmap nodes"""
    
    class Meta:
        model = RoadmapNode
        fields = ['node_id', 'label', 'description', 'position_x', 'position_y', 'dependencies', 'module_data']


class RoadmapSerializer(serializers.ModelSerializer):
    """Serializer for roadmap with dynamic nodes"""
    nodes = serializers.SerializerMethodField()
    id = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Roadmap
        fields = ['id', 'title', 'description', 'course_id', 'skill_tag', 'nodes', 'created_at']
    
    def get_nodes(self, obj):
        """Return dynamically generated nodes"""
        return obj.nodes_data


class RoadmapCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating new roadmaps"""
    
    class Meta:
        model = Roadmap
        fields = ['title', 'description', 'course_id', 'skill_tag']
        
    def create(self, validated_data):
        """Create roadmap and automatically generate nodes"""
        roadmap = Roadmap.objects.create(**validated_data)
        
        # Generate and save nodes
        nodes_data = roadmap.nodes_data
        for node_data in nodes_data:
            RoadmapNode.objects.create(
                roadmap=roadmap,
                node_id=node_data['node_id'],
                label=node_data['label'],
                description=node_data['description'],
                position_x=node_data['position_x'],
                position_y=node_data['position_y'],
                dependencies=node_data.get('dependencies', []),
                module_data=node_data.get('module_data', {})
            )
        
        return roadmap


class UserProgressSerializer(serializers.ModelSerializer):
    """Serializer for user progress tracking"""
    
    class Meta:
        model = UserProgress
        fields = ['user_id', 'roadmap', 'node', 'completed', 'score', 'completed_at']
        
    def create(self, validated_data):
        """Create or update user progress"""
        user_id = validated_data['user_id']
        roadmap = validated_data['roadmap']
        node = validated_data['node']
        
        progress, created = UserProgress.objects.get_or_create(
            user_id=user_id,
            roadmap=roadmap,
            node=node,
            defaults=validated_data
        )
        
        if not created:
            # Update existing progress
            for key, value in validated_data.items():
                setattr(progress, key, value)
            progress.save()
        
        return progress


class RoadmapStatsSerializer(serializers.Serializer):
    """Serializer for roadmap statistics"""
    total_nodes = serializers.IntegerField()
    completed_nodes = serializers.IntegerField()
    progress_percentage = serializers.FloatField()
    user_id = serializers.CharField()
    roadmap_id = serializers.IntegerField()