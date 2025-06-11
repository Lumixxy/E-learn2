import { useState } from "react";
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
  FiHelpCircle,
  FiShare2,
  FiDownload,
  FiX,
  FiCode,
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
        { id: 101, title: "Course Overview", duration: "10 min", type: "video", completed: true },
        { id: 102, title: "Setting Up Your Development Environment", duration: "25 min", type: "video", completed: true },
        { id: 103, title: "Introduction to HTML", duration: "45 min", type: "video", completed: true },
        { id: 104, title: "HTML Quiz", duration: "15 min", type: "quiz", completed: true },
        { id: 105, title: "Your First Web Page", duration: "30 min", type: "assignment", completed: true }
      ]
    },
    {
      id: 2,
      title: "Mastering CSS and Responsive Design",
      completed: false,
      description: "Dive deep into CSS, learn advanced styling techniques, and make your websites responsive.",
      lessons: [
        { id: 201, title: "CSS Fundamentals", duration: "30 min", type: "video", completed: false },
        { id: 202, title: "Flexbox and Grid Layout", duration: "60 min", type: "video", completed: false },
        { id: 203, title: "Responsive Design Principles", duration: "40 min", type: "video", completed: false },
        { id: 204, title: "Building a Responsive Navbar", duration: "50 min", type: "assignment", completed: false }
      ]
    },
    {
      id: 3,
      title: "JavaScript Basics to Advanced",
      completed: false,
      description: "From variables to asynchronous JavaScript, master the language of the web.",
      lessons: [
        { id: 301, title: "JavaScript Syntax and Data Types", duration: "35 min", type: "video", completed: false },
        { id: 302, title: "Functions and Scope", duration: "45 min", type: "video", completed: false },
        { id: 303, title: "DOM Manipulation", duration: "55 min", type: "video", completed: false },
        { id: 304, title: "Working with APIs (Fetch & Async/Await)", duration: "70 min", type: "video", completed: false }
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

export default function CourseDetail() {
  const { courseId } = useParams();
  const [activeModule, setActiveModule] = useState(-1);
  const [activeLesson, setActiveLesson] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const { isOpen: isCertificateOpen, onOpen: onCertificateOpen, onClose: onCertificateClose } = useDisclosure();

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

  return (
    <Box p={6} maxW="7xl" mx="auto" bg={useColorModeValue("gray.50", "navy.900")}>
      <Box mb={6}>
        <Link to="/admin/my-learning">
          <Flex align="center" color={textColor} _hover={{ color: "blue.500" }} mb={2}>
            <Icon as={FiArrowLeft} mr={1} />
            <Text fontSize="sm">Back to My Learning</Text>
          </Flex>
        </Link>
        
        <Flex justify="space-between" align="center">
          <Text fontSize="3xl" fontWeight="bold" color={titleColor}>{courseData.title}</Text>
          <HStack spacing={2} display={{ base: "none", md: "flex" }}>
            {courseData.isCompleted && (
              <Button
                leftIcon={<Icon as={FiAward} />}
                colorScheme="yellow"
                onClick={onCertificateOpen}
              >
                Get Certificate
              </Button>
            )}
            <Button variant="outline" size="sm" leftIcon={<Icon as={FiShare2} />} color={textColor} borderColor={borderColor}>
              Share
            </Button>
            <Button variant="outline" size="sm" leftIcon={<Icon as={FiHelpCircle} />} color={textColor} borderColor={borderColor}>
              Help
            </Button>
          </HStack>
        </Flex>
        
        <Text color={textColor} mt={1}>{courseData.description}</Text>
      </Box>

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
                                  ? FiHelpCircle
                                  : lesson.type === "assignment"
                                  ? FiFileText
                                  : FiBookOpen
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
            <Card bg={bgColor} borderColor={borderColor}>
              <CardHeader>
                <Flex align="center">
                  <Avatar src={courseData.instructor.avatar} size="lg" mr={4} />
                  <Box>
                    <Text fontSize="xl" fontWeight="bold" color={titleColor}>
                      {courseData.instructor.name}
                    </Text>
                    <Text fontSize="md" color={textColorSecondary}>
                      {courseData.instructor.role}
                    </Text>
                  </Box>
                </Flex>
              </CardHeader>
              <CardBody>
                <Text color={textColor} mb={4}>
                  {courseData.instructor.bio}
                </Text>
                <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                  <VStack align="flex-start" spacing={0}>
                    <Text fontSize="sm" color={textColorSecondary}>Courses</Text>
                    <Text fontWeight="semibold" color={titleColor}>{courseData.instructor.courses}</Text>
                  </VStack>
                  <VStack align="flex-start" spacing={0}>
                    <Text fontSize="sm" color={textColorSecondary}>Students</Text>
                    <Text fontWeight="semibold" color={titleColor}>{courseData.instructor.students.toLocaleString()}</Text>
                  </VStack>
                  <VStack align="flex-start" spacing={0}>
                    <Text fontSize="sm" color={textColorSecondary}>Rating</Text>
                    <Text fontWeight="semibold" color={titleColor}>{courseData.instructor.rating} stars</Text>
                  </VStack>
                  <Button
                    leftIcon={<Icon as={FiMail} />}
                    colorScheme="blue"
                    variant="outline"
                    size="sm"
                  >
                    Contact Instructor
                  </Button>
                </SimpleGrid>
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
                  <video controls style={{ width: "100%", maxHeight: "600px", background: "#000" }}>
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <Button mt={4} onClick={() => handleReplayVideo(courseData.modules.find(m => m.lessons.some(l => l.id === activeLesson.id)).id, activeLesson.id)}>Replay Video</Button>
                </Box>
              )}
              {activeLesson.type === "assignment" && (
                <Box mb={6}>
                  <Text fontSize="lg" fontWeight="semibold" mb={2}>Assignment Instructions:</Text>
                  <Text color={textColor}>
                    {`Implement a function that calculates the factorial of a given number.
                    For example, factorial(5) should return 120.
                    You can use any language you prefer, but JavaScript, Python, and Java are recommended.`}
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
      <Modal isOpen={isCertificateOpen} onClose={onCertificateClose} isCentered>
        <ModalOverlay />
        <ModalContent bg={useColorModeValue("white", "gray.800")}>
          <ModalHeader borderBottomWidth="1px" borderColor={borderColor}>
            <Flex align="center">
              <Icon as={FiAward} color={greenIconColor} mr={2} />
              <Text fontSize="xl" fontWeight="bold" color={titleColor}>
                Certificate of Completion
              </Text>
              <ModalCloseButton />
            </Flex>
          </ModalHeader>
          <ModalBody textAlign="center" p={6}>
            <Image src="https://via.placeholder.com/600x400.png?text=Certificate+Placeholder" alt="Certificate" mb={4} />
            <Text fontSize="lg" color={textColor} mb={2}>
              Congratulations, [Student Name]!
            </Text>
            <Text fontSize="md" color={textColorSecondary} mb={4}>
              You have successfully completed the "{courseData.title}" course.
            </Text>
            <Button leftIcon={<Icon as={FiDownload} />} colorScheme="blue">
              Download Certificate
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
} 