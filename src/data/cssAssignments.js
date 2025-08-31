const cssAssignments = {
  'css-assignment-1': {
    title: 'Style a Web Page',
    description: 'Apply CSS styling to create an attractive web page layout',
    type: 'coding',
    difficulty: 'beginner',
    estimatedTime: '4 hours',
    passingGrade: 70,
    maxAttempts: 3,
    
    objectives: [
      'Apply CSS selectors effectively',
      'Implement the CSS box model',
      'Create attractive typography and colors',
      'Build a cohesive visual design',
      'Demonstrate understanding of CSS fundamentals'
    ],
    
    requirements: [
      'Style the provided HTML structure with CSS',
      'Use at least 5 different types of selectors',
      'Apply proper typography (font-family, font-size, line-height)',
      'Implement a color scheme with background and text colors',
      'Use the box model (padding, margin, border) effectively',
      'Create hover effects for interactive elements',
      'Ensure good contrast and readability',
      'Make the layout visually appealing and organized'
    ],
    
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Styled Website</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="main-header">
        <nav>
            <ul class="nav-list">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
        <h1 id="site-title">Welcome to My Website</h1>
    </header>
    
    <main>
        <section id="home" class="hero-section">
            <h2>Hero Section</h2>
            <p class="hero-text">This is the main hero section of the website.</p>
            <button class="cta-button">Get Started</button>
        </section>
        
        <section id="about" class="content-section">
            <h2>About Us</h2>
            <p>Learn more about our company and mission.</p>
            <div class="feature-box">
                <h3>Feature 1</h3>
                <p>Description of feature 1</p>
            </div>
            <div class="feature-box">
                <h3>Feature 2</h3>
                <p>Description of feature 2</p>
            </div>
        </section>
        
        <section id="services" class="content-section">
            <h2>Our Services</h2>
            <ul class="services-list">
                <li>Web Design</li>
                <li>Web Development</li>
                <li>SEO Optimization</li>
            </ul>
        </section>
    </main>
    
    <footer id="contact" class="main-footer">
        <p>&copy; 2024 My Website. All rights reserved.</p>
        <p class="contact-info">Contact us at: info@mywebsite.com</p>
    </footer>
</body>
</html>

/* styles.css - Add your CSS here */`,
    
    styleRequirements: [
      {
        section: 'Typography',
        requirements: [
          'Choose appropriate font families for headings and body text',
          'Set proper font sizes and line heights',
          'Ensure good readability and hierarchy'
        ]
      },
      {
        section: 'Color Scheme',
        requirements: [
          'Create a cohesive color palette',
          'Use background colors effectively',
          'Ensure proper contrast ratios',
          'Apply colors consistently throughout'
        ]
      },
      {
        section: 'Layout & Spacing',
        requirements: [
          'Use margin and padding for proper spacing',
          'Create visual separation between sections',
          'Align elements consistently',
          'Use the box model effectively'
        ]
      },
      {
        section: 'Interactive Elements',
        requirements: [
          'Style navigation links with hover effects',
          'Create an attractive call-to-action button',
          'Add visual feedback for interactive elements'
        ]
      }
    ],
    
    rubric: [
      {
        criterion: 'Selector Usage',
        maxPoints: 20,
        description: 'Effective use of various CSS selectors (element, class, ID, pseudo-classes)'
      },
      {
        criterion: 'Typography & Readability',
        maxPoints: 20,
        description: 'Proper font choices, sizes, and readability'
      },
      {
        criterion: 'Color & Visual Design',
        maxPoints: 20,
        description: 'Cohesive color scheme and visual appeal'
      },
      {
        criterion: 'Box Model Implementation',
        maxPoints: 20,
        description: 'Proper use of padding, margin, and border'
      },
      {
        criterion: 'Code Quality',
        maxPoints: 20,
        description: 'Clean, organized CSS with proper formatting'
      }
    ],
    
    resources: [
      {
        title: 'CSS Selectors Reference',
        url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors',
        type: 'documentation'
      },
      {
        title: 'Color Theory for Web Design',
        url: 'https://www.smashingmagazine.com/2010/01/color-theory-for-designers-part-1-the-meaning-of-color/',
        type: 'article'
      },
      {
        title: 'CSS Box Model Guide',
        url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model',
        type: 'tutorial'
      }
    ],
    
    submissionInstructions: `
## Submission Guidelines

1. **Files**: Submit both the HTML file and your styles.css file
2. **Validation**: Ensure your CSS validates using W3C CSS Validator
3. **Testing**: Test your styles in multiple browsers
4. **Documentation**: Add comments to explain your design choices

## Evaluation Criteria

Your styling will be evaluated on:
- Effective use of CSS selectors and properties
- Visual appeal and design consistency
- Proper implementation of the box model
- Code organization and quality
- Accessibility and readability

## Required Elements Checklist

- [ ] At least 5 different types of selectors used
- [ ] Proper typography with font-family and font-size
- [ ] Cohesive color scheme applied throughout
- [ ] Box model properties used effectively
- [ ] Hover effects on interactive elements
- [ ] Good contrast and readability
- [ ] Clean, organized CSS code
- [ ] Visual hierarchy with proper spacing
    `,
    
    minWordCount: 0,
    passingGrade: 70
  },
  
  'css-final-project': {
    title: 'Responsive Website Design',
    description: 'Build a complete responsive website with modern CSS techniques',
    type: 'project',
    difficulty: 'advanced',
    estimatedTime: '10 hours',
    passingGrade: 85,
    maxAttempts: 2,
    
    objectives: [
      'Create a fully responsive multi-page website',
      'Implement CSS Grid and Flexbox layouts',
      'Apply advanced CSS techniques and animations',
      'Ensure cross-browser compatibility',
      'Demonstrate mastery of modern CSS'
    ],
    
    requirements: [
      'Build a responsive website with at least 3 pages',
      'Use CSS Grid for main layout structure',
      'Implement Flexbox for component layouts',
      'Create responsive navigation with mobile menu',
      'Add CSS animations and transitions',
      'Implement a mobile-first approach',
      'Use CSS custom properties (variables)',
      'Ensure accessibility with proper focus states',
      'Optimize for performance and loading speed',
      'Test across multiple devices and browsers'
    ],
    
    projectTypes: [
      'Portfolio Website',
      'Business Landing Page',
      'Blog or Magazine Site',
      'E-commerce Product Showcase',
      'Restaurant or Service Website',
      'Creative Agency Site'
    ],
    
    technicalRequirements: [
      'HTML5 semantic markup',
      'CSS Grid for page layouts',
      'Flexbox for component layouts',
      'CSS custom properties (variables)',
      'Media queries for responsive design',
      'CSS animations and transitions',
      'Modern CSS features (clamp, min, max)',
      'Proper use of CSS methodologies (BEM recommended)',
      'Cross-browser compatibility',
      'Performance optimization'
    ],
    
    responsiveBreakpoints: [
      'Mobile: 320px - 768px',
      'Tablet: 768px - 1024px',
      'Desktop: 1024px and above',
      'Large Desktop: 1440px and above'
    ],
    
    rubric: [
      {
        criterion: 'Responsive Design',
        maxPoints: 25,
        description: 'Perfect responsiveness across all device sizes'
      },
      {
        criterion: 'Layout Implementation',
        maxPoints: 25,
        description: 'Effective use of CSS Grid and Flexbox'
      },
      {
        criterion: 'Visual Design & UX',
        maxPoints: 20,
        description: 'Attractive design with good user experience'
      },
      {
        criterion: 'Modern CSS Techniques',
        maxPoints: 15,
        description: 'Use of animations, custom properties, and modern features'
      },
      {
        criterion: 'Code Quality & Performance',
        maxPoints: 15,
        description: 'Clean, organized code with good performance'
      }
    ],
    
    submissionInstructions: `
## Final Project Submission Guidelines

### Required Deliverables

1. **HTML Files**: All pages with semantic markup
2. **CSS Files**: Organized stylesheets with modern techniques
3. **Assets**: Images, fonts, and other media files
4. **Documentation**: README.md with project overview and features
5. **Live Demo**: Deployed version (GitHub Pages, Netlify, etc.)

### Technical Checklist

Ensure your project includes:
- [ ] Responsive design working on all device sizes
- [ ] CSS Grid used for main page layouts
- [ ] Flexbox used for component layouts
- [ ] Mobile-first responsive approach
- [ ] CSS custom properties for consistent theming
- [ ] Smooth animations and transitions
- [ ] Accessible focus states and navigation
- [ ] Cross-browser compatibility testing
- [ ] Optimized images and performance
- [ ] Valid HTML and CSS code

### Design Requirements

Your website should demonstrate:
- Professional visual design
- Consistent typography and spacing
- Cohesive color scheme
- Intuitive navigation
- Good user experience
- Loading performance optimization

### Bonus Features (Optional)

- Dark/light theme toggle
- Advanced CSS animations
- CSS-only interactive components
- Progressive enhancement techniques
- Advanced accessibility features
- Performance optimization techniques
    `,
    
    minWordCount: 300,
    passingGrade: 85
  }
};

export default cssAssignments;
