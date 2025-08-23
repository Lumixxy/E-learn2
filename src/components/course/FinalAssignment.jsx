import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  HStack,
  Text,
  Textarea,
  FormControl,
  FormLabel,
  Input,
  Box,
  Progress,
  Alert,
  AlertIcon,
  useToast,
  Divider,
  Code,
  Badge,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
  Select,
  Flex,
  Heading,
  Icon,
  Tooltip
} from '@chakra-ui/react';
import { FaCheck, FaTimes, FaUserGraduate, FaStar, FaStarHalfAlt, FaRegStar, FaInfoCircle } from 'react-icons/fa';

// Mock data for enrolled users - in a real app, this would come from a database
const MOCK_ENROLLED_USERS = [
  { id: 1, name: 'John Doe', avatar: 'https://via.placeholder.com/40' },
  { id: 2, name: 'Jane Smith', avatar: 'https://via.placeholder.com/40' },
  { id: 3, name: 'Alex Johnson', avatar: 'https://via.placeholder.com/40' },
  { id: 4, name: 'Maria Garcia', avatar: 'https://via.placeholder.com/40' },
  { id: 5, name: 'Robert Chen', avatar: 'https://via.placeholder.com/40' },
  { id: 6, name: 'Sarah Williams', avatar: 'https://via.placeholder.com/40' },
  { id: 7, name: 'David Brown', avatar: 'https://via.placeholder.com/40' },
  { id: 8, name: 'Lisa Taylor', avatar: 'https://via.placeholder.com/40' },
  { id: 9, name: 'Michael Wilson', avatar: 'https://via.placeholder.com/40' },
  { id: 10, name: 'Emily Davis', avatar: 'https://via.placeholder.com/40' },
];

// Mock data for submissions - in a real app, this would come from a database
const MOCK_SUBMISSIONS = [
  { userId: 3, content: 'This is a sample submission from Alex Johnson...', submittedAt: '2023-05-15' },
  { userId: 5, content: 'This is a sample submission from Robert Chen...', submittedAt: '2023-05-16' },
  { userId: 8, content: 'This is a sample submission from Lisa Taylor...', submittedAt: '2023-05-17' },
];

// Mock data for evaluations - in a real app, this would come from a database
const MOCK_EVALUATIONS = [
  { evaluatorId: 1, submissionUserId: 3, score: 85, feedback: 'Good work, but could improve code organization.', createdAt: '2023-05-18' },
  { evaluatorId: 2, submissionUserId: 3, score: 92, feedback: 'Excellent solution with clear documentation.', createdAt: '2023-05-19' },
  { evaluatorId: 4, submissionUserId: 5, score: 78, feedback: 'Meets requirements but lacks error handling.', createdAt: '2023-05-20' },
];

