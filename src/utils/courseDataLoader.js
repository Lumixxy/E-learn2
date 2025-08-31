import * as XLSX from 'xlsx';

// Helper to aggregate rows by course and module into a rich structure
export const aggregateRowsToCourses = (rows) => {
  const courseNameToCourse = new Map();
  let nextCourseId = 1;

  for (const row of rows) {
    const courseName = String(row.course || row.Course || '').trim();
    if (!courseName) continue;
    const moduleName = String(row.module || row.Module || 'General Module').trim();
    const topicTitle = String(row.topic || row.Topic || 'Untitled Topic').trim();
    const websiteLink = String(row.websiteLink || row.WebsiteLink || '').trim();

    // Ensure course
    if (!courseNameToCourse.has(courseName)) {
      courseNameToCourse.set(courseName, {
        id: nextCourseId++,
        title: courseName,
        description: row.description || row.Description || 'No description available.',
        instructor: row.instructor || row.Instructor || 'MIT OpenCourseWare',
        rating: Number(row.rating || row.Rating || 4.5),
        totalRatings: Number(row.totalRatings || row.TotalRatings || 100),
        duration: row.duration || row.Duration || '8 weeks',
        lectures: Number(row.lectures || row.Lectures || 12),
        level: row.level || row.Level || 'Intermediate',
        price: row.price || row.Price || 'Free',
        imageUrl:
          row.imageUrl || row.ImageUrl || 'https://via.placeholder.com/300x200?text=Course',
        tags: (row.tags || row.Tags
          ? String(row.tags || row.Tags)
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean)
          : ['Programming']),
        modules: [],
      });
    }
    const course = courseNameToCourse.get(courseName);

    // Ensure module
    let module = course.modules.find((m) => m.title === moduleName);
    if (!module) {
      module = {
        id: `${course.id}_${course.modules.length + 1}`,
        title: moduleName,
        description: row.moduleDescription || row.ModuleDescription || '',
        lessons: [],
      };
      course.modules.push(module);
    }

    // Add lesson
    const summary =
      String(row.topicDescription || row.TopicDescription || row.Description || '')
        .trim() || `Learn: ${topicTitle}`;

    module.lessons.push({
      id: `${module.id}_${module.lessons.length + 1}`,
      title: topicTitle,
      type: 'reading',
      duration: row.duration || row.Duration || '30 min',
      completed: false,
      content: `This content is for: **${topicTitle}**\n\nAccess course materials: [${websiteLink}](${websiteLink})`,
      summary,
      websiteLink,
    });
  }

  return Array.from(courseNameToCourse.values());
};

const fetchFirstAvailable = async (paths) => {
  for (const path of paths) {
    try {
      const res = await fetch(path);
      if (res.ok) return res;
    } catch (_) {
      // continue
    }
  }
  throw new Error('No Excel file found at provided paths');
};

