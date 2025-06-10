// Chakra imports
import { 
  Box, 
  Text, 
  useColorModeValue, 
  VStack, 
  HStack, 
  Progress, 
  Badge, 
  Icon,
  Flex,
  CircularProgress,
  CircularProgressLabel,
  SimpleGrid
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React from "react";
// Assets
import { MdSchool, MdTrophy, MdTimer, MdStar, MdBook, MdCheckCircle } from "react-icons/md";

export default function CourseProgress(props) {
  const { ...rest } = props;
  
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const brandColor = useColorModeValue("brand.500", "brand.400");
  const cardBg = useColorModeValue("white", "navy.800");
  const cardShadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  
  // Sample course data
  const courseStats = {
    completed: 12,
    inProgress: 3,
    total: 15,
    totalHours: 89,
    certificates: 8,
    averageScore: 87
  };
  
  const recentCourses = [
    {
      id: 1,
      title: "Advanced React Development",
      progress: 100,
      score: 95,
      completedDate: "2024-01-15",
      category: "Frontend",
      level: "Advanced"
    },
    {
      id: 2,
      title: "Data Structures & Algorithms",
      progress: 100,
      score: 88,
      completedDate: "2024-01-10",
      category: "Programming",
      level: "Intermediate"
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      progress: 75,
      score: null,
      completedDate: null,
      category: "Design",
      level: "Beginner"
    },
    {
      id: 4,
      title: "Node.js Backend Development",
      progress: 100,
      score: 92,
      completedDate: "2024-01-05",
      category: "Backend",
      level: "Intermediate"
    }
  ];
  
  const completionRate = Math.round((courseStats.completed / courseStats.total) * 100);
  
  return (
    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box>
          <Text
            color={textColorPrimary}
            fontWeight='bold'
            fontSize='2xl'
            mb='4px'>
            Course Progress
          </Text>
          <Text color={textColorSecondary} fontSize='md' mb='20px'>
            Track your learning journey and achievements
          </Text>
        </Box>
        
        {/* Overall Progress */}
        <Card bg={cardBg} p={6} boxShadow={cardShadow}>
          <Flex direction={{ base: "column", md: "row" }} align="center" justify="space-between">
            <VStack align="start" spacing={2} flex={1}>
              <HStack>
                <Icon as={MdTrophy} color={brandColor} w="20px" h="20px" />
                <Text color={textColorPrimary} fontWeight="bold">
                  Overall Progress
                </Text>
              </HStack>
              <Text color={textColorSecondary}>
                {courseStats.completed} of {courseStats.total} courses completed
              </Text>
            </VStack>
            <CircularProgress
              value={completionRate}
              color={brandColor}
              size="100px"
              thickness="8px"
            >
              <CircularProgressLabel>{completionRate}%</CircularProgressLabel>
            </CircularProgress>
          </Flex>
        </Card>

        {/* Stats Grid */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <Card bg={cardBg} p={4}>
            <VStack align="start" spacing={2}>
              <HStack>
                <Icon as={MdTimer} color={brandColor} w="20px" h="20px" />
                <Text color={textColorPrimary} fontWeight="bold">
                  Total Hours
                </Text>
              </HStack>
              <Text fontSize="2xl" fontWeight="bold" color={brandColor}>
                {courseStats.totalHours}
              </Text>
            </VStack>
          </Card>

          <Card bg={cardBg} p={4}>
            <VStack align="start" spacing={2}>
              <HStack>
                <Icon as={MdCheckCircle} color={brandColor} w="20px" h="20px" />
                <Text color={textColorPrimary} fontWeight="bold">
                  Certificates
                </Text>
              </HStack>
              <Text fontSize="2xl" fontWeight="bold" color={brandColor}>
                {courseStats.certificates}
              </Text>
            </VStack>
          </Card>

          <Card bg={cardBg} p={4}>
            <VStack align="start" spacing={2}>
              <HStack>
                <Icon as={MdStar} color={brandColor} w="20px" h="20px" />
                <Text color={textColorPrimary} fontWeight="bold">
                  Average Score
                </Text>
              </HStack>
              <Text fontSize="2xl" fontWeight="bold" color={brandColor}>
                {courseStats.averageScore}%
              </Text>
            </VStack>
          </Card>
        </SimpleGrid>

        {/* Recent Courses */}
        <Box>
          <Text color={textColorPrimary} fontWeight="bold" mb={4}>
            Recent Courses
          </Text>
          <VStack spacing={4}>
            {recentCourses.map((course) => (
              <Card key={course.id} bg={cardBg} p={4} w="100%">
                <VStack align="stretch" spacing={3}>
                  <Flex justify="space-between" align="center">
                    <Text color={textColorPrimary} fontWeight="bold">
                      {course.title}
                    </Text>
                    <Badge colorScheme={course.progress === 100 ? "green" : "blue"}>
                      {course.level}
                    </Badge>
                  </Flex>
                  <Progress
                    value={course.progress}
                    colorScheme={course.progress === 100 ? "green" : "blue"}
                    size="sm"
                  />
                  <Flex justify="space-between" color={textColorSecondary} fontSize="sm">
                    <Text>{course.category}</Text>
                    {course.score && <Text>Score: {course.score}%</Text>}
                  </Flex>
                </VStack>
              </Card>
            ))}
          </VStack>
        </Box>
      </VStack>
    </Card>
  );
} 