import React from 'react';
import { Box, VStack, HStack, Text, Button, useColorModeValue, Flex } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

// Mock data structure for demonstration
const mockRoadmap = [
  {
    id: 'intro',
    label: 'Introduction',
    next: ['module1'],
  },
  {
    id: 'module1',
    label: 'Module 1: Basics',
    next: ['module2'],
  },
  {
    id: 'module2',
    label: 'Module 2: Intermediate',
    next: ['module3'],
  },
  {
    id: 'module3',
    label: 'Module 3: Advanced',
    next: [],
  },
];

const nodeStyle = (bg) => ({
  background: bg,
  borderRadius: '12px',
  padding: '24px 32px',
  minWidth: '200px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '18px',
  cursor: 'pointer',
  border: '2px solid #b3d8fd',
});

const arrowStyle = {
  width: '40px',
  height: '2px',
  background: '#b3d8fd',
  margin: '0 8px',
  borderRadius: '1px',
};

const CourseRoadmap = () => {
  const bg = useColorModeValue('#e3f0fc', 'blue.900');
  const nodeBg = useColorModeValue('#cce4fc', 'blue.800');
  const textColor = useColorModeValue('blue.900', 'white');
  const navigate = useNavigate();
  const { courseId } = useParams();

  // For now, use mockRoadmap. Replace with real course/module data as needed.
  const roadmap = mockRoadmap;

  const handleNodeClick = (nodeId) => {
    // Navigate to the learn page for the course (optionally with module/topic info)
    navigate(`/admin/courses/${courseId}/learn`);
  };

  return (
    <Box minH="100vh" bg={bg} px={{ base: 2, md: 8 }} py={10} fontFamily="'Inter', 'Poppins', sans-serif">
      <VStack spacing={6} mb={10}>
        <Text fontSize={{ base: '2xl', md: '4xl' }} fontWeight="bold" color={textColor} textAlign="center">
          Course Roadmap
        </Text>
        <Text fontSize="lg" color="blue.500" textAlign="center">
          Visualize your learning journey
        </Text>
      </VStack>
      <Flex direction="row" align="center" justify="center" wrap="wrap">
        {roadmap.map((node, idx) => (
          <React.Fragment key={node.id}>
            <Box
              sx={nodeStyle(nodeBg)}
              color={textColor}
              onClick={() => handleNodeClick(node.id)}
              _hover={{ background: '#b3d8fd' }}
            >
              {node.label}
            </Box>
            {idx < roadmap.length - 1 && <Box sx={arrowStyle} />}
          </React.Fragment>
        ))}
      </Flex>
    </Box>
  );
};

export default CourseRoadmap; 