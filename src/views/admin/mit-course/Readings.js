import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  Link,
  List,
  ListItem,
  ListIcon,
  HStack,
} from "@chakra-ui/react";
import { FaBook, FaExternalLinkAlt } from "react-icons/fa";

const Readings = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const bgColor = useColorModeValue("white", "navy.800");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");

  const readings = [
    {
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      description: "A comprehensive guide to understanding algorithms and their implementation",
      link: "https://mitpress.mit.edu/books/introduction-algorithms-third-edition",
    },
    {
      title: "Structure and Interpretation of Computer Programs",
      author: "Harold Abelson and Gerald Jay Sussman",
      description: "Classic textbook on computer programming concepts",
      link: "https://mitpress.mit.edu/sites/default/files/sicp/index.html",
    },
    {
      title: "Clean Code",
      author: "Robert C. Martin",
      description: "A handbook of agile software craftsmanship",
      link: "https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882",
    },
    {
      title: "Design Patterns",
      author: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
      description: "Elements of Reusable Object-Oriented Software",
      link: "https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612",
    },
  ];

  return (
    <Container maxW="container.xl" py={8}>
      <Box bg={bgColor} p={8} borderRadius="xl" boxShadow="lg">
        <VStack spacing={6} align="stretch">
          <Heading color={textColor} size="xl">
            Course Readings
          </Heading>
          <Text color={textColor} fontSize="lg">
            Required and recommended readings for the course. These materials will help you
            understand the concepts covered in lectures and prepare for assignments.
          </Text>

          <List spacing={4}>
            {readings.map((reading, index) => (
              <ListItem key={index}>
                <Box
                  p={4}
                  borderWidth="1px"
                  borderRadius="lg"
                  borderColor={borderColor}
                  _hover={{ shadow: "md" }}
                >
                  <VStack align="stretch" spacing={2}>
                    <HStack>
                      <ListIcon as={FaBook} color="blue.500" />
                      <Heading size="md" color={textColor}>
                        {reading.title}
                      </Heading>
                    </HStack>
                    <Text color={textColor} fontWeight="medium">
                      by {reading.author}
                    </Text>
                    <Text color={textColor}>{reading.description}</Text>
                    <Link
                      href={reading.link}
                      isExternal
                      color="blue.500"
                      display="flex"
                      alignItems="center"
                      gap={2}
                    >
                      Access Reading <FaExternalLinkAlt />
                    </Link>
                  </VStack>
                </Box>
              </ListItem>
            ))}
          </List>

          <Box mt={8}>
            <Heading color={textColor} size="md" mb={4}>
              Additional Resources
            </Heading>
            <Text color={textColor}>
              Additional reading materials and resources will be provided throughout the course
              as needed. Make sure to check the course announcements regularly for updates.
            </Text>
          </Box>
        </VStack>
      </Box>
    </Container>
  );
};

export default Readings; 