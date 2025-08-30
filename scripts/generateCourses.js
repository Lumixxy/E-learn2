const fs = require('fs');
const path = require('path');

// Course templates for different skill categories
const courseTemplates = {
  html: [
    { title: "HTML5 Fundamentals for Beginners", desc: "Learn semantic HTML, forms, and modern HTML5 features" },
    { title: "Responsive Web Design with HTML", desc: "Master HTML structure for responsive layouts" },
    { title: "HTML5 APIs and Advanced Features", desc: "Explore advanced HTML5 APIs like Canvas, WebStorage, and Geolocation" },
    { title: "Building Accessible Websites with HTML", desc: "Create inclusive web experiences with proper HTML semantics" },
    { title: "HTML Forms and Input Validation", desc: "Master form creation and client-side validation techniques" }
  ],
  css: [
    { title: "CSS3 Complete Course", desc: "Master CSS selectors, properties, and modern CSS3 features" },
    { title: "Flexbox and CSS Grid Mastery", desc: "Build complex layouts with Flexbox and CSS Grid" },
    { title: "CSS Animations and Transitions", desc: "Create stunning animations and smooth transitions" },
    { title: "Sass and SCSS for Developers", desc: "Write maintainable CSS with Sass preprocessing" },
    { title: "Bootstrap 5 Complete Guide", desc: "Rapid UI development with Bootstrap framework" },
    { title: "Tailwind CSS from Zero to Hero", desc: "Utility-first CSS framework for modern web development" }
  ],
  javascript: [
    { title: "JavaScript ES6+ Complete Course", desc: "Master modern JavaScript with ES6 features and beyond" },
    { title: "Asynchronous JavaScript Mastery", desc: "Promises, async/await, and handling asynchronous operations" },
    { title: "JavaScript DOM Manipulation", desc: "Interactive web pages with DOM scripting" },
    { title: "TypeScript for JavaScript Developers", desc: "Add type safety to JavaScript with TypeScript" },
    { title: "Advanced JavaScript Patterns", desc: "Design patterns and advanced programming concepts" }
  ],
  react: [
    { title: "React.js Complete Course 2024", desc: "Build modern web applications with React and JSX" },
    { title: "React Hooks Deep Dive", desc: "Master useState, useEffect, and custom hooks" },
    { title: "Redux State Management", desc: "Manage complex application state with Redux" },
    { title: "Next.js Full-Stack Development", desc: "Server-side rendering and full-stack React apps" },
    { title: "React Testing with Jest and RTL", desc: "Comprehensive testing strategies for React apps" }
  ],
  java: [
    { title: "Java Programming Fundamentals", desc: "Object-oriented programming with Java" },
    { title: "Spring Boot Microservices", desc: "Build scalable microservices with Spring Boot" },
    { title: "Java Enterprise Development", desc: "Enterprise-level Java applications with JEE" },
    { title: "Hibernate and JPA Mastery", desc: "Database operations with Hibernate ORM" },
    { title: "Maven and Gradle Build Tools", desc: "Project management and build automation" }
  ],
  python: [
    { title: "Python for Beginners Complete Course", desc: "Learn Python programming from scratch" },
    { title: "Django Web Development", desc: "Build web applications with Django framework" },
    { title: "Flask REST API Development", desc: "Create APIs with Flask and Python" },
    { title: "Python Data Analysis with Pandas", desc: "Data manipulation and analysis using Pandas" },
    { title: "FastAPI Modern Web Development", desc: "High-performance APIs with FastAPI" }
  ],
  nodejs: [
    { title: "Node.js Complete Developer Course", desc: "Server-side JavaScript with Node.js" },
    { title: "Express.js Web Development", desc: "Build web servers and APIs with Express" },
    { title: "NestJS Enterprise Applications", desc: "Scalable Node.js applications with NestJS" },
    { title: "GraphQL with Node.js", desc: "Modern API development with GraphQL" },
    { title: "Real-time Apps with Socket.io", desc: "WebSocket programming for real-time features" }
  ],
  database: [
    { title: "SQL Database Design and Queries", desc: "Relational database design and SQL mastery" },
    { title: "MongoDB NoSQL Development", desc: "Document-based databases with MongoDB" },
    { title: "PostgreSQL Advanced Features", desc: "Advanced PostgreSQL for enterprise applications" },
    { title: "Redis Caching and Sessions", desc: "In-memory data structures and caching strategies" },
    { title: "Database Performance Optimization", desc: "Query optimization and database tuning" }
  ],
  "machine-learning": [
    { title: "Machine Learning with Python", desc: "Supervised and unsupervised learning algorithms" },
    { title: "Scikit-learn Complete Guide", desc: "ML algorithms with Python's scikit-learn library" },
    { title: "Data Science and ML Pipeline", desc: "End-to-end machine learning project workflows" },
    { title: "Feature Engineering Techniques", desc: "Data preprocessing and feature selection strategies" },
    { title: "ML Model Deployment and MLOps", desc: "Production deployment of machine learning models" }
  ],
  "deep-learning": [
    { title: "Deep Learning with TensorFlow", desc: "Neural networks and deep learning with TensorFlow" },
    { title: "PyTorch Deep Learning Course", desc: "Build neural networks with PyTorch framework" },
    { title: "Computer Vision with CNNs", desc: "Convolutional neural networks for image processing" },
    { title: "Natural Language Processing", desc: "NLP with transformers and BERT models" },
    { title: "Generative AI and Large Language Models", desc: "Building and fine-tuning large language models" }
  ],
  docker: [
    { title: "Docker Complete Course", desc: "Containerization with Docker from basics to advanced" },
    { title: "Docker Compose Multi-Container Apps", desc: "Orchestrate multi-container applications" },
    { title: "Docker for Developers", desc: "Development workflows with Docker containers" },
    { title: "Container Security Best Practices", desc: "Secure containerized application deployment" },
    { title: "Docker Swarm Orchestration", desc: "Container orchestration with Docker Swarm" }
  ],
  kubernetes: [
    { title: "Kubernetes Complete Course", desc: "Container orchestration with Kubernetes" },
    { title: "Helm Charts and Package Management", desc: "Kubernetes application deployment with Helm" },
    { title: "Kubernetes Networking and Services", desc: "Advanced networking concepts in Kubernetes" },
    { title: "CI/CD with Kubernetes", desc: "Automated deployment pipelines with Kubernetes" },
    { title: "Kubernetes Security and RBAC", desc: "Securing Kubernetes clusters and workloads" }
  ],
  flutter: [
    { title: "Flutter Complete App Development", desc: "Cross-platform mobile apps with Flutter and Dart" },
    { title: "Flutter State Management", desc: "Provider, Bloc, and Riverpod state management" },
    { title: "Flutter UI Design Mastery", desc: "Beautiful user interfaces with Flutter widgets" },
    { title: "Flutter Firebase Integration", desc: "Backend services integration with Firebase" },
    { title: "Flutter Performance Optimization", desc: "Optimize Flutter apps for better performance" }
  ],
  "react-native": [
    { title: "React Native Complete Course", desc: "Cross-platform mobile development with React Native" },
    { title: "React Native Navigation", desc: "App navigation with React Navigation library" },
    { title: "React Native State Management", desc: "Redux and Context API for mobile apps" },
    { title: "React Native Performance", desc: "Optimize React Native app performance" },
    { title: "React Native Testing", desc: "Testing strategies for React Native applications" }
  ]
};

