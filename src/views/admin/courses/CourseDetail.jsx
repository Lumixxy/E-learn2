import { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Button,
  Progress,
  Card,
  CardBody,
  CardHeader,
  Avatar,
  Divider,
  Icon,
  useColorModeValue,
  Grid,
  GridItem,
  VStack,
  HStack,
  Input,
  Textarea,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  IconButton,
  Image,
  Select,
  SimpleGrid,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  Tooltip,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Checkbox,
  CircularProgress,
  CircularProgressLabel,
  RadioGroup,
  Stack,
  Radio,
  Alert,
  AlertIcon,
  AlertDescription,
  CloseButton,
  Badge,
  Center,
} from "@chakra-ui/react";
import {
  FiArrowLeft,
  FiPlay,
  FiCheckCircle,
  FiLock,
  FiFileText,
  FiMessageSquare,
  FiClock,
  FiAward,
  FiBookOpen,
  FiUser,
  FiMail,
  FiBarChart2,
  FiAlertCircle,
  FiShare2,
  FiDownload,
  FiX,
  FiCode,
  FiLinkedin,
  FiTwitter,
  FiMessageCircle,
  FiLink,
  FiZap,
  FiRepeat,
  FiRefreshCw,
  FiThumbsUp,
  FiThumbsDown,
  FiChevronRight,
} from "react-icons/fi";

// Mock data for the course
const courseData = {
  id: "1",
  title: "Complete Web Development Bootcamp",
  description: "Learn web development from scratch - HTML, CSS, JavaScript, React, Node, and more!",
  instructor: {
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1998&auto=format&fit=crop",
    role: "Senior Developer & Educator",
    bio: "Sarah is a full-stack developer with over 8 years of experience in web development. She has worked with various startups and Fortune 500 companies.",
    courses: 12,
    students: 34500,
    rating: 4.8
  },
  image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
  progress: 45,
  lastViewed: "Yesterday",
  duration: "42 hours",
  lessonsCompleted: 12,
  totalLessons: 56,
  rating: 4.8,
  reviews: 2345,
  students: 12400,
  updated: "Last updated August 2024",
  isCompleted: true,
  modules: [
    {
      id: 1,
      title: "Introduction to Web Development",
      completed: true,
      description: "Get started with the basic concepts and tools for web development",
      lessons: [
        { id: 101, title: "Course Overview", duration: "10 min", type: "video", completed: true, lastRevised: "2 days ago" },
        { id: 102, title: "Setting Up Your Development Environment", duration: "25 min", type: "video", completed: true, lastRevised: "3 days ago" },
        { id: 103, title: "Introduction to HTML", duration: "45 min", type: "video", completed: true, lastRevised: "1 week ago" },
        { id: 104, title: "HTML Quiz", duration: "15 min", type: "quiz", completed: true, lastRevised: "1 week ago" },
        { id: 105, title: "Your First Web Page", duration: "30 min", type: "assignment", completed: true, lastRevised: "1 week ago" }
      ]
    },
    {
      id: 2,
      title: "Mastering CSS and Responsive Design",
      completed: true,
      description: "Dive deep into CSS, learn advanced styling techniques, and make your websites responsive.",
      lessons: [
        { id: 201, title: "CSS Fundamentals", duration: "30 min", type: "video", completed: true, lastRevised: "3 days ago" },
        { id: 202, title: "Flexbox and Grid Layout", duration: "60 min", type: "video", completed: true, lastRevised: "4 days ago" },
        { id: 203, title: "Responsive Design Principles", duration: "40 min", type: "video", completed: true, lastRevised: "1 month ago" },
        { id: 204, title: "Building a Responsive Navbar", duration: "50 min", type: "assignment", completed: false, lastRevised: "-" }
      ]
    },
    {
      id: 3,
      title: "JavaScript Basics to Advanced",
      completed: false,
      description: "From variables to asynchronous JavaScript, master the language of the web.",
      lessons: [
        { id: 301, title: "JavaScript Syntax and Data Types", duration: "35 min", type: "video", completed: false, lastRevised: "-" },
        { id: 302, title: "Functions and Scope", duration: "45 min", type: "video", completed: false, lastRevised: "-" },
        { id: 303, title: "DOM Manipulation", duration: "55 min", type: "video", completed: false, lastRevised: "-" },
        { id: 304, title: "Working with APIs (Fetch & Async/Await)", duration: "70 min", type: "video", completed: false, lastRevised: "-" }
      ]
    },
    {
      id: 4,
      title: "Introduction to React.js",
      completed: false,
      description: "Build modern, interactive user interfaces with the most popular JavaScript library.",
      lessons: [
        { id: 401, title: "React Components and Props", duration: "40 min", type: "video", completed: false },
        { id: 402, title: "State and Lifecycle Methods", duration: "50 min", type: "video", completed: false },
        { id: 403, title: "Handling Events in React", duration: "30 min", type: "video", completed: false },
        { id: 404, title: "Building a Todo List App (React)", duration: "60 min", type: "assignment", completed: false }
      ]
    },
    {
      id: 5,
      title: "Node.js and Express.js for Backend",
      completed: false,
      description: "Learn to build robust backend APIs and servers with Node.js and Express.js.",
      lessons: [
        { id: 501, title: "Introduction to Node.js", duration: "30 min", type: "video", completed: false },
        { id: 502, title: "Setting Up an Express Server", duration: "45 min", type: "video", completed: false },
        { id: 503, title: "RESTful APIs with Express", duration: "60 min", type: "video", completed: false },
        { id: 504, title: "Database Integration (MongoDB)", duration: "70 min", type: "video", completed: false }
      ]
    },
    // Add more modules as needed
  ]
};

const userStats = {
  xpEarned: 1250,
  currentLevel: 3,
  xpToNextLevel: 350,
  dayStreak: 7,
};

