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
  useDisclosure,
  Alert,
  AlertIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { FaCheck, FaClock, FaBook, FaCertificate, FaStar, FaLock, FaGraduationCap } from 'react-icons/fa';
import { loadCourseById } from 'utils/courseDataLoader';
import FinalAssignment from '../../../components/roadmap/FinalAssignment';
import CourseProgressViz from '../../../components/course/CourseProgressViz';
import { useCompletedNodes } from '../../../context/CompletedNodesContext';
import { useXP } from '../../../contexts/XPContext';

// Helper function to generate dynamic course outcomes based on course content
const generateCourseOutcomes = (course) => {
  const outcomes = [];
  
  // Add skill-specific outcomes based on course tags/skillTag
  const skillTag = course.skillTag || course.category;
  if (skillTag) {
    switch (skillTag.toLowerCase()) {
      case 'html':
        outcomes.push('Master HTML5 semantic elements and structure');
        outcomes.push('Create responsive web layouts');
        outcomes.push('Implement forms and accessibility features');
        break;
      case 'css':
        outcomes.push('Style websites with advanced CSS techniques');
        outcomes.push('Create responsive designs with Flexbox and Grid');
        outcomes.push('Implement animations and transitions');
        break;
      case 'javascript':
        outcomes.push('Write modern JavaScript with ES6+ features');
        outcomes.push('Manipulate the DOM and handle events');
        outcomes.push('Work with APIs and asynchronous programming');
        break;
      case 'react':
        outcomes.push('Build interactive user interfaces with React');
        outcomes.push('Manage application state effectively');
        outcomes.push('Create reusable components and hooks');
        break;
      case 'python':
        outcomes.push('Write clean, efficient Python code');
        outcomes.push('Work with data structures and algorithms');
        outcomes.push('Build applications using Python frameworks');
        break;
      case 'java':
        outcomes.push('Develop robust Java applications');
        outcomes.push('Implement object-oriented programming concepts');
        outcomes.push('Work with Java frameworks and libraries');
        break;
      case 'nodejs':
      case 'node':
        outcomes.push('Build scalable server-side applications');
        outcomes.push('Work with databases and APIs');
        outcomes.push('Implement authentication and security');
        break;
      case 'database':
        outcomes.push('Design and optimize database schemas');
        outcomes.push('Write complex SQL queries');
        outcomes.push('Implement database security and performance tuning');
        break;
      default:
        outcomes.push(`Master ${skillTag} fundamentals and best practices`);
        outcomes.push(`Build real-world projects using ${skillTag}`);
        outcomes.push(`Advance your career in ${skillTag} development`);
    }
  }
  
  // Add general outcomes based on modules
  if (course.modules && course.modules.length > 0) {
    outcomes.push(`Complete ${course.modules.length} comprehensive modules`);
    outcomes.push('Work on hands-on projects and assignments');
  }
  
  // Add level-specific outcomes
  const level = course.level?.toLowerCase();
  if (level === 'beginner') {
    outcomes.push('Build a strong foundation for further learning');
  } else if (level === 'intermediate') {
    outcomes.push('Advance your existing skills to the next level');
  } else if (level === 'advanced') {
    outcomes.push('Master advanced concepts and industry best practices');
  }
  
  // Add certificate outcome
  outcomes.push('Earn an industry-recognized certificate upon completion');
  
  return outcomes;
};

// Helper function to format course price
const formatCoursePrice = (price, isFree) => {
  if (isFree || price === 0) return 'Free';
  if (price === null || price === undefined || typeof price !== 'number') return 'Free';
  return `₹${price.toLocaleString()}`;
};

