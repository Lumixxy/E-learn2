export const javascriptRoadmap = {
  nodes: [
    {
      id: 'js-intro',
      type: 'default',
      position: { x: 250, y: 50 },
      data: { 
        label: 'JavaScript Introduction',
        type: 'lesson',
        description: 'Learn JavaScript basics, syntax, and core concepts',
        duration: '45 min',
        resources: [
          'MDN JavaScript Guide',
          'JavaScript.info Tutorial',
          'W3Schools JavaScript'
        ]
      }
    },
    {
      id: 'js-variables',
      type: 'default',
      position: { x: 250, y: 150 },
      data: { 
        label: 'Variables & Data Types',
        type: 'lesson',
        description: 'Understanding variables, data types, and operators',
        duration: '40 min',
        resources: [
          'MDN Variables Guide',
          'JavaScript Data Types',
          'Operators Reference'
        ]
      }
    },
    {
      id: 'js-quiz-1',
      type: 'default',
      position: { x: 250, y: 250 },
      data: { 
        label: 'Quiz: JavaScript Basics',
        type: 'quiz',
        description: 'Test your understanding of JavaScript fundamentals',
        duration: '15 min'
      }
    },
    {
      id: 'js-functions',
      type: 'default',
      position: { x: 250, y: 350 },
      data: { 
        label: 'Functions & Scope',
        type: 'lesson',
        description: 'Master functions, scope, and closures in JavaScript',
        duration: '50 min',
        resources: [
          'MDN Functions Guide',
          'JavaScript Scope Tutorial',
          'Closures Explained'
        ]
      }
    },
    {
      id: 'js-assignment-1',
      type: 'default',
      position: { x: 250, y: 450 },
      data: { 
        label: 'Assignment: Calculator App',
        type: 'assignment',
        description: 'Build a functional calculator using JavaScript',
        duration: '2 hours'
      }
    },
    {
      id: 'js-dom',
      type: 'default',
      position: { x: 250, y: 550 },
      data: { 
        label: 'DOM Manipulation',
        type: 'lesson',
        description: 'Learn to interact with HTML elements using JavaScript',
        duration: '60 min',
        resources: [
          'MDN DOM Guide',
          'DOM Manipulation Tutorial',
          'Event Handling Guide'
        ]
      }
    },
    {
      id: 'js-events',
      type: 'default',
      position: { x: 250, y: 650 },
      data: { 
        label: 'Events & Event Handling',
        type: 'lesson',
        description: 'Handle user interactions and browser events',
        duration: '45 min',
        resources: [
          'MDN Events Guide',
          'Event Listeners Tutorial',
          'Event Bubbling Explained'
        ]
      }
    },
    {
      id: 'js-quiz-2',
      type: 'default',
      position: { x: 250, y: 750 },
      data: { 
        label: 'Quiz: DOM & Events',
        type: 'quiz',
        description: 'Test your DOM manipulation and event handling skills',
        duration: '20 min'
      }
    },
    {
      id: 'js-async',
      type: 'default',
      position: { x: 250, y: 850 },
      data: { 
        label: 'Async JavaScript',
        type: 'lesson',
        description: 'Master promises, async/await, and asynchronous programming',
        duration: '55 min',
        resources: [
          'MDN Async Guide',
          'Promises Tutorial',
          'Async/Await Explained'
        ]
      }
    },
    {
      id: 'js-assignment-2',
      type: 'default',
      position: { x: 250, y: 950 },
      data: { 
        label: 'Assignment: Weather App',
        type: 'assignment',
        description: 'Build a weather app using APIs and async JavaScript',
        duration: '3 hours'
      }
    },
    {
      id: 'js-es6',
      type: 'default',
      position: { x: 250, y: 1050 },
      data: { 
        label: 'ES6+ Features',
        type: 'lesson',
        description: 'Learn modern JavaScript features and syntax',
        duration: '50 min',
        resources: [
          'ES6 Features Guide',
          'Modern JavaScript Tutorial',
          'Arrow Functions Explained'
        ]
      }
    },
    {
      id: 'js-final-project',
      type: 'default',
      position: { x: 250, y: 1150 },
      data: { 
        label: 'Final Project: Interactive Game',
        type: 'project',
        description: 'Create an interactive browser game using all JavaScript concepts',
        duration: '4 hours'
      }
    },
    {
      id: 'js-certificate',
      type: 'default',
      position: { x: 250, y: 1250 },
      data: { 
        label: 'JavaScript Certificate',
        type: 'certificate',
        description: 'Earn your JavaScript mastery certificate',
        duration: '5 min'
      }
    }
  ],
  edges: [
    { id: 'e1-2', source: 'js-intro', target: 'js-variables' },
    { id: 'e2-3', source: 'js-variables', target: 'js-quiz-1' },
    { id: 'e3-4', source: 'js-quiz-1', target: 'js-functions' },
    { id: 'e4-5', source: 'js-functions', target: 'js-assignment-1' },
    { id: 'e5-6', source: 'js-assignment-1', target: 'js-dom' },
    { id: 'e6-7', source: 'js-dom', target: 'js-events' },
    { id: 'e7-8', source: 'js-events', target: 'js-quiz-2' },
    { id: 'e8-9', source: 'js-quiz-2', target: 'js-async' },
    { id: 'e9-10', source: 'js-async', target: 'js-assignment-2' },
    { id: 'e10-11', source: 'js-assignment-2', target: 'js-es6' },
    { id: 'e11-12', source: 'js-es6', target: 'js-final-project' },
    { id: 'e12-13', source: 'js-final-project', target: 'js-certificate' }
  ]
};
