// This file contains quiz data for roadmap nodes

const nodeQuizzes = {
  // Python Basics
  'node-1': {
    title: 'Python Basics Quiz',
    questions: [
      {
        id: 1,
        question: 'What is the correct way to create a variable in Python?',
        options: [
          { id: 'a', text: 'var x = 5' },
          { id: 'b', text: 'x = 5' },
          { id: 'c', text: 'int x = 5' },
          { id: 'd', text: 'let x = 5' },
        ],
        correctAnswer: 'b',
        explanation: 'In Python, you can directly assign a value to a variable without declaring its type.'
      },
      {
        id: 2,
        question: 'Which of the following is a valid comment in Python?',
        options: [
          { id: 'a', text: '// This is a comment' },
          { id: 'b', text: '/* This is a comment */' },
          { id: 'c', text: '# This is a comment' },
          { id: 'd', text: '<!-- This is a comment -->' },
        ],
        correctAnswer: 'c',
        explanation: 'In Python, comments start with the # character.'
      },
      {
        id: 3,
        question: 'What will be the output of print(2**3)?',
        options: [
          { id: 'a', text: '6' },
          { id: 'b', text: '8' },
          { id: 'c', text: '5' },
          { id: 'd', text: 'Error' },
        ],
        correctAnswer: 'b',
        explanation: 'The ** operator in Python represents exponentiation. 2**3 means 2 raised to the power of 3, which equals 8.'
      }
    ],
    xpReward: 50
  },
  
  // Control Flow
  'node-2': {
    title: 'Control Flow Quiz',
    questions: [
      {
        id: 1,
        question: 'Which of the following is NOT a loop structure in Python?',
        options: [
          { id: 'a', text: 'for' },
          { id: 'b', text: 'while' },
          { id: 'c', text: 'do-while' },
          { id: 'd', text: 'for-each' },
        ],
        correctAnswer: 'c',
        explanation: 'Python does not have a do-while loop. It has for and while loops.'
      },
      {
        id: 2,
        question: 'What is the correct syntax for an if statement in Python?',
        options: [
          { id: 'a', text: 'if (x > 5) {console.log("x is greater than 5")}' },
          { id: 'b', text: 'if x > 5 then print("x is greater than 5")' },
          { id: 'c', text: 'if x > 5:\n    print("x is greater than 5")' },
          { id: 'd', text: 'if x > 5 print("x is greater than 5")' },
        ],
        correctAnswer: 'c',
        explanation: 'In Python, the if statement uses a colon and indentation to define the code block.'
      },
      {
        id: 3,
        question: 'What does the "break" statement do in Python?',
        options: [
          { id: 'a', text: 'Skips the current iteration and continues with the next' },
          { id: 'b', text: 'Exits the loop completely' },
          { id: 'c', text: 'Returns a value from a function' },
          { id: 'd', text: 'Pauses the program execution' },
        ],
        correctAnswer: 'b',
        explanation: 'The break statement exits the loop completely, and the program continues with the next statement after the loop.'
      }
    ],
    xpReward: 75
  },
  
  // Functions
  'node-3': {
    title: 'Python Functions Quiz',
    questions: [
      {
        id: 1,
        question: 'How do you define a function in Python?',
        options: [
          { id: 'a', text: 'function myFunc():' },
          { id: 'b', text: 'def myFunc():' },
          { id: 'c', text: 'create myFunc():' },
          { id: 'd', text: 'func myFunc():' },
        ],
        correctAnswer: 'b',
        explanation: 'In Python, functions are defined using the "def" keyword followed by the function name and parentheses.'
      },
      {
        id: 2,
        question: 'What is the purpose of the "return" statement in a function?',
        options: [
          { id: 'a', text: 'To print a value to the console' },
          { id: 'b', text: 'To exit the function and return to the main program' },
          { id: 'c', text: 'To send a value back to the caller' },
          { id: 'd', text: 'To restart the function from the beginning' },
        ],
        correctAnswer: 'c',
        explanation: 'The return statement is used to send a value back to the caller of the function.'
      },
      {
        id: 3,
        question: 'What are *args and **kwargs used for in Python functions?',
        options: [
          { id: 'a', text: 'For mathematical operations' },
          { id: 'b', text: 'For handling variable-length argument lists' },
          { id: 'c', text: 'For importing modules' },
          { id: 'd', text: 'For defining class attributes' },
        ],
        correctAnswer: 'b',
        explanation: '*args allows a function to accept any number of positional arguments, and **kwargs allows it to accept any number of keyword arguments.'
      }
    ],
    xpReward: 100
  },
  
  // Data Structures
  'node-4': {
    title: 'Python Data Structures Quiz',
    questions: [
      {
        id: 1,
        question: 'Which of the following is a mutable data structure in Python?',
        options: [
          { id: 'a', text: 'Tuple' },
          { id: 'b', text: 'String' },
          { id: 'c', text: 'List' },
          { id: 'd', text: 'Frozen Set' },
        ],
        correctAnswer: 'c',
        explanation: 'Lists are mutable, meaning they can be changed after creation. Tuples, strings, and frozen sets are immutable.'
      },
      {
        id: 2,
        question: 'How do you access the value of a key in a dictionary?',
        options: [
          { id: 'a', text: 'dict.get(key)' },
          { id: 'b', text: 'dict[key]' },
          { id: 'c', text: 'Both A and B' },
          { id: 'd', text: 'dict.value(key)' },
        ],
        correctAnswer: 'c',
        explanation: 'You can access dictionary values using either the square bracket notation dict[key] or the get() method dict.get(key).'
      },
      {
        id: 3,
        question: 'What is the output of set([1, 2, 2, 3, 3, 3])?',
        options: [
          { id: 'a', text: '[1, 2, 2, 3, 3, 3]' },
          { id: 'b', text: '{1, 2, 3}' },
          { id: 'c', text: '(1, 2, 3)' },
          { id: 'd', text: 'Error' },
        ],
        correctAnswer: 'b',
        explanation: 'Sets automatically remove duplicate elements, so the result is {1, 2, 3}.'
      }
    ],
    xpReward: 125
  },
  
  // Object-Oriented Programming
  'node-5': {
    title: 'Python OOP Quiz',
    questions: [
      {
        id: 1,
        question: 'What is the correct way to define a class in Python?',
        options: [
          { id: 'a', text: 'class MyClass {}' },
          { id: 'b', text: 'class MyClass():' },
          { id: 'c', text: 'def class MyClass():' },
          { id: 'd', text: 'create class MyClass:' },
        ],
        correctAnswer: 'b',
        explanation: 'In Python, classes are defined using the "class" keyword followed by the class name and parentheses.'
      },
      {
        id: 2,
        question: 'What is the purpose of the __init__ method in a Python class?',
        options: [
          { id: 'a', text: 'It is called when an object is created and initializes attributes' },
          { id: 'b', text: 'It is used to delete an object' },
          { id: 'c', text: 'It is used to convert an object to a string' },
          { id: 'd', text: 'It is used to compare two objects' },
        ],
        correctAnswer: 'a',
        explanation: 'The __init__ method is a special method (constructor) that is automatically called when an object is created from a class. It is used to initialize the attributes of the object.'
      },
      {
        id: 3,
        question: 'What is inheritance in Python?',
        options: [
          { id: 'a', text: 'A way to create multiple instances of a class' },
          { id: 'b', text: 'A way to restrict access to class attributes' },
          { id: 'c', text: 'A way to create a new class that is a modified version of an existing class' },
          { id: 'd', text: 'A way to delete unused objects' },
        ],
        correctAnswer: 'c',
        explanation: 'Inheritance allows a class to inherit attributes and methods from another class. It promotes code reuse and establishes a parent-child relationship between classes.'
      }
    ],
    xpReward: 150
  },
  
  // File I/O
  'node-6': {
    title: 'Python File I/O Quiz',
    questions: [
      {
        id: 1,
        question: 'Which mode opens a file for reading only?',
        options: [
          { id: 'a', text: '"w"' },
          { id: 'b', text: '"r"' },
          { id: 'c', text: '"a"' },
          { id: 'd', text: '"x"' },
        ],
        correctAnswer: 'b',
        explanation: 'The "r" mode opens a file for reading only. The file pointer is placed at the beginning of the file.'
      },
      {
        id: 2,
        question: 'What is the correct way to open a file in Python?',
        options: [
          { id: 'a', text: 'file = open("filename.txt", "r")' },
          { id: 'b', text: 'file = File.open("filename.txt", "r")' },
          { id: 'c', text: 'file = read("filename.txt")' },
          { id: 'd', text: 'file = file.open("filename.txt")' },
        ],
        correctAnswer: 'a',
        explanation: 'In Python, you open a file using the open() function, which takes the filename and mode as arguments.'
      },
      {
        id: 3,
        question: 'What is the best practice for handling file operations in Python?',
        options: [
          { id: 'a', text: 'Always use try-except blocks' },
          { id: 'b', text: 'Use the with statement' },
          { id: 'c', text: 'Always close files manually' },
          { id: 'd', text: 'Use global file handles' },
        ],
        correctAnswer: 'b',
        explanation: 'The with statement in Python is used for file operations as it automatically takes care of closing the file after the block of code is executed, even if exceptions occur.'
      }
    ],
    xpReward: 100
  },
  
  // Exception Handling
  'node-7': {
    title: 'Python Exception Handling Quiz',
    questions: [
      {
        id: 1,
        question: 'What is the purpose of the try-except block in Python?',
        options: [
          { id: 'a', text: 'To define a new function' },
          { id: 'b', text: 'To handle errors and exceptions' },
          { id: 'c', text: 'To import modules' },
          { id: 'd', text: 'To create a loop' },
        ],
        correctAnswer: 'b',
        explanation: 'The try-except block is used to handle exceptions (errors) that might occur during the execution of a program.'
      },
      {
        id: 2,
        question: 'What happens if an exception occurs in a try block and there is no matching except block?',
        options: [
          { id: 'a', text: 'The program continues execution normally' },
          { id: 'b', text: 'The program terminates with an error message' },
          { id: 'c', text: 'The exception is ignored' },
          { id: 'd', text: 'The program restarts' },
        ],
        correctAnswer: 'b',
        explanation: 'If an exception occurs in a try block and there is no matching except block to handle it, the program terminates and an error message is displayed.'
      },
      {
        id: 3,
        question: 'What is the purpose of the finally clause in a try-except block?',
        options: [
          { id: 'a', text: 'It is executed only if an exception occurs' },
          { id: 'b', text: 'It is executed only if no exception occurs' },
          { id: 'c', text: 'It is always executed, regardless of whether an exception occurs or not' },
          { id: 'd', text: 'It is used to define custom exceptions' },
        ],
        correctAnswer: 'c',
        explanation: 'The finally clause is always executed, regardless of whether an exception occurs or not. It is typically used for cleanup operations like closing files or releasing resources.'
      }
    ],
    xpReward: 125
  },
  
  // Modules and Packages
  'node-8': {
    title: 'Python Modules and Packages Quiz',
    questions: [
      {
        id: 1,
        question: 'What is a module in Python?',
        options: [
          { id: 'a', text: 'A function that performs a specific task' },
          { id: 'b', text: 'A file containing Python code' },
          { id: 'c', text: 'A class that defines object behavior' },
          { id: 'd', text: 'A built-in data structure' },
        ],
        correctAnswer: 'b',
        explanation: 'A module in Python is a file containing Python code, including functions, classes, and variables, that can be imported and used in other Python programs.'
      },
      {
        id: 2,
        question: 'What is the correct way to import a module in Python?',
        options: [
          { id: 'a', text: 'import module' },
          { id: 'b', text: 'include module' },
          { id: 'c', text: 'require module' },
          { id: 'd', text: 'using module' },
        ],
        correctAnswer: 'a',
        explanation: 'In Python, you import a module using the "import" keyword followed by the module name.'
      },
      {
        id: 3,
        question: 'What is a package in Python?',
        options: [
          { id: 'a', text: 'A collection of modules' },
          { id: 'b', text: 'A compressed file format' },
          { id: 'c', text: 'A type of function' },
          { id: 'd', text: 'A built-in data structure' },
        ],
        correctAnswer: 'a',
        explanation: 'A package in Python is a collection of modules organized in directories. It includes a special file called __init__.py that marks the directory as a package.'
      }
    ],
    xpReward: 100
  }
};

export default nodeQuizzes;