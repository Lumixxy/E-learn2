import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  IconButton,
  Icon,
  Flex,
  Avatar,
  useColorModeValue,
  Divider,
  Spinner,
} from '@chakra-ui/react';
import { Send, Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';

// Create a motion component for animations
const MotionBox = motion(Box);

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI learning assistant. How can I help you explore a new topic today?",
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // --- Color Palette for Light/Dark Mode ---
  // The background color is kept for the chat area's readability.
  const chatAreaBg = useColorModeValue("white", "gray.800"); 
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const mutedColor = useColorModeValue("gray.500", "gray.400");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const placeholderColor = useColorModeValue("gray.400", "gray.500");
  const aiMessageBg = useColorModeValue("purple.500", "purple.500");
  const userMessageBg = useColorModeValue("gray.100", "gray.700");
  const onlineColor = "green.400";
  const focusBorderColor = "purple.400";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    setTimeout(() => {
      const aiResponses = [
        "That's a great question! Let me help you with that.",
        "I understand what you're asking. Here's what I can tell you...",
        "Based on your question, I'd recommend checking out our course on that topic.",
      ];
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      const aiMessage = {
        id: Date.now() + 1,
        text: randomResponse,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    // --- MODIFICATION ---
    // The outer Box styling (shadow, border, borderRadius, maxW, maxH) has been removed.
    // It now acts as a flexible container that fills its parent.
    <Box 
      w="100%" 
      h="100%" 
      display="flex" 
      flexDirection="column" 
      bg={chatAreaBg}
    >
      {/* Header */}
      <Flex align="center" p={4} borderBottom="1px solid" borderColor={borderColor}>
        <Avatar size="md" bg="purple.500" icon={<Bot size={20} color="white" />} />
        <Box ml={3} flex={1}>
          <Text fontWeight="bold" fontSize="lg" color={textColor}>
            AI Learning Assistant
          </Text>
          <HStack spacing={1.5} align="center">
            <Box w="8px" h="8px" bg={onlineColor} borderRadius="full" />
            <Text fontSize="sm" color={mutedColor} fontWeight="medium">
              Online
            </Text>
          </HStack>
        </Box>
      </Flex>

      {/* Messages */}
      <Box flex={1} p={4} overflowY="auto">
        <VStack spacing={4} align="stretch">
          {messages.map((message) => (
            <MotionBox
              key={message.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Flex 
                justify={message.sender === 'user' ? 'flex-end' : 'flex-start'}
              >
                <HStack 
                  spacing={3} 
                  align="flex-end" 
                  flexDirection={message.sender === 'user' ? 'row-reverse' : 'row'}
                >
                  <Avatar size="sm" bg={message.sender === 'ai' ? 'purple.500' : 'gray.400'} icon={
                    message.sender === 'ai' 
                    ? <Bot size={18} color="white" /> 
                    : <User size={18} color="white" />
                  } />
                  <Box
                    bg={message.sender === 'ai' ? aiMessageBg : userMessageBg}
                    color={message.sender === 'ai' ? 'white' : textColor}
                    px={4}
                    py={3}
                    borderRadius="xl"
                    maxW="80%"
                  >
                    <Text fontSize="md">
                      {message.text}
                    </Text>
                    <Text 
                      fontSize="xs" 
                      color={message.sender === 'ai' ? 'whiteAlpha.700' : mutedColor} 
                      mt={2}
                      textAlign="right"
                    >
                      {formatTime(message.timestamp)}
                    </Text>
                  </Box>
                </HStack>
              </Flex>
            </MotionBox>
          ))}
          
          {isLoading && (
            <MotionBox
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <HStack spacing={3} align="flex-start">
                <Avatar size="sm" bg="purple.500" icon={<Bot size={18} color="white" />} />
                <Box bg={aiMessageBg} color="white" px={4} py={3} borderRadius="xl">
                  <HStack spacing={2}>
                    <Spinner size="sm" />
                    <Text fontSize="md">Typing...</Text>
                  </HStack>
                </Box>
              </HStack>
            </MotionBox>
          )}
          
          <div ref={messagesEndRef} />
        </VStack>
      </Box>

      <Divider borderColor={borderColor} />

      {/* Input */}
      <Box p={4}>
        <HStack spacing={3}>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            bg={useColorModeValue("gray.50", "gray.700")}
            borderColor={borderColor}
            color={textColor}
            _focus={{ borderColor: focusBorderColor, boxShadow: `0 0 0 1px ${focusBorderColor}` }}
            _placeholder={{ color: placeholderColor }}
            disabled={isLoading}
            borderRadius="lg"
            size="lg"
          />
          <IconButton
            aria-label="Send message"
            icon={<Icon as={Send} />}
            size="lg"
            isRound
            onClick={handleSendMessage}
            colorScheme="purple"
            isDisabled={!inputValue.trim() || isLoading}
            isLoading={isLoading}
            _hover={{ bg: 'purple.600' }}
          />
        </HStack>
      </Box>
    </Box>
  );
};

export default AIAssistant;