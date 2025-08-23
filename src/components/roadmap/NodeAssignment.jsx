import React, { useState } from 'react';
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
  Text,
  Textarea,
  FormControl,
  FormLabel,
  Input,
  Box,
  Progress,
  Alert,
  AlertIcon,
  useToast
} from '@chakra-ui/react';

const NodeAssignment = ({ isOpen, onClose, nodeId, nodeName, onAssignmentComplete }) => {
  const [submission, setSubmission] = useState('');
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [score, setScore] = useState(null);
  const toast = useToast();

  // Mock assignments based on node ID
  const getAssignmentDetails = (id) => {
    const assignments = {
      '1': {
        title: 'Python Basics Assignment',
        description: 'Create a simple Python program that calculates the factorial of a number using both iterative and recursive approaches.',
        minWordCount: 50
      },
      '2': {
        title: 'Variables and Data Types Assignment',
        description: 'Create a program that demonstrates the use of different data types in Python and performs type conversion between them.',
        minWordCount: 75
      },
      // Default assignment if no specific one is found
      default: {
        title: `${nodeName} Assignment`,
        description: `Complete a practical assignment demonstrating your understanding of ${nodeName} concepts.`,
        minWordCount: 100
      }
    };
    
    return assignments[id] || assignments.default;
  };

  const assignment = getAssignmentDetails(nodeId);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (submission.trim().length < assignment.minWordCount) {
      toast({
        title: 'Submission too short',
        description: `Your submission must be at least ${assignment.minWordCount} characters long.`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate assignment grading (in a real app, this would be a backend call)
    setTimeout(() => {
      // Generate a score between 60 and 100
      const generatedScore = Math.floor(Math.random() * 41) + 60;
      setScore(generatedScore);
      setIsSubmitting(false);
    }, 1500);
  };

  const handleComplete = () => {
    // Pass the score back to the parent component
    onAssignmentComplete(score, score >= 70);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{assignment.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {score === null ? (
            <VStack spacing={4} align="stretch">
              <Text fontWeight="bold">Instructions:</Text>
              <Text>{assignment.description}</Text>
              
              <FormControl isRequired>
                <FormLabel>Your Solution</FormLabel>
                <Textarea 
                  value={submission}
                  onChange={(e) => setSubmission(e.target.value)}
                  placeholder="Type your solution here..."
                  minHeight="200px"
                />
                <Text fontSize="sm" color="gray.500" mt={1}>
                  Minimum {assignment.minWordCount} characters required
                </Text>
              </FormControl>
              
              <FormControl>
                <FormLabel>Upload Solution File (Optional)</FormLabel>
                <Input
                  type="file"
                  accept=".py,.txt,.pdf"
                  onChange={handleFileChange}
                />
                <Text fontSize="sm" color="gray.500" mt={1}>
                  Accepted formats: .py, .txt, .pdf
                </Text>
              </FormControl>
            </VStack>
          ) : (
            <VStack spacing={6} align="stretch">
              <Text fontSize="xl" fontWeight="bold" textAlign="center">
                Assignment Score: {score}%
              </Text>
              
              <Progress 
                value={score} 
                colorScheme={score >= 70 ? "green" : "red"} 
                height="24px" 
                borderRadius="md"
              />
              
              <Box>
                {score >= 70 ? (
                  <Alert status="success">
                    <AlertIcon />
                    Congratulations! You've passed this assignment.
                  </Alert>
                ) : (
                  <Alert status="error">
                    <AlertIcon />
                    You need a score of at least 70% to pass. Please try again.
                  </Alert>
                )}
              </Box>
            </VStack>
          )}
        </ModalBody>

        <ModalFooter>
          {score === null ? (
            <>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button 
                colorScheme="blue" 
                onClick={handleSubmit} 
                isLoading={isSubmitting}
                loadingText="Submitting"
              >
                Submit Assignment
              </Button>
            </>
          ) : (
            <Button colorScheme="blue" onClick={handleComplete}>
              {score >= 70 ? "Continue to Next Node" : "Try Again"}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NodeAssignment;