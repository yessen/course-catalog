from django.contrib import admin
from .models import Semester, Course, SemesterCourse

admin.site.register(Semester)
admin.site.register(Course)
admin.site.register(SemesterCourse)
