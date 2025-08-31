const htmlQuizzes = {
  'html-quiz-1': {
    title: 'HTML Basics Quiz',
    description: 'Test your understanding of HTML fundamentals and elements',
    timeLimit: 30,
    passingScore: 70,
    questions: [
      {
        id: 1,
        question: 'What does HTML stand for?',
        type: 'multiple-choice',
        options: [
          'Hyper Text Markup Language',
          'High Tech Modern Language',
          'Home Tool Markup Language',
          'Hyperlink and Text Markup Language'
        ],
        correct: 0,
        explanation: 'HTML stands for Hyper Text Markup Language, which is the standard markup language for creating web pages.'
      },
      {
        id: 2,
        question: 'Which HTML element is used for the largest heading?',
        type: 'multiple-choice',
        options: [
          '<h6>',
          '<h1>',
          '<header>',
          '<heading>'
        ],
        correct: 1,
        explanation: 'The <h1> element represents the largest heading in HTML, with headings going from h1 (largest) to h6 (smallest).'
      },
      {
        id: 3,
        question: 'What is the correct HTML element for inserting a line break?',
        type: 'multiple-choice',
        options: [
          '<break>',
          '<lb>',
          '<br>',
          '<newline>'
        ],
        correct: 2,
        explanation: 'The <br> element is used to insert a line break in HTML. It is a self-closing element.'
      },
      {
        id: 4,
        question: 'Which attribute specifies the URL of the page the link goes to?',
        type: 'multiple-choice',
        options: [
          'src',
          'href',
          'link',
          'url'
        ],
        correct: 1,
        explanation: 'The href attribute specifies the URL of the page the link goes to in an anchor (<a>) element.'
      },
      {
        id: 5,
        question: 'What is the correct HTML for creating a hyperlink?',
        type: 'multiple-choice',
        options: [
          '<a url="http://www.example.com">Example</a>',
          '<a href="http://www.example.com">Example</a>',
          '<a>http://www.example.com</a>',
          '<link href="http://www.example.com">Example</link>'
        ],
        correct: 1,
        explanation: 'The correct syntax for creating a hyperlink is <a href="URL">Link Text</a>.'
      },
      {
        id: 6,
        question: 'Which HTML element is used to specify a footer for a document or section?',
        type: 'multiple-choice',
        options: [
          '<bottom>',
          '<section>',
          '<footer>',
          '<foot>'
        ],
        correct: 2,
        explanation: 'The <footer> element represents a footer for its nearest sectioning content or sectioning root element.'
      }
    ]
  }
};

export default htmlQuizzes;