const CourseEnroll = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [allAssignmentsCompleted, setAllAssignmentsCompleted] = useState(false);
  const [assignmentScores, setAssignmentScores] = useState({});
  const [finalProjectScore, setFinalProjectScore] = useState(null);
  const [overallGrade, setOverallGrade] = useState(null);
  
  // Get completed nodes from context
  const { 
    completedNodes, 
    isNodeCompleted, 
    nodeQuizzes,
    certificateEligible
  } = useCompletedNodes();
  
  // XP system integration
  const { userXP, getCurrentLevelInfo } = useXP();
  const levelInfo = getCurrentLevelInfo();

  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        console.log('CourseEnroll: Attempting to load course with ID:', courseId);
        const course = await loadCourseById(courseId);
        console.log('CourseEnroll: Course loaded:', course);
        if (!course) {
          console.error('CourseEnroll: Course not found for ID:', courseId);
          throw new Error('Course not found');
        }
        
        // Store the complete course data with enhanced outcomes
        const enhancedCourse = {
          ...course,
          // Generate dynamic learning outcomes based on course content
          outcomes: generateCourseOutcomes(course),
          // Ensure price formatting
          price: formatCoursePrice(course.price, course.isFree),
        };
        
        setCourseData(enhancedCourse);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
    
    // Check if all assignments are completed with at least 85% score
    // In a real app, this would fetch from a database
    const storedAssignmentScores = localStorage.getItem(`assignmentScores_${courseId}`);
    if (storedAssignmentScores) {
      const scores = JSON.parse(storedAssignmentScores);
      setAssignmentScores(scores);
      
      // Check if all assignments have a score of at least 85%
      const allPassed = Object.values(scores).every(score => score >= 85);
      setAllAssignmentsCompleted(allPassed && Object.keys(scores).length > 0);
    }
    
    // Check if final project is completed
    const storedFinalProjectScore = localStorage.getItem(`finalProjectScore_${courseId}`);
    if (storedFinalProjectScore) {
      const score = JSON.parse(storedFinalProjectScore);
      setFinalProjectScore(score);
      
      // Calculate overall grade if both assignments and final project are completed
      if (storedAssignmentScores) {
        const assignmentScores = JSON.parse(storedAssignmentScores);
        if (Object.keys(assignmentScores).length > 0) {
          const avgAssignmentScore = Object.values(assignmentScores).reduce((sum, score) => sum + score, 0) / Object.values(assignmentScores).length;
          // Overall grade: 60% assignments + 40% final project
          const overall = Math.round((avgAssignmentScore * 0.6) + (score * 0.4));
          setOverallGrade(overall);
        }
      }
    }
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
    // Map course IDs to their specific roadmap routes
    const courseRoutes = {
      'mit-python': '/admin/mit-python-roadmap',
      'python': '/admin/mit-python-roadmap', // Redirect python to MIT Python
      'html': '/admin/html-roadmap',
      'css': '/admin/css-roadmap',
      'nodejs': '/admin/nodejs-roadmap',
      'react': '/admin/react-roadmap'
    };
    
    const route = courseRoutes[courseId] || `/admin/courses/${courseId}/roadmap`;
    console.log('Navigating to course roadmap:', route);
    navigate(route);
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

  if (!courseData) {
    return <Box minH="100vh" bg={bgColor} py={8} display="flex" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl" color={textColor}>Course not found</Text>
        <Button onClick={() => navigate('/admin/courses')} colorScheme="blue">
          Browse All Courses
        </Button>
      </VStack>
    </Box>;
  }

  return (
    <Box minH="100vh" bg={bgColor} py={8}>
      <Container maxW="container.xl">
        {/* Final Assignment Modal */}
        <FinalAssignment 
          isOpen={isOpen} 
          onClose={onClose} 
          roadmapId={courseId} 
          courseId={courseId} 
        />
        <VStack spacing={8} align="stretch">
          {/* Enrollment */}
          {!isEnrolled ? (
            <Card bg={cardBg} borderRadius="xl" overflow="hidden" shadow="xl">
              <CardBody p={0}>
                <HStack spacing={0} align="stretch">
                  {/* Course Image */}
                  <Box position="relative" minW="300px" maxW="300px">
                    <Image 
                      src={courseData.image || courseData.imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop'} 
                      alt={courseData.title}
                      w="100%" 
                      h="250px" 
                      objectFit="cover"
                    />
                    {courseData.isFree && (
                      <Badge
                        position="absolute"
                        top={3}
                        left={3}
                        colorScheme="green"
                        borderRadius="full"
                        px={3}
                        py={1}
                        fontSize="sm"
                        fontWeight="bold"
                      >
                        FREE
                      </Badge>
                    )}
                  </Box>
                  
                  {/* Course Info */}
                  <VStack align="stretch" spacing={4} p={8} flex={1}>
                    <Box>
                      <HStack spacing={2} mb={2}>
                        <Text fontSize="sm" color={mutedColor}>{courseData.author || courseData.instructor || 'Course Instructor'}</Text>
                        {courseData.level && (
                          <Badge colorScheme={courseData.level.toLowerCase() === 'beginner' ? 'green' : courseData.level.toLowerCase() === 'intermediate' ? 'yellow' : 'red'} size="sm">
                            {courseData.level}
                          </Badge>
                        )}
                      </HStack>
                      <Text fontSize="3xl" fontWeight="bold" color={textColor} mb={3}>
                        {courseData.title}
                      </Text>
                      
                      {/* Rating */}
                      {courseData.rating && (
                        <HStack spacing={2} mb={3}>
                          <HStack spacing={1}>
                            {[...Array(5)].map((_, i) => (
                              <Icon key={i} as={FaStar} color={i < Math.floor(courseData.rating) ? "yellow.400" : "gray.300"} />
                            ))}
                          </HStack>
                          <Text fontSize="sm" color={mutedColor}>({courseData.rating.toFixed(1)})</Text>
                          {courseData.totalRatings && (
                            <Text fontSize="sm" color={mutedColor}>• {courseData.totalRatings.toLocaleString()} students
                            </Text>
                          )}
                        </HStack>
                      )}
                      
                      <Text fontSize="lg" color={mutedColor} mb={4} noOfLines={3}>
                        {courseData.description}
                      </Text>
                      
                      {/* Course Stats */}
                      <HStack spacing={6} mb={4} flexWrap="wrap">
                        {courseData.duration && (
                          <HStack spacing={1}>
                            <Icon as={FaClock} color={mutedColor} />
                            <Text fontSize="sm" color={mutedColor}>{courseData.duration}</Text>
                          </HStack>
                        )}
                        {courseData.modules && (
                          <HStack spacing={1}>
                            <Icon as={FaBook} color={mutedColor} />
                            <Text fontSize="sm" color={mutedColor}>{courseData.modules.length} modules</Text>
                          </HStack>
                        )}
                        <HStack spacing={1}>
                          <Icon as={FaCertificate} color={mutedColor} />
                          <Text fontSize="sm" color={mutedColor}>Certificate included</Text>
                        </HStack>
                      </HStack>
                      
                      {/* Tags */}
                      {courseData.tags && courseData.tags.length > 0 && (
                        <HStack spacing={2} mb={4} flexWrap="wrap">
                          {courseData.tags.slice(0, 4).map((tag, index) => (
                            <Badge key={index} variant="subtle" colorScheme="blue" fontSize="xs">
                              {tag}
                            </Badge>
                          ))}
                        </HStack>
                      )}
                    </Box>
                    
                    <VStack align="stretch" spacing={3}>
                      <HStack justify="space-between" align="center">
                        <Text fontSize="2xl" fontWeight="bold" color="green.500">
                          {courseData.price}
                        </Text>
                        {courseData.originalPrice && courseData.originalPrice > (courseData.price || 0) && (
                          <Text fontSize="lg" textDecoration="line-through" color={mutedColor}>
                            ₹{typeof courseData.originalPrice === 'number' ? courseData.originalPrice.toLocaleString() : '0'}
                          </Text>
                        )}
                      </HStack>
                      <Button colorScheme="purple" size="lg" onClick={handleEnroll} w="100%">
                        Enroll Now
                      </Button>
                    </VStack>
                  </VStack>
                </HStack>
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
                        <Text as="span" fontSize="md">{outcome}</Text>
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
                          <VStack align="stretch" spacing={3}>
                            <HStack justify="space-between">
                              <Text fontWeight="bold" color={textColor} fontSize="lg">
                                Module {index + 1}: {module.title}
                              </Text>
                              <Badge colorScheme="purple" px={3} py={1} borderRadius="full">
                                {module.duration || '30 min'}
                              </Badge>
                            </HStack>
                            {module.description && (
                              <Text fontSize="sm" color={mutedColor} mb={2}>
                                {module.description}
                              </Text>
                            )}
                            {module.lessons && module.lessons.length > 0 && (
                              <Box>
                                <Text fontSize="sm" fontWeight="semibold" color={textColor} mb={2}>
                                  Lessons ({module.lessons.length}):
                                </Text>
                                <List spacing={1}>
                                  {module.lessons.slice(0, 5).map((lesson, lessonIndex) => (
                                    <ListItem key={lessonIndex} color={mutedColor} fontSize="sm">
                                      • {lesson.title}
                                    </ListItem>
                                  ))}
                                  {module.lessons.length > 5 && (
                                    <ListItem color={mutedColor} fontSize="sm" fontStyle="italic">
                                      • +{module.lessons.length - 5} more lessons
                                    </ListItem>
                                  )}
                                </List>
                              </Box>
                            )}
                          </VStack>
                        </CardBody>
                      </Card>
                    ))}
                  </VStack>
                </Box>

                <Divider />
                
                <Box>
                  {/* Learning Progress Visualization */}
                  <CourseProgressViz
                    courseId={courseId}
                    totalNodes={courseData.modules?.length || 0}
                    completedNodes={Array.isArray(completedNodes) ? completedNodes.filter(node => node.startsWith(courseId)) : []}
                    assignmentScores={assignmentScores}
                    quizScores={Object.fromEntries(
                      Object.entries(nodeQuizzes || {})
                        .filter(([nodeId]) => nodeId.startsWith(courseId) && isNodeCompleted?.(courseId, nodeId))
                        .map(([nodeId, score]) => [nodeId, score || Math.floor(Math.random() * 16) + 85])
                    )}
                    isEligibleForCertificate={certificateEligible}
                    onNodeClick={(index) => {
                      // Navigate to the specific module
                      if (courseData.modules && courseData.modules[index]) {
                        navigate(`/admin/courses/${courseId}/roadmap`);
                      }
                    }}
                  />
                </Box>
                
                <Divider />
                
                <Box>
                  <Text fontSize="2xl" fontWeight="bold" color={textColor} mb={4}>
                    Final Project
                  </Text>
                  <Card variant="outline" borderColor="purple.200" bg="purple.50" mb={6}>
                    <CardBody>
                      <HStack spacing={4}>
                        <Icon as={FaGraduationCap} w={8} h={8} color="purple.500" />
                        <Box>
                          <Text fontWeight="bold" color="purple.700">
                            Comprehensive Final Project
                          </Text>
                          <Text color={mutedColor}>
                            Complete this final project to demonstrate your mastery of all course concepts. 
                            Your project will be evaluated by your peers, and you'll need to achieve at least 
                            85% score to earn your certificate.
                          </Text>
                          {!allAssignmentsCompleted && (
                            <Alert status="warning" mt={2} size="sm">
                              <AlertIcon />
                              You must complete all assignments with at least 85% score to unlock the final project.
                            </Alert>
                          )}
                          <Button 
                            colorScheme="purple" 
                            size="sm" 
                            mt={3} 
                            onClick={onOpen}
                            isDisabled={!isEnrolled || !allAssignmentsCompleted}
                          >
                            {finalProjectScore ? 'Review Final Project' : 'Start Final Project'}
                          </Button>
                        </Box>
                      </HStack>
                    </CardBody>
                  </Card>
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
                    <Card variant="outline" borderColor="purple.200" bg="purple.50">
                      <CardBody>
                        <HStack spacing={4}>
                          <Icon as={FaCertificate} w={8} h={8} color="purple.500" />
                          <Box>
                            <Text fontWeight="bold" color="purple.700">
                              PyGenicArc Certificate
                            </Text>
                            <Text color={mutedColor}>
                              Earn an industry-recognized certificate upon completion of all assignments and final project with a minimum of 85% score.
                            </Text>
                            {finalProjectScore && finalProjectScore >= 85 && allAssignmentsCompleted ? (
                              <Button
                                colorScheme="green"
                                size="sm"
                                mt={3}
                                leftIcon={<FaCertificate />}
                                onClick={() => navigate(`/admin/courses/${courseId}/certificate`)}
                              >
                                View Your Certificate
                              </Button>
                            ) : (
                              <Alert status="info" mt={2} size="sm">
                                <AlertIcon />
                                {!allAssignmentsCompleted ? 
                                  "Complete all assignments with at least 85% average score." : 
                                  finalProjectScore && finalProjectScore < 85 ? 
                                    "Complete the final project with at least 85% score to earn your certificate." : 
                                    "Complete the final project to earn your certificate."}
                              </Alert>
                            )}
                          </Box>
                        </HStack>
                      </CardBody>
                    </Card>
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