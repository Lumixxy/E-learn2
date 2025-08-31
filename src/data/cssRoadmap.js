export const cssRoadmap = {
  nodes: [
    {
      id: 'css-intro',
      data: { 
        label: 'CSS Introduction',
        description: 'Learn the fundamentals of CSS and styling web pages',
        type: 'lesson',
        duration: '2 hours',
        resources: [
          { type: 'video', title: 'CSS Crash Course', url: 'https://www.youtube.com/watch?v=yfoY53QXEnI' },
          { type: 'article', title: 'MDN CSS Basics', url: 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics' },
          { type: 'exercise', title: 'CSS Interactive Tutorial', url: 'https://www.freecodecamp.org/learn/responsive-web-design/basic-css/' }
        ],
        requirements: ['HTML knowledge', 'Basic understanding of web structure'],
        topics: ['CSS Syntax', 'Selectors', 'Properties', 'Values', 'Cascade']
      },
      position: { x: 250, y: 50 }
    },
    {
      id: 'css-selectors',
      data: { 
        label: 'CSS Selectors',
        description: 'Master different types of CSS selectors and specificity',
        type: 'lesson',
        duration: '3 hours',
        resources: [
          { type: 'video', title: 'CSS Selectors Explained', url: 'https://www.youtube.com/watch?v=l1mER1bV0N0' },
          { type: 'article', title: 'CSS Selector Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors' },
          { type: 'exercise', title: 'CSS Diner Game', url: 'https://flukeout.github.io/' }
        ],
        requirements: ['CSS basics', 'HTML element understanding'],
        topics: ['Element Selectors', 'Class Selectors', 'ID Selectors', 'Pseudo-classes', 'Specificity']
      },
      position: { x: 250, y: 150 }
    },
    {
      id: 'css-quiz-1',
      data: { 
        label: 'Quiz: CSS Fundamentals',
        description: 'Test your understanding of CSS basics and selectors',
        type: 'quiz',
        duration: '30 minutes',
        topics: ['CSS Syntax', 'Selectors', 'Specificity', 'Cascade']
      },
      position: { x: 250, y: 250 }
    },
    {
      id: 'css-box-model',
      data: { 
        label: 'CSS Box Model',
        description: 'Understand the CSS box model and layout fundamentals',
        type: 'lesson',
        duration: '3 hours',
        resources: [
          { type: 'video', title: 'CSS Box Model Explained', url: 'https://www.youtube.com/watch?v=rIO5326FgPE' },
          { type: 'article', title: 'MDN Box Model Guide', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model' },
          { type: 'exercise', title: 'Box Model Interactive', url: 'https://www.w3schools.com/css/css_boxmodel.asp' }
        ],
        requirements: ['CSS selectors knowledge', 'Understanding of HTML structure'],
        topics: ['Content', 'Padding', 'Border', 'Margin', 'Box-sizing']
      },
      position: { x: 250, y: 350 }
    },
    {
      id: 'css-assignment-1',
      data: { 
        label: 'Assignment: Style a Web Page',
        description: 'Apply CSS styling to create an attractive web page layout',
        type: 'assignment',
        duration: '4 hours',
        topics: ['Selectors', 'Box Model', 'Typography', 'Colors', 'Layout']
      },
      position: { x: 250, y: 450 }
    },
    {
      id: 'css-flexbox',
      data: { 
        label: 'CSS Flexbox',
        description: 'Master CSS Flexbox for flexible and responsive layouts',
        type: 'lesson',
        duration: '4 hours',
        resources: [
          { type: 'video', title: 'Flexbox Tutorial', url: 'https://www.youtube.com/watch?v=JJSoEo8JSnc' },
          { type: 'article', title: 'Complete Guide to Flexbox', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/' },
          { type: 'exercise', title: 'Flexbox Froggy Game', url: 'https://flexboxfroggy.com/' }
        ],
        requirements: ['Box model understanding', 'Basic layout concepts'],
        topics: ['Flex Container', 'Flex Items', 'Direction', 'Wrap', 'Justify-content', 'Align-items']
      },
      position: { x: 250, y: 550 }
    },
    {
      id: 'css-grid',
      data: { 
        label: 'CSS Grid',
        description: 'Learn CSS Grid for advanced two-dimensional layouts',
        type: 'lesson',
        duration: '5 hours',
        resources: [
          { type: 'video', title: 'CSS Grid Tutorial', url: 'https://www.youtube.com/watch?v=jV8B24rSN5o' },
          { type: 'article', title: 'Complete Guide to CSS Grid', url: 'https://css-tricks.com/snippets/css/complete-guide-grid/' },
          { type: 'exercise', title: 'Grid Garden Game', url: 'https://cssgridgarden.com/' }
        ],
        requirements: ['Flexbox knowledge', 'Layout fundamentals'],
        topics: ['Grid Container', 'Grid Items', 'Grid Lines', 'Grid Areas', 'Template Areas']
      },
      position: { x: 250, y: 650 }
    },
    {
      id: 'css-responsive',
      data: { 
        label: 'Responsive Design',
        description: 'Create responsive websites that work on all devices',
        type: 'lesson',
        duration: '4 hours',
        resources: [
          { type: 'video', title: 'Responsive Web Design', url: 'https://www.youtube.com/watch?v=srvUrASNdZk' },
          { type: 'article', title: 'Responsive Design Fundamentals', url: 'https://web.dev/responsive-web-design-basics/' },
          { type: 'exercise', title: 'Responsive Design Course', url: 'https://www.freecodecamp.org/learn/responsive-web-design/' }
        ],
        requirements: ['Grid and Flexbox knowledge', 'Media queries understanding'],
        topics: ['Media Queries', 'Viewport', 'Fluid Layouts', 'Flexible Images', 'Mobile-first']
      },
      position: { x: 250, y: 750 }
    },
    {
      id: 'css-final-project',
      data: { 
        label: 'Final Project',
        description: 'Build a complete responsive website with modern CSS',
        type: 'project',
        duration: '10 hours',
        topics: ['Responsive Design', 'Grid', 'Flexbox', 'Animations', 'Modern CSS']
      },
      position: { x: 250, y: 850 }
    },
    {
      id: 'css-certificate',
      data: { 
        label: 'CSS Certificate',
        description: 'Complete the course to earn your CSS styling certificate',
        type: 'certificate',
        duration: '1 hour'
      },
      position: { x: 250, y: 950 }
    }
  ],
  edges: [
    { id: 'e1-2', source: 'css-intro', target: 'css-selectors' },
    { id: 'e2-3', source: 'css-selectors', target: 'css-quiz-1' },
    { id: 'e3-4', source: 'css-quiz-1', target: 'css-box-model' },
    { id: 'e4-5', source: 'css-box-model', target: 'css-assignment-1' },
    { id: 'e5-6', source: 'css-assignment-1', target: 'css-flexbox' },
    { id: 'e6-7', source: 'css-flexbox', target: 'css-grid' },
    { id: 'e7-8', source: 'css-grid', target: 'css-responsive' },
    { id: 'e8-9', source: 'css-responsive', target: 'css-final-project' },
    { id: 'e9-10', source: 'css-final-project', target: 'css-certificate' }
  ]
};
