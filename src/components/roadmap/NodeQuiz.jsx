import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Text,
  VStack,
  Radio,
  RadioGroup,
  Heading,
  useColorModeValue,
  Flex,
  Badge,
  Progress,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useXP } from '../../contexts/XPContext';
import { useCompletedNodes } from '../../context/CompletedNodesContext';
import nodeQuizzes from '../../data/nodeQuizzes';
import nodejsQuizzes from '../../data/nodejsQuizzes';

// Sample quiz data structure - will be replaced by nodeQuizzes import
// Keeping this as fallback
const sampleQuizzes = {
  'python-basics': {
    title: 'Python Basics Quiz',
    questions: [
      {
        id: 1,
        question: 'What is the correct way to create a variable in Python?',
        options: [
          { id: 'a', text: 'var x = 5' },
          { id: 'b', text: 'x = 5' },
          { id: 'c', text: 'int x = 5' },
          { id: 'd', text: 'let x = 5' },
        ],
        correctAnswer: 'b',
        explanation: 'In Python, you can directly assign a value to a variable without declaring its type.'
      },
      {
        id: 2,
        question: 'Which of the following is a valid comment in Python?',
        options: [
          { id: 'a', text: '// This is a comment' },
          { id: 'b', text: '/* This is a comment */' },
          { id: 'c', text: '# This is a comment' },
          { id: 'd', text: '<!-- This is a comment -->' },
        ],
        correctAnswer: 'c',
        explanation: 'In Python, comments start with the # character.'
      },
      {
        id: 3,
        question: 'What will be the output of print(2**3)?',
        options: [
          { id: 'a', text: '6' },
          { id: 'b', text: '8' },
          { id: 'c', text: '5' },
          { id: 'd', text: 'Error' },
        ],
        correctAnswer: 'b',
        explanation: 'The ** operator in Python represents exponentiation. 2**3 means 2 raised to the power of 3, which equals 8.'
      }
    ],
    xpReward: 50
  },
  'control-flow': {
    title: 'Control Flow Quiz',
    questions: [
      {
        id: 1,
        question: 'Which of the following is NOT a loop structure in Python?',
        options: [
          { id: 'a', text: 'for' },
          { id: 'b', text: 'while' },
          { id: 'c', text: 'do-while' },
          { id: 'd', text: 'for-each' },
        ],
        correctAnswer: 'c',
        explanation: 'Python does not have a do-while loop. It has for and while loops.'
      },
      {
        id: 2,
        question: 'What is the correct syntax for an if statement in Python?',
        options: [
          { id: 'a', text: 'if (x > 5) {console.log("x is greater than 5")}' },
          { id: 'b', text: 'if x > 5 then print("x is greater than 5")' },
          { id: 'c', text: 'if x > 5:\n    print("x is greater than 5")' },
          { id: 'd', text: 'if x > 5 print("x is greater than 5")' },
        ],
        correctAnswer: 'c',
        explanation: 'In Python, the if statement uses a colon and indentation to define the code block.'
      },
      {
        id: 3,
        question: 'What does the "break" statement do in Python?',
        options: [
          { id: 'a', text: 'Skips the current iteration and continues with the next' },
          { id: 'b', text: 'Exits the loop completely' },
          { id: 'c', text: 'Returns a value from a function' },
          { id: 'd', text: 'Pauses the program execution' },
        ],
        correctAnswer: 'b',
        explanation: 'The break statement exits the loop completely, and the program continues with the next statement after the loop.'
      }
    ],
    xpReward: 75
  },
  'functions': {
    title: 'Python Functions Quiz',
    questions: [
      {
        id: 1,
        question: 'How do you define a function in Python?',
        options: [
          { id: 'a', text: 'function myFunc():' },
          { id: 'b', text: 'def myFunc():' },
          { id: 'c', text: 'create myFunc():' },
          { id: 'd', text: 'func myFunc():' },
        ],
        correctAnswer: 'b',
        explanation: 'In Python, functions are defined using the "def" keyword followed by the function name and parentheses.'
      },
      {
        id: 2,
        question: 'What is the purpose of the "return" statement in a function?',
        options: [
          { id: 'a', text: 'To print a value to the console' },
          { id: 'b', text: 'To exit the function and return to the main program' },
          { id: 'c', text: 'To send a value back to the caller' },
          { id: 'd', text: 'To restart the function from the beginning' },
        ],
        correctAnswer: 'c',
        explanation: 'The return statement is used to send a value back to the caller of the function.'
      },
      {
        id: 3,
        question: 'What are *args and **kwargs used for in Python functions?',
        options: [
          { id: 'a', text: 'For mathematical operations' },
          { id: 'b', text: 'For handling variable-length argument lists' },
          { id: 'c', text: 'For importing modules' },
          { id: 'd', text: 'For defining class attributes' },
        ],
        correctAnswer: 'b',
        explanation: '*args allows a function to accept any number of positional arguments, and **kwargs allows it to accept any number of keyword arguments.'
      }
    ],
    xpReward: 100
  },
  'data-structures': {
    title: 'Python Data Structures Quiz',
    questions: [
      {
        id: 1,
        question: 'Which of the following is a mutable data structure in Python?',
        options: [
          { id: 'a', text: 'Tuple' },
          { id: 'b', text: 'String' },
          { id: 'c', text: 'List' },
          { id: 'd', text: 'Frozen Set' },
        ],
        correctAnswer: 'c',
        explanation: 'Lists are mutable, meaning they can be changed after creation. Tuples, strings, and frozen sets are immutable.'
      },
      {
        id: 2,
        question: 'How do you access the value of a key in a dictionary?',
        options: [
          { id: 'a', text: 'dict.get(key)' },
          { id: 'b', text: 'dict[key]' },
          { id: 'c', text: 'Both A and B' },
          { id: 'd', text: 'dict.value(key)' },
        ],
        correctAnswer: 'c',
        explanation: 'You can access dictionary values using either the square bracket notation dict[key] or the get() method dict.get(key).'
      },
      {
        id: 3,
        question: 'What is the output of set([1, 2, 2, 3, 3, 3])?',
        options: [
          { id: 'a', text: '[1, 2, 2, 3, 3, 3]' },
          { id: 'b', text: '{1, 2, 3}' },
          { id: 'c', text: '(1, 2, 3)' },
          { id: 'd', text: 'Error' },
        ],
        correctAnswer: 'b',
        explanation: 'Sets automatically remove duplicate elements, so the result is {1, 2, 3}.'
      }
    ],
    xpReward: 125
  }
};

