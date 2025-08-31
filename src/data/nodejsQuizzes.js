const nodejsQuizzes = {
  'nodejs-quiz-1': {
    title: 'Node.js Basics Quiz',
    description: 'Test your understanding of Node.js fundamentals and modules',
    timeLimit: 30,
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'What is Node.js?',
        type: 'multiple-choice',
        options: [
          'A JavaScript framework for frontend development',
          'A JavaScript runtime built on Chrome\'s V8 JavaScript engine',
          'A database management system',
          'A web browser'
        ],
        correct: 1,
        explanation: 'Node.js is a JavaScript runtime built on Chrome\'s V8 JavaScript engine that allows you to run JavaScript on the server side.'
      },
      {
        id: 2,
        question: 'Which module system does Node.js use by default?',
        type: 'multiple-choice',
        options: [
          'ES6 modules',
          'AMD (Asynchronous Module Definition)',
          'CommonJS',
          'UMD (Universal Module Definition)'
        ],
        correct: 2,
        explanation: 'Node.js uses CommonJS module system by default, which uses require() and module.exports.'
      },
      {
        id: 3,
        question: 'What does NPM stand for?',
        type: 'multiple-choice',
        options: [
          'Node Package Manager',
          'New Programming Method',
          'Network Protocol Manager',
          'Node Process Monitor'
        ],
        correct: 0,
        explanation: 'NPM stands for Node Package Manager, which is the default package manager for Node.js.'
      },
      {
        id: 4,
        question: 'Which of the following is true about Node.js?',
        type: 'multiple-choice',
        options: [
          'It is single-threaded and blocking',
          'It is multi-threaded and blocking',
          'It is single-threaded and non-blocking',
          'It is multi-threaded and non-blocking'
        ],
        correct: 2,
        explanation: 'Node.js is single-threaded and non-blocking, using an event-driven architecture.'
      },
      {
        id: 5,
        question: 'What file contains metadata about a Node.js project?',
        type: 'multiple-choice',
        options: [
          'node.json',
          'project.json',
          'package.json',
          'config.json'
        ],
        correct: 2,
        explanation: 'package.json contains metadata about the Node.js project including dependencies, scripts, and project information.'
      }
    ]
  }
};

export default nodejsQuizzes;
