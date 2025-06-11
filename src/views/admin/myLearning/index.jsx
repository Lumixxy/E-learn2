import React from "react";
import { Box, VStack, SimpleGrid, useColorModeValue, Grid, GridItem } from "@chakra-ui/react";
import InProgressCoursesCard from "../../../components/myLearning/InProgressCoursesCard";
import LearningGoalCard from "../../../components/myLearning/LearningGoalCard";
import LearningPathCard from "../../../components/myLearning/LearningPathCard";
import TodaysPlanCard from "../../../components/myLearning/TodaysPlanCard";
import ProgressAnalyticsCard from "../../../components/myLearning/ProgressAnalyticsCard";
import CompletedCoursesCard from "../../../components/myLearning/CompletedCoursesCard";

const MyLearning = () => {
  const bgColor = useColorModeValue("gray.50", "navy.900");

  return (
    <Box minH="100vh" bg={bgColor} p={4}>
      <VStack spacing={6} align="stretch">
        <InProgressCoursesCard />
        <LearningGoalCard />
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <LearningPathCard />
          <TodaysPlanCard />
        </SimpleGrid>
        <CompletedCoursesCard />
        <ProgressAnalyticsCard />
      </VStack>
    </Box>
  );
};

export default MyLearning;