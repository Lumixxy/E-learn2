import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Avatar,
  Badge,
  useColorModeValue,
  Select,
  VStack,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  SimpleGrid,
  Progress,
  Tooltip,
  Collapse,
  Container,
  Icon,
  keyframes,
  Divider,
} from "@chakra-ui/react";
import { FaCrown, FaMedal, FaSearch, FaFilter, FaCalendarAlt, FaTrophy, FaFire, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

// Animation keyframes
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(255, 215, 0, 0.5); }
  50% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.8); }
  100% { box-shadow: 0 0 5px rgba(255, 215, 0, 0.5); }
`;

const MotionBox = motion(Box);

// Sample data
const leaderboardData = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    points: 2500,
    level: "Expert",
    streak: 15,
    achievements: ["First Place", "Perfect Score", "Early Bird"],
    recentActivity: ["Completed Advanced Course", "Helped 5 Students", "Achieved Perfect Score"],
    progress: 85,
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    points: 2200,
    level: "Advanced",
    streak: 12,
    achievements: ["Second Place", "Quick Learner", "Team Player"],
    recentActivity: ["Completed Intermediate Course", "Created Study Group", "Helped 3 Students"],
    progress: 75,
  },
  {
    id: 3,
    name: "Mike Johnson",
    avatar: "https://i.pravatar.cc/150?img=3",
    points: 2000,
    level: "Advanced",
    streak: 10,
    achievements: ["Third Place", "Consistent Learner", "Active Participant"],
    recentActivity: ["Completed Basic Course", "Joined Study Group", "Posted 5 Questions"],
    progress: 65,
  },
  {
    id: 4,
    name: "Sarah Wilson",
    avatar: "https://i.pravatar.cc/150?img=4",
    points: 1800,
    level: "Intermediate",
    streak: 8,
    achievements: ["Quick Starter", "Team Player"],
    recentActivity: ["Completed Basic Course", "Joined Study Group"],
    progress: 55,
  },
  {
    id: 5,
    name: "David Brown",
    avatar: "https://i.pravatar.cc/150?img=5",
    points: 1600,
    level: "Intermediate",
    streak: 7,
    achievements: ["Consistent Learner"],
    recentActivity: ["Completed Basic Course"],
    progress: 45,
  },
];

// Podium colors
const podiumColors = [
  "linear(to-b, gray.100, gray.200)",
  "linear(to-b, yellow.100, yellow.200)",
  "linear(to-b, gray.100, gray.200)",
];

const crownColors = ["gray.400", "yellow.400", "gray.400"];

const UserCard = ({ user, rank, isPodium = false }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isPodium) {
    return (
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
        onClick={onOpen}
        cursor="pointer"
        bg="transparent"
        p={4}
        borderRadius="xl"
        position="relative"
        overflow="hidden"
      >
        <VStack
          spacing={2}
          align="center"
          zIndex={rank === 1 ? 2 : 1}
          mt={rank === 1 ? 0 : { base: 4, md: 8 }}
          mb={rank === 1 ? 0 : { base: 0, md: 4 }}
          w={{ base: "32vw", md: "180px" }}
          maxW={{ base: "32vw", md: "180px" }}
        >
          <Box
            borderRadius="full"
            borderWidth={rank === 1 ? "6px" : "4px"}
            borderColor={crownColors[rank - 1]}
            bgGradient={podiumColors[rank - 1]}
            boxShadow={rank === 1 ? "0 8px 32px 0 rgba(255, 193, 7, 0.15)" : "md"}
            p={rank === 1 ? 2 : 1}
            position="relative"
            animation={`${float} 3s ease-in-out infinite`}
          >
            <Avatar
              size={rank === 1 ? "2xl" : "xl"}
              src={user.avatar}
              name={user.name}
              borderWidth="4px"
              borderColor={bgColor}
              boxShadow="lg"
            />
            <Box 
              position="absolute" 
              top={-3} 
              right={-3} 
              bg={bgColor} 
              borderRadius="full" 
              p={1} 
              boxShadow="sm"
              animation={rank === 1 ? `${glow} 2s ease-in-out infinite` : "none"}
            >
              {rank === 1 ? (
                <FaCrown color={crownColors[rank - 1]} size={22} />
              ) : (
                <FaMedal color={crownColors[rank - 1]} size={20} />
              )}
            </Box>
          </Box>
          <Text
            fontWeight="semibold"
            fontSize={rank === 1 ? "lg" : "md"}
            color={textColor}
            mt={rank === 1 ? 4 : 2}
          >
            {user.name}
          </Text>
          <HStack spacing={2}>
            <Badge 
              colorScheme={user.level === "Expert" ? "purple" : user.level === "Advanced" ? "blue" : "green"} 
              variant="subtle" 
              fontSize="sm" 
              borderRadius="md"
            >
              {user.level}
            </Badge>
            <Tooltip label={`${user.streak} day streak!`}>
              <Badge colorScheme="orange" variant="subtle">
                <Icon as={FaFire} mr={1} /> {user.streak}
              </Badge>
            </Tooltip>
          </HStack>
          <Text fontWeight="bold" fontSize={rank === 1 ? "2xl" : "xl"} color={textColor}>
            {user.points.toLocaleString()}
          </Text>
          <Text color="gray.400" fontSize="sm">
            points
          </Text>
        </VStack>
      </MotionBox>
    );
  }

  // Other rankings layout (horizontal)
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      onClick={onOpen}
      cursor="pointer"
      bg={bgColor}
      p={4}
      borderRadius="xl"
      boxShadow="lg"
      border="1px solid"
      borderColor={borderColor}
      position="relative"
      overflow="hidden"
    >
      <Flex align="center" justify="space-between" w="100%">
        <HStack spacing={4}>
          <Box fontWeight="bold" color="gray.400" fontSize="xl" minW="40px">
            #{rank}
          </Box>
          <Avatar src={user.avatar} name={user.name} size="md" />
          <Box>
            <Text fontWeight="semibold" color={textColor} fontSize="lg">
              {user.name}
            </Text>
            <HStack spacing={2} mt={1}>
              <Badge 
                colorScheme={user.level === "Expert" ? "purple" : user.level === "Advanced" ? "blue" : "green"} 
                variant="subtle" 
                fontSize="sm" 
                borderRadius="md"
              >
                {user.level}
              </Badge>
              <Tooltip label={`${user.streak} day streak!`}>
                <Badge colorScheme="orange" variant="subtle">
                  <Icon as={FaFire} mr={1} /> {user.streak}
                </Badge>
              </Tooltip>
            </HStack>
          </Box>
        </HStack>
        <Box textAlign="right">
          <Text fontWeight="bold" fontSize="2xl" color={textColor}>
            {user.points.toLocaleString()}
          </Text>
          <Text color="gray.400" fontSize="sm">
            points
          </Text>
        </Box>
      </Flex>
    </MotionBox>
  );
};

const Leaderboard = () => {
  const [filter, setFilter] = useState("month");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [timeRange, setTimeRange] = useState("all");
  const [category, setCategory] = useState("all");
  const [level, setLevel] = useState("all");

  // Chakra UI hooks
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const cardBg = useColorModeValue("white", "gray.800");
  const achievementBg = useColorModeValue("gray.50", "gray.700");
  const activityBg = useColorModeValue("gray.50", "gray.700");
  const userRankBg = useColorModeValue("blue.50", "blue.900");
  const pageBg = useColorModeValue("gray.50", "gray.900");

  // Reorder podium data to show 1st in middle, 2nd on right, 3rd on left
  const podiumData = [
    leaderboardData[2], // 3rd place (left)
    leaderboardData[0], // 1st place (middle)
    leaderboardData[1], // 2nd place (right)
  ];

  // Get other rankings (4th place onwards)
  const otherRankings = leaderboardData.slice(3);

  // Mock user data - replace with actual user data from your auth system
  const currentUser = {
    id: "user123",
    name: "Adela Parkson",
    avatar: "https://i.pravatar.cc/150?img=7",
    points: 1200,
    level: "Intermediate",
    streak: 5,
    rank: 23,
    achievements: ["Quick Starter", "Team Player"],
    recentActivity: ["Completed Basic Course", "Joined Study Group"],
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <Box minH="100vh" bg={pageBg} py={8}>
      <Container maxW="container.xl">
        {/* Search and Filter Bar */}
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          mb={8}
        >
          <Flex 
            direction={{ base: "column", md: "row" }} 
            gap={4} 
            align="center"
            justify="space-between"
          >
            <InputGroup maxW={{ base: "100%", md: "400px" }}>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaSearch} color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                borderRadius="xl"
                bg={cardBg}
                borderColor={borderColor}
                _hover={{ borderColor: "blue.400" }}
                _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)" }}
              />
            </InputGroup>

            <HStack spacing={4}>
              <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                borderRadius="xl"
                bg={cardBg}
                borderColor={borderColor}
                _hover={{ borderColor: "blue.400" }}
                _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)" }}
              >
                <option value="month">This Month</option>
                <option value="week">This Week</option>
                <option value="year">This Year</option>
                <option value="all">All Time</option>
              </Select>

              <IconButton
                icon={<FaFilter />}
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                borderRadius="xl"
                aria-label="Show filters"
                colorScheme={showFilters ? "blue" : "gray"}
              />
            </HStack>
          </Flex>
        </MotionBox>

        {/* Expanded Filters */}
        <Collapse in={showFilters}>
          <MotionBox
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Box 
              p={4} 
              bg={cardBg} 
              borderRadius="xl" 
              border="1px solid" 
              borderColor={borderColor}
              mb={8}
            >
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                <Box>
                  <Text mb={2} fontWeight="medium">Time Range</Text>
                  <Select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    borderRadius="xl"
                  >
                    <option value="all">All Time</option>
                    <option value="year">This Year</option>
                    <option value="month">This Month</option>
                    <option value="week">This Week</option>
                  </Select>
                </Box>
                <Box>
                  <Text mb={2} fontWeight="medium">Category</Text>
                  <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    borderRadius="xl"
                  >
                    <option value="all">All Categories</option>
                    <option value="programming">Programming</option>
                    <option value="design">Design</option>
                    <option value="business">Business</option>
                  </Select>
                </Box>
                <Box>
                  <Text mb={2} fontWeight="medium">Level</Text>
                  <Select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    borderRadius="xl"
                  >
                    <option value="all">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </Select>
                </Box>
              </SimpleGrid>
            </Box>
          </MotionBox>
        </Collapse>

        {/* Podium Section */}
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          mb={8}
        >
          <Flex 
            justify="center" 
            align="flex-end" 
            gap={{ base: 2, md: 4 }}
            position="relative"
            minH="400px"
          >
            {podiumData.map((user, idx) => (
              <UserCard 
                key={user.id} 
                user={user} 
                rank={idx === 1 ? 1 : idx === 2 ? 2 : 3} 
                isPodium={true} 
              />
            ))}
          </Flex>
        </MotionBox>

        {/* Other Rankings */}
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          mb={8}
        >
          <Box maxW="900px" mx="auto">
            <Text fontSize="2xl" fontWeight="semibold" mb={4} color={textColor}>
              Other Rankings
            </Text>
            <VStack spacing={4} align="stretch">
              {otherRankings.map((user, idx) => (
                <UserCard 
                  key={user.id} 
                  user={user} 
                  rank={idx + 4} 
                />
              ))}
            </VStack>
          </Box>
        </MotionBox>

        {/* Your Rank Section - Moved to bottom */}
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Box maxW="900px" mx="auto">
            <Divider my={8} borderColor={borderColor} />
            <Text fontSize="2xl" fontWeight="semibold" mb={4} color={textColor}>
              Your Position
            </Text>
            <MotionBox
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <Flex
                align="center"
                justify="space-between"
                bg={userRankBg}
                p={4}
                borderRadius="xl"
                boxShadow="md"
                border="1px solid"
                borderColor={borderColor}
                position="relative"
                _hover={{
                  boxShadow: "lg",
                  transform: "translateY(-2px)",
                  transition: "all 0.2s ease-in-out",
                }}
              >
                <HStack spacing={4}>
                  <Box 
                    fontWeight="bold" 
                    color="blue.500" 
                    fontSize="2xl" 
                    minW="60px"
                    textAlign="center"
                  >
                    #{currentUser.rank}
                  </Box>
                  <Avatar src={currentUser.avatar} name={currentUser.name} size="md" />
                  <Box>
                    <Text fontWeight="bold" color={textColor} fontSize="lg">
                      {currentUser.name}
                    </Text>
                    <HStack spacing={2} mt={1}>
                      <Badge 
                        colorScheme={currentUser.level === "Expert" ? "purple" : currentUser.level === "Advanced" ? "blue" : "green"} 
                        variant="subtle" 
                        fontSize="sm" 
                        borderRadius="md"
                      >
                        {currentUser.level}
                      </Badge>
                      <Tooltip label={`${currentUser.streak} day streak!`}>
                        <Badge colorScheme="orange" variant="subtle" fontSize="sm">
                          <Icon as={FaFire} mr={1} /> {currentUser.streak}
                        </Badge>
                      </Tooltip>
                    </HStack>
                  </Box>
                </HStack>
                <Box textAlign="right">
                  <Text fontWeight="bold" fontSize="2xl" color={textColor}>
                    {currentUser.points.toLocaleString()}
                  </Text>
                  <Text color="gray.400" fontSize="sm">
                    points
                  </Text>
                </Box>
              </Flex>
            </MotionBox>
          </Box>
        </MotionBox>

        {/* User Detail Modal */}
        <Modal isOpen={selectedUser !== null} onClose={handleCloseModal} size="xl">
          <ModalOverlay />
          <ModalContent bg={cardBg}>
            <ModalHeader>
              <Flex align="center" gap={4}>
                <Avatar size="lg" src={selectedUser?.avatar} name={selectedUser?.name} />
                <Box>
                  <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                    {selectedUser?.name}
                  </Text>
                  <HStack spacing={2} mt={1}>
                    <Badge 
                      colorScheme={selectedUser?.level === "Expert" ? "purple" : selectedUser?.level === "Advanced" ? "blue" : "green"} 
                      variant="subtle" 
                      fontSize="sm" 
                      borderRadius="md"
                    >
                      {selectedUser?.level}
                    </Badge>
                    <Tooltip label={`${selectedUser?.streak} day streak!`}>
                      <Badge colorScheme="orange" variant="subtle">
                        <Icon as={FaFire} mr={1} /> {selectedUser?.streak}
                      </Badge>
                    </Tooltip>
                  </HStack>
                </Box>
              </Flex>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                <Box>
                  <Text fontWeight="medium" mb={2}>Achievements</Text>
                  <VStack align="stretch" spacing={2}>
                    {selectedUser?.achievements.map((achievement, idx) => (
                      <Flex 
                        key={idx} 
                        align="center" 
                        gap={2} 
                        p={2} 
                        bg={achievementBg}
                        borderRadius="md"
                      >
                        <Icon as={FaTrophy} color="yellow.500" />
                        <Text>{achievement}</Text>
                      </Flex>
                    ))}
                  </VStack>
                </Box>
                <Box>
                  <Text fontWeight="medium" mb={2}>Recent Activity</Text>
                  <VStack align="stretch" spacing={2}>
                    {selectedUser?.recentActivity.map((activity, idx) => (
                      <Flex 
                        key={idx} 
                        align="center" 
                        gap={2} 
                        p={2} 
                        bg={activityBg}
                        borderRadius="md"
                      >
                        <Icon as={FaStar} color="blue.500" />
                        <Text>{activity}</Text>
                      </Flex>
                    ))}
                  </VStack>
                </Box>
              </SimpleGrid>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>
    </Box>
  );
};

export default Leaderboard;
