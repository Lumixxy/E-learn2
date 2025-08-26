import React from 'react';
import { Button, useToast } from '@chakra-ui/react';
import { simulateServerRestart } from '../../api/serverVersion';
import { checkAndResetState } from '../../utils/stateResetManager';

/**
 * A button component that allows users to manually trigger a course state reset
 * This is primarily for testing and demonstration purposes
 */
const StateResetButton = () => {
  const toast = useToast();

  const handleResetState = () => {
    try {
      // Simulate a server restart by generating a new version
      const newVersion = simulateServerRestart();
      
      // Reset the state based on the new version
      const wasReset = checkAndResetState(newVersion);
      
      if (wasReset) {
        toast({
          title: "Course state reset",
          description: "Your course progress has been reset successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top"
        });
        
        // Reload the page to reflect the changes
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        toast({
          title: "Reset failed",
          description: "No state was reset. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top"
        });
      }
    } catch (error) {
      console.error('Error resetting state:', error);
      toast({
        title: "Reset error",
        description: "An error occurred while resetting the state.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top"
      });
    }
  };

  return (
    <Button
      colorScheme="red"
      size="md"
      onClick={handleResetState}
      mb={4}
    >
      Reset Course Progress
    </Button>
  );
};

export default StateResetButton;