const htmlAssignments = {
  'html-assignment-1': {
    title: 'Personal Portfolio Website',
    description: 'Create a personal portfolio website using semantic HTML',
    type: 'coding',
    difficulty: 'beginner',
    estimatedTime: '5 hours',
    passingGrade: 70,
    maxAttempts: 3,
    
    objectives: [
      'Create a multi-section personal portfolio',
      'Use semantic HTML5 elements properly',
      'Implement accessible form elements',
      'Structure content with proper hierarchy',
      'Apply HTML best practices'
    ],
    
    requirements: [
      'Create an index.html file with proper DOCTYPE and structure',
      'Include header with navigation menu',
      'Add main content area with multiple sections',
      'Create an about section with personal information',
      'Build a skills/projects section',
      'Add a contact form with various input types',
      'Include footer with copyright information',
      'Use semantic HTML5 elements (header, nav, main, section, article, footer)',
      'Ensure all images have alt attributes',
      'Make the form accessible with proper labels'
    ],
    
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Name - Portfolio</title>
</head>
<body>
    <!-- TODO: Add your portfolio content here -->
    
</body>
</html>`,
    
    sections: [
      {
        name: 'Header & Navigation',
        description: 'Create a header with your name and navigation menu',
        requirements: [
          'Use <header> element',
          'Include <nav> with links to different sections',
          'Add your name as the main heading'
        ]
      },
      {
        name: 'About Section',
        description: 'Personal introduction and background',
        requirements: [
          'Use <section> with appropriate heading',
          'Include a brief bio paragraph',
          'Add a profile image with proper alt text'
        ]
      },
      {
        name: 'Skills/Projects Section',
        description: 'Showcase your skills or projects',
        requirements: [
          'Use <section> with heading',
          'Create a list of skills or projects',
          'Use appropriate list elements (ul, ol, dl)'
        ]
      },
      {
        name: 'Contact Form',
        description: 'Interactive contact form',
        requirements: [
          'Use <form> element with proper attributes',
          'Include name, email, and message fields',
          'Add proper <label> elements for accessibility',
          'Include different input types (text, email, textarea)',
          'Add a submit button'
        ]
      },
      {
        name: 'Footer',
        description: 'Page footer with copyright',
        requirements: [
          'Use <footer> element',
          'Include copyright notice',
          'Add any additional links or information'
        ]
      }
    ],
    
    rubric: [
      {
        criterion: 'HTML Structure',
        maxPoints: 25,
        description: 'Proper use of HTML5 semantic elements and document structure'
      },
      {
        criterion: 'Content Organization',
        maxPoints: 20,
        description: 'Logical organization of content with appropriate headings'
      },
      {
        criterion: 'Form Implementation',
        maxPoints: 25,
        description: 'Properly structured and accessible contact form'
      },
      {
        criterion: 'Accessibility',
        maxPoints: 20,
        description: 'Alt attributes, labels, and semantic markup for accessibility'
      },
      {
        criterion: 'Code Quality',
        maxPoints: 10,
        description: 'Clean, readable HTML with proper indentation'
      }
    ],
    
    resources: [
      {
        title: 'HTML5 Semantic Elements',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element',
        type: 'documentation'
      },
      {
        title: 'HTML Forms Guide',
        url: 'https://developer.mozilla.org/en-US/docs/Learn/Forms',
        type: 'tutorial'
      },
      {
        title: 'Web Accessibility Guidelines',
        url: 'https://www.w3.org/WAI/WCAG21/quickref/',
        type: 'reference'
      }
    ],
    
    submissionInstructions: `
## Submission Guidelines

1. **File Structure**: Submit a single HTML file named 'index.html'
2. **Validation**: Ensure your HTML validates using W3C Markup Validator
3. **Testing**: Test your form elements and navigation links
4. **Accessibility**: Check that all images have alt text and forms have labels

## Evaluation Criteria

Your portfolio will be evaluated on:
- Proper use of semantic HTML5 elements
- Well-structured and accessible content
- Functional contact form with proper labels
- Clean, readable code with good organization
- Appropriate use of headings and content hierarchy

## Required Elements Checklist

- [ ] DOCTYPE declaration and proper HTML structure
- [ ] Header with navigation menu
- [ ] Main content area with semantic sections
- [ ] About section with personal information
- [ ] Skills or projects showcase
- [ ] Contact form with multiple input types
- [ ] Footer with copyright information
- [ ] All images have descriptive alt attributes
- [ ] Form inputs have associated labels
- [ ] Proper heading hierarchy (h1, h2, h3, etc.)
    `,
    
    minWordCount: 0,
    passingGrade: 70
  },
  
  'html-final-project': {
    title: 'Multi-Page Website',
    description: 'Build a complete multi-page website with semantic HTML and accessibility features',
    type: 'project',
    difficulty: 'intermediate',
    estimatedTime: '8 hours',
    passingGrade: 80,
    maxAttempts: 2,
    
    objectives: [
      'Create a multi-page website with consistent structure',
      'Implement advanced semantic HTML throughout',
      'Ensure full accessibility compliance',
      'Create complex forms with validation attributes',
      'Demonstrate mastery of HTML best practices'
    ],
    
    requirements: [
      'Create at least 4 interconnected HTML pages',
      'Implement consistent navigation across all pages',
      'Use advanced semantic elements (article, aside, figure, etc.)',
      'Create complex forms with HTML5 validation',
      'Include multimedia elements (images, videos) with proper accessibility',
      'Implement proper document outline and heading structure',
      'Add meta tags for SEO and social sharing',
      'Ensure WCAG 2.1 AA compliance',
      'Create a sitemap page',
      'Include structured data markup (optional bonus)'
    ],
    
    pageRequirements: [
      {
        page: 'Home Page (index.html)',
        requirements: [
          'Hero section with main heading and navigation',
          'Overview of site content',
          'Featured content or highlights',
          'Call-to-action elements'
        ]
      },
      {
        page: 'About Page',
        requirements: [
          'Detailed information about the topic/organization',
          'Team or personal information',
          'Mission statement or goals',
          'Timeline or history section'
        ]
      },
      {
        page: 'Services/Products Page',
        requirements: [
          'Detailed listings with descriptions',
          'Pricing information (if applicable)',
          'Feature comparisons',
          'Testimonials or reviews'
        ]
      },
      {
        page: 'Contact Page',
        requirements: [
          'Advanced contact form with validation',
          'Multiple contact methods',
          'Location information',
          'Business hours or availability'
        ]
      }
    ],
    
    rubric: [
      {
        criterion: 'Multi-Page Structure',
        maxPoints: 20,
        description: 'Consistent navigation and structure across all pages'
      },
      {
        criterion: 'Semantic HTML Usage',
        maxPoints: 25,
        description: 'Advanced use of semantic elements and proper document outline'
      },
      {
        criterion: 'Accessibility Compliance',
        maxPoints: 25,
        description: 'Full WCAG 2.1 AA compliance with proper ARIA usage'
      },
      {
        criterion: 'Form Complexity',
        maxPoints: 15,
        description: 'Advanced forms with HTML5 validation and accessibility'
      },
      {
        criterion: 'Code Quality & SEO',
        maxPoints: 15,
        description: 'Clean code, proper meta tags, and SEO optimization'
      }
    ],
    
    submissionInstructions: `
## Final Project Submission Guidelines

### Required Deliverables

1. **HTML Files**: All 4+ pages with consistent structure
2. **Navigation**: Working internal links between all pages
3. **Documentation**: README.md explaining your site structure and features
4. **Accessibility Report**: Document how you ensured accessibility compliance

### Technical Requirements

- Valid HTML5 markup (W3C validated)
- Semantic element usage throughout
- Proper document outline and heading hierarchy
- Accessible forms with labels and validation
- Alt text for all images
- Meta tags for SEO and social sharing
- Consistent navigation across all pages

### Accessibility Checklist

Ensure your website meets these accessibility standards:
- [ ] All images have descriptive alt attributes
- [ ] Forms have proper labels and fieldsets
- [ ] Heading hierarchy is logical (h1 → h2 → h3)
- [ ] Links have descriptive text
- [ ] Color is not the only way to convey information
- [ ] Page has a logical tab order
- [ ] ARIA labels used where appropriate
- [ ] Language is specified in HTML tag

### Bonus Features (Optional)

- Structured data markup (Schema.org)
- Open Graph meta tags for social sharing
- Multiple language support
- Advanced form validation patterns
- Microformats for contact information
    `,
    
    minWordCount: 200,
    passingGrade: 80
  }
};

export default htmlAssignments;
