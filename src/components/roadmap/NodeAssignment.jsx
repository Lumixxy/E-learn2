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
  useColorModeValue
} from '@chakra-ui/react';
import { FaUserFriends, FaCheck, FaTimes } from 'react-icons/fa';
import nodeAssignments from '../../data/nodeAssignments';
import PeerEvaluation from './PeerEvaluation';

const NodeAssignment = ({ isOpen, onClose, nodeId, nodeName, onAssignmentComplete }) => {
  const [submission, setSubmission] = useState('');
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [score, setScore] = useState(null);
  const [peerSubmissions, setPeerSubmissions] = useState([]);
  const [showPeerEvaluation, setShowPeerEvaluation] = useState(false);
  const [currentPeerSubmission, setCurrentPeerSubmission] = useState('');
  const [evaluationsCompleted, setEvaluationsCompleted] = useState(0);
  const [evaluationRequired, setEvaluationRequired] = useState(false);

  // Color mode values for dark/light mode support
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const mutedTextColor = useColorModeValue("gray.500", "gray.400");
  const instructionsBg = useColorModeValue("gray.50", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const inputBg = useColorModeValue("white", "whiteAlpha.100");

  const toast = useToast();
  
  // Format the nodeId to match our nodeAssignments keys
  const formattedNodeId = nodeId?.startsWith('node-') ? nodeId : `node-${nodeId}`;

  // Get assignment details from our nodeAssignments data
  const assignment = nodeAssignments[formattedNodeId] || nodeAssignments.default;
  
  // If we have a nodeName but no matching assignment, use it for the title
  if (!nodeAssignments[formattedNodeId] && nodeName) {
    assignment.title = `${nodeName} Assignment`;
  }
  
  // Load mock peer submissions when the component mounts
  useEffect(() => {
    if (isOpen && formattedNodeId) {
      // In a real app, these would come from a database
      const mockSubmissions = [
        `# Python Savings Calculator

def calculate_months_until_downpayment(annual_salary, portion_saved, total_cost, semi_annual_raise):
    portion_down_payment = 0.25 * total_cost
    current_savings = 0
    r = 0.04  # annual return
    months = 0
    
    while current_savings < portion_down_payment:
        months += 1
        monthly_salary = annual_salary / 12
        current_savings += current_savings * (r / 12)  # Return on investment
        current_savings += monthly_salary * portion_saved  # Monthly contribution
        
        # Apply semi-annual raise every 6 months
        if months % 6 == 0:
            annual_salary += annual_salary * semi_annual_raise
    
    return months

# Get user input
annual_salary = float(input("Enter your annual salary: "))
portion_saved = float(input("Enter the percent of your salary to save, as a decimal: "))
total_cost = float(input("Enter the cost of your dream home: "))
semi_annual_raise = float(input("Enter your semi-annual raise, as a decimal: "))

# Calculate and display result
months = calculate_months_until_downpayment(annual_salary, portion_saved, total_cost, semi_annual_raise)
print(f"Number of months: {months}")
`,
        `# Word Game Implementation

import random
import string

LETTER_VALUES = {
    'a': 1, 'b': 3, 'c': 3, 'd': 2, 'e': 1, 'f': 4, 'g': 2, 'h': 4, 'i': 1, 'j': 8,
    'k': 5, 'l': 1, 'm': 3, 'n': 1, 'o': 1, 'p': 3, 'q': 10, 'r': 1, 's': 1, 't': 1,
    'u': 1, 'v': 4, 'w': 4, 'x': 8, 'y': 4, 'z': 10
}

def deal_hand(n):
    """Returns a random hand containing n lowercase letters."""
    hand = {}
    for _ in range(n):
        letter = random.choice(string.ascii_lowercase)
        hand[letter] = hand.get(letter, 0) + 1
    return hand

def calculate_score(word):
    """Calculate the score for a word."""
    return sum(LETTER_VALUES.get(letter.lower(), 0) for letter in word)

def display_hand(hand):
    """Display the hand as a string."""
    return ' '.join(letter for letter, count in hand.items() for _ in range(count))

def update_hand(hand, word):
    """Remove letters in word from hand."""
    new_hand = hand.copy()
    for letter in word.lower():
        if letter in new_hand and new_hand[letter] > 0:
            new_hand[letter] -= 1
    return {k: v for k, v in new_hand.items() if v > 0}

def is_valid_word(word, hand):
    """Check if word can be formed from the hand."""
    word_dict = {}
    for letter in word.lower():
        word_dict[letter] = word_dict.get(letter, 0) + 1
    
    for letter, count in word_dict.items():
        if letter not in hand or hand[letter] < count:
            return False
    return True

def play_game():
    """Play the word game."""
    hand = deal_hand(7)
    total_score = 0
    
    while hand:
        print(f"Current Hand: {display_hand(hand)}")
        word = input('Enter word, or "!!" to indicate you are done: ')
        
        if word == "!!":
            break
            
        if is_valid_word(word, hand):
            word_score = calculate_score(word)
            total_score += word_score
            print(f'"{word}" earned {word_score} points. Total: {total_score} points')
            hand = update_hand(hand, word)
        else:
            print("That is not a valid word. Please try again.")
            
        print()
    
    if not hand:
        print("Run out of letters.")
    print(f"Total score: {total_score} points")

if __name__ == "__main__":
    play_game()
`
      ];
      
      setPeerSubmissions(mockSubmissions);
      
      // Check if this assignment requires peer evaluation
      setEvaluationRequired(assignment.instructions && 
                           assignment.instructions.includes('Peer Evaluation Guidelines'));
    }
  }, [isOpen, formattedNodeId]);
  
  const handlePeerEvaluationComplete = (evaluationScore, feedback) => {
    // In a real app, this would be sent to a database
    console.log(`Peer evaluation completed with score: ${evaluationScore}`);
    console.log(`Feedback: ${feedback}`);
    
    setEvaluationsCompleted(prev => prev + 1);
    setShowPeerEvaluation(false);
    
    toast({
      title: 'Peer evaluation submitted',
      description: `You have completed ${evaluationsCompleted + 1} of 2 required peer evaluations.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    
    // If all evaluations are completed, proceed with the assignment
    if (evaluationsCompleted + 1 >= 2) {
      // In a real app, this would trigger the final grade calculation
      const finalScore = Math.floor(Math.random() * 16) + 85; // 85-100 range
      setScore(finalScore);
    } else {
      // Show the next submission to evaluate
      startNextPeerEvaluation();
    }
  };
  
  const startNextPeerEvaluation = () => {
    if (peerSubmissions.length > evaluationsCompleted) {
      setCurrentPeerSubmission(peerSubmissions[evaluationsCompleted]);
      setShowPeerEvaluation(true);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleRetake = () => {
    setScore(null);
    setSubmission('');
    setFile(null);
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
      setIsSubmitting(false);
      
      // If this assignment requires peer evaluation
      if (evaluationRequired) {
        toast({
          title: 'Assignment Submitted',
          description: 'Your assignment has been submitted. Before receiving your final grade, you need to complete peer evaluations.',
          status: 'info',
          duration: 5000,
          isClosable: true,
        });
        
        // Start the peer evaluation process
        startNextPeerEvaluation();
      } else {
        // Generate a score between 65 and 100 to make it possible to pass with 85%
        const generatedScore = Math.floor(Math.random() * 36) + 65;
        setScore(generatedScore);
        
        // Show toast notification with clear indication about passing requirement
        toast({
          title: 'Assignment Submitted',
          description: `Your assignment has been scored ${generatedScore}%. ${generatedScore >= 85 ? 'You passed!' : 'You need at least 85% to pass. You can retake the assignment as many times as needed.'}`,
          status: generatedScore >= 85 ? 'success' : 'warning',
          duration: 5000,
          isClosable: true,
        });
      }
    }, 1500);
  };

  const handleComplete = () => {
    // Pass the score back to the parent component
    // Always use 85% as the passing grade as per requirements
    const passingGrade = 85;
    if (onAssignmentComplete) {
      onAssignmentComplete(score, score >= passingGrade);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bg={bgColor} color={textColor}>
        <ModalHeader>{assignment.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {score === null ? (
            <VStack spacing={4} align="stretch">
              <Text fontWeight="bold">Instructions:</Text>
              <Text>{assignment.description}</Text>
              
              {assignment.instructions && (
                <Box p={4} borderRadius="md" bg={instructionsBg} whiteSpace="pre-wrap" borderWidth="1px" borderColor={borderColor}>
                  <Text whiteSpace="pre-wrap">{assignment.instructions}</Text>
                </Box>
              )}
              
              <FormControl isRequired>
                <FormLabel>Your Solution</FormLabel>
                <Textarea 
                  value={submission}
                  onChange={(e) => setSubmission(e.target.value)}
                  placeholder="Type your solution here..."
                  minHeight="200px"
                  bg={inputBg}
                  borderColor={borderColor}
                />
                <Text fontSize="sm" color={mutedTextColor} mt={1}>
                  Minimum {assignment.minWordCount} characters required
                </Text>
              </FormControl>
              
              <FormControl>
                <FormLabel>Upload Solution File (Optional)</FormLabel>
                <Input
                  type="file"
                  accept=".py,.txt,.pdf"
                  onChange={handleFileChange}
                  bg={inputBg}
                  borderColor={borderColor}
                />
                <Text fontSize="sm" color={mutedTextColor} mt={1}>
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
                colorScheme={score >= 85 ? "green" : "red"} 
                height="24px" 
                borderRadius="md"
              />
              
              <Box>
                {score >= 85 ? (
                  <Alert status="success">
                    <AlertIcon />
                    Congratulations! You've passed this assignment.
                  </Alert>
                ) : (
                  <Alert status="error">
                    <AlertIcon />
                    You need a score of at least 85% to pass. You can retake this assignment as many times as needed.
                  </Alert>
                )}
              </Box>
              
              <Divider my={4} />
              
              <Box borderWidth="1px" borderRadius="md" p={3} borderColor={borderColor}>
                <Text fontWeight="bold" mb={2}>Grading System:</Text>
                <Text fontSize="sm">
                  <Code colorScheme="green">A+</Code>: 95-100% - Exceptional work with perfect implementation<br/>
                  <Code colorScheme="green">A</Code>: 90-94% - Excellent work with minor improvements possible<br/>
                  <Code colorScheme="green">B+</Code>: 85-89% - Very good work meeting all requirements<br/>
                  <Code colorScheme="yellow">B</Code>: 80-84% - Good work with some areas for improvement<br/>
                  <Code colorScheme="yellow">C+</Code>: 75-79% - Satisfactory work with several areas for improvement<br/>
                  <Code colorScheme="yellow">C</Code>: 70-74% - Acceptable work that meets minimum requirements<br/>
                  <Code colorScheme="red">F</Code>: Below 70% - Does not meet minimum requirements
                </Text>
              </Box>
            </VStack>
          )}
        </ModalBody>

      {/* Peer Evaluation Modal */}
      <PeerEvaluation
        isOpen={showPeerEvaluation}
        onClose={() => setShowPeerEvaluation(false)}
        submission={currentPeerSubmission}
        onEvaluationComplete={handlePeerEvaluationComplete}
      />

        <ModalFooter>
          <HStack spacing={2}>
            {evaluationRequired && evaluationsCompleted > 0 && evaluationsCompleted < 2 && (
              <Badge colorScheme="purple">
                {evaluationsCompleted}/2 Evaluations Completed
              </Badge>
            )}
            
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            
            {score === null ? (
              <>
                {evaluationRequired && evaluationsCompleted < 2 && submission ? (
                  <Button
                    colorScheme="purple"
                    onClick={startNextPeerEvaluation}
                    leftIcon={<FaUserFriends />}
                    ml={2}
                  >
                    Evaluate Peers ({evaluationsCompleted}/2)
                  </Button>
                ) : null}
                
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
              <>
              {score < 85 && (
                <Button colorScheme="orange" onClick={handleRetake}>
                  Retake Assignment
                </Button>
              )}
              <Button colorScheme="blue" onClick={handleComplete}>
                {score >= 85 ? "Continue to Next Node" : "Close"}
              </Button>
              </>
            )}
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NodeAssignment;