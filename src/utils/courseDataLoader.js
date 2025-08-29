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
    // Try multiple candidate locations for the provided Excel
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
    // Fallback: fetch sample data from public/data
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
  const courses = await loadCourseData();
  // Try matching by numeric id, string id, or title slug
  const numericId = isNaN(Number(courseId)) ? null : Number(courseId);
  const byId = courses.find((c) => (numericId !== null && c.id === numericId) || String(c.id) === String(courseId));
  if (byId) return byId;
  const normalized = String(courseId).toLowerCase().replace(/[-_]/g, ' ').trim();
  return courses.find((c) => String(c.title).toLowerCase().includes(normalized));
};