// Helper arrays for random generation
const instructors = [
  "Dr. Sarah Johnson", "Prof. Michael Chen", "Dr. Emily Rodriguez", "Prof. David Kim",
  "Dr. Amanda Wilson", "Prof. James Thompson", "Dr. Lisa Zhang", "Prof. Robert Garcia",
  "Dr. Jessica Brown", "Prof. Daniel Lee", "Dr. Maria Gonzalez", "Prof. Kevin Wang",
  "Dr. Jennifer Davis", "Prof. Andrew Miller", "Dr. Rachel Park", "Prof. Steven Liu"
];

const companies = ["Google", "Microsoft", "Meta", "Amazon", "Netflix", "Apple", "Tesla", "Spotify", "Uber", "Airbnb"];
const levels = ["Beginner", "Intermediate", "Advanced"];
const images = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=2070&auto=format&fit=crop"
];

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateRandomPrice() {
  const prices = [0, 499, 999, 1299, 1499, 1999, 2499, 2999, 3499, 3999];
  const price = getRandomElement(prices);
  const originalPrice = price === 0 ? getRandomElement([1999, 2999, 3999]) : price + Math.floor(Math.random() * 2000) + 500;
  const discountPercentage = price === 0 ? 100 : Math.floor((1 - price / originalPrice) * 100);
  
  return {
    price,
    originalPrice,
    discountPercentage,
    isFree: price === 0
  };
}

