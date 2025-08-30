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
  Badge,
  Progress,
  Alert,
  AlertIcon,
  useToast,
  useColorModeValue,
  Icon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Divider,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  RadioGroup,
  Radio,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Flex,
  Avatar,
  AvatarBadge
} from '@chakra-ui/react';
import { 
  FiUsers, 
  FiStar, 
  FiCheck, 
  FiClock, 
  FiMessageSquare,
  FiAward,
  FiTarget,
  FiCode,
  FiBookOpen
} from 'react-icons/fi';
import { useXP } from '../../contexts/XPContext';

const PeerEvaluation = ({ 
  isOpen, 
  onClose, 
  submissionId,
  courseId,
  assignmentData,
  onEvaluationComplete 
}) => {
  const [currentSubmission, setCurrentSubmission] = useState(null);
  const [evaluation, setEvaluation] = useState({
    correctness: 5,
    codeQuality: 5,
    creativity: 5,
    comments: '',
    overallScore: 85
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [evaluationHistory, setEvaluationHistory] = useState([]);
  const [availableSubmissions, setAvailableSubmissions] = useState([]);
  
  const toast = useToast();
  const { awardXP } = useXP();
  
  // Color mode values
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const cardBg = useColorModeValue('gray.50', 'gray.700');

  // Sample submissions for demonstration
  const SAMPLE_SUBMISSIONS = [
    {
      id: 'sub-001',
      studentName: 'Anonymous Student A',
      submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      code: `# Problem 1: Simple Calculator
def calculator():
    num1 = float(input("Enter first number: "))
    num2 = float(input("Enter second number: "))
    operation = input("Enter operation (+, -, *, /): ")
    
    if operation == '+':
        result = num1 + num2
    elif operation == '-':
        result = num1 - num2
    elif operation == '*':
        result = num1 * num2
    elif operation == '/':
        if num2 != 0:
            result = num1 / num2
        else:
            return "Error: Division by zero"
    else:
        return "Invalid operation"
    
    return f"Result: {result}"

calculator()`,
      problemsCompleted: 3,
      estimatedEffort: 'High'
    },
    {
      id: 'sub-002',
      studentName: 'Anonymous Student B',
      submittedAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      code: `# Problem 1: Simple Calculator
def calculator():
    a = input("First number: ")
    b = input("Second number: ")
    op = input("Operation: ")
    
    a = float(a)
    b = float(b)
    
    if op == "+":
        print(a + b)
    elif op == "-":
        print(a - b)
    elif op == "*":
        print(a * b)
    elif op == "/":
        print(a / b)

calculator()`,
      problemsCompleted: 2,
      estimatedEffort: 'Medium'
    }
  ];

  useEffect(() => {
    if (isOpen) {
      // Load available submissions for peer review
      setAvailableSubmissions(SAMPLE_SUBMISSIONS);
      
      // Load the first submission for review
      if (SAMPLE_SUBMISSIONS.length > 0) {
        setCurrentSubmission(SAMPLE_SUBMISSIONS[0]);
      }
      
      // Reset evaluation state
      setEvaluation({
        correctness: 5,
        codeQuality: 5,
        creativity: 5,
        comments: '',
        overallScore: 85
      });
      
      // Load evaluation history (mock data)
      setEvaluationHistory([
        {
          id: 'eval-001',
          assignmentTitle: 'Problem Set 1: Introduction to Python',
          evaluatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
          score: 92,
          xpEarned: 50
        },
        {
          id: 'eval-002',
          assignmentTitle: 'Problem Set 2: Branching and Iteration',
          evaluatedAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
          score: 88,
          xpEarned: 45
        }
      ]);
    }
  }, [isOpen]);

  // Calculate overall score based on criteria
  useEffect(() => {
    const avgScore = (evaluation.correctness + evaluation.codeQuality + evaluation.creativity) / 3;
    const overallScore = Math.round(avgScore * 20); // Convert to percentage
    setEvaluation(prev => ({ ...prev, overallScore }));
  }, [evaluation.correctness, evaluation.codeQuality, evaluation.creativity]);

  const handleCriteriaChange = (criteria, value) => {
    setEvaluation(prev => ({
      ...prev,
      [criteria]: value
    }));
  };

  const handleSubmitEvaluation = async () => {
    if (!evaluation.comments.trim()) {
      toast({
        title: "Comments Required",
        description: "Please provide constructive feedback in the comments section.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Award XP for peer evaluation
      const xpResult = awardXP('peer_evaluation', 50, {
        submissionId: currentSubmission.id,
        score: evaluation.overallScore
      });

      toast({
        title: "🎯 Evaluation Submitted!",
        description: `Thank you for your peer review! +${xpResult.xpAwarded} XP ${xpResult.leveledUp ? `• Level up to ${xpResult.newLevel}!` : ''}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Add to evaluation history
      setEvaluationHistory(prev => [{
        id: `eval-${Date.now()}`,
        assignmentTitle: assignmentData?.title || 'Assignment',
        evaluatedAt: new Date(),
        score: evaluation.overallScore,
        xpEarned: xpResult.xpAwarded
      }, ...prev]);

      // Load next submission if available
      const currentIndex = availableSubmissions.findIndex(sub => sub.id === currentSubmission.id);
      if (currentIndex < availableSubmissions.length - 1) {
        setCurrentSubmission(availableSubmissions[currentIndex + 1]);
        setEvaluation({
          correctness: 5,
          codeQuality: 5,
          creativity: 5,
          comments: '',
          overallScore: 85
        });
      } else {
        // No more submissions to review
        if (onEvaluationComplete) {
          onEvaluationComplete(evaluationHistory.length + 1);
        }
        onClose();
      }

    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your evaluation. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'green';
    if (score >= 80) return 'blue';
    if (score >= 70) return 'yellow';
    return 'red';
  };

  const formatTimeAgo = (date) => {
    const hours = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60));
    if (hours < 1) return 'Less than an hour ago';
    if (hours === 1) return '1 hour ago';
    return `${hours} hours ago`;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent maxW="90vw" bg={bgColor}>
        <ModalHeader>
          <HStack spacing={3}>
            <Icon as={FiUsers} color="purple.500" />
            <VStack align="start" spacing={0}>
              <Text>Peer Evaluation System</Text>
              <Text fontSize="sm" color={mutedColor} fontWeight="normal">
                Help your peers improve by providing constructive feedback
              </Text>
            </VStack>
          </HStack>
        </ModalHeader>
        
        <ModalBody>
          <Tabs>
            <TabList>
              <Tab>Current Review</Tab>
              <Tab>Evaluation History</Tab>
              <Tab>Guidelines</Tab>
            </TabList>
            
            <TabPanels>
              {/* Current Review Tab */}
              <TabPanel>
                {currentSubmission ? (
                  <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
                    {/* Submission Details */}
                    <VStack spacing={4} align="stretch">
                      <Card bg={cardBg}>
                        <CardHeader>
                          <HStack justify="space-between">
                            <VStack align="start" spacing={1}>
                              <HStack>
                                <Avatar size="sm" name={currentSubmission.studentName}>
                                  <AvatarBadge boxSize="1em" bg="green.500" />
                                </Avatar>
                                <Text fontWeight="bold">{currentSubmission.studentName}</Text>
                              </HStack>
                              <HStack fontSize="sm" color={mutedColor}>
                                <Icon as={FiClock} />
                                <Text>{formatTimeAgo(currentSubmission.submittedAt)}</Text>
                              </HStack>
                            </VStack>
                            <VStack align="end" spacing={1}>
                              <Badge colorScheme="purple">
                                {currentSubmission.problemsCompleted}/3 Problems
                              </Badge>
                              <Badge colorScheme="blue" variant="outline">
                                {currentSubmission.estimatedEffort} Effort
                              </Badge>
                            </VStack>
                          </HStack>
                        </CardHeader>
                        
                        <CardBody>
                          <VStack align="start" spacing={3}>
                            <HStack>
                              <Icon as={FiCode} color="blue.500" />
                              <Text fontWeight="bold">Submitted Code:</Text>
                            </HStack>
                            <Box
                              p={4}
                              bg={bgColor}
                              borderRadius="md"
                              border="1px"
                              borderColor={borderColor}
                              fontFamily="mono"
                              fontSize="sm"
                              whiteSpace="pre-wrap"
                              maxH="400px"
                              overflowY="auto"
                              w="full"
                            >
                              {currentSubmission.code}
                            </Box>
                          </VStack>
                        </CardBody>
                      </Card>
                    </VStack>

                    {/* Evaluation Form */}
                    <VStack spacing={4} align="stretch">
                      <Card bg={cardBg}>
                        <CardHeader>
                          <HStack>
                            <Icon as={FiTarget} color="green.500" />
                            <Text fontWeight="bold">Your Evaluation</Text>
                          </HStack>
                        </CardHeader>
                        
                        <CardBody>
                          <VStack spacing={6} align="stretch">
                            {/* Evaluation Criteria */}
                            <VStack spacing={4} align="stretch">
                              <Text fontWeight="bold" color={textColor}>Evaluation Criteria (1-10 scale):</Text>
                              
                              {/* Correctness */}
                              <Box>
                                <HStack justify="space-between" mb={2}>
                                  <Text fontSize="sm" fontWeight="medium">Correctness & Logic</Text>
                                  <Badge colorScheme="blue">{evaluation.correctness}/10</Badge>
                                </HStack>
                                <Slider
                                  value={evaluation.correctness}
                                  onChange={(value) => handleCriteriaChange('correctness', value)}
                                  min={1}
                                  max={10}
                                  step={1}
                                  colorScheme="blue"
                                >
                                  <SliderTrack>
                                    <SliderFilledTrack />
                                  </SliderTrack>
                                  <SliderThumb />
                                </Slider>
                                <Text fontSize="xs" color={mutedColor} mt={1}>
                                  Does the code solve the problem correctly?
                                </Text>
                              </Box>

                              {/* Code Quality */}
                              <Box>
                                <HStack justify="space-between" mb={2}>
                                  <Text fontSize="sm" fontWeight="medium">Code Quality & Style</Text>
                                  <Badge colorScheme="green">{evaluation.codeQuality}/10</Badge>
                                </HStack>
                                <Slider
                                  value={evaluation.codeQuality}
                                  onChange={(value) => handleCriteriaChange('codeQuality', value)}
                                  min={1}
                                  max={10}
                                  step={1}
                                  colorScheme="green"
                                >
                                  <SliderTrack>
                                    <SliderFilledTrack />
                                  </SliderTrack>
                                  <SliderThumb />
                                </Slider>
                                <Text fontSize="xs" color={mutedColor} mt={1}>
                                  Is the code well-structured and readable?
                                </Text>
                              </Box>

                              {/* Creativity */}
                              <Box>
                                <HStack justify="space-between" mb={2}>
                                  <Text fontSize="sm" fontWeight="medium">Creativity & Approach</Text>
                                  <Badge colorScheme="purple">{evaluation.creativity}/10</Badge>
                                </HStack>
                                <Slider
                                  value={evaluation.creativity}
                                  onChange={(value) => handleCriteriaChange('creativity', value)}
                                  min={1}
                                  max={10}
                                  step={1}
                                  colorScheme="purple"
                                >
                                  <SliderTrack>
                                    <SliderFilledTrack />
                                  </SliderTrack>
                                  <SliderThumb />
                                </Slider>
                                <Text fontSize="xs" color={mutedColor} mt={1}>
                                  Is the solution creative or innovative?
                                </Text>
                              </Box>
                            </VStack>

                            <Divider />

                            {/* Overall Score Display */}
                            <Box textAlign="center" p={4} bg={bgColor} borderRadius="lg">
                              <Text fontSize="sm" color={mutedColor} mb={2}>Overall Score</Text>
                              <Text fontSize="3xl" fontWeight="bold" color={`${getScoreColor(evaluation.overallScore)}.500`}>
                                {evaluation.overallScore}%
                              </Text>
                              <Progress 
                                value={evaluation.overallScore} 
                                colorScheme={getScoreColor(evaluation.overallScore)}
                                size="lg"
                                borderRadius="full"
                                mt={2}
                              />
                            </Box>

                            <Divider />

                            {/* Comments */}
                            <VStack align="start" spacing={2}>
                              <Text fontWeight="bold" color={textColor}>
                                Constructive Feedback <Text as="span" color="red.500">*</Text>
                              </Text>
                              <Textarea
                                value={evaluation.comments}
                                onChange={(e) => setEvaluation(prev => ({ ...prev, comments: e.target.value }))}
                                placeholder="Provide specific, constructive feedback to help your peer improve. What did they do well? What could be improved? Any suggestions?"
                                rows={4}
                                resize="vertical"
                              />
                              <Text fontSize="xs" color={mutedColor}>
                                Minimum 50 characters required. Be specific and helpful.
                              </Text>
                            </VStack>
                          </VStack>
                        </CardBody>
                      </Card>
                    </VStack>
                  </SimpleGrid>
                ) : (
                  <Alert status="info">
                    <AlertIcon />
                    No submissions available for peer review at this time.
                  </Alert>
                )}
              </TabPanel>

              {/* Evaluation History Tab */}
              <TabPanel>
                <VStack spacing={4} align="stretch">
                  <HStack justify="space-between">
                    <Text fontSize="lg" fontWeight="bold">Your Evaluation History</Text>
                    <Badge colorScheme="purple" px={3} py={1} borderRadius="full">
                      {evaluationHistory.length} Reviews Completed
                    </Badge>
                  </HStack>
                  
                  {evaluationHistory.length > 0 ? (
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                      {evaluationHistory.map((evaluation) => (
                        <Card key={evaluation.id} bg={cardBg}>
                          <CardBody>
                            <VStack align="start" spacing={3}>
                              <HStack justify="space-between" w="full">
                                <Text fontWeight="bold" fontSize="sm" noOfLines={1}>
                                  {evaluation.assignmentTitle}
                                </Text>
                                <Badge colorScheme={getScoreColor(evaluation.score)}>
                                  {evaluation.score}%
                                </Badge>
                              </HStack>
                              
                              <HStack fontSize="xs" color={mutedColor}>
                                <Icon as={FiClock} />
                                <Text>{evaluation.evaluatedAt.toLocaleDateString()}</Text>
                              </HStack>
                              
                              <HStack>
                                <Icon as={FiAward} color="yellow.500" />
                                <Text fontSize="sm" color="yellow.500" fontWeight="bold">
                                  +{evaluation.xpEarned} XP
                                </Text>
                              </HStack>
                            </VStack>
                          </CardBody>
                        </Card>
                      ))}
                    </SimpleGrid>
                  ) : (
                    <Alert status="info">
                      <AlertIcon />
                      You haven't completed any peer evaluations yet. Start reviewing to earn XP!
                    </Alert>
                  )}
                </VStack>
              </TabPanel>

              {/* Guidelines Tab */}
              <TabPanel>
                <VStack spacing={6} align="stretch">
                  <Card bg={cardBg}>
                    <CardHeader>
                      <HStack>
                        <Icon as={FiBookOpen} color="blue.500" />
                        <Text fontWeight="bold">Peer Evaluation Guidelines</Text>
                      </HStack>
                    </CardHeader>
                    
                    <CardBody>
                      <VStack align="start" spacing={4}>
                        <Box>
                          <Text fontWeight="bold" mb={2}>🎯 Evaluation Criteria:</Text>
                          <VStack align="start" spacing={1} pl={4}>
                            <Text fontSize="sm">• <strong>Correctness (1-10):</strong> Does the code solve the problem correctly?</Text>
                            <Text fontSize="sm">• <strong>Code Quality (1-10):</strong> Is the code well-structured, readable, and follows best practices?</Text>
                            <Text fontSize="sm">• <strong>Creativity (1-10):</strong> Is the solution innovative or shows creative thinking?</Text>
                          </VStack>
                        </Box>

                        <Box>
                          <Text fontWeight="bold" mb={2}>💬 Feedback Guidelines:</Text>
                          <VStack align="start" spacing={1} pl={4}>
                            <Text fontSize="sm">• Be constructive and specific in your comments</Text>
                            <Text fontSize="sm">• Highlight what the student did well</Text>
                            <Text fontSize="sm">• Suggest concrete improvements</Text>
                            <Text fontSize="sm">• Avoid harsh criticism; focus on learning</Text>
                            <Text fontSize="sm">• Provide examples when possible</Text>
                          </VStack>
                        </Box>

                        <Box>
                          <Text fontWeight="bold" mb={2}>🏆 Rewards:</Text>
                          <VStack align="start" spacing={1} pl={4}>
                            <Text fontSize="sm">• Earn 50 XP for each completed evaluation</Text>
                            <Text fontSize="sm">• Complete 2 evaluations to become eligible for certificates</Text>
                            <Text fontSize="sm">• Quality evaluations may earn bonus XP</Text>
                          </VStack>
                        </Box>

                        <Alert status="success">
                          <AlertIcon />
                          <Text fontSize="sm">
                            Remember: Peer evaluation is a learning opportunity for both you and your classmates. 
                            Your thoughtful feedback helps create a supportive learning community!
                          </Text>
                        </Alert>
                      </VStack>
                    </CardBody>
                  </Card>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        
        <ModalFooter>
          <HStack spacing={3}>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            {currentSubmission && (
              <Button 
                colorScheme="purple" 
                onClick={handleSubmitEvaluation}
                isLoading={isSubmitting}
                loadingText="Submitting..."
                isDisabled={evaluation.comments.length < 50}
                leftIcon={<Icon as={FiCheck} />}
              >
                Submit Evaluation (+50 XP)
              </Button>
            )}
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PeerEvaluation;
