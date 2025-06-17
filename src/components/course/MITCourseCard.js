import React from "react";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaBook, FaFileAlt, FaTasks } from "react-icons/fa";

const MITCourseCard = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const cardBg = useColorModeValue("white", "navy.800");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const courseSections = [
    {
      title: "Syllabus",
      description: "Course overview, objectives, and schedule",
      icon: FaFileAlt,
      path: "/mit-course/syllabus",
    },
    {
      title: "Readings",
      description: "Required and recommended course materials",
      icon: FaBook,
      path: "/mit-course/readings",
    },
    {
      title: "Assignments",
      description: "Course assignments and projects",
      icon: FaTasks,
      path: "/mit-course/assignments",
    },
  ];

  return (
    <Card
      bg={cardBg}
      borderRadius="20px"
      borderColor={borderColor}
      borderWidth="1px"
      p="20px"
      w="100%"
      maxW="800px"
      mx="auto"
    >
      <CardHeader>
        <Heading size="lg" color={textColor}>
          MIT Course Content
        </Heading>
        <Text color="gray.500" mt="2">
          Access course materials and resources
        </Text>
      </CardHeader>
      <CardBody>
        <VStack spacing="4" align="stretch">
          {courseSections.map((section, index) => (
            <Box
              key={index}
              p="4"
              borderWidth="1px"
              borderRadius="lg"
              borderColor={borderColor}
              _hover={{ shadow: "md" }}
              transition="all 0.3s"
            >
              <HStack spacing="4">
                <Icon
                  as={section.icon}
                  w="6"
                  h="6"
                  color="blue.500"
                />
                <Box flex="1">
                  <Heading size="md" color={textColor}>
                    {section.title}
                  </Heading>
                  <Text color="gray.500" mt="1">
                    {section.description}
                  </Text>
                </Box>
                <Button
                  as={RouterLink}
                  to={section.path}
                  colorScheme="blue"
                  variant="outline"
                >
                  View
                </Button>
              </HStack>
            </Box>
          ))}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default MITCourseCard; 