// XP (Experience Points) System for E-Learn Platform
// Handles user progression, achievements, and gamification

import { createContext, useContext, useState, useEffect } from 'react';

// XP Configuration
const XP_CONFIG = {
  // Base XP values for different activities
  activities: {
    LESSON_COMPLETE: 25,
    QUIZ_PASSED: 50,
    ASSIGNMENT_SUBMITTED: 75,
    MODULE_COMPLETE: 100,
    COURSE_COMPLETE: 500,
    PERFECT_QUIZ: 100, // Bonus for 100% quiz score
    STREAK_BONUS: 25,   // Daily streak bonus
  },
  
  // Level thresholds (cumulative XP required)
  levels: [
    { level: 1, xp: 0, title: 'Beginner' },
    { level: 2, xp: 100, title: 'Student' },
    { level: 3, xp: 300, title: 'Learner' },
    { level: 4, xp: 600, title: 'Scholar' },
    { level: 5, xp: 1000, title: 'Expert' },
    { level: 6, xp: 1500, title: 'Master' },
    { level: 7, xp: 2500, title: 'Guru' },
    { level: 8, xp: 4000, title: 'Legend' },
    { level: 9, xp: 6000, title: 'Champion' },
    { level: 10, xp: 10000, title: 'Grandmaster' },
  ],
  
  // Achievement definitions
  achievements: {
    FIRST_COURSE: { id: 'first_course', name: 'First Steps', description: 'Complete your first course', xp: 100 },
    QUIZ_MASTER: { id: 'quiz_master', name: 'Quiz Master', description: 'Score 100% on 5 quizzes', xp: 250 },
    STREAK_WARRIOR: { id: 'streak_warrior', name: 'Streak Warrior', description: 'Maintain a 7-day learning streak', xp: 200 },
    COURSE_COLLECTOR: { id: 'course_collector', name: 'Course Collector', description: 'Complete 5 courses', xp: 500 },
    SKILL_SPECIALIST: { id: 'skill_specialist', name: 'Skill Specialist', description: 'Complete 3 courses in the same skill', xp: 300 },
    ASSIGNMENT_ACE: { id: 'assignment_ace', name: 'Assignment Ace', description: 'Submit 10 assignments', xp: 400 },
  }
};

// Create XP Context
const XPContext = createContext();

export const useXP = () => {
  const context = useContext(XPContext);
  if (!context) {
    throw new Error('useXP must be used within an XPProvider');
  }
  return context;
};

