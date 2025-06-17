import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  Button,
  Badge,
  HStack,
  Progress,
} from "@chakra-ui/react";
import { FaDownload, FaUpload } from "react-icons/fa";

const Assignments = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const bgColor = useColorModeValue("white", "navy.800");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");

  const assignments = [
    {
      title: "Programming Assignment 1",
      description: "Implement basic data structures and algorithms",
      dueDate: "2024-04-15",
      status: "pending",
      progress: 0,
    },
    {
      title: "Project 1: Algorithm Analysis",
      description: "Analyze and compare different sorting algorithms",
      dueDate: "2024-04-22",
      status: "in-progress",
      progress: 60,
    },
    {
      title: "Final Project",
      description: "Develop a complete software application",
      dueDate: "2024-05-10",
      status: "not-started",
      progress: 0,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "green";
      case "in-progress":
        return "blue";
      case "pending":
        return "yellow";
      default:
        return "gray";
    }
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Box bg={bgColor} p={8} borderRadius="xl" boxShadow="lg">
        <VStack spacing={6} align="stretch">
          <Heading color={textColor} size="xl">
            Course Assignments
          </Heading>
          <Text color={textColor} fontSize="lg">
            Track your progress and manage course assignments. Submit your work and
            monitor your grades here.
          </Text>

          <VStack spacing={4} align="stretch">
            {assignments.map((assignment, index) => (
              <Box
                key={index}
                p={6}
                borderWidth="1px"
                borderRadius="lg"
                borderColor={borderColor}
                _hover={{ shadow: "md" }}
              >
                <VStack align="stretch" spacing={4}>
                  <HStack justify="space-between">
                    <Heading size="md" color={textColor}>
                      {assignment.title}
                    </Heading>
                    <Badge
                      colorScheme={getStatusColor(assignment.status)}
                      fontSize="sm"
                      px={2}
                      py={1}
                      borderRadius="full"
                    >
                      {assignment.status.replace("-", " ")}
                    </Badge>
                  </HStack>

                  <Text color={textColor}>{assignment.description}</Text>

                  <Box>
                    <Text color={textColor} fontSize="sm" mb={2}>
                      Due Date: {assignment.dueDate}
                    </Text>
                    <Progress
                      value={assignment.progress}
                      size="sm"
                      colorScheme="blue"
                      borderRadius="full"
                    />
                  </Box>

                  <HStack spacing={4}>
                    <Button
                      leftIcon={<FaDownload />}
                      colorScheme="blue"
                      variant="outline"
                      size="sm"
                    >
                      Download Instructions
                    </Button>
                    <Button
                      leftIcon={<FaUpload />}
                      colorScheme="green"
                      size="sm"
                    >
                      Submit Assignment
                    </Button>
                  </HStack>
                </VStack>
              </Box>
            ))}
          </VStack>

          <Box mt={8}>
            <Heading color={textColor} size="md" mb={4}>
              Assignment Guidelines
            </Heading>
            <Text color={textColor}>
              • All assignments must be submitted before the due date
              <br />
              • Late submissions will be penalized
              <br />
              • Plagiarism will not be tolerated
              <br />
              • Make sure to follow the coding standards and documentation requirements
            </Text>
          </Box>
        </VStack>
      </Box>
    </Container>
  );
};

export default Assignments; 