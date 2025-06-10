import React from "react";
import { Box, Text, HStack, Image, Progress, Button, useColorModeValue } from "@chakra-ui/react";
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

  return (
    <Box>
      <Text fontWeight="bold" fontSize="lg" mb={3} color={textColor}>In Progress</Text>
      <HStack spacing={4} overflowX="auto">
        {courses.map((course, idx) => (
          <Card key={idx} minW="300px" maxW="300px" p={0}>
            <Image src={course.image} alt={course.title} borderTopRadius="lg" h="120px" w="full" objectFit="cover" />
            <Box p={4}>
              <Text fontWeight="semibold" mb={1} color={textColor}>{course.title}</Text>
              <Text fontSize="xs" color={textColorSecondary} mb={2}>Last viewed: {course.lastViewed}</Text>
              <Progress value={course.progress} size="sm" colorScheme="blue" mb={2} />
              <Text fontSize="xs" color={textColorTertiary} mb={2}>{course.lessons} lessons</Text>
              <Link to={`/admin/courses/${course.id}`}>
                <Button colorScheme="blue" size="sm" w="full">Continue Learning</Button>
              </Link>
            </Box>
          </Card>
        ))}
      </HStack>
    </Box>
  );
};

export default InProgressCoursesCard; 