const mockQuizzes = [
  {
    moduleId: 1,
    questions: [
      {
        id: 1,
        question: "Which HTML tag is used to define an internal style sheet?",
        options: ["<style>", "<css>", "<script>", "<link>"],
        correctAnswer: "<style>",
      },
      {
        id: 2,
        question: "Which CSS property is used to control the space between the content and the border of an element?",
        options: ["margin", "padding", "border-spacing", "spacing"],
        correctAnswer: "padding",
      },
      {
        id: 3,
        question: "What does CSS stand for?",
        options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
        correctAnswer: "Cascading Style Sheets",
      },
      {
        id: 4,
        question: "Which HTML element is used to specify a footer for a document or section?",
        options: ["<footer>", "<bottom>", "<foot>", "<section>"],
        correctAnswer: "<footer>",
      },
      {
        id: 5,
        question: "What is the correct HTML for referring to an external style sheet?",
        options: ["<link rel=\"stylesheet\" type=\"text/css\" href=\"mystyle.css\">", "<style src=\"mystyle.css\">", "<stylesheet>mystyle.css</stylesheet>", "<link href=\"mystyle.css\">"],
        correctAnswer: "<link rel=\"stylesheet\" type=\"text/css\" href=\"mystyle.css\">",
      },
    ],
  },
  {
    moduleId: 2,
    questions: [
      {
        id: 1,
        question: "Which property is used to change the left padding of an element?",
        options: ["padding-left", "indent", "padding", "margin-left"],
        correctAnswer: "padding-left",
      },
      {
        id: 2,
        question: "How do you select an element with id \"demo\"?",
        options: ["#demo", ".demo", "demo", "*demo"],
        correctAnswer: "#demo",
      },
      {
        id: 3,
        question: "Which CSS property controls the text size?",
        options: ["font-style", "text-size", "font-size", "text-style"],
        correctAnswer: "font-size",
      },
      {
        id: 4,
        question: "How do you make each word in a text start with a capital letter?",
        options: ["text-transform:capitalize", "text-transform:uppercase", "text-transform:lowercase", "You cannot do that with CSS"],
        correctAnswer: "text-transform:capitalize",
      },
      {
        id: 5,
        question: "Which property is used to change the font of an element?",
        options: ["font-weight", "font-family", "font-style", "font-size"],
        correctAnswer: "font-family",
      },
    ],
  },
];

const mockRecommendedVideos = [
  {
    id: 1,
    title: "Understanding CSS Grid Layout",
    duration: "15 min",
    topic: "CSS Layout",
    videoUrl: "https://www.youtube.com/embed/your_video_id",
  },
  {
    id: 2,
    title: "Deep Dive into JavaScript Closures",
    duration: "20 min",
    topic: "JavaScript Advanced",
    videoUrl: "https://www.youtube.com/embed/your_video_id",
  },
];

