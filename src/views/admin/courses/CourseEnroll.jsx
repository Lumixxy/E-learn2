import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Button,
  Image,
  Badge,
  Progress,
  Divider,
  Card,
  CardBody,
  useColorModeValue,
  Icon,
  List,
  ListItem,
  ListIcon,
  useToast,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { FaCheck, FaClock, FaBook, FaCertificate, FaStar, FaLock } from 'react-icons/fa';
import { loadCourseById } from 'utils/courseDataLoader';

const CourseEnroll = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const toast = useToast();

  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    provider: '',
    modules: [],
    outcomes: [],
    certificates: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const course = await loadCourseById(courseId);
        if (!course) throw new Error('Course not found');
        // Normalize to existing shape used by the enroll page
        setCourseData({
          title: course.title,
          description: course.description,
          provider: course.instructor,
          price: course.price || 'Free',
          modules: course.modules?.map((m) => ({
            title: m.title,
            duration: m.duration || '—',
            content: m.description || '',
            topics: (m.lessons || []).map((l) => l.title),
          })) || [],
          outcomes: [],
          certificates: [],
        });
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [courseId]);

  // Color mode values
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const mutedColor = useColorModeValue("gray.600", "gray.400");

  const handleEnroll = () => {
    setIsEnrolled(true);
    toast({
      title: "Enrollment Successful!",
      description: "You can now start learning!",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  const handleStartCourse = () => {
    navigate(`/admin/courses/${courseId}/roadmap`);
  };

  if (loading) {
    return <Box minH="100vh" bg={bgColor} py={8} display="flex" justifyContent="center" alignItems="center">
      <Text fontSize="2xl">Loading course data...</Text>
    </Box>;
  }

  if (error) {
    return <Box minH="100vh" bg={bgColor} py={8} display="flex" justifyContent="center" alignItems="center">
      <Text fontSize="2xl" color="red.300">{error}</Text>
    </Box>;
  }

  if (!courseData || Object.keys(courseData).length === 0) {
    return <Box minH="100vh" bg={bgColor} py={8} display="flex" justifyContent="center" alignItems="center">
      <Text fontSize="2xl">No course data found.</Text>
    </Box>;
  }

  return (
    <Box minH="100vh" bg={bgColor} py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          {/* Enrollment */}
          {!isEnrolled ? (
            <Card bg={cardBg} borderRadius="xl" overflow="hidden">
              <CardBody p={8}>
                <VStack spacing={6} align="stretch">
                  <Box>
                    <HStack spacing={4} mb={2}>
                      <Image src="https://via.placeholder.com/60x60/1f77b4/ffffff?text=MIT" alt="MIT" w="60px" h="60px" />
                      <Text fontSize="sm" color={mutedColor}>{courseData.provider}</Text>
                    </HStack>
                    <Text fontSize="3xl" fontWeight="bold" color={textColor} mb={4}>
                      {courseData.title}
                    </Text>
                    <Text fontSize="lg" color={mutedColor} mb={4}>
                      {courseData.description}
                    </Text>
                  </Box>
                  <Button colorScheme="purple" size="lg" onClick={handleEnroll}>
                    Enroll Now - {courseData.price}
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          ) : (
            <Card bg={cardBg} borderRadius="xl" overflow="hidden">
              <CardBody p={8}>
                <VStack spacing={6} align="stretch">
                  <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                    Enrollment Successful!
                  </Text>
                  <Button colorScheme="green" size="lg" onClick={handleStartCourse}>
                    Start Course
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          )}

          {/* Course Content */}
          <Card bg={cardBg} borderRadius="xl">
            <CardBody p={8}>
              <VStack spacing={8} align="stretch">
                <Box>
                  <Text fontSize="2xl" fontWeight="bold" color={textColor} mb={4}>
                    What you'll learn
                  </Text>
                  <List spacing={3}>
                    {courseData.outcomes && courseData.outcomes.map((outcome, index) => (
                      <ListItem key={index}>
                        <ListIcon as={FaCheck} color="green.500" />
                        {outcome}
                      </ListItem>
                    ))}
                  </List>
                </Box>

                <Divider />

                <Box>
                  <Text fontSize="2xl" fontWeight="bold" color={textColor} mb={4}>
                    Course Content
                  </Text>
                  <VStack spacing={4} align="stretch">
                    {courseData.modules && courseData.modules.map((module, index) => (
                      <Card key={index} variant="outline">
                        <CardBody>
                          <VStack align="stretch" spacing={2}>
                            <HStack justify="space-between">
                              <Text fontWeight="bold" color={textColor}>
                                Module {index + 1}: {module.title}
                              </Text>
                              <Badge colorScheme="purple">{module.duration}</Badge>
                            </HStack>
                            <Text fontSize="sm" color={mutedColor} mb={2}>
                              {module.content}
                            </Text>
                            <List spacing={2}>
                              {module.topics.map((topic, topicIndex) => (
                                <ListItem key={topicIndex} color={mutedColor}>
                                  • {topic}
                                </ListItem>
                              ))}
                            </List>
                          </VStack>
                        </CardBody>
                      </Card>
                    ))}
                  </VStack>
                </Box>

                <Divider />

                <Box>
                  <Text fontSize="2xl" fontWeight="bold" color={textColor} mb={4}>
                    Certificates
                  </Text>
                  <VStack spacing={4} align="stretch">
                    {courseData.certificates && courseData.certificates.map((certificate, index) => (
                      <Card key={index} variant="outline">
                        <CardBody>
                          <HStack spacing={4}>
                            <Icon as={FaCertificate} w={8} h={8} color="purple.500" />
                            <Box>
                              <Text fontWeight="bold" color={textColor}>
                                {certificate.name}
                              </Text>
                              <Text color={mutedColor}>
                                {certificate.description}
                              </Text>
                            </Box>
                          </HStack>
                        </CardBody>
                      </Card>
                    ))}
                  </VStack>
                </Box>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </Box>
  );
};

export default CourseEnroll; 