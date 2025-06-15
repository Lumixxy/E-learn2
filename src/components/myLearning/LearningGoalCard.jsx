import React, { useState } from "react";
import { Box, Text, Progress, Button, Flex, Badge, useColorModeValue, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Card from "../card/Card";

const LearningGoalCard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const textColor = useColorModeValue("gray.700", "white");
  const blueColor = useColorModeValue("blue.600", "blue.300");
  const grayTextColor = useColorModeValue("gray.500", "gray.400");

  const handleContinueLearning = async () => {
    setIsLoading(true);
    try {
      // In a real application, you would fetch the user's progress here
      // For now, we'll simulate a brief loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Navigate to the course detail page
      // In a real application, you would use the actual course ID from the user's progress
      navigate("/admin/courses/1");
    } catch (error) {
      console.error("Error fetching course progress:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <Flex justify="space-between" align="center" mb={2}>
        <Box>
          <Text fontSize="lg" fontWeight="bold" color={textColor}>Your Learning Goal</Text>
          <Text color={blueColor} fontWeight="semibold">Web Development</Text>
          <Progress value={35} size="sm" colorScheme="blue" mt={2} mb={1} />
          <Text fontSize="sm" color={grayTextColor}>35% of Web Development Path completed</Text>
          <Badge colorScheme="orange" mt={2}>Struggled with CSS Flexbox last time — want to review?</Badge>
        </Box>
        <Button
          colorScheme="blue"
          size="md"
          onClick={handleContinueLearning}
          isLoading={isLoading}
          loadingText="Loading..."
          spinner={<Spinner size="sm" />}
          _hover={{
            transform: "scale(1.02)",
            transition: "transform 0.2s ease"
          }}
        >
          Continue Learning
        </Button>
      </Flex>
    </Card>
  );
};

export default LearningGoalCard; 