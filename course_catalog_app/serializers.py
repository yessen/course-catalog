from rest_framework import serializers
from .models import Semester, Course, SemesterCourse

class SemesterSerializer(serializers.ModelSerializer):
    """
    Serializer for the Semester model.
    Converts Semester model instances to JSON format.
    """

    id = serializers.IntegerField(help_text="Unique identifier for the semester.")
    name = serializers.CharField(max_length=100, help_text="Semester name (e.g., Semester 1, Semester 2).")

    class Meta:
        model = Semester
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    """
    Serializer for the Course model.
    Handles course-related data transformation.
    """

    course_code = serializers.CharField(
        max_length=20, 
        help_text="Unique course code (e.g., COMP6047001)."
    )
    course_name = serializers.CharField(
        max_length=255, 
        help_text="Full course name (e.g., Algorithm and Programming)."
    )
    scu = serializers.IntegerField(help_text="Number of Semester Credit Units (SCU) for the course.")
    passing_grade = serializers.CharField(
        required=False, allow_null=True, allow_blank=True, 
        help_text="The minimum grade required to pass the course (optional)."
    )

    class Meta:
        model = Course
        fields = '__all__'


class SemesterCourseSerializer(serializers.ModelSerializer):
    """
    Serializer for the SemesterCourse model.
    Represents the relationship between Semesters and Courses.
    """

    semester_id = serializers.PrimaryKeyRelatedField(
        queryset=Semester.objects.all(),
        source="semester",
        help_text="The ID of the semester this course belongs to."
    )
    course_id = serializers.PrimaryKeyRelatedField(
        queryset=Course.objects.all(),
        source="course",
        help_text="The ID of the course assigned to this semester."
    )

    class Meta:
        model = SemesterCourse
        fields = ['id', 'semester_id', 'course_id']
