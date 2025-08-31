import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Text, 
  Link, 
  VStack, 
  HStack,
  Spinner, 
  Alert, 
  AlertIcon, 
  Badge,
  Button,
  Icon,
  Divider,
  Card,
  CardBody,
  useColorModeValue,
  Tooltip,
  Flex
} from '@chakra-ui/react';
import { FiExternalLink, FiVideo, FiBook, FiFileText, FiCode, FiAward } from 'react-icons/fi';
import WebWarriorAPI from '../../api/webwarrior';

const ResourcesList = ({ nodeId }) => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Color mode values
  const bgColor = useColorModeValue('white', 'gray.800');
  const cardBg = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  // Resource type icons and colors
  const getResourceIcon = (type) => {
    const iconMap = {
      'video': { icon: FiVideo, color: 'red.500' },
      'docs': { icon: FiBook, color: 'blue.500' },
      'course': { icon: FiFileText, color: 'green.500' },
      'assignment': { icon: FiCode, color: 'purple.500' },
      'tutorial': { icon: FiAward, color: 'orange.500' },
      'documentation': { icon: FiBook, color: 'blue.500' }
    };
    return iconMap[type?.toLowerCase()] || { icon: FiFileText, color: 'gray.500' };
  };

  useEffect(() => {
    // Instant loading - no async operations
    if (nodeId) {
      const instantResources = [
        {
          title: 'Node.js Documentation',
          url: 'https://nodejs.org/docs',
          type: 'docs',
          source: 'Node.js',
          description: 'Official Node.js documentation'
        },
        {
          title: 'Express.js Guide',
          url: 'https://expressjs.com',
          type: 'docs',
          source: 'Express',
          description: 'Express.js framework guide'
        },
        {
          title: 'MDN JavaScript',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
          type: 'docs',
          source: 'MDN',
          description: 'JavaScript reference'
        }
      ];
      
      setResources(instantResources);
      setLoading(false);
      setError(null);
    }
  }, [nodeId]);

  if (loading) {
    return (
      <Box 
        textAlign="center" 
        py={6} 
        px={4}
        borderRadius="md"
        borderWidth="1px"
        borderColor="blue.100"
        bg="blue.50"
      >
        <Spinner size="md" color="blue.500" thickness="3px" speed="0.8s" />
        <Text mt={3} color="blue.600" fontWeight="medium">Loading external resources...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert 
        status="error" 
        borderRadius="md" 
        variant="left-accent"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        py={4}
      >
        <AlertIcon boxSize="24px" mr={0} mb={3} />
        <Text fontWeight="medium">{error}</Text>
        <Text fontSize="sm" mt={2}>
          Try refreshing the page or check your connection.
        </Text>
      </Alert>
    );
  }

  if (resources.length === 0) {
    return (
      <Box 
        p={4} 
        borderRadius="md" 
        borderWidth="1px" 
        borderStyle="dashed" 
        borderColor="gray.300"
        bg="gray.50"
        textAlign="center"
      >
        <Text color="gray.600">No external resources available for this node yet.</Text>
      </Box>
    );
  }

  return (
    <VStack spacing={1} align="stretch">
      {/* Simple MIT OCW links that match the screenshot style */}
      {resources.length > 0 && resources.map((resource, index) => (
        <Box key={index}>
          <Link 
            href={resource.url} 
            isExternal 
            color="blue.600" 
            fontSize="sm"
            _hover={{ color: 'blue.800', textDecoration: 'underline' }}
            mb={0}
          >
            {resource.title} ↗
          </Link>
          <Text fontSize="xs" color="gray.500" mt={0}>
            {resource.source}
          </Text>
        </Box>
      ))}
      
      {/* If no specific resources, show default MIT OCW link */}
      {resources.length === 0 && (
        <Box>
          <Link 
            href="https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/" 
            isExternal 
            color="blue.600" 
            fontSize="sm"
            _hover={{ color: 'blue.800', textDecoration: 'underline' }}
          >
            MIT Python Course ↗
          </Link>
          <Text fontSize="xs" color="gray.500">
            MIT OCW
          </Text>
        </Box>
      )}
    </VStack>
  );
};

export default ResourcesList;