// XP Provider Component
export const XPProvider = ({ children }) => {
  const [userXP, setUserXP] = useState(() => {
    // Load from localStorage
    const saved = localStorage.getItem('elearn_user_xp');
    return saved ? JSON.parse(saved) : {
      totalXP: 0,
      level: 1,
      currentLevelXP: 0,
      nextLevelXP: 100,
      achievements: [],
      completedCourses: [],
      completedModules: [],
      completedLessons: [],
      quizScores: [],
      assignmentSubmissions: [],
      lastActivity: null,
      streak: 0,
      statistics: {
        coursesCompleted: 0,
        lessonsCompleted: 0,
        quizzesCompleted: 0,
        assignmentsSubmitted: 0,
        perfectQuizzes: 0,
        totalStudyTime: 0, // in minutes
      }
    };
  });

  // Save to localStorage whenever userXP changes
  useEffect(() => {
    localStorage.setItem('elearn_user_xp', JSON.stringify(userXP));
  }, [userXP]);

  // Calculate current level based on total XP
  const calculateLevel = (totalXP) => {
    const levels = XP_CONFIG.levels;
    let currentLevel = levels[0];
    
    for (let i = levels.length - 1; i >= 0; i--) {
      if (totalXP >= levels[i].xp) {
        currentLevel = levels[i];
        break;
      }
    }
    
    const nextLevel = levels.find(l => l.level === currentLevel.level + 1);
    const currentLevelXP = totalXP - currentLevel.xp;
    const nextLevelXP = nextLevel ? nextLevel.xp - currentLevel.xp : 0;
    
    return {
      level: currentLevel.level,
      title: currentLevel.title,
      currentLevelXP,
      nextLevelXP,
      progress: nextLevelXP > 0 ? (currentLevelXP / nextLevelXP) * 100 : 100
    };
  };

  // Award XP for an activity
  const awardXP = (activity, amount = null, metadata = {}) => {
    const xpAmount = amount || XP_CONFIG.activities[activity] || 0;
    const newTotalXP = userXP.totalXP + xpAmount;
    const levelInfo = calculateLevel(newTotalXP);
    
    // Check for level up
    const leveledUp = levelInfo.level > userXP.level;
    
    setUserXP(prev => ({
      ...prev,
      totalXP: newTotalXP,
      level: levelInfo.level,
      currentLevelXP: levelInfo.currentLevelXP,
      nextLevelXP: levelInfo.nextLevelXP,
      lastActivity: Date.now(),
      ...metadata
    }));
    
    // Check for achievements
    checkAchievements(activity, metadata);
    
    return {
      xpAwarded: xpAmount,
      leveledUp,
      newLevel: levelInfo.level,
      newTitle: levelInfo.title
    };
  };

  // Complete a lesson
  const completeLesson = (courseId, moduleId, lessonId, studyTime = 0) => {
    const lessonKey = `${courseId}-${moduleId}-${lessonId}`;
    
    if (userXP.completedLessons.includes(lessonKey)) {
      return { alreadyCompleted: true };
    }
    
    const result = awardXP('LESSON_COMPLETE', null, {
      completedLessons: [...userXP.completedLessons, lessonKey],
      statistics: {
        ...userXP.statistics,
        lessonsCompleted: userXP.statistics.lessonsCompleted + 1,
        totalStudyTime: userXP.statistics.totalStudyTime + studyTime
      }
    });
    
    return result;
  };

  // Complete a quiz
  const completeQuiz = (courseId, moduleId, quizId, score) => {
    const quizKey = `${courseId}-${moduleId}-${quizId}`;
    const isPerfect = score >= 100;
    
    // Calculate XP based on score
    let xpAmount = XP_CONFIG.activities.QUIZ_PASSED;
    if (isPerfect) {
      xpAmount += XP_CONFIG.activities.PERFECT_QUIZ;
    }
    
    const result = awardXP('QUIZ_PASSED', xpAmount, {
      quizScores: [...userXP.quizScores, { quizKey, score, date: Date.now() }],
      statistics: {
        ...userXP.statistics,
        quizzesCompleted: userXP.statistics.quizzesCompleted + 1,
        perfectQuizzes: isPerfect ? userXP.statistics.perfectQuizzes + 1 : userXP.statistics.perfectQuizzes
      }
    });
    
    return result;
  };

  // Submit an assignment
  const submitAssignment = (courseId, moduleId, assignmentId, score = null) => {
    const assignmentKey = `${courseId}-${moduleId}-${assignmentId}`;
    
    const result = awardXP('ASSIGNMENT_SUBMITTED', null, {
      assignmentSubmissions: [...userXP.assignmentSubmissions, { 
        assignmentKey, 
        score, 
        date: Date.now() 
      }],
      statistics: {
        ...userXP.statistics,
        assignmentsSubmitted: userXP.statistics.assignmentsSubmitted + 1
      }
    });
    
    return result;
  };

  // Complete a module
  const completeModule = (courseId, moduleId) => {
    const moduleKey = `${courseId}-${moduleId}`;
    
    if (userXP.completedModules.includes(moduleKey)) {
      return { alreadyCompleted: true };
    }
    
    const result = awardXP('MODULE_COMPLETE', null, {
      completedModules: [...userXP.completedModules, moduleKey]
    });
    
    return result;
  };

  // Complete a course
  const completeCourse = (courseId, skillTag = null) => {
    if (userXP.completedCourses.includes(courseId)) {
      return { alreadyCompleted: true };
    }
    
    const result = awardXP('COURSE_COMPLETE', null, {
      completedCourses: [...userXP.completedCourses, { courseId, skillTag, date: Date.now() }],
      statistics: {
        ...userXP.statistics,
        coursesCompleted: userXP.statistics.coursesCompleted + 1
      }
    });
    
    return result;
  };

  // Check for achievements
  const checkAchievements = (activity, metadata) => {
    const newAchievements = [];
    
    // First course achievement
    if (activity === 'COURSE_COMPLETE' && userXP.statistics.coursesCompleted === 0) {
      if (!userXP.achievements.includes('first_course')) {
        newAchievements.push('first_course');
      }
    }
    
    // Quiz master achievement
    if (userXP.statistics.perfectQuizzes >= 5 && !userXP.achievements.includes('quiz_master')) {
      newAchievements.push('quiz_master');
    }
    
    // Course collector achievement
    if (userXP.statistics.coursesCompleted >= 5 && !userXP.achievements.includes('course_collector')) {
      newAchievements.push('course_collector');
    }
    
    // Assignment ace achievement
    if (userXP.statistics.assignmentsSubmitted >= 10 && !userXP.achievements.includes('assignment_ace')) {
      newAchievements.push('assignment_ace');
    }
    
    // Update achievements
    if (newAchievements.length > 0) {
      setUserXP(prev => ({
        ...prev,
        achievements: [...prev.achievements, ...newAchievements]
      }));
      
      // Award XP for achievements
      const totalAchievementXP = newAchievements.reduce((total, achievementId) => {
        const achievement = Object.values(XP_CONFIG.achievements).find(a => a.id === achievementId);
        return total + (achievement?.xp || 0);
      }, 0);
      
      if (totalAchievementXP > 0) {
        awardXP('ACHIEVEMENT', totalAchievementXP);
      }
    }
    
    return newAchievements;
  };

  // Get user's current level info
  const getCurrentLevelInfo = () => {
    return calculateLevel(userXP.totalXP);
  };

  // Get user's achievements
  const getUserAchievements = () => {
    return userXP.achievements.map(achievementId => {
      return Object.values(XP_CONFIG.achievements).find(a => a.id === achievementId);
    }).filter(Boolean);
  };

  // Check if course is completed
  const isCourseCompleted = (courseId) => {
    return userXP.completedCourses.some(c => 
      typeof c === 'string' ? c === courseId : c.courseId === courseId
    );
  };

  // Check if module is completed
  const isModuleCompleted = (courseId, moduleId) => {
    return userXP.completedModules.includes(`${courseId}-${moduleId}`);
  };

  // Check if lesson is completed
  const isLessonCompleted = (courseId, moduleId, lessonId) => {
    return userXP.completedLessons.includes(`${courseId}-${moduleId}-${lessonId}`);
  };

  // Reset user progress (for testing/admin)
  const resetProgress = () => {
    const initialState = {
      totalXP: 0,
      level: 1,
      currentLevelXP: 0,
      nextLevelXP: 100,
      achievements: [],
      completedCourses: [],
      completedModules: [],
      completedLessons: [],
      quizScores: [],
      assignmentSubmissions: [],
      lastActivity: null,
      streak: 0,
      statistics: {
        coursesCompleted: 0,
        lessonsCompleted: 0,
        quizzesCompleted: 0,
        assignmentsSubmitted: 0,
        perfectQuizzes: 0,
        totalStudyTime: 0,
      }
    };
    setUserXP(initialState);
    localStorage.setItem('elearn_user_xp', JSON.stringify(initialState));
  };

  const value = {
    userXP,
    awardXP,
    completeLesson,
    completeQuiz,
    submitAssignment,
    completeModule,
    completeCourse,
    getCurrentLevelInfo,
    getUserAchievements,
    isCourseCompleted,
    isModuleCompleted,
    isLessonCompleted,
    resetProgress,
    XP_CONFIG
  };

  return (
    <XPContext.Provider value={value}>
      {children}
    </XPContext.Provider>
  );
};

export default XPProvider;