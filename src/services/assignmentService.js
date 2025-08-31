// Assignment Service for handling assignment operations
export const completeAssignment = (courseId, assignmentName, score) => {
  try {
    // Store assignment completion in localStorage
    const assignments = JSON.parse(localStorage.getItem('completedAssignments') || '{}');
    
    if (!assignments[courseId]) {
      assignments[courseId] = {};
    }
    
    assignments[courseId][assignmentName] = {
      score,
      completedAt: new Date().toISOString(),
      passed: score >= 70
    };
    
    localStorage.setItem('completedAssignments', JSON.stringify(assignments));
    
    // Award XP based on score
    const xpEarned = Math.floor(score * 1.5); // 1.5x multiplier for assignments
    
    return {
      success: true,
      xpEarned,
      passed: score >= 70
    };
  } catch (error) {
    console.error('Error completing assignment:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

export const getAssignmentScore = (courseId, assignmentName) => {
  try {
    const assignments = JSON.parse(localStorage.getItem('completedAssignments') || '{}');
    return assignments[courseId]?.[assignmentName]?.score || 0;
  } catch (error) {
    console.error('Error getting assignment score:', error);
    return 0;
  }
};

export const isAssignmentCompleted = (courseId, assignmentName) => {
  try {
    const assignments = JSON.parse(localStorage.getItem('completedAssignments') || '{}');
    return assignments[courseId]?.[assignmentName]?.passed || false;
  } catch (error) {
    console.error('Error checking assignment completion:', error);
    return false;
  }
};

export const getAllAssignmentScores = (courseId) => {
  try {
    const assignments = JSON.parse(localStorage.getItem('completedAssignments') || '{}');
    return assignments[courseId] || {};
  } catch (error) {
    console.error('Error getting all assignment scores:', error);
    return {};
  }
};
