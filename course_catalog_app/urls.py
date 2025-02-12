from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SemesterViewSet, CourseViewSet, SemesterCourseViewSet

router = DefaultRouter()
router.register(r'semesters', SemesterViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'semester-courses', SemesterCourseViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
