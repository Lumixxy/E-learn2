import React, { useState } from 'react';
import {
  Box,
  Text,
  Progress,
  Badge,
  VStack,
  HStack,
  Tooltip,
  Icon,
  Button,
  useColorModeValue
} from '@chakra-ui/react';
import { FaCheckCircle, FaTimesCircle, FaMedal, FaInfoCircle, FaChartBar } from 'react-icons/fa';

const GradeDisplay = ({ 
  overallGrade, 
  isEligibleForCertificate, 
  totalAssignments, 
  completedAssignments,
  quizScores = {},
  assignmentScores = {},
  roadmapId,
  totalNodes,
  completedNodes,
  onNodeClick
 }) => {
  const [showDetailedView, setShowDetailedView] = useState(false);
  
  // Calculate how many assignments have been completed
  const completedCount = Object.keys(completedAssignments).length;
  const completionPercentage = totalAssignments > 0 ? (completedCount / totalAssignments) * 100 : 0;
  
  // Colors
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box 
      borderWidth="1px" 
      borderRadius="lg" 
      p={4} 
      bg={bgColor} 
      shadow="md"
      mb={4}
    >
      <VStack spacing={3} align="stretch">
        <HStack justify="space-between">
          <Text fontWeight="bold" fontSize="lg">Course Progress</Text>
          <HStack>
            <Tooltip label="Your progress is based on completed assignments">
              <Icon as={FaInfoCircle} color="gray.500" />
            </Tooltip>
            <Button 
              size="sm" 
              leftIcon={<FaChartBar />} 
              colorScheme="blue" 
              variant="outline"
              onClick={() => setShowDetailedView(!showDetailedView)}
            >
              {showDetailedView ? "Simple View" : "Detailed View"}
            </Button>
          </HStack>
        </HStack>
        
        {showDetailedView ? (
          <InteractiveProgressViz
            roadmapId={roadmapId}
            totalNodes={totalNodes || totalAssignments}
            completedNodes={completedNodes || Object.keys(completedAssignments)}
            assignmentScores={assignmentScores}
            quizScores={quizScores}
            isEligibleForCertificate={isEligibleForCertificate}
            onNodeClick={onNodeClick}
          />
        ) : (

        <>
          <Box>
            <HStack justify="space-between" mb={1}>
              <Text fontSize="sm">Assignments Completed</Text>
              <Text fontSize="sm" fontWeight="medium">
                {completedCount} of {totalAssignments}
              </Text>
            </HStack>
            <Progress 
              value={completionPercentage} 
              size="sm" 
              colorScheme="blue" 
              borderRadius="full"
            />
          </Box>

          <Box>
            <HStack justify="space-between" mb={1}>
              <Text fontSize="sm">Overall Grade</Text>
              <Badge 
                colorScheme={overallGrade >= 85 ? "green" : overallGrade >= 70 ? "yellow" : "red"}
                fontSize="sm"
                p={1}
              >
                {overallGrade}%
              </Badge>
            </HStack>
            <Progress 
              value={overallGrade} 
              size="sm" 
              colorScheme={overallGrade >= 85 ? "green" : overallGrade >= 70 ? "yellow" : "red"}
              borderRadius="full"
            />
          </Box>

          <HStack justify="space-between" pt={1}>
            <Text fontWeight="bold">Certificate Eligibility</Text>
            {isEligibleForCertificate ? (
              <HStack>
                <Icon as={FaCheckCircle} color="green.500" />
                <Badge colorScheme="green" p={1}>
                  <HStack>
                    <Icon as={FaMedal} />
                    <Text>Eligible</Text>
                  </HStack>
                </Badge>
              </HStack>
            ) : (
              <HStack>
                <Icon as={FaTimesCircle} color="red.500" />
                <Badge colorScheme="red" p={1}>Not Eligible</Badge>
              </HStack>
            )}
          </HStack>
          
          {!isEligibleForCertificate && (
            <Text fontSize="xs" color="gray.600">
              You need an overall grade of 85% or higher to be eligible for a certificate.
            </Text>
          )}
        </>
        )}
      </VStack>
    </Box>
  );
};

export default GradeDisplay;