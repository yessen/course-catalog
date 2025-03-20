from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Semester, Course, SemesterCourse
from .serializers import SemesterSerializer, CourseSerializer, SemesterCourseSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
import json

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

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get("username")
            password = data.get("password")

            user = authenticate(username=username, password=password)
            if user:
                # Generate or retrieve token
                token, _ = Token.objects.get_or_create(user=user)
                return JsonResponse({"message": "Login successful", "token": token.key})
            else:
                return JsonResponse({"error": "Invalid credentials"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request"}, status=400)
