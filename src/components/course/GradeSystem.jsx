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
  useColorModeValue
} from '@chakra-ui/react';
import { FaCheckCircle, FaTimesCircle, FaMedal, FaInfoCircle } from 'react-icons/fa';

const GradeSystem = ({ assignments, finalProject, overallGrade }) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  
  // Calculate completion percentage
  const totalAssignments = assignments ? Object.keys(assignments).length : 0;
  const completedAssignments = assignments ? 
    Object.values(assignments).filter(assignment => assignment.completed).length : 0;
  const completionPercentage = totalAssignments > 0 ? 
    (completedAssignments / totalAssignments) * 100 : 0;
  
  // Determine certificate eligibility
  const isEligibleForCertificate = overallGrade >= 85;
  
  // Calculate average assignment score
  const calculateAverageScore = (assignments) => {
    if (!assignments || Object.keys(assignments).length === 0) return 0;
    
    const scores = Object.values(assignments)
      .filter(assignment => assignment.completed && assignment.score !== undefined)
      .map(assignment => assignment.score);
    
    if (scores.length === 0) return 0;
    
    // Calculate average score
    const avgScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    return Math.round(avgScore);
  };
  
  const averageAssignmentScore = calculateAverageScore(assignments);
  
  return (
    <Box 
      borderWidth="1px" 
      borderRadius="lg" 
      p={4} 
      bg={bgColor} 
      borderColor={borderColor}
      shadow="md"
      mb={4}
    >
      <VStack spacing={3} align="stretch">
        <HStack justify="space-between">
          <Text fontWeight="bold" fontSize="lg" color={textColor}>Grade Summary</Text>
          <Tooltip label="Your overall grade is calculated as 60% assignments and 40% final project">
            <Icon as={FaInfoCircle} color={mutedColor} />
          </Tooltip>
        </HStack>

        <Box>
          <HStack justify="space-between" mb={1}>
            <Text fontSize="sm" color={textColor}>Assignments Completed</Text>
            <Text fontSize="sm" fontWeight="medium" color={textColor}>
              {completedAssignments} of {totalAssignments}
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
            <Text fontSize="sm" color={textColor}>Average Assignment Score</Text>
            <Badge 
              colorScheme={averageAssignmentScore >= 85 ? "green" : averageAssignmentScore >= 70 ? "yellow" : "red"}
              fontSize="sm"
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

        {finalProject && (
          <Box>
            <HStack justify="space-between" mb={1}>
              <Text fontSize="sm" color={textColor}>Final Project Score</Text>
              <Badge 
                colorScheme={finalProject.score >= 85 ? "green" : finalProject.score >= 70 ? "yellow" : "red"}
                fontSize="sm"
                p={1}
              >
                {finalProject.score}%
              </Badge>
            </HStack>
            <Progress 
              value={finalProject.score} 
              size="sm" 
              colorScheme={finalProject.score >= 85 ? "green" : finalProject.score >= 70 ? "yellow" : "red"}
              borderRadius="full"
            />
          </Box>
        )}

        <Box>
          <HStack justify="space-between" mb={1}>
            <Text fontSize="sm" fontWeight="bold" color={textColor}>Overall Grade</Text>
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
          <Text fontWeight="bold" color={textColor}>Certificate Eligibility</Text>
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
          <Text fontSize="xs" color={mutedColor}>
            You need an overall grade of 85% or higher to be eligible for a certificate.
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default GradeSystem;