from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Semester, Course, SemesterCourse
from .serializers import SemesterSerializer, CourseSerializer, SemesterCourseSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class SemesterViewSet(viewsets.ModelViewSet):
    queryset = Semester.objects.all()
    serializer_class = SemesterSerializer
    permission_classes = [IsAuthenticated]

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

class SemesterCourseViewSet(viewsets.ModelViewSet):
    queryset = SemesterCourse.objects.all()
    serializer_class = SemesterCourseSerializer
    permission_classes = [IsAuthenticated]
