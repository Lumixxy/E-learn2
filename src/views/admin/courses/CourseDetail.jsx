import React, { useState, useEffect, lazy } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Button,
  Icon,
  Badge,
  Progress,
  Divider,
  Card,
  CardBody,
  useColorModeValue,
  Input,
  InputGroup,
  InputRightElement,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  useToast,
  Spinner,
} from '@chakra-ui/react';

import {
  FiPlay,
  FiFileText,
  FiCheckCircle,
  FiClock,
  FiSearch,
  FiBook,
  FiVideo,
  FiDownload,
  FiStar,
  FiCode,
  FiMessageSquare,
  FiBarChart2,
} from 'react-icons/fi';

export default function CourseDetail() {
  const { courseId } = useParams();
  const location = useLocation();
  const toast = useToast();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [selectedModule, setSelectedModule] = useState(0);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(location.state?.openAnalytics || false);
  const [code, setCode] = useState('public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}');
  const [output, setOutput] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    provider: '',
    modules: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/course_detail_data.json');
        if (!response.ok) throw new Error('Failed to fetch course detail data');
        const data = await response.json();
        setCourseData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, []);

  // Color mode values
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const mutedColor = useColorModeValue("gray.600", "gray.400");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const completedColor = useColorModeValue("green.500", "green.300");

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return FiPlay;
      case 'reading': return FiBook;
      case 'quiz': return FiFileText;
      case 'assignment': return FiFileText;
      default: return FiFileText;
    }
  };

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
    if (lesson.type === 'code') {
      setShowCodeEditor(true);
    }
  };

  const handleRunCode = () => {
    // Simulate code execution
    setOutput("Hello, World!");
    toast({
      title: "Code executed successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          id: Date.now(),
          text: newComment,
          user: "You",
          timestamp: new Date().toISOString(),
        },
      ]);
      setNewComment("");
    }
  };

  // Show loading state
  if (loading) {
    return (
      <Box minH="100vh" bg={bgColor} p={8} display="flex" alignItems="center" justifyContent="center">
        <Text fontSize="lg" color={textColor}>Loading course details...</Text>
      </Box>
    );
  }

  // Show error state
  if (error) {
    return (
      <Box minH="100vh" bg={bgColor} p={8} display="flex" alignItems="center" justifyContent="center">
        <Text fontSize="lg" color="red.500">Error: {error}</Text>
      </Box>
    );
  }

  const currentModule = courseData.modules && courseData.modules.length > 0 ? courseData.modules[selectedModule] : null;

  if (!isEnrolled) {
    return (
      <Box minH="100vh" bg={bgColor} p={8}>
        <Card maxW="800px" mx="auto" bg={cardBg}>
          <CardBody p={8}>
            <VStack spacing={6} align="stretch">
              <Image src="https://via.placeholder.com/120x120/1f77b4/ffffff?text=IBM" alt="IBM" w="120px" h="120px" />
              <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                {courseData.title}
              </Text>
              <Text color={mutedColor}>
                {courseData.description}
              </Text>
              <Button colorScheme="blue" size="lg" onClick={() => setIsEnrolled(true)}>
                Enroll Now
              </Button>
            </VStack>
          </CardBody>
        </Card>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg={bgColor}>
      <Flex>
        {/* Left Sidebar */}
        <Box w="320px" bg={cardBg} borderRight="1px" borderColor={borderColor} h="100vh" overflowY="auto">
          <VStack spacing={0} align="stretch">
            {/* Course Header */}
            <Box p={6} borderBottom="1px" borderColor={borderColor}>
              <Image src="https://via.placeholder.com/60x60/1f77b4/ffffff?text=IBM" alt="IBM" w="60px" h="60px" mb={3} />
              <Text fontSize="lg" fontWeight="bold" color={textColor} mb={1}>
                {courseData.title}
              </Text>
              <Text fontSize="sm" color={mutedColor}>
                {courseData.provider}
              </Text>
            </Box>

            {/* Course Material Navigation */}
            <Box p={4}>
              <Text fontSize="lg" fontWeight="semibold" color={textColor} mb={4}>
                Course Material
              </Text>
              
              <VStack spacing={0} align="stretch">
                {courseData.modules && courseData.modules.map((module, index) => (
                  <Box key={module.id} mb={2}>
                    <Button
                      w="full"
                      justifyContent="flex-start"
                      variant="ghost"
                      bg={selectedModule === index ? "blue.50" : "transparent"}
                      color={selectedModule === index ? "blue.600" : textColor}
                      borderRadius="md"
                      p={3}
                      h="auto"
                      onClick={() => setSelectedModule(index)}
                      _hover={{ bg: "gray.50" }}
                    >
                      <HStack spacing={3} align="flex-start" w="full">
                        <Icon 
                          as={module.completed ? FiCheckCircle : FiPlay} 
                          color={module.completed ? completedColor : mutedColor}
                          mt={1}
                        />
                        <VStack align="flex-start" spacing={0} flex={1}>
                          <Text fontSize="sm" textAlign="left" fontWeight="medium">
                            Module {module.id}
                          </Text>
                          <Text fontSize="xs" color={mutedColor} textAlign="left" noOfLines={2}>
                            {module.title}
                          </Text>
                        </VStack>
                      </HStack>
                    </Button>
                  </Box>
                ))}
              </VStack>
            </Box>

            {/* Additional Navigation */}
            <VStack spacing={0} align="stretch" mt={4}>
              <Button variant="ghost" justifyContent="flex-start" p={4} color={textColor}>
                <HStack>
                  <Icon as={FiStar} />
                  <Text fontSize="sm">Grades</Text>
                </HStack>
              </Button>
              <Button variant="ghost" justifyContent="flex-start" p={4} color={textColor}>
                <HStack>
                  <Icon as={FiFileText} />
                  <Text fontSize="sm">Notes</Text>
                </HStack>
              </Button>
              <Button 
                variant="ghost" 
                justifyContent="flex-start" 
                p={4} 
                color={textColor}
                onClick={() => setShowAnalytics(true)}
              >
                <HStack>
                  <Icon as={FiBarChart2} />
                  <Text fontSize="sm">Analytics</Text>
                </HStack>
              </Button>
            </VStack>
          </VStack>
        </Box>

        {/* Main Content */}
        <Box flex={1} p={0}>
          {/* Search Bar */}
          <Box bg={cardBg} borderBottom="1px" borderColor={borderColor} p={4}>
            <InputGroup maxW="400px">
              <Input 
                placeholder="Search in course"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                bg={bgColor}
              />
              <InputRightElement>
                <Button colorScheme="blue" size="sm">
                  <Icon as={FiSearch} />
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>

          {/* Module Content */}
          <Box p={6}>
            <VStack spacing={6} align="stretch">
              {/* Module Header */}
              <Box>
                <HStack spacing={2} mb={2}>
                  <Icon as={FiPlay} color={mutedColor} />
                  <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                    {currentModule.title}
                  </Text>
                </HStack>
                
                <HStack spacing={6} mb={4} flexWrap="wrap">
                  {currentModule.videoDuration && (
                    <HStack spacing={1}>
                      <Icon as={FiVideo} color={mutedColor} w={4} h={4} />
                      <Text fontSize="sm" color={mutedColor}>{currentModule.videoDuration}</Text>
                    </HStack>
                  )}
                  {currentModule.readingDuration && (
                    <HStack spacing={1}>
                      <Icon as={FiBook} color={mutedColor} w={4} h={4} />
                      <Text fontSize="sm" color={mutedColor}>{currentModule.readingDuration}</Text>
                    </HStack>
                  )}
                  {currentModule.assessments && (
                    <HStack spacing={1}>
                      <Icon as={FiFileText} color={mutedColor} w={4} h={4} />
                      <Text fontSize="sm" color={mutedColor}>{currentModule.assessments}</Text>
                    </HStack>
                  )}
                </HStack>

                <Text color={textColor} mb={4} lineHeight="1.6">
                  {currentModule.description}
                </Text>

                <Button variant="link" colorScheme="blue" size="sm" mb={6}>
                  Show Learning Objectives
                </Button>
              </Box>

              {/* Lessons List */}
              <VStack spacing={3} align="stretch">
                {currentModule.lessons && currentModule.lessons.map((lesson) => (
                  <Card 
                    key={lesson.id}
                    bg={cardBg}
                    border="1px"
                    borderColor={borderColor}
                    _hover={{ borderColor: "blue.300", cursor: "pointer" }}
                    onClick={() => handleLessonClick(lesson)}
                  >
                    <CardBody p={4}>
                      <HStack justify="space-between" align="center">
                        <HStack spacing={3} flex={1}>
                          <Icon 
                            as={lesson.completed ? FiCheckCircle : getTypeIcon(lesson.type)} 
                            color={lesson.completed ? completedColor : "blue.500"}
                            w={5} h={5}
                          />
                          <VStack align="flex-start" spacing={1} flex={1}>
                            <Text fontWeight="medium" color={textColor}>
                              {lesson.title}
                            </Text>
                            <HStack spacing={2}>
                              <Text fontSize="sm" color={mutedColor} textTransform="capitalize">
                                {lesson.type}
                              </Text>
                              <Text fontSize="sm" color={mutedColor}>•</Text>
                              <HStack spacing={1}>
                                <Icon as={FiClock} w={3} h={3} color={mutedColor} />
                                <Text fontSize="sm" color={mutedColor}>
                                  {lesson.duration}
                                </Text>
                              </HStack>
                            </HStack>
                          </VStack>
                        </HStack>
                        
                        {lesson.completed && (
                          <Badge colorScheme="green" size="sm">
                            Complete
                          </Badge>
                        )}
                      </HStack>
                    </CardBody>
                  </Card>
                ))}
              </VStack>
            </VStack>
          </Box>
        </Box>
      </Flex>

      {/* Code Editor Modal */}
      <Modal isOpen={showCodeEditor} onClose={() => setShowCodeEditor(false)} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Code Editor</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4} align="stretch">
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                fontFamily="monospace"
                minH="300px"
                bg={bgColor}
              />
              <Button colorScheme="blue" onClick={handleRunCode}>
                Run Code
              </Button>
              {output && (
                <Box p={4} bg={bgColor} borderRadius="md">
                  <Text fontFamily="monospace">{output}</Text>
                </Box>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Comments Section */}
      <Box position="fixed" bottom={0} right={0} w="320px" h="100vh" bg={cardBg} borderLeft="1px" borderColor={borderColor} p={4}>
        <VStack spacing={4} align="stretch" h="full">
          <Text fontSize="lg" fontWeight="semibold">Comments</Text>
          <VStack spacing={4} align="stretch" flex={1} overflowY="auto">
            {comments.map((comment) => (
              <Box key={comment.id} p={3} bg={bgColor} borderRadius="md">
                <Text fontWeight="medium">{comment.user}</Text>
                <Text fontSize="sm" color={mutedColor}>
                  {new Date(comment.timestamp).toLocaleString()}
                </Text>
                <Text mt={2}>{comment.text}</Text>
              </Box>
            ))}
          </VStack>
          <HStack>
            <Input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <Button colorScheme="blue" onClick={handleSubmitComment}>
              Post
            </Button>
          </HStack>
        </VStack>
      </Box>

      {/* Analytics Dashboard Modal */}
      <Modal isOpen={showAnalytics} onClose={() => setShowAnalytics(false)} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Course Analytics Dashboard</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <React.Suspense fallback={<Flex justify="center" align="center" minH="60vh"><Spinner size="xl" /></Flex>}>
              <AdvancedAnalyticsDashboard courseId={courseId} courseData={courseData} isCourseSpecific={true} />
            </React.Suspense>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}