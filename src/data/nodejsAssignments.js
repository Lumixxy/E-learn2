const nodejsAssignments = {
  'nodejs-assignment-1': {
    title: 'REST API Development',
    description: 'Create a complete REST API for a todo application using Express.js',
    type: 'coding',
    difficulty: 'intermediate',
    estimatedTime: '6 hours',
    passingGrade: 70,
    maxAttempts: 3,
    
    objectives: [
      'Build a RESTful API with Express.js',
      'Implement CRUD operations for todo items',
      'Use proper HTTP status codes',
      'Add input validation and error handling',
      'Structure code with proper separation of concerns'
    ],
    
    requirements: [
      'Create Express.js server with proper middleware setup',
      'Implement GET /api/todos - retrieve all todos',
      'Implement POST /api/todos - create new todo',
      'Implement PUT /api/todos/:id - update existing todo',
      'Implement DELETE /api/todos/:id - delete todo',
      'Add input validation for todo creation/updates',
      'Include proper error handling middleware',
      'Use appropriate HTTP status codes (200, 201, 400, 404, 500)',
      'Include basic documentation in README.md'
    ],
    
    starterCode: `// server.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// In-memory storage (replace with database in real applications)
let todos = [
  { id: 1, title: 'Learn Node.js', completed: false, createdAt: new Date() },
  { id: 2, title: 'Build REST API', completed: false, createdAt: new Date() }
];
let nextId = 3;

// TODO: Implement your routes here

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
    
    testCases: [
      {
        description: 'GET /api/todos should return all todos',
        method: 'GET',
        endpoint: '/api/todos',
        expectedStatus: 200,
        expectedResponse: 'Array of todo objects'
      },
      {
        description: 'POST /api/todos should create new todo',
        method: 'POST',
        endpoint: '/api/todos',
        body: { title: 'New Todo' },
        expectedStatus: 201,
        expectedResponse: 'Created todo object with id'
      },
      {
        description: 'PUT /api/todos/:id should update existing todo',
        method: 'PUT',
        endpoint: '/api/todos/1',
        body: { title: 'Updated Todo', completed: true },
        expectedStatus: 200,
        expectedResponse: 'Updated todo object'
      },
      {
        description: 'DELETE /api/todos/:id should delete todo',
        method: 'DELETE',
        endpoint: '/api/todos/1',
        expectedStatus: 200,
        expectedResponse: 'Success message'
      },
      {
        description: 'GET /api/todos/:id with invalid id should return 404',
        method: 'GET',
        endpoint: '/api/todos/999',
        expectedStatus: 404,
        expectedResponse: 'Error message'
      }
    ],
    
    rubric: [
      {
        criterion: 'API Endpoints Implementation',
        maxPoints: 25,
        description: 'All CRUD endpoints implemented correctly'
      },
      {
        criterion: 'HTTP Status Codes',
        maxPoints: 15,
        description: 'Proper use of HTTP status codes'
      },
      {
        criterion: 'Input Validation',
        maxPoints: 20,
        description: 'Validates input data and handles errors'
      },
      {
        criterion: 'Error Handling',
        maxPoints: 20,
        description: 'Comprehensive error handling middleware'
      },
      {
        criterion: 'Code Quality',
        maxPoints: 20,
        description: 'Clean, readable, and well-structured code'
      }
    ],
    
    resources: [
      {
        title: 'Express.js Routing Guide',
        url: 'https://expressjs.com/en/guide/routing.html',
        type: 'documentation'
      },
      {
        title: 'HTTP Status Codes Reference',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status',
        type: 'reference'
      },
      {
        title: 'REST API Best Practices',
        url: 'https://www.freecodecamp.org/news/rest-api-best-practices-rest-endpoint-design-examples/',
        type: 'article'
      }
    ],
    
    submissionInstructions: `
## Submission Guidelines

1. **Code Structure**: Organize your code with proper separation of concerns
2. **Testing**: Test all endpoints using Postman or similar tool
3. **Documentation**: Include a README.md with:
   - Setup instructions
   - API endpoint documentation
   - Example requests and responses
4. **Error Handling**: Implement comprehensive error handling
5. **Validation**: Add input validation for all endpoints

## Evaluation Criteria

Your assignment will be evaluated based on:
- Functionality of all CRUD operations
- Proper use of HTTP methods and status codes
- Input validation and error handling
- Code quality and organization
- Documentation completeness

## Tips for Success

- Start with basic CRUD operations, then add validation
- Use middleware for common functionality
- Test each endpoint thoroughly
- Handle edge cases (invalid IDs, missing data)
- Follow REST API conventions
    `,
    
    minWordCount: 0,
    passingGrade: 70
  },
  
  'nodejs-final-project': {
    title: 'Full-Stack Web Application',
    description: 'Create a complete web application with authentication, database, and API',
    type: 'project',
    difficulty: 'advanced',
    estimatedTime: '10 hours',
    passingGrade: 85,
    maxAttempts: 2,
    
    objectives: [
      'Build a complete full-stack application',
      'Implement user authentication system',
      'Design and implement database schema',
      'Create RESTful API with protected routes',
      'Deploy application to cloud platform'
    ],
    
    requirements: [
      'User registration and login system with JWT authentication',
      'Protected routes requiring authentication',
      'Database integration with proper schema design',
      'RESTful API with full CRUD operations',
      'Input validation and comprehensive error handling',
      'Password hashing and security best practices',
      'Environment variables for configuration',
      'Basic frontend interface (can be simple HTML/CSS/JS)',
      'Deployment configuration and documentation'
    ],
    
    projectIdeas: [
      'Task Management System with user accounts',
      'Blog Platform with user authentication',
      'E-commerce API with product management',
      'Social Media API with user profiles',
      'Recipe Sharing Platform',
      'Event Management System'
    ],
    
    technicalRequirements: [
      'Node.js with Express.js framework',
      'MongoDB or PostgreSQL database',
      'JWT for authentication',
      'Bcrypt for password hashing',
      'Input validation (express-validator or Joi)',
      'Environment variables (.env file)',
      'Error handling middleware',
      'CORS configuration',
      'Rate limiting (optional but recommended)'
    ],
    
    rubric: [
      {
        criterion: 'Authentication System',
        maxPoints: 25,
        description: 'Complete user registration, login, and JWT implementation'
      },
      {
        criterion: 'Database Design',
        maxPoints: 20,
        description: 'Well-designed schema with proper relationships'
      },
      {
        criterion: 'API Implementation',
        maxPoints: 25,
        description: 'RESTful API with full CRUD operations'
      },
      {
        criterion: 'Security & Validation',
        maxPoints: 15,
        description: 'Input validation, password hashing, and security practices'
      },
      {
        criterion: 'Code Quality & Documentation',
        maxPoints: 15,
        description: 'Clean code, proper structure, and comprehensive documentation'
      }
    ],
    
    submissionInstructions: `
## Final Project Submission Guidelines

### Required Deliverables

1. **Source Code**: Complete Node.js application with all features
2. **Database Schema**: Documentation of your database design
3. **API Documentation**: Complete API endpoint documentation
4. **README.md**: Comprehensive project documentation
5. **Deployment**: Live application URL (Heroku, Railway, or similar)

### Documentation Requirements

Your README.md must include:
- Project description and features
- Technology stack used
- Installation and setup instructions
- Environment variables configuration
- API endpoint documentation with examples
- Database schema explanation
- Deployment instructions
- Known issues or limitations

### Evaluation Criteria

Your project will be evaluated on:
- **Functionality**: All features work as expected
- **Security**: Proper authentication and input validation
- **Code Quality**: Clean, readable, and well-organized code
- **Documentation**: Clear and comprehensive documentation
- **Deployment**: Successfully deployed and accessible

### Security Checklist

Ensure your application includes:
- [ ] Password hashing with bcrypt
- [ ] JWT token authentication
- [ ] Input validation on all endpoints
- [ ] Environment variables for sensitive data
- [ ] CORS configuration
- [ ] Error handling that doesn't expose sensitive information
- [ ] Rate limiting (bonus points)

### Bonus Features (Optional)

- Email verification for registration
- Password reset functionality
- File upload capabilities
- Real-time features with Socket.io
- Comprehensive testing suite
- CI/CD pipeline setup
    `,
    
    minWordCount: 500,
    passingGrade: 85
  }
};

export default nodejsAssignments;
