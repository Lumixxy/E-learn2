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
  const [loading, setLoading] = useState(true);
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
    const fetchResources = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Enhanced MIT OCW based resources mapped to node IDs
        const mitResourcesMap = {
          // Node IDs from roadmap.json - Python Basics
          '1': [
            {
              title: 'MIT Lecture 1: What is Computation?',
              url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-1-what-is-computation/',
              type: 'video',
              source: 'MIT OCW',
              description: 'Introduction to computational thinking and Python basics'
            },
            {
              title: 'Python Official Tutorial - Introduction',
              url: 'https://docs.python.org/3/tutorial/introduction.html',
              type: 'docs',
              source: 'Python.org',
              description: 'Official Python documentation for beginners'
            },
            {
              title: 'MIT Course Syllabus and Materials',
              url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/',
              type: 'course',
              source: 'MIT OCW',
              description: 'Complete MIT 6.0001 course materials'
            },
            {
              title: 'MIT Problem Set 1',
              url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/ps1/',
              type: 'assignment',
              source: 'MIT OCW',
              description: 'Practice problems for Python basics'
            }
          ],
          // Data Structures (node-2)
          '2': [
            {
              title: 'MIT Lecture 5: Tuples, Lists, Aliasing, Mutability, and Cloning',
              url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-5-tuples-lists-aliasing-mutability-and-cloning/',
              type: 'video',
              source: 'MIT OCW',
              description: 'Comprehensive coverage of Python data structures'
            },
            {
              title: 'Python Data Structures Documentation',
              url: 'https://docs.python.org/3/tutorial/datastructures.html',
              type: 'docs',
              source: 'Python.org',
              description: 'Official guide to lists, tuples, dictionaries, and sets'
            },
            {
              title: 'MIT Problem Set 4 - Word Game',
              url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/ps4/',
              type: 'assignment',
              source: 'MIT OCW',
              description: 'Hands-on practice with data structures'
            },
            {
              title: 'MIT Lecture 6: Recursion and Dictionaries',
              url: 'https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/resources/lecture-6-recursion-and-dictionaries/',
              type: 'video',
              source: 'MIT OCW',
              description: 'Advanced data structures and recursion concepts'
            }
          ],
          // Algorithms (node-3)
          '3': [
            {
              title: 'MIT 6.006 Introduction to Algorithms',
              url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/',
              type: 'course',
              source: 'MIT OCW',
              description: 'Complete algorithms course covering sorting, searching, and optimization'
            },
            {
              title: 'MIT Lecture: Algorithmic Thinking, Peak Finding',
              url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/resources/lecture-1-algorithmic-thinking-peak-finding/',
              type: 'video',
              source: 'MIT OCW',
              description: 'Introduction to algorithmic thinking and problem-solving'
            },
            {
              title: 'MIT Problem Set - Algorithms',
              url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/pages/assignments/',
              type: 'assignment',
              source: 'MIT OCW',
              description: 'Practical algorithm implementation challenges'
            },
            {
              title: 'Python Algorithm Documentation',
              url: 'https://docs.python.org/3/library/collections.html',
              type: 'docs',
              source: 'Python.org',
              description: 'Python collections and algorithm utilities'
            }
          ]
        };
        
        // Default resources when no specific mapping is found
        const defaultResources = [
          {
            title: 'MIT OpenCourseWare - Computer Science',
            url: 'https://ocw.mit.edu/search/?d=Electrical%20Engineering%20and%20Computer%20Science&s=department_course_numbers.sort_coursenum',
            type: 'course',
            source: 'MIT OCW',
            description: 'Browse all MIT computer science courses'
          },
          {
            title: 'Python Official Documentation',
            url: 'https://docs.python.org/3/',
            type: 'docs',
            source: 'Python.org',
            description: 'Complete Python language reference'
          },
          {
            title: 'Real Python Tutorials',
            url: 'https://realpython.com/',
            type: 'tutorial',
            source: 'Real Python',
            description: 'Practical Python programming tutorials'
          }
        ];
        
        // Extract node ID without any prefix
        const cleanNodeId = nodeId.replace('node-', '');
        
        // Check if we have MIT resources for this node
        if (mitResourcesMap[cleanNodeId]) {
          console.log(`Using MIT resources for node: ${cleanNodeId}`);
          setResources(mitResourcesMap[cleanNodeId]);
        } else {
          try {
            // Try to get resources from API if no MIT resources found
            const data = await WebWarriorAPI.getNodeResources(nodeId);
            if (data && data.length > 0) {
              setResources(data);
            } else {
              // If API returns empty array, use default resources
              setResources(defaultResources);
            }
          } catch (apiErr) {
            console.error('Error fetching node resources from API:', apiErr);
            // If API call fails, use default resources
            setResources(defaultResources);
          }
        }
      } catch (err) {
        console.error('Error in resource handling:', err);
        setError('Failed to load resources. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (nodeId) {
      fetchResources();
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