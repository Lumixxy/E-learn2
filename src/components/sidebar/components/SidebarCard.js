import {
  Button,
  Flex,
  Image,
  Link,
  Text,
  useColorModeValue,
  Avatar,
  Box,
  VStack,
  HStack,
  Progress,
  Divider,
  Icon,
  Badge,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { FaCrown, FaMedal, FaTrophy } from "react-icons/fa";
import { MdPerson, MdLeaderboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function SidebarDocs() {
  const navigate = useNavigate();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [userData, setUserData] = useState({
    name: "Adela Parkson",
    avatar: "https://i.pravatar.cc/150?img=4",
    level: "Intermediate",
    points: 1850,
    progress: 65,
  });

  // Colors
  const bgColor = "linear-gradient(135deg, #868CFF 0%, #4318FF 100%)";
  const borderColor = useColorModeValue("white", "navy.800");
  const textColor = useColorModeValue("gray.700", "white");
  const mutedColor = useColorModeValue("gray.500", "gray.400");
  const cardBg = useColorModeValue("white", "navy.700");
  const highlightColor = useColorModeValue("brand.500", "brand.400");

  // Fetch leaderboard data
  useEffect(() => {
    fetch('/data/leaderboard_data.json')
      .then(response => response.json())
      .then(data => {
        setLeaderboardData(data.leaderboardData.slice(0, 3));
      })
      .catch(error => console.error('Error loading leaderboard data:', error));
  }, []);

  return (
    <Flex
      justify='center'
      direction='column'
      align='center'
      borderRadius='30px'
      position='relative'
      w="100%"
      overflow="hidden"
    >
      {/* Profile Mini Component */}
      <Box 
        w="100%" 
        bg={cardBg} 
        borderRadius="xl" 
        p={4} 
        mb={4} 
        boxShadow="sm"
        onClick={() => navigate('/admin/profile')}
        cursor="pointer"
        _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
        transition="all 0.2s"
      >
        <HStack spacing={3} align="center">
          <Avatar src={userData.avatar} size="md" />
          <VStack align="start" spacing={0}>
            <Text fontWeight="bold" fontSize="sm" color={textColor}>{userData.name}</Text>
            <HStack>
              <Badge colorScheme="purple" fontSize="xs">{userData.level}</Badge>
              <Text fontSize="xs" color={mutedColor}>{userData.points} XP</Text>
            </HStack>
          </VStack>
        </HStack>
        <Box mt={3}>
          <Flex justify="space-between" mb={1}>
            <Text fontSize="xs" color={mutedColor}>Level Progress</Text>
            <Text fontSize="xs" color={highlightColor}>{userData.progress}%</Text>
          </Flex>
          <Progress 
            value={userData.progress} 
            size="xs" 
            colorScheme="purple" 
            borderRadius="full" 
            bgColor={useColorModeValue("gray.100", "whiteAlpha.100")}
          />
        </Box>
      </Box>

      {/* Leaderboard Mini Component */}
      <Box 
        w="100%" 
        bg={cardBg} 
        borderRadius="xl" 
        p={4} 
        boxShadow="sm"
        onClick={() => navigate('/admin/leaderboard')}
        cursor="pointer"
        _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
        transition="all 0.2s"
      >
        <HStack justify="space-between" mb={3}>
          <HStack>
            <Icon as={MdLeaderboard} color={highlightColor} />
            <Text fontWeight="bold" fontSize="sm" color={textColor}>Leaderboard</Text>
          </HStack>
          <Button size="xs" colorScheme="purple" variant="ghost" onClick={(e) => {
            e.stopPropagation();
            navigate('/admin/leaderboard');
          }}>View All</Button>
        </HStack>

        <VStack spacing={2} align="stretch">
          {leaderboardData.map((user, index) => (
            <HStack key={user.id} spacing={3} p={2} borderRadius="md" bg={useColorModeValue("gray.50", "whiteAlpha.50")}>
              <Box position="relative" minW="24px" textAlign="center">
                {index === 0 ? (
                  <Icon as={FaCrown} color="yellow.400" boxSize={5} />
                ) : index === 1 ? (
                  <Icon as={FaMedal} color="gray.400" boxSize={4} />
                ) : (
                  <Icon as={FaTrophy} color="orange.400" boxSize={4} />
                )}
              </Box>
              <Avatar src={user.avatar} size="xs" />
              <Text fontSize="xs" fontWeight="medium" color={textColor} noOfLines={1}>{user.name}</Text>
              <Text fontSize="xs" color={highlightColor} fontWeight="bold" ml="auto">{user.points}</Text>
            </HStack>
          ))}
        </VStack>
      </Box>
    </Flex>
  );
}
