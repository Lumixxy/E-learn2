const reactQuizzes = {
  'react-quiz-1': {
    id: 'react-quiz-1',
    title: 'React Fundamentals Quiz',
    description: 'Test your understanding of React basics',
    timeLimit: 1800, // 30 minutes in seconds
    passingScore: 70,
    questions: [
      {
        id: 'q1',
        question: 'What is the correct way to create a React component?',
        type: 'multiple-choice',
        options: [
          'function MyComponent() { return <div>Hello</div>; }',
          'class MyComponent extends React.Component { render() { return <div>Hello</div>; } }',
          'const MyComponent = () => <div>Hello</div>;',
          'All of the above'
        ],
        correctAnswer: 3, // Index of correct answer (0-based)
        points: 10,
        explanation: 'React supports multiple ways to create components, including function components, class components, and arrow function components.'
      },
      {
        id: 'q2',
        question: 'What is JSX?',
        type: 'multiple-choice',
        options: [
          'A syntax extension for JavaScript',
          'A template language',
          'A state management library',
          'A build tool'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript.'
      },
      {
        id: 'q3',
        question: 'What is the purpose of the virtual DOM in React?',
        type: 'multiple-choice',
        options: [
          'To improve performance by minimizing direct DOM manipulation',
          'To handle server-side rendering',
          'To manage component state',
          'To handle routing in React applications'
        ],
        correctAnswer: 0,
        points: 15,
        explanation: 'The virtual DOM is a lightweight copy of the actual DOM that React uses to determine the most efficient way to update the browser DOM.'
      },
      {
        id: 'q4',
        question: 'What is the correct way to update state in a class component?',
        type: 'multiple-choice',
        options: [
          'this.state.count = 1;',
          'this.setState({ count: 1 });',
          'this.updateState({ count: 1 });',
          'setState({ count: 1 });'
        ],
        correctAnswer: 1,
        points: 15,
        explanation: 'In class components, you should always use this.setState() to update state, as it triggers a re-render of the component.'
      },
      {
        id: 'q5',
        question: 'What are props in React?',
        type: 'multiple-choice',
        options: [
          'Internal state of a component',
          'Inputs to a component that are passed from its parent',
          'Methods that define component behavior',
          'Lifecycle methods of a component'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'Props (short for properties) are read-only inputs to a React component that are passed from a parent component.'
      },
      {
        id: 'q6',
        question: 'What is the purpose of the key prop in React lists?',
        type: 'multiple-choice',
        options: [
          'To provide a unique identifier for list items',
          'To style list items',
          'To define the order of list items',
          'To handle click events on list items'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'The key prop helps React identify which items have changed, been added, or been removed, which improves performance when rendering lists.'
      },
      {
        id: 'q7',
        question: 'What is the correct way to handle events in React?',
        type: 'multiple-choice',
        options: [
          '<button onclick="handleClick()">Click me</button>',
          '<button onClick={handleClick}>Click me</button>',
          '<button on:click={handleClick}>Click me</button>',
          '<button click={handleClick}>Click me</button>'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'In React, you use camelCase for event handlers and pass the function reference in curly braces.'
      },
      {
        id: 'q8',
        question: 'What is the purpose of the useEffect hook?',
        type: 'multiple-choice',
        options: [
          'To manage component state',
          'To handle side effects in function components',
          'To create context providers',
          'To optimize component performance'
        ],
        correctAnswer: 1,
        points: 10,
        explanation: 'The useEffect hook lets you perform side effects in function components, such as data fetching, subscriptions, or manually changing the DOM.'
      },
      {
        id: 'q9',
        question: 'What is the difference between state and props?',
        type: 'multiple-choice',
        options: [
          'State is mutable, props are read-only',
          'Props are mutable, state is read-only',
          'State is only for class components, props are for function components',
          'There is no difference'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'State is managed within the component and can be changed using setState or the useState hook, while props are read-only and passed from parent to child components.'
      },
      {
        id: 'q10',
        question: 'What is the purpose of React.Fragment?',
        type: 'multiple-choice',
        options: [
          'To group multiple elements without adding extra nodes to the DOM',
          'To create reusable UI components',
          'To handle form submissions',
          'To manage component state'
        ],
        correctAnswer: 0,
        points: 10,
        explanation: 'React.Fragment lets you group multiple elements without adding an extra DOM node, which is useful when you need to return multiple elements from a component.'
      }
    ]
  }
};

export default reactQuizzes;
