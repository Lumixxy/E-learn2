// MIT 6.0001 Introduction to Computer Science and Programming in Python
// Roadmap based on official MIT OpenCourseWare structure

export const mitPythonRoadmap = {
  id: 'mit-python-6001',
  title: 'MIT 6.0001: Introduction to Computer Science and Programming in Python',
  description: 'Complete MIT\'s foundational Python programming course with interactive learning',
  totalNodes: 12,
  estimatedHours: 60,
  difficulty: 'Beginner to Intermediate',
  
  nodes: [
    {
      id: 'computation-basics',
      title: 'Introduction to Computation',
      description: 'Basic concepts of computation and Python fundamentals',
      lecture: 'Lecture 1',
      position: { x: 250, y: 50 },
      prerequisites: [],
      topics: [
        'What is computation?',
        'Programming languages',
        'Python basics',
        'Variables and expressions',
        'Input/output operations'
      ],
      resources: [
        {
          type: 'video',
          title: 'MIT Lecture 1: Introduction to Computation',
          url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-1-what-is-computation/',
          duration: '50 min'
        },
        {
          type: 'reading',
          title: 'Guttag Chapter 1: Getting Started',
          description: 'Introduction to programming concepts'
        }
      ],
      quiz: {
        questions: 5,
        passingScore: 70,
        topics: ['Basic Python', 'Variables', 'Expressions']
      },
      assignment: {
        title: 'Problem Set 1: Introduction to Python',
        description: 'Basic Python programming exercises covering variables, expressions, and simple algorithms.',
        estimatedTime: '2-3 hours',
        problems: 3,
        requiresPeerReview: true,
        topics: ['Basic Python syntax', 'Variables', 'Mathematical operations']
      }
    },
    
    {
      id: 'branching-iteration',
      title: 'Branching and Iteration',
      description: 'Control flow with conditionals and loops',
      lecture: 'Lecture 2',
      position: { x: 250, y: 150 },
      prerequisites: ['computation-basics'],
      topics: [
        'Conditional statements (if/elif/else)',
        'Comparison operators',
        'Boolean logic',
        'While loops',
        'For loops',
        'Loop control (break, continue)'
      ],
      resources: [
        {
          type: 'video',
          title: 'MIT Lecture 2: Branching and Iteration',
          url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-2-branching-and-iteration/',
          duration: '48 min'
        }
      ],
      quiz: {
        questions: 6,
        passingScore: 80,
        topics: ['Conditionals', 'Loops', 'Boolean logic']
      },
      assignment: {
        title: 'Problem Set 2: Branching and Iteration',
        description: 'Programming exercises focusing on conditional statements, loops, and basic algorithms.',
        estimatedTime: '2-3 hours',
        problems: 3,
        requiresPeerReview: true
      }
    },

    {
      id: 'string-manipulation',
      title: 'String Manipulation & Algorithms',
      description: 'String operations, guess-and-check, approximations, and bisection search',
      lecture: 'Lecture 3',
      position: { x: 250, y: 250 },
      prerequisites: ['branching-iteration'],
      topics: [
        'String indexing and slicing',
        'String methods',
        'Guess and check algorithms',
        'Approximation methods',
        'Bisection search',
        'Newton-Raphson method'
      ],
      resources: [
        {
          type: 'video',
          title: 'MIT Lecture 3: String Manipulation, Guess and Check, Approximations, Bisection',
          url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-3-string-manipulation-guess-and-check-approximations-bisection/',
          duration: '48 min'
        }
      ],
      quiz: {
        questions: 7,
        passingScore: 80,
        topics: ['String operations', 'Search algorithms', 'Approximation methods']
      },
      assignment: {
        problemSet: 1,
        title: 'Problem Set 1: Basic Programming',
        description: 'Implement basic algorithms using strings and loops',
        estimatedTime: '3-5 hours'
      }
    },

    {
      id: 'functions-decomposition',
      title: 'Functions & Decomposition',
      description: 'Function definition, scope, abstraction, and modular programming',
      lecture: 'Lecture 4',
      position: { x: 250, y: 350 },
      prerequisites: ['string-manipulation'],
      topics: [
        'Function definition and calling',
        'Parameters and arguments',
        'Return values',
        'Local vs global scope',
        'Decomposition principles',
        'Abstraction concepts'
      ],
      resources: [
        {
          type: 'video',
          title: 'MIT Lecture 4: Decomposition, Abstraction, and Functions',
          url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-4-decomposition-abstraction-and-functions/',
          duration: '48 min'
        }
      ],
      quiz: {
        questions: 6,
        passingScore: 80,
        topics: ['Function definition', 'Scope', 'Modular programming']
      },
      assignment: {
        title: 'Problem Set: Functions and Decomposition',
        description: 'Practice writing functions and breaking down complex problems into smaller parts.',
        estimatedTime: '3-4 hours',
        problems: 4,
        requiresPeerReview: true
      }
    },

    {
      id: 'data-structures',
      title: 'Tuples, Lists & Data Structures',
      description: 'Working with tuples, lists, aliasing, mutability, and cloning',
      lecture: 'Lecture 5',
      position: { x: 250, y: 450 },
      prerequisites: ['functions-decomposition'],
      topics: [
        'Tuples: creation and operations',
        'Lists: creation, indexing, slicing',
        'List methods (append, extend, etc.)',
        'Aliasing vs cloning',
        'Mutability concepts',
        'List comprehensions'
      ],
      resources: [
        {
          type: 'video',
          title: 'MIT Lecture 5: Tuples, Lists, Aliasing, Mutability, and Cloning',
          url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-5-tuples-lists-aliasing-mutability-and-cloning/',
          duration: '47 min'
        }
      ],
      quiz: {
        questions: 8,
        passingScore: 80,
        topics: ['Tuples', 'Lists', 'Mutability', 'Data manipulation']
      },
      assignment: {
        problemSet: 2,
        title: 'Problem Set 2: Simple Programs',
        description: 'Work with data structures and implement algorithms',
        estimatedTime: '4-6 hours'
      }
    },

    {
      id: 'recursion-dictionaries',
      title: 'Recursion & Dictionaries',
      description: 'Recursive algorithms and dictionary data structures',
      lecture: 'Lecture 6',
      position: { x: 250, y: 550 },
      prerequisites: ['data-structures'],
      topics: [
        'Recursion principles',
        'Base cases and recursive cases',
        'Recursive algorithms',
        'Dictionary creation and operations',
        'Dictionary methods',
        'Iteration over dictionaries'
      ],
      resources: [
        {
          type: 'video',
          title: 'MIT Lecture 6: Recursion and Dictionaries',
          url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-6-recursion-and-dictionaries/',
          duration: '47 min'
        }
      ],
      quiz: {
        questions: 7,
        passingScore: 80,
        topics: ['Recursion', 'Dictionaries', 'Algorithm design']
      },
      assignment: {
        title: 'Problem Set: Recursion and Dictionaries',
        description: 'Implement recursive algorithms and work with dictionary data structures.',
        estimatedTime: '4-5 hours',
        problems: 3,
        requiresPeerReview: true
      }
    },

    {
      id: 'testing-debugging',
      title: 'Testing, Debugging & Exceptions',
      description: 'Software testing, debugging techniques, and exception handling',
      lecture: 'Lecture 7',
      position: { x: 250, y: 650 },
      prerequisites: ['recursion-dictionaries'],
      topics: [
        'Testing strategies',
        'Unit testing',
        'Debugging techniques',
        'Exception handling (try/except)',
        'Assertions',
        'Code quality practices'
      ],
      resources: [
        {
          type: 'video',
          title: 'MIT Lecture 7: Testing, Debugging, Exceptions, and Assertions',
          url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-7-testing-debugging-exceptions-and-assertions/',
          duration: '49 min'
        }
      ],
      quiz: {
        questions: 6,
        passingScore: 80,
        topics: ['Testing', 'Debugging', 'Exception handling']
      },
      assignment: {
        problemSet: 3,
        title: 'Problem Set 3: Word Games',
        description: 'Build a word game with proper testing and error handling',
        estimatedTime: '5-7 hours'
      }
    },

    {
      id: 'oop-basics',
      title: 'Object Oriented Programming',
      description: 'Introduction to classes, objects, and OOP principles',
      lecture: 'Lecture 8',
      position: { x: 250, y: 750 },
      prerequisites: ['testing-debugging'],
      topics: [
        'Class definition',
        'Object instantiation',
        'Instance variables',
        'Methods',
        'Encapsulation',
        'Data abstraction'
      ],
      resources: [
        {
          type: 'video',
          title: 'MIT Lecture 8: Object Oriented Programming',
          url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-8-object-oriented-programming/',
          duration: '46 min'
        }
      ],
      quiz: {
        questions: 7,
        passingScore: 80,
        topics: ['Classes', 'Objects', 'OOP concepts']
      },
      assignment: {
        title: 'Problem Set: Object Oriented Programming',
        description: 'Create classes and objects to solve programming problems.',
        estimatedTime: '4-6 hours',
        problems: 3,
        requiresPeerReview: true
      }
    },

    {
      id: 'classes-inheritance',
      title: 'Python Classes & Inheritance',
      description: 'Advanced OOP concepts including inheritance and polymorphism',
      lecture: 'Lecture 9',
      position: { x: 250, y: 850 },
      prerequisites: ['oop-basics'],
      topics: [
        'Class hierarchies',
        'Inheritance',
        'Method overriding',
        'Polymorphism',
        'Super() function',
        'Multiple inheritance'
      ],
      resources: [
        {
          type: 'video',
          title: 'MIT Lecture 9: Python Classes and Inheritance',
          url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-9-python-classes-and-inheritance/',
          duration: '47 min'
        }
      ],
      quiz: {
        questions: 8,
        passingScore: 80,
        topics: ['Inheritance', 'Polymorphism', 'Advanced OOP']
      },
      assignment: {
        problemSet: 4,
        title: 'Problem Set 4: Caesar Cipher',
        description: 'Implement encryption algorithms using OOP principles',
        estimatedTime: '6-8 hours'
      }
    },

    {
      id: 'program-efficiency-1',
      title: 'Program Efficiency Part 1',
      description: 'Understanding computational complexity and Big O notation',
      lecture: 'Lecture 10',
      position: { x: 250, y: 950 },
      prerequisites: ['classes-inheritance'],
      topics: [
        'Computational complexity',
        'Big O notation',
        'Time complexity analysis',
        'Space complexity',
        'Algorithm efficiency',
        'Performance measurement'
      ],
      resources: [
        {
          type: 'video',
          title: 'MIT Lecture 10: Understanding Program Efficiency, Part 1',
          url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-10-understanding-program-efficiency-part-1/',
          duration: '49 min'
        }
      ],
      quiz: {
        questions: 6,
        passingScore: 80,
        topics: ['Big O notation', 'Complexity analysis', 'Algorithm efficiency']
      },
      assignment: {
        title: 'Problem Set: Program Efficiency Analysis',
        description: 'Analyze and optimize algorithm efficiency using Big O notation.',
        estimatedTime: '3-4 hours',
        problems: 3,
        requiresPeerReview: true
      }
    },

    {
      id: 'program-efficiency-2',
      title: 'Program Efficiency Part 2',
      description: 'Advanced complexity analysis and optimization techniques',
      lecture: 'Lecture 11',
      position: { x: 250, y: 1050 },
      prerequisites: ['program-efficiency-1'],
      topics: [
        'Advanced complexity analysis',
        'Amortized analysis',
        'Optimization techniques',
        'Trade-offs in algorithm design',
        'Memory vs time complexity',
        'Profiling and benchmarking'
      ],
      resources: [
        {
          type: 'video',
          title: 'MIT Lecture 11: Understanding Program Efficiency, Part 2',
          url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-11-understanding-program-efficiency-part-2/',
          duration: '48 min'
        }
      ],
      quiz: {
        questions: 7,
        passingScore: 80,
        topics: ['Advanced complexity', 'Optimization', 'Performance analysis']
      },
      assignment: {
        problemSet: 5,
        title: 'Problem Set 5: RSS Feed Filter',
        description: 'Build an efficient news feed filtering system',
        estimatedTime: '7-9 hours'
      }
    },

    {
      id: 'searching-sorting',
      title: 'Searching and Sorting',
      description: 'Classic algorithms for searching and sorting data',
      lecture: 'Lecture 12',
      position: { x: 250, y: 1150 },
      prerequisites: ['program-efficiency-2'],
      topics: [
        'Linear search',
        'Binary search',
        'Bubble sort',
        'Selection sort',
        'Merge sort',
        'Algorithm comparison',
        'Stability in sorting'
      ],
      resources: [
        {
          type: 'video',
          title: 'MIT Lecture 12: Searching and Sorting',
          url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-12-searching-and-sorting/',
          duration: '47 min'
        }
      ],
      quiz: {
        questions: 8,
        passingScore: 80,
        topics: ['Search algorithms', 'Sorting algorithms', 'Algorithm analysis']
      },
      assignment: {
        problemSet: 6,
        title: 'Final Project: Comprehensive Application',
        description: 'Capstone project integrating all course concepts',
        estimatedTime: '10-15 hours',
        requiresPeerEvaluation: true,
        minPeerEvaluations: 2
      }
    }
  ],

  // Define the learning path connections
  edges: [
    { from: 'computation-basics', to: 'branching-iteration' },
    { from: 'branching-iteration', to: 'string-manipulation' },
    { from: 'string-manipulation', to: 'functions-decomposition' },
    { from: 'functions-decomposition', to: 'data-structures' },
    { from: 'data-structures', to: 'recursion-dictionaries' },
    { from: 'recursion-dictionaries', to: 'testing-debugging' },
    { from: 'testing-debugging', to: 'oop-basics' },
    { from: 'oop-basics', to: 'classes-inheritance' },
    { from: 'classes-inheritance', to: 'program-efficiency-1' },
    { from: 'program-efficiency-1', to: 'program-efficiency-2' },
    { from: 'program-efficiency-2', to: 'searching-sorting' }
  ],

  // XP rewards for different activities
  xpRewards: {
    quizPass: 50,
    quizPerfect: 100,
    assignmentSubmit: 75,
    assignmentPeerApproved: 150,
    nodeComplete: 100,
    courseComplete: 500
  },

  // Certificate requirements
  certificateRequirements: {
    allQuizzesPassed: true,
    allAssignmentsSubmitted: true,
    finalProjectPeerApproved: true,
    minPeerEvaluationsGiven: 2,
    minOverallScore: 85
  }
};

export default mitPythonRoadmap;
