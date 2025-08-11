import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  SimpleGrid, 
  Flex, 
  Badge, 
  HStack, 
  VStack, 
  Progress, 
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Radio,
  RadioGroup,
  Stack,
  Alert,
  AlertIcon,
  useToast,
  Link,
  Icon
} from '@chakra-ui/react';
import { HiCheckCircle, HiStar, HiLockClosed, HiExternalLink, HiGift } from 'react-icons/hi';
import { useXP } from 'contexts/XPContext';

// Quest data with MIT resources and quiz questions
const quests_data = [
  {
    "title": "HTML Hero",
    "quest_number": 1,
    "difficulty": 1,
    "xp": 500,
    "icon": "📜",
    "story": "Begin your journey by forging the foundation of the web. Learn to craft the skeleton of every site.",
    "modules": ["HTML Basics", "Semantic Structure", "Media & Links", "Forms & Tables", "Accessibility"],
    "boss_battle": "Build a hero's profile page with semantic HTML",
    "mit_resources": [
      "https://ocw.mit.edu/courses/6-170-software-studio-spring-2013/resources/mit6_170s13_03-www-struct/",
      "https://ocw.mit.edu/courses/6-170-software-studio-spring-2013/resources/mit6_170s13_04-web-srvrs/",
      "https://ocw.mit.edu/courses/6-170-software-studio-spring-2013/resources/mit6_170s13_07-http-prtcol/",
      "https://ocw.mit.edu/courses/6-170-software-studio-spring-2013/resources/mit6_170s13_06-dc-objt-mod/",
      "https://ocw.mit.edu/courses/6-170-software-studio-spring-2013/resources/mit6_170s13_05-dmn-names/"
    ],
    "quiz": [
      {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
        correct: 0
      },
      {
        question: "Which HTML element is used to define the main heading?",
        options: ["<h1>", "<head>", "<header>", "<main>"],
        correct: 0
      },
      {
        question: "What is the correct HTML element for inserting a line break?",
        options: ["<break>", "<lb>", "<br>", "<line>"],
        correct: 2
      }
    ]
  },
  {
    "title": "CSS Conqueror",
    "quest_number": 2,
    "difficulty": 2,
    "xp": 600,
    "icon": "🎨",
    "story": "Gain the power to style your creations with elegance and adaptability.",
    "modules": ["CSS Basics", "Box Model & Layout", "Typography", "Animations", "Responsive Design"],
    "boss_battle": "Transform your HTML page into a responsive masterpiece",
    "mit_resources": [
      "https://ocw.mit.edu/courses/6-170-software-studio-spring-2013/resources/mit6_170s13_26-con-intro/",
      "https://ocw.mit.edu/courses/6-170-software-studio-spring-2013/resources/mit6_170s13_27-con-idntfyg/",
      "https://ocw.mit.edu/courses/6-170-software-studio-spring-2013/resources/mit6_170s13_29-con-idioms/"
    ],
    "quiz": [
      {
        question: "What does CSS stand for?",
        options: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
        correct: 2
      },
      {
        question: "Which CSS property controls the text size?",
        options: ["font-style", "text-size", "font-size", "text-style"],
        correct: 2
      }
    ]
  },
  {
    "title": "JavaScript Explorer",
    "quest_number": 3,
    "difficulty": 2,
    "xp": 700,
    "icon": "⚡",
    "story": "Bring life to your pages with interactivity and logic.",
    "modules": ["JS Fundamentals", "Logic & Functions", "DOM Manipulation", "Forms Validation", "Debugging"],
    "boss_battle": "Add dynamic features to your portfolio",
    "mit_resources": [
      "https://ocw.mit.edu/courses/6-170-software-studio-spring-2013/resources/mit6_170s13_32-java-intro/",
      "https://ocw.mit.edu/courses/6-170-software-studio-spring-2013/resources/mit6_170s13_33-java-types/",
      "https://ocw.mit.edu/courses/6-170-software-studio-spring-2013/resources/mit6_170s13_34-java-var/"
    ],
    "quiz": [
      {
        question: "Which of the following is a JavaScript framework?",
        options: ["React", "Django", "Flask", "Express"],
        correct: 0
      }
    ]
  },
  {
    "title": "DOM Defender",
    "quest_number": 4,
    "difficulty": 3,
    "xp": 800,
    "icon": "🛡",
    "story": "Master advanced DOM control and browser powers.",
    "modules": ["Arrays & Objects", "Advanced DOM", "Browser APIs", "ES6+ Features", "Async Handling"],
    "boss_battle": "To-do list app with Local Storage",
    "mit_resources": [
      "https://ocw.mit.edu/courses/6-170-software-studio-spring-2013/resources/mit6_170s13_42-dom-intro/",
      "https://ocw.mit.edu/courses/6-170-software-studio-spring-2013/resources/mit6_170s13_43-dom-idioms/",
      "https://ocw.mit.edu/courses/6-170-software-studio-spring-2013/resources/mit6_170s13_44-dom-unbtr/",
      "https://ocw.mit.edu/courses/6-170-software-studio-spring-2013/resources/mit6_170s13_45-dom-list/"
    ],
    "quiz": [
      {
        question: "What does DOM stand for?",
        options: ["Document Object Model", "Data Object Model", "Dynamic Object Model", "Document Oriented Model"],
        correct: 0
      }
    ]
  },
  {
    "title": "Responsive Ranger",
    "quest_number": 5,
    "difficulty": 3,
    "xp": 900,
    "icon": "🏹",
    "story": "Create designs that adapt across all devices.",
    "modules": ["Mobile-First Design", "Flexbox", "CSS Grid", "Complex Layouts", "Flex-Grid Combo"],
    "boss_battle": "Responsive multi-section site",
    "mit_resources": [
      "https://ocw.mit.edu/courses/6-170-software-studio-spring-2013/resources/mit6_170s13_27-con-idntfyg/",
      "https://ocw.mit.edu/courses/6-170-software-studio-spring-2013/resources/mit6_170s13_28-con-design/",
      "https://ocw.mit.edu/courses/6-170-software-studio-spring-2013/resources/mit6_170s13_46-dom-stars/"
    ],
    "quiz": [
      {
        question: "Which CSS feature is commonly used for responsive design?",
        options: ["@media queries", "@responsive", "@device", "@screen"],
        correct: 0
      }
    ]
  },
  {
    "title": "Framework Fighter (React)",
    "quest_number": 6,
    "difficulty": 4,
    "xp": 1000,
    "icon": "⚔",
    "story": "Wield React to build scalable apps.",
    "modules": ["React Basics & JSX", "Components & Props", "State & Events", "Conditional Rendering", "Basic Hooks"],
    "boss_battle": "Weather forecast app",
    "mit_resources": [
      "https://ocw.mit.edu/courses/6-170-software-studio-spring-2013/resources/mit6_170s13_12-web-frmwks/",
      "https://ocw.mit.edu/courses/6-170-software-studio-spring-2013/resources/mit6_170s13_10-rails-ovrvw/",
      "https://ocw.mit.edu/courses/6-170-software-studio-spring-2013/resources/mit6_170s13_11-mdl-vw-cntrl/"
    ],
    "quiz": [
      {
        question: "What does MVC stand for?",
        options: ["Model-View-Controller", "Module-View-Collection", "Model-Visual-Controller", "Module-Visual-Core"],
        correct: 0
      }
    ]
  },
  {
    "title": "API Adventurer",
    "quest_number": 7,
    "difficulty": 4,
    "xp": 1100,
    "icon": "📡",
    "story": "Harness API power for dynamic apps.",
    "modules": ["REST API Basics", "Fetching Data in React", "Loading/Error States", "Advanced Hooks", "Deployment"],
    "boss_battle": "Movie search app",
    "mit_resources": [
      "https://ocw.mit.edu/courses/6-170-software-studio-spring-2013/resources/mit6_170s13_13-restful-ser/",
      "https://ocw.mit.edu/courses/6-170-software-studio-spring-2013/resources/mit6_170s13_14-rest-in-rail/",
      "https://ocw.mit.edu/courses/6-170-software-studio-spring-2013/resources/mit6_170s13_47-asyn-intro/"
    ],
    "quiz": [
      {
        question: "What does API stand for?",
        options: ["Application Programming Interface", "Advanced Programming Interface", "Application Process Interface", "Advanced Process Interface"],
        correct: 0
      }
    ]
  },
  {
    "title": "Full-Stack Final Boss",
    "quest_number": 8,
    "difficulty": 5,
    "xp": 1500,
    "icon": "👑",
    "story": "Rule both frontend and backend realms.",
    "modules": ["Node.js & Express", "REST API", "MongoDB", "React+Backend Integration", "Authentication & Security"],
    "boss_battle": "Full-stack blog platform",
    "mit_resources": [
      "https://ocw.mit.edu/courses/6-170-software-studio-spring-2013/resources/mit6_170s13_16-ex-rails-app/",
      "https://ocw.mit.edu/courses/6-170-software-studio-spring-2013/resources/mit6_170s13_51-sec-ovrw/",
      "https://ocw.mit.edu/courses/6-170-software-studio-spring-2013/resources/mit6_170s13_52-sec-inj/",
      "https://ocw.mit.edu/courses/6-170-software-studio-spring-2013/resources/mit6_170s13_53-sec-crs-ste/"
    ],
    "quiz": [
      {
        question: "What is one common web security vulnerability?",
        options: ["SQL Injection", "CSS Overflow", "HTML Underflow", "Grid Attack"],
        correct: 0
      }
    ]
  }
];

