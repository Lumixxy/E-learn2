from django.db import models

class Course(models.Model):
    course = models.CharField(max_length=200)
    module = models.CharField(max_length=200)
    topic = models.CharField(max_length=200)
    websiteLink = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.course} - {self.module}" 