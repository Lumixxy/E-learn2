// This file contains assignment data for roadmap nodes

const nodeAssignments = {
  // Python Basics
  'node-1': {
    title: 'MIT Python Basics Assignment',
    description: 'Based on MIT OCW 6.0001 Problem Set 1: Implement a program to calculate how long it takes to save for a down payment.',
    instructions: `
    # MIT Python Basics Assignment

    ## Task Description
    Based on MIT OCW 6.0001 Problem Set 1, create a program to calculate how long it takes to save for a down payment on a house.

    1. Implement a savings calculator with the following parameters:
       - Annual salary (user input)
       - Portion of salary saved (percentage, user input)
       - Cost of dream home (user input)
       - Down payment percentage (25% of the cost)
       - Annual return on investment (4%)
       - Semi-annual raise (percentage, user input)
    2. Calculate how many months it will take to save enough for the down payment

    ## Requirements
    - Create functions to handle the calculations
    - Use variables with appropriate data types
    - Implement control flow (loops, conditionals)
    - Include proper error handling for invalid inputs
    - Display the result with appropriate formatting
    - Include comments explaining your code

    ## Example Output
    \`\`\`
    Enter your annual salary: 120000
    Enter the percent of your salary to save, as a decimal: 0.10
    Enter the cost of your dream home: 1000000
    Enter your semi-annual raise, as a decimal: 0.03
    Number of months: 183
    \`\`\`

    ## Peer Evaluation Guidelines
    When evaluating your peers' submissions, consider:
    1. Correctness of the calculation
    2. Code organization and readability
    3. Error handling
    4. Documentation quality
    5. Efficiency of the implementation

    ## Submission Guidelines
    - Submit your Python code (.py file)
    - Include a brief explanation of your implementation
    - Ensure your code is well-commented and follows PEP 8 style guidelines
    `,
    minWordCount: 150,
    passingGrade: 85
  },
  
  // Data Structures
  'node-2': {
    title: 'MIT Data Structures Assignment',
    description: 'Based on MIT OCW 6.0001 Problem Set 4: Implement a word game using Python data structures.',
    instructions: `
    # MIT Data Structures Assignment

    ## Task Description
    Based on MIT OCW 6.0001 Problem Set 4, create a word game similar to Scrabble. In this game, players try to form words from their hand of letters to earn points.

    1. Implement the following data structures and functions:
       - A dictionary to store word scores
       - Lists to represent hands of letters
       - Functions to calculate word scores based on letter values
       - Functions to deal, update, and display hands
       - A function to play the complete game

    2. Letter values:
       - 1 point: A, E, I, L, N, O, R, S, T, U
       - 2 points: D, G
       - 3 points: B, C, M, P
       - 4 points: F, H, V, W, Y
       - 5 points: K
       - 8 points: J, X
       - 10 points: Q, Z

    ## Requirements
    - Implement functions to deal a hand of random letters
    - Create a function to calculate the score for a word
    - Implement a function to validate if a word can be formed from a hand
    - Create a function to update a hand after a word is played
    - Implement the complete game loop with user interaction
    - Include proper error handling for invalid inputs
    - Use appropriate data structures for different operations

    ## Example Output
    \`\`\`
    Current Hand: a j e f h
    Enter word, or '!!' to indicate you are done: jeff
    "jeff" earned 14 points. Total: 14 points
    
    Current Hand: a
    Enter word, or '!!' to indicate you are done: a
    "a" earned 1 points. Total: 15 points
    
    Run out of letters. Total score: 15 points
    \`\`\`

    ## Peer Evaluation Guidelines
    When evaluating your peers' submissions, consider:
    1. Correctness of the implementation
    2. Appropriate use of data structures
    3. Code organization and readability
    4. Error handling
    5. Documentation quality

    ## Submission Guidelines
    - Submit your Python code (.py file)
    - Include a brief explanation of your implementation choices
    - Provide sample game play
    - Ensure your code is well-commented and follows PEP 8 style guidelines
    `,
    minWordCount: 200,
    passingGrade: 85
  },
  
  // Algorithms
  'node-3': {
    title: 'MIT Algorithms Assignment',
    description: 'Based on MIT OCW 6.006: Implement and analyze efficient algorithms for the Knapsack Problem.',
    instructions: `
    # MIT Algorithms Assignment

    ## Task Description
    Based on MIT OCW 6.006 (Introduction to Algorithms), implement and analyze algorithms for the Knapsack Problem. The Knapsack Problem is a classic optimization problem: given a set of items, each with a weight and a value, determine which items to include in a collection so that the total weight is less than or equal to a given limit and the total value is as large as possible.

    1. Implement the following algorithms for the Knapsack Problem:
       - Greedy approach (select items based on value/weight ratio)
       - Dynamic programming approach
       - Recursive approach with memoization
    
    2. Analyze and compare the algorithms in terms of:
       - Time complexity
       - Space complexity
       - Accuracy of results
       - Performance with different input sizes

    ## Requirements
    - Implement three different approaches to solve the Knapsack Problem
    - Create test cases with different numbers of items and weight constraints
    - Measure and compare the execution time of each algorithm
    - Analyze the time and space complexity of each approach
    - Determine which algorithm performs best under different circumstances
    - Visualize the results using appropriate charts or tables

    ## Example Input/Output
    \`\`\`
    Items: [(value=60, weight=10), (value=100, weight=20), (value=120, weight=30)]
    Weight Limit: 50
    
    Greedy Approach Result: Total Value = 160, Items Selected = [2, 1]
    Dynamic Programming Result: Total Value = 220, Items Selected = [2, 1, 0]
    Recursive with Memoization Result: Total Value = 220, Items Selected = [2, 1, 0]
    
    Time Comparison:
    - Greedy: 0.0001s
    - Dynamic Programming: 0.0005s
    - Recursive with Memoization: 0.0003s
    \`\`\`

    ## Peer Evaluation Guidelines
    When evaluating your peers' submissions, consider:
    1. Correctness of the implementations
    2. Quality of the algorithm analysis
    3. Clarity of code and documentation
    4. Thoroughness of testing
    5. Insights into algorithm performance

    ## Submission Guidelines
    - Submit your Python code (.py file)
    - Include a report analyzing the time and space complexity
    - Provide performance comparisons with charts or tables
    - Discuss the trade-offs between the different approaches
    - Ensure your code is well-commented and follows PEP 8 style guidelines
    `,
    minWordCount: 250,
    passingGrade: 85
  },
  
  // OOP & Advanced Topics
  'node-4': {
    title: 'MIT OOP & Advanced Topics Assignment',
    description: 'Based on MIT OCW 6.0002: Implement a simulation of virus population dynamics using object-oriented programming.',
    instructions: `
    # MIT OOP & Advanced Topics Assignment

    ## Task Description
    Based on MIT OCW 6.0002 (Introduction to Computational Thinking and Data Science), implement a simulation of virus population dynamics using object-oriented programming. This assignment will model how viruses reproduce and drug treatments affect their population.

    1. Implement the following classes:
       - SimpleVirus: Represents a virus particle with reproduction and resistance properties
       - Patient: Represents a patient infected with viruses
       - ResistantVirus: Extends SimpleVirus with drug resistance mutations
       - TreatedPatient: Extends Patient with the ability to administer drug treatments

    2. Implement simulation methods to:
       - Track virus population over time
       - Model the effects of drug treatments
       - Visualize the results

    ## Requirements
    - Implement proper class hierarchies with inheritance
    - Use encapsulation to protect data integrity
    - Implement polymorphism through method overriding
    - Create custom exceptions for error handling
    - Use appropriate magic methods for object representation
    - Implement a simulation that runs for multiple time steps
    - Create visualizations of the virus population dynamics
    - Analyze the effects of different drug treatment strategies

    ## Example Output
    \`\`\`
    Simulation with SimpleVirus and Patient:
    Initial virus population: 100
    Viruses after 10 time steps: 124
    Viruses after 50 time steps: 143
    Viruses after 100 time steps: 135
    
    Simulation with ResistantVirus and TreatedPatient:
    Initial virus population: 100
    Administering guttagonol at time step 50
    Viruses after 10 time steps: 118
    Viruses after 50 time steps: 135
    Viruses after 51 time steps: 89
    Viruses after 100 time steps: 42
    Viruses after 150 time steps: 37
    Viruses after 300 time steps: 31
    \`\`\`

    ## Peer Evaluation Guidelines
    When evaluating your peers' submissions, consider:
    1. Correctness of the OOP implementation
    2. Quality of the class hierarchy design
    3. Proper use of inheritance and polymorphism
    4. Accuracy of the simulation results
    5. Quality of visualization and analysis

    ## Submission Guidelines
    - Submit your Python code (.py file)
    - Include a UML diagram or description of your class hierarchy
    - Provide example simulation results with visualizations
    - Include an analysis of the virus population dynamics under different conditions
    - Ensure your code is well-commented and follows PEP 8 style guidelines
    `,
    minWordCount: 300,
    passingGrade: 85
  },
  
  // Version Control
  'node-5': {
    title: 'MIT Version Control Assignment',
    description: 'Based on MIT Missing Semester: Implement Git workflows for collaborative Python development.',
    instructions: `
    # MIT Version Control Assignment

    ## Task Description
    Based on MIT's Missing Semester course on Version Control, implement Git workflows for a collaborative Python project. This assignment will test your understanding of Git fundamentals and best practices for team development.

    1. Complete the following Git operations:
       - Initialize a Git repository for a Python project
       - Create a development branch and feature branches
       - Make commits with meaningful commit messages following conventional commit format
       - Implement a feature using a feature branch workflow
       - Create a pull request (or equivalent in your Git platform)
       - Review and merge code with proper code review comments
       - Resolve merge conflicts
       - Use Git hooks for pre-commit linting

    2. Document your Git workflow including:
       - Commands used at each step
       - Branching strategy explanation
       - Conflict resolution process
       - Code review process

    ## Requirements
    - Create a Python project with at least 3 Python files that work together
    - Implement a feature branch workflow with at least 2 feature branches
    - Create at least one scenario with merge conflicts and resolve it
    - Use proper commit message conventions
    - Document your Git workflow with screenshots and command explanations
    - Implement at least one Git hook (pre-commit or post-commit)

    ## Example Workflow Documentation
    \`\`\`
    1. Repository Setup:
       $ git init
       $ git add README.md
       $ git commit -m "feat: initial commit"
       
    2. Development Branch Creation:
       $ git checkout -b develop
       $ git push -u origin develop
       
    3. Feature Implementation:
       $ git checkout -b feature/user-authentication
       # Make changes to authentication.py
       $ git add authentication.py
       $ git commit -m "feat: implement user login functionality"
       $ git push -u origin feature/user-authentication
       
    4. Pull Request and Code Review:
       # Created PR on GitHub from feature/user-authentication to develop
       # Addressed code review comments
       # Merged PR after approval
       
    5. Conflict Resolution:
       $ git checkout develop
       $ git pull
       $ git checkout feature/user-profile
       $ git merge develop
       # Resolved conflicts in user.py
       $ git add user.py
       $ git commit -m "chore: resolve merge conflicts"
    \`\`\`

    ## Peer Evaluation Guidelines
    When evaluating your peers' submissions, consider:
    1. Proper use of Git commands and workflows
    2. Quality of commit messages
    3. Effectiveness of branching strategy
    4. Thoroughness of documentation
    5. Successful conflict resolution

    ## Submission Guidelines
    - Submit a ZIP file containing your Git repository (including .git folder)
    - Include a markdown document with your workflow documentation
    - Provide screenshots of key Git operations
    - Include a reflection on what you learned about collaborative development

    ## Example Workflow
    - Initialize a repository
    - Create branches for different features
    - Make changes and commit them
    - Merge branches and resolve conflicts
    - Use Git log, diff, and other commands to analyze history

    ## Submission Guidelines
    - Submit a document with screenshots and explanations of your Git workflow
    - Include the Git commands you used and their purpose
    - Provide a link to your Git repository (GitHub, GitLab, etc.)
    - Explain how you resolved merge conflicts
    - Describe best practices you followed
    `,
    minWordCount: 200,
    passingGrade: 85
  },
  
  // Repo Hosting
  'node-6': {
    title: 'Repo Hosting Assignment',
    description: 'Set up and manage a project on a repository hosting platform, demonstrating collaboration features and open-source best practices.',
    instructions: `
    # Repo Hosting Assignment

    ## Task Description
    Set up and manage a project on a repository hosting platform (GitHub, GitLab, or Bitbucket), demonstrating collaboration features and open-source best practices. Your submission should include:

    1. Repository setup with proper documentation
    2. Issue tracking and project management
    3. Pull/Merge request workflow
    4. Code reviews
    5. CI/CD integration

    ## Requirements
    - Create a public repository for a simple Python project
    - Set up a comprehensive README.md with project information
    - Create a CONTRIBUTING.md file with guidelines for contributors
    - Set up issue templates and labels
    - Create a project board for task management
    - Implement a pull request template
    - Set up a simple CI/CD pipeline (e.g., GitHub Actions)
    - Demonstrate the pull request and code review process

    ## Example Deliverables
    - Well-structured repository with documentation
    - Sample issues and pull requests
    - CI/CD configuration files
    - Project board with tasks
    - Code review examples

    ## Submission Guidelines
    - Submit a document with screenshots of your repository setup
    - Include links to your repository and specific features
    - Explain your choices for repository organization
    - Describe the collaboration workflow you implemented
    - Reflect on open-source best practices you followed
    `,
    minWordCount: 200,
    passingGrade: 85
  },
  
  // Package Managers
  'node-7': {
    title: 'Package Managers Assignment',
    description: 'Create a Python package with proper dependency management and distribution configuration.',
    instructions: `
    # Package Managers Assignment

    ## Task Description
    Create a Python package with proper dependency management and distribution configuration. Your submission should demonstrate:

    1. Package structure and organization
    2. Dependency management
    3. Virtual environment usage
    4. Package distribution configuration
    5. Documentation generation

    ## Requirements
    - Create a Python package with a proper structure
    - Set up a requirements.txt or pyproject.toml file
    - Configure setup.py or setup.cfg for package distribution
    - Create a virtual environment and document its usage
    - Include proper documentation with docstrings
    - Set up a tool for generating documentation (e.g., Sphinx)
    - Implement version management
    - Include tests for your package

    ## Example Package
    - Create a utility package with useful functions
    - Include multiple modules and subpackages
    - Properly document all functions and classes
    - Set up dependencies with version constraints
    - Configure the package for PyPI distribution

    ## Submission Guidelines
    - Submit your package code as a zip file or repository link
    - Include a document explaining your package structure
    - Provide instructions for installing and using your package
    - Explain your choices for dependency management
    - Include screenshots of your documentation
    `,
    minWordCount: 200,
    passingGrade: 85
  },
  
  // Frameworks
  'node-8': {
    title: 'Frameworks Assignment',
    description: 'Build a web application using a Python web framework, demonstrating routing, templates, forms, and database integration.',
    instructions: `
    # Frameworks Assignment

    ## Task Description
    Build a web application using a Python web framework (Django, Flask, or FastAPI), demonstrating routing, templates, forms, and database integration. Your submission should include:

    1. Application setup and configuration
    2. Routing and URL handling
    3. Template rendering
    4. Form processing and validation
    5. Database models and queries
    6. Authentication and authorization

    ## Requirements
    - Create a web application with at least three different pages
    - Implement a database model with relationships
    - Create forms for data input with validation
    - Implement user authentication
    - Use templates for consistent UI
    - Include static files (CSS, JavaScript)
    - Implement proper error handling
    - Follow the MVC/MVT pattern

    ## Example Application
    - Blog platform with posts, comments, and users
    - Task management system
    - Simple e-commerce site
    - Social media platform

    ## Submission Guidelines
    - Submit your application code as a zip file or repository link
    - Include a document with screenshots of your application
    - Provide instructions for setting up and running your application
    - Explain your design choices and framework selection
    - Describe any challenges you faced and how you solved them
    `,
    minWordCount: 300,
    passingGrade: 85
  },
  
  // Testing
  'node-9': {
    title: 'Testing Assignment',
    description: 'Implement comprehensive testing for a Python application, including unit tests, integration tests, and test automation.',
    instructions: `
    # Testing Assignment

    ## Task Description
    Implement comprehensive testing for a Python application, including unit tests, integration tests, and test automation. Your submission should demonstrate:

    1. Unit testing with pytest or unittest
    2. Test-driven development (TDD)
    3. Mocking and patching
    4. Test coverage analysis
    5. Integration testing
    6. Test automation

    ## Requirements
    - Create a Python application with multiple components
    - Write unit tests for individual functions and classes
    - Implement integration tests for component interactions
    - Use mocking to isolate components during testing
    - Set up test automation with a CI/CD pipeline
    - Generate and analyze test coverage reports
    - Follow TDD principles for at least one component

    ## Example Application
    - API service with database integration
    - Data processing pipeline
    - Library with multiple modules
    - Web application with frontend and backend

    ## Submission Guidelines
    - Submit your application code and tests as a zip file or repository link
    - Include a document explaining your testing strategy
    - Provide screenshots of test results and coverage reports
    - Explain how you implemented TDD
    - Describe your approach to mocking and integration testing
    - Include CI/CD configuration for test automation
    `,
    minWordCount: 250,
    passingGrade: 85
  },
  
  // Default assignment if no specific one is found
  default: {
    title: 'Python Programming Assignment',
    description: 'Complete a practical assignment demonstrating your understanding of Python programming concepts.',
    instructions: `
    # Python Programming Assignment

    ## Task Description
    Complete a practical assignment demonstrating your understanding of Python programming concepts. Your submission should include:

    1. Problem analysis and solution design
    2. Implementation in Python
    3. Testing and validation
    4. Documentation

    ## Requirements
    - Analyze the given problem and design a solution
    - Implement your solution in Python
    - Test your implementation with various inputs
    - Document your code and approach
    - Follow Python best practices

    ## Submission Guidelines
    - Submit your Python code (.py file)
    - Include a document explaining your approach
    - Provide test cases and results
    - Ensure your code is well-commented and follows PEP 8 style guidelines
    `,
    minWordCount: 150,
    passingGrade: 85
  }
};

export default nodeAssignments;