import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Image,
  Badge,
  Icon,
  useColorModeValue,
  Tooltip,
  useToast
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {
  FiStar,
  FiClock,
  FiPlay,
  FiBook,
  FiUser,
  FiTrendingUp,
  FiAward
} from 'react-icons/fi';

const ModernCourseCard = ({ 
  course, 
  onEnroll, 
  showPricing = true,
  showSkillTag = false 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  
  // Color mode values
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedTextColor = useColorModeValue('gray.600', 'gray.400');
  const hoverBorderColor = useColorModeValue('blue.300', 'blue.400');
  const shadowColor = useColorModeValue('rgba(0, 0, 0, 0.1)', 'rgba(255, 255, 255, 0.1)');
  const gradientBg = useColorModeValue(
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)'
  );
  
  // Default image fallback
  const defaultImage = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop";
  
  // Handle enrollment
  const handleEnroll = (e) => {
    e.stopPropagation();
    
    console.log('Enroll button clicked for course:', course.id);
    
    if (onEnroll) {
      onEnroll(course);
    } else {
      // Default enrollment behavior - navigate directly to enrollment page
      console.log('Navigating to:', `/admin/courses/${course.id}/enroll`);
      navigate(`/admin/courses/${course.id}/enroll`);
    }
    
    toast({
      title: "Course enrollment",
      description: `Starting enrollment for ${course.title}`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };
  
  // Handle card click - navigate to course roadmap for learning flow
  const handleCardClick = () => {
    navigate(`/admin/courses/${course.id}/roadmap`);
  };
  
  // Format duration
  const formatDuration = (duration) => {
    if (!duration) return 'N/A';
    if (typeof duration === 'string') return duration;
    return `${duration} weeks`;
  };
  
  // Format lectures count
  const formatLectures = (modules) => {
    if (!modules || !Array.isArray(modules)) return 'N/A';
    return `${modules.length} modules`;
  };
  
  // Get difficulty color
  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner':
        return 'green';
      case 'intermediate':
        return 'yellow';
      case 'advanced':
        return 'red';
      default:
        return 'gray';
    }
  };
  
  // Star rating component
  const StarRating = ({ rating }) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = (rating || 0) % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Icon key={i} as={FiStar} color="yellow.400" fill="currentColor" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Icon key={i} as={FiStar} color="yellow.400" fill="currentColor" opacity={0.5} />
        );
      } else {
        stars.push(
          <Icon key={i} as={FiStar} color="gray.300" />
        );
      }
    }
    
    return <HStack spacing={0}>{stars}</HStack>;
  };
  
  return (
    <Box
      bg={cardBg}
      borderRadius="xl"
      overflow="hidden"
      border="1px"
      borderColor={isHovered ? hoverBorderColor : borderColor}
      shadow={isHovered ? `0 8px 25px ${shadowColor}` : 'sm'}
      transform={isHovered ? 'translateY(-4px)' : 'translateY(0)'}
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      cursor="pointer"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      position="relative"
      _hover={{
        '& .enroll-button': {
          transform: 'translateY(0)',
          opacity: 1
        }
      }}
    >
      {/* Course Image */}
      <Box position="relative" overflow="hidden">
        <Image
          src={imageError ? defaultImage : (course.image || defaultImage)}
          alt={course.title}
          w="100%"
          h="200px"
          objectFit="cover"
          onError={() => setImageError(true)}
          transition="transform 0.3s ease"
          transform={isHovered ? 'scale(1.05)' : 'scale(1)'}
        />
        
        {/* Overlay with play button */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="blackAlpha.400"
          display="flex"
          alignItems="center"
          justifyContent="center"
          opacity={isHovered ? 1 : 0}
          transition="opacity 0.3s ease"
        >
          <Box
            bg="whiteAlpha.900"
            borderRadius="full"
            p={3}
            transform={isHovered ? 'scale(1)' : 'scale(0.8)'}
            transition="transform 0.3s ease"
          >
            <Icon as={FiPlay} w={6} h={6} color="blue.500" />
          </Box>
        </Box>
        
        {/* Free badge - Always show since all courses are free */}
        <Badge
          position="absolute"
          top={3}
          left={3}
          colorScheme="green"
          borderRadius="full"
          px={2}
          py={1}
          fontSize="xs"
          fontWeight="bold"
        >
          FREE
        </Badge>
        
        {/* Skill tag badge */}
        {showSkillTag && course.skillTag && (
          <Badge
            position="absolute"
            top={3}
            right={3}
            colorScheme="purple"
            borderRadius="full"
            px={2}
            py={1}
            fontSize="xs"
            fontWeight="bold"
          >
            {course.skillTag.toUpperCase()}
          </Badge>
        )}
      </Box>
      
      {/* Card Content */}
      <VStack align="stretch" p={5} spacing={4}>
        {/* Header */}
        <VStack align="start" spacing={2}>
          <Text
            fontSize="lg"
            fontWeight="bold"
            color={textColor}
            noOfLines={2}
            lineHeight="1.3"
          >
            {course.title}
          </Text>
          
          <HStack spacing={2}>
            <Icon as={FiUser} w={4} h={4} color={mutedTextColor} />
            <Text fontSize="sm" color={mutedTextColor}>
              {course.author || 'Unknown Instructor'}
            </Text>
          </HStack>
        </VStack>
        
        {/* Description */}
        <Text
          fontSize="sm"
          color={mutedTextColor}
          noOfLines={3}
          lineHeight="1.4"
        >
          {course.description}
        </Text>
        
        {/* Course Stats */}
        <VStack spacing={3}>
          {/* Rating and Level */}
          <HStack justify="space-between" w="100%">
            <HStack spacing={2}>
              <StarRating rating={course.rating} />
              <Text fontSize="sm" color={mutedTextColor}>
                ({course.rating?.toFixed(1) || 'N/A'})
              </Text>
            </HStack>
            
            <Badge
              colorScheme={getDifficultyColor(course.level)}
              size="sm"
              borderRadius="full"
            >
              {course.level || 'All Levels'}
            </Badge>
          </HStack>
          
          {/* Duration and Lectures */}
          <HStack justify="space-between" w="100%" fontSize="sm" color={mutedTextColor}>
            <HStack spacing={1}>
              <Icon as={FiClock} w={4} h={4} />
              <Text>{formatDuration(course.duration)}</Text>
            </HStack>
            
            <HStack spacing={1}>
              <Icon as={FiBook} w={4} h={4} />
              <Text>{formatLectures(course.modules)}</Text>
            </HStack>
          </HStack>
        </VStack>
        
        {/* Price and Enroll Button */}
        <VStack spacing={3}>
          {showPricing && (
            <HStack justify="space-between" w="100%">
              <VStack align="start" spacing={0}>
                <Text fontSize="lg" fontWeight="bold" color="green.500">
                  Free
                </Text>
              </VStack>
            </HStack>
          )}
          
          {/* Enroll Button */}
          <Button
            className="enroll-button"
            colorScheme="blue"
            size="md"
            w="100%"
            bg={gradientBg}
            _hover={{
              bg: gradientBg,
              transform: 'translateY(-1px)',
              boxShadow: 'lg'
            }}
            transform="translateY(4px)"
            opacity={0.9}
            transition="all 0.3s ease"
            onClick={handleEnroll}
            leftIcon={<Icon as={FiTrendingUp} />}
          >
            Enroll Now
          </Button>
        </VStack>
      </VStack>
      
      {/* Certificate indicator */}
      {course.certificate && (
        <Tooltip label="Certificate available upon completion" hasArrow>
          <Box
            position="absolute"
            top={4}
            right={4}
            bg="yellow.400"
            borderRadius="full"
            p={2}
            shadow="md"
          >
            <Icon as={FiAward} w={4} h={4} color="yellow.800" />
          </Box>
        </Tooltip>
      )}
    </Box>
  );
};

export default ModernCourseCard;