const capstone = {
  "title": "Final Legendary Trial – Capstone Project",
  "xp": 3000,
  "icon": "🏆",
  "reward": "Web Warrior Badge",
  "objective": "Create and deploy a responsive, dynamic site with API integration and backend."
};

function Stars({ value = 0, max = 5 }) {
  const stars = Array.from({ length: max });
  return (
    <HStack spacing={1}>
      {stars.map((_, idx) => (
        <HiStar
          key={idx}
          size={18}
          color={idx < value ? '#422AFB' : '#A3AED0'}
          style={{ flexShrink: 0 }}
        />
      ))}
    </HStack>
  );
}

function QuestCard({ quest, isLocked, onStartQuest, onTakeQuiz, completedQuests }) {
  if (!quest) return null;
  const { icon, title, quest_number, difficulty, xp, story, modules, boss_battle, mit_resources } = quest;
  const isCompleted = completedQuests.includes(quest_number);
  const canStart = !isLocked && !isCompleted;

  return (
    <Box
      role="group"
      bg={isLocked ? "gray.100" : "white"}
      borderWidth="1px"
      borderColor={isLocked ? "gray.300" : isCompleted ? "green.400" : "brand.200"}
      rounded="xl"
      p={5}
      transition="all 0.2s ease"
      opacity={isLocked ? 0.6 : 1}
      _hover={canStart ? { transform: 'translateY(-2px)', boxShadow: 'xl', borderColor: 'brand.400' } : {}}
    >
      <Flex justify="space-between" align="center" mb={3}>
        <HStack spacing={3}>
          <Text fontSize="2xl" as="span">{icon}</Text>
          <VStack align="start" spacing={0}>
            <Text fontWeight="700" color="navy.700">Quest {quest_number}</Text>
            <Text fontSize="lg" color="navy.700">{title}</Text>
          </VStack>
        </HStack>
        <Badge colorScheme="purple" bg="brand.100" color="brand.600" rounded="full" px={3} py={1}>
          {xp} XP
        </Badge>
      </Flex>

      <Flex align="center" justify="space-between" mb={4}>
        <HStack>
          <Text fontSize="sm" color="secondaryGray.700">Difficulty</Text>
          <Stars value={difficulty} />
        </HStack>
        {isLocked && <Icon as={HiLockClosed} color="gray.500" />}
        {isCompleted && <Icon as={HiCheckCircle} color="green.500" />}
      </Flex>

      <Text color="secondaryGray.900" mb={4}>{story}</Text>

      <Box>
        <Text fontWeight="600" color="navy.700" mb={2}>Modules</Text>
        <VStack align="start" spacing={2}>
          {(modules || []).map((m, i) => (
            <HStack key={i} spacing={2} color="secondaryGray.800">
              <HiCheckCircle color={isCompleted ? "#01B574" : "#A3AED0"} />
              <Text>{m}</Text>
            </HStack>
          ))}
        </VStack>
      </Box>

      {/* MIT Resources */}
      <Box mt={4}>
        <Text fontWeight="600" color="navy.700" mb={2}>MIT Resources</Text>
        <VStack align="start" spacing={2}>
          {mit_resources.map((resource, i) => (
            <Link key={i} href={resource} isExternal color="blue.500" _hover={{ textDecoration: 'underline' }}>
              <HStack spacing={2}>
                <Icon as={HiExternalLink} />
                <Text>MIT OCW Resource {i + 1}</Text>
              </HStack>
            </Link>
          ))}
        </VStack>
      </Box>

      <Box mt={5} pt={4} borderTopWidth="1px" borderColor="secondaryGray.300">
        <Text fontWeight="700" color="navy.700" mb={1}>Boss Battle</Text>
        <Text color="secondaryGray.900">{boss_battle}</Text>
      </Box>

      {/* Action Buttons */}
      <Box mt={4}>
        {isCompleted ? (
          <Button w="full" colorScheme="green" leftIcon={<HiGift />} disabled>
            Quest Completed!
          </Button>
        ) : canStart ? (
          <HStack spacing={2}>
            <Button flex={1} colorScheme="brand" onClick={() => onStartQuest(quest_number)}>
              Start Quest
            </Button>
            <Button flex={1} colorScheme="purple" onClick={() => onTakeQuiz(quest)}>
              Take Quiz
            </Button>
          </HStack>
        ) : (
          <Button w="full" colorScheme="gray" disabled>
            Complete Previous Quest
          </Button>
        )}
      </Box>
    </Box>
  );
}