export const loadCourseData = async () => {
  try {
    // Try to load both course data sources and combine them
    let allCourses = [];
    
    // Add hardcoded course data for new technologies
    const newTechCourses = [
      {
        id: 'mit-python',
        title: 'MIT 6.0001: Introduction to Computer Science and Programming in Python',
        description: 'Learn fundamental programming concepts with Python from MIT\'s renowned computer science course.',
        instructor: 'Dr. Ana Bell',
        duration: '12 weeks',
        difficulty: 'Beginner',
        level: 'Beginner',
        rating: 4.8,
        totalRatings: 45230,
        price: 'Free',
        isFree: true,
        imageUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=2070&auto=format&fit=crop',
        tags: ['Python', 'Computer Science', 'Programming', 'MIT'],
        modules: [
          { title: 'Introduction to Computation', description: 'What is computation and computational thinking' },
          { title: 'Branching and Iteration', description: 'Control flow in Python programs' },
          { title: 'String Manipulation', description: 'Working with strings and text processing' },
          { title: 'Functions', description: 'Decomposition, abstraction, and functions' },
          { title: 'Tuples, Lists, and Dictionaries', description: 'Data structures in Python' },
          { title: 'Recursion', description: 'Recursive thinking and implementation' },
          { title: 'Testing and Debugging', description: 'Program testing and debugging strategies' },
          { title: 'Exceptions and Assertions', description: 'Error handling in Python' },
          { title: 'Object Oriented Programming', description: 'Classes and inheritance' },
          { title: 'Program Efficiency', description: 'Big O notation and algorithm complexity' },
          { title: 'Searching and Sorting', description: 'Search and sort algorithms' },
          { title: 'Plotting', description: 'Data visualization with matplotlib' }
        ]
      },
      {
        id: 'javascript',
        title: 'JavaScript Frontend Development',
        description: 'Master modern JavaScript programming for web development.',
        instructor: 'Prof. Sarah Johnson',
        duration: '8 weeks',
        difficulty: 'Beginner to Intermediate',
        level: 'Intermediate',
        rating: 4.8,
        totalRatings: 41250,
        price: 'Free',
        isFree: true,
        imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2070&auto=format&fit=crop',
        tags: ['JavaScript', 'Frontend', 'Programming', 'Web Development'],
        modules: [
          { title: 'JavaScript Introduction', description: 'Learn JavaScript basics and syntax' },
          { title: 'Variables & Data Types', description: 'Understanding variables, data types, and operators' },
          { title: 'Functions & Scope', description: 'Master functions, scope, and closures' },
          { title: 'DOM Manipulation', description: 'Interact with HTML elements using JavaScript' },
          { title: 'Events & Event Handling', description: 'Handle user interactions and browser events' },
          { title: 'Async JavaScript', description: 'Master promises, async/await, and asynchronous programming' },
          { title: 'ES6+ Features', description: 'Learn modern JavaScript features and syntax' },
          { title: 'Final Project', description: 'Create an interactive browser game' }
        ]
      },
      {
        id: 'java',
        title: 'Java Programming Mastery',
        description: 'Master object-oriented programming with Java from fundamentals to advanced concepts.',
        instructor: 'Dr. Michael Chen',
        duration: '10 weeks',
        difficulty: 'Intermediate to Advanced',
        level: 'Intermediate',
        rating: 4.9,
        totalRatings: 35670,
        price: 'Free',
        isFree: true,
        imageUrl: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=2069&auto=format&fit=crop',
        tags: ['Java', 'OOP', 'Programming', 'Backend'],
        modules: [
          { title: 'Java Introduction', description: 'Introduction to Java programming language and ecosystem' },
          { title: 'Java Syntax & Variables', description: 'Learn Java syntax, variables, and data types' },
          { title: 'OOP Concepts', description: 'Object-oriented programming principles in Java' },
          { title: 'Classes & Objects', description: 'Creating and using classes and objects' },
          { title: 'Inheritance & Polymorphism', description: 'Advanced OOP concepts' },
          { title: 'Java Collections', description: 'Working with ArrayList, HashMap, and collections' },
          { title: 'Exception Handling', description: 'Handle errors and exceptions in Java' },
          { title: 'File I/O Operations', description: 'Read from and write to files in Java' }
        ]
      },
      {
        id: 'database',
        title: 'Database Management Mastery',
        description: 'Master SQL, database design, and both relational and NoSQL databases.',
        instructor: 'Prof. Lisa Wang',
        duration: '12 weeks',
        difficulty: 'Intermediate to Advanced',
        level: 'Intermediate',
        rating: 4.8,
        totalRatings: 28940,
        price: 'Free',
        isFree: true,
        imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2070&auto=format&fit=crop',
        tags: ['Database', 'SQL', 'NoSQL', 'Data Management'],
        modules: [
          { title: 'Database Fundamentals', description: 'Introduction to databases and DBMS concepts' },
          { title: 'SQL Basics', description: 'Learn SQL syntax and basic queries' },
          { title: 'Table Design & Normalization', description: 'Database design principles and normalization' },
          { title: 'Advanced SQL', description: 'Joins, subqueries, and complex operations' },
          { title: 'Indexing & Performance', description: 'Database optimization and indexing strategies' },
          { title: 'Transactions & ACID', description: 'Transaction management and ACID properties' },
          { title: 'NoSQL Databases', description: 'Introduction to MongoDB and document databases' },
          { title: 'Database Security', description: 'Security best practices and data protection' }
        ]
      },
      {
        id: 'html',
        title: 'HTML Fundamentals',
        description: 'Master the building blocks of the web with comprehensive HTML training.',
        instructor: 'Prof. Emily Carter',
        duration: '6 weeks',
        difficulty: 'Beginner',
        level: 'Beginner',
        rating: 4.7,
        totalRatings: 38420,
        price: 'Free',
        isFree: true,
        imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop',
        tags: ['HTML', 'Web Development', 'Frontend'],
        modules: [
          { title: 'HTML Introduction', description: 'Learn the basics of HTML structure and syntax' },
          { title: 'HTML Elements & Tags', description: 'Master common HTML elements and their usage' },
          { title: 'HTML Forms', description: 'Create interactive forms and input elements' },
          { title: 'Semantic HTML', description: 'Use semantic elements for better accessibility' },
          { title: 'HTML Accessibility', description: 'Make your HTML accessible to all users' }
        ]
      },
      {
        id: 'css',
        title: 'CSS Styling and Layout',
        description: 'Create beautiful, responsive web designs with modern CSS techniques.',
        instructor: 'Dr. James Wilson',
        duration: '8 weeks',
        difficulty: 'Beginner to Intermediate',
        level: 'Intermediate',
        rating: 4.8,
        totalRatings: 35680,
        price: 'Free',
        isFree: true,
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop',
        tags: ['CSS', 'Web Development', 'Frontend', 'Design'],
        modules: [
          { title: 'CSS Fundamentals', description: 'Learn CSS syntax, selectors, and properties' },
          { title: 'CSS Layout', description: 'Master Flexbox and Grid layout systems' },
          { title: 'Responsive Design', description: 'Create responsive layouts for all devices' },
          { title: 'CSS Animations', description: 'Add animations and transitions to your designs' },
          { title: 'Advanced CSS', description: 'Explore advanced CSS techniques and best practices' }
        ]
      },
      {
        id: 'nodejs',
        title: 'Node.js Backend Development',
        description: 'Build scalable server-side applications with Node.js and Express.',
        instructor: 'Dr. Maria Rodriguez',
        duration: '10 weeks',
        difficulty: 'Intermediate',
        level: 'Intermediate',
        rating: 4.9,
        totalRatings: 29340,
        price: 'Free',
        isFree: true,
        imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2070&auto=format&fit=crop',
        tags: ['Node.js', 'Backend', 'JavaScript', 'Server'],
        modules: [
          { title: 'Node.js Fundamentals', description: 'Learn Node.js basics and core modules' },
          { title: 'Express.js Framework', description: 'Build web applications with Express.js' },
          { title: 'Database Integration', description: 'Connect to databases and manage data' },
          { title: 'API Development', description: 'Create RESTful APIs and handle requests' },
          { title: 'Authentication & Security', description: 'Implement user authentication and security' },
          { title: 'Deployment & Production', description: 'Deploy Node.js applications to production' }
        ]
      },
      {
        id: 'react',
        title: 'React.js Frontend Development',
        description: 'Build modern, interactive user interfaces with React and its ecosystem.',
        instructor: 'Prof. David Kim',
        duration: '12 weeks',
        difficulty: 'Intermediate',
        level: 'Intermediate',
        rating: 4.8,
        totalRatings: 42150,
        price: 'Free',
        isFree: true,
        imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop',
        tags: ['React', 'Frontend', 'JavaScript', 'Framework'],
        modules: [
          { title: 'React Fundamentals', description: 'Learn React components, JSX, and props' },
          { title: 'State Management', description: 'Master React state and lifecycle methods' },
          { title: 'React Hooks', description: 'Use modern React hooks for state and effects' },
          { title: 'Component Patterns', description: 'Learn advanced component patterns and composition' },
          { title: 'React Router', description: 'Implement client-side routing in React apps' },
          { title: 'Testing & Deployment', description: 'Test and deploy React applications' }
        ]
      }
    ];
    
    allCourses = [...newTechCourses];
    
    // Load main courses from courses.json
    try {
      const response = await fetch('/data/courses.json');
      if (response.ok) {
        const courses = await response.json();
        if (Array.isArray(courses) && courses.length > 0) {
          allCourses = [...allCourses, ...courses];
          console.log(`Loaded ${courses.length} courses from courses.json`);
        }
      }
    } catch (error) {
      console.warn('Failed to load courses.json:', error);
    }
    
    // Load technical courses from technical_courses.json
    try {
      const response = await fetch('/data/technical_courses.json');
      if (response.ok) {
        const technicalCourses = await response.json();
        if (Array.isArray(technicalCourses) && technicalCourses.length > 0) {
          allCourses = [...allCourses, ...technicalCourses];
          console.log(`Loaded ${technicalCourses.length} technical courses from technical_courses.json`);
        }
      }
    } catch (error) {
      console.warn('Failed to load technical_courses.json:', error);
    }
    
    // If we have combined courses, return them
    if (allCourses.length > 0) {
      console.log(`Total courses loaded: ${allCourses.length}`);
      return allCourses;
    }

    // Fallback: Try multiple candidate locations for Excel files
    const candidatePaths = [
      // Provided file path variants
      '/Explore%20Courses/courses/data/mit_ocw_courses.xlsx',
      '/ExploreCourses/courses/data/mit_ocw_courses.xlsx',
      '/courses/data/mit_ocw_courses.xlsx',
      '/data/mit_ocw_courses.xlsx',
      // Previous default
      '/data/Book2.xlsx',
    ];
    const res = await fetchFirstAvailable(candidatePaths);
    const arrayBuffer = await res.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(worksheet);

    const courses = aggregateRowsToCourses(rows);
    if (courses.length === 0) throw new Error('No courses found in Excel');
    return courses;
  } catch (error) {
    console.error('Error loading Excel course data:', error);
    // Final fallback: fetch sample data from public/data
    try {
      const response = await fetch('/data/course_sample_data.json');
      if (!response.ok) throw new Error('Failed to fetch course sample data');
      const fallbackRows = await response.json();
      // If fallback already in card-ready shape, return as-is; otherwise aggregate
      if (Array.isArray(fallbackRows) && fallbackRows[0]?.title) {
        return fallbackRows;
      }
      return aggregateRowsToCourses(fallbackRows);
    } catch (fetchError) {
      console.error('Error fetching fallback course sample data:', fetchError);
      return [];
    }
  }
};

export const loadCourseById = async (courseId) => {
  console.log('loadCourseById: Looking for course with ID:', courseId);
  const courses = await loadCourseData();
  console.log('loadCourseById: Total courses available:', courses.length);
  console.log('loadCourseById: Sample course IDs:', courses.slice(0, 5).map(c => c.id));
  
  // Try matching by numeric id, string id, or title slug
  const numericId = isNaN(Number(courseId)) ? null : Number(courseId);
  const byId = courses.find((c) => (numericId !== null && c.id === numericId) || String(c.id) === String(courseId));
  console.log('loadCourseById: Direct ID match result:', byId ? byId.id : 'Not found');
  
  if (byId) return byId;
  
  const normalized = String(courseId).toLowerCase().replace(/[-_]/g, ' ').trim();
  const byTitle = courses.find((c) => String(c.title).toLowerCase().includes(normalized));
  console.log('loadCourseById: Title-based match result:', byTitle ? byTitle.id : 'Not found');
  
  return byTitle;
};