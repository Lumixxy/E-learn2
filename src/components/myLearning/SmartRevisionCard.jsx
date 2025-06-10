import React from "react";
import { Box, Text, Flex, Button, VStack, useColorModeValue } from "@chakra-ui/react";
import Card from "../card/Card";

const revisions = [
  { title: "CSS Grid Layout", status: "Due today", color: "red.400" },
  { title: "API Integration", status: "Last revised 5 days ago", color: "orange.400" },
];

const SmartRevisionCard = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const textColorSecondary = useColorModeValue("gray.500", "whiteAlpha.700");
  const cardItemBg = useColorModeValue("gray.50", "navy.700");
  const hoverBg = useColorModeValue("gray.100", "navy.600");

  return (
    <Card>
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontWeight="bold" fontSize="lg" color={textColor}>Smart Revision</Text>
        <Text fontSize="sm" color={textColorSecondary}>Today 1/3</Text>
      </Flex>
      <VStack spacing={3} align="stretch">
        {revisions.map((rev, idx) => (
          <Flex 
            key={idx} 
            p={3} 
            bg={cardItemBg} 
            borderRadius="md" 
            align="center" 
            justify="space-between"
            _hover={{
              bg: hoverBg,
              transform: "translateY(-2px)",
              boxShadow: "md",
              transition: "all 0.2s"
            }}
            cursor="pointer"
          >
            <Box>
              <Text fontWeight="semibold" color={textColor}>{rev.title}</Text>
              <Text fontSize="xs" color={rev.color}>{rev.status}</Text>
            </Box>
            <Button size="sm" colorScheme="blue" variant="outline">Quick Review</Button>
          </Flex>
        ))}
      </VStack>
      <Button mt={4} w="full" colorScheme="gray" variant="ghost" color={textColorSecondary} _hover={{ bg: hoverBg }}>View All Revisions</Button>
    </Card>
  );
};

export default SmartRevisionCard; 