from django.db import models
import json
import requests
from typing import List, Dict, Any

class Roadmap(models.Model):
    """Roadmap model that represents a learning path for a course"""
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    course_id = models.CharField(max_length=100, unique=True)
    skill_tag = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Roadmap: {self.title}"
    
    @property
    def nodes_data(self):
        """Generate nodes from course modules dynamically"""
        return self.generate_nodes_from_course()
    
    def generate_nodes_from_course(self):
        """Generate roadmap nodes based on course modules"""
        try:
            # Try to fetch course data from the main application
            course_data = self.fetch_course_data()
            if not course_data:
                return self.get_default_nodes()
            
            nodes = []
            modules = course_data.get('modules', [])
            
            for i, module in enumerate(modules):
                node = {
                    'node_id': i + 1,
                    'label': module.get('title', f'Module {i + 1}'),
                    'description': module.get('description', ''),
                    'position_x': 250 + (i % 3) * 200,  # Arrange in 3 columns
                    'position_y': 100 + (i // 3) * 120,  # Stagger rows
                    'dependencies': [i] if i > 0 else [],  # Each node depends on previous
                    'module_data': {
                        'id': module.get('id'),
                        'duration': module.get('duration', '30 min'),
                        'lessons': module.get('lessons', []),
                        'quiz': module.get('quiz', []),
                    }
                }
                nodes.append(node)
            
            return nodes
            
        except Exception as e:
            print(f"Error generating nodes: {e}")
            return self.get_default_nodes()
    
    def fetch_course_data(self):
        """Fetch course data from the main application's courses.json"""
        try:
            # In production, this would be a proper API call
            # For now, we'll simulate course data based on course_id
            course_templates = {
                'html': {
                    'title': 'HTML Fundamentals',
                    'modules': [
                        {
                            'id': 'html_1',
                            'title': 'HTML Basics',
                            'description': 'Learn the fundamentals of HTML markup',
                            'duration': '45 min',
                            'lessons': [
                                {'title': 'HTML Elements', 'type': 'reading'},
                                {'title': 'HTML Attributes', 'type': 'video'},
                            ],
                            'quiz': [
                                {
                                    'question': 'What does HTML stand for?',
                                    'options': ['HyperText Markup Language', 'Home Tool Markup Language'],
                                    'correct': 0
                                }
                            ]
                        },
                        {
                            'id': 'html_2',
                            'title': 'HTML Forms',
                            'description': 'Create interactive forms with HTML',
                            'duration': '60 min',
                            'lessons': [
                                {'title': 'Form Elements', 'type': 'reading'},
                                {'title': 'Form Validation', 'type': 'video'},
                            ]
                        },
                        {
                            'id': 'html_3',
                            'title': 'Semantic HTML',
                            'description': 'Use semantic elements for better structure',
                            'duration': '50 min',
                            'lessons': [
                                {'title': 'Semantic Elements', 'type': 'reading'},
                                {'title': 'Accessibility', 'type': 'video'},
                            ]
                        }
                    ]
                },
                'python': {
                    'title': 'Python Programming',
                    'modules': [
                        {
                            'id': 'py_1',
                            'title': 'Python Basics',
                            'description': 'Learn Python syntax and fundamentals',
                            'duration': '90 min',
                            'lessons': [
                                {'title': 'Variables and Data Types', 'type': 'reading'},
                                {'title': 'Control Structures', 'type': 'coding'},
                            ]
                        },
                        {
                            'id': 'py_2',
                            'title': 'Functions and Modules',
                            'description': 'Create reusable code with functions',
                            'duration': '75 min',
                            'lessons': [
                                {'title': 'Defining Functions', 'type': 'coding'},
                                {'title': 'Importing Modules', 'type': 'reading'},
                            ]
                        },
                        {
                            'id': 'py_3',
                            'title': 'Object-Oriented Programming',
                            'description': 'Learn OOP concepts in Python',
                            'duration': '120 min',
                            'lessons': [
                                {'title': 'Classes and Objects', 'type': 'coding'},
                                {'title': 'Inheritance', 'type': 'reading'},
                            ]
                        },
                        {
                            'id': 'py_4',
                            'title': 'Data Structures',
                            'description': 'Work with lists, dicts, and sets',
                            'duration': '100 min',
                            'lessons': [
                                {'title': 'Lists and Tuples', 'type': 'coding'},
                                {'title': 'Dictionaries and Sets', 'type': 'coding'},
                            ]
                        }
                    ]
                },
                'react': {
                    'title': 'React Development',
                    'modules': [
                        {
                            'id': 'react_1',
                            'title': 'React Fundamentals',
                            'description': 'Learn React components and JSX',
                            'duration': '80 min',
                            'lessons': [
                                {'title': 'Components and JSX', 'type': 'coding'},
                                {'title': 'Props and State', 'type': 'video'},
                            ]
                        },
                        {
                            'id': 'react_2',
                            'title': 'React Hooks',
                            'description': 'Master useState, useEffect, and custom hooks',
                            'duration': '90 min',
                            'lessons': [
                                {'title': 'useState Hook', 'type': 'coding'},
                                {'title': 'useEffect Hook', 'type': 'coding'},
                            ]
                        },
                        {
                            'id': 'react_3',
                            'title': 'State Management',
                            'description': 'Advanced state management patterns',
                            'duration': '70 min',
                            'lessons': [
                                {'title': 'Context API', 'type': 'coding'},
                                {'title': 'Redux Basics', 'type': 'video'},
                            ]
                        }
                    ]
                }
            }
            
            # Determine course type from course_id or title
            skill_tag = self.skill_tag.lower() if self.skill_tag else ''
            course_key = None
            
            if 'html' in skill_tag or 'html' in self.title.lower():
                course_key = 'html'
            elif 'python' in skill_tag or 'python' in self.title.lower():
                course_key = 'python'
            elif 'react' in skill_tag or 'react' in self.title.lower():
                course_key = 'react'
            
            return course_templates.get(course_key, course_templates['python'])
            
        except Exception as e:
            print(f"Error fetching course data: {e}")
            return None
    
    def get_default_nodes(self):
        """Fallback default nodes if course data can't be fetched"""
        return [
            {
                'node_id': 1,
                'label': 'Introduction',
                'description': 'Course introduction and overview',
                'position_x': 250,
                'position_y': 100,
                'dependencies': [],
            },
            {
                'node_id': 2,
                'label': 'Fundamentals',
                'description': 'Core concepts and basics',
                'position_x': 250,
                'position_y': 220,
                'dependencies': [1],
            },
            {
                'node_id': 3,
                'label': 'Practice',
                'description': 'Hands-on exercises and projects',
                'position_x': 250,
                'position_y': 340,
                'dependencies': [2],
            },
            {
                'node_id': 4,
                'label': 'Assessment',
                'description': 'Final assessment and evaluation',
                'position_x': 250,
                'position_y': 460,
                'dependencies': [3],
            }
        ]


class RoadmapNode(models.Model):
    """Individual node in a roadmap"""
    roadmap = models.ForeignKey(Roadmap, on_delete=models.CASCADE, related_name='nodes')
    node_id = models.IntegerField()
    label = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    position_x = models.IntegerField(default=0)
    position_y = models.IntegerField(default=0)
    dependencies = models.JSONField(default=list)  # List of node_ids this node depends on
    module_data = models.JSONField(default=dict)  # Additional module information
    
    class Meta:
        unique_together = ('roadmap', 'node_id')
        ordering = ['node_id']
    
    def __str__(self):
        return f"{self.roadmap.title} - Node {self.node_id}: {self.label}"


class UserProgress(models.Model):
    """Track user progress through roadmap nodes"""
    user_id = models.CharField(max_length=100)  # In production, this would be a ForeignKey to User
    roadmap = models.ForeignKey(Roadmap, on_delete=models.CASCADE)
    node = models.ForeignKey(RoadmapNode, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)
    score = models.IntegerField(null=True, blank=True)  # Score if applicable
    completed_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        unique_together = ('user_id', 'roadmap', 'node')
    
    def __str__(self):
        return f"User {self.user_id} - {self.roadmap.title} - Node {self.node.node_id}"