export default function CourseDetail() {
  const { courseId } = useParams();
  const toast = useToast();
  const [activeModule, setActiveModule] = useState(-1);
  const [activeLesson, setActiveLesson] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const { isOpen: isCertificateOpen, onOpen: onCertificateOpen, onClose: onCertificateClose } = useDisclosure();
  const { isOpen: isRevisionOpen, onOpen: onRevisionOpen, onClose: onRevisionClose } = useDisclosure();
  const { isOpen: isQuizOpen, onOpen: onQuizOpen, onClose: onQuizClose } = useDisclosure();
  const { isOpen: isResultOpen, onOpen: onResultOpen, onClose: onResultClose } = useDisclosure();
  const [currentQuizModule, setCurrentQuizModule] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(0);
  const [revisionStatus, setRevisionStatus] = useState({}); // { moduleId: { reviewed: boolean, quizzesCompleted: number } }
  const [isCompleted, setIsCompleted] = useState(false);
  const [certificateContent, setCertificateContent] = useState(null);

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "whiteAlpha.700");
  const textColorSecondary = useColorModeValue("gray.500", "whiteAlpha.600");
  const titleColor = useColorModeValue("gray.700", "white");
  const lightBg = useColorModeValue("gray.50", "navy.700");
  const lightBlueBg = useColorModeValue("blue.50", "blue.800");
  const hoverLessonBg = useColorModeValue("gray.100", "navy.600");
  const green100Bg = useColorModeValue("green.100", "green.800");
  const greenIconColor = useColorModeValue("green.600", "green.300");
  const blueIconColor = useColorModeValue("blue.500", "blue.300");
  const modalBg = useColorModeValue("white", "gray.800");
  const activeLessonBg = useColorModeValue("blue.100", "blue.700");

  const handleLessonStart = (moduleId, lessonId) => {
    const module = courseData.modules.find(m => m.id === moduleId);
    const lesson = module.lessons.find(l => l.id === lessonId);
    setActiveLesson(lesson);
    if (lesson.type === "video") {
      setVideoUrl(lesson.videoUrl || "https://www.youtube.com/embed/your_video_id");
    }
  };

  const handleReplayVideo = (moduleId, lessonId) => {
    const module = courseData.modules.find(m => m.id === moduleId);
    const lesson = module.lessons.find(l => l.id === lessonId);
    if (lesson.type === "video") {
      setActiveLesson(lesson);
      setVideoUrl(lesson.videoUrl || "https://www.youtube.com/embed/your_video_id");
      setIsVideoPlaying(true);
    }
  };

  const handleCloseLessonContent = () => {
    setActiveLesson(null);
    setIsVideoPlaying(false);
    setVideoUrl("");
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    console.log("Comment submitted:", newComment);
    setNewComment("");
  };

  const handleRunCode = () => {
    console.log(`Running ${selectedLanguage} code:\n${code}`);
    alert(`Running ${selectedLanguage} code. Check console for output (mock).`);
  };

  const handleShare = (type) => {
    const courseUrl = window.location.href;
    const shareText = `Check out this course: ${courseData.title}`;

    switch (type) {
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(courseUrl)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(courseUrl)}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText} ${courseUrl}`)}`);
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(courseUrl)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(courseUrl);
        toast({
          title: "Link copied!",
          description: "Course link has been copied to clipboard",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        break;
    }
  };

  const handleGetCertificate = () => {
    if (courseData.progress === 100) {
      onCertificateOpen();
    } else {
      toast({
        title: "Not eligible yet",
        description: "Complete all modules to unlock your certificate",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleQuickRevise = (moduleId) => {
    const quiz = mockQuizzes.find(q => q.moduleId === moduleId);
    if (quiz) {
      setCurrentQuizModule(quiz);
      setCurrentQuestionIndex(0);
      setUserAnswers({});
      setQuizScore(0);
      onQuizOpen();
    } else {
      toast({
        title: "No quiz available",
        description: "No revision quiz found for this module.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleQuizAnswer = (questionId, selectedOption) => {
    setUserAnswers(prevAnswers => ({ ...prevAnswers, [questionId]: selectedOption }));
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    currentQuizModule.questions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    setQuizScore(score);

    setRevisionStatus(prevStatus => ({
      ...prevStatus,
      [currentQuizModule.moduleId]: {
        ...prevStatus[currentQuizModule.moduleId],
        reviewed: true,
        quizzesCompleted: (prevStatus[currentQuizModule.moduleId]?.quizzesCompleted || 0) + 1,
      },
    }));

    onQuizClose();
    onResultOpen();
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuizModule.questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handleMarkModuleAsReviewed = (moduleId) => {
    setRevisionStatus(prevStatus => ({
      ...prevStatus,
      [moduleId]: { ...prevStatus[moduleId], reviewed: true },
    }));
    toast({
      title: "Module Marked as Reviewed!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  // Calculate revisions due today
  const revisionsDueToday = courseData.modules.filter(module => {
    const lastRevised = module.lessons.some(lesson => lesson.lastRevised && (lesson.lastRevised.includes("day ago") || lesson.lastRevised.includes("week ago")));
    const isCompleted = module.completed; // Assuming revision is for completed modules
    const isReviewed = revisionStatus[module.id]?.reviewed;
    return isCompleted && !isReviewed && lastRevised; // Simplified logic, ideally based on a proper revision schedule
  }).length;

  const totalRevisionsPossible = courseData.modules.filter(module => module.completed && module.lessons.some(lesson => lesson.type === "video" && lesson.completed)).length;

  const handleDownloadCertificate = () => {
    const userName = certificateContent ? certificateContent.userName : "John Doe";
    const courseTitle = certificateContent ? certificateContent.title : courseData.title;
    const date = new Date().toLocaleDateString();

    const certificateText = `Certificate of Completion\n\nThis is to certify that\n${userName}\nhas successfully completed the course\n${courseTitle}\non ${date}\n\nPyGenicArc`;

    const blob = new Blob([certificateText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Certificate-${courseTitle.replace(/\s/g, '_')}-${userName.replace(/\s/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Certificate downloaded!",
      description: "Your certificate has been saved as a text file.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  if (courseId === 'course_1') {
    return (
      <Box p={6} maxW="7xl" mx="auto" bg={bgColor}> 
        <Card mb={6}>
          <CardBody>
            <Flex justify="space-between" align="center" mb={4}>
              <Text fontSize="lg" fontWeight="bold">Course Preview</Text>
              {!isCompleted ? (
                <Button colorScheme="green" size="sm" onClick={() => setIsCompleted(true)}>
                  Mark as Completed
                </Button>
              ) : (
                <Button
                  colorScheme="yellow"
                  size="sm"
                  onClick={() => {
                    setCertificateContent({
                      title: "A Gentle Introduction to Programming Using Python",
                      userName: "John Doe"
                    });
                    onCertificateOpen();
                  }}
                >
                  Get Certificate
                </Button>
              )}
            </Flex>
            <Box borderRadius="md" overflow="hidden" borderWidth="1px">
              <iframe
                src="https://ocw.mit.edu/courses/6-189-a-gentle-introduction-to-programming-using-python-january-iap-2008/resources/lab3/"
                title="Course Preview"
                width="100%"
                height="700px"
                style={{ border: 0 }}
                allowFullScreen
              />
            </Box>
          </CardBody>
        </Card>
      </Box>
    );
  }

  return (
    <Box p={6} maxW="7xl" mx="auto" bg={bgColor}>
      <Box mb={6}>
        <Link to={courseId === '1' ? "/admin/my-learning/1" : "/admin/my-learning"}>
          <Flex align="center" color={textColor} _hover={{ color: "blue.500" }} mb={2}>
            <Icon as={FiArrowLeft} mr={1} />
            <Text fontSize="sm">Back to My Learning</Text>
          </Flex>
        </Link>
        
        <Flex justify="space-between" align="center">
          <Text fontSize="3xl" fontWeight="bold" color={titleColor}>{courseData.title}</Text>
          <HStack spacing={2} display={{ base: "none", md: "flex" }}>
            <Tooltip 
              label={courseData.progress === 100 ? "Get your certificate" : "Complete all modules to unlock your certificate"}
              placement="top"
            >
              <Button
                leftIcon={<Icon as={FiAward} />}
                colorScheme="yellow"
                onClick={handleGetCertificate}
                isDisabled={courseData.progress !== 100}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
                transition="all 0.2s"
              >
                Get Certificate
              </Button>
            </Tooltip>
            <Menu>
              <Tooltip label="Share this course" placement="top">
                <MenuButton
                  as={Button}
                  variant="outline"
                  size="sm"
                  leftIcon={<Icon as={FiShare2} />}
                  color={textColor}
                  borderColor={borderColor}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "md",
                  }}
                  transition="all 0.2s"
                >
                  Share
                </MenuButton>
              </Tooltip>
              <MenuList>
                <MenuItem icon={<Icon as={FiLinkedin} />} onClick={() => handleShare('linkedin')}>
                  Share on LinkedIn
                </MenuItem>
                <MenuItem icon={<Icon as={FiTwitter} />} onClick={() => handleShare('twitter')}>
                  Share on Twitter
                </MenuItem>
                <MenuItem icon={<Icon as={FiMessageCircle} />} onClick={() => handleShare('whatsapp')}>
                  Share on WhatsApp
                </MenuItem>
                <MenuItem icon={<Icon as={FiMail} />} onClick={() => handleShare('email')}>
                  Share via Email
                </MenuItem>
                <MenuItem icon={<Icon as={FiLink} />} onClick={() => handleShare('copy')}>
                  Copy Course Link
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
        <Text color={textColor} mt={1}>{courseData.description}</Text>
      </Box>

       {/* Smart Revision Card */}
       <Card mb={6} bg={bgColor} borderColor={borderColor}>
              <CardHeader>
                <Flex align="center" justify="space-between">
                  <HStack>
                    <Icon as={FiRepeat} w={5} h={5} mr={2} color={blueIconColor} />
                    <Text fontSize="xl" fontWeight="bold" color={titleColor}>
                      Smart Revision
                    </Text>
                  </HStack>
                  <Box textAlign="right">
                    <Text fontSize="md" color={textColorSecondary} fontWeight="semibold">
                      {revisionsDueToday}/{totalRevisionsPossible} Revisions Due
                    </Text>
                    <Text fontSize="sm" color={textColorSecondary}>
                      Time to reinforce your memory
                    </Text>
                  </Box>
                </Flex>
              </CardHeader>
              <CardBody>
                <VStack align="stretch" spacing={3}>
                  {courseData.modules.filter(m => m.completed).map(module => {
                    const isDueToday = module.lessons.some(lesson => lesson.lastRevised && (lesson.lastRevised.includes("day ago") || lesson.lastRevised.includes("week ago"))); // Simplified logic
                    const isNeedsAttention = module.lessons.some(lesson => lesson.lastRevised && lesson.lastRevised.includes("month ago")); // Simplified logic
                    const moduleReviewed = revisionStatus[module.id]?.reviewed;
                    const completedVideos = module.lessons.filter(lesson => lesson.type === "video" && lesson.completed).length;

                    if (completedVideos === 0) return null; // Only show modules with completed videos

                    return (
                      <Flex key={module.id} justify="space-between" align="center" p={3} borderRadius="md" bg={lightBg} _hover={{ bg: hoverLessonBg }}>
                        <VStack align="flex-start" spacing={0}>
                          <Text fontWeight="semibold" color={textColor}>
                            {module.title}
                          </Text>
                          <HStack spacing={2} fontSize="sm" color={textColorSecondary}>
                            <Text>Last revised: {module.lessons.find(lesson => lesson.lastRevised)?.lastRevised || "Never"}</Text>
                            {isDueToday && <Badge colorScheme="red">Due Today</Badge>}
                            {isNeedsAttention && !isDueToday && <Badge colorScheme="orange">Needs Attention</Badge>}
                            {moduleReviewed && <Badge colorScheme="green">Reviewed</Badge>}
                          </HStack>
                        </VStack>
                        <Button
                          colorScheme="blue"
                          size="sm"
                          onClick={() => handleQuickRevise(module.id)}
                          isDisabled={!completedVideos}
                        >
                          Quick Revise
                        </Button>
                      </Flex>
                    );
                  })}
                  <Button
                    colorScheme="gray"
                    variant="outline"
                    size="sm"
                    mt={4}
                    onClick={onRevisionOpen}
                  >
                    View All Revisions
                  </Button>
                </VStack>
              </CardBody>
            </Card>


      <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={6}>
        {/* Left Column: Modules */}
        <GridItem>
          {/* Modules Section */}
          <Card mb={6} bg={bgColor} borderColor={borderColor}>
            <CardHeader>
              <Text fontSize="xl" fontWeight="bold" color={titleColor}>
                Course Content
              </Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                {courseData.modules.map((module, index) => (
                  <Box key={module.id} borderWidth="1px" borderRadius="lg" p={4} bg={lightBg}>
                    <Flex
                      align="center"
                      cursor="pointer"
                      onClick={() => setActiveModule(activeModule === index ? -1 : index)}
                    >
                      <Icon
                        as={module.completed ? FiCheckCircle : FiBookOpen}
                        color={module.completed ? greenIconColor : blueIconColor}
                        mr={2}
                      />
                      <Text
                        fontSize="lg"
                        fontWeight="semibold"
                        color={titleColor}
                        flex={1}
                      >
                        {module.title}
                      </Text>
                      <Icon
                        as={activeModule === index ? FiArrowLeft : FiArrowLeft} // Reusing FiArrowLeft for simplicity, ideally a chevron icon.
                        transform={activeModule === index ? "rotate(90deg)" : "rotate(-90deg)"}
                        transition="transform 0.2s"
                      />
                    </Flex>
                    {activeModule === index && (
                      <VStack mt={4} pl={6} spacing={2} align="stretch">
                        <Text color={textColorSecondary} fontSize="sm">{module.description}</Text>
                        {module.lessons.map((lesson) => (
                          <Flex
                            key={lesson.id}
                            align="center"
                            p={2}
                            borderRadius="md"
                            _hover={{ bg: hoverLessonBg }}
                            cursor={lesson.completed || lesson.type === "assignment" || lesson.type === "quiz" ? "pointer" : "not-allowed"}
                            onClick={() => (lesson.completed || lesson.type === "assignment" || lesson.type === "quiz") && handleLessonStart(module.id, lesson.id)}
                            bg={activeLesson?.id === lesson.id ? lightBlueBg : "transparent"}
                          >
                            <Icon
                              as={
                                lesson.type === "video"
                                  ? FiPlay
                                  : lesson.type === "quiz"
                                  ? FiFileText
                                  : lesson.type === "assignment"
                                  ? FiFileText
                                  : FiFileText
                              }
                              color={lesson.completed ? greenIconColor : blueIconColor}
                              mr={2}
                            />
                            <Text
                              flex={1}
                              color={textColor}
                              textDecoration={lesson.completed ? "line-through" : "none"}
                            >
                              {lesson.title}
                            </Text>
                            <Text color={textColorSecondary} fontSize="sm">
                              {lesson.duration}
                            </Text>
                            {lesson.completed ? (
                              <Icon as={FiCheckCircle} ml={2} color={greenIconColor} />
                            ) : (
                              lesson.type === "video" && <Icon as={FiLock} ml={2} color={textColorSecondary} />
                            )}
                          </Flex>
                        ))}
                      </VStack>
                    )}
                  </Box>
                ))}
              </VStack>
            </CardBody>
          </Card>
        </GridItem>

        {/* Right Column: Course Info and Instructor */}
        <GridItem>
          <VStack spacing={6} align="stretch">
            {/* User Stats Card */}
            <Card bg={bgColor} borderColor={borderColor}>
              <CardHeader pb={2}>
                <Flex justify="space-between" align="center">
                  <Text fontSize="xl" fontWeight="bold" color={titleColor}>
                    Your Stats
                  </Text>
                </Flex>
              </CardHeader>
              <CardBody>
                <SimpleGrid columns={1} spacing={4}>
                  <Box
                    bg={lightBg}
                    p={4}
                    borderRadius="lg"
                    textAlign="center"
                    transition="all 0.2s ease-in-out"
                    _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
                  >
                    <Text fontSize="3xl" fontWeight="bold" color={blueIconColor}>
                      {userStats.xpEarned.toLocaleString()}
                    </Text>
                    <Text fontSize="sm" color={textColorSecondary}>
                      XP Earned
                    </Text>
                  </Box>
                  <Box>
                    <Flex justify="space-between" align="center" mb={1}>
                      <Text fontSize="md" fontWeight="semibold" color={textColor}>
                        Current Level
                      </Text>
                      <Text fontSize="md" fontWeight="semibold" color={blueIconColor}>
                        Level {userStats.currentLevel}
                      </Text>
                    </Flex>
                    <Progress
                      value={(userStats.xpEarned / (userStats.xpEarned + userStats.xpToNextLevel)) * 100}
                      size="sm"
                      colorScheme="blue"
                      borderRadius="full"
                      mb={2}
                    />
                    <Text fontSize="sm" color={textColorSecondary}>
                      Earn {userStats.xpToNextLevel} more XP to reach Level {userStats.currentLevel + 1}
                    </Text>
                  </Box>
                </SimpleGrid>
              </CardBody>
            </Card>
            {/* Course Info Card */}
            <Card bg={bgColor} borderColor={borderColor}>
              <CardBody>
                <Flex direction={{ base: "column", sm: "row" }} justify="space-between" align={{ base: "flex-start", sm: "center" }} mb={2}>
                  <HStack spacing={4}>
                    <Box
                      w="12"
                      h="12"
                      rounded="full"
                      bg={courseData.isCompleted ? green100Bg : lightBlueBg}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon
                        as={courseData.isCompleted ? FiCheckCircle : FiPlay}
                        w="6"
                        h="6"
                        color={courseData.isCompleted ? greenIconColor : blueIconColor}
                      />
                    </Box>
                    <VStack align="flex-start" spacing={0}>
                      <Text fontSize="sm" color={textColorSecondary}>
                        {courseData.isCompleted ? "Completed" : "In Progress"}
                      </Text>
                      <Text fontSize="xl" fontWeight="bold" color={titleColor}>
                        {courseData.progress}%
                      </Text>
                    </VStack>
                  </HStack>
                  <Text fontSize="sm" color={textColorSecondary} mt={{ base: 2, sm: 0 }}>
                    Last viewed: {courseData.lastViewed}
                  </Text>
                </Flex>
                <Progress
                  value={courseData.progress}
                  size="sm"
                  colorScheme="blue"
                  borderRadius="full"
                  mb={4}
                />
                <Divider mb={4} borderColor={borderColor} />
                <HStack justify="space-between" spacing={4} flexWrap="wrap">
                  <VStack align="flex-start" spacing={0}>
                    <Icon as={FiClock} color={textColorSecondary} mb={1} />
                    <Text fontSize="sm" color={textColorSecondary}>Duration</Text>
                    <Text fontWeight="semibold" color={titleColor}>{courseData.duration}</Text>
                  </VStack>
                  <VStack align="flex-start" spacing={0}>
                    <Icon as={FiBookOpen} color={textColorSecondary} mb={1} />
                    <Text fontSize="sm" color={textColorSecondary}>Lessons</Text>
                    <Text fontWeight="semibold" color={titleColor}>
                      {courseData.lessonsCompleted}/{courseData.totalLessons}
                    </Text>
                  </VStack>
                  <VStack align="flex-start" spacing={0}>
                    <Icon as={FiBarChart2} color={textColorSecondary} mb={1} />
                    <Text fontSize="sm" color={textColorSecondary}>Rating</Text>
                    <Text fontWeight="semibold" color={titleColor}>{courseData.rating} ({courseData.reviews} reviews)</Text>
                  </VStack>
                  <VStack align="flex-start" spacing={0}>
                    <Icon as={FiUser} color={textColorSecondary} mb={1} />
                    <Text fontSize="sm" color={textColorSecondary}>Students</Text>
                    <Text fontWeight="semibold" color={titleColor}>{courseData.students.toLocaleString()}</Text>
                  </VStack>
                  <VStack align="flex-start" spacing={0}>
                    <Icon as={FiClock} color={textColorSecondary} mb={1} />
                    <Text fontSize="sm" color={textColorSecondary}>Updated</Text>
                    <Text fontWeight="semibold" color={titleColor}>{courseData.updated}</Text>
                  </VStack>
                </HStack>
              </CardBody>
            </Card>

            {/* Instructor Card */}
           
           

            {/* Course Overview */}
            <Card bg={bgColor} borderColor={borderColor} mb={6}>
              <CardHeader>
                <Text fontSize="xl" fontWeight="bold" color={titleColor}>
                  Course Overview
                </Text>
              </CardHeader>
              <CardBody>
                <Text color={textColor}>{courseData.description}</Text>
              </CardBody>
            </Card>
          </VStack>
        </GridItem>
      </Grid>
      {/* Active lesson content outside the grid as it's a modal */}
      {activeLesson && (
        <Modal isOpen={activeLesson !== null} onClose={handleCloseLessonContent} size="full" scrollBehavior="inside">
          <ModalOverlay />
          <ModalContent bg={modalBg}>
            <ModalHeader borderBottomWidth="1px" borderColor={borderColor}>
              <Flex align="center">
                <Text fontSize="2xl" fontWeight="bold" color={titleColor} mr={4}>
                  {activeLesson.title}
                </Text>
                {activeLesson.type === "assignment" && (
                  <Button
                    leftIcon={<Icon as={FiCode} />}
                    colorScheme="purple"
                    size="sm"
                    onClick={() => setShowCodeEditor(!showCodeEditor)}
                  >
                    {showCodeEditor ? "Hide Code Editor" : "Open Code Editor"}
                  </Button>
                )}
                <ModalCloseButton />
              </Flex>
            </ModalHeader>
            <ModalBody>
              {activeLesson.type === "video" && (
                <Box mb={6}>
                  <Image src={activeLesson.imageUrl || "https://via.placeholder.com/600x400?text=No+Image+Available"} alt={activeLesson.title} style={{ width: "100%", maxHeight: "600px", objectFit: "contain", background: "#000" }} />
                </Box>
              )}
              {activeLesson.type === "assignment" && (
                <Box mb={6}>
                  <Text fontSize="lg" fontWeight="semibold" mb={2}>Assignment Instructions:</Text>
                  <Text color={textColor}>
                    {`Implement a function that calculates the factorial of a given number.\n                    For example, factorial(5) should return 120.\n                    You can use any language you prefer, but JavaScript, Python, and Java are recommended.`}
                  </Text>
                  {showCodeEditor && (
                    <Box mt={4} p={4} bg={lightBg} borderRadius="md" borderColor={borderColor} borderWidth="1px">
                      <Select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)} mb={2}>
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                      </Select>
                      <Textarea
                        placeholder={`Write your ${selectedLanguage} code here...`}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        fontFamily="monospace"
                        height="200px"
                        mb={2}
                      />
                      <Button colorScheme="green" onClick={handleRunCode}>Run Code</Button>
                    </Box>
                  )}
                  <Button mt={4} colorScheme="blue">Submit Assignment</Button>
                </Box>
              )}
              {activeLesson.type === "quiz" && (
                <Box mb={6}>
                  <Text fontSize="lg" fontWeight="semibold" mb={2}>Quiz: Introduction to HTML</Text>
                  <VStack align="stretch" spacing={3}>
                    <Box p={3} borderWidth="1px" borderRadius="md" bg={lightBg}>
                      <Text fontWeight="medium">1. What does HTML stand for?</Text>
                      <VStack align="flex-start" mt={2}>
                        <Text><Input type="radio" name="q1" mr={2} /> Hyper Text Markup Language</Text>
                        <Text><Input type="radio" name="q1" mr={2} /> Hyperlinks and Text Markup Language</Text>
                        <Text><Input type="radio" name="q1" mr={2} /> Home Tool Markup Language</Text>
                      </VStack>
                    </Box>
                    <Box p={3} borderWidth="1px" borderRadius="md" bg={lightBg}>
                      <Text fontWeight="medium">2. Which HTML tag is used to define an internal style sheet?</Text>
                      <VStack align="flex-start" mt={2}>
                        <Text><Input type="radio" name="q2" mr={2} /> &lt;script&gt;</Text>
                        <Text><Input type="radio" name="q2" mr={2} /> &lt;style&gt;</Text>
                        <Text><Input type="radio" name="q2" mr={2} /> &lt;css&gt;</Text>
                      </VStack>
                    </Box>
                  </VStack>
                  <Button mt={4} colorScheme="blue">Submit Quiz</Button>
                </Box>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      {/* Q&A Section */}
      <Card mt={6} mb={6} bg={bgColor} borderColor={borderColor}>
        <CardHeader>
          <Text fontSize="xl" fontWeight="bold" color={titleColor}>
            Questions & Answers
          </Text>
        </CardHeader>
        <CardBody>
          <VStack spacing={4} align="stretch">
            <Textarea
              placeholder="Ask a question or leave a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              mb={2}
            />
            <Button colorScheme="blue" onClick={handleSubmitComment}>
              Post Comment
            </Button>
            <Divider borderColor={borderColor} />
            <Box>
              <Text fontWeight="semibold" color={titleColor} mb={2}>Recent Comments:</Text>
              <Box p={3} bg={lightBg} borderRadius="md" mb={2}>
                <Flex align="center" mb={1}>
                  <Avatar name="User A" size="sm" mr={2} />
                  <Text fontWeight="medium" color={titleColor}>John Doe</Text>
                  <Text fontSize="sm" color={textColorSecondary} ml="auto">2 days ago</Text>
                </Flex>
                <Text color={textColor}>
                  Great course so far! I'm learning a lot.
                </Text>
              </Box>
              <Box p={3} bg={lightBg} borderRadius="md">
                <Flex align="center" mb={1}>
                  <Avatar name="User B" size="sm" mr={2} />
                  <Text fontWeight="medium" color={titleColor}>Jane Smith</Text>
                  <Text fontSize="sm" color={textColorSecondary} ml="auto">1 week ago</Text>
                </Flex>
                <Text color={textColor}>
                  I'm having trouble with the responsive design section. Any tips?
                </Text>
              </Box>
            </Box>
          </VStack>
        </CardBody>
      </Card>

      {/* Certificate Modal */}
      <Modal isOpen={isCertificateOpen} onClose={onCertificateClose} size="xl">
        <ModalOverlay />
        <ModalContent bg={modalBg}>
          <ModalHeader>Your Certificate</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4} align="stretch">
              <Card p={6} borderWidth="2px" borderColor="yellow.400">
                <VStack spacing={4} align="center">
                  <Icon as={FiAward} w={12} h={12} color="yellow.500" />
                  <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                    Certificate of Completion
                  </Text>
                  <Text fontSize="lg" textAlign="center">
                    This is to certify that
                  </Text>
                  <Text fontSize="xl" fontWeight="bold" textAlign="center">
                    {certificateContent ? certificateContent.userName : "John Doe"}
                  </Text>
                  <Text fontSize="lg" textAlign="center">
                    has successfully completed the course
                  </Text>
                  <Text fontSize="xl" fontWeight="bold" textAlign="center" color="blue.500">
                    {certificateContent ? certificateContent.title : courseData.title}
                  </Text>
                  <Text fontSize="md" textAlign="center">
                    on {new Date().toLocaleDateString()}
                  </Text>
                  <Text fontSize="md" textAlign="center" fontWeight="bold" mt={4}>
                    PyGenicArc
                  </Text>
                </VStack>
              </Card>
              <Button
                leftIcon={<Icon as={FiDownload} />}
                colorScheme="blue"
                onClick={handleDownloadCertificate}
              >
                Download Certificate
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Revision Modal */}
      <Modal isOpen={isRevisionOpen} onClose={onRevisionClose} size="2xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent bg={modalBg}>
          <ModalHeader>Smart Revision</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {courseData.modules.filter(m => m.completed && m.lessons.some(l => l.type === "video" && l.completed)).length > 0 ? (
              <Accordion allowMultiple>
                {courseData.modules.filter(m => m.completed && m.lessons.some(l => l.type === "video" && l.completed)).map(module => {
                  const completedVideosInModule = module.lessons.filter(lesson => lesson.type === "video" && lesson.completed);
                  const reviewedVideos = revisionStatus[module.id]?.videosReviewed || {};
                  const currentReviewedCount = Object.values(reviewedVideos).filter(status => status).length;
                  const totalVideos = completedVideosInModule.length;
                  const revisionProgress = totalVideos > 0 ? (currentReviewedCount / totalVideos) * 100 : 0;

                  return (
                    <AccordionItem key={module.id} borderWidth="1px" borderRadius="lg" mb={4}>
                      <h2>
                        <AccordionButton _expanded={{ bg: lightBg, color: blueIconColor }} py={4}>
                          <Box flex="1" textAlign="left">
                            <Text fontWeight="bold" fontSize="lg" color={titleColor}>
                              {module.title}
                            </Text>
                            {totalVideos > 0 && (
                              <Text fontSize="sm" color={textColorSecondary} mt={1}>
                                {currentReviewedCount} of {totalVideos} videos revised
                              </Text>
                            )}
                          </Box>
                          <Progress
                            value={revisionProgress}
                            size="xs"
                            colorScheme="green"
                            borderRadius="full"
                            flex="0 0 80px"
                            ml={4}
                          />
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <VStack align="stretch" spacing={3} pl={4}>
                          {completedVideosInModule.map(video => (
                            <Flex key={video.id} align="center" justify="space-between" p={2} bg={lightBg} borderRadius="md">
                              <HStack spacing={2}>
                                <Checkbox
                                  isChecked={reviewedVideos[video.id] || false}
                                  onChange={() => setRevisionStatus(prev => ({
                                    ...prev,
                                    [module.id]: {
                                      ...prev[module.id],
                                      videosReviewed: {
                                        ...(prev[module.id]?.videosReviewed || {}),
                                        [video.id]: !(prev[module.id]?.videosReviewed?.[video.id] || false)
                                      }
                                    }
                                  }))}
                                  colorScheme="green"
                                />
                                <Text color={textColor} fontWeight="medium">
                                  {video.title}
                                </Text>
                              </HStack>
                              <Button
                                size="sm"
                                colorScheme="blue"
                                leftIcon={<Icon as={FiPlay} />}
                                onClick={() => handleReplayVideo(module.id, video.id)}
                              >
                                Replay
                              </Button>
                            </Flex>
                          ))}
                          {totalVideos > 0 && currentReviewedCount === totalVideos && (
                            <Button
                              colorScheme="teal"
                              size="sm"
                              mt={4}
                              onClick={() => toast({
                                title: "Module Reviewed!",
                                description: `You've reviewed all videos in ${module.title}. Great job! (Summary recap goes here)`, 
                                status: "success",
                                duration: 5000,
                                isClosable: true,
                              })}
                            >
                              Get Module Summary
                            </Button>
                          )}
                        </VStack>
                      </AccordionPanel>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            ) : (
              <Text color={textColorSecondary} textAlign="center" py={10}>
                No completed videos found for revision. Complete some lessons first!
              </Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Quiz Modal */}
      <Modal isOpen={isQuizOpen} onClose={onQuizClose} size="xl" closeOnOverlayClick={false} closeOnEsc={false}>
        <ModalOverlay />
        <ModalContent bg={modalBg}>
          <ModalHeader>
            <Text fontSize="xl" fontWeight="bold" color={titleColor}>
              Quick Quiz: {currentQuizModule?.title}
            </Text>
          </ModalHeader>
          <ModalBody pb={6}>
            {currentQuizModule && (
              <Box>
                <Text fontSize="lg" fontWeight="semibold" mb={4}>
                  Question {currentQuestionIndex + 1} of {currentQuizModule.questions.length}:
                </Text>
                <Text fontSize="xl" mb={6}>
                  {currentQuizModule.questions[currentQuestionIndex].question}
                </Text>
                <RadioGroup
                  onChange={(value) => handleQuizAnswer(currentQuizModule.questions[currentQuestionIndex].id, value)}
                  value={userAnswers[currentQuizModule.questions[currentQuestionIndex].id] || ""}
                >
                  <Stack direction="column" spacing={3}>
                    {currentQuizModule.questions[currentQuestionIndex].options.map((option, idx) => (
                      <Radio key={idx} value={option} colorScheme="blue">
                        <Text fontSize="md" color={textColor}>{option}</Text>
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
                {userAnswers[currentQuizModule.questions[currentQuestionIndex].id] && (
                  <Alert
                    status={userAnswers[currentQuizModule.questions[currentQuestionIndex].id] === currentQuizModule.questions[currentQuestionIndex].correctAnswer ? "success" : "error"}
                    variant="left-accent"
                    mt={4}
                    borderRadius="md"
                  >
                    <AlertIcon />
                    <AlertDescription>
                      {userAnswers[currentQuizModule.questions[currentQuestionIndex].id] === currentQuizModule.questions[currentQuestionIndex].correctAnswer ? "Correct!" : `Incorrect. The correct answer was: ${currentQuizModule.questions[currentQuestionIndex].correctAnswer}`}
                    </AlertDescription>
                  </Alert>
                )}
                <Flex justify="flex-end" mt={8}>
                  <Button
                    colorScheme="blue"
                    onClick={handleNextQuestion}
                    isDisabled={!userAnswers[currentQuizModule.questions[currentQuestionIndex].id]}
                  >
                    {currentQuestionIndex === currentQuizModule.questions.length - 1 ? "Submit Quiz" : "Next Question"}
                  </Button>
                </Flex>
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Result Modal */}
      <Modal isOpen={isResultOpen} onClose={onResultClose} size="xl" closeOnOverlayClick={false} closeOnEsc={false}>
        <ModalOverlay />
        <ModalContent bg={modalBg}>
          <ModalHeader>
            <Text fontSize="xl" fontWeight="bold" color={titleColor} textAlign="center">
              Quiz Results
            </Text>
          </ModalHeader>
          <ModalBody pb={6}>
            <VStack spacing={6} align="stretch">
              <Box textAlign="center">
                <CircularProgress
                  value={(quizScore / currentQuizModule?.questions.length) * 100}
                  size="100px"
                  thickness="10px"
                  color={quizScore / currentQuizModule?.questions.length >= 0.6 ? "green.400" : "orange.400"}
                >
                  <CircularProgressLabel fontSize="2xl" fontWeight="bold" color={titleColor}>
                    {quizScore}/{currentQuizModule?.questions.length}
                  </CircularProgressLabel>
                </CircularProgress>
                <Text fontSize="2xl" fontWeight="bold" mt={4} color={quizScore / currentQuizModule?.questions.length >= 0.8 ? "green.600" : "orange.600"}>
                  {quizScore / currentQuizModule?.questions.length >= 0.8 ? "Outstanding! You've got this down solid!" : quizScore / currentQuizModule?.questions.length >= 0.5 ? "Keep Learning!" : "Needs more practice."}
                </Text>
              </Box>

              <Card bg={lightBg} borderColor={borderColor} p={4}>
                <Text fontSize="lg" fontWeight="bold" mb={3} color={titleColor}>
                  Areas for Improvement
                </Text>
                <VStack align="stretch" spacing={2}>
                  {currentQuizModule?.questions.filter(q => userAnswers[q.id] !== q.correctAnswer).length > 0 ? (
                    currentQuizModule.questions.filter(q => userAnswers[q.id] !== q.correctAnswer).map((q, idx) => (
                      <Flex key={idx} align="center">
                        <Icon as={FiAlertCircle} mr={2} color="red.500" />
                        <Text fontSize="md" color={textColor}>Review: {q.question}</Text>
                      </Flex>
                    ))
                  ) : (
                    <Text fontSize="md" color={textColorSecondary}>Great job! No specific areas for improvement identified in this quiz.</Text>
                  )}
                </VStack>
              </Card>

              <Card bg={lightBg} borderColor={borderColor} p={4}>
                <Text fontSize="lg" fontWeight="bold" mb={3} color={titleColor}>
                  Recommended Videos
                </Text>
                <VStack align="stretch" spacing={3}>
                  {mockRecommendedVideos.map(video => (
                    <Flex key={video.id} justify="space-between" align="center" p={2} bg={bgColor} borderRadius="md" _hover={{ bg: hoverLessonBg }}>
                      <VStack align="flex-start" spacing={0}>
                        <Text fontWeight="semibold" color={textColor}>
                          {video.title}
                        </Text>
                        <Text fontSize="sm" color={textColorSecondary}>
                          {video.duration} | {video.topic}
                        </Text>
                      </VStack>
                      <Button
                        size="sm"
                        colorScheme="blue"
                        leftIcon={<Icon as={FiPlay} />}
                        onClick={() => {
                          // Logic to play recommended video
                          setVideoUrl(video.videoUrl);
                          setIsVideoPlaying(true);
                          onResultClose();
                          toast({
                            title: `Playing: ${video.title}`,
                            status: "info",
                            duration: 3000,
                            isClosable: true,
                          });
                        }}
                      >
                        Watch Now
                      </Button>
                    </Flex>
                  ))}
                </VStack>
              </Card>

              <Button
                colorScheme="blue"
                size="lg"
                onClick={() => {
                  onResultClose();
                  onRevisionClose(); // Close main revision modal as well
                }}
              >
                Return to Course
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
