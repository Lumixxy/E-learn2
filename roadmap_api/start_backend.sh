#!/bin/bash

# E-Learn Roadmap API Startup Script

echo "🚀 Starting E-Learn Roadmap API Backend..."

# Navigate to the roadmap_api directory
cd "$(dirname "$0")"

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    # Windows
    source venv/Scripts/activate
else
    # Unix/Linux/macOS
    source venv/bin/activate
fi

# Install dependencies
echo "📋 Installing dependencies..."
pip install -r requirements.txt

# Run database migrations
echo "🗄️ Running database migrations..."
python manage.py makemigrations
python manage.py migrate

# Create superuser if it doesn't exist
echo "👤 Setting up admin user..."
python manage.py shell << EOF
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
    print('Superuser created: admin/admin123')
else:
    print('Superuser already exists')
EOF

# Start the development server
echo "🌐 Starting development server on http://localhost:8000"
echo "📊 Admin panel: http://localhost:8000/admin (admin/admin123)"
echo "🔗 API docs: http://localhost:8000/api/"
echo ""
echo "Press Ctrl+C to stop the server"

python manage.py runserver 8000