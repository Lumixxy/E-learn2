"""
LLM Prompts for Course Content Generation
This module contains prompt templates for generating course content using LLMs.
"""

class CoursePrompts:
    """Collection of prompts for generating course content."""

    @staticmethod
    def course_description(technology, category, level):
        """Generate a detailed course description."""
        return f"""
        Create a detailed and engaging course description for a {level.lower()} level 
        {technology} course focused on {category}. The description should:
        
        1. Highlight the key skills learners will gain
        2. Mention specific projects or applications they will build
        3. Explain why these skills are valuable in today's market
        4. Include who this course is ideal for (target audience)
        5. Be approximately 150-200 words in length
        6. Use professional but engaging language
        """

    @staticmethod
    def module_content(technology, module_name, level):
        """Generate module content structure."""
        return f"""
        Create a detailed outline for a module titled "{module_name}" in a {level.lower()} level 
        {technology} course. For each lesson in this module, provide:
        
        1. A clear lesson title
        2. 3-5 key learning objectives for the lesson
        3. A brief summary of the content (100-150 words)
        4. 2-3 practical exercises or coding challenges
        5. A list of any resources or references needed
        """

    @staticmethod
    def lesson_content(technology, lesson_title, level):
        """Generate detailed lesson content."""
        return f"""
        Create comprehensive content for a lesson titled "{lesson_title}" in a {level.lower()} level 
        {technology} course. The lesson content should include:
        
        1. An engaging introduction that explains why this topic matters
        2. Clear explanations of all key concepts with examples
        3. Step-by-step code examples with explanations
        4. Common pitfalls or mistakes to avoid
        5. Best practices related to this topic
        6. A practical exercise that reinforces the concepts
        7. A brief summary that reinforces the key takeaways
        """

    @staticmethod
    def quiz_questions(technology, lesson_title, level):
        """Generate quiz questions for a lesson."""
        return f"""
        Create 5 quiz questions for a lesson titled "{lesson_title}" in a {level.lower()} level 
        {technology} course. For each question:
        
        1. Provide a clear, specific question that tests understanding (not just recall)
        2. For multiple choice questions, provide 4 options with only one correct answer
        3. Include a mix of question types (multiple choice, true/false, code analysis)
        4. Indicate the correct answer
        5. Provide a brief explanation of why the answer is correct
        """

    @staticmethod
    def project_assignment(technology, category, level):
        """Generate a project assignment."""
        return f"""
        Design a comprehensive project assignment for a {level.lower()} level 
        {technology} course focused on {category}. The project should:
        
        1. Require application of all major concepts covered in the course
        2. Solve a realistic problem or create a useful application
        3. Include clear requirements and deliverables
        4. Provide a rubric with evaluation criteria
        5. Be challenging but achievable for a {level.lower()} student
        6. Include stretch goals for advanced students
        7. Specify any starter code or resources provided
        """

    @staticmethod
    def course_prerequisites(technology, category, level):
        """Generate course prerequisites."""
        return f"""
        Determine the appropriate prerequisites for a {level.lower()} level 
        {technology} course focused on {category}. Include:
        
        1. Required prior knowledge or skills
        2. Specific technologies or languages students should be familiar with
        3. Any courses that should be completed before this one
        4. Recommended experience level
        5. Any required software or hardware
        """

    @staticmethod
    def learning_outcomes(technology, category, level):
        """Generate learning outcomes for a course."""
        return f"""
        Create 5-7 specific learning outcomes for a {level.lower()} level 
        {technology} course focused on {category}. Each learning outcome should:
        
        1. Start with an action verb (e.g., create, design, implement, analyze)
        2. Be specific and measurable
        3. Focus on valuable skills that employers seek
        4. Be appropriate for the {level.lower()} level
        5. Collectively cover both theoretical knowledge and practical skills
        """

    @staticmethod
    def instructor_notes(technology, module_name, level):
        """Generate instructor notes for a module."""
        return f"""
        Create detailed instructor notes for teaching a module titled "{module_name}" in a {level.lower()} level 
        {technology} course. Include:
        
        1. Common student misconceptions or difficulties with this topic
        2. Suggested teaching approaches or analogies that work well
        3. Ideas for in-class demonstrations or activities
        4. Tips for addressing questions that frequently arise
        5. Suggestions for differentiating instruction for struggling or advanced students
        6. Recommended pace and time allocation for different sections
        """