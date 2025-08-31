const javaQuizzes = {
  'java-quiz-1': {
    questions: [
      {
        question: "Which of the following is the correct way to declare a variable in Java?",
        options: [
          "var x = 10;",
          "int x = 10;",
          "x = 10;",
          "declare int x = 10;"
        ],
        correct: 1,
        explanation: "In Java, you must specify the data type when declaring a variable. 'int x = 10;' is the correct syntax."
      },
      {
        question: "What is the main method signature in Java?",
        options: [
          "public static void main(String args)",
          "public static void main(String[] args)",
          "public void main(String[] args)",
          "static void main(String[] args)"
        ],
        correct: 1,
        explanation: "The correct main method signature is 'public static void main(String[] args)' - it must be public, static, void, and take a String array parameter."
      },
      {
        question: "Which keyword is used to create a class in Java?",
        options: [
          "create",
          "new",
          "class",
          "define"
        ],
        correct: 2,
        explanation: "The 'class' keyword is used to define a class in Java."
      },
      {
        question: "What is the default value of an int variable in Java?",
        options: [
          "null",
          "undefined",
          "0",
          "1"
        ],
        correct: 2,
        explanation: "The default value of an int variable in Java is 0."
      },
      {
        question: "Which of these is NOT a primitive data type in Java?",
        options: [
          "int",
          "boolean",
          "String",
          "double"
        ],
        correct: 2,
        explanation: "String is not a primitive data type in Java - it's a reference type. The primitive types are int, boolean, double, char, byte, short, long, and float."
      }
    ]
  },
  'java-quiz-2': {
    questions: [
      {
        question: "What is inheritance in Java?",
        options: [
          "A way to hide data",
          "A mechanism where one class acquires properties of another class",
          "A method to create objects",
          "A way to handle exceptions"
        ],
        correct: 1,
        explanation: "Inheritance is a mechanism where one class (child/subclass) acquires the properties and methods of another class (parent/superclass)."
      },
      {
        question: "Which collection class allows duplicate elements?",
        options: [
          "Set",
          "HashSet",
          "ArrayList",
          "TreeSet"
        ],
        correct: 2,
        explanation: "ArrayList allows duplicate elements, while Set implementations (HashSet, TreeSet) do not allow duplicates."
      },
      {
        question: "What is polymorphism in Java?",
        options: [
          "Having multiple constructors",
          "The ability of an object to take many forms",
          "Creating multiple classes",
          "Using multiple inheritance"
        ],
        correct: 1,
        explanation: "Polymorphism is the ability of an object to take many forms - the same method can behave differently based on the object that calls it."
      },
      {
        question: "Which keyword is used to prevent inheritance in Java?",
        options: [
          "static",
          "final",
          "private",
          "abstract"
        ],
        correct: 1,
        explanation: "The 'final' keyword prevents a class from being inherited when applied to a class declaration."
      },
      {
        question: "What is the difference between ArrayList and LinkedList?",
        options: [
          "No difference",
          "ArrayList is faster for random access, LinkedList is faster for insertions/deletions",
          "LinkedList is always faster",
          "ArrayList can only store integers"
        ],
        correct: 1,
        explanation: "ArrayList uses an array internally making it faster for random access, while LinkedList uses a doubly-linked list making it faster for insertions and deletions."
      }
    ]
  }
};

export default javaQuizzes;
