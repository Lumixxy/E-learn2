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
  const { isOpen: isCertificateOpen, onOpen: onCertificateOpen, onClose: onCertificateClose } = useDisclosure();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "whiteAlpha.700");
  const titleColor = useColorModeValue("gray.700", "white");
  const lightBg = useColorModeValue("gray.50", "navy.700");
  const lightBlueBg = useColorModeValue("blue.50", "blue.800");
  const hoverLessonBg = useColorModeValue("gray.100", "navy.600");
  const green100Bg = useColorModeValue("green.100", "green.800");
  const greenIconColor = useColorModeValue("green.600", "green.300");
  const blueIconColor = useColorModeValue("blue.500", "blue.300");

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

  return (
    <Box p={6} maxW="7xl" mx="auto" bg={useColorModeValue("gray.50", "navy.900")}>
      <Box mb={6}>
        <Link to="/dashboard/learning">
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

      <Card mb={6} bg={bgColor} borderColor={borderColor}>
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
                  as={courseData.isCompleted ? FiAward : FiBookOpen}
                  w={6}
                  h={6}
                  color={courseData.isCompleted ? greenIconColor : blueIconColor}
                />
              </Box>
              <Box>
                <Text fontWeight="semibold" color={titleColor}>
                  {courseData.isCompleted ? "Course Completed! 🎉" : "Your progress"}
                </Text>
                <Text fontSize="sm" color={textColor}>
                  {courseData.lessonsCompleted} of {courseData.totalLessons} lessons completed
                </Text>
              </Box>
            </HStack>
            
            <Box textAlign="right">
              <Text fontSize="lg" fontWeight="bold" color={titleColor}>{courseData.progress}%</Text>
              <Text fontSize="sm" color={textColor}>{courseData.updated}</Text>
              {courseData.isCompleted && (
                <Button
                  size="sm"
                  colorScheme="yellow"
                  leftIcon={<Icon as={FiDownload} />}
                  mt={2}
                  onClick={onCertificateOpen}
                >
                  Certificate
                </Button>
              )}
            </Box>
          </Flex>
          
          <Progress value={courseData.progress} size="sm" mt={2} />
        </CardBody>
      </Card>

      <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
        <GridItem>
          {/* Main Content */}
          <VStack spacing={6} align="stretch">
            {/* Video Player Card - Only show when a video lesson is active */}
            {activeLesson && activeLesson.type === "video" && (
              <Card bg={bgColor} mb={6}>
                <CardHeader>
                  <Flex justify="space-between" align="center">
                    <Text fontWeight="semibold" fontSize="lg" color={titleColor}>
                      {activeLesson.title}
                    </Text>
                    <IconButton
                      icon={<Icon as={FiX} />}
                      variant="ghost"
                      size="sm"
                      onClick={handleCloseLessonContent}
                      color={textColor}
                    />
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Box position="relative" w="full" h="400px">
                    <Box
                      as="iframe"
                      src={videoUrl}
                      allowFullScreen
                      w="full"
                      h="full"
                      borderRadius="md"
                    />
                  </Box>
                  <Box mt={4}>
                    <Text fontWeight="bold" fontSize="lg" mb={3} color={titleColor}>Comments</Text>
                    <VStack spacing={4} align="stretch">
                      {/* Mock Comments */}
                      <Box bg={lightBg} p={3} borderRadius="md">
                        <Flex justify="space-between" align="center" mb={1}>
                          <HStack spacing={2}>
                            <Avatar size="sm" name="User 1" src="https://randomuser.me/api/portraits/men/1.jpg" />
                            <Text fontWeight="semibold" color={titleColor}>John Doe</Text>
                          </HStack>
                          <Text fontSize="xs" color={textColor}>2 days ago</Text>
                        </Flex>
                        <Text fontSize="sm" color={textColor}>This lesson was very helpful!</Text>
                      </Box>
                      <Box bg={lightBg} p={3} borderRadius="md">
                        <Flex justify="space-between" align="center" mb={1}>
                          <HStack spacing={2}>
                            <Avatar size="sm" name="User 2" src="https://randomuser.me/api/portraits/women/2.jpg" />
                            <Text fontWeight="semibold" color={titleColor}>Jane Smith</Text>
                          </HStack>
                          <Text fontSize="xs" color={textColor}>1 day ago</Text>
                        </Flex>
                        <Text fontSize="sm" color={textColor}>I have a question about the last example.</Text>
                      </Box>
                    </VStack>

                    <Box mt={6}>
                      <Text fontWeight="bold" fontSize="md" mb={2} color={titleColor}>Add a Comment</Text>
                      <Textarea
                        placeholder="Write your comment here..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        mb={3}
                        color={textColor}
                        borderColor={borderColor}
                      />
                      <Button colorScheme="blue" onClick={handleSubmitComment}>Submit Comment</Button>
                    </Box>
                  </Box>
                </CardBody>
              </Card>
            )}

            {/* Course Modules */}
            {courseData.modules.map((module, index) => (
              <Card key={module.id} borderWidth={activeModule === index ? 2 : 1} borderColor={activeModule === index ? "blue.500" : borderColor} bg={bgColor}>
                <CardHeader
                  py={4}
                  px={6}
                  cursor="pointer"
                  onClick={() => setActiveModule(activeModule === index ? -1 : index)}
                >
                  <Flex justify="space-between" align="center">
                    <HStack spacing={3}>
                      {module.completed ? (
                        <Box
                          w={6}
                          h={6}
                          rounded="full"
                          bg={lightBlueBg}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Icon as={FiCheckCircle} w={4} h={4} color={blueIconColor} />
                        </Box>
                      ) : (
                        <Box
                          w={6}
                          h={6}
                          rounded="full"
                          borderWidth={1}
                          borderColor={borderColor}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Text fontSize="xs" color={textColor}>{index + 1}</Text>
                        </Box>
                      )}
                      <Text fontWeight="medium" color={titleColor}>{module.title}</Text>
                    </HStack>
                    <Text fontSize="sm" color={textColor}>
                      {module.lessons.length} lessons • {module.lessons.filter(l => l.completed).length}/{module.lessons.length} completed
                    </Text>
                  </Flex>
                </CardHeader>

                {activeModule === index && (
                  <CardBody pt={0} pb={4} px={6} bg={bgColor} borderTop="1px" borderColor={borderColor}>
                    <Text fontSize="sm" color={textColor} mb={4}>{module.description}</Text>
                    <VStack align="stretch" spacing={2}>
                      {module.lessons.map((lesson) => (
                        <Flex
                          key={lesson.id}
                          p={3}
                          bg={lightBg}
                          borderRadius="md"
                          align="center"
                          justify="space-between"
                          _hover={{
                            bg: hoverLessonBg,
                            transform: "translateY(-2px)",
                            boxShadow: "md",
                            transition: "all 0.2s",
                          }}
                          cursor="pointer"
                          onClick={() => handleLessonStart(module.id, lesson.id)}
                        >
                          <HStack spacing={3}>
                            <Icon
                              as={lesson.completed ? FiCheckCircle : FiLock}
                              color={lesson.completed ? greenIconColor : textColor}
                            />
                            <Text fontWeight="medium" color={textColor}>{lesson.title}</Text>
                          </HStack>
                          <HStack spacing={2}>
                            <Text fontSize="sm" color={textColor}>{lesson.duration}</Text>
                            {lesson.type === "video" && (
                              <Button 
                                size="xs" 
                                variant="ghost" 
                                colorScheme="blue"
                                onClick={() => handleReplayVideo(module.id, lesson.id)}
                              >
                                Replay
                              </Button>
                            )}
                          </HStack>
                        </Flex>
                      ))}
                    </VStack>
                  </CardBody>
                )}
              </Card>
            ))}
          </VStack>
        </GridItem>

        <GridItem>
          {/* Sidebar */}
          <VStack spacing={6} align="stretch">
            <Card bg={bgColor}>
              <CardBody p={6}>
                <VStack spacing={4} align="stretch">
                  <Flex justify="space-between" align="center">
                    <Text fontWeight="semibold" color={titleColor}>Your Stats</Text>
                    <Button variant="ghost" size="sm" color={textColor}>View All</Button>
                  </Flex>
                  
                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <Box bg={lightBg} p={3} rounded="lg" textAlign="center">
                      <Text fontSize="3xl" fontWeight="bold" color={titleColor}>1,250</Text>
                      <Text fontSize="xs" color={textColor} mt={1}>XP Earned</Text>
                    </Box>
                    <Box bg={lightBg} p={3} rounded="lg" textAlign="center">
                      <Text fontSize="3xl" fontWeight="bold" color={titleColor}>7</Text>
                      <Text fontSize="xs" color={textColor} mt={1}>Day Streak</Text>
                    </Box>
                  </Grid>
                  
                  <VStack spacing={2} align="stretch">
                    <Flex justify="space-between" fontSize="sm">
                      <Text color={textColor}>Current Level</Text>
                      <Text fontWeight="medium" color={titleColor}>Level 3</Text>
                    </Flex>
                    <Progress value={45} size="sm" />
                    <Text fontSize="xs" color={textColor}>Earn 350 more XP to reach Level 4</Text>
                  </VStack>
                  
                </VStack>
              </CardBody>
            </Card>

            <Card bg={bgColor}>
              <CardHeader pb={0}>
                <Text fontWeight="semibold" fontSize="lg" color={titleColor}>Recent Achievements</Text>
              </CardHeader>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <HStack spacing={3} align="center">
                    <Icon as={FiAward} w={5} h={5} color={greenIconColor} />
                    <Box>
                      <Text fontWeight="medium" color={textColor}>First Certificate Earned!</Text>
                      <Text fontSize="sm" color={textColor}>Completed Web Dev Bootcamp</Text>
                    </Box>
                  </HStack>
                  <HStack spacing={3} align="center">
                    <Icon as={FiBarChart2} w={5} h={5} color={blueIconColor} />
                    <Box>
                      <Text fontWeight="medium" color={textColor}>Reached Level 3</Text>
                      <Text fontSize="sm" color={textColor}>Keep up the great work!</Text>
                    </Box>
                  </HStack>
                </VStack>
              </CardBody>
            </Card>

            <Card bg={bgColor}>
              <CardHeader pb={0}>
                <Text fontWeight="semibold" fontSize="lg" color={titleColor}>Instructor Details</Text>
              </CardHeader>
              <CardBody>
                <HStack spacing={4} align="center" mb={4}>
                  <Avatar src={courseData.instructor.avatar} name={courseData.instructor.name} size="xl" />
                  <Box>
                    <Text fontWeight="bold" fontSize="lg" color={titleColor}>{courseData.instructor.name}</Text>
                    <Text fontSize="sm" color={textColor}>{courseData.instructor.role}</Text>
                  </Box>
                </HStack>
                <Text fontSize="sm" color={textColor} mb={4}>{courseData.instructor.bio}</Text>
                <Grid templateColumns="repeat(3, 1fr)" gap={4} fontSize="sm" color={textColor}>
                  <VStack align="center">
                    <Text fontWeight="bold" fontSize="lg" color={titleColor}>{courseData.instructor.courses}</Text>
                    <Text color={textColor}>Courses</Text>
                  </VStack>
                  <VStack align="center">
                    <Text fontWeight="bold" fontSize="lg" color={titleColor}>{courseData.instructor.students / 1000}k+</Text>
                    <Text color={textColor}>Students</Text>
                  </VStack>
                  <VStack align="center">
                    <Text fontWeight="bold" fontSize="lg" color={titleColor}>{courseData.instructor.rating}</Text>
                    <Text color={textColor}>Rating</Text>
                  </VStack>
                </Grid>
              </CardBody>
            </Card>

            <Card bg={bgColor}>
              <CardHeader pb={0}>
                <Text fontWeight="semibold" fontSize="lg" color={titleColor}>Community & Support</Text>
              </CardHeader>
              <CardBody>
                <VStack spacing={3} align="stretch">
                  <Button leftIcon={<Icon as={FiMessageSquare} />} variant="outline" justifyContent="flex-start" color={textColor} borderColor={borderColor}>Join Course Forum</Button>
                  <Button leftIcon={<Icon as={FiMail} />} variant="outline" justifyContent="flex-start" color={textColor} borderColor={borderColor}>Contact Instructor</Button>
                  <Button leftIcon={<Icon as={FiAlertCircle} />} variant="outline" justifyContent="flex-start" color={textColor} borderColor={borderColor}>Report an Issue</Button>
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
}