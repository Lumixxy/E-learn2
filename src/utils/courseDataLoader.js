import * as XLSX from 'xlsx';

export const loadCourseData = () => {
  try {
    console.log('Attempting to load course data...');
    
    // Read the Excel file
    const workbook = XLSX.readFile('src/data/Book2.xlsx');
    console.log('Workbook loaded:', workbook.SheetNames);
    
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert to JSON
    const data = XLSX.utils.sheet_to_json(worksheet);
    console.log('Parsed data:', data);
    
    // Transform the data to match our course structure
    const transformedData = data.map((row, index) => ({
      id: index + 1,
      course: row.course || '',
      module: row.module || '',
      topic: row.topic || '',
      websiteLink: row.websiteLink || '',
      description: row.description || 'No description available',
      instructor: row.instructor || 'MIT OpenCourseWare',
      rating: row.rating || 4.5,
      totalRatings: row.totalRatings || 100,
      duration: row.duration || '8 weeks',
      lectures: row.lectures || 12,
      level: row.level || 'Intermediate',
      price: row.price || 'Free',
      imageUrl: row.imageUrl || 'https://via.placeholder.com/300x200?text=MIT+Course',
      tags: row.tags ? row.tags.split(',').map(tag => tag.trim()) : ['Computer Science', 'Programming']
    }));

    console.log('Transformed data:', transformedData);
    return transformedData;
  } catch (error) {
    console.error('Error loading course data:', error);
    // Return some sample data if Excel loading fails
    return [
      {
        id: 1,
        course: "Introduction to Computer Science",
        module: "CS101",
        topic: "Programming Basics",
        websiteLink: "https://example.com/cs101",
        description: "Learn the fundamentals of computer science and programming",
        instructor: "MIT OpenCourseWare",
        rating: 4.5,
        totalRatings: 100,
        duration: "8 weeks",
        lectures: 12,
        level: "Beginner",
        price: "Free",
        imageUrl: "https://via.placeholder.com/300x200?text=CS101",
        tags: ["Computer Science", "Programming"]
      },
      {
        id: 2,
        course: "Data Structures and Algorithms",
        module: "CS201",
        topic: "Advanced Programming",
        websiteLink: "https://example.com/cs201",
        description: "Master data structures and algorithms for efficient programming",
        instructor: "MIT OpenCourseWare",
        rating: 4.8,
        totalRatings: 150,
        duration: "10 weeks",
        lectures: 15,
        level: "Intermediate",
        price: "Free",
        imageUrl: "https://via.placeholder.com/300x200?text=CS201",
        tags: ["Data Structures", "Algorithms"]
      }
    ];
  }
}; 