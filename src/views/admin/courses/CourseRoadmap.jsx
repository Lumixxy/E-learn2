import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'react-flow-renderer';
import { Box, VStack, Text, useColorModeValue, Flex, Button, useToast, Icon, Badge } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { loadCourseById } from 'utils/courseDataLoader';
import WebWarriorAPI from 'api/webwarrior';
import NodeQuiz from '../../../components/roadmap/NodeQuiz';
import NodeAssignment from '../../../components/roadmap/NodeAssignment';
import ResourcesList from '../../../components/roadmap/ResourcesList';
import { useCompletedNodes } from '../../../context/CompletedNodesContext';
import nodeQuizzes from '../../../data/nodeQuizzes';
import { FaCertificate, FaLock, FaUnlock, FaCheck, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';

const foggyBg = {
  background: 'linear-gradient(120deg, #e0f2ff 0%, #b3c6e0 100%)',
  filter: 'blur(0px)',
  minHeight: '100vh',
  width: '100vw',
  position: 'absolute',
  zIndex: 0,
};

const CourseRoadmap = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [apiRoadmap, setApiRoadmap] = useState(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const [assignmentOpen, setAssignmentOpen] = useState(false);
  const [completedAssignments, setCompletedAssignments] = useState({});
  const [assignmentScores, setAssignmentScores] = useState({});
  const [certificateEligible, setCertificateEligible] = useState(false);
  const toast = useToast();
  const { isNodeCompleted, markNodeAsCompleted } = useCompletedNodes();

  // Function to check if a node is unlockable based on its dependencies
  const isNodeUnlockable = (roadmapId, nodeId, dependencies) => {
    // If there are no dependencies, the node is unlockable
    if (!dependencies || dependencies.length === 0) return true;
    
    // Check if all dependencies are completed with at least 85% score
    return dependencies.every(depId => {
      const formattedDepId = depId.startsWith('node-') ? depId : `node-${depId}`;
      return isNodeCompleted(roadmapId, formattedDepId);
    });
  };

  useEffect(() => {
    const fetchRoadmapData = async () => {
      try {
        setLoading(true);
        // Load course to determine roadmap title
        const c = await loadCourseById(courseId);
        setCourse(c || null);

        // Always try to use the roadmap_api backend first
        try {
          console.log('Attempting to load roadmap from backend API');
          // Use the roadmap_api backend URL directly
          const response = await fetch('http://localhost:8000/api/roadmap/');
          if (!response.ok) throw new Error('Failed to fetch roadmaps from backend API');
          
          const roadmaps = await response.json();
          console.log('Roadmaps loaded from backend API:', roadmaps);
          
          // Use the first roadmap or find one matching the course title if available
          let rm = roadmaps[0]; // Default to first roadmap
          if (c?.title) {
            const matchingRoadmap = roadmaps.find(r => r.title.toLowerCase() === c.title.toLowerCase());
            if (matchingRoadmap) rm = matchingRoadmap;
          }
          
          if (rm) {
            console.log('Using roadmap:', rm);
            setApiRoadmap(rm);
            
            // Build nodes/edges from API nodes and their dependencies
            const apiNodes = (rm?.nodes || []).map((n) => ({
              id: String(n.node_id),
              type: 'default',
              data: { label: n.label, description: n.description },
              position: { x: n.position_x || 0, y: n.position_y || 0 },
              style: {
                width: 180,
                height: 60,
                borderRadius: 8,
                padding: '10px',
                background: isNodeCompleted(rm.id, `node-${n.node_id}`) ? '#4CAF50' : '#2196F3',
                color: 'white',
                border: '1px solid #1565C0',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                fontWeight: 'bold',
              },
            }));
            
            const apiEdges = [];
            (rm?.nodes || []).forEach((n) => {
              (n.dependencies || []).forEach((depId) => {
                apiEdges.push({
                  id: `e-${depId}-${n.node_id}`,
                  source: String(depId),
                  target: String(n.node_id),
                  animated: true,
                  style: { stroke: '#1565C0', strokeWidth: 2 },
                });
              });
            });
            
            setNodes(apiNodes);
            setEdges(apiEdges);
            setRoadmapData(rm);
            setLoading(false);
            return;
          }
        } catch (error) {
          console.warn('Failed to load roadmap from backend API, falling back to local data:', error);
        }

        // Fallback to generating a roadmap from course modules
        if (c?.modules) {
          const generatedNodes = c.modules.map((module, index) => ({
            id: String(index),
            type: 'default',
            data: { label: module.title, description: module.description || '' },
            position: { x: 250, y: 100 + index * 100 },
            style: {
              width: 180,
              height: 60,
              borderRadius: 8,
              padding: '10px',
              background: '#2196F3',
              color: 'white',
              border: '1px solid #1565C0',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              fontWeight: 'bold',
            },
          }));
          
          const generatedEdges = [];
          for (let i = 0; i < c.modules.length - 1; i++) {
            generatedEdges.push({
              id: `e-${i}-${i+1}`,
              source: String(i),
              target: String(i+1),
              animated: true,
              style: { stroke: '#1565C0', strokeWidth: 2 },
            });
          }
          
          setNodes(generatedNodes);
          setEdges(generatedEdges);
          setRoadmapData({ id: courseId, title: c.title });
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error loading roadmap:', err);
        setError('Failed to load roadmap data');
        setLoading(false);
      }
    };
    
    fetchRoadmapData();
  }, [courseId, setNodes, setEdges]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleNodeClick = (event, node) => {
    setSelectedNodeId(node.id);
    
    // Check if node has a quiz
    const nodeHasQuiz = nodeQuizzes[node.id] !== undefined;
    
    if (nodeHasQuiz) {
      setQuizOpen(true);
    } else {
      // If no quiz, try to navigate to course content
      const moduleIndex = parseInt(node.id);
      if (!isNaN(moduleIndex) && course?.modules?.[moduleIndex]) {
        const selectedModule = course.modules[moduleIndex];
        const firstLessonWithLink = selectedModule?.lessons?.find((l) => l.websiteLink);
        const targetUrl = firstLessonWithLink?.websiteLink;
        
        if (targetUrl) {
          window.open(targetUrl, '_blank', 'noopener,noreferrer');
        } else {
          navigate(`/admin/courses/${courseId}/learn?moduleIndex=${moduleIndex}`);
        }
      }
    }
  };

  // Handle quiz completion
  const handleQuizComplete = (score, nodeId) => {
    setQuizOpen(false);
    
    if (score >= 85) {
      toast({
        title: "Quiz Completed",
        description: `You scored ${score}%! You can now proceed to the next node.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      
      // Mark node as completed in context
      markNodeAsCompleted(roadmapData.id, `node-${nodeId}`, score);
      
      // Update node style to show completion
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              style: {
                ...node.style,
                background: '#4CAF50',
              },
            };
          }
          return node;
        })
      );
    } else {
      toast({
        title: "Quiz Failed",
        description: `You scored ${score}%. You need at least 85% to proceed.`,
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Handle assignment completion
  const handleAssignmentComplete = (score, nodeId) => {
    setAssignmentOpen(false);
    
    if (score >= 85) {
      toast({
        title: "Assignment Completed",
        description: `You scored ${score}%! You can now proceed to the next node.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      
      // Update completed assignments
      setCompletedAssignments((prev) => ({
        ...prev,
        [nodeId]: true,
      }));
      
      // Update assignment scores
      setAssignmentScores((prev) => ({
        ...prev,
        [nodeId]: score,
      }));
      
      // Save to localStorage
      localStorage.setItem(
        `assignmentScores_${courseId}`,
        JSON.stringify({
          ...assignmentScores,
          [nodeId]: score,
        })
      );
      
      // Mark node as completed in context
      markNodeAsCompleted(roadmapData.id, `node-${nodeId}`, score);
      
      // Update node style to show completion
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              style: {
                ...node.style,
                background: '#4CAF50',
              },
            };
          }
          return node;
        })
      );
    } else {
      toast({
        title: "Assignment Failed",
        description: `You scored ${score}%. You need at least 85% to proceed.`,
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Text fontSize="xl">Loading roadmap...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Text fontSize="xl" color="red.500">{error}</Text>
      </Box>
    );
  }

  return (
    <Box position="relative" minH="100vh">
      <Box sx={foggyBg} />
      <Box position="relative" zIndex="1" p={4}>
        <VStack spacing={4} mb={6}>
          <Text fontSize="3xl" fontWeight="bold">
            {course?.title || 'Course'} Roadmap
          </Text>
          <Text>Complete each node to progress through the course</Text>
          
          {certificateEligible && (
            <Button
              leftIcon={<Icon as={FaCertificate} />}
              colorScheme="green"
              onClick={() => navigate(`/admin/courses/${courseId}/certificate`)}
            >
              View Certificate
            </Button>
          )}
        </VStack>
        
        <Box height="70vh" border="1px solid #e2e8f0" borderRadius="md" overflow="hidden">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={handleNodeClick}
            fitView
          >
            <Controls />
            <MiniMap />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </Box>
        
        {selectedNodeId && quizOpen && (
          <NodeQuiz
            isOpen={quizOpen}
            onClose={() => setQuizOpen(false)}
            nodeId={selectedNodeId}
            onComplete={(score) => handleQuizComplete(score, selectedNodeId)}
          />
        )}
        
        {selectedNodeId && assignmentOpen && (
          <NodeAssignment
            isOpen={assignmentOpen}
            onClose={() => setAssignmentOpen(false)}
            nodeId={selectedNodeId}
            onComplete={(score) => handleAssignmentComplete(score, selectedNodeId)}
          />
        )}
      </Box>
    </Box>
  );
};

export default CourseRoadmap;