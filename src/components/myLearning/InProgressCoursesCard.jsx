import React from "react";
import { Box, Text, Image, Progress, Button, useColorModeValue, SimpleGrid } from "@chakra-ui/react";
import Card from "../card/Card";
import { Link } from "react-router-dom";

const courses = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
    progress: 45,
    lessons: 12426,
    lastViewed: "1 week ago"
  },
  {
    id: "2",
    title: "UI/UX Design Masterclass",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    progress: 22,
    lessons: 542,
    lastViewed: "2 days ago"
  },
  {
    id: "3",
    title: "Data Science and Machine Learning",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
    progress: 65,
    lessons: 3245,
    lastViewed: "Today"
  }
];

const InProgressCoursesCard = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const textColorSecondary = useColorModeValue("gray.500", "whiteAlpha.700");
  const textColorTertiary = useColorModeValue("gray.400", "whiteAlpha.600");
  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorder = useColorModeValue("gray.200", "gray.700");

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
                {course.lessons} lessons
              </Text>
              <Link to={`/admin/courses/${course.id}`}>
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
            </Box>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default InProgressCoursesCard; 