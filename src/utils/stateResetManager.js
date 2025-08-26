import { useEffect } from 'react';

// List of localStorage keys that should be reset on server restart
const RESET_KEYS = [
  'completedNodes',
  'completedLessons',
  'webWarriorCompletedQuests',
  'userTotalXP',
  'userXPHistory',
  // Assignment scores pattern
  /^assignmentScores_.*/,
  // Final assignment pattern
  /^finalAssignment_.*/,
  // Evaluations pattern
  /^myEvaluations_.*/
];

// Server version key in localStorage
const SERVER_VERSION_KEY = 'server_version';

/**
 * Utility to check if server has restarted and reset state if needed
 * @param {string} currentVersion - Current server version or timestamp
 */
export const checkAndResetState = (currentVersion) => {
  try {
    const storedVersion = localStorage.getItem(SERVER_VERSION_KEY);
    
    // If version doesn't match or doesn't exist, server has restarted
    if (storedVersion !== currentVersion) {
      console.log('Server version changed, resetting course state...');
      
      // Reset all specified localStorage items
      for (const key of RESET_KEYS) {
        if (key instanceof RegExp) {
          // Handle regex patterns
          Object.keys(localStorage).forEach(storageKey => {
            if (key.test(storageKey)) {
              localStorage.removeItem(storageKey);
            }
          });
        } else {
          // Handle direct key matches
          localStorage.removeItem(key);
        }
      }
      
      // Update stored version
      localStorage.setItem(SERVER_VERSION_KEY, currentVersion);
      
      return true; // State was reset
    }
    
    return false; // No reset needed
  } catch (error) {
    console.error('Error checking/resetting state:', error);
    return false;
  }
};

/**
 * React hook to check and reset state on component mount
 * @param {string} currentVersion - Current server version or timestamp
 * @returns {boolean} - Whether state was reset
 */
export const useStateReset = (currentVersion) => {
  useEffect(() => {
    checkAndResetState(currentVersion);
  }, [currentVersion]);
};

/**
 * Manually trigger a state reset regardless of version
 */
export const forceStateReset = () => {
  try {
    for (const key of RESET_KEYS) {
      if (key instanceof RegExp) {
        // Handle regex patterns
        Object.keys(localStorage).forEach(storageKey => {
          if (key.test(storageKey)) {
            localStorage.removeItem(storageKey);
          }
        });
      } else {
        // Handle direct key matches
        localStorage.removeItem(key);
      }
    }
    return true;
  } catch (error) {
    console.error('Error during forced state reset:', error);
    return false;
  }
};