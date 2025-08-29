import React, { useState, useEffect } from "react";
import { Box, Text, Image, Progress, Button, useColorModeValue, SimpleGrid, Spinner, Center, HStack, Icon, Flex } from "@chakra-ui/react";
import Card from "../card/Card";
import { Link } from "react-router-dom";
import { useCompletedNodes } from "../../context/CompletedNodesContext";
import { FiBarChart2 } from "react-icons/fi";

const InProgressCoursesCard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { completedNodes, getRoadmapCompletionPercentage } = useCompletedNodes();

  const textColor = useColorModeValue("gray.700", "white");
  const textColorSecondary = useColorModeValue("gray.500", "whiteAlpha.700");
  const textColorTertiary = useColorModeValue("gray.400", "whiteAlpha.600");
  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorder = useColorModeValue("gray.200", "gray.700");

  // Fetch in-progress courses data from JSON file (simulating API call)
  useEffect(() => {
    const fetchCoursesData = async () => {
      try {
        setLoading(true);
        // Simulate API call with a small delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const response = await fetch('/inProgressCourses.json');
        if (!response.ok) {
          throw new Error('Failed to fetch courses data');
        }
        
        const data = await response.json();
        
        // Update courses with dynamic progress from CompletedNodesContext
        const updatedCourses = data.map(course => {
          // If the course has a roadmapId, use the completion percentage from context
          if (course.roadmapId) {
            const totalNodes = course.totalNodes || 20; // Fallback to 20 if not specified
            const progress = getRoadmapCompletionPercentage(course.roadmapId, totalNodes);
            return {
              ...course,
              progress: progress
            };
          }
          return course;
        });
        
        setCourses(updatedCourses);
      } catch (err) {
        console.error('Error fetching courses data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoursesData();
  }, [completedNodes, getRoadmapCompletionPercentage]);

  if (loading) {
    return (
      <Box>
        <Text fontWeight="bold" fontSize="lg" mb={6} color={textColor}>In Progress</Text>
        <Center py={8}>
          <Spinner size="lg" color="blue.500" />
        </Center>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Text fontWeight="bold" fontSize="lg" mb={6} color={textColor}>In Progress</Text>
        <Center py={8}>
          <Text color="red.500">Error loading courses: {error}</Text>
        </Center>
      </Box>
    );
  }

  return (
    <Box>
      <Text fontWeight="bold" fontSize="lg" mb={6} color={textColor}>In Progress</Text>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={6}
        width="100%"
      >
        {courses.map((course, idx) => (
          <Card
            key={idx}
            p={0}
            bg={cardBg}
            border="1px solid"
            borderColor={cardBorder}
            transition="all 0.3s ease"
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: "lg",
              borderColor: "blue.400"
            }}
            cursor="pointer"
          >
            <Image
              src={course.image}
              alt={course.title}
              borderTopRadius="lg"
              h="160px"
              w="full"
              objectFit="cover"
            />
            <Box p={5}>
              <Text fontWeight="semibold" mb={2} color={textColor} noOfLines={2}>
                {course.title}
              </Text>
              <Text fontSize="sm" color={textColorSecondary} mb={3}>
                Last viewed: {course.lastViewed}
              </Text>
              <Progress
                value={course.progress}
                size="sm"
                colorScheme="blue"
                mb={3}
                borderRadius="full"
              />
              <Text fontSize="sm" color={textColorTertiary} mb={4}>
                {course.progress}% completed • {course.lessons} lessons
              </Text>
              <Flex gap={2}>
                <Link to={`/admin/courses/${course.id}`} style={{ flex: 1 }}>
                  <Button
                    colorScheme="blue"
                    size="md"
                    w="full"
                    _hover={{
                      transform: "scale(1.02)",
                      transition: "transform 0.2s ease"
                    }}
                  >
                    Continue Learning
                  </Button>
                </Link>
                <Link to={`/admin/courses/${course.id}/analytics`}>
                  <Button
                    variant="outline"
                    colorScheme="blue"
                    size="md"
                    _hover={{
                      transform: "scale(1.02)",
                      transition: "transform 0.2s ease"
                    }}
                  >
                    <Icon as={FiBarChart2} />
                  </Button>
                </Link>
              </Flex>
            </Box>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default InProgressCoursesCard;