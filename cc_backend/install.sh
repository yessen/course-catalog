python3 -m venv sc-env
source sc-env/bin/activate
pip install -r requirements.txt

python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --noinput