function CapstoneCard({ capstone, isUnlocked }) {
  if (!capstone) return null;
  const { icon, title, reward, xp, objective } = capstone;

  return (
    <Box
      bg={isUnlocked ? "white" : "gray.100"}
      borderWidth="2px"
      borderStyle="dashed"
      borderColor={isUnlocked ? "brand.400" : "gray.300"}
      rounded="2xl"
      p={6}
      w="full"
      transition="all 0.2s ease"
      opacity={isUnlocked ? 1 : 0.6}
    >
      <Flex justify="space-between" align="center" mb={4}>
        <HStack spacing={3}>
          <Text fontSize="3xl" as="span">{icon}</Text>
          <VStack align="start" spacing={0}>
            <Text fontWeight="800" fontSize="xl" color="navy.700">{title}</Text>
            <Badge colorScheme="purple" bg="brand.100" color="brand.700" rounded="full" px={3} py={1}>
              {xp} XP
            </Badge>
          </VStack>
        </HStack>
        <Badge colorScheme="green" bg="green.100" color="green.500" rounded="full" px={3} py={1}>
          Reward: {reward}
        </Badge>
      </Flex>

      <Text color="secondaryGray.900">{objective}</Text>
      
      {!isUnlocked && (
        <Alert status="info" mt={4}>
          <AlertIcon />
          Complete all 8 quests to unlock the capstone project!
        </Alert>
      )}
    </Box>
  );
}

