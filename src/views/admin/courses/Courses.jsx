import React, { useState } from "react";
import {
  Box,
  Card,
  CardBody,
  Text,
  VStack,
  HStack,
  Button,
  Image,
  Badge,
  Flex,
  Tag,
  TagLabel,
  SimpleGrid,
  useColorModeValue,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Wrap,
  WrapItem
} from "@chakra-ui/react";
import { ChevronDownIcon, StarIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const CourseCard = ({ 
  title, 
  description, 
  instructor, 
  rating, 
  totalRatings, 
  duration, 
  lectures, 
  level, 
  price, 
  imageUrl,
  tags,
  id 
}) => {
  const cardBg = useColorModeValue("white", "navy.800");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const subtextColor = useColorModeValue("gray.600", "gray.400");
  
  return (
    <Card bg={cardBg} borderRadius="xl" boxShadow="lg" overflow="hidden" _hover={{ boxShadow: "xl" }} transition="all 0.2s">
      <Image src={imageUrl} alt={title} h="200px" w="100%" objectFit="cover" />
      <CardBody p={6}>
        <VStack align="start" spacing={3}>
          <Text fontSize="lg" fontWeight="bold" color={textColor} noOfLines={2}>
            {title}
          </Text>
          <Text fontSize="sm" color={subtextColor} noOfLines={2}>
            {description}
          </Text>
          <Text fontSize="xs" color={subtextColor}>
            {instructor}
          </Text>
          
          {tags && (
            <HStack spacing={2} mb={2}>
              {tags.split(',').map((tag, idx) => (
                <Tag key={idx} size="sm" variant="subtle" colorScheme="gray">
                  {tag.trim()}
                </Tag>
              ))}
            </HStack>
          )}
          
          <HStack spacing={2} flexWrap="wrap">
            <HStack spacing={1}>
              <Icon as={StarIcon} color="yellow.400" w={3} h={3} />
              <Text fontSize="sm" fontWeight="medium" color={textColor}>
                {rating}
              </Text>
            </HStack>
            <Text fontSize="xs" color={subtextColor}>
              ({totalRatings.toLocaleString()} ratings)
            </Text>
            <Text fontSize="xs" color={subtextColor}>•</Text>
            <Text fontSize="xs" color={subtextColor}>{duration}</Text>
            <Text fontSize="xs" color={subtextColor}>•</Text>
            <Text fontSize="xs" color={subtextColor}>{lectures} lectures</Text>
            <Text fontSize="xs" color={subtextColor}>•</Text>
            <Badge colorScheme="gray" size="sm">{level}</Badge>
          </HStack>
          
          <Flex justify="space-between" align="center" w="100%" pt={2}>
            <Text fontSize="lg" fontWeight="bold" color={textColor}>
              {price}
            </Text>
            {id === "1" ? (
              <Link to="/admin/courses/course_1">
                <Button colorScheme="purple" size="sm" borderRadius="md">
                  Start Course
                </Button>
              </Link>
            ) : (
              <Link to={`/admin/courses/${id}`}>
                <Button colorScheme="purple" size="sm" borderRadius="md">
                  Start Course
                </Button>
              </Link>
            )}
          </Flex>
        </VStack>
      </CardBody>
    </Card>
  );
};

const FilterButton = ({ children, isActive = false, hasMenu = false, count = null, menuItems = [] }) => {
  const activeBg = useColorModeValue("purple.100", "purple.900");
  const activeColor = useColorModeValue("purple.700", "purple.200");
  const inactiveBg = useColorModeValue("white", "gray.700");
  const inactiveColor = useColorModeValue("gray.700", "gray.200");
  
  if (hasMenu) {
    return (
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          size="sm"
          bg={isActive ? activeBg : inactiveBg}
          color={isActive ? activeColor : inactiveColor}
          borderColor={isActive ? "purple.300" : "gray.300"}
          variant="outline"
          _hover={{ bg: isActive ? activeBg : "gray.50" }}
        >
          <HStack spacing={2}>
            <Text>{children}</Text>
            {count && (
              <Badge colorScheme="gray" borderRadius="full" px={2}>
                {count}
              </Badge>
            )}
          </HStack>
        </MenuButton>
        <MenuList>
          {menuItems.map((item, index) => (
            <MenuItem key={index}>{item}</MenuItem>
          ))}
        </MenuList>
      </Menu>
    );
  }
  
  return (
    <Button
      size="sm"
      bg={isActive ? activeBg : inactiveBg}
      color={isActive ? activeColor : inactiveColor}
      borderColor={isActive ? "purple.300" : "gray.300"}
      variant="outline"
      _hover={{ bg: isActive ? activeBg : "gray.50" }}
    >
      <HStack spacing={2}>
        <Text>{children}</Text>
        {count && (
          <Badge colorScheme="gray" borderRadius="full" px={2}>
            {count}
          </Badge>
        )}
      </HStack>
    </Button>
  );
};

const Courses = () => {
  const [selectedSort, setSelectedSort] = useState('Most Relevant');
  const cardBg = useColorModeValue("white", "navy.800");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const bgColor = useColorModeValue("gray.50", "navy.900");
  const headerBg = useColorModeValue("white", "navy.700");

  const courses = [
    {
      id: "1",
      title: "A Gentle Introduction to Programming Using Python",
      description: "A gentle introduction to programming using Python.",
      instructor: "Mihir Kedia, Aseem Kishore",
      rating: 4.6,
      totalRatings: 299,
      duration: "2 total hours",
      lectures: "23",
      level: "Beginner",
      price: "Free",
      imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23FF6B35'/%3E%3Cg transform='translate(50,50)'%3E%3Cpath d='M50 0C77.614 0 100 22.386 100 50S77.614 100 50 100 0 77.614 0 50 22.386 0 50 0z' fill='%23306998'/%3E%3Cpath d='M50 0C22.386 0 0 22.386 0 50s22.386 50 50 50 50-22.386 50-50S77.614 0 50 0z' fill='%23FFD43B'/%3E%3C/g%3E%3Cg transform='translate(150,80)'%3E%3Crect width='120' height='80' fill='%23FFD700' rx='5'/%3E%3Crect x='10' y='10' width='30' height='20' fill='%23FF6B35' rx='3'/%3E%3Crect x='10' y='35' width='40' height='15' fill='%23FF6B35' rx='2'/%3E%3Crect x='10' y='55' width='35' height='15' fill='%23FF6B35' rx='2'/%3E%3Crect x='60' y='10' width='50' height='60' fill='%23228B22' rx='5'/%3E%3C/g%3E%3C/svg%3E",
      tags: "Engineering, Computer Science, Software Design and Engineering"
    },
    {
      title: "Introduction To Python Programming",
      description: "A Quick and Easy Intro to Python Programming",
      instructor: "Avinash Jain, The Codex",
      rating: 4.4,
      totalRatings: 72648,
      duration: "1 total hour",
      lectures: "22",
      level: "Beginner",
      price: "Free",
      imageUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23E8F4FD'/%3E%3Cg transform='translate(70,40)'%3E%3Crect width='160' height='120' fill='%2387CEEB' rx='10'/%3E%3Crect x='10' y='10' width='140' height='90' fill='%23F0F8FF' rx='5'/%3E%3Cpath d='M50 30C77.614 30 100 52.386 100 80S77.614 130 50 130 0 107.614 0 80 22.386 30 50 30z' fill='%23306998'/%3E%3Cpath d='M50 30C22.386 30 0 52.386 0 80s22.386 50 50 50 50-22.386 50-50S77.614 30 50 30z' fill='%23FFD43B'/%3E%3C/g%3E%3Cg transform='translate(20,20)'%3E%3Crect width='40' height='30' fill='%23FF6B35' rx='3'/%3E%3Crect width='40' height='30' fill='%23FF6B35' rx='3' transform='translate(0,40)'/%3E%3Crect width='40' height='30' fill='%23FF6B35' rx='3' transform='translate(0,80)'/%3E%3C/g%3E%3C/svg%3E"
    }
  ];

  return (
    <Box w="100%" minH="100vh" bg={bgColor}>
      {/* Header Filters */}
      <Box bg={headerBg} borderBottom="1px" borderColor="gray.200" px={6} py={4}>
        <Flex justify="space-between" align="center" flexWrap="wrap" gap={4}>
          <Wrap spacing={3}>
            <WrapItem>
              <FilterButton>
                All filters
              </FilterButton>
            </WrapItem>
            <WrapItem>
              <FilterButton hasMenu menuItems={['Multiple Choice', 'True/False', 'Fill in the Blank']}>
                Quizzes
              </FilterButton>
            </WrapItem>
            <WrapItem>
              <FilterButton hasMenu menuItems={['Python', 'JavaScript', 'Java', 'C++']}>
                Coding Exercises
              </FilterButton>
            </WrapItem>
            <WrapItem>
              <FilterButton hasMenu menuItems={['Beginner', 'Intermediate', 'Advanced']}>
                Practice Tests
              </FilterButton>
            </WrapItem>
            <WrapItem>
              <FilterButton hasMenu menuItems={['Business', 'Technical', 'Interview']}>
                Role Plays
              </FilterButton>
            </WrapItem>
            <WrapItem>
              <FilterButton hasMenu menuItems={['English', 'Spanish', 'French', 'German']}>
                Language
              </FilterButton>
            </WrapItem>
            <WrapItem>
              <FilterButton hasMenu menuItems={['4.5 & up', '4.0 & up', '3.5 & up', '3.0 & up']}>
                Ratings
              </FilterButton>
            </WrapItem>
            <WrapItem>
              <FilterButton hasMenu menuItems={['Beginner', 'Intermediate', 'Advanced', 'All Levels']}>
                Level
              </FilterButton>
            </WrapItem>
          </Wrap>
          
          <HStack spacing={2}>
            <Text fontSize="sm" color={textColor}>Sort by:</Text>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                size="sm"
                variant="ghost"
                fontWeight="medium"
                color={textColor}
              >
                {selectedSort}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => setSelectedSort('Most Relevant')}>Most Relevant</MenuItem>
                <MenuItem onClick={() => setSelectedSort('Newest')}>Newest</MenuItem>
                <MenuItem onClick={() => setSelectedSort('Highest Rated')}>Highest Rated</MenuItem>
                <MenuItem onClick={() => setSelectedSort('Most Popular')}>Most Popular</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
      </Box>

      {/* Course Grid */}
      <Box px={6} py={8}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Courses;