const databaseQuizzes = {
  'db-quiz-1': {
    questions: [
      {
        question: "What does SQL stand for?",
        options: [
          "Structured Query Language",
          "Simple Query Language",
          "Standard Query Language",
          "Sequential Query Language"
        ],
        correct: 0,
        explanation: "SQL stands for Structured Query Language, which is used to manage and manipulate relational databases."
      },
      {
        question: "Which SQL command is used to retrieve data from a database?",
        options: [
          "GET",
          "FETCH",
          "SELECT",
          "RETRIEVE"
        ],
        correct: 2,
        explanation: "The SELECT statement is used to query and retrieve data from database tables."
      },
      {
        question: "What is a primary key in a database table?",
        options: [
          "The first column in a table",
          "A unique identifier for each row",
          "The most important data in a table",
          "A password for the database"
        ],
        correct: 1,
        explanation: "A primary key is a unique identifier for each row in a table, ensuring no duplicate records."
      },
      {
        question: "Which of the following is NOT a valid SQL data type?",
        options: [
          "VARCHAR",
          "INTEGER",
          "BOOLEAN",
          "ARRAY"
        ],
        correct: 3,
        explanation: "ARRAY is not a standard SQL data type. VARCHAR, INTEGER, and BOOLEAN are all valid SQL data types."
      },
      {
        question: "What does the WHERE clause do in a SQL query?",
        options: [
          "Specifies which columns to return",
          "Filters rows based on specified conditions",
          "Orders the results",
          "Groups the results"
        ],
        correct: 1,
        explanation: "The WHERE clause filters rows based on specified conditions, returning only rows that meet the criteria."
      }
    ]
  },
  'db-quiz-2': {
    questions: [
      {
        question: "What is database normalization?",
        options: [
          "Making all data the same format",
          "Organizing data to reduce redundancy and improve integrity",
          "Backing up the database",
          "Encrypting sensitive data"
        ],
        correct: 1,
        explanation: "Database normalization is the process of organizing data to reduce redundancy and improve data integrity."
      },
      {
        question: "What is an INNER JOIN?",
        options: [
          "Returns all rows from both tables",
          "Returns rows that have matching values in both tables",
          "Returns rows from the left table only",
          "Returns rows from the right table only"
        ],
        correct: 1,
        explanation: "An INNER JOIN returns only the rows that have matching values in both tables being joined."
      },
      {
        question: "What does ACID stand for in database transactions?",
        options: [
          "Atomicity, Consistency, Isolation, Durability",
          "Accuracy, Completeness, Integrity, Dependability",
          "Access, Control, Identity, Data",
          "Authentication, Confidentiality, Integrity, Delivery"
        ],
        correct: 0,
        explanation: "ACID stands for Atomicity, Consistency, Isolation, and Durability - the four key properties of database transactions."
      },
      {
        question: "What is the purpose of database indexing?",
        options: [
          "To backup data",
          "To improve query performance",
          "To encrypt data",
          "To compress data"
        ],
        correct: 1,
        explanation: "Database indexing improves query performance by creating efficient data structures for faster data retrieval."
      },
      {
        question: "Which type of database is MongoDB?",
        options: [
          "Relational database",
          "Graph database",
          "Document database",
          "Key-value database"
        ],
        correct: 2,
        explanation: "MongoDB is a document database (NoSQL) that stores data in flexible, JSON-like documents."
      }
    ]
  }
};

export default databaseQuizzes;
