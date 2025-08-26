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
  HStack,
  Icon,
  Collapse,
  useDisclosure,
} from '@chakra-ui/react';
import { ExternalLinkIcon, InfoIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { FaEthereum, FaNetworkWired } from 'react-icons/fa';

const MetaMaskError = ({ error, resetError }) => {
  const { isOpen, onToggle } = useDisclosure();
  
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
        icon: WarningTwoIcon,
        status: 'warning',
        helpText: 'When connecting to MetaMask, you need to approve the connection request in the MetaMask popup.',
      };
    } else if (errorMessage.includes('Already processing eth_requestAccounts')) {
      return {
        title: 'Connection In Progress',
        description: 'A connection request is already in progress. Please check your MetaMask extension.',
        action: 'Check MetaMask',
        icon: InfoIcon,
        status: 'info',
        helpText: 'Look for the MetaMask popup in your browser. It might be hidden behind other windows or tabs.',
      };
    } else if (errorMessage.includes('MetaMask is not installed')) {
      return {
        title: 'MetaMask Not Installed',
        description: 'You need to install MetaMask to use this feature.',
        action: 'Install MetaMask',
        link: 'https://metamask.io/download/',
        icon: FaEthereum,
        status: 'error',
        helpText: 'MetaMask is a browser extension that allows you to interact with blockchain applications.',
      };
    } else if (errorMessage.includes('Unsupported chain') || errorMessage.includes('network') || errorMessage.includes('chain')) {
      return {
        title: 'Network Issue',
        description: 'Please switch to a supported network in your MetaMask wallet.',
        action: 'Switch Network',
        icon: FaNetworkWired,
        status: 'warning',
        helpText: 'This application supports Ethereum Mainnet, Goerli, Sepolia, Polygon, and Mumbai networks.',
      };
    } else if (errorMessage.includes('timed out')) {
      return {
        title: 'Connection Timeout',
        description: 'The connection request timed out. Please check your internet connection and try again.',
        action: 'Try Again',
        icon: WarningTwoIcon,
        status: 'warning',
        helpText: 'This could be due to network congestion or issues with the MetaMask extension.',
      };
    } else if (errorMessage.includes('Network Detection Failed')) {
      return {
        title: 'Network Detection Failed',
        description: 'We couldn\'t detect which blockchain network you\'re connected to.',
        action: 'Try Again',
        icon: FaNetworkWired,
        status: 'warning',
        helpText: 'Try switching networks in MetaMask and connecting again.',
      };
    } else {
      // Generic error
      return {
        title: 'Connection Error',
        description: `There was an error connecting to MetaMask: ${errorMessage}`,
        action: 'Try Again',
        icon: WarningTwoIcon,
        status: 'error',
        helpText: 'If this error persists, try refreshing the page or restarting your browser.',
      };
    }
  };

  const errorDetails = getErrorMessage(error);
  
  if (!errorDetails) return null;

  return (
    <Box my={4}>
      <Alert 
        status={errorDetails.status || "error"} 
        variant="left-accent" 
        borderRadius="md"
        boxShadow="md"
      >
        <AlertIcon as={errorDetails.icon} />
        <VStack align="start" spacing={2} flex="1">
          <AlertTitle fontWeight="bold">{errorDetails.title}</AlertTitle>
          <AlertDescription>
            <Text>{errorDetails.description}</Text>
            <HStack spacing={4} mt={3}>
              {errorDetails.link ? (
                <Link 
                  href={errorDetails.link} 
                  isExternal 
                  color="blue.500" 
                  display="inline-flex"
                  alignItems="center"
                >
                  <Button 
                    size="sm" 
                    colorScheme="blue" 
                    rightIcon={<ExternalLinkIcon />}
                  >
                    {errorDetails.action}
                  </Button>
                </Link>
              ) : (
                <Button 
                  size="sm" 
                  colorScheme={errorDetails.status === "warning" ? "orange" : "red"} 
                  onClick={resetError}
                >
                  {errorDetails.action}
                </Button>
              )}
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={onToggle}
                rightIcon={<InfoIcon />}
              >
                Help
              </Button>
            </HStack>
            
            <Collapse in={isOpen} animateOpacity>
              <Box 
                p={3} 
                mt={3} 
                bg="gray.50" 
                _dark={{ bg: "gray.700" }} 
                borderRadius="md"
                fontSize="sm"
              >
                {errorDetails.helpText}
              </Box>
            </Collapse>
          </AlertDescription>
        </VStack>
      </Alert>
    </Box>
  );
};

export default MetaMaskError;