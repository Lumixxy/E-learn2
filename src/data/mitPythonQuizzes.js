// MIT Python Course Quizzes - Based on actual course content
// Each quiz corresponds to a specific node in the MIT roadmap

export const mitPythonQuizzes = {
  'computation-basics': {
    title: 'What is Computation? - Quiz',
    description: 'Test your understanding of basic computational concepts and Python fundamentals',
    timeLimit: 15, // minutes
    passingScore: 80,
    xpReward: 50,
    perfectScoreBonus: 25,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'What is the primary purpose of an algorithm?',
        options: [
          'To make computers faster',
          'To provide a step-by-step solution to a problem',
          'To store data efficiently',
          'To create user interfaces'
        ],
        correct: 1,
        explanation: 'An algorithm is a finite sequence of steps that solves a problem.'
      },
      {
        id: 2,
        type: 'multiple-choice',
        question: 'In Python, which operator is used for exponentiation?',
        options: ['*', '^', '**', '//'],
        correct: 2,
        explanation: 'The ** operator is used for exponentiation in Python (e.g., 2**3 = 8).'
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'What will be the output of: print(type(3.14))?',
        options: ['<class \'int\'>', '<class \'float\'>', '<class \'str\'>', '<class \'number\'>'],
        correct: 1,
        explanation: '3.14 is a floating-point number, so its type is float.'
      },
      {
        id: 4,
        type: 'code-completion',
        question: 'Complete the code to calculate the area of a circle with radius 5:',
        code: 'radius = 5\npi = 3.14159\narea = ___',
        options: ['pi * radius', 'pi * radius * 2', 'pi * radius ** 2', '2 * pi * radius'],
        correct: 2,
        explanation: 'Area of a circle = π × r², so we need pi * radius ** 2.'
      },
      {
        id: 5,
        type: 'true-false',
        question: 'In Python, variable names are case-sensitive.',
        correct: true,
        explanation: 'Python is case-sensitive, so "Variable" and "variable" are different identifiers.'
      }
    ]
  },

  'branching-iteration': {
    title: 'Branching and Iteration - Quiz',
    description: 'Test your knowledge of conditional statements and loops',
    timeLimit: 20,
    passingScore: 80,
    xpReward: 50,
    perfectScoreBonus: 25,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'What will this code print?\n\nx = 10\nif x > 5:\n    print("A")\nelif x > 15:\n    print("B")\nelse:\n    print("C")',
        options: ['A', 'B', 'C', 'Nothing'],
        correct: 0,
        explanation: 'Since x=10 > 5, the first condition is true and "A" is printed. The elif is not checked.'
      },
      {
        id: 2,
        type: 'multiple-choice',
        question: 'Which loop is best for iterating over a known range of numbers?',
        options: ['while loop', 'for loop', 'do-while loop', 'repeat loop'],
        correct: 1,
        explanation: 'For loops are ideal for iterating over sequences or ranges of known size.'
      },
      {
        id: 3,
        type: 'code-completion',
        question: 'Complete the code to print numbers 1 to 5:',
        code: 'for i in ___:\n    print(i)',
        options: ['range(5)', 'range(1, 5)', 'range(1, 6)', 'range(6)'],
        correct: 2,
        explanation: 'range(1, 6) generates numbers from 1 to 5 (6 is excluded).'
      },
      {
        id: 4,
        type: 'multiple-choice',
        question: 'What does the "break" statement do in a loop?',
        options: [
          'Skips the current iteration',
          'Exits the loop completely',
          'Pauses the loop temporarily',
          'Restarts the loop from the beginning'
        ],
        correct: 1,
        explanation: 'The break statement immediately exits the current loop.'
      },
      {
        id: 5,
        type: 'true-false',
        question: 'The condition in a while loop is checked before each iteration.',
        correct: true,
        explanation: 'While loops check the condition before executing the loop body each time.'
      },
      {
        id: 6,
        type: 'multiple-choice',
        question: 'What is the output of this code?\n\nfor i in range(3):\n    if i == 1:\n        continue\n    print(i)',
        options: ['0 1 2', '0 2', '1 2', '0 1'],
        correct: 1,
        explanation: 'The continue statement skips i=1, so only 0 and 2 are printed.'
      }
    ]
  },

  'string-manipulation': {
    title: 'String Manipulation & Algorithms - Quiz',
    description: 'Test your understanding of strings and basic algorithms',
    timeLimit: 25,
    passingScore: 80,
    xpReward: 60,
    perfectScoreBonus: 30,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'What is the output of: "Python"[1:4]?',
        options: ['Pyt', 'yth', 'ytho', 'tho'],
        correct: 1,
        explanation: 'String slicing [1:4] returns characters at indices 1, 2, 3: "yth".'
      },
      {
        id: 2,
        type: 'multiple-choice',
        question: 'Which method converts a string to lowercase?',
        options: ['toLower()', 'lowercase()', 'lower()', 'downcase()'],
        correct: 2,
        explanation: 'The lower() method converts all characters in a string to lowercase.'
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'What is the main advantage of bisection search over linear search?',
        options: [
          'It uses less memory',
          'It works on unsorted data',
          'It has better time complexity',
          'It is easier to implement'
        ],
        correct: 2,
        explanation: 'Bisection search has O(log n) time complexity vs O(n) for linear search.'
      },
      {
        id: 4,
        type: 'code-completion',
        question: 'Complete the guess-and-check algorithm to find the square root of 25:',
        code: 'x = 25\nguess = 0\nwhile ___:\n    if guess * guess == x:\n        break\n    guess += 1',
        options: ['guess < x', 'guess <= x', 'guess * guess <= x', 'True'],
        correct: 0,
        explanation: 'We continue guessing while guess < x, since the square root of 25 is 5.'
      },
      {
        id: 5,
        type: 'multiple-choice',
        question: 'In the Newton-Raphson method, what do we need to find square roots?',
        options: [
          'Only the number itself',
          'The number and its derivative',
          'The number and an initial guess',
          'Multiple initial guesses'
        ],
        correct: 2,
        explanation: 'Newton-Raphson needs the target number and an initial guess to iteratively improve.'
      },
      {
        id: 6,
        type: 'true-false',
        question: 'Strings in Python are mutable (can be changed after creation).',
        correct: false,
        explanation: 'Strings in Python are immutable. Operations create new string objects.'
      },
      {
        id: 7,
        type: 'multiple-choice',
        question: 'What does "approximation" mean in computational context?',
        options: [
          'Getting an exact answer',
          'Getting close enough to the right answer',
          'Guessing randomly',
          'Using only integers'
        ],
        correct: 1,
        explanation: 'Approximation means finding a solution that is close enough to be useful.'
      }
    ]
  },

  'functions-decomposition': {
    title: 'Functions & Decomposition - Quiz',
    description: 'Test your knowledge of functions, scope, and modular programming',
    timeLimit: 20,
    passingScore: 80,
    xpReward: 55,
    perfectScoreBonus: 25,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'What is the main benefit of using functions?',
        options: [
          'They make programs run faster',
          'They reduce code duplication and improve organization',
          'They use less memory',
          'They are required by Python'
        ],
        correct: 1,
        explanation: 'Functions promote code reuse, organization, and maintainability.'
      },
      {
        id: 2,
        type: 'code-completion',
        question: 'Complete the function definition:',
        code: '___ calculate_area(length, width):\n    return length * width',
        options: ['function', 'def', 'func', 'define'],
        correct: 1,
        explanation: 'Python uses the "def" keyword to define functions.'
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'What happens to local variables when a function ends?',
        options: [
          'They become global variables',
          'They are destroyed',
          'They are saved for the next function call',
          'They cause an error'
        ],
        correct: 1,
        explanation: 'Local variables are destroyed when the function execution completes.'
      },
      {
        id: 4,
        type: 'multiple-choice',
        question: 'What will this code print?\n\nx = 10\ndef func():\n    x = 5\n    print(x)\nfunc()\nprint(x)',
        options: ['5 5', '10 10', '5 10', '10 5'],
        correct: 2,
        explanation: 'The function creates a local x=5, but the global x remains 10.'
      },
      {
        id: 5,
        type: 'true-false',
        question: 'A function can return multiple values using a tuple.',
        correct: true,
        explanation: 'Python functions can return multiple values as a tuple: return a, b, c'
      },
      {
        id: 6,
        type: 'multiple-choice',
        question: 'What is "decomposition" in programming?',
        options: [
          'Breaking down complex problems into smaller, manageable parts',
          'Removing bugs from code',
          'Converting code to machine language',
          'Optimizing code for speed'
        ],
        correct: 0,
        explanation: 'Decomposition means breaking complex problems into smaller, solvable pieces.'
      }
    ]
  },

  'data-structures': {
    title: 'Tuples, Lists & Data Structures - Quiz',
    description: 'Test your understanding of Python data structures',
    timeLimit: 25,
    passingScore: 80,
    xpReward: 60,
    perfectScoreBonus: 30,
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'What is the main difference between tuples and lists?',
        options: [
          'Tuples are faster',
          'Lists are immutable, tuples are mutable',
          'Tuples are immutable, lists are mutable',
          'There is no difference'
        ],
        correct: 2,
        explanation: 'Tuples cannot be changed after creation (immutable), while lists can be modified.'
      },
      {
        id: 2,
        type: 'multiple-choice',
        question: 'What will this code output?\n\nlist1 = [1, 2, 3]\nlist2 = list1\nlist2.append(4)\nprint(list1)',
        options: ['[1, 2, 3]', '[1, 2, 3, 4]', 'Error', '[4]'],
        correct: 1,
        explanation: 'list2 = list1 creates an alias. Modifying list2 also affects list1.'
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'How do you create a copy of a list to avoid aliasing?',
        options: ['list2 = list1', 'list2 = list1.copy()', 'list2 = copy(list1)', 'list2 = list1[:]'],
        correct: 1,
        explanation: 'list.copy() creates a shallow copy. list1[:] also works for copying.'
      },
      {
        id: 4,
        type: 'code-completion',
        question: 'Complete the list comprehension to create squares of numbers 1-5:',
        code: 'squares = [___ for x in range(1, 6)]',
        options: ['x', 'x + x', 'x ** 2', 'x * 2'],
        correct: 2,
        explanation: 'x ** 2 calculates the square of each number x.'
      },
      {
        id: 5,
        type: 'multiple-choice',
        question: 'Which method adds an element to the end of a list?',
        options: ['add()', 'append()', 'insert()', 'extend()'],
        correct: 1,
        explanation: 'append() adds a single element to the end of a list.'
      },
      {
        id: 6,
        type: 'true-false',
        question: 'Tuples can contain elements of different data types.',
        correct: true,
        explanation: 'Tuples can contain mixed data types: (1, "hello", 3.14, True)'
      },
      {
        id: 7,
        type: 'multiple-choice',
        question: 'What does list.extend([1, 2, 3]) do?',
        options: [
          'Adds the list [1, 2, 3] as a single element',
          'Adds elements 1, 2, 3 individually to the list',
          'Replaces the list with [1, 2, 3]',
          'Causes an error'
        ],
        correct: 1,
        explanation: 'extend() adds each element of the iterable individually to the list.'
      },
      {
        id: 8,
        type: 'multiple-choice',
        question: 'How do you access the last element of a list named "data"?',
        options: ['data[last]', 'data[-1]', 'data[end]', 'data[len(data)]'],
        correct: 1,
        explanation: 'Negative indexing: data[-1] accesses the last element.'
      }
    ]
  }
};

export default mitPythonQuizzes;
