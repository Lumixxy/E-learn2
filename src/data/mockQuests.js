// Mock data for Web Warrior Adventure Path quests
const mockQuests = [
  {
    id: 'html-basics',
    quest_number: 1,
    title: 'HTML Foundations',
    description: 'Learn the basics of HTML structure and elements',
    progress: 100,
    locked: false
  },
  {
    id: 'css-styling',
    quest_number: 2,
    title: 'CSS Styling',
    description: 'Master the art of styling web pages with CSS',
    progress: 75,
    locked: false
  },
  {
    id: 'javascript-intro',
    quest_number: 3,
    title: 'JavaScript Basics',
    description: 'Introduction to JavaScript programming',
    progress: 30,
    locked: false
  },
  {
    id: 'dom-manipulation',
    quest_number: 4,
    title: 'DOM Manipulation',
    description: 'Learn to interact with the Document Object Model',
    progress: 0,
    locked: false
  },
  {
    id: 'responsive-design',
    quest_number: 5,
    title: 'Responsive Design',
    description: 'Create websites that work on any device',
    progress: 0,
    locked: true
  },
  {
    id: 'api-integration',
    quest_number: 6,
    title: 'API Integration',
    description: 'Connect your applications to external services',
    progress: 0,
    locked: true
  },
  {
    id: 'frontend-frameworks',
    quest_number: 7,
    title: 'Frontend Frameworks',
    description: 'Build applications with modern frameworks',
    progress: 0,
    locked: true
  },
  {
    id: 'deployment',
    quest_number: 8,
    title: 'Deployment',
    description: 'Deploy your web applications to production',
    progress: 0,
    locked: true
  }
];

export default mockQuests;