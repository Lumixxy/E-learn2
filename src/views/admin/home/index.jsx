import React from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
  HStack,
  Icon,
  Badge,
  Divider,
  Card,
} from "@chakra-ui/react";
import {
  FiBookOpen,
  FiAward,
  FiTrendingUp,
  FiUsers,
  FiCode,
  FiLayers,
  FiStar,
} from "react-icons/fi";
import { MdArrowForward } from "react-icons/md";
import { FAQAccordion } from "components/home/FAQAccordion.jsx";
import homeFeatures from '../../../data/home_features.json';
import homeCourses from '../../../data/home_courses.json';
import testimonials from '../../../data/testimonials.json';
import learningPaths from '../../../data/learning_paths.json';

function Home() {
  const textColor = useColorModeValue("gray.700", "white");
  const brandColor = useColorModeValue("brand.500", "brand.400");
  const featureBorderColor = useColorModeValue("gray.200", "gray.700");
  const bgColor = useColorModeValue("white", "navy.800");
  const cardBg = useColorModeValue("white", "navy.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // Features data
  const features = homeFeatures;

  // Popular Courses data
  const popularCourses = homeCourses;

  // Helper to map icon string to actual icon component
  const iconMap = {
    FiBookOpen,
    FiAward,
    FiTrendingUp,
    FiUsers,
    FiCode,
    FiLayers,
    FiStar,
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {/* Hero Section */}
      <Card mb="20px" p={{ base: "20px", md: "40px" }}>
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap="40px" alignItems="center">
          <Box>
            <Heading 
              as="h1" 
              size="2xl" 
              mb="20px" 
              color={textColor}
              lineHeight="1.2"
            >
              Welcome to <Text as="span" color={brandColor}>PyGenicArc</Text>
            </Heading>
            <Text fontSize="xl" mb="30px" color={textColor} opacity="0.8">
              Your journey to mastering programming starts here. Discover interactive courses, hands-on projects, and a supportive community.
            </Text>
            <HStack spacing="20px">
              <Button 
                size="lg" 
                colorScheme="brand" 
                rightIcon={<MdArrowForward />}
              >
                Explore Courses
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                colorScheme="brand"
              >
                View Learning Path
              </Button>
            </HStack>
          </Box>
          <Box>
            <Image 
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="Programming" 
              borderRadius="xl" 
              shadow="2xl"
            />
          </Box>
        </Grid>
      </Card>

      {/* Stats Section */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing="20px" mb="20px">
        <Card p="20px">
          <VStack spacing="5px" align="start">
            <Text fontSize="sm" color="gray.500">Total Courses</Text>
            <Text fontSize="3xl" fontWeight="bold" color={textColor}>50+</Text>
            <Text fontSize="sm" color="green.500">Growing weekly</Text>
          </VStack>
        </Card>
        <Card p="20px">
          <VStack spacing="5px" align="start">
            <Text fontSize="sm" color="gray.500">Active Students</Text>
            <Text fontSize="3xl" fontWeight="bold" color={textColor}>10,000+</Text>
            <Text fontSize="sm" color="green.500">From 12+ States</Text>
          </VStack>
        </Card>
        <Card p="20px">
          <VStack spacing="5px" align="start">
            <Text fontSize="sm" color="gray.500">Students Enrolled</Text>
            <Text fontSize="3xl" fontWeight="bold" color={textColor}>25,000+</Text>
          </VStack>
        </Card>
        <Card p="20px">
          <VStack spacing="5px" align="start">
            <Text fontSize="sm" color="gray.500">Success Rate</Text>
            <Text fontSize="3xl" fontWeight="bold" color={textColor}>94%</Text>
          </VStack>
        </Card>
      </SimpleGrid>

      {/* Features Section */}
      <Card mb="20px" p="30px">
        <VStack spacing="30px" align="center" mb="40px">
          <Heading as="h2" size="xl" textAlign="center" color={textColor}>
            Why Choose PyGenicArc?
          </Heading>
          <Text fontSize="lg" textAlign="center" maxW="800px" color={textColor} opacity="0.8">
            Our platform is designed to provide you with the best learning experience, helping you master programming skills efficiently and effectively.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="30px">
          {features.map((feature, index) => (
            <Box 
              key={index} 
              p="25px" 
              borderRadius="xl" 
              borderWidth="1px" 
              borderColor={featureBorderColor}
              _hover={{ 
                shadow: "md", 
                borderColor: brandColor,
                transform: "translateY(-5px)",
                transition: "all 0.3s ease"
              }}
            >
              <Icon 
                as={iconMap[feature.icon]} 
                w={10} 
                h={10} 
                color={brandColor} 
                mb="15px" 
              />
              <Heading as="h3" size="md" mb="10px" color={textColor}>
                {feature.title}
              </Heading>
              <Text color={textColor} opacity="0.8">
                {feature.description}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Card>

      {/* Popular Courses Section */}
      <Card mb="20px" p="30px">
        <Flex justify="space-between" align="center" mb="30px">
          <Heading as="h2" size="lg" color={textColor}>
            Popular Courses
          </Heading>
          <Button variant="ghost" colorScheme="brand" rightIcon={<MdArrowForward />}>
            View All Courses
          </Button>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing="20px">
          {popularCourses.map((course, index) => (
            <Box 
              key={index} 
              borderRadius="xl" 
              overflow="hidden" 
              bg={bgColor}
              shadow="md"
              _hover={{ 
                shadow: "xl",
                transform: "translateY(-5px)",
                transition: "all 0.3s ease"
              }}
            >
              <Image 
                src={course.image} 
                alt={course.title} 
                w="100%" 
                h="160px" 
                objectFit="cover" 
              />
              <Box p="20px">
                <Heading as="h3" size="md" mb="10px" color={textColor} noOfLines={2}>
                  {course.title}
                </Heading>
                <HStack spacing="10px" mb="10px">
                  <Badge colorScheme="blue">{course.level}</Badge>
                  <Text fontSize="sm" color="gray.500">{course.duration}</Text>
                </HStack>
                <HStack spacing="5px" align="center">
                  <Icon as={FiStar} color="orange.400" />
                  <Text fontSize="sm" fontWeight="bold" color={textColor}>{course.rating}</Text>
                  <Text fontSize="sm" color="gray.500">(1,200 reviews)</Text>
                </HStack>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Card>

      {/* Testimonials Section */}
      <Card mb="20px" p="30px">
        <VStack spacing="30px" align="center" mb="40px">
          <Heading as="h2" size="xl" textAlign="center" color={textColor}>
            Student Success Stories
          </Heading>
          <Text fontSize="lg" textAlign="center" maxW="800px" color={textColor} opacity="0.8">
            Hear from our students who have transformed their careers through PyGenicArc.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing="30px">
          {testimonials.map((testimonial, index) => (
            <Card key={index} p="25px" variant="elevated">
              <VStack spacing="20px" align="start">
                <Text fontSize="lg" fontStyle="italic" color={textColor}>
                  "{testimonial.testimonial}"
                </Text>
                <Divider />
                <HStack spacing="15px">
                  <Image 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    borderRadius="full" 
                    boxSize="50px" 
                    objectFit="cover"
                  />
                  <Box>
                    <Text fontWeight="bold" color={textColor}>{testimonial.name}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {testimonial.role}, {testimonial.company}
                    </Text>
                  </Box>
                </HStack>
              </VStack>
            </Card>
          ))}
        </SimpleGrid>
      </Card>

      {/* Learning Paths Section */}
      <Card mb="20px" p="30px">
        <Flex justify="space-between" align="center" mb="30px">
          <Heading as="h2" size="lg" color={textColor}>
            Learning Paths
          </Heading>
          <Button variant="ghost" colorScheme="brand" rightIcon={<MdArrowForward />}>
            View All Paths
          </Button>
        </Flex>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="20px">
          {learningPaths.map((path, index) => (
            <Card key={index} p="25px" variant="outline">
              <VStack spacing="20px" align="start">
                <Icon as={iconMap[path.icon]} w={10} h={10} color={brandColor} />
                <Heading as="h3" size="md" color={textColor}>
                  {path.title}
                </Heading>
                <Text color={textColor} opacity="0.8">
                  {path.description}
                </Text>
                <HStack>
                  <Text fontSize="sm" fontWeight="bold" color={brandColor}>
                    {path.courses} Courses
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    • {path.duration}
                  </Text>
                </HStack>
                <Button 
                  variant="ghost" 
                  colorScheme="brand" 
                  rightIcon={<MdArrowForward />}
                  alignSelf="flex-start"
                >
                  View Path
                </Button>
              </VStack>
            </Card>
          ))}
        </SimpleGrid>
      </Card>

      {/* FAQ Section */}
      <FAQAccordion />

      {/* Footer */}
      <Box mt="60px" pb="20px" textAlign="center" fontSize="sm" color={textColor} opacity="0.7">
        <Text>&copy; {new Date().getFullYear()} PyGenicArc. All rights reserved.</Text>
      </Box>
    </Box>
  );
}

export default Home;