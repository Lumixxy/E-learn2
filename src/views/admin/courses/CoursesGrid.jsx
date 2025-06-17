import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardBody,
  Text,
  VStack,
  HStack,
  Button,
  Image,
  Badge,
  Flex,
  Tag,
  SimpleGrid,
  useColorModeValue,
  Icon,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { loadCourseData } from 'utils/courseDataLoader';
import CourseDialog from 'components/course/CourseDialog';

const CourseCard = ({ 
  title, 
  description, 
  instructor, 
  rating, 
  totalRatings, 
  duration, 
  lectures, 
  level, 
  price, 
  imageUrl,
  tags,
  id 
}) => {
  const cardBg = useColorModeValue("white", "navy.800");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const subtextColor = useColorModeValue("gray.600", "gray.400");
  
  return (
    <Card bg={cardBg} borderRadius="xl" boxShadow="lg" overflow="hidden" _hover={{ boxShadow: "xl" }} transition="all 0.2s">
      <Image src={imageUrl} alt={title} h="200px" w="100%" objectFit="cover" />
      <CardBody p={6}>
        <VStack align="start" spacing={3}>
          <Text fontSize="lg" fontWeight="bold" color={textColor} noOfLines={2}>
            {title}
          </Text>
          <Text fontSize="sm" color={subtextColor} noOfLines={3}>
            {description}
          </Text>
          <Text fontSize="xs" color={subtextColor}>
            {instructor}
          </Text>
          
          {tags && (
            <HStack spacing={2} mb={2}>
              {tags.map((tag, idx) => (
                <Tag key={idx} size="sm" variant="subtle" colorScheme="gray">
                  {tag.trim()}
                </Tag>
              ))}
            </HStack>
          )}
          
          <HStack spacing={2} flexWrap="wrap">
            <HStack spacing={1}>
              <Icon as={StarIcon} color="yellow.400" w={3} h={3} />
              <Text fontSize="sm" fontWeight="medium" color={textColor}>
                {rating}
              </Text>
            </HStack>
            <Text fontSize="xs" color={subtextColor}>
              ({totalRatings?.toLocaleString() || 0} ratings)
            </Text>
            <Text fontSize="xs" color={subtextColor}>•</Text>
            <Text fontSize="xs" color={subtextColor}>{duration}</Text>
            <Text fontSize="xs" color={subtextColor}>•</Text>
            <Text fontSize="xs" color={subtextColor}>{lectures} lectures</Text>
            <Text fontSize="xs" color={subtextColor}>•</Text>
            <Badge colorScheme="gray" size="sm">{level}</Badge>
          </HStack>
          
          <Flex justify="space-between" align="center" w="100%" pt={2}>
            <Text fontSize="lg" fontWeight="bold" color={textColor}>
              {price}
            </Text>
            <Link to={`/admin/courses/${id}/enroll`}>
              <Button colorScheme="purple" size="sm" borderRadius="md">
                Enroll Now
              </Button>
            </Link>
          </Flex>
        </VStack>
      </CardBody>
    </Card>
  );
};

const CoursesGrid = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const toast = useToast();
  const bgColor = useColorModeValue("gray.50", "navy.900");

  useEffect(() => {
    console.log('CoursesGrid mounted');
    const fetchCourses = () => {
      try {
        console.log('Fetching courses...');
        const courseData = loadCourseData();
        console.log('Course data loaded:', courseData);
        setCourses(courseData);
        setError(null);
      } catch (err) {
        console.error('Error in fetchCourses:', err);
        setError('Failed to load courses');
        toast({
          title: "Error loading courses",
          description: "Please try again later",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [toast]);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedCourse(null);
  };

  if (loading) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={4}>
          <Spinner size="xl" color="blue.500" />
          <Text>Loading courses...</Text>
        </VStack>
      </Box>
    );
  }

  if (error) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={4}>
          <Text color="red.500" fontSize="xl">{error}</Text>
          <Button colorScheme="blue" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </VStack>
      </Box>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={4}>
          <Text fontSize="xl">No courses available</Text>
          <Button colorScheme="blue" onClick={() => window.location.reload()}>
            Refresh
          </Button>
        </VStack>
      </Box>
    );
  }

  return (
    <Box w="100%" minH="100vh" bg={bgColor} p={6}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {courses.map((course) => (
          <Box key={course.id} onClick={() => handleCourseClick(course)} cursor="pointer">
            <CourseCard {...course} />
          </Box>
        ))}
      </SimpleGrid>

      {selectedCourse && (
        <CourseDialog
          isOpen={isDialogOpen}
          onClose={handleDialogClose}
          courseId={selectedCourse.id}
        />
      )}
    </Box>
  );
};

export default CoursesGrid; 