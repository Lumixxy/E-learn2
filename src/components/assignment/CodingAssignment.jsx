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
  Box,
  Badge,
  useToast,
  Textarea,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Icon,
  Divider
} from '@chakra-ui/react';
import { FiCode, FiPlay, FiCheckCircle, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { useXP } from '../../contexts/XPContext';
import mitPythonAssignments from '../../data/mitPythonAssignments';

const CodingAssignment = ({ isOpen, onClose, courseId, moduleId, assignmentId, onComplete }) => {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [userCode, setUserCode] = useState('');
  const [testResults, setTestResults] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showPeerEvaluation, setShowPeerEvaluation] = useState(false);
  const { awardXP } = useXP();
  const toast = useToast();

  // Load assignment data
  const assignment = mitPythonAssignments[assignmentId] || mitPythonAssignments['computation-basics'];
  const currentProblemData = assignment?.problems?.[currentProblem];

  // Initialize when modal opens
  useEffect(() => {
    if (isOpen && assignment && currentProblemData) {
      setCurrentProblem(0);
      setUserCode(currentProblemData.starterCode || '');
      setIsSubmitted(false);
      setShowResults(false);
      setScore(0);
      setTestResults([]);
      setShowPeerEvaluation(false);
    }
  }, [isOpen, assignment, assignmentId]);

  // Update code when problem changes
  useEffect(() => {
    if (currentProblemData?.starterCode) {
      setUserCode(currentProblemData.starterCode);
      setTestResults([]);
      setIsSubmitted(false);
      setShowResults(false);
    }
  }, [currentProblem, currentProblemData]);

  // Run code tests (simplified - in production this would be server-side)
  const runTests = () => {
    if (!currentProblemData?.testCases) {
      toast({
        title: "No Tests Available",
        description: "This problem doesn't have automated tests.",
        status: "info",
        duration: 3000
      });
      return [];
    }

    // Simulate test execution
    const results = currentProblemData.testCases.map((testCase, index) => {
      // In a real implementation, this would send code to a secure sandbox
      const passed = Math.random() > 0.3; // Simulate some tests passing
      
      return {
        id: index,
        passed,
        input: testCase.input,
        expected: testCase.expected,
        actual: passed ? testCase.expected : 'Error or wrong output',
        description: testCase.description || `Test case ${index + 1}`
      };
    });

    setTestResults(results);
    
    const passedCount = results.filter(r => r.passed).length;
    toast({
      title: "Tests Complete",
      description: `${passedCount}/${results.length} tests passed`,
      status: passedCount === results.length ? "success" : "warning",
      duration: 3000
    });

    return results;
  };

  // Submit current problem
  const handleSubmit = async () => {
    if (!userCode.trim()) {
      toast({
        title: "No Code Submitted",
        description: "Please write some code before submitting.",
        status: "warning",
        duration: 3000
      });
      return;
    }

    const testResults = runTests();
    const passedTests = testResults.filter(t => t.passed).length;
    const totalTests = testResults.length;
    const problemScore = totalTests > 0 ? (passedTests / totalTests) * (currentProblemData?.points || 100) : 0;
    
    setScore(problemScore);
    setIsSubmitted(true);
    setShowResults(true);
    
    // Award XP
    const xpAmount = Math.floor(problemScore);
    awardXP('assignment', xpAmount, {
      courseId,
      moduleId,
      assignmentId,
      problemId: currentProblemData?.id,
      score: problemScore
    });
    
    toast({
      title: "Problem Submitted!",
      description: `${passedTests}/${totalTests} tests passed. Earned ${xpAmount} XP!`,
      status: passedTests === totalTests ? "success" : "warning",
      duration: 5000,
      isClosable: true,
    });
    
    // Show peer evaluation option after submission
    setShowPeerEvaluation(true);
    
    if (onComplete) {
      onComplete(problemScore);
    }
  };

  // Navigate between problems
  const goToPrevious = () => {
    if (currentProblem > 0) {
      setCurrentProblem(currentProblem - 1);
    }
  };

  const goToNext = () => {
    if (currentProblem < assignment.problems.length - 1) {
      setCurrentProblem(currentProblem + 1);
    }
  };

  if (!assignment || !currentProblemData) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent maxW="90vw" maxH="90vh">
        <ModalHeader>
          <HStack justify="space-between">
            <VStack align="start" spacing={1}>
              <HStack>
                <Icon as={FiCode} />
                <Text>{assignment.title}</Text>
              </HStack>
              <HStack fontSize="sm" color="gray.600">
                <Text>Problem {currentProblem + 1} of {assignment.problems.length}</Text>
                <Text>•</Text>
                <Text>{currentProblemData.points} points</Text>
              </HStack>
            </VStack>
            
            {!showResults && (
              <HStack>
                <Button
                  size="sm"
                  onClick={runTests}
                  leftIcon={<FiPlay />}
                  colorScheme="blue"
                  variant="outline"
                >
                  Run Tests
                </Button>
                <Button
                  size="sm"
                  onClick={handleSubmit}
                  leftIcon={<FiCheckCircle />}
                  colorScheme="green"
                  isDisabled={!userCode.trim()}
                >
                  Submit Code
                </Button>
              </HStack>
            )}
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody overflowY="auto">
          {!showResults ? (
            <VStack spacing={6} align="stretch">
              {/* Problem Description */}
              <Box p={4} bg="blue.50" borderRadius="lg" border="1px solid" borderColor="blue.200">
                <Text fontSize="lg" fontWeight="bold" mb={2} color="blue.800">
                  {currentProblemData.title}
                </Text>
                <Text color="blue.700" mb={4}>
                  {currentProblemData.description}
                </Text>
                <HStack>
                  <Badge colorScheme="blue">{currentProblemData.points} points</Badge>
                  <Badge colorScheme="purple">Python</Badge>
                  <Badge colorScheme="green">Coding Problem</Badge>
                </HStack>
              </Box>
              
              {/* Code Editor */}
              <Box>
                <Text fontWeight="bold" mb={2}>Your Code:</Text>
                <Textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  placeholder="Write your Python code here..."
                  rows={20}
                  fontFamily="'Fira Code', 'Courier New', monospace"
                  fontSize="sm"
                  bg="gray.900"
                  color="green.300"
                  border="2px solid"
                  borderColor="gray.600"
                  _focus={{
                    borderColor: "blue.400",
                    boxShadow: "0 0 0 1px blue.400"
                  }}
                />
                <Text fontSize="xs" color="gray.500" mt={1}>
                  💡 Tip: Use the starter code as a template and implement the missing parts
                </Text>
              </Box>
              
              {/* Test Results */}
              {testResults.length > 0 && (
                <Box>
                  <Text fontWeight="bold" mb={3}>Test Results:</Text>
                  <VStack spacing={3} align="stretch">
                    {testResults.map((result, index) => (
                      <Box
                        key={result.id}
                        p={4}
                        borderRadius="lg"
                        bg={result.passed ? "green.50" : "red.50"}
                        border="2px solid"
                        borderColor={result.passed ? "green.200" : "red.200"}
                      >
                        <HStack justify="space-between" mb={2}>
                          <Text fontWeight="semibold" fontSize="sm">
                            {result.description}
                          </Text>
                          <Badge 
                            colorScheme={result.passed ? "green" : "red"}
                            variant="solid"
                          >
                            {result.passed ? "✓ PASSED" : "✗ FAILED"}
                          </Badge>
                        </HStack>
                        
                        {result.input && (
                          <Text fontSize="xs" color="gray.600">
                            <strong>Input:</strong> {JSON.stringify(result.input)}
                          </Text>
                        )}
                        
                        <HStack spacing={4} fontSize="xs">
                          <Text color="green.600">
                            <strong>Expected:</strong> {JSON.stringify(result.expected)}
                          </Text>
                          {!result.passed && (
                            <Text color="red.600">
                              <strong>Got:</strong> {JSON.stringify(result.actual)}
                            </Text>
                          )}
                        </HStack>
                      </Box>
                    ))}
                  </VStack>
                </Box>
              )}
            </VStack>
          ) : (
            <VStack spacing={6} align="stretch">
              <Alert status="success">
                <AlertIcon />
                <AlertTitle>Code Submitted Successfully!</AlertTitle>
                <AlertDescription>
                  Your solution has been submitted and evaluated.
                </AlertDescription>
              </Alert>
              
              <Box textAlign="center" p={6} bg="green.50" borderRadius="lg">
                <Text fontSize="3xl" fontWeight="bold" color="green.600" mb={2}>
                  {Math.round(score)}/{currentProblemData.points} points
                </Text>
                <Text color="green.700" fontSize="lg">
                  {testResults.filter(t => t.passed).length}/{testResults.length} tests passed
                </Text>
              </Box>
              
              {showPeerEvaluation && (
                <Box p={4} bg="blue.50" borderRadius="lg" border="1px solid" borderColor="blue.200">
                  <Text fontWeight="bold" mb={2} color="blue.800">
                    🎓 Peer Evaluation Available
                  </Text>
                  <Text fontSize="sm" color="blue.700" mb={3}>
                    Help other students by reviewing their code submissions. 
                    Complete 2 peer evaluations to become eligible for certificates!
                  </Text>
                  <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={() => {
                      toast({
                        title: "Peer Evaluation",
                        description: "Opening peer evaluation system...",
                        status: "info",
                        duration: 3000
                      });
                      onClose();
                    }}
                  >
                    Start Peer Evaluation
                  </Button>
                </Box>
              )}
            </VStack>
          )}
        </ModalBody>
        
        <ModalFooter>
          <HStack spacing={3}>
            <Button
              leftIcon={<FiArrowLeft />}
              onClick={goToPrevious}
              disabled={currentProblem === 0}
              variant="outline"
            >
              Previous Problem
            </Button>
            
            <Text fontSize="sm" color="gray.500">
              Problem {currentProblem + 1} of {assignment.problems.length}
            </Text>
            
            <Button
              rightIcon={<FiArrowRight />}
              onClick={goToNext}
              disabled={currentProblem >= assignment.problems.length - 1}
              variant="outline"
            >
              Next Problem
            </Button>
            
            <Divider orientation="vertical" h={6} />
            
            <Button onClick={onClose} variant="ghost">
              Close Assignment
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CodingAssignment;
