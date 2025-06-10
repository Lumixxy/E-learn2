import React from "react";
import { Text, HStack, VStack, useColorModeValue } from "@chakra-ui/react";
import Card from "../card/Card";

const ProgressAnalyticsCard = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const textColorSecondary = useColorModeValue("gray.500", "whiteAlpha.700");
  const textColorTertiary = useColorModeValue("gray.400", "whiteAlpha.600");
  const blueColor = useColorModeValue("blue.500", "blue.300");
  const greenColor = useColorModeValue("green.500", "green.300");
  const purpleColor = useColorModeValue("purple.500", "purple.300");

  return (
    <Card>
      <Text fontWeight="bold" fontSize="lg" mb={3} color={textColor}>How You're Progressing</Text>
      <HStack spacing={6} justify="space-between">
        <VStack>
          <Text fontSize="sm" color={textColorSecondary}>Quiz Score Avg</Text>
          <Text fontWeight="bold" fontSize="2xl" color={blueColor}>72%</Text>
        </VStack>
        <VStack>
          <Text fontSize="sm" color={textColorSecondary}>Learning Pace</Text>
          <Text fontWeight="bold" fontSize="2xl" color={greenColor}>3</Text>
          <Text fontSize="xs" color={textColorTertiary}>lessons/week</Text>
        </VStack>
        <VStack>
          <Text fontSize="sm" color={textColorSecondary}>Time Invested</Text>
          <Text fontWeight="bold" fontSize="2xl" color={purpleColor}>4h 20m</Text>
        </VStack>
      </HStack>
    </Card>
  );
};

export default ProgressAnalyticsCard; 