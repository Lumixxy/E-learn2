// MIT Python Course Assignments - Actual Coding Problems
export const mitPythonAssignments = {
  'computation-basics': {
    id: 'computation-basics',
    title: 'Problem Set 1: Introduction to Python',
    description: 'Basic Python programming exercises covering variables, expressions, and simple algorithms.',
    estimatedTime: '2-3 hours',
    xpReward: 100,
    problems: [
      {
        id: 'problem-1',
        title: 'Simple Calculator',
        description: 'Write a Python program that takes two numbers as input and performs basic arithmetic operations.',
        points: 30,
        starterCode: `# Problem 1: Simple Calculator
# Write a program that takes two numbers and an operation (+, -, *, /) 
# and returns the result

def calculator(num1, num2, operation):
    """
    Performs basic arithmetic operations on two numbers
    
    Args:
        num1 (float): First number
        num2 (float): Second number  
        operation (str): Operation to perform (+, -, *, /)
    
    Returns:
        float: Result of the operation
    """
    # Your code here
    pass

# Test your function
print(calculator(10, 5, '+'))  # Should output: 15.0
print(calculator(10, 5, '-'))  # Should output: 5.0
print(calculator(10, 5, '*'))  # Should output: 50.0
print(calculator(10, 5, '/'))  # Should output: 2.0`,
        testCases: [
          { input: [10, 5, '+'], expected: 15.0 },
          { input: [10, 5, '-'], expected: 5.0 },
          { input: [10, 5, '*'], expected: 50.0 },
          { input: [10, 5, '/'], expected: 2.0 }
        ]
      },
      {
        id: 'problem-2',
        title: 'Temperature Converter',
        description: 'Create functions to convert between Celsius and Fahrenheit.',
        points: 35,
        starterCode: `# Problem 2: Temperature Converter
# Write functions to convert between Celsius and Fahrenheit

def celsius_to_fahrenheit(celsius):
    """
    Convert Celsius to Fahrenheit
    Formula: F = (C * 9/5) + 32
    """
    # Your code here
    pass

def fahrenheit_to_celsius(fahrenheit):
    """
    Convert Fahrenheit to Celsius
    Formula: C = (F - 32) * 5/9
    """
    # Your code here
    pass

# Test your functions
print(celsius_to_fahrenheit(0))    # Should output: 32.0
print(celsius_to_fahrenheit(100))  # Should output: 212.0
print(fahrenheit_to_celsius(32))   # Should output: 0.0
print(fahrenheit_to_celsius(212))  # Should output: 100.0`,
        testCases: [
          { input: [0], expected: 32.0, function: 'celsius_to_fahrenheit' },
          { input: [100], expected: 212.0, function: 'celsius_to_fahrenheit' },
          { input: [32], expected: 0.0, function: 'fahrenheit_to_celsius' },
          { input: [212], expected: 100.0, function: 'fahrenheit_to_celsius' }
        ]
      },
      {
        id: 'problem-3',
        title: 'Number Guessing Game',
        description: 'Create a simple number guessing game using variables and input/output.',
        points: 35,
        starterCode: `# Problem 3: Number Guessing Game
# Create a simple guessing game where the computer picks a number
# and the user tries to guess it

import random

def guessing_game():
    """
    A simple number guessing game
    The computer picks a random number between 1 and 10
    The user has 3 attempts to guess it
    """
    secret_number = random.randint(1, 10)
    attempts = 3
    
    print("Welcome to the Number Guessing Game!")
    print("I'm thinking of a number between 1 and 10.")
    print(f"You have {attempts} attempts to guess it.")
    
    # Your code here to implement the guessing logic
    # Use input() to get user guesses
    # Use print() to give feedback
    # Return True if user wins, False if they lose
    
    pass

# Test your game
# guessing_game()`,
        testCases: [
          { description: 'Function should return True when user guesses correctly' },
          { description: 'Function should return False when user runs out of attempts' },
          { description: 'Function should provide feedback for high/low guesses' }
        ]
      }
    ]
  },
  
  'branching-iteration': {
    id: 'branching-iteration',
    title: 'Problem Set 2: Branching and Iteration',
    description: 'Programming exercises focusing on conditional statements, loops, and basic algorithms.',
    estimatedTime: '3-4 hours',
    xpReward: 150,
    problems: [
      {
        id: 'problem-1',
        title: 'Grade Calculator',
        description: 'Write a program that calculates letter grades based on numerical scores using conditionals.',
        points: 40,
        starterCode: `# Problem 1: Grade Calculator
# Write a function that converts numerical grades to letter grades

def calculate_grade(score):
    """
    Convert numerical score to letter grade
    
    Grading scale:
    90-100: A
    80-89: B
    70-79: C
    60-69: D
    Below 60: F
    
    Args:
        score (int): Numerical score (0-100)
    
    Returns:
        str: Letter grade
    """
    # Your code here using if/elif/else statements
    pass

# Test your function
print(calculate_grade(95))  # Should output: A
print(calculate_grade(85))  # Should output: B
print(calculate_grade(75))  # Should output: C
print(calculate_grade(65))  # Should output: D
print(calculate_grade(55))  # Should output: F`,
        testCases: [
          { input: [95], expected: 'A' },
          { input: [85], expected: 'B' },
          { input: [75], expected: 'C' },
          { input: [65], expected: 'D' },
          { input: [55], expected: 'F' }
        ]
      },
      {
        id: 'problem-2',
        title: 'Prime Number Checker',
        description: 'Create a function that checks if a number is prime using loops and conditionals.',
        points: 50,
        starterCode: `# Problem 2: Prime Number Checker
# Write a function to check if a number is prime

def is_prime(n):
    """
    Check if a number is prime
    
    A prime number is a natural number greater than 1 
    that has no positive divisors other than 1 and itself.
    
    Args:
        n (int): Number to check
    
    Returns:
        bool: True if prime, False otherwise
    """
    # Handle edge cases
    if n < 2:
        return False
    
    # Your code here using a for loop to check for divisors
    # Hint: Check if n is divisible by any number from 2 to sqrt(n)
    pass

# Test your function
print(is_prime(2))   # Should output: True
print(is_prime(17))  # Should output: True
print(is_prime(4))   # Should output: False
print(is_prime(15))  # Should output: False`,
        testCases: [
          { input: [2], expected: true },
          { input: [17], expected: true },
          { input: [4], expected: false },
          { input: [15], expected: false },
          { input: [1], expected: false }
        ]
      },
      {
        id: 'problem-3',
        title: 'Fibonacci Sequence',
        description: 'Generate the first n numbers in the Fibonacci sequence using iteration.',
        points: 60,
        starterCode: `# Problem 3: Fibonacci Sequence
# Generate the first n Fibonacci numbers

def fibonacci_sequence(n):
    """
    Generate the first n numbers in the Fibonacci sequence
    
    The Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, ...
    Each number is the sum of the two preceding ones.
    
    Args:
        n (int): Number of Fibonacci numbers to generate
    
    Returns:
        list: First n Fibonacci numbers
    """
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]
    
    # Your code here using a loop to generate the sequence
    # Start with [0, 1] and use iteration to add more numbers
    pass

# Test your function
print(fibonacci_sequence(1))   # Should output: [0]
print(fibonacci_sequence(5))   # Should output: [0, 1, 1, 2, 3]
print(fibonacci_sequence(10))  # Should output: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`,
        testCases: [
          { input: [1], expected: [0] },
          { input: [5], expected: [0, 1, 1, 2, 3] },
          { input: [10], expected: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34] }
        ]
      }
    ]
  }
};

export default mitPythonAssignments;
