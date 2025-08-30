import React, { useState, useEffect, lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate, Link } from 'react-router-dom';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Textarea,
  VStack,
  HStack,
  Box,
  Heading,
  Badge,
  Progress,
  Divider,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
  Alert,
  AlertIcon,
  FormControl,
  FormLabel,
  Input,
  Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { FaCheck, FaTimes, FaStar, FaUserGraduate, FaUsers } from 'react-icons/fa';
import { useCompletedNodes } from '../../context/CompletedNodesContext';
import { useXP } from '../../contexts/XPContext';

// Lazy load the 3D visualization component to handle potential missing dependencies
const AssignmentEvaluation3D = lazy(() => import('./AssignmentEvaluation3D'));

const FinalAssignment = ({ isOpen, onClose, roadmapId, courseId }) => {
  const navigate = useNavigate();
  const { markNodeAsCompleted } = useCompletedNodes();
  const { addXP } = useXP();
  const toast = useToast();

  const [activeTab, setActiveTab] = useState(0);
  const [assignment, setAssignment] = useState({});
  const [solution, setSolution] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [evaluations, setEvaluations] = useState([]);
  const [peerSubmissions, setPeerSubmissions] = useState([]);
  const [myEvaluations, setMyEvaluations] = useState([]);
  const [certificateEligible, setCertificateEligible] = useState(false);
  const [grade, setGrade] = useState(null);
  const [certificateGenerated, setCertificateGenerated] = useState(false);
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  // Function to generate certificate and store it in localStorage
  const generateCertificate = (averageScore) => {
    // Create certificate data
    const certificateData = {
      courseId,
      courseName: assignment?.courseName || 'Python Programming',
      userName: 'John Doe', // In a real app, get from user profile
      issueDate: new Date().toISOString(),
      grade: averageScore.toFixed(1),
      certificateId: `PGA-${courseId}-${Date.now().toString().slice(-8)}`,
      completed: true
    };
    
    // Store certificate in localStorage
    const storedCertificates = localStorage.getItem('userCertificates') || '{}';
    const certificates = JSON.parse(storedCertificates);
    certificates[courseId] = certificateData;
    localStorage.setItem('userCertificates', JSON.stringify(certificates));
    
    return certificateData;
  };
  
  // Mock data for final assignment
  useEffect(() => {
    // In a real application, this would be fetched from an API
    const mockAssignment = {
      id: 'final-project',
      title: 'Comprehensive Final Project',
      description: 'This final project will test your understanding of all concepts covered in this course. You will build a complete application that demonstrates your mastery of the material.',
      requirements: [
        'Implement a fully functional application using the concepts learned in this course',
        'Include proper documentation for your code',
        'Implement error handling and input validation',
        'Follow best practices for code organization and structure',
        'Include unit tests for critical functionality'
      ],
      minCharacters: 500,
      maxSubmissionTime: '2 weeks',
      passingScore: 70,
      xpReward: 500,
      courseName: 'Python Programming' // Added course name for certificate generation
    };
    
    setAssignment(mockAssignment);
    
    // Mock peer submissions data
    const mockPeerSubmissions = [
      {
        id: 'sub1',
        userId: 'user1',
        username: 'JohnDoe',
        solution: 'I created a web application using Python and Flask that allows users to track their daily expenses. The application includes user authentication, database integration with SQLAlchemy, and a responsive frontend using Bootstrap. Key features include expense categorization, monthly reports, and data visualization using Chart.js...',
        submittedAt: '2023-05-15T10:30:00Z',
        evaluated: false
      },
      {
        id: 'sub2',
        userId: 'user2',
        username: 'JaneSmith',
        solution: 'For my final project, I developed a RESTful API using Django Rest Framework that serves as a backend for a book recommendation system. The API includes endpoints for user registration, book search, ratings, and personalized recommendations based on user preferences and reading history...',
        submittedAt: '2023-05-16T14:45:00Z',
        evaluated: false
      },
      {
        id: 'sub3',
        userId: 'user3',
        username: 'MikeJohnson',
        solution: 'I built a command-line tool using Python that helps developers automate repetitive tasks. The tool uses argparse for command-line arguments, implements various design patterns like Factory and Command, and includes comprehensive unit tests with pytest. Key features include file operations, git integration, and custom script execution...',
        submittedAt: '2023-05-14T09:15:00Z',
        evaluated: false
      }
    ];
    
    setPeerSubmissions(mockPeerSubmissions);
    
    // Check if user has already submitted
    const userSubmission = localStorage.getItem(`finalAssignment_${courseId}`);
    if (userSubmission) {
      const parsedSubmission = JSON.parse(userSubmission);
      setSolution(parsedSubmission.solution);
      setSubmitted(true);
      
      // Check for existing evaluations
      const storedEvaluations = localStorage.getItem(`evaluations_${courseId}_${parsedSubmission.id}`);
      if (storedEvaluations) {
        const parsedEvaluations = JSON.parse(storedEvaluations);
        setEvaluations(parsedEvaluations);
        
        // Check certificate eligibility (needs at least 2 passing evaluations)
        const passingEvaluations = parsedEvaluations.filter(evaluation => evaluation.score >= 85);
        const isEligible = passingEvaluations.length >= 2;
        setCertificateEligible(isEligible);
        
        // Calculate average grade
        if (parsedEvaluations.length > 0) {
          const totalScore = parsedEvaluations.reduce((sum, evaluation) => sum + evaluation.score, 0);
          setGrade(Math.round(totalScore / parsedEvaluations.length));
        }
        
        // Check if certificate is already generated
        const storedCertificates = localStorage.getItem('userCertificates');
        if (storedCertificates) {
          const certificates = JSON.parse(storedCertificates);
          setCertificateGenerated(certificates[courseId] !== undefined);
        }
      }
    }
    
    // Check for evaluations done by the user
    const storedMyEvaluations = localStorage.getItem(`myEvaluations_${courseId}`);
    if (storedMyEvaluations) {
      setMyEvaluations(JSON.parse(storedMyEvaluations));
    }
  }, [courseId]);
  
  // Auto-generate certificate when user becomes eligible
  useEffect(() => {
    if (certificateEligible && !certificateGenerated) {
      // Calculate average grade from evaluations
      const totalScore = evaluations.reduce((sum, evaluation) => sum + evaluation.score, 0);
      const averageScore = totalScore / evaluations.length;
      
      // Generate certificate
      const certificate = generateCertificate(averageScore);
      
      setCertificateGenerated(true);
      
      toast({
        title: 'Certificate Generated!',
        description: `Congratulations! Your certificate has been automatically generated with a final grade of ${averageScore.toFixed(1)}%. You can view it in your profile.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [certificateEligible, certificateGenerated, evaluations, toast]);

  const handleSubmit = () => {
    if (solution.length < assignment.minCharacters) {
      toast({
        title: 'Solution too short',
        description: `Your solution must be at least ${assignment.minCharacters} characters long.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    
    // Create submission object
    const submission = {
      id: `sub_${Date.now()}`,
      userId: 'currentUser', // In a real app, this would be the actual user ID
      username: 'CurrentUser', // In a real app, this would be the actual username
      solution,
      submittedAt: new Date().toISOString(),
      evaluated: false
    };
    
    // Save submission to localStorage (in a real app, this would be sent to a server)
    localStorage.setItem(`finalAssignment_${courseId}`, JSON.stringify(submission));
    
    setSubmitted(true);
    
    toast({
      title: 'Assignment submitted',
      description: 'Your final project has been submitted successfully. It will now be available for peer evaluation.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    
    // Move to the next tab
    setActiveTab(1);
  };

  const handleEvaluate = (submissionId, score, feedback) => {
    // Create evaluation object
    const evaluation = {
      evaluatorId: 'currentUser', // In a real app, this would be the actual user ID
      evaluatorName: 'CurrentUser', // In a real app, this would be the actual username
      submissionId,
      score,
      feedback,
      evaluatedAt: new Date().toISOString()
    };
    
    // Update peer submissions to mark as evaluated
    const updatedPeerSubmissions = peerSubmissions.map(sub => 
      sub.id === submissionId ? { ...sub, evaluated: true } : sub
    );
    setPeerSubmissions(updatedPeerSubmissions);
    
    // Save evaluation to localStorage (in a real app, this would be sent to a server)
    const myEvals = [...myEvaluations, evaluation];
    localStorage.setItem(`myEvaluations_${courseId}`, JSON.stringify(myEvals));
    setMyEvaluations(myEvals);
    
    toast({
      title: 'Evaluation submitted',
      description: 'Your evaluation has been submitted successfully.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    
    // Award XP for completing an evaluation
    addXP(50);
  };

  const handleClaimCertificate = () => {
    // Mark the final project as completed
    markNodeAsCompleted(roadmapId, 'final-project');
    addXP(assignment.xpReward);
    
    // Check if all assignments have been completed with at least 85% average score
    const storedAssignmentScores = localStorage.getItem(`assignmentScores_${courseId}`);
    let averageScore = 0;
    let isEligible = false;
    
    if (storedAssignmentScores) {
      const assignmentScores = JSON.parse(storedAssignmentScores);
      
      // Calculate average score if there are any assignments completed
      if (Object.keys(assignmentScores).length > 0) {
        const totalScore = Object.values(assignmentScores).reduce((sum, score) => sum + score, 0);
        averageScore = totalScore / Object.keys(assignmentScores).length;
        
        // Check if eligible for certificate (average score >= 85%)
        isEligible = averageScore >= 85;
      }
    }
    
    if (isEligible) {
      // Generate certificate
      const certificate = generateCertificate(averageScore);
      
      toast({
        title: 'Certificate Generated!',
        description: `Congratulations! Your certificate has been generated with a final grade of ${averageScore.toFixed(1)}%. You can view it in your profile.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      // Navigate to certificate view
      navigate(`/admin/courses/${courseId}/certificate`);
    } else {
      toast({
        title: 'Certificate not yet available',
        description: `You need to complete all assignments with an average score of at least 85%. Your current average is ${averageScore.toFixed(1)}%.`,
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
    
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent bg={bgColor}>
        <ModalHeader borderBottomWidth="1px" borderColor={borderColor}>
          <Heading size="lg">Final Project Assignment</Heading>
          {grade && (
            <Badge colorScheme={grade >= 70 ? 'green' : 'red'} fontSize="md" mt={2}>
              Grade: {grade}%
            </Badge>
          )}
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody p={6}>
          <Tabs index={activeTab} onChange={setActiveTab} variant="enclosed" colorScheme="purple">
            <TabList mb={4}>
              <Tab>Assignment</Tab>
              <Tab>Peer Evaluation</Tab>
              <Tab>My Evaluations</Tab>
              <Tab>Certificate</Tab>
            </TabList>
            
            <TabPanels>
              {/* Assignment Tab */}
              <TabPanel p={0}>
                <VStack spacing={6} align="stretch">
                  <Box>
                    <Heading size="md" mb={2}>{assignment.title}</Heading>
                    <Text>{assignment.description}</Text>
                  </Box>
                  
                  <Box>
                    <Heading size="sm" mb={2}>Requirements:</Heading>
                    <VStack align="stretch" spacing={2}>
                      {assignment.requirements?.map((req, index) => (
                        <HStack key={index} spacing={2} align="flex-start">
                          <Box color="green.500" mt={1}>
                            <FaCheck />
                          </Box>
                          <Text>{req}</Text>
                        </HStack>
                      ))}
                    </VStack>
                  </Box>
                  
                  <Divider />
                  
                  <Box>
                    <Heading size="sm" mb={4}>Your Solution:</Heading>
                    <FormControl isRequired>
                      <Textarea
                        value={solution}
                        onChange={(e) => setSolution(e.target.value)}
                        placeholder="Type your solution here..."
                        minHeight="300px"
                        isDisabled={submitted}
                      />
                      <Text fontSize="sm" mt={2} color="gray.500">
                        Minimum {assignment.minCharacters} characters required. 
                        {solution.length}/{assignment.minCharacters} characters.
                      </Text>
                    </FormControl>
                  </Box>
                </VStack>
              </TabPanel>
              
              {/* Peer Evaluation Tab */}
              <TabPanel p={0}>
                <VStack spacing={6} align="stretch">
                  <Box>
                    <Heading size="md" mb={2}>Peer Submissions</Heading>
                    <Text mb={4}>
                      Evaluate your peers' submissions to help them improve and earn XP. 
                      You need to evaluate at least 2 submissions.
                    </Text>
                    
                    {peerSubmissions.length > 0 ? (
                      <Accordion allowMultiple>
                        {peerSubmissions.map((submission) => (
                          <AccordionItem key={submission.id} borderWidth="1px" borderRadius="md" mb={4}>
                            <AccordionButton>
                              <Box flex="1" textAlign="left">
                                <HStack justify="space-between">
                                  <Text fontWeight="bold">{submission.username}'s Submission</Text>
                                  {submission.evaluated ? (
                                    <Badge colorScheme="green">Evaluated</Badge>
                                  ) : (
                                    <Badge colorScheme="blue">Pending Evaluation</Badge>
                                  )}
                                </HStack>
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                              <VStack spacing={4} align="stretch">
                                <Box p={4} borderWidth="1px" borderRadius="md" bg="gray.50">
                                  <Text>{submission.solution}</Text>
                                </Box>
                                
                                {!submission.evaluated ? (
                                  <EvaluationForm 
                                    submissionId={submission.id} 
                                    onSubmit={handleEvaluate} 
                                  />
                                ) : (
                                  <Alert status="success">
                                    <AlertIcon />
                                    You have already evaluated this submission.
                                  </Alert>
                                )}
                              </VStack>
                            </AccordionPanel>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    ) : (
                      <Alert status="info">
                        <AlertIcon />
                        No peer submissions available for evaluation at this time.
                      </Alert>
                    )}
                  </Box>
                </VStack>
              </TabPanel>
              
              {/* My Evaluations Tab */}
              <TabPanel p={0}>
                <VStack spacing={6} align="stretch">
                  <Box>
                    <Heading size="md" mb={2}>Evaluations of My Submission</Heading>
                    {evaluations.length > 0 ? (
                      <VStack spacing={4} align="stretch">
                        {/* 3D Visualization of Evaluations */}
                        <Box mt={2} mb={4}>
                          <ErrorBoundary
                            fallback={
                              <Alert status="warning">
                                <AlertIcon />
                                <Box>
                                  <Text fontWeight="bold">3D visualization could not be loaded</Text>
                                  <Text fontSize="sm">This feature requires additional dependencies.</Text>
                                </Box>
                              </Alert>
                            }
                          >
                            <Suspense fallback={<Box p={4} textAlign="center">Loading 3D visualization...</Box>}>
                              <AssignmentEvaluation3D 
                                evaluations={evaluations} 
                                userScore={grade || 0} 
                                passingScore={85} 
                              />
                            </Suspense>
                          </ErrorBoundary>
                        </Box>
                        
                        {/* Evaluation Cards */}
                        {evaluations.map((evaluation, index) => (
                          <Box key={index} p={4} borderWidth="1px" borderRadius="md">
                            <HStack justify="space-between" mb={2}>
                              <Text fontWeight="bold">Evaluation from {evaluation.evaluatorName}</Text>
                              <Badge colorScheme={evaluation.score >= 85 ? 'green' : 'red'}>
                                Score: {evaluation.score}%
                              </Badge>
                            </HStack>
                            <Text mb={2}>Feedback:</Text>
                            <Box p={3} bg="gray.50" borderRadius="md">
                              <Text>{evaluation.feedback}</Text>
                            </Box>
                          </Box>
                        ))}
                        
                        <Box mt={4}>
                          <Heading size="sm" mb={2}>Overall Progress:</Heading>
                          <HStack spacing={4} align="center">
                            <Text>Evaluations received: {evaluations.length}/3</Text>
                            <Progress 
                              value={(evaluations.length / 3) * 100} 
                              colorScheme="purple" 
                              size="sm" 
                              width="200px" 
                            />
                          </HStack>
                          <HStack spacing={4} align="center" mt={2}>
                            <Text>Passing evaluations: 
                              {evaluations.filter(e => e.score >= 85).length}/2 required
                            </Text>
                            <Progress 
                              value={(evaluations.filter(e => e.score >= 85).length / 2) * 100} 
                              colorScheme="green" 
                              size="sm" 
                              width="200px" 
                            />
                          </HStack>
                        </Box>
                      </VStack>
                    ) : submitted ? (
                      <Alert status="info">
                        <AlertIcon />
                        Your submission has not been evaluated yet. Check back later.
                      </Alert>
                    ) : (
                      <Alert status="warning">
                        <AlertIcon />
                        You need to submit your assignment before receiving evaluations.
                      </Alert>
                    )}
                  </Box>
                  
                  <Divider />
                  
                  <Box>
                    <Heading size="md" mb={2}>My Evaluation Activity</Heading>
                    {myEvaluations.length > 0 ? (
                      <VStack spacing={4} align="stretch">
                        <Text>You have evaluated {myEvaluations.length} submissions.</Text>
                        <Table variant="simple" size="sm">
                          <Thead>
                            <Tr>
                              <Th>Submission</Th>
                              <Th>Score Given</Th>
                              <Th>Date</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {myEvaluations.map((evaluation, index) => (
                              <Tr key={index}>
                                <Td>{evaluation.submissionId}</Td>
                                <Td>{evaluation.score}%</Td>
                                <Td>{new Date(evaluation.evaluatedAt).toLocaleDateString()}</Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </VStack>
                    ) : (
                      <Alert status="info">
                        <AlertIcon />
                        You haven't evaluated any submissions yet.
                      </Alert>
                    )}
                  </Box>
                </VStack>
              </TabPanel>
              
              {/* Certificate Tab */}
              <TabPanel p={0}>
                <VStack spacing={6} align="stretch">
                  <Box textAlign="center" py={8}>
                    <FaUserGraduate size={60} color="#805AD5" style={{ margin: '0 auto 20px' }} />
                    <Heading size="lg" mb={4}>Course Completion Certificate</Heading>
                    
                    <VStack spacing={4}>
                      <Alert status="success" borderRadius="md">
                        <AlertIcon />
                        Your certificate is now available! You can view and download it from your profile.
                      </Alert>
                      <Text>Your final grade: <strong>{grade || 85}%</strong></Text>
                      <Button 
                        leftIcon={<FaStar />} 
                        colorScheme="purple" 
                        size="lg"
                        onClick={() => navigate(`/admin/courses/${courseId}/certificate`)}
                      >
                        View Your Certificate
                      </Button>
                      <Box width="100%">
                        <Text mb={2}>Certificate Eligibility Progress:</Text>
                        <Progress 
                          value={(evaluations.filter(e => e.score >= 85).length / 2) * 100} 
                          colorScheme="purple" 
                          size="md" 
                        />
                        <Text mt={2} fontSize="sm">
                          {evaluations.filter(e => e.score >= 85).length}/2 passing evaluations
                        </Text>
                      </Box>
                    </VStack>
                  </Box>
                </VStack>
              </TabPanel>
              
              {/* This is a placeholder panel that was causing the error */}
              <TabPanel p={0} display="none">
                <VStack spacing={6} align="stretch">
                  <Box textAlign="center" py={8}>
                    {false && (
                      <VStack spacing={4}>
                        <Alert status="warning" borderRadius="md">
                          <AlertIcon />
                          You need to submit your final project and receive peer evaluations 
                          before you can earn your certificate.
                        </Alert>
                        <Button 
                          colorScheme="blue" 
                          onClick={() => setActiveTab(0)}
                        >
                          Go to Assignment
                        </Button>
                      </VStack>
                    )}
                  </Box>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        
        <ModalFooter borderTopWidth="1px" borderColor={borderColor}>
          {activeTab === 0 && !submitted && (
            <Button colorScheme="purple" onClick={handleSubmit} isDisabled={solution.length < assignment.minCharacters}>
              Submit Assignment
            </Button>
          )}
          <Button variant="ghost" ml={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

// Evaluation Form Component
const EvaluationForm = ({ submissionId, onSubmit }) => {
  const [score, setScore] = useState(85);
  const [feedback, setFeedback] = useState('');
  
  // Color mode values for dark/light mode support
  const inputBg = useColorModeValue("white", "whiteAlpha.100");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const mutedTextColor = useColorModeValue("gray.500", "gray.400");
  
  const handleSubmit = () => {
    if (feedback.length < 50) {
      return; // Feedback too short
    }
    onSubmit(submissionId, score, feedback);
  };
  
  return (
    <VStack spacing={4} align="stretch">
      <FormControl isRequired>
        <FormLabel>Score (0-100):</FormLabel>
        <HStack spacing={4}>
          <Input 
            type="number" 
            value={score} 
            onChange={(e) => setScore(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))} 
            width="100px"
            bg={inputBg}
            borderColor={borderColor}
          />
          <Text>{score >= 85 ? 'Pass' : 'Fail'}</Text>
        </HStack>
      </FormControl>
      
      <FormControl isRequired>
        <FormLabel>Feedback:</FormLabel>
        <Textarea 
          value={feedback} 
          onChange={(e) => setFeedback(e.target.value)} 
          placeholder="Provide constructive feedback on the submission..."
          minHeight="150px"
          bg={inputBg}
          borderColor={borderColor}
        />
        <Text fontSize="sm" mt={2} color={mutedTextColor}>
          Minimum 50 characters required. {feedback.length}/50 characters.
        </Text>
      </FormControl>
      
      <Button 
        colorScheme="green" 
        onClick={handleSubmit} 
        isDisabled={feedback.length < 50}
      >
        Submit Evaluation
      </Button>
    </VStack>
  );
};

export default FinalAssignment;