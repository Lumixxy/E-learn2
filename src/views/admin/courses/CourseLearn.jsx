import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Radio,
  RadioGroup,
  Stack,
  Alert,
  AlertIcon,
  useToast,
  Spinner,
  Heading,
} from '@chakra-ui/react';
import {
  FiPlay,
  FiCheckCircle,
  FiClock,
  FiLock,
  FiAward,
  FiFileText,
} from 'react-icons/fi';
import axios from 'axios';

const CourseLearn = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [moduleCompleted, setModuleCompleted] = useState(false);
  const { isOpen: isCertificateOpen, onOpen: onCertificateOpen, onClose: onCertificateClose } = useDisclosure();
  const toast = useToast();

  // Color mode values
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const mutedColor = useColorModeValue("gray.600", "gray.400");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const completedColor = useColorModeValue("green.500", "green.300");

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/api/courses/${courseId}/`);
        // Assuming your backend returns a single course object with 'Course', 'Module', 'Topic', 'WebsiteLink'
        // We need to transform this into the structure expected by CourseLearn.
        // For simplicity, let's assume each row from the backend corresponds to a 'lesson' within a 'module'.
        // This part needs to be adjusted based on your actual backend data structure for courses.

        const fetchedCourse = response.data;

        // Create a simplified module/lesson structure based on the fetched data
        // This is a placeholder and might need to be more sophisticated
        const transformedCourse = {
          id: fetchedCourse.id,
          title: fetchedCourse.Course || "Unknown Course",
          provider: "PygenicArc", // Or fetch from backend if available
          description: fetchedCourse.Topic || "No description available.",
          totalModules: 1,
          completedModules: 0,
          modules: [
            {
              id: 1,
              title: fetchedCourse.Module || "General Module",
              completed: false,
              lessons: [
                {
                  id: 1,
                  title: fetchedCourse.Topic || "No Topic",
                  type: "reading",
                  duration: "30 min", // Placeholder
                  completed: false,
                  content: `This content is for: **${fetchedCourse.Topic}**\n\nAccess course materials: [${fetchedCourse.WebsiteLink}](${fetchedCourse.WebsiteLink})\n\nMore details about the course **${fetchedCourse.Course}** in module **${fetchedCourse.Module}**.`,
                },
                // You can add a mock quiz here if needed for demonstration
                {
                  id: 2,
                  title: "Module Quiz",
                  type: "quiz",
                  questions: [
                    {
                      id: 1,
                      question: `What is the main topic of "${fetchedCourse.Topic}"?`,
                      options: [
                        "Option A",
                        "Option B",
                        "Option C",
                        "Option D"
                      ],
                      correctAnswer: 0 // Placeholder
                    }
                  ]
                }
              ],
            },
          ],
        };
        setCourseData(transformedCourse);
        setError(null);
      } catch (err) {
        console.error("Error fetching course details:", err);
        setError("Failed to load course details. Please try again later.");
        setCourseData(null);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);

  const currentModule = courseData?.modules[currentModuleIndex];
  const currentLesson = currentModule?.lessons[currentLessonIndex];

  const handleLessonComplete = () => {
    // Logic to mark lesson as complete (not implemented fully here)
    toast({
      title: "Lesson Completed!",
      description: "You have completed this lesson.",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

  const handleNextLesson = () => {
    if (currentModule && currentLessonIndex < currentModule.lessons.length - 1) {
      setCurrentLessonIndex(prev => prev + 1);
    } else if (courseData && currentModuleIndex < courseData.modules.length - 1) {
      // Move to next module if all lessons in current module are done
      setCurrentModuleIndex(prev => prev + 1);
      setCurrentLessonIndex(0); // Reset lesson index for new module
    } else {
      // All modules and lessons completed
      onCertificateOpen();
    }
  };

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(prev => prev - 1);
    } else if (currentModuleIndex > 0) {
      setCurrentModuleIndex(prev => prev - 1);
      // Set to last lesson of previous module
      setCurrentLessonIndex(courseData.modules[currentModuleIndex - 1].lessons.length - 1);
    }
  };

  const handleQuizAnswerChange = (questionId, answerIndex) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const handleQuizSubmit = () => {
    const quizQuestions = currentLesson.questions;
    let score = 0;
    quizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });

    const totalQuestions = quizQuestions.length;
    const percentage = (score / totalQuestions) * 100;
    const passed = percentage >= 70; // 70% passing score

    if (passed) {
      setModuleCompleted(true); // Mark module as complete if quiz passed
      setQuizSubmitted(true);
      toast({
        title: "Quiz Completed!",
        description: "Congratulations! You've passed the module quiz.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      // Automatically move to the next lesson/module after quiz success
      handleNextLesson();
    } else {
      toast({
        title: "Quiz Failed",
        description: `You scored ${percentage.toFixed(0)}%. Please review and try again.`, // Show score
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setQuizSubmitted(false); // Allow retake
      setQuizAnswers({}); // Clear answers for retake
    }
  };

  const renderLessonContent = () => {
    if (!currentLesson) return <Text>No lesson selected.</Text>;

    if (currentLesson.type === 'reading') {
      // Basic markdown rendering (you might need a dedicated markdown renderer library)
      const paragraphs = currentLesson.content.split('\n').map((paragraph, index) => {
        if (paragraph.startsWith('# ')) return <Heading key={index} size="lg" mt={4} mb={2}>{paragraph.substring(2)}</Heading>;
        if (paragraph.startsWith('## ')) return <Heading key={index} size="md" mt={3} mb={1}>{paragraph.substring(3)}</Heading>;
        if (paragraph.startsWith('### ')) return <Heading key={index} size="sm" mt={2} mb={1}>{paragraph.substring(4)}</Heading>;
        if (paragraph.startsWith('- ')) return <Text key={index} ml={4} mb={1}>• {paragraph.substring(2)}</Text>;
        if (paragraph.startsWith('1. ')) return <Text key={index} ml={4} mb={1}>{paragraph}</Text>;

        // Handle links in markdown format [text](url)
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        let processedParagraph = paragraph;
        const matches = [...paragraph.matchAll(linkRegex)];
        
        matches.forEach(match => {
          const [fullMatch, linkText, linkUrl] = match;
          processedParagraph = processedParagraph.replace(fullMatch, `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" style="color: var(--chakra-colors-blue-500); text-decoration: underline;">${linkText}</a>`);
        });

        // Handle bold text
        processedParagraph = processedParagraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        return <Text key={index} mb={2} dangerouslySetInnerHTML={{ __html: processedParagraph }} />;
      });
      return <VStack align="stretch">{paragraphs}</VStack>;
    } else if (currentLesson.type === 'quiz') {
      return (
        <VStack spacing={4} align="stretch">
          <Heading size="md" color={textColor}>Quiz: {currentLesson.title}</Heading>
          {currentLesson.questions.map((q) => (
            <Box key={q.id} p={4} borderWidth="1px" borderRadius="lg" borderColor={borderColor}>
              <Text fontWeight="bold" mb={2}>{q.question}</Text>
              <RadioGroup onChange={(val) => handleQuizAnswerChange(q.id, parseInt(val))}
                value={quizAnswers[q.id]?.toString()}>
                <Stack direction="column">
                  {q.options.map((option, index) => (
                    <Radio key={index} value={index.toString()}>
                      {option}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </Box>
          ))}
          <Button colorScheme="blue" onClick={handleQuizSubmit} isDisabled={quizSubmitted}>
            Submit Quiz
          </Button>
          {quizSubmitted && (
            <Alert status="info" mt={4}>
              <AlertIcon />
              You can review your answers, but cannot resubmit this quiz.
            </Alert>
          )}
        </VStack>
      );
    } else {
      return <Text>Unsupported lesson type.</Text>;
    }
  };

  if (loading) {
    return (
      <Flex minH="100vh" bg={bgColor} justifyContent="center" alignItems="center">
        <Spinner size="xl" color="blue.500" />
        <Text ml={4} color={textColor}>Loading course...</Text>
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex minH="100vh" bg={bgColor} justifyContent="center" alignItems="center" flexDirection="column">
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
        <Button onClick={() => window.location.reload()} colorScheme="blue">
          Retry
        </Button>
      </Flex>
    );
  }

  if (!courseData) {
    return (
      <Flex minH="100vh" bg={bgColor} justifyContent="center" alignItems="center">
        <Text color={textColor}>No course data available.</Text>
      </Flex>
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
                {courseData.modules.map((module, moduleIdx) => (
                  <Box key={module.id} mb={2}>
                    <Button
                      w="full"
                      justifyContent="flex-start"
                      variant="ghost"
                      bg={currentModuleIndex === moduleIdx ? "blue.50" : "transparent"}
                      color={currentModuleIndex === moduleIdx ? "blue.600" : textColor}
                      borderRadius="md"
                      p={3}
                      h="auto"
                      onClick={() => {
                        if (moduleIdx > 0 && !courseData.modules[moduleIdx - 1].completed) {
                          toast({
                            title: "Module Locked",
                            description: "Please complete the previous module first.",
                            status: "warning",
                            duration: 3000,
                            isClosable: true,
                            position: "top",
                          });
                          return;
                        }
                        setCurrentModuleIndex(moduleIdx);
                        setCurrentLessonIndex(0);
                        setShowQuiz(false); // Reset quiz view when changing modules
                      }}
                      _hover={{ bg: "gray.50" }}
                    >
                      <HStack spacing={3} align="flex-start" w="full">
                        <Icon 
                          as={module.completed ? FiCheckCircle : (moduleIdx > 0 && !courseData.modules[moduleIdx - 1].completed) ? FiLock : FiPlay} 
                          color={module.completed ? completedColor : (moduleIdx > 0 && !courseData.modules[moduleIdx - 1].completed) ? mutedColor : "blue.500"}
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
                    {/* Lessons within the current module */}
                    {currentModuleIndex === moduleIdx && (
                      <VStack spacing={1} align="stretch" pl={8} pt={2}>
                        {module.lessons.map((lesson, lessonIdx) => (
                          <Button
                            key={lesson.id}
                            w="full"
                            justifyContent="flex-start"
                            variant="ghost"
                            size="sm"
                            bg={currentLessonIndex === lessonIdx ? "gray.100" : "transparent"}
                            color={currentLessonIndex === lessonIdx ? "blue.600" : textColor}
                            onClick={() => {
                              if (lessonIdx > 0 && !module.lessons[lessonIdx - 1].completed) {
                                toast({
                                  title: "Lesson Locked",
                                  description: "Please complete the previous lesson first.",
                                  status: "warning",
                                  duration: 3000,
                                  isClosable: true,
                                  position: "top",
                                });
                                return;
                              }
                              setCurrentLessonIndex(lessonIdx);
                              if (lesson.type === 'quiz') {
                                setShowQuiz(true);
                              } else {
                                setShowQuiz(false);
                              }
                            }}
                            _hover={{ bg: "gray.100" }}
                          >
                            <HStack spacing={2}>
                              <Icon as={lesson.completed ? FiCheckCircle : FiFileText} 
                                color={lesson.completed ? completedColor : mutedColor} />
                              <Text fontSize="sm" textAlign="left" noOfLines={1}>
                                {lesson.title}
                              </Text>
                            </HStack>
                          </Button>
                        ))}
                      </VStack>
                    )}
                  </Box>
                ))}
              </VStack>
            </Box>

            {/* Additional Navigation */}
            <VStack spacing={0} align="stretch" mt={4}>
              <Button variant="ghost" justifyContent="flex-start" p={4} color={textColor}>
                <HStack>
                  <Icon as={FiAward} />
                  <Text fontSize="sm">Certificates</Text>
                </HStack>
              </Button>
            </VStack>
          </VStack>
        </Box>

        {/* Main Content */}
        <Box flex={1} p={6} overflowY="auto">
          <VStack spacing={6} align="stretch">
            {/* Lesson Content */}
            {currentLesson && (
              <Card bg={cardBg} p={6} borderWidth="1px" borderColor={borderColor}>
                <CardBody>
                  {renderLessonContent()}
                </CardBody>
              </Card>
            )}
            
            <HStack justifyContent="space-between">
              <Button
                onClick={handlePreviousLesson}
                isDisabled={currentModuleIndex === 0 && currentLessonIndex === 0}
                colorScheme="blue"
                variant="outline"
              >
                Previous Lesson
              </Button>
              <Button
                onClick={handleNextLesson}
                colorScheme="blue"
                isDisabled={currentLesson?.type === 'quiz' && !quizSubmitted} // Disable if quiz not submitted
              >
                {currentLesson?.type === 'quiz' && !quizSubmitted ? "Complete Quiz" : "Next Lesson"}
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Flex>

      {/* Certificate Modal */}
      <Modal isOpen={isCertificateOpen} onClose={onCertificateClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Congratulations!</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} textAlign="center">
            <Icon as={FiAward} w={12} h={12} color="gold.500" mb={4} />
            <Heading size="lg" mb={2}>Course Completed!</Heading>
            <Text mb={4}>You have successfully completed all modules of this course.</Text>
            <Text fontWeight="bold">You are now eligible for:</Text>
            <VStack mt={2} spacing={1}>
              <Badge colorScheme="purple" fontSize="md">PygenicArc Certificate</Badge>
              <Badge colorScheme="teal" fontSize="md">Content Provider Certificate</Badge>
            </VStack>
            <Button colorScheme="blue" mt={6} onClick={onCertificateClose}>
              Claim Your Certificates
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CourseLearn; 