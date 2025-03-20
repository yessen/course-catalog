# course-catalog


Course Catalog is a Demo Project which is done as part of the internship by @WilliamKenHartono (William Ken Hartono), @brilianvy2 (Brillian Yudha), @daffasyaidina (Daffa Syaidina).

The techstack used is:
- Django
- Django-REST-Framework
- React
- Vite
- TailwindCSS
- PostgreSQL

**Course Catalog Backend Setup Guide**


Prerequisites

Ensure you have the following installed:

- Python (>=3.8)
- PostgreSQL
- Node.js (>=16.0)
- Git

Step 1: Clone repository
command: git clone https://github.com/yessen/course-catalog

Step 2: Go to cc_backend repository and then towards scripts
command: cd cc_backend
         cd scripts

Step 3: Run the setup script for this project
command: python setup_project.py

Step 4: Copy the wanted semester from document "Curriculum Document School of Computing and Creative Arts Computer Science (International Program)" and paste it onto curriculum.txt

Step 5: Run the populating curriculum script to populate data from the selected semester
command: python populate_curriculum.py

Step 6: To check if everything is working run the server !! BE SURE TO BE IN cc_backend DIRECTORY BEFORE RUNNING THE COMMAND !!
command: python manage.py runserver

DONE!