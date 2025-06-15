import React from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";

export default function Banner() {
  const textColor = useColorModeValue("white", "white");
  const bgGradient = "linear(to-r, purple.600, purple.400)";

  const scrollToTrending = () => {
    const element = document.getElementById('trending');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box
      bgGradient={bgGradient}
      borderRadius="20px"
      p="30px"
      mb="20px"
      position="relative"
      overflow="hidden"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
      >
        <Box maxW={{ base: "100%", md: "60%" }}>
          <Text
            color={textColor}
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="bold"
            mb="15px"
          >
            🎓 Summer Sale is here!
          </Text>
          <Text
            color={textColor}
            fontSize={{ base: "md", md: "lg" }}
            mb="20px"
            opacity={0.9}
          >
            Get up to 70% off on selected courses. Limited time offer!
          </Text>
          <Button
            onClick={scrollToTrending}
            bg="white"
            color="purple.600"
            _hover={{ bg: "whiteAlpha.900" }}
            size="lg"
            fontWeight="bold"
          >
            Browse Deals
          </Button>
        </Box>
        <Box
          display={{ base: "none", md: "block" }}
          position="absolute"
          right="30px"
          top="50%"
          transform="translateY(-50%)"
        >
          <Image
            src="/images/graduation-cap.png"
            alt="Graduation Cap"
            w="200px"
            h="200px"
            objectFit="contain"
          />
        </Box>
      </Flex>
    </Box>
  );
}
