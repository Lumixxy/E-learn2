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
} from "@chakra-ui/react";
import { FaCrown, FaMedal } from "react-icons/fa";

const leaderboardData = {
  month: [
    {
      id: 1,
      name: "Emma Chen",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      points: 2847,
      level: "Expert",
      levelColor: "purple.300",
    },
    {
      id: 2,
      name: "Marcus Johnson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      points: 2634,
      level: "Advanced",
      levelColor: "blue.300",
    },
    {
      id: 3,
      name: "Sofia Rodriguez",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      points: 2521,
      level: "Advanced",
      levelColor: "blue.300",
    },
    {
      id: 4,
      name: "Alex Thompson",
      avatar: "https://randomuser.me/api/portraits/men/12.jpg",
      points: 2398,
      level: "Intermediate",
      levelColor: "green.300",
    },
    {
      id: 5,
      name: "Priya Patel",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      points: 2310,
      level: "Intermediate",
      levelColor: "green.300",
    },
    {
      id: 6,
      name: "Liam Smith",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      points: 2250,
      level: "Beginner",
      levelColor: "gray.300",
    },
  ],
};

const podiumColors = [
  "linear(to-b, yellow.200, yellow.400)", // Gold
  "linear(to-b, gray.200, gray.400)",    // Silver
  "linear(to-b, orange.200, orange.400)",// Bronze
];

const crownColors = ["yellow.400", "gray.400", "orange.400"];

export default function Leaderboard() {
  const [filter, setFilter] = useState("month");
  const bg = useColorModeValue("#f7fafd", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");

  const textColor = useColorModeValue("gray.800", "white");

  const data = leaderboardData[filter];
  const podium = [data[1], data[0], data[2]]; // 2nd, 1st, 3rd for podium layout
  const others = data.slice(3);

  return (
    <Box minH="100vh" bg={bg} px={{ base: 2, md: 8 }} py={6} fontFamily="'Inter', 'Poppins', sans-serif">
      <VStack spacing={2} mb={8}>
        <Text fontSize={{ base: "3xl", md: "5xl" }} fontWeight="bold" color={textColor} textAlign="center">
          Leaderboard
        </Text>
        <Text fontSize="lg" color="gray.500" textAlign="center">
          Top performers this week
        </Text>
      </VStack>
      <Flex align="center" mb={8} gap={4}>
        <HStack spacing={2}>
          <Box as="span" color="gray.400" fontSize="lg">
            <svg width="20" height="20" fill="none"><path d="M7 2v2M13 2v2M3.5 7h13M5 18h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Box>
          <Text color="gray.500" fontWeight="medium">Filter by:</Text>
        </HStack>
        <Select value={filter} onChange={e => setFilter(e.target.value)} maxW="200px" bg={cardBg} borderRadius="md">
          <option value="month">This Month</option>
          <option value="week">This Week</option>
          <option value="all">All Time</option>
        </Select>
      </Flex>
      {/* Podium */}
      <Flex justify="center" align="end" gap={{ base: 2, md: 8 }} mb={12} wrap="wrap">
        {podium.map((user, idx) => (
          <VStack
            key={user.id}
            spacing={2}
            align="center"
            zIndex={idx === 1 ? 2 : 1}
            mt={idx === 1 ? 0 : { base: 4, md: 8 }}
            mb={idx === 1 ? 0 : { base: 0, md: 4 }}
            w={{ base: "32vw", md: idx === 1 ? "180px" : "140px" }}
            maxW={idx === 1 ? "180px" : "140px"}
          >
            <Box
              borderRadius="full"
              borderWidth={idx === 1 ? "6px" : "4px"}
              borderColor={crownColors[idx]}
              bgGradient={podiumColors[idx]}
              boxShadow={idx === 1 ? "0 8px 32px 0 rgba(255, 193, 7, 0.15)" : "md"}
              p={idx === 1 ? 2 : 1}
              position="relative"
            >
              <Avatar
                size={idx === 1 ? "2xl" : "xl"}
                src={user.avatar}
                name={user.name}
                borderWidth="4px"
                borderColor={cardBg}
                boxShadow="lg"
              />
              <Box position="absolute" top={-3} right={-3} bg={cardBg} borderRadius="full" p={1} boxShadow="sm">
                {idx === 1 ? (
                  <FaCrown color={crownColors[idx]} size={22} />
                ) : (
                  <FaMedal color={crownColors[idx]} size={20} />
                )}
              </Box>
            </Box>
            <Text
              fontWeight="semibold"
              fontSize={idx === 1 ? "lg" : "md"}
              color={textColor}
              mt={idx === 1 ? 4 : 2}
            >
              {user.name}
            </Text>
            <Badge colorScheme={user.level === "Expert" ? "purple" : user.level === "Advanced" ? "blue" : "green"} variant="subtle" fontSize="sm" borderRadius="md">
              {user.level}
            </Badge>
            <Text fontWeight="bold" fontSize={idx === 1 ? "2xl" : "xl"} color={textColor}>
              {user.points.toLocaleString()}
            </Text>
            <Text color="gray.400" fontSize="sm" mb={2}>
              points
            </Text>
          </VStack>
        ))}
      </Flex>
      {/* Other Rankings */}
      <Box maxW="900px" mx="auto">
        <Text fontSize="2xl" fontWeight="semibold" mb={4} color={textColor}>
          Other Rankings
        </Text>
        <VStack spacing={4} align="stretch">
          {others.map((user, idx) => (
            <Flex
              key={user.id}
              align="center"
              bg={cardBg}
              borderRadius="xl"
              boxShadow="sm"
              p={4}
              justify="space-between"
              gap={4}
              _hover={{ boxShadow: "md", transform: "translateY(-2px)", transition: "all 0.2s" }}
            >
              <HStack spacing={4}>
                <Box fontWeight="bold" color="gray.400" fontSize="xl" minW="40px">
                  #{idx + 4}
                </Box>
                <Avatar src={user.avatar} name={user.name} size="md" />
                <Box>
                  <Text fontWeight="semibold" color={textColor} fontSize="lg">
                    {user.name}
                  </Text>
                  <HStack spacing={2} mt={1}>
                    <Badge colorScheme={user.level === "Expert" ? "purple" : user.level === "Advanced" ? "blue" : "green"} variant="subtle" fontSize="sm" borderRadius="md">
                      {user.level}
                    </Badge>
                    <Text color="gray.400" fontSize="sm">
                      Level {idx + 4 + 5}
                    </Text>
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
          ))}
        </VStack>
      </Box>
    </Box>
  );
}
