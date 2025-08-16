import React from "react";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  Button,
  Icon,
  Image,
  VStack,
  HStack,
  useColorModeValue,
  Card,
  SimpleGrid,
  keyframes,
} from "@chakra-ui/react";
import {
  Zap,
  Trophy,
  Target,
  BookOpen,
  Users,
  Clock,
  Star,
  ChevronRight,
  ArrowUpRight,
  Lock,
  MessageCircle,
  Award,
  Flame,
  Gamepad2,
  Sword,
  Shield,
} from "lucide-react";
import { MdArrowForward } from "react-icons/md";
import { FiCode, FiTrendingUp, FiLayers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ApiTest from "components/ApiTest";

// Gaming-themed animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(127, 124, 255, 0.5); }
  50% { box-shadow: 0 0 40px rgba(127, 124, 255, 0.8), 0 0 60px rgba(63, 224, 208, 0.6); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Use gaming-themed images
const courseJavaScript = "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80";
const courseReact = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80";
const coursePython = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80";

const StatCard = ({ title, value, subtitle, icon, trend, bg, borderColor, iconColor }) => {
  const cardBg = useColorModeValue("white", bg);
  const cardBorder = useColorModeValue("gray.200", borderColor);
  const textColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.300");
  const iconBg = useColorModeValue("gray.100", "blackAlpha.600");
  const hoverShadow = useColorModeValue("lg", "0 0 0 2px " + borderColor);
  
  return (
    <Box
      p={6}
      borderRadius="xl"
      bg={cardBg}
      borderWidth="2px"
      borderColor={cardBorder}
      position="relative"
      minH="180px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      transition="all 0.3s ease"
      _hover={{ 
        boxShadow: hoverShadow,
        transform: "translateY(-5px)",
        borderColor: iconColor
      }}
      animation={`${float} 3s ease-in-out infinite`}
    >
      <Box position="absolute" top={4} right={4}>
        <Box 
          bg={iconBg} 
          borderRadius="lg" 
          p={2} 
          display="flex" 
          alignItems="center"
          animation={`${glow} 2s ease-in-out infinite`}
        >
          <Icon as={icon} boxSize={7} color={iconColor} />
        </Box>
      </Box>
      <Box textAlign="left">
        <Text fontWeight="semibold" color={textColor} mb={1}>{title}</Text>
        <Text fontSize="3xl" fontWeight="bold" color={textColor} mb={1}>{value}</Text>
        <Text fontSize="md" color={subTextColor} mb={2}>{subtitle}</Text>
        <HStack spacing={1} mt={2}>
          <Icon as={ArrowUpRight} color="green.400" boxSize={4} />
          <Text fontSize="md" color="green.400" fontWeight="bold">{trend.value}</Text>
        </HStack>
      </Box>
    </Box>
  );
};

const CourseCard = ({ title, description, image, difficulty, duration, students, rating, xpReward, isLocked, tags, progress, actionLabel, actionType }) => {
  const cardBg = useColorModeValue("white", "linear-gradient(135deg, #232a36 60%, #181c2f 100%)");
  const cardBorder = useColorModeValue("gray.200", "#232946");
  const textColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.300");
  const tagBg = useColorModeValue("gray.100", "#232946");
  const tagColor = useColorModeValue("gray.700", "#a3a8ff");
  const progressBg = useColorModeValue("gray.200", "#232946");
  const progressColor = useColorModeValue("purple.500", "#a259ff");
  const starColor = useColorModeValue("green.500", "#19e37d");
  const hoverShadow = useColorModeValue("xl", "0 0 0 2px #3FE0D0");
  const boxShadow = useColorModeValue("lg", "none");
  
  // Difficulty color
  const diffColors = {
    Beginner: useColorModeValue("green.500", "#19e37d"),
    Intermediate: useColorModeValue("purple.500", "#a259ff"),
    Advanced: useColorModeValue("pink.500", "#ff4ecd")
  };
  return (
    <Box
      bg={cardBg}
      borderRadius="2xl"
      overflow="hidden"
      borderWidth="2px"
      borderColor={cardBorder}
      boxShadow={boxShadow}
      minW={0}
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      position="relative"
      transition="all 0.3s ease"
      _hover={{ 
        boxShadow: hoverShadow,
        transform: "translateY(-8px) scale(1.02)",
        borderColor: "#3FE0D0"
      }}
      animation={`${float} 4s ease-in-out infinite`}
    >
      {/* Image and overlays */}
      <Box position="relative" w="full" h="180px" overflow="hidden">
        <Image src={image} alt={title} objectFit="cover" w="full" h="180px" />
        {/* XP badge */}
        <Box 
          position="absolute" 
          top={3} 
          left={3} 
          bgGradient="linear(to-r, #a259ff, #ff4ecd)" 
          color="white" 
          px={3} 
          py={1} 
          borderRadius="lg" 
          fontWeight="bold" 
          fontSize="sm" 
          zIndex={2}
          animation={`${pulse} 2s ease-in-out infinite`}
        >
          <Icon as={Trophy} boxSize={4} mr={1} mb={-0.5} /> {xpReward} XP
        </Box>
        {/* Difficulty badge */}
        <Box 
          position="absolute" 
          bottom={3} 
          left={3} 
          bg={diffColors[difficulty]} 
          color="white" 
          px={3} 
          py={1} 
          borderRadius="lg" 
          fontWeight="bold" 
          fontSize="sm" 
          zIndex={2}
        >
          {difficulty}
        </Box>
        {/* Locked overlay */}
        {isLocked && (
          <Box position="absolute" inset={0} bg="rgba(30,0,50,0.7)" display="flex" flexDirection="column" alignItems="center" justifyContent="center" zIndex={3}>
            <Icon as={Lock} boxSize={48} color="#a259ff" opacity={0.3} mb={2} />
            <Text color="#a259ff" fontWeight="bold" fontSize="2xl">Locked</Text>
          </Box>
        )}
      </Box>
      {/* Card content */}
      <Box p={6} pt={4} display="flex" flexDirection="column" flex={1}>
        <Heading size="md" mb={2} color={textColor} textAlign="left">{title}</Heading>
        <Text fontSize="md" color={subTextColor} mb={3} textAlign="left">{description}</Text>
        {/* Tags */}
        {tags && (
          <HStack spacing={2} mb={3}>
            {tags.map((tag, i) => (
              <Box key={i} px={3} py={1} bg={tagBg} color={tagColor} borderRadius="lg" fontSize="sm" fontWeight="semibold">{tag}</Box>
            ))}
          </HStack>
        )}
        {/* Progress bar */}
        {progress !== undefined && (
          <Box mb={3}>
            <Text fontSize="sm" color={subTextColor} mb={1}>Progress <Text as="span" color={progressColor} fontWeight="bold">{progress}%</Text></Text>
            <Box w="100%" h={2} bg={progressBg} borderRadius="md" overflow="hidden">
              <Box w={`${progress}%`} h={2} bgGradient="linear(to-r, #a259ff, #ff4ecd)" borderRadius="md" />
            </Box>
          </Box>
        )}
        {/* Info row */}
        <HStack spacing={6} mb={4} mt={2} color={subTextColor}>
          <HStack spacing={1}><Icon as={Clock} boxSize={5} /> <Text fontSize="sm">{duration}</Text></HStack>
          <HStack spacing={1}><Icon as={Users} boxSize={5} /> <Text fontSize="sm">{students.toLocaleString()}</Text></HStack>
          <HStack spacing={1}><Icon as={Star} color={starColor} boxSize={5} /> <Text fontSize="sm" color={starColor} fontWeight="bold">{rating}</Text></HStack>
        </HStack>
        {/* Action button */}
        {isLocked ? (
          <Button w="100%" size="lg" colorScheme="gray" bg="#232946" color="gray.400" cursor="not-allowed" _hover={{}} disabled>Unlock Required</Button>
        ) : actionType === "continue" ? (
          <Button 
            w="100%" 
            size="lg" 
            bgGradient="linear(to-r, #a259ff, #3FE0D0)" 
            color="white" 
            fontWeight="bold" 
            leftIcon={<Icon as={Zap} />} 
            _hover={{ bgGradient: "linear(to-r, #3FE0D0, #a259ff)" }}
            animation={`${glow} 2s ease-in-out infinite`}
          >
            Continue Learning
          </Button>
        ) : (
          <Button 
            w="100%" 
            size="lg" 
            variant="outline" 
            borderColor="#3FE0D0" 
            color="#3FE0D0" 
            fontWeight="bold" 
            leftIcon={<Icon as={ChevronRight} />} 
            _hover={{ bg: "#232946", borderColor: "#a259ff", color: "#a259ff" }}
          >
            Start Course
          </Button>
        )}
      </Box>
    </Box>
  );
};

const rarityColors = {
  Common: '#a3a8ff',
  Rare: '#a259ff',
  Epic: '#ff4ecd',
  Legendary: '#ff4ecd',
};

const rarityBg = {
  Common: 'rgba(163,168,255,0.08)',
  Rare: 'rgba(162,89,255,0.08)',
  Epic: 'rgba(255,78,205,0.08)',
  Legendary: 'rgba(255,78,205,0.08)',
};

const AchievementCard = ({ title, description, icon, progress, maxProgress, xpReward, rarity, date, isUnlocked }) => {
  const cardBg = useColorModeValue("white", `linear-gradient(135deg, ${rarityBg[rarity] || '#181c2f'} 60%, #181c2f 100%)`);
  const cardBorder = useColorModeValue("gray.200", rarityColors[rarity] || '#232946');
  const textColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.300");
  const iconBg = useColorModeValue("gray.100", "blackAlpha.600");
  const iconColor = useColorModeValue("blue.500", "#a3a8ff");
  const hoverShadow = useColorModeValue("lg", `0 0 0 2px ${rarityColors[rarity]}`);
  const progressBg = useColorModeValue("gray.200", "#232946");
  const progressTextColor = useColorModeValue("gray.700", "whiteAlpha.800");
  const rarityBgColor = useColorModeValue("gray.100", "blackAlpha.700");
  
  // Adjust opacity for locked achievements
  const opacity = isUnlocked ? 1 : 0.6;
  
  return (
    <Box
      p={6}
      borderRadius="xl"
      bg={cardBg}
      borderWidth="2px"
      borderColor={cardBorder}
      display="flex"
      flexDirection="column"
      position="relative"
      minH="140px"
      justifyContent="center"
      transition="all 0.3s ease"
      _hover={{ 
        boxShadow: hoverShadow,
        transform: "translateY(-5px)",
        borderColor: rarityColors[rarity]
      }}
      opacity={opacity}
      animation={`${float} 3.5s ease-in-out infinite`}
    >
      {/* XP badge */}
      <Box 
        position="absolute" 
        top={4} 
        right={4} 
        bgGradient="linear(to-r, #a259ff, #ff4ecd)" 
        color="white" 
        px={4} 
        py={1} 
        borderRadius="lg" 
        fontWeight="bold" 
        fontSize="sm" 
        zIndex={2}
        animation={`${pulse} 2s ease-in-out infinite`}
      >
        {xpReward} XP
      </Box>
      {/* Status badge */}
      <Box position="absolute" top={4} left={4} bg={rarityBgColor} color={rarityColors[rarity]} px={3} py={1} borderRadius="lg" fontSize="xs" fontWeight="bold">
        {isUnlocked ? "Unlocked" : "In Progress"}
      </Box>
      {/* Icon */}
      <Box 
        position="absolute" 
        left={4} 
        top={12} 
        bg={iconBg} 
        borderRadius="lg" 
        p={2} 
        display="flex" 
        alignItems="center"
        animation={`${glow} 2.5s ease-in-out infinite`}
      >
        <Icon as={icon} boxSize={7} color={iconColor} />
      </Box>
      <Box pl={16} pr={2} pt={8}>
        <Text fontWeight="bold" color={textColor} fontSize="lg" mb={1}>{title}</Text>
        <Text color={subTextColor} fontSize="md" mb={1}>{description}</Text>
        <HStack justify="space-between" mb={2}>
          <Text color={progressTextColor} fontSize="md">{progress}/{maxProgress}</Text>
          <Box px={3} py={1} borderRadius="lg" fontSize="sm" fontWeight="bold" color={rarityColors[rarity]} bg={rarityBgColor}>{rarity}</Box>
        </HStack>
        {/* Progress bar */}
        <Box w="100%" h={2} bg={progressBg} borderRadius="md" overflow="hidden">
          <Box w={`${(progress / maxProgress) * 100}%`} h={2} bgGradient="linear(to-r, #a259ff, #ff4ecd)" borderRadius="md" />
        </Box>
      </Box>
    </Box>
  );
};

export default function Index() {
  const navigate = useNavigate();
  const bgColor = useColorModeValue("white", "#0a0a0f");
  const textColor = useColorModeValue("gray.800", "white");
  const heroBg = useColorModeValue("gray.50", "linear-gradient(to-br, #0a0a0f 60%, #1a093e 100%)");
  const subTextColor = useColorModeValue("gray.600", "gray.300");
  const headingColor = useColorModeValue("blue.600", "#A3A8FF");
  const accentColor = useColorModeValue("teal.500", "#3FE0D0");
  const featureTextColor = useColorModeValue("gray.700", "gray.100");
  const resumeCardBg = useColorModeValue("white", "rgba(24, 28, 47, 0.9)");
  const liveIndicatorBg = useColorModeValue("white", "rgba(24, 28, 47, 0.9)");
  const sectionTextColor = useColorModeValue("gray.600", "gray.400");
  const buttonBorderColor = useColorModeValue("teal.500", "#3FE0D0");
  const buttonHoverBg = useColorModeValue("gray.100", "#232946");
  const buttonHoverBorder = useColorModeValue("purple.500", "#a259ff");
  const buttonHoverText = useColorModeValue("purple.500", "#a259ff");
  const trophyColor = useColorModeValue("purple.500", "#C084FC");
  const zapColor = useColorModeValue("pink.500", "#FF4ECD");
  
  return (
    <Box minH="100vh" bg={bgColor} color={textColor} position="relative">
      {/* Hero Section - Fullscreen, ignore header */}
      <Box
        position="relative"
        minH="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        px={{ base: 4, md: 0 }}
        py={0}
        textAlign="center"
        bg={heroBg}
        overflow="hidden"
      >
        {/* Gaming background image */}
        <Box
          position="absolute"
          inset={0}
          zIndex={0}
          bgImage="url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=2000&q=80')"
          bgSize="cover"
          bgPosition="center"
          opacity={0.15}
          filter="blur(2px) brightness(0.3)"
        />
        
        {/* Animated gaming particles */}
        <Box position="absolute" top="15%" left="15%" w={3} h={3} bg="#A259FF" borderRadius="full" filter="blur(3px)" opacity={0.8} zIndex={1} animation={`${pulse} 3s ease-in-out infinite`} />
        <Box position="absolute" top="25%" right="20%" w={2} h={2} bg="#3FE0D0" borderRadius="full" filter="blur(2px)" opacity={0.7} zIndex={1} animation={`${pulse} 2.5s ease-in-out infinite`} />
        <Box position="absolute" top="70%" left="25%" w={4} h={4} bg="#FF4ECD" borderRadius="full" filter="blur(4px)" opacity={0.6} zIndex={1} animation={`${pulse} 4s ease-in-out infinite`} />
        <Box position="absolute" top="45%" right="10%" w={1.5} h={1.5} bg="#19E37D" borderRadius="full" filter="blur(1.5px)" opacity={0.9} zIndex={1} animation={`${pulse} 1.8s ease-in-out infinite`} />
        <Box position="absolute" top="80%" right="30%" w={2.5} h={2.5} bg="#7F7CFF" borderRadius="full" filter="blur(2.5px)" opacity={0.7} zIndex={1} animation={`${pulse} 3.2s ease-in-out infinite`} />
        
        {/* Rotating gaming icon */}
        <Box position="absolute" top="10%" right="15%" zIndex={1}>
          <Icon as={Gamepad2} boxSize={8} color="#A259FF" opacity={0.6} animation={`${rotate} 10s linear infinite`} />
        </Box>
        
        {/* Main headline with gaming effects */}
        <Heading
          fontSize={{ base: "4xl", md: "7xl" }}
          fontWeight="extrabold"
          letterSpacing="tight"
          color={headingColor}
          mb={2}
          zIndex={2}
          textShadow="0 0 30px rgba(163, 168, 255, 0.5)"
          animation={`${glow} 3s ease-in-out infinite`}
        >
          LEVEL UP
        </Heading>
        <Heading 
          fontSize={{ base: "2xl", md: "4xl" }}
          fontWeight="bold"
          mb={4}
          zIndex={2}
          textShadow="0 0 20px rgba(63, 224, 208, 0.5)"
        >
          Your <Text as="span" color={accentColor}>Coding Skills</Text>
        </Heading>
        <Text fontSize={{ base: "lg", md: "2xl" }} color={subTextColor} mb={8} zIndex={2}>
          Master programming through gamified learning. Unlock achievements, compete with friends, and become a coding legend.
        </Text>
        
        {/* Feature icons with gaming theme */}
        <HStack spacing={10} justify="center" mb={10} zIndex={2}>
          <HStack spacing={2} animation={`${float} 2s ease-in-out infinite`}>
            <Icon as={Users} color={accentColor} boxSize={6} />
            <Text fontSize="md" color={featureTextColor}>5K+ Learners</Text>
          </HStack>
          <HStack spacing={2} animation={`${float} 2s ease-in-out infinite`} animationDelay="0.5s">
            <Icon as={Trophy} color={trophyColor} boxSize={6} />
            <Text fontSize="md" color={featureTextColor}>500+ Courses</Text>
          </HStack>
          <HStack spacing={2} animation={`${float} 2s ease-in-out infinite`} animationDelay="1s">
            <Icon as={Zap} color={zapColor} boxSize={6} />
            <Text fontSize="md" color={featureTextColor}>Gamified Learning</Text>
          </HStack>
        </HStack>
        
        {/* CTA Buttons with gaming effects */}
        <HStack spacing={6} justify="center" mb={4} zIndex={2}>
          <Button 
            leftIcon={<Icon as={Sword} />}
            size="lg" 
            fontWeight="bold"
            px={8}
            py={6}
            fontSize="xl"
            bgGradient="linear(to-r, #7F7CFF, #3FE0D0)"
            color="white"
            _hover={{ bgGradient: "linear(to-r, #3FE0D0, #7F7CFF)", opacity: 0.9 }}
            shadow="xl"
            animation={`${glow} 2s ease-in-out infinite`}
            _active={{ transform: "scale(0.95)" }}
          >
            Start Your Journey
          </Button>
          <Button 
            leftIcon={<Icon as={Shield} />}
            size="lg" 
            fontWeight="bold"
            px={8}
            py={6}
            fontSize="xl"
            variant="outline" 
            borderColor="#3FE0D0"
            color="#3FE0D0"
            _hover={{ bg: "#232946", borderColor: "#7F7CFF", color: "#7F7CFF" }}
            shadow="xl"
            _active={{ transform: "scale(0.95)" }}
            onClick={() => navigate('/admin/courses')}
          >
            Explore Courses
          </Button>
        </HStack>
        
        {/* Resume Learning Card with gaming theme */}
        <Box
          mt={8}
          w={{ base: "100%", md: "600px" }}
          bg={resumeCardBg}
          borderRadius="2xl"
          p={6}
          boxShadow="2xl"
          display="flex"
          alignItems="center"
          zIndex={3}
          mx="auto"
          justifyContent="space-between"
          border="2px solid"
          borderColor="rgba(63, 224, 208, 0.3)"
          backdropFilter="blur(10px)"
          animation={`${float} 4s ease-in-out infinite`}
        >
          <Box>
            <Text fontWeight="bold" fontSize="lg" color={textColor}>
              Ready to Continue Your Journey?
            </Text>
            <Text color={subTextColor} fontSize="md">
              Pick up where you left off, warrior
            </Text>
          </Box>

          <Button
            size="lg"
            fontWeight="bold"
            px={6}
            py={4}
            fontSize="lg"
            bgGradient="linear(to-r, #7F7CFF, #3FE0D0)"
            color="white"
            _hover={{ bgGradient: "linear(to-r, #3FE0D0, #7F7CFF)", opacity: 0.9 }}
            shadow="xl"
            leftIcon={<Icon as={Gamepad2} />}
            _active={{ transform: "scale(0.95)" }}
          >
            Resume Learning
          </Button>
        </Box>
        
        {/* Live players indicator - gaming themed */}
        <Box
          position="absolute"
          left={8}
          bottom={8}
          bg={liveIndicatorBg}
          px={5}
          py={3}
          borderRadius="lg"
          display="flex"
          alignItems="center"
          zIndex={10}
          boxShadow="lg"
          border="1px solid"
          borderColor="rgba(63, 224, 208, 0.3)"
          backdropFilter="blur(10px)"
          animation={`${pulse} 2s ease-in-out infinite`}
        >
          <Box w={3} h={3} borderRadius="full" bg="green.400" mr={3} animation={`${pulse} 1s ease-in-out infinite`} />
          <Text fontSize="md" color={textColor}>Online: 2,847 players</Text>
        </Box>
      </Box>

      {/* Stats with gaming theme */}
      <Box px={8} py={12} maxW="7xl" mx="auto">
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={8}>
          <StatCard title="Quests Completed" value="12" subtitle="This month" icon={BookOpen} trend={{ value: "+3 from last month" }} bg="linear-gradient(135deg, #183b4a 60%, #16323a 100%)" borderColor="#19e3e3" iconColor="#19e3e3" />
          <StatCard title="Current Level" value="42" subtitle="Epic Coder" icon={Zap} trend={{ value: "+2 levels" }} bg="linear-gradient(135deg, #2a1a3c 60%, #1e1330 100%)" borderColor="#a259ff" iconColor="#a259ff" />
          <StatCard title="Total XP" value="15,420" subtitle="Experience points" icon={Target} trend={{ value: "+1,250 this week" }} bg="linear-gradient(135deg, #3a1a2a 60%, #2a1330 100%)" borderColor="#ff4ecd" iconColor="#ff4ecd" />
          <StatCard title="Global Rank" value="#47" subtitle="Leaderboard" icon={Trophy} trend={{ value: "+15 positions" }} bg="linear-gradient(135deg, #1a3c2a 60%, #13301e 100%)" borderColor="#19e37d" iconColor="#19e37d" />
        </Grid>
      </Box>

      {/* Courses with gaming theme */}
      <Box px={8} py={12}>
        <Flex justify="space-between" align="center" mb={8}>
          <Box>
            <Heading size="lg">Featured <Text as="span" bgGradient="linear(to-r, pink.400, purple.400)" bgClip="text">Quests</Text></Heading>
            <Text color={sectionTextColor}>Level up with our most epic programming challenges</Text>
          </Box>
          <Button rightIcon={<ChevronRight />} colorScheme="pink" variant="outline" borderColor={buttonBorderColor} color={buttonBorderColor} fontWeight="bold" _hover={{ bg: buttonHoverBg, borderColor: buttonHoverBorder, color: buttonHoverText }}>View All Quests</Button>
        </Flex>
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={8}>
          <CourseCard
            title="Web Warrior Quest"
            description="Embark on an epic journey to master HTML, CSS, and JavaScript. Build legendary websites and unlock the power of modern web development."
            image={courseJavaScript}
            difficulty="Beginner"
            duration="40 hours"
            students={15420}
            rating={4.8}
            xpReward={2500}
            tags={["HTML", "CSS", "JavaScript", "Epic"]}
            progress={65}
            actionLabel="Continue Quest"
            actionType="continue"
          />
          <CourseCard
            title="React Champion Challenge"
            description="Become a React master! Learn hooks, state management, and build stunning user interfaces that will amaze your audience."
            image={courseReact}
            difficulty="Intermediate"
            duration="35 hours"
            students={12890}
            rating={4.9}
            xpReward={3000}
            tags={["React", "Hooks", "Redux", "Legendary"]}
            actionLabel="Start Quest"
            actionType="start"
          />
          <CourseCard
            title="Data Sage Mastery"
            description="Unlock the secrets of data science with Python. Master pandas, numpy, and become a legendary data analyst."
            image={coursePython}
            difficulty="Advanced"
            duration="50 hours"
            students={8750}
            rating={4.7}
            xpReward={4000}
            tags={["Python", "Data Science", "ML", "Mythic"]}
            isLocked
            actionLabel="Unlock Required"
            actionType="locked"
          />
        </Grid>
      </Box>

      {/* Learning Paths Section with gaming theme */}
      <Card mb="20px" p="30px" bg="rgba(24, 28, 47, 0.8)" border="2px solid" borderColor="rgba(63, 224, 208, 0.2)" backdropFilter="blur(10px)">
        <Flex justify="space-between" align="center" mb="30px">
          <Heading as="h2" size="lg" color={textColor}>
            Adventure Paths
          </Heading>
          <Button variant="ghost" colorScheme="brand" rightIcon={<MdArrowForward />}>
            View All Paths
          </Button>
        </Flex>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="20px">
          {[
            {
              title: "Web Warrior",
              description: "Master HTML, CSS, JavaScript, and modern frameworks to build responsive and dynamic websites.",
              courses: 8,
              duration: "6 months",
              icon: FiCode,
              path: "/admin/adventure-path"
            },
            {
              title: "Data Sage",
              description: "Learn data analysis, visualization, machine learning, and AI to extract insights from complex datasets.",
              courses: 10,
              duration: "8 months",
              icon: FiTrendingUp,
              path: null
            },
            {
              title: "Full Stack Champion",
              description: "Become proficient in both frontend and backend technologies to build complete web applications.",
              courses: 12,
              duration: "10 months",
              icon: FiLayers,
              path: null
            }
          ].map((path, index) => (
            <Card key={index} p="25px" variant="outline" bg="rgba(35, 41, 70, 0.6)" borderColor="rgba(63, 224, 208, 0.3)" backdropFilter="blur(10px)" animation={`${float} ${3 + index * 0.5}s ease-in-out infinite`}>
              <VStack spacing="20px" align="start">
                <Icon as={path.icon} w={10} h={10} color={accentColor} animation={`${glow} 2s ease-in-out infinite`} />
                <Heading as="h3" size="md" color={textColor}>
                  {path.title}
                </Heading>
                <Text color={textColor} opacity="0.8">
                  {path.description}
                </Text>
                <HStack>
                  <Text fontSize="sm" fontWeight="bold" color={accentColor}>
                    {path.courses} Quests
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    • {path.duration}
                  </Text>
                </HStack>
                <Button 
                  variant="ghost" 
                  colorScheme="brand" 
                  rightIcon={<MdArrowForward />}
                  alignSelf="flex-start"
                  onClick={() => path.path && navigate(path.path)}
                  cursor={path.path ? "pointer" : "not-allowed"}
                  opacity={path.path ? 1 : 0.6}
                >
                  Begin Adventure
                </Button>
              </VStack>
            </Card>
          ))}
        </SimpleGrid>
      </Card>

      {/* Latest Achievements Section with gaming theme */}
      <Box px={8} py={12}>
        <Flex justify="space-between" align="center" mb={8}>
          <Box>
            <Heading size="lg" color={textColor}>
              Latest <Text as="span" bgGradient="linear(to-r, #a259ff, #ff4ecd)" bgClip="text" color="transparent">Achievements</Text>
            </Heading>
            <Text color={sectionTextColor}>Track your progress and unlock epic rewards</Text>
          </Box>
          <Button variant="ghost" colorScheme="brand" rightIcon={<MdArrowForward />}>
            View All Achievements
          </Button>
        </Flex>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
          <AchievementCard
            title="First Steps"
            description="Complete your first coding quest"
            icon={Award}
            progress={1}
            maxProgress={1}
            xpReward={100}
            rarity="Common"
            isUnlocked={true}
            date="Unlocked"
          />
          
          <AchievementCard
            title="Code Warrior"
            description="Complete 10 coding challenges"
            icon={Flame}
            progress={7}
            maxProgress={10}
            xpReward={500}
            rarity="Rare"
            isUnlocked={false}
            date="In Progress"
          />
          
          <AchievementCard
            title="Knowledge Seeker"
            description="Watch 100 hours of content"
            icon={Clock}
            progress={75}
            maxProgress={100}
            xpReward={1000}
            rarity="Epic"
            isUnlocked={false}
            date="In Progress"
          />
          
          <AchievementCard
            title="Master Coder"
            description="Reach level 50"
            icon={Star}
            progress={42}
            maxProgress={50}
            xpReward={2500}
            rarity="Legendary"
            isUnlocked={false}
            date="In Progress"
          />
        </SimpleGrid>
      </Box>

      {/* API Test Section - Temporary for debugging */}
      <Box px={8} py={6}>
        <ApiTest />
      </Box>

      
    </Box>
  );
}