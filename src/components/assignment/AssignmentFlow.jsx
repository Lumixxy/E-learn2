import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
  HStack,
  Text,
  Box,
  Textarea,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Progress,
  Alert,
  AlertIcon,
  Badge,
  Divider,
  useToast,
  useColorModeValue,
  Icon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react';
import { 
  FiFileText, 
  FiClock, 
  FiCheck, 
  FiX, 
  FiStar,
  FiAward,
  FiTarget
} from 'react-icons/fi';
import { useXP } from '../../contexts/XPContext';

// Assignment types and templates
const ASSIGNMENT_TYPES = {
  MULTIPLE_CHOICE: 'multiple_choice',
  SHORT_ANSWER: 'short_answer',
  ESSAY: 'essay',
  CODE_SUBMISSION: 'code_submission',
  PROJECT: 'project'
};

// Sample assignment data structure
const SAMPLE_ASSIGNMENTS = {
  'html-1-1': {
    id: 'html-1-1',
    title: 'HTML Fundamentals Quiz',
    type: ASSIGNMENT_TYPES.MULTIPLE_CHOICE,
    timeLimit: 1800, // 30 minutes in seconds
    totalPoints: 100,
    passingScore: 70,
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        question: 'What does HTML stand for?',
        options: [
          'HyperText Markup Language',
          'High Tech Modern Language',
          'Home Tool Markup Language',
          'Hyperlink and Text Markup Language'
        ],
        correctAnswer: 0,
        points: 25,
        explanation: 'HTML stands for HyperText Markup Language, the standard markup language for creating web pages.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        question: 'Which HTML element is used for the largest heading?',
        options: ['<h1>', '<h6>', '<heading>', '<header>'],
        correctAnswer: 0,
        points: 25,
        explanation: '<h1> represents the largest heading level in HTML.'
      },
      {
        id: 'q3',
        type: 'short_answer',
        question: 'Write the HTML code to create a hyperlink to "https://example.com" with the text "Click here".',
        correctAnswer: '<a href="https://example.com">Click here</a>',
        points: 25,
        explanation: 'The anchor tag <a> with href attribute creates hyperlinks.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        question: 'Which attribute specifies the URL of the page the link goes to?',
        options: ['href', 'src', 'link', 'url'],
        correctAnswer: 0,
        points: 25,
        explanation: 'The href attribute specifies the URL destination of a link.'
      }
    ]
  }
};

