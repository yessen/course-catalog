python3 -m venv cc-env
source cc-env/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

python manage.py makemigrations
python manage.py makemigrations course_catalog_app
python manage.py migrate
python manage.py collectstatic --noinput
