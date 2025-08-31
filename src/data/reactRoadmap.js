const reactRoadmap = {
  nodes: [
    // Module 1: React Fundamentals
    {
      id: 'react-module-1',
      type: 'module',
      data: {
        label: 'Module 1: React Fundamentals',
        description: 'Introduction to React and its core concepts',
        type: 'module',
        duration: '2 weeks',
        learningObjectives: [
          'Understand React component architecture',
          'Learn JSX syntax',
          'Master props and state management',
          'Handle events in React'
        ]
      },
      position: { x: 100, y: 50 }
    },
    {
      id: 'react-lesson-1',
      data: {
        label: 'Introduction to React',
        description: 'Understanding the React ecosystem',
        type: 'lesson',
        duration: '2 hours',
        resources: [
          { type: 'video', title: 'React Overview', url: '#' },
          { type: 'article', title: 'React Documentation', url: '#' }
        ]
      },
      position: { x: 50, y: 150 }
    },
    {
      id: 'react-lesson-2',
      data: {
        label: 'JSX Fundamentals',
        description: 'Learn JSX syntax and best practices',
        type: 'lesson',
        duration: '2 hours',
        resources: [
          { type: 'video', title: 'JSX Deep Dive', url: '#' },
          { type: 'exercise', title: 'JSX Practice', url: '#' }
        ]
      },
      position: { x: 200, y: 150 }
    },
    {
      id: 'react-quiz-1',
      data: {
        label: 'Quiz: React Basics',
        description: 'Test your understanding of React fundamentals',
        type: 'quiz',
        duration: '30 minutes',
        passingScore: 70
      },
      position: { x: 350, y: 150 }
    },

    // Module 2: Components & Props
    {
      id: 'react-module-2',
      type: 'module',
      data: {
        label: 'Module 2: Components & Props',
        description: 'Building reusable components',
        type: 'module',
        duration: '2 weeks',
        prerequisites: ['react-module-1']
      },
      position: { x: 100, y: 250 }
    },
    {
      id: 'react-assignment-1',
      data: {
        label: 'Assignment: Build a Component Library',
        description: 'Create reusable UI components',
        type: 'assignment',
        duration: '1 week',
        requirements: [
          'Create at least 5 reusable components',
          'Implement prop validation',
          'Include documentation'
        ]
      },
      position: { x: 300, y: 350 }
    },

    // Module 3: State & Lifecycle
    {
      id: 'react-module-3',
      type: 'module',
      data: {
        label: 'Module 3: State & Lifecycle',
        description: 'Managing component state and lifecycle methods',
        type: 'module',
        duration: '2 weeks',
        prerequisites: ['react-module-2']
      },
      position: { x: 100, y: 450 }
    },
    
    // Peer Evaluation
    {
      id: 'react-peer-eval-1',
      data: {
        label: 'Peer Evaluation: Code Review',
        description: 'Review your peers\' component implementations',
        type: 'peer-evaluation',
        duration: '3 days',
        requirements: [
          'Review 3 peer assignments',
          'Provide constructive feedback',
          'Score based on rubric'
        ]
      },
      position: { x: 400, y: 550 }
    },

    // Final Project
    {
      id: 'react-final-project',
      data: {
        label: 'Final Project',
        description: 'Build a complete React application',
        type: 'project',
        duration: '3 weeks',
        requirements: [
          'Use React best practices',
          'Implement state management',
          'Include tests',
          'Deploy the application'
        ]
      },
      position: { x: 100, y: 650 }
    },

    // Certificate
    {
      id: 'react-certificate',
      data: {
        label: 'Course Completion Certificate',
        description: 'Earn your React certification',
        type: 'certificate',
        requirements: [
          'Complete all modules',
          'Pass all quizzes with 70% or higher',
          'Submit all assignments',
          'Complete peer evaluations'
        ]
      },
      position: { x: 400, y: 750 }
    }
  ],
  edges: [
    // Module 1 connections
    { id: 'e1-1', source: 'react-module-1', target: 'react-lesson-1' },
    { id: 'e1-2', source: 'react-module-1', target: 'react-lesson-2' },
    { id: 'e1-3', source: 'react-lesson-1', target: 'react-quiz-1' },
    { id: 'e1-4', source: 'react-lesson-2', target: 'react-quiz-1' },
    
    // Module 2 connections
    { id: 'e2-1', source: 'react-quiz-1', target: 'react-module-2' },
    { id: 'e2-2', source: 'react-module-2', target: 'react-assignment-1' },
    
    // Module 3 connections
    { id: 'e3-1', source: 'react-assignment-1', target: 'react-module-3' },
    
    // Peer evaluation connections
    { id: 'e4-1', source: 'react-module-3', target: 'react-peer-eval-1' },
    
    // Final project connections
    { id: 'e5-1', source: 'react-peer-eval-1', target: 'react-final-project' },
    
    // Certificate connections
    { id: 'e6-1', source: 'react-final-project', target: 'react-certificate' }
  ]
};

export default reactRoadmap;
