import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Container,
  useColorModeValue,
  Text,
  Progress,
  VStack,
  HStack,
  Badge,
  Icon
} from '@chakra-ui/react';
import { useCompletedNodes } from '../../../context/CompletedNodesContext';
import WebWarriorAPI from 'api/webwarrior';
import { FaCheckCircle, FaInfoCircle } from 'react-icons/fa';

const WebWarriorProgress = ({ courseId }) => {
  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [assignmentScores, setAssignmentScores] = useState({});
  const [certificateEligible, setCertificateEligible] = useState(false);
  const { getCompletedNodesForRoadmap } = useCompletedNodes();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  
  useEffect(() => {
    const fetchRoadmapData = async () => {
      setLoading(true);
      try {
        // Try to get roadmap data from API
        const apiData = await WebWarriorAPI.getRoadmapById(courseId);
        setRoadmapData(apiData);
        
        // Fetch assignment scores
        const scores = await WebWarriorAPI.getAssignmentScores(courseId);
        setAssignmentScores(scores || {});
        
        // Check certificate eligibility
        const eligibility = await WebWarriorAPI.checkCertificateEligibility(courseId);
        setCertificateEligible(eligibility?.eligible || false);
      } catch (error) {
        console.error('Error fetching roadmap data:', error);
        // Fallback to mock data
        setRoadmapData({
          id: courseId || 'web-warrior-roadmap',
          nodes: Array.from({ length: 10 }, (_, i) => ({
            id: `node-${i + 1}`,
            label: `Module ${i + 1}`,
            description: `Description for Module ${i + 1}`
          }))
        });
        
        // Mock assignment scores
        const mockScores = {};
        for (let i = 1; i <= 5; i++) {
          mockScores[`node-${i}`] = Math.floor(Math.random() * 16) + 85; // 85-100
        }
        setAssignmentScores(mockScores);
        
        // Mock certificate eligibility
        setCertificateEligible(Object.keys(mockScores).length >= 5);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRoadmapData();
  }, [courseId]);
  
  // Get completed nodes from context
  const completedNodes = getCompletedNodesForRoadmap(courseId || 'web-warrior-roadmap');
  
  // Mock quiz scores
  const quizScores = {};
  completedNodes.forEach(nodeId => {
    quizScores[nodeId] = Math.floor(Math.random() * 16) + 85; // 85-100
  });
  
  // Calculate completion metrics
  const completedNodes = getCompletedNodesForRoadmap(courseId || 'web-warrior-roadmap') || [];
  const totalNodes = roadmapData?.nodes?.length || 0;
  const completionPercentage = totalNodes > 0 ? Math.round((completedNodes.length / totalNodes) * 100) : 0;
  
  // Calculate average scores
  const assignmentScoreValues = Object.values(assignmentScores);
  const averageAssignmentScore = assignmentScoreValues.length > 0 
    ? Math.round(assignmentScoreValues.reduce((sum, score) => sum + score, 0) / assignmentScoreValues.length) 
    : 0;

  if (loading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Box p={5} bg={bgColor} shadow="md" borderRadius="lg">
          <Heading size="md" mb={4}>Loading progress data...</Heading>
        </Box>
      </Container>
    );
  }
  
  return (
    <Container maxW="container.xl" py={8}>
      <Heading as="h1" size="xl" mb={6} color={textColor}>
        Web Warrior Progress
      </Heading>
      
      <Box
        borderWidth="1px"
        borderRadius="lg"
        p={5}
        bg={bgColor}
        shadow="md"
        mb={4}
      >
        <VStack spacing={4} align="stretch">
          <HStack justify="space-between">
            <Text fontWeight="bold" fontSize="xl">Learning Progress</Text>
            <Badge colorScheme={completionPercentage >= 85 ? "green" : "blue"} fontSize="md">
              {completionPercentage}% Complete
            </Badge>
          </HStack>
          
          <Box>
            <Text mb={2}>Course Completion</Text>
            <Progress
              value={completionPercentage}
              size="sm"
              colorScheme={completionPercentage >= 85 ? "green" : "blue"}
              borderRadius="full"
            />
            <Text fontSize="sm" mt={1} color="gray.500">
              {completedNodes.length} of {totalNodes} modules completed
            </Text>
          </Box>
          
          <Box>
            <Text mb={2}>Assignment Average</Text>
            <Progress
              value={averageAssignmentScore}
              size="sm"
              colorScheme={averageAssignmentScore >= 85 ? "green" : averageAssignmentScore >= 70 ? "yellow" : "red"}
              borderRadius="full"
            />
            <Text fontSize="sm" mt={1} color="gray.500">
              {averageAssignmentScore}% average score
            </Text>
          </Box>
          
          <HStack>
            <Icon 
              as={certificateEligible ? FaCheckCircle : FaInfoCircle} 
              color={certificateEligible ? "green.500" : "blue.500"} 
              mr={2} 
            />
            <Text>
              {certificateEligible 
                ? "You are eligible for certification!" 
                : "Complete all modules with an average score of 85% to earn your certificate."}
            </Text>
          </HStack>
        </VStack>
      </Box>
    </Container>
  );
};

export default WebWarriorProgress;