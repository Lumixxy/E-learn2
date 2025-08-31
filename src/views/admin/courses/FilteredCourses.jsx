import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Box,
  Container,
  Heading,
  HStack,
  VStack,
  Text,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Badge,
  useColorModeValue,
  SimpleGrid,
  Flex,
  Icon,
  Spacer,
  useToast
} from '@chakra-ui/react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FiSearch, FiArrowLeft, FiX, FiFilter } from 'react-icons/fi';
import { batchAutoTagCourses, filterCoursesBySkill, getSkillDisplayName } from '../../../utils/courseAutoTagger';
import { useLearning } from '../../../contexts/LearningContext';
import ModernCourseCard from '../../../components/course/ModernCourseCard';

const FilteredCourses = () => {
  const { skillTag } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  
  // State management
  const [allCourses, setAllCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const coursesPerPage = 12;
  
  // Learning context
  const { availableCourses } = useLearning();
  
  // Color mode values
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedTextColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const filterBadgeBg = useColorModeValue('blue.100', 'blue.800');
  const filterBadgeColor = useColorModeValue('blue.800', 'blue.100');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');
  
  // Load and process courses
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let coursesData = [];
        
        // Create course data for new technologies if not available
        const newTechCourses = [
          {
            id: 'mit-python',
            title: 'MIT 6.0001: Introduction to Computer Science and Programming in Python',
            author: 'Dr. Ana Bell',
            category: 'Computer Science',
            level: 'Beginner',
            price: 0,
            isFree: true,
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=2070&auto=format&fit=crop',
            tags: ['Python', 'Computer Science', 'Programming', 'MIT'],
            description: 'Learn fundamental programming concepts with Python from MIT\'s renowned computer science course.',
            skillTags: ['python', 'programming', 'computer-science']
          },
          {
            id: 'javascript',
            title: 'JavaScript Frontend Development',
            author: 'Prof. Sarah Johnson',
            category: 'Frontend Development',
            level: 'Beginner to Intermediate',
            price: 0,
            isFree: true,
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2070&auto=format&fit=crop',
            tags: ['JavaScript', 'Frontend', 'Programming', 'Web Development'],
            description: 'Master modern JavaScript programming for web development.',
            skillTags: ['javascript', 'frontend', 'programming']
          },
          {
            id: 'java',
            title: 'Java Programming Mastery',
            author: 'Dr. Michael Chen',
            category: 'Backend Development',
            level: 'Intermediate to Advanced',
            price: 0,
            isFree: true,
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=2069&auto=format&fit=crop',
            tags: ['Java', 'OOP', 'Programming', 'Backend'],
            description: 'Master object-oriented programming with Java from fundamentals to advanced concepts.',
            skillTags: ['java', 'programming', 'backend']
          },
          {
            id: 'database',
            title: 'Database Management Mastery',
            author: 'Prof. Lisa Wang',
            category: 'Data Management',
            level: 'Intermediate to Advanced',
            price: 0,
            isFree: true,
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2070&auto=format&fit=crop',
            tags: ['Database', 'SQL', 'NoSQL', 'Data Management'],
            description: 'Master SQL, database design, and both relational and NoSQL databases.',
            skillTags: ['database', 'sql', 'data']
          },
          {
            id: 'html',
            title: 'HTML Fundamentals',
            author: 'Prof. Emily Carter',
            category: 'Frontend Development',
            level: 'Beginner',
            price: 0,
            isFree: true,
            rating: 4.7,
            image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop',
            tags: ['HTML', 'Web Development', 'Frontend'],
            description: 'Master the building blocks of the web with comprehensive HTML training.',
            skillTags: ['html', 'frontend', 'web-development']
          },
          {
            id: 'css',
            title: 'CSS Styling and Layout',
            author: 'Dr. James Wilson',
            category: 'Frontend Development',
            level: 'Beginner to Intermediate',
            price: 0,
            isFree: true,
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop',
            tags: ['CSS', 'Web Development', 'Frontend', 'Design'],
            description: 'Create beautiful, responsive web designs with modern CSS techniques.',
            skillTags: ['css', 'frontend', 'web-development']
          },
          {
            id: 'nodejs',
            title: 'Node.js Backend Development',
            author: 'Dr. Maria Rodriguez',
            category: 'Backend Development',
            level: 'Intermediate',
            price: 0,
            isFree: true,
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2070&auto=format&fit=crop',
            tags: ['Node.js', 'Backend', 'JavaScript', 'Server'],
            description: 'Build scalable server-side applications with Node.js and Express.',
            skillTags: ['nodejs', 'backend', 'javascript']
          },
          {
            id: 'react',
            title: 'React.js Frontend Development',
            author: 'Prof. David Kim',
            category: 'Frontend Development',
            level: 'Intermediate',
            price: 0,
            isFree: true,
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop',
            tags: ['React', 'Frontend', 'JavaScript', 'Framework'],
            description: 'Build modern, interactive user interfaces with React and its ecosystem.',
            skillTags: ['react', 'frontend', 'javascript']
          }
        ];

        // Try to use courses from learning context first
        if (availableCourses && availableCourses.length > 0) {
          coursesData = [...availableCourses, ...newTechCourses];
        } else {
          // Fallback to loading from JSON file and add new tech courses
          try {
            const response = await fetch('/data/courses.json');
            if (response.ok) {
              const jsonCourses = await response.json();
              coursesData = [...jsonCourses, ...newTechCourses];
            } else {
              coursesData = newTechCourses;
            }
          } catch {
            coursesData = newTechCourses;
          }
        }
        
        // Auto-tag courses that don't have skill tags
        const taggedCourses = batchAutoTagCourses(coursesData);
        setAllCourses(taggedCourses);
        
        // Filter courses by skill tag
        if (skillTag) {
          const filtered = filterCoursesBySkill(taggedCourses, skillTag);
          setFilteredCourses(filtered);
          
          if (filtered.length === 0) {
            toast({
              title: "No courses found",
              description: `No courses found for ${getSkillDisplayName(skillTag)}. Try browsing other skills.`,
              status: "info",
              duration: 4000,
              isClosable: true,
            });
          }
        }
        
      } catch (err) {
        console.error('Error loading courses:', err);
        setError(err.message);
        toast({
          title: "Error loading courses",
          description: "Failed to load course data. Please try again.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadCourses();
  }, [skillTag, availableCourses, toast]);
  
  // Search and sort functionality
  const processedCourses = useMemo(() => {
    let courses = [...filteredCourses];
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      courses = courses.filter(course =>
        course.title?.toLowerCase().includes(query) ||
        course.description?.toLowerCase().includes(query) ||
        course.author?.toLowerCase().includes(query) ||
        course.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'difficulty':
        courses.sort((a, b) => {
          const levels = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
          return (levels[a.level] || 2) - (levels[b.level] || 2);
        });
        break;
      case 'popularity':
        courses.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
      default:
        // For demo purposes, reverse order to simulate newest first
        courses.reverse();
        break;
    }
    
    return courses;
  }, [filteredCourses, searchQuery, sortBy]);
  
  // Pagination
  const totalPages = Math.ceil(processedCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const currentCourses = processedCourses.slice(startIndex, startIndex + coursesPerPage);
  
  // Navigation functions
  const handleBackToSkillTree = useCallback(() => {
    navigate('/admin/skill-tree');
  }, [navigate]);
  
  const handleRemoveFilter = useCallback(() => {
    navigate('/admin/courses');
  }, [navigate]);
  
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  // Reset page when search or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy]);
  
  if (loading) {
    return (
      <Box minH="100vh" bg={bgColor} p={8}>
        <Container maxW="7xl">
          <Text fontSize="lg" color={textColor} textAlign="center">
            Loading courses...
          </Text>
        </Container>
      </Box>
    );
  }
  
  if (error) {
    return (
      <Box minH="100vh" bg={bgColor} p={8}>
        <Container maxW="7xl">
          <VStack spacing={4} textAlign="center">
            <Text fontSize="lg" color="red.500">
              Error: {error}
            </Text>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </VStack>
        </Container>
      </Box>
    );
  }
  
  const skillDisplayName = getSkillDisplayName(skillTag);
  
  return (
    <Box minH="100vh" bg={bgColor} py={8}>
      <Container maxW="7xl">
        <VStack spacing={6} align="stretch">
          {/* Header Section */}
          <VStack spacing={4} align="start">
            {/* Back Navigation */}
            <Button
              leftIcon={<Icon as={FiArrowLeft} />}
              variant="ghost"
              onClick={handleBackToSkillTree}
              color={textColor}
              _hover={{ bg: hoverBg }}
            >
              Back to Skill Tree
            </Button>
            
            {/* Page Title */}
            <Heading size="xl" color={textColor}>
              {skillDisplayName} Courses
            </Heading>
            
            {/* Filter Badge */}
            <HStack spacing={2}>
              <Badge
                bg={filterBadgeBg}
                color={filterBadgeColor}
                px={3}
                py={1}
                borderRadius="full"
                fontSize="sm"
                fontWeight="medium"
              >
                Filtered by: {skillDisplayName.toUpperCase()}
                <Button
                  size="xs"
                  variant="ghost"
                  ml={2}
                  p={0}
                  minW="auto"
                  h="auto"
                  onClick={handleRemoveFilter}
                  color={filterBadgeColor}
                >
                  <Icon as={FiX} />
                </Button>
              </Badge>
              <Text color={mutedTextColor} fontSize="sm">
                {processedCourses.length} course{processedCourses.length !== 1 ? 's' : ''} found
              </Text>
            </HStack>
          </VStack>
          
          {/* Search and Sort Controls */}
          <Flex
            direction={{ base: 'column', md: 'row' }}
            gap={4}
            align={{ base: 'stretch', md: 'center' }}
          >
            {/* Search Bar */}
            <InputGroup maxW={{ base: 'full', md: '400px' }}>
              <InputLeftElement pointerEvents="none">
                <Icon as={FiSearch} color={mutedTextColor} />
              </InputLeftElement>
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                bg={cardBg}
                border="1px"
                borderColor={borderColor}
                _focus={{
                  borderColor: 'blue.400',
                  boxShadow: '0 0 0 1px blue.400'
                }}
              />
            </InputGroup>
            
            <Spacer />
            
            {/* Sort Controls */}
            <HStack spacing={3}>
              <Icon as={FiFilter} color={mutedTextColor} />
              <Text color={mutedTextColor} fontSize="sm" whiteSpace="nowrap">
                Sort by:
              </Text>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                w="150px"
                size="sm"
                bg={cardBg}
                border="1px"
                borderColor={borderColor}
              >
                <option value="newest">Newest</option>
                <option value="popularity">Popularity</option>
                <option value="difficulty">Difficulty</option>
              </Select>
            </HStack>
          </Flex>
          
          {/* Courses Grid */}
          <Box>
            {currentCourses.length === 0 ? (
              <VStack spacing={4} py={12} textAlign="center">
                <Text fontSize="lg" color={mutedTextColor}>
                  No courses found matching your criteria
                </Text>
                <Text color={mutedTextColor}>
                  Try adjusting your search terms or browse other skills
                </Text>
                <Button onClick={() => setSearchQuery('')} variant="outline">
                  Clear Search
                </Button>
              </VStack>
            ) : (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
                {currentCourses.map((course) => (
                  <ModernCourseCard
                    key={course.id}
                    course={course}
                    showPricing={true}
                    showSkillTag={false}
                    onEnroll={(course) => {
                      // Handle enrollment
                      navigate(`/admin/courses/${course.id}/enroll`);
                    }}
                  />
                ))}
              </SimpleGrid>
            )}
          </Box>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <Flex justify="center" mt={8}>
              <HStack spacing={2}>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handlePageChange(currentPage - 1)}
                  isDisabled={currentPage === 1}
                >
                  Previous
                </Button>
                
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 2 && page <= currentPage + 2)
                  ) {
                    return (
                      <Button
                        key={page}
                        size="sm"
                        variant={currentPage === page ? 'solid' : 'outline'}
                        colorScheme={currentPage === page ? 'blue' : 'gray'}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </Button>
                    );
                  } else if (page === currentPage - 3 || page === currentPage + 3) {
                    return (
                      <Text key={page} color={mutedTextColor}>
                        ...
                      </Text>
                    );
                  }
                  return null;
                })}
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handlePageChange(currentPage + 1)}
                  isDisabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </HStack>
            </Flex>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default FilteredCourses;