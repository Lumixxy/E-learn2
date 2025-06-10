import React from "react";
import { Box, Text, Progress, Button, Flex, Badge, useColorModeValue } from "@chakra-ui/react";
import Card from "../card/Card";

const LearningGoalCard = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const blueColor = useColorModeValue("blue.600", "blue.300");
  const grayTextColor = useColorModeValue("gray.500", "gray.400");

  return (
    <Card>
      <Flex justify="space-between" align="center" mb={2}>
        <Box>
          <Text fontSize="lg" fontWeight="bold" color={textColor}>Your Learning Goal</Text>
          <Text color={blueColor} fontWeight="semibold">Data Science</Text>
          <Progress value={25} size="sm" colorScheme="blue" mt={2} mb={1} />
          <Text fontSize="sm" color={grayTextColor}>25% of Data Science Path completed</Text>
          <Badge colorScheme="orange" mt={2}>Struggled with Loops last time — want to review?</Badge>
        </Box>
        <Button colorScheme="blue" size="md">Continue Learning</Button>
      </Flex>
    </Card>
  );
};

export default LearningGoalCard; 