function generateCourses() {
  const courses = [];
  const skillIds = Object.keys(courseTemplates);
  
  // Calculate courses per skill (approximately 500 total)
  const coursesPerSkill = Math.floor(500 / skillIds.length);
  const extraCourses = 500 - (coursesPerSkill * skillIds.length);
  
  let courseId = 1;
  
  skillIds.forEach((skillId, index) => {
    const templates = courseTemplates[skillId];
    const numCoursesForSkill = coursesPerSkill + (index < extraCourses ? 1 : 0);
    
    for (let i = 0; i < numCoursesForSkill; i++) {
      const template = templates[i % templates.length];
      const pricing = generateRandomPrice();
      const rating = (Math.random() * 2 + 3).toFixed(1); // Rating between 3.0 and 5.0
      const level = getRandomElement(levels);
      
      // Add variation to titles and descriptions
      const variation = Math.floor(i / templates.length) + 1;
      const title = variation > 1 ? `${template.title} - Part ${variation}` : template.title;
      const description = variation > 1 ? 
        `${template.desc} - Advanced topics and practical applications.` : 
        template.desc;
      
      const course = {
        id: `course_${String(courseId).padStart(3, '0')}`,
        title,
        author: getRandomElement(instructors),
        category: getSkillCategoryName(skillId),
        level,
        ...pricing,
        rating: parseFloat(rating),
        image: getRandomElement(images),
        tags: getSkillTags(skillId),
        description,
        type: "coding",
        language: getSkillLanguage(skillId),
        company: Math.random() > 0.7 ? getRandomElement(companies) : undefined,
        modules: generateModules(skillId, template.title),
        certificate: { unlocked: false, threshold: 70 },
        duration: Math.floor(Math.random() * 12) + 4, // 4-16 weeks
        lectures: Math.floor(Math.random() * 50) + 20, // 20-70 lectures
        skillTag: skillId // Pre-assign skill tag for testing
      };
      
      courses.push(course);
      courseId++;
    }
  });
  
  return courses;
}

function getSkillCategoryName(skillId) {
  const categoryMap = {
    'html': 'Frontend Development',
    'css': 'Frontend Development', 
    'javascript': 'Frontend Development',
    'react': 'Frontend Development',
    'java': 'Backend Development',
    'python': 'Backend Development',
    'nodejs': 'Backend Development',
    'database': 'Backend Development',
    'machine-learning': 'AI Engineering',
    'deep-learning': 'AI Engineering',
    'docker': 'DevOps',
    'kubernetes': 'DevOps',
    'flutter': 'Mobile Development',
    'react-native': 'Mobile Development'
  };
  return categoryMap[skillId] || 'Technology';
}

