from rest_framework import serializers
from .models import Semester, Course, SemesterCourse

class SemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semester
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    passing_grade = serializers.CharField(required=False, allow_null=True, allow_blank=True)

    class Meta:
        model = Course
        fields = '__all__'

class SemesterCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = SemesterCourse
        fields = '__all__'
