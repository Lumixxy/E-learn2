// Quiz Service for handling quiz operations
export const completeQuiz = (courseId, quizName, score) => {
  try {
    // Store quiz completion in localStorage
    const quizzes = JSON.parse(localStorage.getItem('completedQuizzes') || '{}');
    
    if (!quizzes[courseId]) {
      quizzes[courseId] = {};
    }
    
    quizzes[courseId][quizName] = {
      score,
      completedAt: new Date().toISOString(),
      passed: score >= 70
    };
    
    localStorage.setItem('completedQuizzes', JSON.stringify(quizzes));
    
    // Award XP based on score
    const xpEarned = score; // 1:1 ratio for quizzes
    
    return {
      success: true,
      xpEarned,
      passed: score >= 70
    };
  } catch (error) {
    console.error('Error completing quiz:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

export const getQuizScore = (courseId, quizName) => {
  try {
    const quizzes = JSON.parse(localStorage.getItem('completedQuizzes') || '{}');
    return quizzes[courseId]?.[quizName]?.score || 0;
  } catch (error) {
    console.error('Error getting quiz score:', error);
    return 0;
  }
};

export const isQuizCompleted = (courseId, quizName) => {
  try {
    const quizzes = JSON.parse(localStorage.getItem('completedQuizzes') || '{}');
    return quizzes[courseId]?.[quizName]?.passed || false;
  } catch (error) {
    console.error('Error checking quiz completion:', error);
    return false;
  }
};

export const getAllQuizScores = (courseId) => {
  try {
    const quizzes = JSON.parse(localStorage.getItem('completedQuizzes') || '{}');
    return quizzes[courseId] || {};
  } catch (error) {
    console.error('Error getting all quiz scores:', error);
    return {};
  }
};

export const getQuizAttempts = (courseId, quizName) => {
  try {
    const attempts = JSON.parse(localStorage.getItem('quizAttempts') || '{}');
    return attempts[courseId]?.[quizName] || 0;
  } catch (error) {
    console.error('Error getting quiz attempts:', error);
    return 0;
  }
};

export const recordQuizAttempt = (courseId, quizName) => {
  try {
    const attempts = JSON.parse(localStorage.getItem('quizAttempts') || '{}');
    
    if (!attempts[courseId]) {
      attempts[courseId] = {};
    }
    
    attempts[courseId][quizName] = (attempts[courseId][quizName] || 0) + 1;
    localStorage.setItem('quizAttempts', JSON.stringify(attempts));
    
    return attempts[courseId][quizName];
  } catch (error) {
    console.error('Error recording quiz attempt:', error);
    return 1;
  }
};
