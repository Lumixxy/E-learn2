import React, { useState, useEffect } from "react";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Container,
  Heading,
  useColorModeValue,
  Spinner,
  Center,
} from "@chakra-ui/react";

export const FAQAccordion = () => {
  const [faqItems, setFaqItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dark mode colors
  const bgColor = useColorModeValue("white", "navy.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBg = useColorModeValue("gray.50", "navy.700");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const headingColor = useColorModeValue("gray.800", "white");
  const iconColor = useColorModeValue("blue.500", "blue.300");

  // Fetch FAQ data from JSON file (simulating API call)
  useEffect(() => {
    const fetchFAQData = async () => {
      try {
        setLoading(true);
        // Simulate API call with a small delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const response = await fetch('/data/faq.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch FAQ data: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        setFaqItems(data);
      } catch (err) {
        console.error('Error fetching FAQ data:', err);
        setError(`Error loading FAQ data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQData();
  }, []);

  if (loading) {
    return (
      <Container maxW="container.xl" py={16}>
        <Center>
          <Spinner size="xl" color={iconColor} />
        </Center>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={16}>
        <Center>
          <Text color="red.500">Error loading FAQ data: {error}</Text>
        </Center>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={16}>
      <Box textAlign="center" mb={10}>
        <Heading
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="bold"
          mb={4}
          color={headingColor}
        >
          Frequently Asked Questions
        </Heading>
        <Text color={textColor} fontSize={{ base: "md", md: "lg" }}>
          Find answers to common questions about our platform
        </Text>
      </Box>

      <Accordion allowMultiple>
        {faqItems.map((item, index) => (
          <AccordionItem 
            key={index} 
            border="1px solid" 
            borderColor={borderColor} 
            mb={4} 
            borderRadius="md"
            overflow="hidden"
          >
            <h2>
              <AccordionButton
                py={4}
                px={6}
                bg={bgColor}
                _hover={{ bg: hoverBg }}
                _expanded={{ 
                  bg: bgColor,
                  borderBottom: "1px solid",
                  borderColor: borderColor
                }}
              >
                <Box 
                  flex="1" 
                  textAlign="left" 
                  fontWeight="medium"
                  fontSize="lg"
                  color={headingColor}
                >
                  {item.question}
                </Box>
                <AccordionIcon 
                  color={iconColor}
                  transform="rotate(0deg)"
                  transition="transform 0.2s"
                  _expanded={{ transform: "rotate(180deg)" }}
                />
              </AccordionButton>
            </h2>
            <AccordionPanel 
              pb={6} 
              px={6}
              bg={bgColor}
            >
              <Text color={textColor} fontSize="md">
                {item.answer}
              </Text>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  );
};

export default FAQAccordion;