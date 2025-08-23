import React from 'react';
import {
  Box,
  Text,
  Progress,
  Badge,
  VStack,
  HStack,
  Tooltip,
  Icon
} from '@chakra-ui/react';
import { FaCheckCircle, FaTimesCircle, FaMedal, FaInfoCircle } from 'react-icons/fa';

const GradeDisplay = ({ overallGrade, isEligibleForCertificate, totalAssignments, completedAssignments }) => {
  // Calculate how many assignments have been completed
  const completedCount = Object.keys(completedAssignments).length;
  const completionPercentage = totalAssignments > 0 ? (completedCount / totalAssignments) * 100 : 0;

  return (
    <Box 
      borderWidth="1px" 
      borderRadius="lg" 
      p={4} 
      bg="white" 
      shadow="md"
      mb={4}
    >
      <VStack spacing={3} align="stretch">
        <HStack justify="space-between">
          <Text fontWeight="bold" fontSize="lg">Course Progress</Text>
          <Tooltip label="Your progress is based on completed assignments">
            <Icon as={FaInfoCircle} color="gray.500" />
          </Tooltip>
        </HStack>

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
      </VStack>
    </Box>
  );
};

export default GradeDisplay;