import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import { FaCheck, FaClock, FaBook, FaCertificate, FaStar, FaLock } from 'react-icons/fa';

const CourseEnroll = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const toast = useToast();

  // Color mode values
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const mutedColor = useColorModeValue("gray.600", "gray.400");

  // Mock course data - replace with actual data from your backend
  const courseData = {
    title: "Introduction to Programming in Python",
    provider: "MIT OpenCourseWare",
    description: "Learn Python programming from scratch using MIT's open courseware materials. Master fundamental programming concepts, data structures, and algorithms using Python. Build real-world applications and prepare for a career in software development.",
    imageUrl: "https://via.placeholder.com/800x400",
    duration: "8 weeks",
    level: "Beginner",
    rating: 4.8,
    totalRatings: 1250,
    price: "Free",
    outcomes: [
      "Understand fundamental programming concepts",
      "Master Python syntax and data structures",
      "Build real-world applications",
      "Prepare for professional development",
      "Earn industry-recognized certificates"
    ],
    modules: [
      {
        title: "Introduction to Python",
        duration: "2 weeks",
        topics: [
          "Python basics and syntax",
          "Variables and data types",
          "Control structures",
          "Functions and modules"
        ],
        content: "Based on MIT's Introduction to Computer Science and Programming in Python"
      },
      {
        title: "Data Structures",
        duration: "2 weeks",
        topics: [
          "Lists and tuples",
          "Dictionaries and sets",
          "Stacks and queues",
          "Trees and graphs"
        ],
        content: "Based on MIT's Data Structures and Algorithms"
      },
      {
        title: "Object-Oriented Programming",
        duration: "2 weeks",
        topics: [
          "Classes and objects",
          "Inheritance and polymorphism",
          "Encapsulation and abstraction",
          "Design patterns"
        ],
        content: "Based on MIT's Object-Oriented Programming Concepts"
      },
      {
        title: "Final Project",
        duration: "2 weeks",
        topics: [
          "Project planning",
          "Implementation",
          "Testing and deployment",
          "Documentation"
        ],
        content: "Capstone project combining all learned concepts"
      }
    ],
    certificates: [
      {
        name: "PygenicArc Certificate",
        description: "Official completion certificate from PygenicArc"
      },
      {
        name: "MIT OpenCourseWare Certificate",
        description: "Completion certificate based on MIT's open courseware materials"
      }
    ]
  };

  const handleEnroll = () => {
    setIsEnrolled(true);
    toast({
      title: "Enrollment Successful!",
      description: "You have successfully enrolled in the course. You can now start learning!",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

  const handleStartCourse = () => {
    navigate(`/admin/courses/${courseId}/learn`);
  };

  return (
    <Box minH="100vh" bg={bgColor} py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          {/* Course Header */}
          <Card bg={cardBg} borderRadius="xl" overflow="hidden">
            <Image src={courseData.imageUrl} alt={courseData.title} h="400px" w="100%" objectFit="cover" />
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

                <HStack spacing={6} flexWrap="wrap">
                  <HStack>
                    <Icon as={FaClock} color={mutedColor} />
                    <Text color={mutedColor}>{courseData.duration}</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaBook} color={mutedColor} />
                    <Text color={mutedColor}>{courseData.level}</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaStar} color="yellow.400" />
                    <Text color={mutedColor}>{courseData.rating} ({courseData.totalRatings} ratings)</Text>
                  </HStack>
                </HStack>

                {!isEnrolled ? (
                  <Button colorScheme="purple" size="lg" onClick={handleEnroll}>
                    Enroll Now - {courseData.price}
                  </Button>
                ) : (
                  <Button colorScheme="green" size="lg" onClick={handleStartCourse}>
                    Start Course
                  </Button>
                )}
              </VStack>
            </CardBody>
          </Card>

          {/* Course Content */}
          <Card bg={cardBg} borderRadius="xl">
            <CardBody p={8}>
              <VStack spacing={8} align="stretch">
                <Box>
                  <Text fontSize="2xl" fontWeight="bold" color={textColor} mb={4}>
                    What you'll learn
                  </Text>
                  <List spacing={3}>
                    {courseData.outcomes.map((outcome, index) => (
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
                    {courseData.modules.map((module, index) => (
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
                    {courseData.certificates.map((certificate, index) => (
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