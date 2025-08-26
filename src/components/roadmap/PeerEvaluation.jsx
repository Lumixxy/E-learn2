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
  Code,
  useColorModeValue,
  Icon
} from '@chakra-ui/react';

const PeerEvaluation = ({ isOpen, onClose, submission, nodeId, onComplete }) => {
  const [feedback, setFeedback] = useState('');
  const [ratings, setRatings] = useState({
    correctness: '3',
    codeQuality: '3',
    documentation: '3',
    efficiency: '3',
    creativity: '3'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [evaluationProgress, setEvaluationProgress] = useState(0);
  const [evaluationStage, setEvaluationStage] = useState('');
  const [realTimeFeedback, setRealTimeFeedback] = useState([]);
  const toast = useToast();
  
  // Color mode values for dark/light mode support
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const mutedTextColor = useColorModeValue("gray.500", "gray.400");
  const submissionBg = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const inputBg = useColorModeValue("white", "whiteAlpha.100");

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
    setEvaluationProgress(0);
    setEvaluationStage('Initializing evaluation...');
    setRealTimeFeedback([]);
    
    // Calculate the score based on ratings
    const score = calculateScore();
    
    // Define evaluation steps
    const evaluationSteps = [
      'Analyzing feedback',
      'Processing ratings',
      'Comparing with rubric',
      'Calculating final score',
      'Submitting evaluation'
    ];
    
    let currentStep = 0;
    const totalSteps = evaluationSteps.length;
    
    // Start the evaluation process with visual feedback
    const evaluationInterval = setInterval(() => {
      if (currentStep < totalSteps) {
        const progress = Math.round(((currentStep + 1) / totalSteps) * 100);
        setEvaluationProgress(progress);
        setEvaluationStage(evaluationSteps[currentStep]);
        
        // Generate real-time feedback based on the current evaluation stage
        const feedbackMsg = generateFeedback(evaluationSteps[currentStep], ratings);
        setRealTimeFeedback(prev => [...prev, feedbackMsg]);
        
        currentStep++;
      } else {
        clearInterval(evaluationInterval);
        finalizeEvaluation(score);
      }
    }, 800);
    
    // Function to generate contextual feedback based on evaluation stage
    const generateFeedback = (stage, ratings) => {
      const feedbackOptions = {
        'Analyzing feedback': [
          'Checking feedback length and quality...',
          'Analyzing constructive criticism...',
          'Evaluating feedback specificity...'
        ],
        'Processing ratings': [
          `Processing ${Object.keys(ratings).join(', ')} ratings...`,
          'Calculating rating averages...',
          'Analyzing rating distribution...'
        ],
        'Comparing with rubric': [
          'Comparing ratings against evaluation rubric...',
          'Checking alignment with assignment objectives...',
          'Validating evaluation criteria...'
        ],
        'Calculating final score': [
          'Weighting individual criteria scores...',
          'Applying evaluation algorithm...',
          'Finalizing score calculation...'
        ],
        'Submitting evaluation': [
          'Preparing evaluation summary...',
          'Finalizing peer review...',
          'Submitting evaluation results...'
        ]
      };
      
      // Return a random feedback message for the current stage
      const options = feedbackOptions[stage] || ['Processing...'];
      return {
        message: options[Math.floor(Math.random() * options.length)],
        stage: stage,
        timestamp: new Date().toLocaleTimeString()
      };
    };
    
    // Function to finalize the evaluation process
    const finalizeEvaluation = (score) => {
      setIsSubmitting(false);
      
      // Add final feedback
      setRealTimeFeedback(prev => [...prev, {
        message: `Final evaluation score: ${score}%`,
        stage: 'Complete',
        timestamp: new Date().toLocaleTimeString()
      }]);
      
      // Complete the evaluation process
      onComplete(score, feedback);
      
      // Show completion toast
      toast({
        title: 'Evaluation submitted',
        description: `You've successfully evaluated your peer's work with a score of ${score}%.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      // Close the modal after a short delay to allow the user to see the final feedback
      setTimeout(() => {
        onClose();
      }, 1500);
    };
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bg={bgColor} color={textColor}>
        <ModalHeader>Peer Evaluation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isSubmitting ? (
            <VStack spacing={6} align="stretch">
              <Text fontSize="xl" fontWeight="bold" textAlign="center">
                Processing Evaluation
              </Text>
              
              <Box>
                <Text mb={2}>{evaluationStage}</Text>
                <Box 
                  w="100%" 
                  h="24px" 
                  bg="gray.200" 
                  borderRadius="md" 
                  overflow="hidden"
                >
                  <Box 
                    h="100%" 
                    w={`${evaluationProgress}%`} 
                    bg="blue.500" 
                    transition="width 0.3s ease-in-out"
                  />
                </Box>
                <Text mt={2} fontSize="sm" textAlign="right">
                  {evaluationProgress}%
                </Text>
              </Box>
              
              <Box borderWidth="1px" borderRadius="md" p={3} borderColor={borderColor} maxHeight="200px" overflowY="auto">
                <Text fontWeight="bold" mb={2}>Evaluation Progress:</Text>
                {realTimeFeedback.map((feedback, index) => (
                  <Box key={index} mb={2} p={2} borderRadius="md" bg={index % 2 === 0 ? 'transparent' : submissionBg}>
                    <Text fontSize="sm">
                      <Text as="span" fontWeight="bold">{feedback.timestamp}</Text> - 
                      <Text as="span" color={mutedTextColor}>{feedback.stage}:</Text> {feedback.message}
                    </Text>
                  </Box>
                ))}
              </Box>
            </VStack>
          ) : (
            <VStack spacing={4} align="stretch">
              <Box p={4} borderRadius="md" bg={submissionBg} whiteSpace="pre-wrap" borderWidth="1px" borderColor={borderColor} maxHeight="300px" overflowY="auto">
                <Heading size="sm" mb={2}>Submission to Evaluate:</Heading>
                <Code p={3} borderRadius="md" width="100%" whiteSpace="pre-wrap">
                  {submission}
                </Code>
              </Box>
              
              <Divider my={3} />
              
              <Box>
                <Heading size="sm" mb={3}>Evaluation Criteria:</Heading>
                
                <VStack spacing={4} align="stretch">
                  <FormControl>
                    <FormLabel fontWeight="bold">Correctness (1-5):</FormLabel>
                    <RadioGroup onChange={(val) => handleRatingChange('correctness', val)} value={ratings.correctness}>
                      <Stack direction="row" spacing={4}>
                        <Radio value="1">1</Radio>
                        <Radio value="2">2</Radio>
                        <Radio value="3">3</Radio>
                        <Radio value="4">4</Radio>
                        <Radio value="5">5</Radio>
                      </Stack>
                    </RadioGroup>
                    <Text fontSize="sm" color={mutedTextColor} mt={1}>
                      Does the solution correctly solve the problem?
                    </Text>
                  </FormControl>
                  
                  <FormControl>
                    <FormLabel fontWeight="bold">Code Quality (1-5):</FormLabel>
                    <RadioGroup onChange={(val) => handleRatingChange('codeQuality', val)} value={ratings.codeQuality}>
                      <Stack direction="row" spacing={4}>
                        <Radio value="1">1</Radio>
                        <Radio value="2">2</Radio>
                        <Radio value="3">3</Radio>
                        <Radio value="4">4</Radio>
                        <Radio value="5">5</Radio>
                      </Stack>
                    </RadioGroup>
                    <Text fontSize="sm" color={mutedTextColor} mt={1}>
                      Is the code well-structured, readable, and maintainable?
                    </Text>
                  </FormControl>
                  
                  <FormControl>
                    <FormLabel fontWeight="bold">Documentation (1-5):</FormLabel>
                    <RadioGroup onChange={(val) => handleRatingChange('documentation', val)} value={ratings.documentation}>
                      <Stack direction="row" spacing={4}>
                        <Radio value="1">1</Radio>
                        <Radio value="2">2</Radio>
                        <Radio value="3">3</Radio>
                        <Radio value="4">4</Radio>
                        <Radio value="5">5</Radio>
                      </Stack>
                    </RadioGroup>
                    <Text fontSize="sm" color={mutedTextColor} mt={1}>
                      Are comments and documentation clear and helpful?
                    </Text>
                  </FormControl>
                  
                  <FormControl>
                    <FormLabel fontWeight="bold">Efficiency (1-5):</FormLabel>
                    <RadioGroup onChange={(val) => handleRatingChange('efficiency', val)} value={ratings.efficiency}>
                      <Stack direction="row" spacing={4}>
                        <Radio value="1">1</Radio>
                        <Radio value="2">2</Radio>
                        <Radio value="3">3</Radio>
                        <Radio value="4">4</Radio>
                        <Radio value="5">5</Radio>
                      </Stack>
                    </RadioGroup>
                    <Text fontSize="sm" color={mutedTextColor} mt={1}>
                      Is the solution efficient in terms of time and space complexity?
                    </Text>
                  </FormControl>
                  
                  <FormControl>
                    <FormLabel fontWeight="bold">Creativity (1-5):</FormLabel>
                    <RadioGroup onChange={(val) => handleRatingChange('creativity', val)} value={ratings.creativity}>
                      <Stack direction="row" spacing={4}>
                        <Radio value="1">1</Radio>
                        <Radio value="2">2</Radio>
                        <Radio value="3">3</Radio>
                        <Radio value="4">4</Radio>
                        <Radio value="5">5</Radio>
                      </Stack>
                    </RadioGroup>
                    <Text fontSize="sm" color={mutedTextColor} mt={1}>
                      Does the solution demonstrate creative problem-solving?
                    </Text>
                  </FormControl>
                </VStack>
              </Box>
              
              <FormControl mt={4}>
                <FormLabel fontWeight="bold">Feedback:</FormLabel>
                <Textarea 
                  value={feedback} 
                  onChange={(e) => setFeedback(e.target.value)} 
                  placeholder="Provide constructive feedback on the submission..."
                  minHeight="150px"
                  bg={inputBg}
                  borderColor={borderColor}
                />
                <Text fontSize="sm" color={mutedTextColor} mt={1}>
                  Minimum 50 characters required
                </Text>
              </FormControl>
            </VStack>
          )}
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose} isDisabled={isSubmitting}>
            Cancel
          </Button>
          {!isSubmitting && (
            <Button colorScheme="blue" onClick={handleSubmit}>
              Submit Evaluation
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PeerEvaluation;