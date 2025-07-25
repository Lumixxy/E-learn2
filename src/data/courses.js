import coursesData from './courses.json';
export const courses = coursesData;

export const categories = [
  'Technology',
  'Business',
  'Design',
  'Data Science',
  'Marketing',
  'Development',
  'Finance',
  'Health',
  'Computer Science',
  'Cloud Computing',
  'Cybersecurity'
];

export const levels = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'All Levels' // This might be used as a default or an option for selecting all
];

export const priceRanges = [
  { label: 'Free', value: 0 },
  { label: 'Under ₹1,000', value: 1000 },
  { label: 'Under ₹2,000', value: 2000 },
  { label: 'Under ₹5,000', value: 5000 }
];