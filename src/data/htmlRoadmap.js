export const htmlRoadmap = {
  nodes: [
    {
      id: 'html-intro',
      data: { 
        label: 'HTML Introduction',
        description: 'Learn the fundamentals of HTML and web document structure',
        type: 'lesson',
        duration: '2 hours',
        resources: [
          { type: 'video', title: 'HTML Crash Course', url: 'https://www.youtube.com/watch?v=UB1O30fR-EE' },
          { type: 'article', title: 'MDN HTML Basics', url: 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics' },
          { type: 'exercise', title: 'HTML Interactive Tutorial', url: 'https://www.freecodecamp.org/learn/responsive-web-design/basic-html-and-html5/' }
        ],
        requirements: ['Basic computer literacy', 'Text editor knowledge'],
        topics: ['HTML Structure', 'Tags and Elements', 'Document Structure', 'Semantic HTML']
      },
      position: { x: 250, y: 50 }
    },
    {
      id: 'html-elements',
      data: { 
        label: 'HTML Elements & Tags',
        description: 'Master common HTML elements and their proper usage',
        type: 'lesson',
        duration: '3 hours',
        resources: [
          { type: 'video', title: 'HTML Elements Deep Dive', url: 'https://www.youtube.com/watch?v=salY_Sm6mv4' },
          { type: 'article', title: 'HTML Element Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element' },
          { type: 'exercise', title: 'HTML Elements Practice', url: 'https://www.w3schools.com/html/html_elements.asp' }
        ],
        requirements: ['HTML basics', 'Understanding of document structure'],
        topics: ['Headings', 'Paragraphs', 'Links', 'Images', 'Lists', 'Tables']
      },
      position: { x: 250, y: 150 }
    },
    {
      id: 'html-quiz-1',
      data: { 
        label: 'Quiz: HTML Basics',
        description: 'Test your understanding of HTML fundamentals and elements',
        type: 'quiz',
        duration: '30 minutes',
        topics: ['HTML Structure', 'Elements', 'Attributes', 'Document Structure']
      },
      position: { x: 250, y: 250 }
    },
    {
      id: 'html-forms',
      data: { 
        label: 'HTML Forms',
        description: 'Learn to create interactive forms with various input types',
        type: 'lesson',
        duration: '4 hours',
        resources: [
          { type: 'video', title: 'HTML Forms Tutorial', url: 'https://www.youtube.com/watch?v=fNcJuPIZ2WE' },
          { type: 'article', title: 'MDN Forms Guide', url: 'https://developer.mozilla.org/en-US/docs/Learn/Forms' },
          { type: 'exercise', title: 'Form Building Practice', url: 'https://www.freecodecamp.org/learn/responsive-web-design/basic-html-and-html5/' }
        ],
        requirements: ['HTML elements knowledge', 'Understanding of user interaction'],
        topics: ['Form Elements', 'Input Types', 'Validation', 'Form Attributes', 'Accessibility']
      },
      position: { x: 250, y: 350 }
    },
    {
      id: 'html-assignment-1',
      data: { 
        label: 'Assignment: Personal Portfolio',
        description: 'Create a personal portfolio website using semantic HTML',
        type: 'assignment',
        duration: '5 hours',
        topics: ['Semantic HTML', 'Forms', 'Document Structure', 'Accessibility']
      },
      position: { x: 250, y: 450 }
    },
    {
      id: 'html-semantic',
      data: { 
        label: 'Semantic HTML',
        description: 'Learn semantic HTML5 elements for better structure and accessibility',
        type: 'lesson',
        duration: '3 hours',
        resources: [
          { type: 'video', title: 'Semantic HTML Explained', url: 'https://www.youtube.com/watch?v=ZThq93Yuwd0' },
          { type: 'article', title: 'HTML5 Semantic Elements', url: 'https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantic_elements' },
          { type: 'exercise', title: 'Semantic HTML Practice', url: 'https://www.w3schools.com/html/html5_semantic_elements.asp' }
        ],
        requirements: ['HTML forms knowledge', 'Basic accessibility understanding'],
        topics: ['Header', 'Nav', 'Main', 'Article', 'Section', 'Aside', 'Footer']
      },
      position: { x: 250, y: 550 }
    },
    {
      id: 'html-accessibility',
      data: { 
        label: 'HTML Accessibility',
        description: 'Learn to create accessible web content with proper HTML',
        type: 'lesson',
        duration: '3 hours',
        resources: [
          { type: 'video', title: 'Web Accessibility Fundamentals', url: 'https://www.youtube.com/watch?v=aqM6rV5IBlg' },
          { type: 'article', title: 'WCAG Guidelines', url: 'https://www.w3.org/WAI/WCAG21/quickref/' },
          { type: 'exercise', title: 'Accessibility Testing', url: 'https://www.freecodecamp.org/learn/responsive-web-design/applied-accessibility/' }
        ],
        requirements: ['Semantic HTML knowledge', 'Understanding of user needs'],
        topics: ['ARIA Labels', 'Alt Text', 'Keyboard Navigation', 'Screen Readers', 'Color Contrast']
      },
      position: { x: 250, y: 650 }
    },
    {
      id: 'html-final-project',
      data: { 
        label: 'Final Project',
        description: 'Build a complete multi-page website with semantic HTML',
        type: 'project',
        duration: '8 hours',
        topics: ['Multi-page Structure', 'Semantic HTML', 'Forms', 'Accessibility', 'Best Practices']
      },
      position: { x: 250, y: 750 }
    },
    {
      id: 'html-certificate',
      data: { 
        label: 'HTML Certificate',
        description: 'Complete the course to earn your HTML fundamentals certificate',
        type: 'certificate',
        duration: '1 hour'
      },
      position: { x: 250, y: 850 }
    }
  ],
  edges: [
    { id: 'e1-2', source: 'html-intro', target: 'html-elements' },
    { id: 'e2-3', source: 'html-elements', target: 'html-quiz-1' },
    { id: 'e3-4', source: 'html-quiz-1', target: 'html-forms' },
    { id: 'e4-5', source: 'html-forms', target: 'html-assignment-1' },
    { id: 'e5-6', source: 'html-assignment-1', target: 'html-semantic' },
    { id: 'e6-7', source: 'html-semantic', target: 'html-accessibility' },
    { id: 'e7-8', source: 'html-accessibility', target: 'html-final-project' },
    { id: 'e8-9', source: 'html-final-project', target: 'html-certificate' }
  ]
};
