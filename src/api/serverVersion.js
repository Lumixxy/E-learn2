/**
 * Server version API module
 * 
 * This module provides functions to check the server version and determine if a reset is needed.
 * In a production environment, this would connect to a real backend endpoint.
 */

// In a real implementation, this would be fetched from the backend
// For now, we'll simulate it with a timestamp that changes on each page load
const SERVER_VERSION_KEY = 'server_version_timestamp';

/**
 * Get the current server version
 * @returns {Promise<string>} - The current server version
 */
export const getServerVersion = async () => {
  try {
    // In a real implementation, this would be a fetch to the backend
    // For demonstration, we'll generate a new version on each server start
    // This simulates the server restarting and having a new version
    
    // Generate a timestamp-based version if one doesn't exist yet
    // This simulates the server starting up for the first time
    const serverVersion = localStorage.getItem(SERVER_VERSION_KEY) || Date.now().toString();
    
    // Store it for future reference
    localStorage.setItem(SERVER_VERSION_KEY, serverVersion);
    
    return serverVersion;
  } catch (error) {
    console.error('Error getting server version:', error);
    // Return a fallback version based on current time
    return Date.now().toString();
  }
};

/**
 * Simulate a server restart by generating a new server version
 * This is for testing purposes only
 */
export const simulateServerRestart = () => {
  const newVersion = Date.now().toString();
  localStorage.setItem(SERVER_VERSION_KEY, newVersion);
  return newVersion;
};