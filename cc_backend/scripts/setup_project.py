import os
import subprocess
import sys

def run_command(command, shell=True):
    """Run a system command and print the output"""
    print(f"Running: {command}")
    result = subprocess.run(command, shell=shell, text=True, capture_output=True)
    if result.returncode != 0:
        print(f"Error: {result.stderr}")
        sys.exit(1)
    else:
        print(result.stdout)

def install_dependencies():
    """Install necessary Python dependencies"""
    print("Installing dependencies...")
    
    # Ensure pip is upgraded first
    run_command("pip install --upgrade pip")

    # Install dependencies from requirements.txt if available
    requirements_file = "requirements.txt"
    if os.path.exists(requirements_file):
        run_command(f"pip install -r {requirements_file}")
    else:
        print("Warning: requirements.txt not found. Installing dependencies manually.")
        run_command("pip install django==4.2.20 djangorestframework==3.15.2 psycopg2-binary==2.9.10 drf-yasg==1.21.9 supabase")

def setup_postgresql():
    """Set up PostgreSQL database"""
    print("Setting up PostgreSQL...")

    db_name = "course_catalog_db"
    db_user = "postgres"
    db_password = "1234"
    db_host = "db.fdxewxdpalqnzrkfblld.supabase.co"
    db_port = "5432"

    # Ensure psql is installed
    try:
        run_command("psql --version")
    except SystemExit:
        print("Error: psql is not installed or not in PATH. Please install PostgreSQL client tools.")
        sys.exit(1)

    # Set environment variable for password authentication
    os.environ['PGPASSWORD'] = db_password

    # Check if the database already exists
    check_db_command = f'psql -h {db_host} -p {db_port} -U {db_user} -lqt | cut -d \| -f 1 | grep -w {db_name}'
    result = subprocess.run(check_db_command, shell=True, text=True, capture_output=True)

    if db_name in result.stdout:
        print(f"Database '{db_name}' already exists. Skipping creation.")
    else:
        create_db_command = f'psql -h {db_host} -p {db_port} -U {db_user} -c "CREATE DATABASE {db_name};"'
        run_command(create_db_command)

def update_django_settings():
    """Update Django settings for Supabase connection"""
    settings_path = "course_catalog/settings.py"

    # Check if settings.py exists
    if not os.path.exists(settings_path):
        print(f"Error: {settings_path} not found. Ensure you're in the correct directory.")
        sys.exit(1)

    db_config = f"""
# Added by setup script
DATABASES = {{
    'default': {{
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'course_catalog_db',
        'USER': 'postgres',
        'PASSWORD': '1234',
        'HOST': 'db.fdxewxdpalqnzrkfblld.supabase.co',
        'PORT': '5432',
    }}
}}
"""
    with open(settings_path, "a") as f:
        f.write(db_config)
    print("Updated Django settings.")

def run_migrations():
    """Run Django migrations"""
    run_command("python manage.py makemigrations")
    run_command("python manage.py migrate")

def start_django_server():
    """Start Django development server"""
    print("Starting Django server at http://127.0.0.1:8000/")
    run_command("python manage.py runserver")

if __name__ == "__main__":
    install_dependencies()
    setup_postgresql()
    update_django_settings()
    run_migrations()
    start_django_server()
