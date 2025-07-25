import * as XLSX from 'xlsx';
import courseSampleData from '../data/course_sample_data.json';

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
    return courseSampleData;
  }
}; 