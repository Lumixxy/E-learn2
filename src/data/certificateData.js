export const certificateData = {
  'mit-python': {
    title: 'MIT Python Programming Certificate',
    courseName: 'Introduction to Computer Science and Programming Using Python',
    instructor: 'Prof. John Guttag',
    institution: 'Massachusetts Institute of Technology',
    duration: '12 weeks',
    skills: ['Python Programming', 'Data Structures', 'Algorithms', 'Problem Solving'],
    description: 'This certificate validates completion of MIT\'s comprehensive Python programming course covering fundamental computer science concepts.',
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    logo: 'MIT'
  },
  'javascript': {
    title: 'JavaScript Frontend Development Certificate',
    courseName: 'JavaScript Frontend Development Mastery',
    instructor: 'Prof. Sarah Johnson',
    institution: 'PyGenicArc Academy',
    duration: '8 weeks',
    skills: ['JavaScript', 'DOM Manipulation', 'ES6+', 'Async Programming'],
    description: 'This certificate validates mastery of modern JavaScript programming for web development.',
    color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    logo: 'JS'
  },
  'java': {
    title: 'Java Programming Mastery Certificate',
    courseName: 'Java Object-Oriented Programming',
    instructor: 'Dr. Michael Chen',
    institution: 'PyGenicArc Academy',
    duration: '10 weeks',
    skills: ['Java Programming', 'OOP Concepts', 'Collections', 'Exception Handling'],
    description: 'This certificate validates comprehensive knowledge of Java programming and object-oriented design principles.',
    color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    logo: 'JAVA'
  },
  'database': {
    title: 'Database Management Certificate',
    courseName: 'Database Management and SQL Mastery',
    instructor: 'Prof. Lisa Wang',
    institution: 'PyGenicArc Academy',
    duration: '12 weeks',
    skills: ['SQL', 'Database Design', 'NoSQL', 'Performance Optimization'],
    description: 'This certificate validates expertise in database design, SQL programming, and data management.',
    color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    logo: 'DB'
  },
  'html': {
    title: 'HTML Fundamentals Certificate',
    courseName: 'HTML Web Development Fundamentals',
    instructor: 'Prof. Emily Carter',
    institution: 'PyGenicArc Academy',
    duration: '6 weeks',
    skills: ['HTML5', 'Semantic Elements', 'Forms', 'Accessibility'],
    description: 'This certificate validates foundational knowledge of HTML and web markup standards.',
    color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    logo: 'HTML'
  },
  'css': {
    title: 'CSS Mastery Certificate',
    courseName: 'CSS Styling and Layout Mastery',
    instructor: 'Dr. James Wilson',
    institution: 'PyGenicArc Academy',
    duration: '8 weeks',
    skills: ['CSS3', 'Flexbox', 'Grid', 'Responsive Design'],
    description: 'This certificate validates advanced CSS skills for modern web design and layout.',
    color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    logo: 'CSS'
  },
  'nodejs': {
    title: 'Node.js Backend Development Certificate',
    courseName: 'Node.js Backend Development',
    instructor: 'Dr. Maria Rodriguez',
    institution: 'PyGenicArc Academy',
    duration: '10 weeks',
    skills: ['Node.js', 'Express.js', 'APIs', 'Database Integration'],
    description: 'This certificate validates proficiency in server-side JavaScript development with Node.js.',
    color: 'linear-gradient(135deg, #96fbc4 0%, #f9f586 100%)',
    logo: 'NODE'
  },
  'react': {
    title: 'React Frontend Development Certificate',
    courseName: 'React.js Frontend Development',
    instructor: 'Prof. David Kim',
    institution: 'PyGenicArc Academy',
    duration: '12 weeks',
    skills: ['React.js', 'Components', 'State Management', 'Hooks'],
    description: 'This certificate validates expertise in building modern web applications with React.js.',
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    logo: 'REACT'
  }
};

export const getCertificateData = (courseId) => {
  return certificateData[courseId] || {
    title: 'Course Completion Certificate',
    courseName: 'Programming Course',
    instructor: 'Course Instructor',
    institution: 'PyGenicArc Academy',
    duration: 'Variable',
    skills: ['Programming', 'Problem Solving'],
    description: 'This certificate validates successful completion of the programming course.',
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    logo: 'CERT'
  };
};
