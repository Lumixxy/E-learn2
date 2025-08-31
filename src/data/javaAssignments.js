const javaAssignments = {
  'java-assignment-1': {
    title: 'Student Management System',
    description: 'Create a console-based student management system that can add, remove, and display student information.',
    requirements: [
      'Create a Student class with properties: name, id, grade, email',
      'Implement methods to add new students',
      'Implement methods to remove students by ID',
      'Implement methods to display all students',
      'Implement methods to search for students by name',
      'Use proper encapsulation with private fields and public methods',
      'Handle invalid input gracefully'
    ],
    starterCode: `public class Student {
    // TODO: Add private fields for name, id, grade, email
    
    // TODO: Add constructor
    
    // TODO: Add getter and setter methods
    
    // TODO: Add toString method
}

import java.util.ArrayList;
import java.util.Scanner;

public class StudentManagementSystem {
    private ArrayList<Student> students;
    private Scanner scanner;
    
    public StudentManagementSystem() {
        students = new ArrayList<>();
        scanner = new Scanner(System.in);
    }
    
    // TODO: Implement addStudent method
    
    // TODO: Implement removeStudent method
    
    // TODO: Implement displayAllStudents method
    
    // TODO: Implement searchStudent method
    
    public static void main(String[] args) {
        StudentManagementSystem sms = new StudentManagementSystem();
        // TODO: Add menu system for user interaction
    }
}`,
    rubric: [
      {
        criterion: 'Student class properly implemented with encapsulation',
        points: 20,
        description: 'Private fields, public methods, proper constructor'
      },
      {
        criterion: 'Add student functionality works correctly',
        points: 15,
        description: 'Can successfully add new students to the system'
      },
      {
        criterion: 'Remove student functionality works correctly',
        points: 15,
        description: 'Can remove students by ID with proper validation'
      },
      {
        criterion: 'Display and search functionality implemented',
        points: 20,
        description: 'Can display all students and search by name'
      },
      {
        criterion: 'Error handling and input validation',
        points: 15,
        description: 'Handles invalid input and edge cases gracefully'
      },
      {
        criterion: 'Code quality and documentation',
        points: 15,
        description: 'Clean code, proper naming, and comments'
      }
    ]
  },
  'java-assignment-2': {
    title: 'Library Management System',
    description: 'Build a comprehensive library management system with book inventory, member management, and borrowing functionality.',
    requirements: [
      'Create Book class with properties: title, author, ISBN, availability',
      'Create Member class with properties: name, memberId, borrowedBooks',
      'Create Library class to manage books and members',
      'Implement book borrowing and returning functionality',
      'Implement member registration and management',
      'Use inheritance for different types of books (Fiction, NonFiction)',
      'Implement file I/O to save and load library data',
      'Create a user-friendly console interface'
    ],
    starterCode: `import java.util.*;
import java.io.*;

abstract class Book {
    protected String title;
    protected String author;
    protected String ISBN;
    protected boolean isAvailable;
    
    // TODO: Add constructor and methods
    
    public abstract String getBookType();
}

class Fiction extends Book {
    private String genre;
    
    // TODO: Implement Fiction book class
    
    @Override
    public String getBookType() {
        return "Fiction";
    }
}

class NonFiction extends Book {
    private String subject;
    
    // TODO: Implement NonFiction book class
    
    @Override
    public String getBookType() {
        return "Non-Fiction";
    }
}

class Member {
    private String name;
    private String memberId;
    private ArrayList<Book> borrowedBooks;
    
    // TODO: Implement Member class
}

class Library {
    private ArrayList<Book> books;
    private ArrayList<Member> members;
    
    public Library() {
        books = new ArrayList<>();
        members = new ArrayList<>();
    }
    
    // TODO: Implement library management methods
    
    // TODO: Implement file I/O methods
    
    public static void main(String[] args) {
        Library library = new Library();
        // TODO: Create menu system
    }
}`,
    rubric: [
      {
        criterion: 'Book hierarchy with inheritance properly implemented',
        points: 20,
        description: 'Abstract Book class with Fiction and NonFiction subclasses'
      },
      {
        criterion: 'Member class and borrowing system implemented',
        points: 20,
        description: 'Member management with book borrowing/returning functionality'
      },
      {
        criterion: 'Library class with complete management system',
        points: 20,
        description: 'Comprehensive library operations and inventory management'
      },
      {
        criterion: 'File I/O implementation for data persistence',
        points: 15,
        description: 'Save and load library data to/from files'
      },
      {
        criterion: 'User interface and menu system',
        points: 15,
        description: 'Clean console interface with proper menu navigation'
      },
      {
        criterion: 'Code organization and best practices',
        points: 10,
        description: 'Proper use of OOP principles, error handling, and code structure'
      }
    ]
  }
};

export default javaAssignments;
