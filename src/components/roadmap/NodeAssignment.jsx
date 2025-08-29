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
  useColorModeValue,
  Icon,
  Flex,
  Tooltip
} from '@chakra-ui/react';
import { FaUserFriends, FaCheck, FaTimes, FaMedal, FaFire, FaLightbulb, FaArrowUp } from 'react-icons/fa';
import nodeAssignments from '../../data/nodeAssignments';
import PeerEvaluation from './PeerEvaluation';

const NodeAssignment = ({ isOpen, onClose, nodeId, nodeName, onAssignmentComplete, nodeData, courseData, setIsOpen }) => {
  const [submission, setSubmission] = useState('');
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [score, setScore] = useState(null);
  const [peerSubmissions, setPeerSubmissions] = useState([]);
  const [showPeerEvaluation, setShowPeerEvaluation] = useState(false);
  const [currentPeerSubmission, setCurrentPeerSubmission] = useState('');
  const [evaluationsCompleted, setEvaluationsCompleted] = useState(0);
  const [evaluationRequired, setEvaluationRequired] = useState(false);
  const [evaluationProgress, setEvaluationProgress] = useState(0);
  const [evaluationStage, setEvaluationStage] = useState('');
  const [realTimeScore, setRealTimeScore] = useState(null);
  const [realTimeFeedback, setRealTimeFeedback] = useState([]);
  const [isRetaking, setIsRetaking] = useState(false);
  const [previousScores, setPreviousScores] = useState([]);
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [improvementAreas, setImprovementAreas] = useState([]);
  const [showHints, setShowHints] = useState(false);

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
    
    // If all evaluations are completed, show a success message
    if (evaluationsCompleted + 1 >= 2) {
      toast({
        title: 'All peer evaluations completed',
        description: 'Thank you for contributing to the learning community!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  
  const startPeerEvaluation = (submissionIndex) => {
    setCurrentPeerSubmission(peerSubmissions[submissionIndex]);
    setShowPeerEvaluation(true);
  };
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  
  const handleSubmit = () => {
    if (!submission && !file) {
      toast({
        title: 'Submission required',
        description: 'Please enter your solution or upload a file.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    setIsSubmitting(true);
    setRealTimeScore(0);
    setRealTimeFeedback([{
      message: 'Starting evaluation...',
      stage: 'Initialization',
      timestamp: new Date().toLocaleTimeString()
    }]);
    
    // Simulate real-time evaluation updates
    const stages = [
      { message: 'Checking syntax...', stage: 'Syntax', delay: 1000 },
      { message: 'Syntax looks good!', stage: 'Syntax', delay: 1500 },
      { message: 'Running test cases...', stage: 'Testing', delay: 2000 },
      { message: 'Test case 1 passed', stage: 'Testing', delay: 2500 },
      { message: 'Test case 2 passed', stage: 'Testing', delay: 3000 },
      { message: 'Test case 3 passed with warnings', stage: 'Testing', delay: 3500 },
      { message: 'Analyzing code quality...', stage: 'Quality', delay: 4000 },
      { message: 'Code quality assessment complete', stage: 'Quality', delay: 5000 },
      { message: 'Finalizing score...', stage: 'Scoring', delay: 5500 }
    ];
    
    let currentIndex = 0;
    let currentScore = 0;
    
    const processStage = () => {
      if (currentIndex < stages.length) {
        const stage = stages[currentIndex];
        setEvaluationStage(stage.stage);
        setRealTimeFeedback(prev => [...prev, {
          message: stage.message,
          stage: stage.stage,
          timestamp: new Date().toLocaleTimeString()
        }]);
        
        // Update progress percentage
        setEvaluationProgress(((currentIndex + 1) / stages.length) * 100);
        
        // Increment score gradually
        currentScore += Math.floor(Math.random() * 10) + 1;
        setRealTimeScore(Math.min(currentScore, 100));
        
        currentIndex++;
        setTimeout(processStage, stage.delay);
      } else {
        // Evaluation complete
        setIsSubmitting(false);
        setEvaluationStage('Complete');
        
        // Generate a score between 65 and 100 to make it possible to pass with 85%
        const generatedScore = Math.floor(Math.random() * 36) + 65;
        setScore(generatedScore);
        
        // Reset retaking state when submission is complete
        setIsRetaking(false);
        
        // Update streak count
        updateStreak();
        
        // Generate improvement areas if score is below passing threshold
        if (generatedScore < 85) {
          const areas = generateImprovementAreas(submission, generatedScore);
          setImprovementAreas(areas);
          setShowHints(true);
        } else {
          setImprovementAreas([]);
          setShowHints(false);
        }
        
        // Update previous scores if retaking
        if (isRetaking) {
          const updatedScores = [...previousScores, generatedScore];
          setPreviousScores(updatedScores);
          
          // Store updated scores in localStorage
          const nodeId = nodeData?.id;
          const courseId = courseData?.id;
          if (nodeId && courseId) {
            localStorage.setItem(`previousScores_${courseId}_${nodeId}`, JSON.stringify(updatedScores));
          }
        }
        
        // Calculate and award badges
        const nodeId = nodeData?.id;
        const courseId = courseData?.id;
        if (nodeId && courseId) {
          // Get previous scores for badge calculation
          const scores = isRetaking ? previousScores : [];
          const newBadges = calculateBadges(scores, generatedScore);
          
          if (newBadges.length > 0) {
            // Filter out badges that were already earned
            const uniqueNewBadges = newBadges.filter(newBadge => 
              !earnedBadges.some(existingBadge => existingBadge.id === newBadge.id)
            );
            
            if (uniqueNewBadges.length > 0) {
              const updatedBadges = [...earnedBadges, ...uniqueNewBadges];
              setEarnedBadges(updatedBadges);
              
              // Store badges in localStorage
              localStorage.setItem(`badges_${courseId}_${nodeId}`, JSON.stringify(updatedBadges));
              
              // Show toast notification for new badges
              uniqueNewBadges.forEach(badge => {
                toast({
                  title: 'Badge Earned!',
                  description: `You earned the "${badge.name}" badge!`,
                  status: 'success',
                  duration: 4000,
                  isClosable: true,
                  icon: <Icon as={badge.icon} />
                });
              });
            }
          }
        }
        
        // Add final feedback
        setRealTimeFeedback(prev => [...prev, {
          message: `Final score: ${generatedScore}%`,
          stage: 'Complete',
          timestamp: new Date().toLocaleTimeString()
        }]);
        
        // Show toast notification with clear indication about passing requirement
        toast({
          title: 'Assignment Submitted',
          description: `Your assignment has been scored ${generatedScore}%. ${generatedScore >= 85 ? 'You passed!' : 'You need at least 85% to pass. You can retake the assignment as many times as needed.'}`,
          status: generatedScore >= 85 ? 'success' : 'warning',
          duration: 5000,
          isClosable: true,
        });
      }
    };
    
    // Start the evaluation process
    setTimeout(processStage, 1000);
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
  
  const handleTryAgain = () => {
    // Store the previous score before resetting
    const previousScore = score;
    
    // Update previous scores array
    const updatedScores = [...previousScores, previousScore];
    setPreviousScores(updatedScores);
    
    // Store previous scores in localStorage
    const nodeId = nodeData?.id;
    const courseId = courseData?.id;
    if (nodeId && courseId) {
      localStorage.setItem(`previousScores_${courseId}_${nodeId}`, JSON.stringify(updatedScores));
    }
    
    // Reset the assignment state to allow retaking
    setScore(null);
    setSubmission('');
    setFile(null);
    setIsSubmitting(false);
    setRealTimeScore(null);
    setRealTimeFeedback([]);
    setIsRetaking(true);
    
    // Show toast notification for retaking
    toast({
      title: 'Retaking Assignment',
      description: `Previous score: ${previousScore}%. You can now resubmit your solution to improve your score.`,
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };
  
  // Calculate badges based on performance
  const calculateBadges = (scores, newScore) => {
    const badges = [];
    
    // First submission badge
    if (scores.length === 0) {
      badges.push({
        id: 'first_submission',
        name: 'First Submission',
        icon: FaMedal,
        color: 'purple'
      });
    }
    
    // Improvement badge - if new score is better than previous best
    if (scores.length > 0) {
      const bestPreviousScore = Math.max(...scores);
      if (newScore > bestPreviousScore) {
        const improvement = newScore - bestPreviousScore;
        badges.push({
          id: 'improvement',
          name: `Improved by ${improvement.toFixed(1)}%`,
          icon: FaArrowUp,
          color: 'green'
        });
      }
    }
    
    // Perfect score badge
    if (newScore === 100) {
      badges.push({
        id: 'perfect_score',
        name: 'Perfect Score',
        icon: FaMedal,
        color: 'yellow'
      });
    }
    
    // Persistence badge - for multiple attempts
    if (scores.length >= 2) {
      badges.push({
        id: 'persistence',
        name: 'Persistence',
        icon: FaFire,
        color: 'orange'
      });
    }
    
    return badges;
  };
  
  // Update streak count
  const updateStreak = () => {
    const nodeId = nodeData?.id;
    const courseId = courseData?.id;
    
    if (nodeId && courseId) {
      // Get last activity date
      const lastActivityDate = localStorage.getItem(`lastActivity_${courseId}`);
      const today = new Date().toDateString();
      
      // Get current streak
      let streak = parseInt(localStorage.getItem(`streak_${courseId}`) || '0');
      
      if (lastActivityDate) {
        const lastDate = new Date(lastActivityDate);
        const currentDate = new Date();
        
        // Calculate days between last activity and today
        const diffTime = Math.abs(currentDate - lastDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          // Consecutive day, increase streak
          streak += 1;
        } else if (diffDays > 1) {
          // Streak broken
          streak = 1;
        }
        // If same day, keep streak the same
      } else {
        // First activity
        streak = 1;
      }
      
      // Update streak in localStorage
      localStorage.setItem(`streak_${courseId}`, streak.toString());
      localStorage.setItem(`lastActivity_${courseId}`, today);
      
      setCurrentStreak(streak);
    }
  };
  
  // Generate improvement areas based on submission
  const generateImprovementAreas = (submissionText, score) => {
    // This would ideally use AI to analyze the submission
    // For now, we'll use a simple heuristic based on score
    const areas = [];
    
    if (score < 85) {
      if (submissionText.length < 100) {
        areas.push({
          area: 'Submission Length',
          description: 'Your submission is quite short. Consider providing more detailed explanations or code.',
          resources: ['https://example.com/writing-detailed-code']
        });
      }
      
      if (!submissionText.includes('def ') && !submissionText.includes('function ')) {
        areas.push({
          area: 'Function Definition',
          description: 'Your submission might be missing proper function definitions.',
          resources: ['https://example.com/function-definitions']
        });
      }
      
      if (!submissionText.includes('test') && !submissionText.includes('assert')) {
        areas.push({
          area: 'Testing',
          description: 'Consider adding tests to verify your solution works correctly.',
          resources: ['https://example.com/testing-code']
        });
      }
    }
    
    return areas;
  };

  // Load data when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsRetaking(false); // Reset retaking state when opening modal
      setShowHints(false); // Hide hints when opening modal
    
    // Load previous scores from localStorage
    const nodeId = nodeData?.id;
    const courseId = courseData?.id;
    if (nodeId && courseId) {
      const storedScores = localStorage.getItem(`previousScores_${courseId}_${nodeId}`);
      if (storedScores) {
        setPreviousScores(JSON.parse(storedScores));
      } else {
        setPreviousScores([]);
      }
      
      // Load earned badges
      const storedBadges = localStorage.getItem(`badges_${courseId}_${nodeId}`);
      if (storedBadges) {
        setEarnedBadges(JSON.parse(storedBadges));
      } else {
        setEarnedBadges([]);
      }
      
      // Load current streak
      const streak = localStorage.getItem(`streak_${courseId}`);
      if (streak) {
        setCurrentStreak(parseInt(streak));
      } else {
        setCurrentStreak(0);
      }
    }
  }
}, [isOpen, nodeData, courseData]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bg={bgColor} color={textColor}>
        <ModalHeader>{assignment.title}
          {isRetaking && (
            <Badge colorScheme="blue" ml={2}>
              Retaking
            </Badge>
          )}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            {/* Previous Attempts Section */}
            {previousScores.length > 0 && (
              <Box mb={4} p={3} borderRadius="md" bg={instructionsBg}>
                <Text fontWeight="bold" mb={2}>Previous Attempts:</Text>
                <Flex alignItems="center" flexWrap="wrap">
                  {previousScores.map((prevScore, index) => (
                    <Badge 
                      key={index} 
                      colorScheme={prevScore >= 85 ? 'green' : 'orange'} 
                      mr={2} 
                      mb={2}
                      p={2}
                    >
                      Attempt {index + 1}: {prevScore}%
                    </Badge>
                  ))}
                </Flex>
              </Box>
            )}
            
            {/* Badges Section */}
            {earnedBadges.length > 0 && (
              <Box mb={4} p={3} borderRadius="md" bg={instructionsBg}>
                <Text fontWeight="bold" mb={2}>Earned Badges:</Text>
                <Flex alignItems="center" flexWrap="wrap">
                  {earnedBadges.map((badge, index) => (
                    <Tooltip key={index} label={badge.name}>
                      <Box 
                        mr={3} 
                        mb={2}
                        p={2} 
                        borderRadius="full" 
                        bg={`${badge.color}.100`} 
                        color={`${badge.color}.500`}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Icon as={badge.icon} boxSize={5} />
                      </Box>
                    </Tooltip>
                  ))}
                </Flex>
              </Box>
            )}
            
            {/* Streak Section */}
            {currentStreak > 0 && (
              <Box mb={4} p={3} borderRadius="md" bg={instructionsBg}>
                <Flex alignItems="center">
                  <Icon as={FaFire} color="orange.500" mr={2} />
                  <Text fontWeight="bold">Current Streak: {currentStreak} {currentStreak === 1 ? 'day' : 'days'}</Text>
                </Flex>
                <Text fontSize="sm" mt={1}>Keep up the good work! Complete assignments daily to build your streak.</Text>
              </Box>
            )}
            
            {score === null ? (
            <VStack spacing={4} align="stretch">
              <Text fontWeight="bold">Instructions:</Text>
              <Text>{assignment.description}</Text>
              
              {assignment.instructions && (
                <Box p={4} borderRadius="md" bg={instructionsBg} whiteSpace="pre-wrap" borderWidth="1px" borderColor={borderColor}>
                  <Text whiteSpace="pre-wrap">{assignment.instructions}</Text>
                </Box>
              )}
              
              <FormControl>
                <FormLabel>Your Solution:</FormLabel>
                <Textarea 
                  value={submission} 
                  onChange={(e) => setSubmission(e.target.value)} 
                  placeholder="Enter your solution here..."
                  minHeight="200px"
                  bg={inputBg}
                  isDisabled={isSubmitting}
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Or Upload a File:</FormLabel>
                <Input 
                  type="file" 
                  onChange={handleFileChange} 
                  p={1}
                  isDisabled={isSubmitting}
                />
                {file && <Text mt={2} fontSize="sm">{file.name}</Text>}
              </FormControl>
              
              {isSubmitting && (
                <Box mt={4}>
                  <Text fontWeight="bold">Real-time Evaluation:</Text>
                  <HStack mt={2} spacing={4}>
                    <Text>Current Stage: {evaluationStage}</Text>
                    <Text>Progress: {Math.round(evaluationProgress)}%</Text>
                    {realTimeScore !== null && <Text>Current Score: {realTimeScore}%</Text>}
                  </HStack>
                  <Progress value={evaluationProgress} mt={2} colorScheme="purple" />
                  
                  <Box mt={4} p={3} borderWidth="1px" borderRadius="md" maxHeight="200px" overflowY="auto">
                    {realTimeFeedback.map((feedback, index) => (
                      <Text key={index} fontSize="sm" color={mutedTextColor}>
                        [{feedback.timestamp}] [{feedback.stage}] {feedback.message}
                      </Text>
                    ))}
                  </Box>
                </Box>
              )}
              
              {evaluationRequired && evaluationsCompleted < 2 && !isSubmitting && (
                <Box mt={4} p={4} borderWidth="1px" borderRadius="md" bg={instructionsBg}>
                  <HStack spacing={2} mb={2}>
                    <Icon as={FaUserFriends} />
                    <Text fontWeight="bold">Peer Evaluation Required</Text>
                  </HStack>
                  <Text fontSize="sm" mb={3}>
                    This assignment requires you to evaluate 2 peer submissions before receiving your final grade.
                    You have completed {evaluationsCompleted} of 2 required evaluations.
                  </Text>
                  <HStack spacing={4}>
                    <Button 
                      leftIcon={<Icon as={FaUserFriends} />}
                      colorScheme="blue" 
                      size="sm"
                      onClick={() => startPeerEvaluation(0)}
                      isDisabled={evaluationsCompleted >= 2}
                    >
                      Evaluate Submission 1
                    </Button>
                    <Button 
                      leftIcon={<Icon as={FaUserFriends} />}
                      colorScheme="blue" 
                      size="sm"
                      onClick={() => startPeerEvaluation(1)}
                      isDisabled={evaluationsCompleted >= 2}
                    >
                      Evaluate Submission 2
                    </Button>
                  </HStack>
                </Box>
              )}
              
              <Button 
                onClick={handleSubmit} 
                colorScheme="purple" 
                isLoading={isSubmitting}
                loadingText="Submitting..."
                isDisabled={isSubmitting}
              >
                Submit Assignment
              </Button>
            </VStack>
          ) : (
            <VStack spacing={4} align="stretch">
              <Alert 
                status={score >= 85 ? "success" : "warning"}
                variant="subtle"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                height="200px"
                borderRadius="md"
              >
                <AlertIcon boxSize="40px" mr={0} />
                <Text fontSize="lg" mt={4} mb={1}>
                  {score >= 85 ? "Congratulations!" : "Almost there!"}
                </Text>
                <Text fontSize="3xl" fontWeight="bold">
                  {score}%
                </Text>
                <Text mt={2}>
                  {score >= 85 
                    ? "You've successfully completed this assignment!" 
                    : "You need at least 85% to pass. You can retake the assignment as many times as needed."}
                </Text>
              </Alert>
              
              <Divider />
              
              <Text fontWeight="bold">Feedback:</Text>
              <Box p={4} borderWidth="1px" borderRadius="md" bg={instructionsBg}>
                {realTimeFeedback.map((feedback, index) => (
                  <Text key={index} fontSize="sm" mb={1}>
                    <Badge colorScheme={feedback.stage === 'Complete' ? 'green' : 'blue'} mr={2}>
                      {feedback.stage}
                    </Badge>
                    {feedback.message}
                  </Text>
                ))}
              </Box>
              
              {/* Improvement Areas Section */}
              {showHints && improvementAreas.length > 0 && (
                <Box mt={4} p={4} borderWidth="1px" borderRadius="md" bg={instructionsBg}>
                  <HStack spacing={2} mb={3}>
                    <Icon as={FaLightbulb} color="yellow.500" />
                    <Text fontWeight="bold">Areas for Improvement</Text>
                  </HStack>
                  
                  {improvementAreas.map((area, index) => (
                    <Box key={index} mb={3} p={3} borderWidth="1px" borderRadius="md" bg={bgColor}>
                      <Text fontWeight="bold">{area.area}</Text>
                      <Text mt={1}>{area.description}</Text>
                      {area.resources && area.resources.length > 0 && (
                        <Box mt={2}>
                          <Text fontWeight="semibold">Helpful Resources:</Text>
                          <VStack align="start" mt={1} spacing={1}>
                            {area.resources.map((resource, resIndex) => (
                              <Text 
                                key={resIndex} 
                                color="blue.500" 
                                textDecoration="underline" 
                                cursor="pointer"
                                fontSize="sm"
                              >
                                {resource}
                              </Text>
                            ))}
                          </VStack>
                        </Box>
                      )}
                    </Box>
                  ))}
                  
                  <Button 
                    leftIcon={<Icon as={FaArrowUp} />} 
                    colorScheme="blue" 
                    size="sm" 
                    mt={2}
                    onClick={handleTryAgain}
                  >
                    Apply These Tips & Try Again
                  </Button>
                </Box>
              )}
              
              {evaluationRequired && evaluationsCompleted < 2 && (
                <Alert status="info" borderRadius="md">
                  <AlertIcon />
                  <Text>
                    Please complete {2 - evaluationsCompleted} more peer evaluations to finalize your grade.
                  </Text>
                </Alert>
              )}
            </VStack>
          )}
        </ModalBody>
        
        <ModalFooter>
          {score !== null ? (
            <>
              {score >= 85 ? (
                <Button colorScheme="purple" onClick={handleComplete}>
                  Complete
                </Button>
              ) : (
                <Button colorScheme="purple" onClick={handleTryAgain}>
                  Try Again
                </Button>
              )}
            </>
          ) : (
            <Button variant="ghost" onClick={onClose} isDisabled={isSubmitting}>
              Cancel
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
      
      {showPeerEvaluation && (
        <PeerEvaluation 
          isOpen={showPeerEvaluation}
          onClose={() => setShowPeerEvaluation(false)}
          submission={currentPeerSubmission}
          onComplete={handlePeerEvaluationComplete}
        />
      )}
    </Modal>
  );
};

export default NodeAssignment;