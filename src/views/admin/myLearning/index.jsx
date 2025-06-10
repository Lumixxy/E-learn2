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
      <Grid
        templateColumns={{ base: "1fr", md: "2fr 1fr" }}
        gap={6}
      >
        {/* Left Column */}
        <GridItem>
          <VStack spacing={6} align="stretch">
            <InProgressCoursesCard />
            <LearningGoalCard />
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <LearningPathCard />
              <TodaysPlanCard />
            </SimpleGrid>
            <CompletedCoursesCard />
          </VStack>
        </GridItem>

        {/* Right Column */}
        <GridItem>
          <VStack spacing={6} align="stretch">
            <ProgressAnalyticsCard />
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default MyLearning;