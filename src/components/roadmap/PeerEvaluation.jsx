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
  Box,
  Divider,
  Radio,
  RadioGroup,
  Stack,
  useToast,
  Heading,
  Code
} from '@chakra-ui/react';

const PeerEvaluation = ({ isOpen, onClose, submission, nodeId, onEvaluationComplete }) => {
  const [feedback, setFeedback] = useState('');
  const [ratings, setRatings] = useState({
    correctness: '3',
    codeQuality: '3',
    documentation: '3',
    efficiency: '3',
    creativity: '3'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleRatingChange = (category, value) => {
    setRatings(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const calculateScore = () => {
    // Convert ratings to numbers and calculate average
    const values = Object.values(ratings).map(r => parseInt(r));
    const sum = values.reduce((acc, val) => acc + val, 0);
    const average = sum / values.length;
    
    // Scale to 100-point scale (1-5 → 60-100)
    return Math.round(60 + (average - 1) * 10);
  };

  const handleSubmit = () => {
    if (feedback.trim().length < 50) {
      toast({
        title: 'Feedback too short',
        description: 'Please provide more detailed feedback (at least 50 characters).',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);

    // Calculate the score based on ratings
    const score = calculateScore();

    // Simulate submission processing
    setTimeout(() => {
      setIsSubmitting(false);
      onEvaluationComplete(score, feedback);
      onClose();
      
      toast({
        title: 'Evaluation submitted',
        description: `You've successfully evaluated your peer's work with a score of ${score}%.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }, 1000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Peer Evaluation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={6} align="stretch">
            <Box>
              <Heading size="sm" mb={2}>Submission to Evaluate:</Heading>
              <Box p={4} borderRadius="md" bg="gray.50" maxHeight="300px" overflowY="auto">
                <Code width="100%" p={2} display="block" whiteSpace="pre-wrap">
                  {submission || "No submission content available."}
                </Code>
              </Box>
            </Box>

            <Divider />
            
            <Box>
              <Heading size="sm" mb={4}>Evaluation Criteria:</Heading>
              
              <VStack spacing={4} align="stretch">
                <FormControl>
                  <FormLabel fontWeight="bold">Correctness (Does the code work as expected?)</FormLabel>
                  <RadioGroup value={ratings.correctness} onChange={(val) => handleRatingChange('correctness', val)}>
                    <Stack direction="row" spacing={4}>
                      <Radio value="1">Poor</Radio>
                      <Radio value="2">Fair</Radio>
                      <Radio value="3">Good</Radio>
                      <Radio value="4">Very Good</Radio>
                      <Radio value="5">Excellent</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
                
                <FormControl>
                  <FormLabel fontWeight="bold">Code Quality (Is the code well-structured and readable?)</FormLabel>
                  <RadioGroup value={ratings.codeQuality} onChange={(val) => handleRatingChange('codeQuality', val)}>
                    <Stack direction="row" spacing={4}>
                      <Radio value="1">Poor</Radio>
                      <Radio value="2">Fair</Radio>
                      <Radio value="3">Good</Radio>
                      <Radio value="4">Very Good</Radio>
                      <Radio value="5">Excellent</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
                
                <FormControl>
                  <FormLabel fontWeight="bold">Documentation (Are there clear comments and explanations?)</FormLabel>
                  <RadioGroup value={ratings.documentation} onChange={(val) => handleRatingChange('documentation', val)}>
                    <Stack direction="row" spacing={4}>
                      <Radio value="1">Poor</Radio>
                      <Radio value="2">Fair</Radio>
                      <Radio value="3">Good</Radio>
                      <Radio value="4">Very Good</Radio>
                      <Radio value="5">Excellent</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
                
                <FormControl>
                  <FormLabel fontWeight="bold">Efficiency (Is the solution efficient?)</FormLabel>
                  <RadioGroup value={ratings.efficiency} onChange={(val) => handleRatingChange('efficiency', val)}>
                    <Stack direction="row" spacing={4}>
                      <Radio value="1">Poor</Radio>
                      <Radio value="2">Fair</Radio>
                      <Radio value="3">Good</Radio>
                      <Radio value="4">Very Good</Radio>
                      <Radio value="5">Excellent</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
                
                <FormControl>
                  <FormLabel fontWeight="bold">Creativity (Does the solution show creative problem-solving?)</FormLabel>
                  <RadioGroup value={ratings.creativity} onChange={(val) => handleRatingChange('creativity', val)}>
                    <Stack direction="row" spacing={4}>
                      <Radio value="1">Poor</Radio>
                      <Radio value="2">Fair</Radio>
                      <Radio value="3">Good</Radio>
                      <Radio value="4">Very Good</Radio>
                      <Radio value="5">Excellent</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
              </VStack>
            </Box>
            
            <FormControl isRequired>
              <FormLabel fontWeight="bold">Detailed Feedback</FormLabel>
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Provide specific feedback on what was done well and what could be improved..."
                minHeight="150px"
              />
              <Text fontSize="sm" color="gray.500" mt={1}>
                Minimum 50 characters required. Be constructive and specific in your feedback.
              </Text>
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isLoading={isSubmitting}
            loadingText="Submitting"
          >
            Submit Evaluation
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PeerEvaluation;