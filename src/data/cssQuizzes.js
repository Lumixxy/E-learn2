const cssQuizzes = {
  'css-quiz-1': {
    title: 'CSS Fundamentals Quiz',
    description: 'Test your understanding of CSS basics and selectors',
    timeLimit: 30,
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'What does CSS stand for?',
        type: 'multiple-choice',
        options: [
          'Cascading Style Sheets',
          'Computer Style Sheets',
          'Creative Style Sheets',
          'Colorful Style Sheets'
        ],
        correct: 0,
        explanation: 'CSS stands for Cascading Style Sheets, which describes how HTML elements are to be displayed.'
      },
      {
        id: 2,
        question: 'Which CSS selector has the highest specificity?',
        type: 'multiple-choice',
        options: [
          'Element selector',
          'Class selector',
          'ID selector',
          'Universal selector'
        ],
        correct: 2,
        explanation: 'ID selectors have higher specificity than class selectors, which have higher specificity than element selectors.'
      },
      {
        id: 3,
        question: 'What is the correct CSS syntax for making all <p> elements bold?',
        type: 'multiple-choice',
        options: [
          'p {text-size: bold;}',
          'p {font-weight: bold;}',
          '<p style="font-size: bold;">',
          'p {text-weight: bold;}'
        ],
        correct: 1,
        explanation: 'The font-weight property is used to make text bold. The value "bold" or numerical values like 700 can be used.'
      },
      {
        id: 4,
        question: 'Which property is used to change the background color?',
        type: 'multiple-choice',
        options: [
          'color',
          'bgcolor',
          'background-color',
          'bg-color'
        ],
        correct: 2,
        explanation: 'The background-color property is used to set the background color of an element.'
      },
      {
        id: 5,
        question: 'What does the CSS box model consist of?',
        type: 'multiple-choice',
        options: [
          'Content, padding, border, margin',
          'Content, spacing, border, outline',
          'Text, padding, border, margin',
          'Content, padding, outline, margin'
        ],
        correct: 0,
        explanation: 'The CSS box model consists of content, padding, border, and margin from inside to outside.'
      },
      {
        id: 6,
        question: 'Which CSS property controls the text size?',
        type: 'multiple-choice',
        options: [
          'text-style',
          'font-size',
          'text-size',
          'font-style'
        ],
        correct: 1,
        explanation: 'The font-size property is used to control the size of text in CSS.'
      }
    ]
  }
};

export default cssQuizzes;
