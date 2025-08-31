export const javaRoadmap = {
  nodes: [
    {
      id: 'java-intro',
      type: 'default',
      position: { x: 400, y: 50 },
      data: { 
        label: 'Java Introduction',
        type: 'lesson',
        description: 'Introduction to Java programming language and its ecosystem'
      }
    },
    {
      id: 'java-syntax',
      type: 'default',
      position: { x: 400, y: 150 },
      data: { 
        label: 'Java Syntax & Variables',
        type: 'lesson',
        description: 'Learn Java syntax, variables, and data types'
      }
    },
    {
      id: 'java-quiz-1',
      type: 'default',
      position: { x: 200, y: 250 },
      data: { 
        label: 'Java Basics Quiz',
        type: 'quiz',
        description: 'Test your understanding of Java fundamentals'
      }
    },
    {
      id: 'oop-concepts',
      type: 'default',
      position: { x: 400, y: 250 },
      data: { 
        label: 'OOP Concepts',
        type: 'lesson',
        description: 'Object-oriented programming principles in Java'
      }
    },
    {
      id: 'classes-objects',
      type: 'default',
      position: { x: 400, y: 350 },
      data: { 
        label: 'Classes & Objects',
        type: 'lesson',
        description: 'Creating and using classes and objects in Java'
      }
    },
    {
      id: 'java-assignment-1',
      type: 'default',
      position: { x: 600, y: 350 },
      data: { 
        label: 'Student Management System',
        type: 'assignment',
        description: 'Build a console-based student management application'
      }
    },
    {
      id: 'inheritance',
      type: 'default',
      position: { x: 400, y: 450 },
      data: { 
        label: 'Inheritance & Polymorphism',
        type: 'lesson',
        description: 'Advanced OOP concepts: inheritance and polymorphism'
      }
    },
    {
      id: 'collections',
      type: 'default',
      position: { x: 400, y: 550 },
      data: { 
        label: 'Java Collections',
        type: 'lesson',
        description: 'Working with ArrayList, HashMap, and other collections'
      }
    },
    {
      id: 'java-quiz-2',
      type: 'default',
      position: { x: 200, y: 650 },
      data: { 
        label: 'OOP & Collections Quiz',
        type: 'quiz',
        description: 'Test your knowledge of OOP and Java collections'
      }
    },
    {
      id: 'exception-handling',
      type: 'default',
      position: { x: 400, y: 650 },
      data: { 
        label: 'Exception Handling',
        type: 'lesson',
        description: 'Handle errors and exceptions in Java applications'
      }
    },
    {
      id: 'file-io',
      type: 'default',
      position: { x: 400, y: 750 },
      data: { 
        label: 'File I/O Operations',
        type: 'lesson',
        description: 'Read from and write to files in Java'
      }
    },
    {
      id: 'java-assignment-2',
      type: 'default',
      position: { x: 600, y: 750 },
      data: { 
        label: 'Library Management System',
        type: 'assignment',
        description: 'Create a complete library management application'
      }
    },
    {
      id: 'peer-evaluation',
      type: 'default',
      position: { x: 400, y: 850 },
      data: { 
        label: 'Peer Code Review',
        type: 'peer-evaluation',
        description: 'Review and provide feedback on peer assignments'
      }
    },
    {
      id: 'java-certificate',
      type: 'default',
      position: { x: 400, y: 950 },
      data: { 
        label: 'Java Certificate',
        type: 'certificate',
        description: 'Earn your Java programming certificate'
      }
    }
  ],
  edges: [
    { id: 'e1', source: 'java-intro', target: 'java-syntax' },
    { id: 'e2', source: 'java-syntax', target: 'java-quiz-1' },
    { id: 'e3', source: 'java-syntax', target: 'oop-concepts' },
    { id: 'e4', source: 'oop-concepts', target: 'classes-objects' },
    { id: 'e5', source: 'classes-objects', target: 'java-assignment-1' },
    { id: 'e6', source: 'classes-objects', target: 'inheritance' },
    { id: 'e7', source: 'inheritance', target: 'collections' },
    { id: 'e8', source: 'collections', target: 'java-quiz-2' },
    { id: 'e9', source: 'collections', target: 'exception-handling' },
    { id: 'e10', source: 'exception-handling', target: 'file-io' },
    { id: 'e11', source: 'file-io', target: 'java-assignment-2' },
    { id: 'e12', source: 'java-assignment-2', target: 'peer-evaluation' },
    { id: 'e13', source: 'peer-evaluation', target: 'java-certificate' }
  ]
};
