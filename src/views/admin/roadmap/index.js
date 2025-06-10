import React from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Roadmap() {
  const bg = useColorModeValue("#f7fafd", "gray.900");
  const textColor = useColorModeValue("gray.800", "white");

  return (
    <Box minH="100vh" bg={bg} px={{ base: 2, md: 8 }} py={6} fontFamily="'Inter', 'Poppins', sans-serif">
      <VStack spacing={2} mb={8}>
        <Text fontSize={{ base: "3xl", md: "5xl" }} fontWeight="bold" color={textColor} textAlign="center">
          Learning Roadmap
        </Text>
        <Text fontSize="lg" color="gray.500" textAlign="center">
          Your personalized learning journey
        </Text>
      </VStack>
      
      {/* Roadmap content will go here */}
      <Box maxW="1200px" mx="auto">
        <Flex direction="column" gap={8}>
          {/* Placeholder for roadmap content */}
          <Text color={textColor} fontSize="lg">
            Your learning roadmap will be displayed here.
          </Text>
        </Flex>
      </Box>
    </Box>
  );
} 
