import React from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Button,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';

const MetaMaskError = ({ error, resetError }) => {
  // Common MetaMask errors and their user-friendly messages
  const getErrorMessage = (error) => {
    if (!error) return null;
    
    const errorMessage = error.message || error;
    
    // Check for common MetaMask errors
    if (errorMessage.includes('User rejected the request')) {
      return {
        title: 'Connection Rejected',
        description: 'You rejected the connection request. Please try again when you\'re ready to connect.',
        action: 'Try Again',
      };
    } else if (errorMessage.includes('Already processing eth_requestAccounts')) {
      return {
        title: 'Connection In Progress',
        description: 'A connection request is already in progress. Please check your MetaMask extension.',
        action: 'Check MetaMask',
      };
    } else if (errorMessage.includes('MetaMask is not installed')) {
      return {
        title: 'MetaMask Not Installed',
        description: 'You need to install MetaMask to use this feature.',
        action: 'Install MetaMask',
        link: 'https://metamask.io/download/',
      };
    } else if (errorMessage.includes('Unsupported chain')) {
      return {
        title: 'Unsupported Network',
        description: 'Please switch to a supported network in your MetaMask wallet.',
        action: 'Switch Network',
      };
    } else {
      // Generic error
      return {
        title: 'Connection Error',
        description: `There was an error connecting to MetaMask: ${errorMessage}`,
        action: 'Try Again',
      };
    }
  };

  const errorDetails = getErrorMessage(error);
  
  if (!errorDetails) return null;

  return (
    <Box my={4}>
      <Alert status="error" variant="left-accent" borderRadius="md">
        <AlertIcon />
        <VStack align="start" spacing={2} flex="1">
          <AlertTitle>{errorDetails.title}</AlertTitle>
          <AlertDescription>
            <Text>{errorDetails.description}</Text>
            {errorDetails.link ? (
              <Link href={errorDetails.link} isExternal color="blue.500" mt={2} display="inline-block">
                {errorDetails.action}
              </Link>
            ) : (
              <Button size="sm" colorScheme="red" variant="outline" mt={2} onClick={resetError}>
                {errorDetails.action}
              </Button>
            )}
          </AlertDescription>
        </VStack>
      </Alert>
    </Box>
  );
};

export default MetaMaskError;