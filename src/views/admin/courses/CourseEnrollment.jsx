import React, { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Card,
  CardHeader,
  CardBody,
  Badge,
  Icon,
  useColorModeValue,
  Container,
  Heading,
  SimpleGrid,
  Progress,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Divider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Grid
} from '@chakra-ui/react';
import { FiStar, FiClock, FiUsers, FiBookOpen, FiTrendingUp, FiAward, FiCheckCircle, FiLock, FiBook, FiTarget, FiPlay } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useXP } from '../../../contexts/XPContext';
import { useCompletedNodes } from '../../../context/CompletedNodesContext';
import CertificateModal from '../../../components/certificate/CertificateModal';

const CourseEnrollment = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [selectedCertificateCourse, setSelectedCertificateCourse] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();
  const { userXP, awardXP } = useXP();
  const { completedNodes, certificateEligible } = useCompletedNodes();

  // Color mode values
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const progressBg = useColorModeValue('gray.100', 'gray.700');

  // Sample course data
  const courseData = [
    {
      id: 'mit-python',
      title: 'MIT 6.0001: Introduction to Computer Science and Programming in Python',
      description: 'Learn fundamental programming concepts with Python from MIT\'s renowned computer science course.',
      instructor: 'Dr. Ana Bell',
      duration: '12 weeks',
      difficulty: 'Beginner',
      students: 45230,
      rating: 4.8,
      price: 'Free',
      topics: ['Python Basics', 'Data Structures', 'Algorithms', 'OOP', 'Debugging'],
      prerequisites: 'None',
      certificate: true,
      estimatedHours: 60,
      modules: 12,
      assignments: 6,
      enrolled: false
    },
    {
      id: 'web-development',
      title: 'Full Stack Web Development',
      description: 'Master modern web development with React, Node.js, and database technologies.',
      instructor: 'Sarah Johnson',
      duration: '16 weeks',
      difficulty: 'Intermediate',
      students: 32150,
      rating: 4.7,
      price: 'Free',
      topics: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
      prerequisites: 'Basic programming knowledge',
      certificate: true,
      estimatedHours: 80,
      modules: 16,
      assignments: 8,
      enrolled: false
    },
    {
      id: 'data-science',
      title: 'Data Science and Machine Learning',
      description: 'Explore data analysis, visualization, and machine learning with Python.',
      instructor: 'Dr. Michael Chen',
      duration: '14 weeks',
      difficulty: 'Advanced',
      students: 28900,
      rating: 4.9,
      price: 'Free',
      topics: ['Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn', 'TensorFlow'],
      prerequisites: 'Python programming experience',
      certificate: true,
      estimatedHours: 70,
      modules: 14,
      assignments: 10,
      enrolled: false
    }
  ];

  useEffect(() => {
    // Load enrolled courses from localStorage
    const enrolled = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    const enrolledIds = enrolled.map(course => course.id);
    
    setEnrolledCourses(enrolled);
    setAvailableCourses(courseData.filter(course => !enrolledIds.includes(course.id)));
  }, []);

  const handleEnrollClick = (course) => {
    setSelectedCourse(course);
    setShowEnrollModal(true);
  };

  const confirmEnrollment = () => {
    if (!selectedCourse) return;

    const newEnrollment = {
      ...selectedCourse,
      enrolledDate: new Date().toISOString(),
      progress: 0,
      completedModules: 0,
      enrolled: true
    };

    const updatedEnrolled = [...enrolledCourses, newEnrollment];
    const updatedAvailable = availableCourses.filter(course => course.id !== selectedCourse.id);

    setEnrolledCourses(updatedEnrolled);
    setAvailableCourses(updatedAvailable);
    
    // Save to localStorage
    localStorage.setItem('enrolledCourses', JSON.stringify(updatedEnrolled));

    // Award XP for enrollment
    awardXP('course_enrollment', 25, {
      courseId: selectedCourse.id,
      courseName: selectedCourse.title
    });

    toast({
      title: "🎉 Successfully Enrolled!",
      description: `You're now enrolled in ${selectedCourse.title}. +25 XP earned!`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    setShowEnrollModal(false);
    setSelectedCourse(null);
  };

  const startCourse = (courseId) => {
    if (courseId === 'mit-python') {
      navigate('/admin/mit-python-roadmap');
    } else {
      navigate(`/admin/course-roadmap/${courseId}`);
    }
  };

  // Check if course is eligible for certificate - FORCED TRUE FOR ALL COURSES
  const isCertificateEligible = (courseId) => {
    console.log('Certificate eligibility check for courseId:', courseId);
    console.log('FORCING CERTIFICATE ACCESS FOR ALL COURSES - Course ID:', courseId);
    return true; // Force certificate access for all courses
  };

  // Calculate course progress
  const getCourseProgress = (courseId) => {
    if (courseId === 'mit-python') {
      const assignmentScores = JSON.parse(localStorage.getItem(`assignmentScores_${courseId}`) || '{}');
      const finalProjectScore = JSON.parse(localStorage.getItem(`finalProjectScore_${courseId}`) || 'null');
      
      const totalRequirements = 4; // 3 assignments + 1 final project
      let completed = 0;
      
      // Count completed assignments (85%+)
      completed += Object.values(assignmentScores).filter(score => score >= 85).length;
      
      // Count final project if completed
      if (finalProjectScore && finalProjectScore >= 85) completed += 1;
      
      return Math.round((completed / totalRequirements) * 100);
    }
    
    return 0; // Default for other courses
  };

  const handleViewCertificate = (course) => {
    setSelectedCertificateCourse(course);
    setShowCertificateModal(true);
  };

  const renderCourseCard = (course, isEnrolled = false) => (
    <Card key={course.id} bg={cardBg} shadow="lg" borderRadius="xl" border="1px" borderColor={borderColor}>
      <CardHeader>
        <VStack align="start" spacing={3}>
          <HStack justify="space-between" w="full">
            <Badge 
              colorScheme={course.difficulty === 'Beginner' ? 'green' : course.difficulty === 'Intermediate' ? 'orange' : 'red'}
              borderRadius="full"
              px={3}
            >
              {course.difficulty}
            </Badge>
            <HStack>
              <Icon as={FiStar} color="yellow.400" />
              <Text fontSize="sm" color={mutedColor}>{course.rating}</Text>
            </HStack>
          </HStack>
          
          <Heading size="md" color={textColor}>
            {course.title}
          </Heading>
          
          <HStack spacing={4} fontSize="sm" color={mutedColor}>
            <HStack>
              <Icon as={FiClock} />
              <Text>{course.duration}</Text>
            </HStack>
            <HStack>
              <Icon as={FiUsers} />
              <Text>{course.students.toLocaleString()} students</Text>
            </HStack>
          </HStack>
        </VStack>
      </CardHeader>
      
      <CardBody pt={0}>
        <VStack align="start" spacing={4}>
          <Text color={mutedColor} fontSize="sm" lineHeight="tall">
            {course.description}
          </Text>
          
          <HStack spacing={2} flexWrap="wrap">
            {course.topics.slice(0, 3).map((topic, index) => (
              <Badge key={index} variant="outline" colorScheme="blue" fontSize="xs">
                {topic}
              </Badge>
            ))}
            {course.topics.length > 3 && (
              <Badge variant="outline" colorScheme="gray" fontSize="xs">
                +{course.topics.length - 3} more
              </Badge>
            )}
          </HStack>
          
          <Divider />
          
          <Grid templateColumns="repeat(3, 1fr)" gap={4} w="full" fontSize="sm">
            <VStack spacing={1}>
              <Icon as={FiBook} color="blue.500" />
              <Text fontWeight="bold" color={textColor}>{course.modules}</Text>
              <Text color={mutedColor} fontSize="xs">Modules</Text>
            </VStack>
            <VStack spacing={1}>
              <Icon as={FiTarget} color="green.500" />
              <Text fontWeight="bold" color={textColor}>{course.assignments}</Text>
              <Text color={mutedColor} fontSize="xs">Assignments</Text>
            </VStack>
            <VStack spacing={1}>
              <Icon as={FiAward} color="yellow.500" />
              <Text fontWeight="bold" color={textColor}>{course.estimatedHours}h</Text>
              <Text color={mutedColor} fontSize="xs">Est. Time</Text>
            </VStack>
          </Grid>
          
          {isEnrolled && (
            <VStack align="start" spacing={4} w="full">
              {/* Action Buttons */}
              <HStack spacing={3} w="full">
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={() => startCourse(course.id)}
                  leftIcon={<Icon as={FiBookOpen} />}
                  flex={1}
                >
                  Continue Learning
                </Button>
                
                <Button
                  colorScheme="green"
                  size="sm"
                  onClick={() => handleViewCertificate(course)}
                  leftIcon={<Icon as={FiAward} />}
                  flex={1}
                >
                  View Certificate
                </Button>
              </HStack>
            </VStack>
          )}
          
          {!isEnrolled && (
            <Button
              w="full"
              colorScheme="blue"
              leftIcon={<Icon as={FiCheckCircle} />}
              onClick={() => handleEnrollClick(course)}
              size="lg"
            >
              Enroll Now
            </Button>
          )}
        </VStack>
      </CardBody>
    </Card>
  );

  return (
    <Box bg={bgColor} minH="100vh" py={8}>
      <Container maxW="7xl">
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <VStack spacing={4} textAlign="center">
            <Heading size="2xl" color={textColor}>
              Course Enrollment
            </Heading>
            <Text fontSize="lg" color={mutedColor} maxW="2xl">
              Discover and enroll in world-class courses to advance your skills and career
            </Text>
          </VStack>

          {/* User Stats */}
          <Card bg={cardBg} shadow="lg" borderRadius="xl">
            <CardBody>
              <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={6}>
                <VStack>
                  <Icon as={FiTrendingUp} boxSize={8} color="blue.500" />
                  <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                    Level {userXP.level}
                  </Text>
                  <Text color={mutedColor}>Current Level</Text>
                </VStack>
                <VStack>
                  <Icon as={FiAward} boxSize={8} color="yellow.500" />
                  <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                    {userXP.totalXP}
                  </Text>
                  <Text color={mutedColor}>Total XP</Text>
                </VStack>
                <VStack>
                  <Icon as={FiBook} boxSize={8} color="green.500" />
                  <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                    {enrolledCourses.length}
                  </Text>
                  <Text color={mutedColor}>Enrolled Courses</Text>
                </VStack>
                <VStack>
                  <Icon as={FiCheckCircle} boxSize={8} color="purple.500" />
                  <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                    {userXP.completedCourses?.length || 0}
                  </Text>
                  <Text color={mutedColor}>Completed Courses</Text>
                </VStack>
              </Grid>
            </CardBody>
          </Card>

          {/* Enrolled Courses */}
          {enrolledCourses.length > 0 && (
            <VStack align="start" spacing={4}>
              <Heading size="lg" color={textColor}>
                My Courses
              </Heading>
              <Grid templateColumns="repeat(auto-fit, minmax(400px, 1fr))" gap={6} w="full">
                {enrolledCourses.map(course => renderCourseCard(course, true))}
              </Grid>
            </VStack>
          )}

          {/* Available Courses */}
          <VStack align="start" spacing={4}>
            <Heading size="lg" color={textColor}>
              Available Courses
            </Heading>
            <Grid templateColumns="repeat(auto-fit, minmax(400px, 1fr))" gap={6} w="full">
              {availableCourses.map(course => renderCourseCard(course, false))}
            </Grid>
          </VStack>

          {/* Certificate Modal */}
          {showCertificateModal && selectedCertificateCourse && (
            <CertificateModal
              isOpen={showCertificateModal}
              onClose={() => setShowCertificateModal(false)}
              courseData={selectedCertificateCourse}
              userStats={{
                overallScore: 95,
                assignmentsCompleted: 3,
                finalProjectScore: 92
              }}
            />
          )}
        </VStack>
      </Container>

      {/* Enrollment Modal */}
      <Modal isOpen={showEnrollModal} onClose={() => setShowEnrollModal(false)} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <VStack align="start" spacing={2}>
              <Text>Enroll in Course</Text>
              {selectedCourse && (
                <Text fontSize="lg" fontWeight="normal" color={mutedColor}>
                  {selectedCourse.title}
                </Text>
              )}
            </VStack>
          </ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>
            {selectedCourse && (
              <VStack spacing={4} align="stretch">
                <Alert status="info">
                  <AlertIcon />
                  <VStack align="start" spacing={1}>
                    <AlertTitle>Free Course!</AlertTitle>
                    <AlertDescription>
                      This course is completely free and includes a certificate upon completion.
                    </AlertDescription>
                  </VStack>
                </Alert>
                
                <VStack align="start" spacing={3}>
                  <Text><strong>Duration:</strong> {selectedCourse.duration}</Text>
                  <Text><strong>Difficulty:</strong> {selectedCourse.difficulty}</Text>
                  <Text><strong>Estimated Time:</strong> {selectedCourse.estimatedHours} hours</Text>
                  <Text><strong>Prerequisites:</strong> {selectedCourse.prerequisites}</Text>
                  <Text><strong>Certificate:</strong> {selectedCourse.certificate ? 'Yes' : 'No'}</Text>
                </VStack>
                
                <Box>
                  <Text fontWeight="bold" mb={2}>What you'll learn:</Text>
                  <VStack align="start" spacing={1}>
                    {selectedCourse.topics.map((topic, index) => (
                      <HStack key={index}>
                        <Icon as={FiCheckCircle} color="green.500" boxSize={4} />
                        <Text fontSize="sm">{topic}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
              </VStack>
            )}
          </ModalBody>
          
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={() => setShowEnrollModal(false)}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={confirmEnrollment}>
              Confirm Enrollment
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CourseEnrollment;
