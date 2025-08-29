#!/usr/bin/env python3
"""
Course Automation Toolkit

This script automates the creation of course content for the E-learn2-5 platform.
It generates course data based on templates and can optionally use LLMs for content generation.
"""

import os
import json
import yaml
import random
import argparse
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Any, Optional, Union

# Optional imports for LLM integration
try:
    import openai
    HAS_OPENAI = True
except ImportError:
    HAS_OPENAI = False

# Import the prompts module
from llm_prompts import CoursePrompts


class CourseGenerator:
    """Generates course content based on templates and optionally LLM assistance."""

    def __init__(self, template_path: str, output_dir: str, use_llm: bool = False):
        """Initialize the course generator.
        
        Args:
            template_path: Path to the course template YAML file
            output_dir: Directory to save generated courses
            use_llm: Whether to use LLM for content generation
        """
        self.template_path = template_path
        self.output_dir = output_dir
        self.use_llm = use_llm
        self.template = self._load_template()
        
        # Create output directory if it doesn't exist
        os.makedirs(output_dir, exist_ok=True)
        
        # Initialize OpenAI if available and requested
        if use_llm and HAS_OPENAI:
            openai_api_key = os.environ.get('OPENAI_API_KEY')
            if not openai_api_key:
                print("Warning: OPENAI_API_KEY not found in environment variables. LLM features disabled.")
                self.use_llm = False
            else:
                openai.api_key = openai_api_key
        elif use_llm and not HAS_OPENAI:
            print("Warning: OpenAI package not installed. LLM features disabled.")
            self.use_llm = False

    def _load_template(self) -> Dict:
        """Load the course template from YAML file."""
        with open(self.template_path, 'r') as f:
            return yaml.safe_load(f)

    def _generate_course_id(self, index: int) -> str:
        """Generate a unique course ID."""
        prefix = self.template['course_structure']['metadata']['id_prefix']
        padding = self.template['course_structure']['metadata']['id_padding']
        return f"{prefix}{str(index).zfill(padding)}"

    def _get_random_author(self) -> str:
        """Get a random author from the template."""
        return random.choice(self.template['course_structure']['authors'])

    def _generate_price(self) -> Dict[str, Union[int, float]]:
        """Generate price information for a course."""
        metadata = self.template['course_structure']['metadata']
        price_range = metadata['base_price_range']
        discount_percentage = metadata['discount_percentage']
        free_probability = metadata['free_course_probability']
        
        # Determine if course is free
        is_free = random.random() < free_probability
        
        if is_free:
            price = 0
            original_price = random.randint(price_range[0], price_range[1])
            discount_percentage = 100
        else:
            price = random.randint(price_range[0], price_range[1])
            original_price = price * 2
        
        return {
            "price": price,
            "originalPrice": original_price,
            "discountPercentage": discount_percentage,
            "isFree": is_free
        }

    def _generate_certificate_info(self) -> Dict[str, Union[bool, int]]:
        """Generate certificate information for a course."""
        threshold_range = self.template['course_structure']['metadata']['certificate_threshold_range']
        threshold = random.randint(threshold_range[0], threshold_range[1])
        
        return {
            "unlocked": False,
            "threshold": threshold
        }

    def _get_skills_for_technology(self, technology: str) -> List[str]:
        """Get skills associated with a technology."""
        for tech in self.template['course_structure']['technologies']:
            if tech['name'] == technology:
                return tech['skills']
        return [technology.lower()]

    def _get_skills_for_category(self, category: str) -> List[str]:
        """Get skills associated with a category."""
        for cat in self.template['course_structure']['categories']:
            if cat['name'] == category:
                return cat['skills']
        return [category.lower().replace(' ', '-')]

    def _get_title_format(self, technology: str, level: str) -> str:
        """Get title format for a technology and level."""
        for tech in self.template['course_structure']['technologies']:
            if tech['name'] == technology and 'title_formats' in tech:
                return tech['title_formats'].get(level, "{technology} {level} Course")
        
        # Default format if not found
        if level == "Beginner":
            return "{technology} Fundamentals"
        elif level == "Intermediate":
            return "{technology} Masterclass"
        else:  # Advanced
            return "Advanced {technology} Techniques"

    def _get_description_format(self, technology: str) -> str:
        """Get description format for a technology."""
        for tech in self.template['course_structure']['technologies']:
            if tech['name'] == technology and 'description_format' in tech:
                return tech['description_format']
        
        # Default format if not found
        return "Master {technology} for {category} with hands-on projects and real-world applications."

    def _get_image_format(self, technology: str) -> str:
        """Get image URL format for a technology."""
        for tech in self.template['course_structure']['technologies']:
            if tech['name'] == technology and 'image_format' in tech:
                return tech['image_format']
        
        # Default format if not found
        return "https://source.unsplash.com/random/300x200?{technology_lowercase},coding"

    def _generate_modules(self, technology: str, level: str) -> List[Dict]:
        """Generate modules for a course."""
        # For simplicity, we'll use the module templates from the YAML
        # In a real implementation, this would be more sophisticated
        modules = []
        
        # Select 3-5 module templates randomly
        module_count = random.randint(3, 5)
        selected_templates = random.sample(self.template['course_structure']['module_templates'], 
                                         min(module_count, len(self.template['course_structure']['module_templates'])))
        
        for i, template in enumerate(selected_templates):
            module_name = template['name'].format(technology=technology)
            lessons = [lesson.format(technology=technology) for lesson in template['lessons']]
            
            module = {
                "id": f"module_{i+1}",
                "title": module_name,
                "lessons": [{
                    "id": f"lesson_{i+1}_{j+1}",
                    "title": lesson_title,
                    "content": "",  # Would be filled by LLM in a full implementation
                    "duration": f"{random.randint(10, 30)} min",
                    "completed": False
                } for j, lesson_title in enumerate(lessons)]
            }
            
            modules.append(module)
        
        return modules

    def generate_course(self, index: int) -> Dict:
        """Generate a complete course."""
        # Randomly select technology, category, and level
        technology = random.choice([tech['name'] for tech in self.template['course_structure']['technologies']])
        
        # Find valid categories for this technology
        valid_categories = []
        for tech in self.template['course_structure']['technologies']:
            if tech['name'] == technology and 'categories' in tech:
                valid_categories = tech['categories']
                break
        
        if not valid_categories:
            valid_categories = [cat['name'] for cat in self.template['course_structure']['categories']]
        
        category = random.choice(valid_categories)
        level = random.choice(self.template['course_structure']['levels'])
        
        # Generate course ID and other metadata
        course_id = self._generate_course_id(index)
        author = self._get_random_author()
        price_info = self._generate_price()
        certificate_info = self._generate_certificate_info()
        
        # Get skills for this course
        tech_skills = self._get_skills_for_technology(technology)
        category_skills = self._get_skills_for_category(category)
        combined_skills = list(set(tech_skills + category_skills))
        
        # Generate title and description
        title_format = self._get_title_format(technology, level)
        title = title_format.format(technology=technology, level=level, category=category)
        
        description_format = self._get_description_format(technology)
        description = description_format.format(technology=technology, category=category, level=level)
        
        # Generate image URL
        image_format = self._get_image_format(technology)
        image = image_format.format(technology_lowercase=technology.lower())
        
        # Generate modules
        modules = self._generate_modules(technology, level)
        
        # Assemble the course object
        course = {
            "id": course_id,
            "title": title,
            "author": author,
            "category": category,
            "level": level,
            "price": price_info["price"],
            "originalPrice": price_info["originalPrice"],
            "discountPercentage": price_info["discountPercentage"],
            "rating": round(3.5 + random.random() * 1.5, 1),  # Random rating between 3.5 and 5.0
            "isFree": price_info["isFree"],
            "image": image,
            "tags": [technology, category, level],
            "skills": combined_skills,
            "description": description,
            "type": "coding",
            "language": technology,
            "modules": modules,
            "certificate": certificate_info
        }
        
        return course

    def generate_courses(self, count: int = 500) -> List[Dict]:
        """Generate multiple courses."""
        courses = []
        for i in range(1, count + 1):
            course = self.generate_course(i)
            courses.append(course)
            if i % 50 == 0:
                print(f"Generated {i} courses...")
        
        return courses

    def save_courses(self, courses: List[Dict], filename: str = "technical_courses.json") -> None:
        """Save generated courses to a JSON file."""
        output_path = os.path.join(self.output_dir, filename)
        with open(output_path, 'w') as f:
            json.dump(courses, f, indent=2)
        
        print(f"Saved {len(courses)} courses to {output_path}")

    def enrich_course_with_llm(self, course: Dict) -> Dict:
        """Enrich course content using LLM if enabled."""
        if not self.use_llm or not HAS_OPENAI:
            return course
        
        try:
            # Example: Generate a better description using LLM
            prompt = CoursePrompts.course_description(
                technology=course['language'],
                category=course['category'],
                level=course['level']
            )
            
            response = openai.Completion.create(
                engine="text-davinci-003",
                prompt=prompt,
                max_tokens=200,
                n=1,
                stop=None,
                temperature=0.7,
            )
            
            # Update course with generated description
            if response.choices and response.choices[0].text:
                course['description'] = response.choices[0].text.strip()
            
            # In a full implementation, we would also generate:
            # - Module content
            # - Lesson content
            # - Quiz questions
            # - Projects
            # - Learning outcomes
            # But for this example, we'll just do the description
            
        except Exception as e:
            print(f"Error enriching course with LLM: {e}")
        
        return course


