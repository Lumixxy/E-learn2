import React, { useState } from "react";
import { Box, VStack, SimpleGrid, useColorModeValue, Grid, GridItem, Tabs, TabList, TabPanels, Tab, TabPanel, Heading, Flex, Button, Icon } from "@chakra-ui/react";
import InProgressCoursesCard from "../../../components/myLearning/InProgressCoursesCard";
import LearningGoalCard from "../../../components/myLearning/LearningGoalCard";
import LearningPathCard from "../../../components/myLearning/LearningPathCard";
import TodaysPlanCard from "../../../components/myLearning/TodaysPlanCard";
import ProgressAnalyticsCard from "../../../components/myLearning/ProgressAnalyticsCard";
import CompletedCoursesCard from "../../../components/myLearning/CompletedCoursesCard";
import AdvancedAnalyticsDashboard from "../../../components/analytics/AdvancedAnalyticsDashboard";
import { MdInsights, MdDashboard } from "react-icons/md";

const MyLearning = () => {
  const bgColor = useColorModeValue("gray.50", "navy.900");
  const [activeTab, setActiveTab] = useState(0);
  const accentColor = useColorModeValue("blue.500", "blue.300");

  return (
    <Box minH="100vh" bg={bgColor} p={4}>
      <Tabs variant="soft-rounded" colorScheme="blue" onChange={(index) => setActiveTab(index)} mb={6}>
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Heading size="lg" fontWeight="bold" color={useColorModeValue("gray.700", "white")}>
            My Learning
          </Heading>
          <TabList>
            <Tab>
              <Icon as={MdDashboard} mr={2} />
              Dashboard
            </Tab>
            <Tab>
              <Icon as={MdInsights} mr={2} />
              Advanced Analytics
            </Tab>
          </TabList>
        </Flex>
        
        <TabPanels>
          <TabPanel p={0}>
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
          </TabPanel>
          <TabPanel p={0}>
            <AdvancedAnalyticsDashboard isCourseSpecific={false} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default MyLearning;