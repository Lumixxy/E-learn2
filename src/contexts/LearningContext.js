import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useTechnicalCourses, generateTechnicalCourses, mergeCourses } from '../utils/technicalCoursesLoader';

const LearningContext = createContext();

export const LearningProvider = ({ children }) => {
  const [completedCourses, setCompletedCourses] = useState([]);
  const [inProgressCourses, setInProgressCourses] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [learningPreferences, setLearningPreferences] = useState({
    preferredLearningStyle: 'visual', // visual, auditory, reading, kinesthetic
    preferredDifficulty: 'intermediate', // beginner, intermediate, advanced
    preferredPace: 'moderate', // slow, moderate, fast
    preferredTopics: [],
    preferredTimeOfDay: 'evening', // morning, afternoon, evening
    sessionDuration: 60, // in minutes
  });
  const [performanceMetrics, setPerformanceMetrics] = useState({
    averageCompletionTime: 0,
    quizSuccessRate: 0,
    challengeSuccessRate: 0,
    consistencyScore: 0,
    engagementScore: 0,
    skillGrowthRate: {}
  });
  const [learningStats, setLearningStats] = useState({
    totalCoursesCompleted: 0,
    totalLessonsCompleted: 0,
    averageScore: 0,
    learningStreak: 0,
    lastActive: null,
  });
  
  // Load technical courses
  const { technicalCourses, isLoading: loadingTechnicalCourses } = useTechnicalCourses();
  
  // Sample course data for recommendations
  const baseCourses = useMemo(() => [
    {
      id: 'html-basics',
      title: 'HTML Fundamentals',
      category: 'frontend',
      skills: ['html'],
      difficulty: 'beginner',
      duration: '2 weeks',
      description: 'Learn the basics of HTML to create web pages',
      image: 'https://via.placeholder.com/150',
      popularity: 95,
      prerequisites: []
    },
    {
      id: 'css-styling',
      title: 'CSS Styling Masterclass',
      category: 'frontend',
      skills: ['css'],
      difficulty: 'intermediate',
      duration: '3 weeks',
      description: 'Master CSS styling techniques for modern websites',
      image: 'https://via.placeholder.com/150',
      popularity: 90,
      prerequisites: ['html-basics']
    },
    {
      id: 'javascript-basics',
      title: 'JavaScript Essentials',
      category: 'frontend',
      skills: ['javascript'],
      difficulty: 'intermediate',
      duration: '4 weeks',
      description: 'Learn core JavaScript concepts and DOM manipulation',
      image: 'https://via.placeholder.com/150',
      popularity: 92,
      prerequisites: ['html-basics', 'css-styling']
    },
    {
      id: 'react-fundamentals',
      title: 'React.js Fundamentals',
      category: 'frontend',
      skills: ['react', 'javascript'],
      difficulty: 'advanced',
      duration: '5 weeks',
      description: 'Build modern UIs with React.js',
      image: 'https://via.placeholder.com/150',
      popularity: 88,
      prerequisites: ['javascript-basics']
    },
    {
      id: 'python-basics',
      title: 'Python Programming Basics',
      category: 'backend',
      skills: ['python'],
      difficulty: 'beginner',
      duration: '3 weeks',
      description: 'Learn Python programming from scratch',
      image: 'https://via.placeholder.com/150',
      popularity: 96,
      prerequisites: []
    },
    {
      id: 'java-fundamentals',
      title: 'Java Programming Fundamentals',
      category: 'backend',
      skills: ['java'],
      difficulty: 'intermediate',
      duration: '4 weeks',
      description: 'Master Java programming concepts',
      image: 'https://via.placeholder.com/150',
      popularity: 85,
      prerequisites: []
    },
    {
      id: 'ai-ml-intro',
      title: 'Introduction to AI and Machine Learning',
      category: 'ai',
      skills: ['python', 'ai'],
      difficulty: 'intermediate',
      duration: '6 weeks',
      description: 'Understand AI concepts and build simple ML models',
      image: 'https://via.placeholder.com/150',
      popularity: 94,
      prerequisites: ['python-basics']
    },
    {
      id: 'deep-learning',
      title: 'Deep Learning with Neural Networks',
      category: 'ai',
      skills: ['python', 'ai'],
      difficulty: 'advanced',
      duration: '8 weeks',
      description: 'Build and train neural networks for complex tasks',
      image: 'https://via.placeholder.com/150',
      popularity: 89,
      prerequisites: ['ai-ml-intro']
    }
  ], []);

  // Generate and merge courses
  const availableCourses = useMemo(() => {
    // If technical courses are loaded, merge them with base courses
    if (technicalCourses && technicalCourses.length > 0) {
      return mergeCourses(baseCourses, technicalCourses);
    }
    
    // If technical courses aren't loaded yet, generate courses from base courses
    const generatedCourses = generateTechnicalCourses(baseCourses, 500);
    return mergeCourses(baseCourses, generatedCourses);
  }, [baseCourses, technicalCourses]);

  // Load learning data from localStorage on component mount
  useEffect(() => {
    try {
      const savedCompletedCourses = localStorage.getItem('completedCourses');
      const savedInProgressCourses = localStorage.getItem('inProgressCourses');
      const savedLearningStats = localStorage.getItem('learningStats');

      if (savedCompletedCourses) setCompletedCourses(JSON.parse(savedCompletedCourses));
      if (savedInProgressCourses) setInProgressCourses(JSON.parse(savedInProgressCourses));
      if (savedLearningStats) setLearningStats(JSON.parse(savedLearningStats));
    } catch (error) {
      console.error('Error loading learning data from localStorage:', error);
    }
  }, []);

  // Save learning data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('completedCourses', JSON.stringify(completedCourses));
      localStorage.setItem('inProgressCourses', JSON.stringify(inProgressCourses));
      localStorage.setItem('learningStats', JSON.stringify(learningStats));
    } catch (error) {
      console.error('Error saving learning data to localStorage:', error);
    }
  }, [completedCourses, inProgressCourses, learningStats]);

  // Add a course to in-progress courses
  const startCourse = (course) => {
    if (!inProgressCourses || !inProgressCourses.some(c => c.id === course.id)) {
      setInProgressCourses([...(inProgressCourses || []), course]);
    }
  };

  // Mark a course as completed
  const completeCourse = (courseId) => {
    if (!inProgressCourses) return;
    
    const course = inProgressCourses.find(c => c.id === courseId);
    if (course) {
      // Remove from in-progress
      setInProgressCourses(inProgressCourses.filter(c => c.id !== courseId));
      
      // Add to completed
      if (!completedCourses || !completedCourses.some(c => c.id === courseId)) {
        setCompletedCourses([...(completedCourses || []), { ...course, completedDate: new Date() }]);
      }
      
      // Update stats
      setLearningStats(prev => ({
        ...prev,
        totalCoursesCompleted: prev.totalCoursesCompleted + 1,
      }));
    }
  };

  // Complete a lesson within a course
  const completeLesson = (courseId, lessonId, score = null) => {
    // Update in-progress course with completed lesson
    const updatedCourses = inProgressCourses.map(course => {
      if (course.id === courseId) {
        const updatedModules = course.modules.map(module => {
          const updatedLessons = module.lessons.map(lesson => {
            if (lesson.id === lessonId) {
              return { ...lesson, completed: true, score };
            }
            return lesson;
          });
          return { ...module, lessons: updatedLessons };
        });
        return { ...course, modules: updatedModules };
      }
      return course;
    });
    
    setInProgressCourses(updatedCourses);
    
    // Update stats
    setLearningStats(prev => {
      const newStats = {
        ...prev,
        totalLessonsCompleted: prev.totalLessonsCompleted + 1,
        lastActive: new Date(),
      };
      
      // Update average score if a score was provided
      if (score !== null) {
        const totalScores = prev.averageScore * prev.totalLessonsCompleted;
        newStats.averageScore = (totalScores + score) / newStats.totalLessonsCompleted;
      }
      
      // Update learning streak
      const today = new Date().setHours(0, 0, 0, 0);
      const lastActiveDay = prev.lastActive ? new Date(prev.lastActive).setHours(0, 0, 0, 0) : null;
      
      if (lastActiveDay) {
        const oneDayMs = 24 * 60 * 60 * 1000;
        const dayDiff = (today - lastActiveDay) / oneDayMs;
        
        if (dayDiff === 1) {
          // Consecutive day
          newStats.learningStreak = prev.learningStreak + 1;
        } else if (dayDiff > 1) {
          // Streak broken
          newStats.learningStreak = 1;
        }
        // If same day, streak remains unchanged
      } else {
        // First activity
        newStats.learningStreak = 1;
      }
      
      return newStats;
    });
  };

  // Get progress for a specific course
  const getCourseProgress = (courseId) => {
    const course = inProgressCourses.find(c => c.id === courseId);
    if (!course) return 0;
    
    let totalLessons = 0;
    let completedLessons = 0;
    
    course.modules.forEach(module => {
      totalLessons += module.lessons.length;
      completedLessons += module.lessons.filter(lesson => lesson.completed).length;
    });
    
    return totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  };

  // Reset all learning data
  const resetLearningData = () => {
    setCompletedCourses([]);
    setInProgressCourses([]);
    setLearningStats({
      totalCoursesCompleted: 0,
      totalLessonsCompleted: 0,
      averageScore: 0,
      learningStreak: 0,
      lastActive: null,
    });
    
    // Clear localStorage
    localStorage.removeItem('completedCourses');
    localStorage.removeItem('inProgressCourses');
    localStorage.removeItem('learningStats');
  };

  // Generate personalized course recommendations based on selected skills and user data
  const generateRecommendations = useCallback((skills = []) => {
    if (!skills || skills.length === 0) {
      skills = selectedSkills || [];
    }
    
    if (skills.length === 0) {
      // If no skills selected, recommend popular beginner courses
      const beginnerRecommendations = availableCourses
        .filter(course => course.difficulty === 'beginner')
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 3);
      setRecommendedCourses(beginnerRecommendations);
      return beginnerRecommendations;
    }
    
    // Calculate a score for each course based on multiple factors
    const scoredCourses = availableCourses.map(course => {
      let score = 0;
      
      // Match with selected skills
      const skillMatch = course.skills && course.skills.some(skill => skills.includes(skill));
      if (skillMatch) score += 30;
      
      // Match with user's preferred difficulty
      if (course.difficulty === learningPreferences.preferredDifficulty) {
        score += 20;
      } else if (
        (learningPreferences.preferredDifficulty === 'intermediate' && course.difficulty === 'beginner') ||
        (learningPreferences.preferredDifficulty === 'advanced' && course.difficulty === 'intermediate')
      ) {
        score += 10; // Adjacent difficulty levels get partial points
      }
      
      // Check if prerequisites are completed
      const hasCompletedPrerequisites = course.prerequisites && course.prerequisites.every(prereq => 
        completedCourses && completedCourses.some(completed => completed.id === prereq)
      );
      if (hasCompletedPrerequisites) score += 25;
      
      // Popularity factor
      score += course.popularity / 10;
      
      // Avoid recommending courses already completed or in progress
      if (completedCourses && completedCourses.some(c => c.id === course.id)) {
        score = -100; // Strongly discourage already completed courses
      }
      if (inProgressCourses && inProgressCourses.some(c => c.id === course.id)) {
        score = -50; // Discourage in-progress courses
      }
      
      return { ...course, score };
    });
    
    // Sort by score and take top recommendations
    const topRecommendations = scoredCourses
      .sort((a, b) => b.score - a.score)
      .filter(course => course.score > 0)
      .slice(0, 5);
    
    setRecommendedCourses(topRecommendations);
    return topRecommendations;
  }, [selectedSkills, learningPreferences, completedCourses, inProgressCourses, availableCourses]);
  
  // Update selected skills and generate new recommendations
  const updateSelectedSkills = (skills) => {
    setSelectedSkills(skills);
    generateRecommendations(skills);
  };
  
  // Update learning preferences
  const updateLearningPreferences = (preferences) => {
    setLearningPreferences(prev => ({
      ...prev,
      ...preferences
    }));
    // Regenerate recommendations when preferences change
    generateRecommendations();
  };
  
  // Update performance metrics based on user activity
  const updatePerformanceMetrics = (metrics) => {
    setPerformanceMetrics(prev => ({
      ...prev,
      ...metrics
    }));
  };
  
  // Dynamically adjust course difficulty based on performance
  const getRecommendedDifficulty = () => {
    const { quizSuccessRate, challengeSuccessRate } = performanceMetrics;
    const averageSuccessRate = (quizSuccessRate + challengeSuccessRate) / 2;
    
    if (averageSuccessRate > 85) return 'advanced';
    if (averageSuccessRate > 65) return 'intermediate';
    return 'beginner';
  };

  // Load personalization data from localStorage on component mount
  useEffect(() => {
    try {
      const savedSelectedSkills = localStorage.getItem('selectedSkills');
      const savedLearningPreferences = localStorage.getItem('learningPreferences');
      const savedPerformanceMetrics = localStorage.getItem('performanceMetrics');
      
      if (savedSelectedSkills) setSelectedSkills(JSON.parse(savedSelectedSkills));
      if (savedLearningPreferences) setLearningPreferences(prev => ({
        ...prev,
        ...JSON.parse(savedLearningPreferences)
      }));
      if (savedPerformanceMetrics) setPerformanceMetrics(prev => ({
        ...prev,
        ...JSON.parse(savedPerformanceMetrics)
      }));
      
      // Generate recommendations will happen in the separate useEffect that depends on selectedSkills
    } catch (error) {
      console.error('Error loading personalization data from localStorage:', error);
    }
  }, []);

  
  // Generate initial recommendations after data is loaded
  useEffect(() => {
    // Only run once after initial data load
    if ((selectedSkills && selectedSkills.length > 0) || (completedCourses && completedCourses.length > 0)) {
      // Use a timeout to ensure this runs after the initial state is set
      setTimeout(() => {
        generateRecommendations(selectedSkills);
      }, 0);
    }
  }, [selectedSkills, completedCourses]);
  
  // Save personalization data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('selectedSkills', JSON.stringify(selectedSkills));
      localStorage.setItem('learningPreferences', JSON.stringify(learningPreferences));
      localStorage.setItem('performanceMetrics', JSON.stringify(performanceMetrics));
    } catch (error) {
      console.error('Error saving personalization data to localStorage:', error);
    }
  }, [selectedSkills, learningPreferences, performanceMetrics]);

  return (
    <LearningContext.Provider
      value={{
        // Original learning data
        completedCourses,
        inProgressCourses,
        learningStats,
        startCourse,
        completeCourse,
        completeLesson,
        getCourseProgress,
        resetLearningData,
        
        // AI personalization features
        selectedSkills,
        updateSelectedSkills,
        recommendedCourses,
        generateRecommendations,
        learningPreferences,
        updateLearningPreferences,
        performanceMetrics,
        updatePerformanceMetrics,
        getRecommendedDifficulty,
        availableCourses
      }}
    >
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => useContext(LearningContext);