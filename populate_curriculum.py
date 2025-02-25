import re
import django
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "course_catalog.settings")
django.setup()

from course_catalog_app.models import Semester, Course, SemesterCourse


def populate_curriculum(document_text):
    # Ensure semesters 1-8 exist
    for i in range(1, 9):
        Semester.objects.get_or_create(semester_no=i, defaults={'max_scu': 20})

    # Regex pattern to match each semester and its courses
    semester_pattern = re.compile(r'SEMESTER (\d+)\nGroup Course SCU\n((?:.+\n)+?)Total SCU', re.MULTILINE)

    for semester_match in semester_pattern.finditer(document_text):
        semester_number = int(semester_match.group(1))
        semester = Semester.objects.get(semester_no=semester_number)

        courses_text = semester_match.group(2).strip()
        course_pattern = re.compile(r'([A-Z]+)\s+([A-Z0-9]+)\s+(.+?)\s+(\d+)')

        for course_match in course_pattern.finditer(courses_text):
            course_group, course_code, course_name, scu = course_match.groups()

            # Create course if not exists
            course, _ = Course.objects.get_or_create(
                course_code=course_code,
                defaults={
                    'course_name': course_name.strip(),
                    'course_group': course_group.strip(),
                    'scu': int(scu),
                    'is_core': True,  # Defaulting all as core courses
                    'passing_grade': 'NA',
                    'prerequisites': ''
                }
            )

            # Link course to semester
            SemesterCourse.objects.get_or_create(semester=semester, course=course)

    return "Curriculum successfully populated!"

# Example usage
with open("curriculum.txt", "r") as file:
    curriculum_text = file.read()

result = populate_curriculum(curriculum_text)
print(result)
