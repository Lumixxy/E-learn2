# E-Learn Roadmap API Backend

A Django REST API backend for managing course roadmaps and user progress tracking.

## 🚀 Quick Start

### Windows
```bash
cd roadmap_api
start_backend.bat
```

### Unix/Linux/macOS
```bash
cd roadmap_api
chmod +x start_backend.sh
./start_backend.sh
```

The API will be available at: `http://localhost:8000`

## 📋 Prerequisites

- Python 3.8+
- pip (Python package installer)

## 🔧 Manual Setup

1. **Create virtual environment:**
   ```bash
   python -m venv venv
   ```

2. **Activate virtual environment:**
   - Windows: `venv\Scripts\activate`
   - Unix/Linux/macOS: `source venv/bin/activate`

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create superuser:**
   ```bash
   python manage.py createsuperuser
   ```

6. **Start server:**
   ```bash
   python manage.py runserver 8000
   ```

## 🌐 API Endpoints

### Roadmaps
- `GET /api/roadmap/` - List all roadmaps
- `POST /api/roadmap/` - Create new roadmap
- `GET /api/roadmap/{id}/` - Get specific roadmap
- `PUT /api/roadmap/{id}/` - Update roadmap
- `DELETE /api/roadmap/{id}/` - Delete roadmap
- `GET /api/roadmap/{id}/nodes/` - Get roadmap nodes
- `POST /api/roadmap/generate_from_course/` - Generate roadmap from course

### User Progress
- `GET /api/progress/` - List user progress
- `POST /api/progress/` - Create/update progress
- `POST /api/progress/complete_node/` - Mark node as completed
- `GET /api/progress/stats/` - Get progress statistics

### System
- `GET /api/` - API information
- `GET /api/health/` - Health check

## 📊 Admin Panel

Access the admin panel at: `http://localhost:8000/admin`

Default credentials:
- Username: `admin`
- Password: `admin123`

## 🗄️ Database Models

### Roadmap
- `title` - Roadmap title
- `description` - Roadmap description
- `course_id` - Associated course ID
- `skill_tag` - Skill category tag
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

### RoadmapNode
- `roadmap` - Parent roadmap
- `node_id` - Unique node identifier
- `label` - Node display name
- `description` - Node description
- `position_x` - X coordinate for UI
- `position_y` - Y coordinate for UI
- `dependencies` - List of prerequisite node IDs
- `module_data` - Additional module information

### UserProgress
- `user_id` - User identifier
- `roadmap` - Associated roadmap
- `node` - Completed node
- `completed` - Completion status
- `score` - Achievement score
- `completed_at` - Completion timestamp

## 🔄 Integration with Frontend

The CourseRoadmap component fetches data from this API:

```javascript
const response = await fetch('http://localhost:8000/api/roadmap/');
const roadmaps = await response.json();
```

### Dynamic Node Generation

Roadmaps automatically generate nodes based on course data:

```json
{
  "id": 1,
  "title": "Python Programming Course",
  "course_id": "python-course-1",
  "skill_tag": "python",
  "nodes": [
    {
      "node_id": 1,
      "label": "Python Basics",
      "description": "Learn Python syntax and fundamentals",
      "position_x": 250,
      "position_y": 100,
      "dependencies": [],
      "module_data": {
        "duration": "90 min",
        "lessons": [...]
      }
    }
  ]
}
```

## 🎯 Course Templates

The API includes built-in templates for common skills:

- **HTML**: HTML Basics, HTML Forms, Semantic HTML
- **Python**: Python Basics, Functions & Modules, OOP, Data Structures
- **React**: React Fundamentals, React Hooks, State Management

## 📝 API Usage Examples

### Create Roadmap from Course
```bash
curl -X POST http://localhost:8000/api/roadmap/generate_from_course/ \
  -H "Content-Type: application/json" \
  -d '{
    "course_id": "course_001",
    "course_title": "Advanced Python",
    "skill_tag": "python"
  }'
```

### Mark Node as Completed
```bash
curl -X POST http://localhost:8000/api/progress/complete_node/ \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "user123",
    "roadmap_id": 1,
    "node_id": 1,
    "score": 95
  }'
```

### Get Progress Statistics
```bash
curl "http://localhost:8000/api/progress/stats/?user_id=user123&roadmap_id=1"
```

## 🔒 CORS Configuration

The API is configured to accept requests from:
- `http://localhost:3000` (React frontend)
- `http://127.0.0.1:3000`

## 🐛 Troubleshooting

### Port Already in Use
If port 8000 is busy, run on a different port:
```bash
python manage.py runserver 8001
```

### Database Issues
Reset the database:
```bash
rm db.sqlite3
python manage.py migrate
python manage.py createsuperuser
```

### Dependencies
Install specific versions:
```bash
pip install Django==4.2.7 djangorestframework==3.14.0
```

## 🚀 Production Deployment

For production deployment:

1. **Environment Variables:**
   ```bash
   export DJANGO_SECRET_KEY="your-secret-key"
   export DJANGO_DEBUG=False
   export DJANGO_ALLOWED_HOSTS="yourdomain.com"
   ```

2. **Database:**
   - Configure PostgreSQL or MySQL
   - Update `DATABASES` in settings.py

3. **Static Files:**
   ```bash
   python manage.py collectstatic
   ```

4. **WSGI Server:**
   ```bash
   gunicorn roadmap_api.wsgi:application
   ```

## 📈 Monitoring

Health check endpoint: `GET /api/health/`

Response:
```json
{
  "status": "healthy",
  "service": "roadmap-api",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

This project is part of the E-Learn platform and follows the same licensing terms.