const AssignmentFlow = ({ 
  isOpen, 
  onClose, 
  courseId, 
  moduleId, 
  assignmentId,
  onComplete 
}) => {
  const [assignment, setAssignment] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  const toast = useToast();
  const { submitAssignment: submitAssignmentXP, awardXP } = useXP();
  
  // Color mode values
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const correctColor = useColorModeValue('green.500', 'green.300');
  const incorrectColor = useColorModeValue('red.500', 'red.300');
  const redBgColor = useColorModeValue('red.50', 'red.900');
  const blueBgColor = useColorModeValue('blue.50', 'blue.900');

  // Load assignment data
  useEffect(() => {
    if (isOpen && assignmentId) {
      // For demo, use sample data. In production, fetch from API
      const assignmentData = SAMPLE_ASSIGNMENTS[assignmentId] || generateDefaultAssignment();
      setAssignment(assignmentData);
      setTimeRemaining(assignmentData.timeLimit);
      setAnswers({});
      setIsSubmitted(false);
      setScore(null);
      setFeedback([]);
      setCurrentQuestionIndex(0);
      setShowResults(false);
    }
  }, [isOpen, assignmentId]);

  // Timer effect
  useEffect(() => {
    let interval;
    if (isTimerActive && timeRemaining > 0 && !isSubmitted) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeRemaining, isSubmitted]);

  // Generate default assignment if not found
  const generateDefaultAssignment = () => ({
    id: assignmentId,
    title: 'Course Assignment',
    type: ASSIGNMENT_TYPES.MULTIPLE_CHOICE,
    timeLimit: 1800,
    totalPoints: 100,
    passingScore: 70,
    questions: [
      {
        id: 'default1',
        type: 'multiple_choice',
        question: 'This is a sample question for the assignment.',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 0,
        points: 100,
        explanation: 'This is a sample explanation.'
      }
    ]
  });

  // Start assignment
  const startAssignment = () => {
    setIsTimerActive(true);
    toast({
      title: "Assignment Started",
      description: `You have ${Math.floor(assignment.timeLimit / 60)} minutes to complete this assignment.`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  // Handle answer change
  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  // Navigate questions
  const goToNextQuestion = () => {
    if (currentQuestionIndex < assignment.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // Auto-submit when time runs out
  const handleAutoSubmit = () => {
    if (!isSubmitted) {
      handleSubmitAssignment();
      toast({
        title: "Time's Up!",
        description: "Your assignment has been automatically submitted.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Submit assignment
  const handleSubmitAssignment = () => {
    setIsTimerActive(false);
    setIsSubmitted(true);
    
    // Calculate score
    const results = calculateScore();
    setScore(results.score);
    setFeedback(results.feedback);
    
    // Award XP
    const xpResult = submitAssignmentXP(courseId, moduleId, assignmentId, results.score);
    
    // Show completion notification
    toast({
      title: "Assignment Submitted",
      description: `You scored ${results.score}%! ${xpResult.xpAwarded ? `+${xpResult.xpAwarded} XP` : ''}`,
      status: results.score >= assignment.passingScore ? "success" : "warning",
      duration: 5000,
      isClosable: true,
    });
    
    setShowResults(true);
    
    // Call completion callback
    if (onComplete) {
      onComplete(results.score, assignmentId);
    }
  };

  // Calculate score and feedback
  const calculateScore = () => {
    let totalPoints = 0;
    let earnedPoints = 0;
    const feedbackItems = [];

    assignment.questions.forEach(question => {
      totalPoints += question.points;
      const userAnswer = answers[question.id];
      
      let isCorrect = false;
      
      switch (question.type) {
        case 'multiple_choice':
          isCorrect = userAnswer === question.correctAnswer;
          break;
        case 'short_answer':
          // Simple string comparison (in production, use more sophisticated matching)
          isCorrect = userAnswer?.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();
          break;
        default:
          isCorrect = false;
      }
      
      if (isCorrect) {
        earnedPoints += question.points;
      }
      
      feedbackItems.push({
        questionId: question.id,
        question: question.question,
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        points: isCorrect ? question.points : 0,
        explanation: question.explanation
      });
    });

    const score = Math.round((earnedPoints / totalPoints) * 100);
    
    return {
      score,
      earnedPoints,
      totalPoints,
      feedback: feedbackItems
    };
  };

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Render question
  const renderQuestion = (question) => {
    const userAnswer = answers[question.id];
    
    switch (question.type) {
      case 'multiple_choice':
        return (
          <RadioGroup 
            value={userAnswer?.toString()} 
            onChange={(value) => handleAnswerChange(question.id, parseInt(value))}
          >
            <VStack align="start" spacing={3}>
              {question.options.map((option, index) => (
                <Radio key={index} value={index.toString()}>
                  {option}
                </Radio>
              ))}
            </VStack>
          </RadioGroup>
        );
      
      case 'short_answer':
        return (
          <Textarea
            value={userAnswer || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            placeholder="Type your answer here..."
            rows={3}
          />
        );
      
      default:
        return <Text color={mutedColor}>Question type not supported</Text>;
    }
  };

  // Render results
  const renderResults = () => (
    <Tabs>
      <TabList>
        <Tab>Summary</Tab>
        <Tab>Detailed Feedback</Tab>
      </TabList>
      
      <TabPanels>
        <TabPanel>
          <VStack spacing={4} align="stretch">
            <Box textAlign="center" p={6} borderRadius="lg" bg={bgColor}>
              <Text fontSize="3xl" fontWeight="bold" color={textColor}>
                {score}%
              </Text>
              <Text fontSize="lg" color={mutedColor}>
                Your Score
              </Text>
              
              <HStack justify="center" mt={4}>
                {[...Array(5)].map((_, i) => (
                  <Icon
                    key={i}
                    as={FiStar}
                    color={i < Math.floor(score / 20) ? "yellow.400" : "gray.300"}
                    fill={i < Math.floor(score / 20) ? "currentColor" : "none"}
                  />
                ))}
              </HStack>
              
              <Badge
                mt={4}
                px={4}
                py={2}
                borderRadius="full"
                colorScheme={score >= assignment.passingScore ? "green" : "red"}
                fontSize="md"
              >
                {score >= assignment.passingScore ? "PASSED" : "FAILED"}
              </Badge>
            </Box>
            
            <Alert status={score >= assignment.passingScore ? "success" : "error"}>
              <AlertIcon />
              {score >= assignment.passingScore 
                ? "Congratulations! You passed the assignment."
                : `You need ${assignment.passingScore}% to pass. Keep studying and try again!`
              }
            </Alert>
          </VStack>
        </TabPanel>
        
        <TabPanel>
          <VStack spacing={4} align="stretch">
            {feedback.map((item, index) => (
              <Box 
                key={item.questionId} 
                p={4} 
                borderRadius="lg" 
                border="1px" 
                borderColor={borderColor}
              >
                <HStack justify="space-between" mb={2}>
                  <Text fontWeight="bold">Question {index + 1}</Text>
                  <HStack>
                    <Icon 
                      as={item.isCorrect ? FiCheck : FiX} 
                      color={item.isCorrect ? correctColor : incorrectColor} 
                    />
                    <Text fontSize="sm" color={mutedColor}>
                      {item.points}/{assignment.questions[index].points} pts
                    </Text>
                  </HStack>
                </HStack>
                
                <Text mb={3}>{item.question}</Text>
                
                {!item.isCorrect && (
                  <Box p={3} bg={redBgColor} borderRadius="md" mb={3}>
                    <Text fontSize="sm" color={incorrectColor}>
                      Your answer: {
                        typeof item.userAnswer === 'number' 
                          ? assignment.questions[index].options[item.userAnswer]
                          : item.userAnswer || 'No answer provided'
                      }
                    </Text>
                    <Text fontSize="sm" color={correctColor}>
                      Correct answer: {
                        typeof item.correctAnswer === 'number'
                          ? assignment.questions[index].options[item.correctAnswer]
                          : item.correctAnswer
                      }
                    </Text>
                  </Box>
                )}
                
                {item.explanation && (
                  <Box p={3} bg={blueBgColor} borderRadius="md">
                    <Text fontSize="sm">{item.explanation}</Text>
                  </Box>
                )}
              </Box>
            ))}
          </VStack>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );

  if (!assignment) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent maxW="4xl" bg={bgColor}>
        <ModalHeader>
          <HStack justify="space-between">
            <VStack align="start" spacing={1}>
              <HStack>
                <Icon as={FiFileText} />
                <Text>{assignment.title}</Text>
              </HStack>
              <HStack fontSize="sm" color={mutedColor}>
                <Icon as={FiTarget} />
                <Text>{assignment.questions.length} questions</Text>
                <Text>•</Text>
                <Text>{assignment.totalPoints} points</Text>
                <Text>•</Text>
                <Text>Pass: {assignment.passingScore}%</Text>
              </HStack>
            </VStack>
            
            {isTimerActive && timeRemaining > 0 && (
              <VStack align="end" spacing={1}>
                <HStack color={timeRemaining < 300 ? "red.500" : textColor}>
                  <Icon as={FiClock} />
                  <Text fontWeight="bold">{formatTime(timeRemaining)}</Text>
                </HStack>
                <Progress 
                  value={(timeRemaining / assignment.timeLimit) * 100} 
                  size="sm" 
                  width="100px"
                  colorScheme={timeRemaining < 300 ? "red" : "blue"}
                />
              </VStack>
            )}
          </HStack>
        </ModalHeader>
        
        <ModalBody>
          {!isTimerActive && !isSubmitted ? (
            // Pre-assignment screen
            <VStack spacing={6} align="stretch">
              <Alert status="info">
                <AlertIcon />
                <VStack align="start" spacing={2}>
                  <Text fontWeight="bold">Assignment Instructions</Text>
                  <Text fontSize="sm">
                    • You have {Math.floor(assignment.timeLimit / 60)} minutes to complete this assignment
                  </Text>
                  <Text fontSize="sm">
                    • You need {assignment.passingScore}% to pass
                  </Text>
                  <Text fontSize="sm">
                    • Once started, the timer cannot be paused
                  </Text>
                  <Text fontSize="sm">
                    • Review your answers before submitting
                  </Text>
                </VStack>
              </Alert>
            </VStack>
          ) : showResults ? (
            // Results screen
            renderResults()
          ) : (
            // Assignment questions
            <VStack spacing={6} align="stretch">
              <HStack justify="space-between">
                <Text fontSize="sm" color={mutedColor}>
                  Question {currentQuestionIndex + 1} of {assignment.questions.length}
                </Text>
                <Progress 
                  value={((currentQuestionIndex + 1) / assignment.questions.length) * 100} 
                  size="sm" 
                  width="200px"
                />
              </HStack>
              
              <Box p={6} borderRadius="lg" border="1px" borderColor={borderColor}>
                <VStack align="start" spacing={4}>
                  <Text fontSize="lg" fontWeight="bold">
                    {assignment.questions[currentQuestionIndex].question}
                  </Text>
                  <Text fontSize="sm" color={mutedColor}>
                    {assignment.questions[currentQuestionIndex].points} points
                  </Text>
                  
                  {renderQuestion(assignment.questions[currentQuestionIndex])}
                </VStack>
              </Box>
              
              <HStack justify="space-between">
                <Button 
                  variant="outline" 
                  onClick={goToPreviousQuestion}
                  isDisabled={currentQuestionIndex === 0}
                >
                  Previous
                </Button>
                
                <HStack>
                  {assignment.questions.map((_, index) => (
                    <Box
                      key={index}
                      w={3}
                      h={3}
                      borderRadius="full"
                      bg={
                        index === currentQuestionIndex 
                          ? "blue.500" 
                          : answers[assignment.questions[index].id] !== undefined
                            ? "green.500"
                            : "gray.300"
                      }
                      cursor="pointer"
                      onClick={() => setCurrentQuestionIndex(index)}
                    />
                  ))}
                </HStack>
                
                <Button 
                  variant="outline" 
                  onClick={goToNextQuestion}
                  isDisabled={currentQuestionIndex === assignment.questions.length - 1}
                >
                  Next
                </Button>
              </HStack>
            </VStack>
          )}
        </ModalBody>
        
        <ModalFooter>
          <HStack spacing={3}>
            {!isTimerActive && !isSubmitted ? (
              <>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="blue" onClick={startAssignment}>
                  Start Assignment
                </Button>
              </>
            ) : showResults ? (
              <Button colorScheme="blue" onClick={onClose}>
                Continue Learning
              </Button>
            ) : (
              <>
                <Text fontSize="sm" color={mutedColor}>
                  {Object.keys(answers).length} of {assignment.questions.length} answered
                </Text>
                <Button 
                  colorScheme="green" 
                  onClick={handleSubmitAssignment}
                  isDisabled={Object.keys(answers).length === 0}
                >
                  Submit Assignment
                </Button>
              </>
            )}
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AssignmentFlow;