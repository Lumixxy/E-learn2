import React from "react";
import { Text, VStack, HStack, Badge, useColorModeValue } from "@chakra-ui/react";
import Card from "../card/Card";

const modules = [
  { name: "HTML & CSS Fundamentals", status: "required", color: "green" },
  { name: "JavaScript Basics", status: "required", color: "green" },
  { name: "Responsive Design", status: "required", color: "green" },
  { name: "React.js Core Concepts", status: "recommended", color: "blue" },
  { name: "Node.js & Express", status: "optional", color: "yellow" },
];

const LearningPathCard = () => {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Card>
      <Text fontWeight="bold" fontSize="lg" mb={3} color={textColor}>Your Learning Path</Text>
      <VStack align="stretch" spacing={2}>
        {modules.map((mod, idx) => (
          <HStack key={idx} justify="space-between">
            <Text color={textColor}>{mod.name}</Text>
            <Badge colorScheme={mod.color}>{mod.status}</Badge>
          </HStack>
        ))}
      </VStack>
    </Card>
  );
};

export default LearningPathCard; 