const FinalAssignment = ({ isOpen, onClose, courseId, courseName }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [submission, setSubmission] = useState('');
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState('not_submitted'); // not_submitted, submitted, evaluated
  const [evaluations, setEvaluations] = useState([]);
  const [currentEvaluation, setCurrentEvaluation] = useState({ submissionUserId: null, score: 0, feedback: '' });
  const [pendingEvaluations, setPendingEvaluations] = useState([]);
  const [completedEvaluations, setCompletedEvaluations] = useState([]);
  const [certificateEligible, setCertificateEligible] = useState(false);
  const toast = useToast();
  
  // Color mode values
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const mutedColor = useColorModeValue("gray.600", "gray.400");

  // Mock assignment details
  const assignment = {
    title: `${courseName} Final Project`,
    description: 'Complete a comprehensive real-world project that demonstrates your mastery of all course concepts.',
    instructions: `
    # Final Project Assignment

    ## Task Description
    Create a complete application that demonstrates your understanding of all the concepts covered in this course. Your project should be a real-world solution to a practical problem.

    ## Requirements
    - Implement all core concepts covered in the course
    - Create a well-structured, maintainable codebase
    - Include proper documentation
    - Implement error handling and edge cases
    - Follow best practices for the technologies used
    - Include tests where appropriate

    ## Evaluation Criteria
    Your submission will be evaluated by your peers based on:
    1. Functionality (30%)
    2. Code quality (25%)
    3. Documentation (15%)
    4. Innovation (15%)
    5. User experience (15%)

    ## Submission Guidelines
    - Submit your complete solution in the text area below
    - You may also upload a file containing your code or additional materials
    - Ensure your submission is well-formatted and easy to understand
    - Minimum 500 characters required
    `,
    minCharCount: 500,
    passingScore: 80
  };

  // Initialize with mock data
  useEffect(() => {
    // In a real app, these would be API calls
    setPendingEvaluations(MOCK_SUBMISSIONS.filter(sub => 
      !MOCK_EVALUATIONS.some(eval => eval.evaluatorId === 1 && eval.submissionUserId === sub.userId)
    ));
    
    setCompletedEvaluations(MOCK_EVALUATIONS.filter(eval => eval.evaluatorId === 1));
    
    // Check if current user has submitted
    const userSubmission = MOCK_SUBMISSIONS.find(sub => sub.userId === 1);
    if (userSubmission) {
      setSubmission(userSubmission.content);
      setSubmissionStatus('submitted');
      
      // Get evaluations for current user's submission
      const userEvals = MOCK_EVALUATIONS.filter(eval => eval.submissionUserId === 1);
      setEvaluations(userEvals);
      
      // Check if eligible for certificate (at least 2 passing evaluations)
      const passingEvals = userEvals.filter(eval => eval.score >= assignment.passingScore);
      setCertificateEligible(passingEvals.length >= 2);
    }
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (submission.trim().length < assignment.minCharCount) {
      toast({
        title: 'Submission too short',
        description: `Your submission must be at least ${assignment.minCharCount} characters long.`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate submission (in a real app, this would be a backend call)
    setTimeout(() => {
      setSubmissionStatus('submitted');
      setIsSubmitting(false);
      toast({
        title: 'Submission successful',
        description: 'Your assignment has been submitted for peer evaluation.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }, 1500);
  };

  const handleEvaluationChange = (field, value) => {
    setCurrentEvaluation(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const submitEvaluation = () => {
    if (!currentEvaluation.submissionUserId) {
      toast({
        title: 'Error',
        description: 'Please select a submission to evaluate.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (currentEvaluation.score < 0 || currentEvaluation.score > 100) {
      toast({
        title: 'Invalid score',
        description: 'Score must be between 0 and 100.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (currentEvaluation.feedback.trim().length < 10) {
      toast({
        title: 'Feedback too short',
        description: 'Please provide meaningful feedback (at least 10 characters).',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Simulate saving evaluation (in a real app, this would be a backend call)
    toast({
      title: 'Evaluation submitted',
      description: 'Your evaluation has been recorded.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    // Update UI state
    setPendingEvaluations(prev => prev.filter(sub => sub.userId !== currentEvaluation.submissionUserId));
    setCompletedEvaluations(prev => [
      ...prev,
      {
        evaluatorId: 1, // Current user
        submissionUserId: currentEvaluation.submissionUserId,
        score: currentEvaluation.score,
        feedback: currentEvaluation.feedback,
        createdAt: new Date().toISOString().split('T')[0]
      }
    ]);
    
    // Reset current evaluation
    setCurrentEvaluation({ submissionUserId: null, score: 0, feedback: '' });
  };

  // Render star rating
  const renderStarRating = (score) => {
    const stars = [];
    const fullStars = Math.floor(score / 20);
    const halfStar = score % 20 >= 10;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Icon key={i} as={FaStar} color="yellow.400" />);
      } else if (i === fullStars && halfStar) {
        stars.push(<Icon key={i} as={FaStarHalfAlt} color="yellow.400" />);
      } else {
        stars.push(<Icon key={i} as={FaRegStar} color="yellow.400" />);
      }
    }
    
    return <HStack spacing={1}>{stars}</HStack>;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="5xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{assignment.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs index={activeTab} onChange={setActiveTab} variant="enclosed">
            <TabList>
              <Tab>Assignment</Tab>
              <Tab>Peer Evaluations</Tab>
              <Tab>My Evaluations</Tab>
              <Tab>Certificate Status</Tab>
            </TabList>

            <TabPanels>
              {/* Assignment Tab */}
              <TabPanel>
                <VStack spacing={4} align="stretch">
                  <Text fontWeight="bold">Instructions:</Text>
                  <Text>{assignment.description}</Text>
                  
                  <Box p={4} borderRadius="md" bg="gray.50" whiteSpace="pre-wrap">
                    <Text whiteSpace="pre-wrap">{assignment.instructions}</Text>
                  </Box>
                  
                  {submissionStatus === 'not_submitted' ? (
                    <>
                      <FormControl isRequired>
                        <FormLabel>Your Solution</FormLabel>
                        <Textarea
                          value={submission}
                          onChange={(e) => setSubmission(e.target.value)}
                          placeholder="Type your solution here..."
                          minHeight="300px"
                          isDisabled={isSubmitting}
                        />
                        <Text fontSize="sm" color="gray.500" mt={1}>
                          Minimum {assignment.minCharCount} characters required. Currently: {submission.length}
                        </Text>
                      </FormControl>

                      <FormControl>
                        <FormLabel>Upload Solution File (Optional)</FormLabel>
                        <Input
                          type="file"
                          onChange={handleFileChange}
                          p={1}
                          isDisabled={isSubmitting}
                        />
                        <Text fontSize="sm" color="gray.500" mt={1}>
                          Accepted formats: .py, .txt, .pdf, .zip
                        </Text>
                      </FormControl>

                      <Button
                        colorScheme="blue"
                        onClick={handleSubmit}
                        isLoading={isSubmitting}
                        loadingText="Submitting..."
                        width="200px"
                        alignSelf="flex-end"
                      >
                        Submit Assignment
                      </Button>
                    </>
                  ) : (
                    <>
                      <Alert status="success">
                        <AlertIcon />
                        Your assignment has been submitted. It will be evaluated by your peers.
                      </Alert>
                      
                      <Box p={4} borderRadius="md" border="1px solid" borderColor={borderColor}>
                        <Text fontWeight="bold">Your Submission:</Text>
                        <Text mt={2}>{submission}</Text>
                      </Box>
                      
                      {evaluations.length > 0 ? (
                        <Box>
                          <Text fontWeight="bold" mb={2}>Evaluations Received:</Text>
                          <VStack spacing={3} align="stretch">
                            {evaluations.map((eval, index) => (
                              <Box key={index} p={3} borderRadius="md" bg={cardBg} boxShadow="sm" border="1px solid" borderColor={borderColor}>
                                <HStack justify="space-between">
                                  <HStack>
                                    <Badge colorScheme={eval.score >= assignment.passingScore ? "green" : "red"}>
                                      Score: {eval.score}/100
                                    </Badge>
                                    <Text fontSize="sm" color={mutedColor}>{eval.createdAt}</Text>
                                  </HStack>
                                  {renderStarRating(eval.score)}
                                </HStack>
                                <Text mt={2}>{eval.feedback}</Text>
                              </Box>
                            ))}
                          </VStack>
                        </Box>
                      ) : (
                        <Alert status="info">
                          <AlertIcon />
                          No evaluations received yet. Check back later.
                        </Alert>
                      )}
                    </>
                  )}
                </VStack>
              </TabPanel>

              {/* Peer Evaluations Tab */}
              <TabPanel>
                <VStack spacing={4} align="stretch">
                  <Text>Evaluate your peers' submissions to help them improve and earn your own certificate.</Text>
                  
                  {pendingEvaluations.length > 0 ? (
                    <Box>
                      <FormControl mb={4}>
                        <FormLabel>Select a submission to evaluate:</FormLabel>
                        <Select 
                          placeholder="Choose a submission"
                          value={currentEvaluation.submissionUserId || ''}
                          onChange={(e) => handleEvaluationChange('submissionUserId', parseInt(e.target.value))}
                        >
                          {pendingEvaluations.map(sub => {
                            const user = MOCK_ENROLLED_USERS.find(u => u.id === sub.userId);
                            return (
                              <option key={sub.userId} value={sub.userId}>
                                {user?.name} - Submitted on {sub.submittedAt}
                              </option>
                            );
                          })}
                        </Select>
                      </FormControl>

                      {currentEvaluation.submissionUserId && (
                        <Box>
                          <Box p={4} borderRadius="md" border="1px solid" borderColor={borderColor} mb={4}>
                            <Text fontWeight="bold">Submission Content:</Text>
                            <Text mt={2}>
                              {pendingEvaluations.find(s => s.userId === currentEvaluation.submissionUserId)?.content}
                            </Text>
                          </Box>

                          <FormControl mb={4}>
                            <FormLabel>
                              <HStack>
                                <Text>Score (0-100)</Text>
                                <Tooltip label="Score based on functionality (30%), code quality (25%), documentation (15%), innovation (15%), user experience (15%)">
                                  <span><Icon as={FaInfoCircle} color={mutedColor} /></span>
                                </Tooltip>
                              </HStack>
                            </FormLabel>
                            <Input 
                              type="number" 
                              min={0} 
                              max={100} 
                              value={currentEvaluation.score}
                              onChange={(e) => handleEvaluationChange('score', parseInt(e.target.value))}
                            />
                          </FormControl>

                          <FormControl mb={4}>
                            <FormLabel>Feedback</FormLabel>
                            <Textarea
                              value={currentEvaluation.feedback}
                              onChange={(e) => handleEvaluationChange('feedback', e.target.value)}
                              placeholder="Provide constructive feedback..."
                              minHeight="150px"
                            />
                          </FormControl>

                          <Button colorScheme="blue" onClick={submitEvaluation}>
                            Submit Evaluation
                          </Button>
                        </Box>
                      )}
                    </Box>
                  ) : (
                    <Alert status="info">
                      <AlertIcon />
                      No pending submissions to evaluate at this time.
                    </Alert>
                  )}
                </VStack>
              </TabPanel>

              {/* My Evaluations Tab */}
              <TabPanel>
                <VStack spacing={4} align="stretch">
                  <Text>Evaluations you have completed for other students:</Text>
                  
                  {completedEvaluations.length > 0 ? (
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Student</Th>
                          <Th>Date</Th>
                          <Th>Score</Th>
                          <Th>Feedback</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {completedEvaluations.map((eval, index) => {
                          const user = MOCK_ENROLLED_USERS.find(u => u.id === eval.submissionUserId);
                          return (
                            <Tr key={index}>
                              <Td>{user?.name}</Td>
                              <Td>{eval.createdAt}</Td>
                              <Td>
                                <Badge colorScheme={eval.score >= assignment.passingScore ? "green" : "red"}>
                                  {eval.score}/100
                                </Badge>
                              </Td>
                              <Td>{eval.feedback}</Td>
                            </Tr>
                          );
                        })}
                      </Tbody>
                    </Table>
                  ) : (
                    <Alert status="info">
                      <AlertIcon />
                      You haven't evaluated any submissions yet.
                    </Alert>
                  )}
                </VStack>
              </TabPanel>

              {/* Certificate Status Tab */}
              <TabPanel>
                <VStack spacing={6} align="stretch">
                  <Box textAlign="center" py={8}>
                    <Icon as={FaUserGraduate} boxSize={16} color={certificateEligible ? "green.500" : "gray.400"} mb={4} />
                    <Heading size="lg" mb={2}>
                      Certificate Status
                    </Heading>
                    <Text fontSize="md" color={mutedColor} mb={6}>
                      You need at least 2 passing evaluations (score ≥ {assignment.passingScore}) to earn your certificate
                    </Text>
                    
                    <Box 
                      p={6} 
                      borderRadius="lg" 
                      bg={certificateEligible ? "green.50" : "gray.50"}
                      borderWidth="1px"
                      borderColor={certificateEligible ? "green.200" : "gray.200"}
                    >
                      <HStack spacing={4} justify="center">
                        <Icon 
                          as={certificateEligible ? FaCheck : FaTimes} 
                          color={certificateEligible ? "green.500" : "red.500"}
                          boxSize={8}
                        />
                        <VStack align="start" spacing={1}>
                          <Text fontWeight="bold" fontSize="lg">
                            {certificateEligible ? "Eligible for Certificate" : "Not Yet Eligible"}
                          </Text>
                          <Text>
                            {certificateEligible 
                              ? "Congratulations! You've met the requirements to earn your certificate." 
                              : `You have received ${evaluations.filter(e => e.score >= assignment.passingScore).length}/2 passing evaluations.`
                            }
                          </Text>
                        </VStack>
                      </HStack>
                    </Box>
                    
                    {certificateEligible && (
                      <Button 
                        colorScheme="green" 
                        size="lg" 
                        mt={8}
                        leftIcon={<FaCertificate />}
                        onClick={() => {
                          toast({
                            title: "Certificate Generated",
                            description: "Your certificate has been generated and added to your profile.",
                            status: "success",
                            duration: 5000,
                            isClosable: true,
                          });
                        }}
                      >
                        View My Certificate
                      </Button>
                    )}
                  </Box>
                  
                  <Divider />
                  
                  <Box>
                    <Text fontWeight="bold" mb={2}>Evaluation Summary:</Text>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Evaluator</Th>
                          <Th>Date</Th>
                          <Th>Score</Th>
                          <Th>Status</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {evaluations.length > 0 ? (
                          evaluations.map((eval, index) => {
                            const evaluator = MOCK_ENROLLED_USERS.find(u => u.id === eval.evaluatorId);
                            const isPassing = eval.score >= assignment.passingScore;
                            return (
                              <Tr key={index}>
                                <Td>{evaluator?.name}</Td>
                                <Td>{eval.createdAt}</Td>
                                <Td>{eval.score}/100</Td>
                                <Td>
                                  <Badge colorScheme={isPassing ? "green" : "red"}>
                                    {isPassing ? "Pass" : "Fail"}
                                  </Badge>
                                </Td>
                              </Tr>
                            );
                          })
                        ) : (
                          <Tr>
                            <Td colSpan={4} textAlign="center">No evaluations received yet</Td>
                          </Tr>
                        )}
                      </Tbody>
                    </Table>
                  </Box>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FinalAssignment;