export default function WebWarrior() {
  const { addXP, totalXP: globalXP } = useXP();
  const [completedQuests, setCompletedQuests] = useState([]);
  const [currentQuest, setCurrentQuest] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const toast = useToast();

  // Load completed quests from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('webWarriorCompletedQuests');
    if (saved) {
      setCompletedQuests(JSON.parse(saved));
    }
  }, []);

  // Save completed quests to localStorage
  const saveProgress = (newCompletedQuests) => {
    localStorage.setItem('webWarriorCompletedQuests', JSON.stringify(newCompletedQuests));
    setCompletedQuests(newCompletedQuests);
  };

  const onStartQuest = (questNumber) => {
    setCurrentQuest(questNumber);
    toast({
      title: `Quest ${questNumber} Started!`,
      description: "Begin your adventure!",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const onTakeQuiz = (quest) => {
    setCurrentQuest(quest.quest_number);
    setQuizAnswers({});
    setShowQuiz(true);
  };

  const handleQuizSubmit = () => {
    const quest = quests_data.find(q => q.quest_number === currentQuest);
    if (!quest) return;

    let score = 0;
    quest.quiz.forEach((q, index) => {
      if (quizAnswers[index] === q.correct) {
        score++;
      }
    });

    const percentage = (score / quest.quiz.length) * 100;
    setQuizScore(percentage);

    if (percentage >= 70) { // 70% passing score
      const newCompletedQuests = [...completedQuests, currentQuest];
      saveProgress(newCompletedQuests);
      
      // Add XP to global context
      addXP(quest.xp, `Quest ${currentQuest}: ${quest.title}`, currentQuest);
      
      toast({
        title: "Quest Completed! 🎉",
        description: `You earned ${quest.xp} XP! Total XP: ${globalXP + quest.xp}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Quiz Failed",
        description: "You need 70% to pass. Try again!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    setShowQuizResults(true);
    setShowQuiz(false);
  };

  const closeQuizResults = () => {
    setShowQuizResults(false);
    setCurrentQuest(null);
  };

  const totalXp = quests_data.reduce((sum, q) => sum + q.xp, 0);
  const capstoneXp = capstone.xp;
  const totalPossibleXp = totalXp + capstoneXp;
  const earnedXp = completedQuests.reduce((sum, qNum) => {
    const quest = quests_data.find(q => q.quest_number === qNum);
    return sum + (quest ? quest.xp : 0);
  }, 0);
  const progressPercentage = Math.round((earnedXp / totalPossibleXp) * 100);
  const isCapstoneUnlocked = completedQuests.length === 8;

  return (
    <Box minH="100vh" bg="white" p={6}>
      <Box mb={6}>
        <Heading size="lg" color="navy.700">Web Warrior Adventure Path</Heading>
        <Text color="secondaryGray.800">Complete quests, earn XP, and conquer the capstone.</Text>
      </Box>

      {/* Progress Tracker */}
      <Box bg="white" borderWidth="1px" borderColor="brand.200" rounded="xl" p={5} mb={6}>
        <Flex justify="space-between" align="center" mb={3}>
          <Text fontWeight="700" color="navy.700">Your Web Warrior Progress</Text>
          <HStack spacing={4}>
            <Text color="secondaryGray.800">XP: {earnedXp} / {totalPossibleXp}</Text>
            <Text color="brand.600" fontWeight="700">{progressPercentage}%</Text>
          </HStack>
        </Flex>
        <Progress value={progressPercentage} colorScheme="purple" height="8px" rounded="full" />
        <Text fontSize="sm" color="secondaryGray.600" mt={2}>
          {completedQuests.length} of 8 quests completed
        </Text>
      </Box>

      {/* Capstone Card */}
      <Box mb={6}>
        <CapstoneCard capstone={capstone} isUnlocked={isCapstoneUnlocked} />
      </Box>

      {/* Quest Grid */}
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={6}>
        {quests_data.map((quest, index) => (
          <QuestCard 
            key={index} 
            quest={quest} 
            isLocked={index > 0 && !completedQuests.includes(index)}
            onStartQuest={onStartQuest}
            onTakeQuiz={onTakeQuiz}
            completedQuests={completedQuests}
          />
        ))}
      </SimpleGrid>

      {/* Quiz Modal */}
      <Modal isOpen={showQuiz} onClose={() => setShowQuiz(false)} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Quest {currentQuest} Quiz</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {currentQuest && quests_data.find(q => q.quest_number === currentQuest)?.quiz.map((question, index) => (
              <Box key={index} mb={6}>
                <Text fontWeight="bold" mb={3}>{index + 1}. {question.question}</Text>
                <RadioGroup onChange={(value) => setQuizAnswers({...quizAnswers, [index]: parseInt(value)})}>
                  <Stack spacing={2}>
                    {question.options.map((option, optIndex) => (
                      <Radio key={optIndex} value={optIndex.toString()}>
                        {option}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </Box>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleQuizSubmit}>
              Submit Quiz
            </Button>
            <Button variant="ghost" onClick={() => setShowQuiz(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Quiz Results Modal */}
      <Modal isOpen={showQuizResults} onClose={closeQuizResults} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Quiz Results</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="center">
              <Icon as={quizScore >= 70 ? HiGift : HiCheckCircle} 
                    boxSize={16} 
                    color={quizScore >= 70 ? "gold" : "green.500"} />
              <Text fontSize="xl" fontWeight="bold">
                {quizScore >= 70 ? "Congratulations! 🎉" : "Good Try!"}
              </Text>
              <Text>Your Score: {quizScore}%</Text>
              {quizScore >= 70 ? (
                <Text color="green.500">Quest Completed! You earned XP!</Text>
              ) : (
                <Text color="orange.500">You need 70% to pass. Try again!</Text>
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={closeQuizResults}>
              Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}