def main():
    """Main function to run the course generator."""
    parser = argparse.ArgumentParser(description="Generate course content for E-learn2-5 platform")
    parser.add_argument("--template", default="course_template.yaml", help="Path to course template YAML")
    parser.add_argument("--output", default="../public/data", help="Output directory for generated courses")
    parser.add_argument("--count", type=int, default=500, help="Number of courses to generate")
    parser.add_argument("--filename", default="technical_courses.json", help="Output filename")
    parser.add_argument("--use-llm", action="store_true", help="Use LLM for content generation")
    args = parser.parse_args()
    
    # Get absolute paths
    script_dir = os.path.dirname(os.path.abspath(__file__))
    template_path = os.path.join(script_dir, args.template)
    output_dir = os.path.abspath(os.path.join(script_dir, args.output))
    
    print(f"Generating {args.count} courses using template: {template_path}")
    print(f"Output will be saved to: {os.path.join(output_dir, args.filename)}")
    
    if args.use_llm:
        print("LLM content generation is enabled")
        if not HAS_OPENAI:
            print("Warning: OpenAI package not installed. LLM features will be disabled.")
        elif not os.environ.get('OPENAI_API_KEY'):
            print("Warning: OPENAI_API_KEY not found in environment variables. LLM features will be disabled.")
    
    # Create and run the course generator
    generator = CourseGenerator(template_path, output_dir, args.use_llm)
    courses = generator.generate_courses(args.count)
    
    # Optionally enrich courses with LLM
    if args.use_llm and HAS_OPENAI and os.environ.get('OPENAI_API_KEY'):
        print("Enriching courses with LLM content...")
        for i, course in enumerate(courses):
            courses[i] = generator.enrich_course_with_llm(course)
            if (i + 1) % 10 == 0:
                print(f"Enriched {i + 1} courses...")
    
    # Save the generated courses
    generator.save_courses(courses, args.filename)
    print("Course generation complete!")


if __name__ == "__main__":
    main()