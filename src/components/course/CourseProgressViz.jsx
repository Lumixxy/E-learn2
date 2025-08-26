import React from 'react';
import {
  Box,
  Card,
  CardBody,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import InteractiveProgressViz from '../roadmap/InteractiveProgressViz';

const CourseProgressViz = ({
  courseId,
  totalNodes,
  completedNodes,
  assignmentScores = {},
  quizScores = {},
  isEligibleForCertificate,
  onNodeClick
}) => {
  // Colors
  const textColor = useColorModeValue('gray.800', 'white');
  const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <Card bg={cardBg} borderRadius="xl" overflow="hidden" mb={6}>
      <CardBody p={6}>
        <Text fontSize="2xl" fontWeight="bold" color={textColor} mb={4}>
          Learning Progress
        </Text>
        <Box>
          <InteractiveProgressViz
            roadmapId={courseId}
            totalNodes={totalNodes}
            completedNodes={completedNodes}
            assignmentScores={assignmentScores}
            quizScores={quizScores}
            isEligibleForCertificate={isEligibleForCertificate}
            onNodeClick={onNodeClick}
          />
        </Box>
      </CardBody>
    </Card>
  );
};

export default CourseProgressViz;