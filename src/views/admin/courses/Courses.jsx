import React, { useEffect, useState } from "react";
import { Box, Heading, Text, Button, HStack, Badge, useColorModeValue } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import CoursesGrid from "./CoursesGrid";
import { FiX } from "react-icons/fi";

const Courses = () => {
  const [skillFilter, setSkillFilter] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const badgeBg = useColorModeValue("blue.100", "blue.800");
  const badgeColor = useColorModeValue("blue.800", "blue.100");
  
  useEffect(() => {
    // Get skill filter from URL if present
    const urlParams = new URLSearchParams(location.search);
    const skill = urlParams.get('skill');
    if (skill) {
      setSkillFilter(skill);
    } else {
      setSkillFilter(null);
    }
  }, [location.search]);
  
  // Format skill name for display (convert kebab-case to Title Case)
  const formatSkillName = (skill) => {
    if (!skill) return '';
    return skill
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  // Clear the skill filter
  const clearSkillFilter = () => {
    navigate('/admin/courses');
    setSkillFilter(null);
  };
  
  return (
    <Box>
      <Box>
        <Heading size="lg" mb={2}>
          {skillFilter ? `${formatSkillName(skillFilter)} Courses` : 'All Courses'}
        </Heading>
        
        {skillFilter && (
          <HStack mb={4} spacing={3}>
            <Text color="gray.600">
              Filtered by skill:
            </Text>
            <Badge 
              px={3} 
              py={1} 
              borderRadius="full" 
              bg={badgeBg} 
              color={badgeColor}
              display="flex"
              alignItems="center"
            >
              {formatSkillName(skillFilter)}
              <Box 
                as="span" 
                ml={2} 
                cursor="pointer" 
                onClick={clearSkillFilter}
                display="inline-flex"
                alignItems="center"
              >
                <FiX />
              </Box>
            </Badge>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => navigate('/admin/skilltree')}
              ml={2}
            >
              Back to Skill Tree
            </Button>
          </HStack>
        )}
        
        <CoursesGrid />
      </Box>
    </Box>
  );
};

export default Courses;