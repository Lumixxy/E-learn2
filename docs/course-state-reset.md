# Course State Reset Documentation

## Overview

The Course State Reset feature allows the application to reset user progress data when the server restarts. This ensures that users always have a clean state when the server is updated or redeployed, preventing potential data inconsistencies.

## How It Works

1. **Server Version Tracking**: 
   - The application maintains a server version identifier in localStorage
   - When the server restarts, a new version identifier is generated
   - The client compares its stored version with the current server version

2. **State Reset Process**:
   - If the versions don't match, the application resets specific localStorage items
   - A toast notification informs the user that their progress has been reset
   - The new server version is stored for future comparison

3. **Reset Data Categories**:
   - Completed nodes and lessons
   - Assignment scores
   - Final assignment data
   - Peer evaluations
   - XP and progress history

## User Controls

Users can manually trigger a state reset from the Settings page:

1. Navigate to Settings
2. Select the "Advanced" tab
3. Click the "Reset Course Progress" button

## Technical Implementation

### Key Files

- `src/utils/stateResetManager.js`: Core reset functionality
- `src/api/serverVersion.js`: Server version management
- `src/App.js`: Integration with application startup
- `src/components/settings/StateResetButton.jsx`: User-triggered reset

### Reset Logic

The reset logic is implemented in `stateResetManager.js` and follows these steps:

1. Compare stored server version with current version
2. If different, reset specified localStorage items
3. Update stored server version
4. Return reset status

### Configuration

The list of localStorage keys to reset is defined in `stateResetManager.js` and can be modified to include additional items as needed.

## Developer Notes

- To add new localStorage items to the reset list, update the `RESET_KEYS` array in `stateResetManager.js`
- For testing, use the `simulateServerRestart()` function in `serverVersion.js`
- The reset process is designed to be non-destructive to user account data, only affecting progress and course state