function getSkillTags(skillId) {
  const tagMap = {
    'html': ['HTML', 'HTML5', 'Web Development', 'Frontend'],
    'css': ['CSS', 'CSS3', 'Styling', 'Web Design', 'Frontend'],
    'javascript': ['JavaScript', 'JS', 'ES6', 'Frontend', 'Web Development'],
    'react': ['React', 'React.js', 'JSX', 'Frontend', 'JavaScript'],
    'java': ['Java', 'Backend', 'OOP', 'Enterprise'],
    'python': ['Python', 'Backend', 'Data Science', 'Programming'],
    'nodejs': ['Node.js', 'JavaScript', 'Backend', 'Server'],
    'database': ['Database', 'SQL', 'Data', 'Backend'],
    'machine-learning': ['Machine Learning', 'ML', 'AI', 'Data Science'],
    'deep-learning': ['Deep Learning', 'Neural Networks', 'AI', 'TensorFlow'],
    'docker': ['Docker', 'Containers', 'DevOps', 'Deployment'],
    'kubernetes': ['Kubernetes', 'K8s', 'DevOps', 'Orchestration'],
    'flutter': ['Flutter', 'Mobile', 'Dart', 'Cross-platform'],
    'react-native': ['React Native', 'Mobile', 'JavaScript', 'Cross-platform']
  };
  return tagMap[skillId] || ['Technology'];
}

function getSkillLanguage(skillId) {
  const languageMap = {
    'html': 'HTML',
    'css': 'CSS',
    'javascript': 'JavaScript',
    'react': 'JavaScript',
    'java': 'Java',
    'python': 'Python',
    'nodejs': 'JavaScript',
    'database': 'SQL',
    'machine-learning': 'Python',
    'deep-learning': 'Python',
    'docker': 'Shell',
    'kubernetes': 'YAML',
    'flutter': 'Dart',
    'react-native': 'JavaScript'
  };
  return languageMap[skillId] || 'JavaScript';
}

function generateModules(skillId, baseTitle) {
  const numModules = Math.floor(Math.random() * 3) + 2; // 2-4 modules
  const modules = [];
  
  for (let i = 1; i <= numModules; i++) {
    modules.push({
      id: `module_${i}`,
      title: `Module ${i}: ${baseTitle} - Part ${i}`,
      description: `Learn essential concepts and practical applications in ${baseTitle}.`,
      url: "#",
      locked: i > 1,
      completed: false,
      quizCompleted: false,
      quizScore: 0,
      quiz: generateQuiz(skillId)
    });
  }
  
  return modules;
}

function generateQuiz(skillId) {
  // Simple quiz generation based on skill
  const quizMap = {
    'html': [
      { question: "What does HTML stand for?", options: ["HyperText Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"], correctAnswer: "HyperText Markup Language" },
      { question: "Which HTML element is used for the largest heading?", options: ["<h1>", "<h6>", "<heading>"], correctAnswer: "<h1>" }
    ],
    'css': [
      { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets"], correctAnswer: "Cascading Style Sheets" },
      { question: "Which property is used to change the background color?", options: ["background-color", "bg-color", "color"], correctAnswer: "background-color" }
    ],
    // Add more quiz templates as needed
  };
  
  return quizMap[skillId] || [
    { question: "Which is a programming concept?", options: ["Variables", "Colors", "Fonts"], correctAnswer: "Variables" }
  ];
}

// Generate the courses
console.log('Generating 500 courses...');
const courses = generateCourses();

// Write to file
const outputPath = path.join(__dirname, '..', 'public', 'data', 'courses.json');
fs.writeFileSync(outputPath, JSON.stringify(courses, null, 2));

console.log(`Generated ${courses.length} courses and saved to ${outputPath}`);

// Display distribution
const skillDistribution = {};
courses.forEach(course => {
  const skill = course.skillTag;
  skillDistribution[skill] = (skillDistribution[skill] || 0) + 1;
});

console.log('\nSkill Distribution:');
Object.entries(skillDistribution).forEach(([skill, count]) => {
  console.log(`  ${skill}: ${count} courses`);
});