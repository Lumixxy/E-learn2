export const nodejsRoadmap = {
  nodes: [
    {
      id: 'nodejs-intro',
      data: { 
        label: 'Node.js Introduction',
        description: 'Introduction to Node.js runtime and server-side JavaScript development',
        type: 'lesson',
        duration: '2 hours',
        resources: [
          { type: 'video', title: 'Node.js Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=TlB_eWDSMt4' },
          { type: 'article', title: 'Node.js Official Documentation', url: 'https://nodejs.org/en/docs/' },
          { type: 'exercise', title: 'Interactive Node.js Tutorial', url: 'https://www.codecademy.com/learn/learn-node-js' }
        ],
        requirements: ['Basic JavaScript knowledge', 'Understanding of web development concepts'],
        topics: ['Node.js Runtime', 'V8 Engine', 'Event Loop', 'Non-blocking I/O']
      },
      position: { x: 250, y: 50 }
    },
    {
      id: 'nodejs-modules',
      data: { 
        label: 'Modules & NPM',
        description: 'Understanding Node.js modules, CommonJS, and NPM package management',
        type: 'lesson',
        duration: '3 hours',
        resources: [
          { type: 'video', title: 'Node.js Modules Explained', url: 'https://www.youtube.com/watch?v=xHLd36QoS4k' },
          { type: 'article', title: 'NPM Documentation', url: 'https://docs.npmjs.com/' },
          { type: 'exercise', title: 'Module Practice', url: 'https://www.freecodecamp.org/learn/back-end-development-and-apis/' }
        ],
        requirements: ['Node.js basics', 'JavaScript ES6 modules understanding'],
        topics: ['CommonJS', 'ES6 Modules', 'NPM', 'Package.json', 'Semantic Versioning']
      },
      position: { x: 250, y: 150 }
    },
    {
      id: 'nodejs-quiz-1',
      data: { 
        label: 'Quiz: Node.js Basics',
        description: 'Test your understanding of Node.js fundamentals and modules',
        type: 'quiz',
        duration: '30 minutes',
        topics: ['Node.js Runtime', 'Modules', 'NPM', 'Event Loop']
      },
      position: { x: 250, y: 250 }
    },
    {
      id: 'express-intro',
      data: { 
        label: 'Express.js Framework',
        description: 'Learn Express.js for building web applications and APIs',
        type: 'lesson',
        duration: '4 hours',
        resources: [
          { type: 'video', title: 'Express.js Crash Course', url: 'https://www.youtube.com/watch?v=L72fhGm1tfE' },
          { type: 'article', title: 'Express.js Official Guide', url: 'https://expressjs.com/en/guide/routing.html' },
          { type: 'exercise', title: 'Express.js Tutorial', url: 'https://www.freecodecamp.org/learn/back-end-development-and-apis/basic-node-and-express/' }
        ],
        requirements: ['Node.js fundamentals', 'HTTP protocol understanding'],
        topics: ['Express Setup', 'Routing', 'Middleware', 'Request/Response', 'Static Files']
      },
      position: { x: 250, y: 350 }
    },
    {
      id: 'nodejs-assignment-1',
      data: { 
        label: 'Assignment: REST API',
        description: 'Build a RESTful API using Express.js with CRUD operations',
        type: 'assignment',
        duration: '6 hours',
        topics: ['REST API', 'CRUD Operations', 'HTTP Methods', 'Status Codes']
      },
      position: { x: 250, y: 450 }
    },
    {
      id: 'database-integration',
      data: { 
        label: 'Database Integration',
        description: 'Connect Node.js applications with databases (MongoDB, MySQL)',
        type: 'lesson',
        duration: '5 hours',
        resources: [
          { type: 'video', title: 'Node.js with MongoDB', url: 'https://www.youtube.com/watch?v=fgTGADljAeg' },
          { type: 'article', title: 'Mongoose Documentation', url: 'https://mongoosejs.com/docs/' },
          { type: 'exercise', title: 'Database Tutorial', url: 'https://www.freecodecamp.org/learn/back-end-development-and-apis/mongodb-and-mongoose/' }
        ],
        requirements: ['Express.js knowledge', 'Basic database concepts'],
        topics: ['MongoDB', 'Mongoose', 'Schema Design', 'CRUD Operations', 'Relationships']
      },
      position: { x: 250, y: 550 }
    },
    {
      id: 'authentication',
      data: { 
        label: 'Authentication & Security',
        description: 'Implement user authentication and security best practices',
        type: 'lesson',
        duration: '4 hours',
        resources: [
          { type: 'video', title: 'JWT Authentication in Node.js', url: 'https://www.youtube.com/watch?v=mbsmsi7l3r4' },
          { type: 'article', title: 'Node.js Security Best Practices', url: 'https://nodejs.org/en/docs/guides/security/' },
          { type: 'exercise', title: 'Authentication Tutorial', url: 'https://www.freecodecamp.org/learn/information-security/' }
        ],
        requirements: ['Database integration', 'HTTP authentication concepts'],
        topics: ['JWT', 'Bcrypt', 'Sessions', 'CORS', 'Security Headers', 'Input Validation']
      },
      position: { x: 250, y: 650 }
    },
    {
      id: 'nodejs-final-project',
      data: { 
        label: 'Final Project',
        description: 'Build a complete full-stack application with Node.js',
        type: 'project',
        duration: '10 hours',
        topics: ['Full-Stack Development', 'API Design', 'Authentication', 'Database Design']
      },
      position: { x: 250, y: 750 }
    },
    {
      id: 'nodejs-certificate',
      data: { 
        label: 'Node.js Certificate',
        description: 'Complete the course to earn your Node.js development certificate',
        type: 'certificate',
        duration: '1 hour'
      },
      position: { x: 250, y: 850 }
    }
  ],
  edges: [
    { id: 'e1-2', source: 'nodejs-intro', target: 'nodejs-modules' },
    { id: 'e2-3', source: 'nodejs-modules', target: 'nodejs-quiz-1' },
    { id: 'e3-4', source: 'nodejs-quiz-1', target: 'express-intro' },
    { id: 'e4-5', source: 'express-intro', target: 'nodejs-assignment-1' },
    { id: 'e5-6', source: 'nodejs-assignment-1', target: 'database-integration' },
    { id: 'e6-7', source: 'database-integration', target: 'authentication' },
    { id: 'e7-8', source: 'authentication', target: 'nodejs-final-project' },
    { id: 'e8-9', source: 'nodejs-final-project', target: 'nodejs-certificate' }
  ]
};
