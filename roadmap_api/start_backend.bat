@echo off
echo 🚀 Starting E-Learn Roadmap API Backend...

cd /d "%~dp0"

REM Check if virtual environment exists
if not exist "venv\" (
    echo 📦 Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo 🔧 Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies
echo 📋 Installing dependencies...
pip install -r requirements.txt

REM Run database migrations
echo 🗄️ Running database migrations...
python manage.py makemigrations
python manage.py migrate

REM Create superuser if it doesn't exist
echo 👤 Setting up admin user...
python manage.py shell -c "
from django.contrib.auth import get_user_model;
User = get_user_model();
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'admin123');
    print('Superuser created: admin/admin123');
else:
    print('Superuser already exists');
"

REM Start the development server
echo 🌐 Starting development server on http://localhost:8000
echo 📊 Admin panel: http://localhost:8000/admin (admin/admin123)
echo 🔗 API docs: http://localhost:8000/api/
echo.
echo Press Ctrl+C to stop the server

python manage.py runserver 8000

pause