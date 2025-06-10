import React from "react";
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
} from "@chakra-ui/react";

export const FAQAccordion = () => {
  const faqItems = [
    {
      question: "What is E-Learn?",
      answer: "E-Learn is a comprehensive online learning platform that offers a wide range of courses across various subjects. Our platform is designed to provide high-quality education accessible to everyone, anywhere, and anytime."
    },
    {
      question: "How do I get started with a course?",
      answer: "Getting started is easy! Simply browse our course catalog, select a course that interests you, and click 'Enroll Now'. You'll have immediate access to the course content and can start learning right away."
    },
    {
      question: "Can I get a certificate after completing a course?",
      answer: "Yes! Upon successful completion of a course, you'll receive a certificate of completion. This certificate can be downloaded and shared on your professional profiles like LinkedIn."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including credit/debit cards, PayPal, and other major payment gateways. All transactions are secure and encrypted for your safety."
    },
    {
      question: "Can I access courses on mobile devices?",
      answer: "Absolutely! Our platform is fully responsive and works seamlessly on all devices including smartphones, tablets, and computers. You can learn on the go with our mobile-friendly interface."
    }
  ];

  // Dark mode colors
  const bgColor = useColorModeValue("white", "navy.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBg = useColorModeValue("gray.50", "navy.700");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const headingColor = useColorModeValue("gray.800", "white");
  const iconColor = useColorModeValue("blue.500", "blue.300");

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