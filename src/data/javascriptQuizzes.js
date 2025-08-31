const javascriptQuizzes = {
  'js-quiz-1': {
    questions: [
      {
        question: "Which of the following is the correct way to declare a variable in JavaScript?",
        options: ["var myVar = 5;", "variable myVar = 5;", "v myVar = 5;", "declare myVar = 5;"],
        correct: 0,
        explanation: "The 'var' keyword is used to declare variables in JavaScript. You can also use 'let' or 'const' in modern JavaScript."
      },
      {
        question: "What is the result of typeof null in JavaScript?",
        options: ["null", "undefined", "object", "boolean"],
        correct: 2,
        explanation: "This is a well-known quirk in JavaScript. typeof null returns 'object', which is considered a bug in the language but has been kept for backward compatibility."
      },
      {
        question: "Which method is used to add an element to the end of an array?",
        options: ["append()", "push()", "add()", "insert()"],
        correct: 1,
        explanation: "The push() method adds one or more elements to the end of an array and returns the new length of the array."
      },
      {
        question: "What does the '===' operator do in JavaScript?",
        options: ["Assigns a value", "Compares values only", "Compares values and types", "Declares a variable"],
        correct: 2,
        explanation: "The '===' operator performs strict equality comparison, checking both value and type. It's generally preferred over '==' which performs type coercion."
      }
    ]
  },
  'js-quiz-2': {
    questions: [
      {
        question: "Which method is used to select an element by its ID in the DOM?",
        options: ["document.querySelector()", "document.getElementById()", "document.getElement()", "document.selectById()"],
        correct: 1,
        explanation: "document.getElementById() is the specific method to select an element by its ID. document.querySelector() can also be used with '#id' syntax."
      },
      {
        question: "What is event bubbling in JavaScript?",
        options: ["Events moving from child to parent elements", "Events moving from parent to child elements", "Events being cancelled", "Events being duplicated"],
        correct: 0,
        explanation: "Event bubbling is when an event starts from the target element and bubbles up through its parent elements in the DOM hierarchy."
      },
      {
        question: "Which method is used to add an event listener to an element?",
        options: ["element.addEvent()", "element.addEventListener()", "element.onEvent()", "element.bindEvent()"],
        correct: 1,
        explanation: "addEventListener() is the modern way to attach event handlers to elements. It allows multiple listeners for the same event."
      },
      {
        question: "What does event.preventDefault() do?",
        options: ["Stops event bubbling", "Prevents the default browser action", "Removes the event listener", "Cancels all events"],
        correct: 1,
        explanation: "preventDefault() stops the browser from performing the default action associated with the event, like following a link or submitting a form."
      }
    ]
  }
};

export default javascriptQuizzes;
