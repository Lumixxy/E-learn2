import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

const Syllabus = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const bgColor = useColorModeValue("white", "navy.800");

  return (
    <Container maxW="container.xl" py={8}>
      <Box bg={bgColor} p={8} borderRadius="xl" boxShadow="lg">
        <VStack spacing={6} align="stretch">
          <Heading color={textColor} size="xl">
            Course Syllabus
          </Heading>
          <Text color={textColor} fontSize="lg">
            This course provides an introduction to the fundamental concepts and principles of computer science.
          </Text>
          
          <Box>
            <Heading color={textColor} size="md" mb={4}>
              Course Overview
            </Heading>
            <Text color={textColor}>
              This course covers essential topics in computer science including algorithms, data structures,
              programming paradigms, and software engineering principles. Students will gain hands-on
              experience through practical assignments and projects.
            </Text>
          </Box>

          <Box>
            <Heading color={textColor} size="md" mb={4}>
              Learning Objectives
            </Heading>
            <VStack align="stretch" spacing={2}>
              <Text color={textColor}>• Understand fundamental computer science concepts</Text>
              <Text color={textColor}>• Develop problem-solving skills</Text>
              <Text color={textColor}>• Learn programming best practices</Text>
              <Text color={textColor}>• Gain experience with software development tools</Text>
            </VStack>
          </Box>

          <Box>
            <Heading color={textColor} size="md" mb={4}>
              Course Schedule
            </Heading>
            <VStack align="stretch" spacing={4}>
              <Box>
                <Text fontWeight="bold" color={textColor}>Week 1-2: Introduction to Computer Science</Text>
                <Text color={textColor}>Basic concepts and programming fundamentals</Text>
              </Box>
              <Box>
                <Text fontWeight="bold" color={textColor}>Week 3-4: Data Structures</Text>
                <Text color={textColor}>Arrays, linked lists, trees, and graphs</Text>
              </Box>
              <Box>
                <Text fontWeight="bold" color={textColor}>Week 5-6: Algorithms</Text>
                <Text color={textColor}>Sorting, searching, and algorithm analysis</Text>
              </Box>
              <Box>
                <Text fontWeight="bold" color={textColor}>Week 7-8: Software Engineering</Text>
                <Text color={textColor}>Design patterns, testing, and project management</Text>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </Container>
  );
};

export default Syllabus; 