from django.db import models
import re

class Semester(models.Model):
    semester_no = models.IntegerField()
    description = models.TextField(null=True, blank=True)
    max_scu = models.IntegerField()

    def __str__(self):
        return f"Semester {self.semester_no}"

class Course(models.Model):
    course_group = models.CharField(max_length=100)
    course_code = models.CharField(max_length=50, unique=True)
    course_name = models.CharField(max_length=255)
    scu = models.IntegerField()
    is_core = models.BooleanField()
    passing_grade = models.CharField(max_length=2, null=True, blank=True, default='NA')
    prerequisites = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.course_code} - {self.course_name}"

class SemesterCourse(models.Model):
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)

    def __str__(self):
        return f"Semester {self.semester.semester_no}: {self.course.course_name} ({self.course.course_code})"


class LearningObjective(models.Model):
    code = models.CharField(max_length=10, unique=True)
    description = models.TextField()

    def __str__(self):
        return self.code

class AssessmentPlan(models.Model):
    learning_objective = models.ForeignKey(LearningObjective, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    assessment_method = models.CharField(max_length=100)
    weight = models.IntegerField()
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.learning_objective.code} - {self.course.course_name} ({self.semester.semester_no})"