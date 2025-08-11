import React, { useEffect, useMemo, useState } from 'react';
import { Box, VStack, HStack, Text, useColorModeValue, Flex } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { loadCourseById } from 'utils/courseDataLoader';

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
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const load = async () => {
      const c = await loadCourseById(courseId);
      setCourse(c || null);
    };
    load();
  }, [courseId]);

  const roadmap = useMemo(() => {
    if (!course?.modules) return [];
    // Only include modules that contain Python in title or lessons if filtering Python
    const modules = course.modules.filter((m) =>
      String(m.title).toLowerCase().includes('python') ||
      (m.lessons || []).some((l) => String(l.title).toLowerCase().includes('python'))
    );
    const list = (modules.length ? modules : course.modules).map((m, index) => ({
      id: m.id,
      label: m.title,
      index,
    }));
    return list;
  }, [course]);

  const handleNodeClick = (nodeId, index) => {
    // Navigate to learn page with selected module index encoded in query string
    navigate(`/admin/courses/${courseId}/learn?moduleIndex=${index}`);
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
              onClick={() => handleNodeClick(node.id, node.index)}
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