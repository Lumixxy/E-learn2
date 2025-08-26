import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Progress,
  VStack,
  HStack,
  Tooltip,
  Icon,
  CircularProgress,
  CircularProgressLabel,
  Badge,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Grid,
  useColorModeValue,
  Button
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { 
  FaCheckCircle, 
  FaTimesCircle, 
  FaMedal, 
  FaInfoCircle, 
  FaTrophy, 
  FaBook, 
  FaClock,
  FaChartLine,
  FaLock,
  FaUnlock,
  FaCheck
} from 'react-icons/fa';

const InteractiveProgressViz = ({ 
  roadmapId,
  totalNodes,
  completedNodes,
  assignmentScores = {},
  quizScores = {},
  isEligibleForCertificate,
  onNodeClick
 }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [animateProgress, setAnimateProgress] = useState(false);
  
  // Calculate completion metrics
  const completedCount = completedNodes?.length || 0;
  const completionPercentage = totalNodes > 0 ? Math.round((completedCount / totalNodes) * 100) : 0;
  
  // Calculate average scores
  const assignmentScoreValues = Object.values(assignmentScores);
  const averageAssignmentScore = assignmentScoreValues.length > 0 
    ? Math.round(assignmentScoreValues.reduce((sum, score) => sum + score, 0) / assignmentScoreValues.length) 
    : 0;
    
  const quizScoreValues = Object.values(quizScores);
  const averageQuizScore = quizScoreValues.length > 0 
    ? Math.round(quizScoreValues.reduce((sum, score) => sum + score, 0) / quizScoreValues.length) 
    : 0;
  
  // Calculate estimated time remaining (mock data)
  const estimatedTimePerNode = 45; // minutes
  const remainingNodes = totalNodes - completedCount;
  const estimatedTimeRemaining = remainingNodes * estimatedTimePerNode;
  
  // Colors
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.800', 'white');
  const secondaryTextColor = useColorModeValue('gray.600', 'gray.400');
  const brandColor = useColorModeValue('blue.500', 'blue.300');
  const successColor = useColorModeValue('green.500', 'green.300');
  const warningColor = useColorModeValue('yellow.500', 'yellow.300');
  const dangerColor = useColorModeValue('red.500', 'red.300');
  
  // Trigger animation when component mounts
  useEffect(() => {
    setAnimateProgress(true);
  }, []);
  
  // Format time remaining
  const formatTimeRemaining = (minutes) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={5}
      bg={bgColor}
      shadow="md"
      mb={4}
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <VStack spacing={4} align="stretch">
        {/* Header with tabs */}
        <HStack justify="space-between">
          <Text fontWeight="bold" fontSize="xl">Learning Progress</Text>
          <HStack spacing={2}>
            <Button 
              size="sm" 
              variant={activeTab === 'overview' ? "solid" : "outline"}
              colorScheme="blue"
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </Button>
            <Button 
              size="sm" 
              variant={activeTab === 'scores' ? "solid" : "outline"}
              colorScheme="blue"
              onClick={() => setActiveTab('scores')}
            >
              Scores
            </Button>
            <Button 
              size="sm" 
              variant={activeTab === 'timeline' ? "solid" : "outline"}
              colorScheme="blue"
              onClick={() => setActiveTab('timeline')}
            >
              Timeline
            </Button>
          </HStack>
        </HStack>
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <Box>
            <Flex direction={{ base: "column", md: "row" }} align="center" justify="space-between" mb={6}>
              <VStack align="start" spacing={2} flex={1} mb={{ base: 4, md: 0 }}>
                <HStack>
                  <Icon as={FaTrophy} color={brandColor} w="20px" h="20px" />
                  <Text fontWeight="bold">Overall Progress</Text>
                </HStack>
                <Text color={secondaryTextColor}>
                  {completedCount} of {totalNodes} nodes completed
                </Text>
              </VStack>
              
              <Box position="relative">
                <CircularProgress
                  as={motion.div}
                  value={animateProgress ? completionPercentage : 0}
                  color={completionPercentage >= 85 ? successColor : completionPercentage >= 50 ? brandColor : warningColor}
                  size="120px"
                  thickness="8px"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                >
                  <CircularProgressLabel fontSize="xl" fontWeight="bold">{completionPercentage}%</CircularProgressLabel>
                </CircularProgress>
                
                {isEligibleForCertificate && (
                  <Box
                    as={motion.div}
                    position="absolute"
                    top="-10px"
                    right="-10px"
                    color="yellow.400"
                    w="40px"
                    h="40px"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      repeatType: "loop",
                      repeatDelay: 3
                    }}
                  >
                    <Icon as={FaMedal} w="100%" h="100%" />
                  </Box>
                )}
              </Box>
            </Flex>
            
            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
              <Stat
                px={4}
                py={3}
                bg={bgColor === 'white' ? "gray.50" : "gray.800"}
                borderRadius="lg"
                borderWidth="1px"
                borderColor={borderColor}
              >
                <StatLabel color={secondaryTextColor}>
                  <HStack>
                    <Icon as={FaBook} />
                    <Text>Lessons Completed</Text>
                  </HStack>
                </StatLabel>
                <StatNumber fontSize="2xl" fontWeight="bold" color={brandColor}>
                  {completedCount}
                </StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  {Math.round((completedCount / totalNodes) * 100)}% of curriculum
                </StatHelpText>
              </Stat>
              
              <Stat
                px={4}
                py={3}
                bg={bgColor === 'white' ? "gray.50" : "gray.800"}
                borderRadius="lg"
                borderWidth="1px"
                borderColor={borderColor}
              >
                <StatLabel color={secondaryTextColor}>
                  <HStack>
                    <Icon as={FaChartLine} />
                    <Text>Average Score</Text>
                  </HStack>
                </StatLabel>
                <StatNumber fontSize="2xl" fontWeight="bold" color={brandColor}>
                  {averageAssignmentScore || 0}%
                </StatNumber>
                <StatHelpText>
                  <StatArrow type={averageAssignmentScore >= 85 ? "increase" : "decrease"} />
                  {averageAssignmentScore >= 85 ? "Above" : "Below"} passing grade
                </StatHelpText>
              </Stat>
              
              <Stat
                px={4}
                py={3}
                bg={bgColor === 'white' ? "gray.50" : "gray.800"}
                borderRadius="lg"
                borderWidth="1px"
                borderColor={borderColor}
              >
                <StatLabel color={secondaryTextColor}>
                  <HStack>
                    <Icon as={FaClock} />
                    <Text>Est. Time Remaining</Text>
                  </HStack>
                </StatLabel>
                <StatNumber fontSize="2xl" fontWeight="bold" color={brandColor}>
                  {formatTimeRemaining(estimatedTimeRemaining)}
                </StatNumber>
                <StatHelpText>
                  <StatArrow type="decrease" />
                  {remainingNodes} nodes left
                </StatHelpText>
              </Stat>
            </Grid>
            
            <Box mt={6}>
              <HStack justify="space-between" mb={1}>
                <Text fontSize="sm">Certificate Progress</Text>
                <Badge 
                  colorScheme={isEligibleForCertificate ? "green" : "yellow"}
                  p={1}
                >
                  <HStack>
                    <Icon as={isEligibleForCertificate ? FaUnlock : FaLock} />
                    <Text>{isEligibleForCertificate ? "Eligible" : "In Progress"}</Text>
                  </HStack>
                </Badge>
              </HStack>
              <Progress
                value={completionPercentage}
                size="sm"
                colorScheme={completionPercentage >= 85 ? "green" : "blue"}
                borderRadius="full"
                as={motion.div}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8 }}
              />
              <Text fontSize="xs" color={secondaryTextColor} mt={1}>
                {isEligibleForCertificate 
                  ? "You've met all requirements for certification!" 
                  : "Complete all nodes with an average score of 85% or higher to earn your certificate."}
              </Text>
            </Box>
          </Box>
        )}
        
        {/* Scores Tab */}
        {activeTab === 'scores' && (
          <Box>
            <VStack spacing={4} align="stretch">
              <Box>
                <HStack justify="space-between" mb={1}>
                  <Text fontSize="sm">Quiz Average</Text>
                  <Badge 
                    colorScheme={averageQuizScore >= 85 ? "green" : averageQuizScore >= 70 ? "yellow" : "red"}
                    p={1}
                  >
                    {averageQuizScore}%
                  </Badge>
                </HStack>
                <Progress
                  value={averageQuizScore}
                  size="sm"
                  colorScheme={averageQuizScore >= 85 ? "green" : averageQuizScore >= 70 ? "yellow" : "red"}
                  borderRadius="full"
                />
              </Box>
              
              <Box>
                <HStack justify="space-between" mb={1}>
                  <Text fontSize="sm">Assignment Average</Text>
                  <Badge 
                    colorScheme={averageAssignmentScore >= 85 ? "green" : averageAssignmentScore >= 70 ? "yellow" : "red"}
                    p={1}
                  >
                    {averageAssignmentScore}%
                  </Badge>
                </HStack>
                <Progress
                  value={averageAssignmentScore}
                  size="sm"
                  colorScheme={averageAssignmentScore >= 85 ? "green" : averageAssignmentScore >= 70 ? "yellow" : "red"}
                  borderRadius="full"
                />
              </Box>
              
              <Box>
                <Text fontSize="sm" mb={2}>Individual Scores</Text>
                <VStack spacing={2} align="stretch" maxH="200px" overflowY="auto" p={2} borderWidth="1px" borderRadius="md">
                  {Object.entries(assignmentScores).map(([nodeId, score]) => (
                    <HStack key={nodeId} justify="space-between" p={2} bg={bgColor === 'white' ? "gray.50" : "gray.700"} borderRadius="md">
                      <Text fontSize="sm" fontWeight="medium" isTruncated maxW="70%">
                        Node {nodeId.replace('node-', '')}
                      </Text>
                      <Badge 
                        colorScheme={score >= 85 ? "green" : score >= 70 ? "yellow" : "red"}
                        variant="solid"
                      >
                        {score}%
                      </Badge>
                    </HStack>
                  ))}
                  {Object.keys(assignmentScores).length === 0 && (
                    <Text fontSize="sm" color={secondaryTextColor} p={2}>
                      No assignment scores yet
                    </Text>
                  )}
                </VStack>
              </Box>
            </VStack>
          </Box>
        )}
        
        {/* Timeline Tab */}
        {activeTab === 'timeline' && (
          <Box>
            <VStack spacing={4} align="stretch">
              <Box>
                <Text fontSize="sm" mb={2}>Learning Path Progress</Text>
                <Box position="relative" h="80px">
                  {/* Timeline track */}
                  <Box 
                    position="absolute" 
                    top="50%" 
                    left="0" 
                    right="0" 
                    h="4px" 
                    bg={borderColor} 
                    transform="translateY(-50%)"
                  />
                  
                  {/* Progress indicator */}
                  <Box 
                    as={motion.div}
                    position="absolute" 
                    top="50%" 
                    left="0" 
                    h="4px" 
                    bg={brandColor} 
                    transform="translateY(-50%)"
                    initial={{ width: "0%" }}
                    animate={{ width: `${completionPercentage}%` }}
                    transition={{ duration: 1 }}
                  />
                  
                  {/* Nodes */}
                  {Array.from({ length: totalNodes }).map((_, index) => {
                    const isCompleted = index < completedCount;
                    const position = `${(index / (totalNodes - 1)) * 100}%`;
                    return (
                      <Box 
                        key={index}
                        as={motion.div}
                        position="absolute"
                        top="50%"
                        left={position}
                        transform="translate(-50%, -50%)"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => onNodeClick && onNodeClick(index)}
                        cursor={onNodeClick ? "pointer" : "default"}
                      >
                        <Tooltip label={`Node ${index + 1} ${isCompleted ? '(Completed)' : '(Not completed)'}`}>
                          <Box
                            w="20px"
                            h="20px"
                            borderRadius="full"
                            bg={isCompleted ? successColor : bgColor}
                            borderWidth="2px"
                            borderColor={isCompleted ? successColor : borderColor}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            as={motion.div}
                            whileHover={{ scale: 1.2 }}
                          >
                            {isCompleted && <Icon as={FaCheckCircle} color="white" fontSize="10px" />}
                          </Box>
                        </Tooltip>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
              
              <Box>
                <HStack justify="space-between">
                  <Text fontSize="xs" color={secondaryTextColor}>Start</Text>
                  <Text fontSize="xs" color={secondaryTextColor}>Finish</Text>
                </HStack>
              </Box>
              
              <Box>
                <Text fontSize="sm" mb={2}>Estimated Completion</Text>
                <HStack justify="space-between">
                  <Text fontSize="md" fontWeight="bold">
                    {formatTimeRemaining(estimatedTimeRemaining)} remaining
                  </Text>
                  <Badge colorScheme="blue">
                    {completionPercentage}% complete
                  </Badge>
                </HStack>
              </Box>
            </VStack>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default InteractiveProgressViz;