const NodeQuiz = ({ nodeId, roadmapId, isOpen, onClose, onQuizComplete }) => {
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const { addXP } = useXP();
  const { markNodeAsCompleted } = useCompletedNodes();
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'navy.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    // Try to get quiz from course-specific quiz data first
    if (nodeId && nodejsQuizzes[nodeId]) {
      setCurrentQuiz(nodejsQuizzes[nodeId]);
    } else if (nodeId && nodeQuizzes[nodeId]) {
      setCurrentQuiz(nodeQuizzes[nodeId]);
    } else if (nodeId && sampleQuizzes[nodeId]) {
      setCurrentQuiz(sampleQuizzes[nodeId]);
    } else {
      // Fallback based on roadmap type
      if (roadmapId === 'nodejs' && Object.keys(nodejsQuizzes).length > 0) {
        const firstNodejsQuiz = Object.keys(nodejsQuizzes)[0];
        setCurrentQuiz(nodejsQuizzes[firstNodejsQuiz]);
      } else {
        const quizIds = Object.keys(nodeQuizzes).length > 0 ? Object.keys(nodeQuizzes) : Object.keys(sampleQuizzes);
        if (quizIds.length > 0) {
          setCurrentQuiz(quizIds[0].startsWith('node-') ? nodeQuizzes[quizIds[0]] : sampleQuizzes[quizIds[0]]);
        }
      }
    }

    // Reset state when modal opens
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizCompleted(false);
    setScore(0);
    setShowExplanation(false);
  }, [nodeId, isOpen]);

  const handleAnswerSelect = (questionId, answerId) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerId
    });
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate score
      let correctAnswers = 0;
      currentQuiz.questions.forEach(question => {
        if (selectedAnswers[question.id] === question.correctAnswer) {
          correctAnswers++;
        }
      });

      const finalScore = Math.round((correctAnswers / currentQuiz.questions.length) * 100);
      setScore(finalScore);
      setQuizCompleted(true);

      // Award XP based on score
      const earnedXP = Math.round((finalScore / 100) * currentQuiz.xpReward);
      if (earnedXP > 0) {
        addXP(earnedXP, `Completed ${currentQuiz.title}`);
        toast({
          title: `Earned ${earnedXP} XP!`,
          description: `You've been awarded XP for completing the quiz.`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
      
      // Mark node as completed if score is passing (85% or higher)
      if (finalScore >= 85 && roadmapId && nodeId) {
        markNodeAsCompleted(roadmapId, nodeId);
        toast({
          title: 'Node Completed!',
          description: 'This roadmap node has been marked as completed.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else if (finalScore >= 70 && finalScore < 85) {
        toast({
          title: 'Almost There!',
          description: 'You need a score of 85% or higher to complete this node. Try again!',
          status: 'warning',
          duration: 4000,
          isClosable: true,
        });
      }

      // Notify parent component that quiz is complete
      if (onQuizComplete) {
        onQuizComplete(finalScore, earnedXP, finalScore >= 85);
      }
    }
  };

  const handleCheckAnswer = () => {
    setShowExplanation(true);
  };

  const currentQuestion = currentQuiz?.questions[currentQuestionIndex];
  const isAnswerCorrect = currentQuestion && 
    selectedAnswers[currentQuestion.id] === currentQuestion.correctAnswer;

  if (!currentQuiz) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent bg={bgColor} color={textColor}>
        <ModalHeader borderBottomWidth="1px" borderColor={borderColor}>
          {currentQuiz.title}
          {!quizCompleted && (
            <Progress 
              value={(currentQuestionIndex / currentQuiz.questions.length) * 100} 
              size="sm" 
              colorScheme="blue" 
              mt={2} 
            />
          )}
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody py={6}>
          {!quizCompleted ? (
            <VStack spacing={6} align="stretch">
              <Box>
                <Text fontWeight="bold" fontSize="lg">
                  Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
                </Text>
                <Text mt={2}>{currentQuestion.question}</Text>
              </Box>
              
              <RadioGroup 
                onChange={(value) => handleAnswerSelect(currentQuestion.id, value)}
                value={selectedAnswers[currentQuestion.id] || ''}
              >
                <VStack spacing={3} align="stretch">
                  {currentQuestion.options.map((option) => (
                    <Radio 
                      key={option.id} 
                      value={option.id}
                      colorScheme="blue"
                      size="lg"
                      isDisabled={showExplanation}
                    >
                      <Text>{option.text}</Text>
                    </Radio>
                  ))}
                </VStack>
              </RadioGroup>
              
              {showExplanation && (
                <Box 
                  p={4} 
                  bg={isAnswerCorrect ? 'green.50' : 'red.50'} 
                  color={isAnswerCorrect ? 'green.700' : 'red.700'}
                  borderRadius="md"
                  borderWidth="1px"
                  borderColor={isAnswerCorrect ? 'green.200' : 'red.200'}
                >
                  <Text fontWeight="bold">
                    {isAnswerCorrect ? 'Correct!' : 'Incorrect'}
                  </Text>
                  <Text mt={2}>{currentQuestion.explanation}</Text>
                </Box>
              )}
            </VStack>
          ) : (
            <VStack spacing={6} align="center">
              <Heading size="md">Quiz Completed!</Heading>
              
              <Box 
                w="150px" 
                h="150px" 
                borderRadius="50%" 
                display="flex" 
                alignItems="center" 
                justifyContent="center"
                bg={score >= 85 ? 'green.100' : score >= 70 ? 'yellow.100' : score >= 40 ? 'orange.100' : 'red.100'}
                color={score >= 85 ? 'green.700' : score >= 70 ? 'yellow.700' : score >= 40 ? 'orange.700' : 'red.700'}
                borderWidth="4px"
                borderColor={score >= 85 ? 'green.400' : score >= 70 ? 'yellow.400' : score >= 40 ? 'orange.400' : 'red.400'}
              >
                <Text fontSize="3xl" fontWeight="bold">{score}%</Text>
              </Box>
              
              <VStack spacing={2} align="center">
                <Text>You answered {currentQuiz.questions.filter((q, idx) => 
                  selectedAnswers[q.id] === q.correctAnswer
                ).length} out of {currentQuiz.questions.length} questions correctly.</Text>
                
                <Badge 
                  colorScheme={score >= 85 ? 'green' : score >= 70 ? 'yellow' : score >= 40 ? 'orange' : 'red'}
                  fontSize="md"
                  px={3}
                  py={1}
                  borderRadius="full"
                >
                  {score >= 85 ? 'Excellent!' : score >= 70 ? 'Good job, but not quite there!' : score >= 40 ? 'Good effort!' : 'Keep practicing!'}
                </Badge>
              </VStack>
            </VStack>
          )}
        </ModalBody>

        <ModalFooter borderTopWidth="1px" borderColor={borderColor}>
          {!quizCompleted ? (
            <Flex width="100%" justify="space-between">
              {showExplanation ? (
                <Button onClick={handleNextQuestion} colorScheme="blue">
                  {currentQuestionIndex < currentQuiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </Button>
              ) : (
                <Button 
                  onClick={handleCheckAnswer} 
                  colorScheme="blue"
                  isDisabled={!selectedAnswers[currentQuestion.id]}
                >
                  Check Answer
                </Button>
              )}
            </Flex>
          ) : (
            <Button onClick={onClose} colorScheme="blue">
              Close
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NodeQuiz;