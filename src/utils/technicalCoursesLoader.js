import { useState, useEffect } from 'react';

/**
 * Custom hook to load technical courses from JSON file
 * @returns {Object} - Object containing technical courses and loading state
 */
export const useTechnicalCourses = () => {
  const [technicalCourses, setTechnicalCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTechnicalCourses = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/data/technical_courses.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch technical courses: ${response.status}`);
        }
        const data = await response.json();
        setTechnicalCourses(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading technical courses:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchTechnicalCourses();
  }, []);

  return { technicalCourses, isLoading, error };
};

/**
 * Function to generate a large set of technical courses by duplicating and modifying existing ones
 * @param {Array} baseCourses - Base courses to duplicate and modify
 * @param {Number} targetCount - Target number of courses to generate
 * @returns {Array} - Array of generated courses
 */
export const generateTechnicalCourses = (baseCourses, targetCount = 500) => {
  if (!baseCourses || baseCourses.length === 0) {
    return [];
  }

  const technologies = [
    'JavaScript', 'Python', 'Java', 'C#', 'C++', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin',
    'PHP', 'TypeScript', 'React', 'Angular', 'Vue.js', 'Node.js', 'Django', 'Flask',
    'Spring Boot', 'ASP.NET', 'TensorFlow', 'PyTorch', 'Kubernetes', 'Docker', 'AWS',
    'Azure', 'Google Cloud', 'Blockchain', 'Ethereum', 'Solidity', 'Unity', 'Unreal Engine',
    'Flutter', 'React Native', 'SwiftUI', 'Xamarin', 'GraphQL', 'REST API', 'MongoDB',
    'PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch', 'Hadoop', 'Spark', 'Tableau',
    'Power BI', 'R', 'MATLAB', 'SAS', 'SPSS', 'Scala', 'Haskell', 'Perl', 'Bash',
    'PowerShell', 'Git', 'Jenkins', 'Travis CI', 'CircleCI', 'Ansible', 'Terraform',
    'Puppet', 'Chef', 'Prometheus', 'Grafana', 'ELK Stack', 'WebAssembly', 'Deno'
  ];

  const categories = [
    'Web Development', 'Mobile Development', 'Game Development', 'Data Science',
    'Machine Learning', 'DevOps', 'Cloud Computing', 'Blockchain', 'Cybersecurity',
    'IoT', 'AR/VR', 'Embedded Systems', 'Database Administration', 'Network Engineering',
    'UI/UX Design', 'Frontend Development', 'Backend Development', 'Full Stack Development'
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const authors = [
    'John Smith', 'Maria Garcia', 'David Johnson', 'Sarah Chen', 'Michael Brown',
    'Jennifer Lee', 'Robert Kim', 'Lisa Patel', 'James Wilson', 'Emily Davis',
    'Daniel Martinez', 'Sophia Anderson', 'Matthew Taylor', 'Olivia Thomas', 'Andrew Jackson'
  ];

  const generatedCourses = [];
  let courseCount = 0;

  while (courseCount < targetCount) {
    for (let i = 0; i < baseCourses.length && courseCount < targetCount; i++) {
      const baseCourse = baseCourses[i];
      const technology = technologies[Math.floor(Math.random() * technologies.length)];
      const category = categories[Math.floor(Math.random() * categories.length)];
      const level = levels[Math.floor(Math.random() * levels.length)];
      const author = authors[Math.floor(Math.random() * authors.length)];
      const rating = (3.5 + Math.random() * 1.5).toFixed(1);
      const price = Math.floor(Math.random() * 3000) + 999;
      const originalPrice = price * 2;
      const isFree = Math.random() < 0.1; // 10% chance of being free

      // Map technology to skills
      const getSkillsFromTechnology = (tech) => {
        const techToSkills = {
          'JavaScript': ['javascript', 'frontend'],
          'Python': ['python', 'backend'],
          'Java': ['java', 'backend'],
          'C#': ['csharp', 'backend'],
          'C++': ['cpp', 'backend'],
          'Ruby': ['ruby', 'backend'],
          'Go': ['go', 'backend'],
          'Rust': ['rust', 'backend'],
          'Swift': ['swift', 'mobile'],
          'Kotlin': ['kotlin', 'mobile'],
          'PHP': ['php', 'backend'],
          'TypeScript': ['typescript', 'frontend'],
          'React': ['react', 'frontend'],
          'Angular': ['angular', 'frontend'],
          'Vue.js': ['vue', 'frontend'],
          'Node.js': ['nodejs', 'backend'],
          'Django': ['django', 'python', 'backend'],
          'Flask': ['flask', 'python', 'backend'],
          'Spring Boot': ['spring', 'java', 'backend'],
          'ASP.NET': ['aspnet', 'csharp', 'backend'],
          'TensorFlow': ['tensorflow', 'python', 'ai', 'machine-learning'],
          'PyTorch': ['pytorch', 'python', 'ai', 'machine-learning'],
          'Kubernetes': ['kubernetes', 'devops'],
          'Docker': ['docker', 'devops'],
          'AWS': ['aws', 'cloud'],
          'Azure': ['azure', 'cloud'],
          'Google Cloud': ['gcp', 'cloud'],
          'Blockchain': ['blockchain'],
          'Ethereum': ['ethereum', 'blockchain'],
          'Solidity': ['solidity', 'blockchain'],
          'Unity': ['unity', 'game-development'],
          'Unreal Engine': ['unreal', 'game-development'],
          'Flutter': ['flutter', 'mobile'],
          'React Native': ['react-native', 'mobile'],
          'SwiftUI': ['swiftui', 'mobile'],
          'Xamarin': ['xamarin', 'mobile'],
          'GraphQL': ['graphql', 'api'],
          'REST API': ['rest', 'api'],
          'MongoDB': ['mongodb', 'database'],
          'PostgreSQL': ['postgresql', 'database'],
          'MySQL': ['mysql', 'database'],
          'Redis': ['redis', 'database'],
          'Elasticsearch': ['elasticsearch', 'database'],
          'Hadoop': ['hadoop', 'big-data'],
          'Spark': ['spark', 'big-data'],
          'Tableau': ['tableau', 'data-visualization'],
          'Power BI': ['powerbi', 'data-visualization'],
          'R': ['r', 'data-science'],
          'MATLAB': ['matlab', 'data-science'],
          'SAS': ['sas', 'data-science'],
          'SPSS': ['spss', 'data-science'],
          'Scala': ['scala', 'big-data'],
          'Haskell': ['haskell', 'functional-programming'],
          'Perl': ['perl'],
          'Bash': ['bash', 'shell'],
          'PowerShell': ['powershell', 'shell'],
          'Git': ['git', 'version-control'],
          'Jenkins': ['jenkins', 'ci-cd'],
          'Travis CI': ['travis', 'ci-cd'],
          'CircleCI': ['circleci', 'ci-cd'],
          'Ansible': ['ansible', 'devops'],
          'Terraform': ['terraform', 'devops'],
          'Puppet': ['puppet', 'devops'],
          'Chef': ['chef', 'devops'],
          'Prometheus': ['prometheus', 'monitoring'],
          'Grafana': ['grafana', 'monitoring'],
          'ELK Stack': ['elk', 'logging'],
          'WebAssembly': ['wasm', 'frontend'],
          'Deno': ['deno', 'javascript']
        };
        
        return techToSkills[tech] || [tech.toLowerCase()];
      };
      
      // Map category to additional skills
      const getSkillsFromCategory = (cat) => {
        const categoryToSkills = {
          'Web Development': ['web', 'html', 'css', 'javascript'],
          'Mobile Development': ['mobile'],
          'Game Development': ['game-development'],
          'Data Science': ['data-science'],
          'Machine Learning': ['machine-learning', 'ai'],
          'DevOps': ['devops'],
          'Cloud Computing': ['cloud'],
          'Blockchain': ['blockchain'],
          'Cybersecurity': ['security'],
          'IoT': ['iot'],
          'AR/VR': ['ar-vr'],
          'Embedded Systems': ['embedded'],
          'Database Administration': ['database'],
          'Network Engineering': ['networking'],
          'UI/UX Design': ['ui-ux', 'design'],
          'Frontend Development': ['frontend', 'html', 'css', 'javascript'],
          'Backend Development': ['backend'],
          'Full Stack Development': ['fullstack', 'frontend', 'backend']
        };
        
        return categoryToSkills[cat] || [cat.toLowerCase().replace(/\s+/g, '-')];
      };
      
      // Combine skills from technology and category
      const techSkills = getSkillsFromTechnology(technology);
      const categorySkills = getSkillsFromCategory(category);
      const combinedSkills = [...new Set([...techSkills, ...categorySkills])];
      
      const newCourse = {
        id: `tech_${(courseCount + 1).toString().padStart(3, '0')}`,
        title: `${technology} ${category} ${level === 'Beginner' ? 'Fundamentals' : level === 'Intermediate' ? 'Masterclass' : 'Advanced Techniques'}`,
        author,
        category,
        level,
        price: isFree ? 0 : price,
        originalPrice: isFree ? price : originalPrice,
        discountPercentage: isFree ? 100 : 50,
        rating: parseFloat(rating),
        isFree,
        image: baseCourse.image || `https://source.unsplash.com/random/300x200?${technology.toLowerCase()},coding`,
        tags: [technology, category, level],
        skills: combinedSkills, // Add skills array to each course
        description: `Master ${technology} for ${category} with hands-on projects and real-world applications.`,
        type: 'coding',
        language: technology,
        modules: [],
        certificate: { unlocked: false, threshold: 70 + Math.floor(Math.random() * 15) }
      };

      generatedCourses.push(newCourse);
      courseCount++;
    }
  }

  return generatedCourses;
};

/**
 * Function to merge existing courses with technical courses
 * @param {Array} existingCourses - Existing courses array
 * @param {Array} technicalCourses - Technical courses array
 * @returns {Array} - Merged courses array
 */
export const mergeCourses = (existingCourses, technicalCourses) => {
  if (!existingCourses) return technicalCourses || [];
  if (!technicalCourses) return existingCourses || [];
  
  return [...existingCourses, ...technicalCourses];
};