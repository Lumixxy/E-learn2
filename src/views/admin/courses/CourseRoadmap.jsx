import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'react-flow-renderer';
import { 
  Box, 
  VStack, 
  Text, 
  useToast, 
  Button, 
  HStack, 
  Progress, 
  Badge, 
  Icon,
  Grid,
  GridItem,
  Spinner,
  Center
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiAward, FiTarget, FiTrendingUp } from 'react-icons/fi';
import { loadCourseById } from 'utils/courseDataLoader';
import NodeQuiz from '../../../components/roadmap/NodeQuiz';
import NodeAssignment from '../../../components/roadmap/NodeAssignment';
import AssignmentFlow from '../../../components/assignment/AssignmentFlow';
import CertificateGenerator from '../../../components/certificate/CertificateGenerator';
import { useCompletedNodes } from '../../../context/CompletedNodesContext';
import { useXP } from '../../../contexts/XPContext';
import { mitPythonRoadmap } from '../../../data/mitPythonRoadmap';
import mitPythonQuizzes from '../../../data/mitPythonQuizzes';
import PeerEvaluation from '../../../components/assignment/PeerEvaluation';
import ResourcesList from '../../../components/roadmap/ResourcesList';

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
  const [quizOpen, setQuizOpen] = useState(false);
  const [assignmentOpen, setAssignmentOpen] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const toast = useToast();
  const { isNodeCompleted, markNodeAsCompleted } = useCompletedNodes();
  const { 
    userXP, 
    completeLesson, 
    completeQuiz, 
    completeModule, 
    completeCourse, 
    isCourseCompleted,
    isModuleCompleted,
    getCurrentLevelInfo 
  } = useXP();

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
            setRoadmapData(rm);
            
            // Build nodes/edges from API nodes and their dependencies
            const apiNodes = (rm?.nodes || []).map((n) => {
              const nodeCompleted = isNodeCompleted(rm.id, `node-${n.node_id}`) || isModuleCompleted(courseId, n.node_id);
              return {
                id: String(n.node_id),
                type: 'default',
                data: { label: n.label, description: n.description },
                position: { x: n.position_x || 0, y: n.position_y || 0 },
                style: {
                  width: 180,
                  height: 60,
                  borderRadius: 8,
                  padding: '10px',
                  background: nodeCompleted ? '#4CAF50' : '#2196F3',
                  color: 'white',
                  border: '1px solid #1565C0',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  fontWeight: 'bold',
                },
              };
            });
            
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
          const generatedNodes = c.modules.map((module, index) => {
            const moduleCompleted = isModuleCompleted(courseId, module.id);
            return {
              id: String(index),
              type: 'default',
              data: { label: module.title, description: module.description || '' },
              position: { x: 250, y: 100 + index * 100 },
              style: {
                width: 180,
                height: 60,
                borderRadius: 8,
                padding: '10px',
                background: moduleCompleted ? '#4CAF50' : '#2196F3',
                color: 'white',
                border: '1px solid #1565C0',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                fontWeight: 'bold',
              },
            };
          });
          
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
  }, [courseId, setNodes, setEdges, isNodeCompleted, isModuleCompleted]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleNodeClick = (event, node) => {
    setSelectedNodeId(node.id);
    
    // Check if node has a quiz
    const nodeHasQuiz = mitPythonQuizzes[node.id];
    
    if (nodeHasQuiz) {
      setQuizOpen(true);
    } else {
      // Check if this is an assignment node
      const assignmentKey = `${course?.skillTag || 'general'}-${node.id}-1`;
      setAssignmentOpen(true);
    }
  };

  // Handle quiz completion
  const handleQuizComplete = (score, nodeId) => {
    setQuizOpen(false);
    
    // Award XP for quiz completion
    const xpResult = completeQuiz(courseId, nodeId, `quiz-${nodeId}`, score);
    
    if (score >= 85) {
      toast({
        title: "Quiz Completed",
        description: `You scored ${score}%! ${xpResult.xpAwarded ? `+${xpResult.xpAwarded} XP` : ''} ${xpResult.leveledUp ? `Level up to ${xpResult.newLevel}!` : ''}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      
      // Mark node as completed in context
      markNodeAsCompleted('course-roadmap', `node-${nodeId}`, score);
      
      // Complete module in XP system
      completeModule(courseId, nodeId);
      
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
      
      // Check if all modules are completed
      checkCourseCompletion();
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
    
    // Award XP for assignment completion
    const xpResult = completeModule(courseId, nodeId);
    
    if (score >= 85) {
      toast({
        title: "Assignment Completed",
        description: `You scored ${score}%! ${xpResult.xpAwarded ? `+${xpResult.xpAwarded} XP` : ''} ${xpResult.leveledUp ? `Level up to ${xpResult.newLevel}!` : ''}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      
      // Mark node as completed in context
      markNodeAsCompleted('course-roadmap', `node-${nodeId}`, score);
      
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
      
      // Check if all modules are completed
      checkCourseCompletion();
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
  
  // Check if course is complete and show certificate
  const checkCourseCompletion = () => {
    if (!course || !nodes) return;
    
    const completedNodes = nodes.filter(node => 
      node.style.background === '#4CAF50' || isModuleCompleted(courseId, node.id)
    );
    
    // If all nodes are completed and course not already completed
    if (completedNodes.length === nodes.length && !isCourseCompleted(courseId)) {
      // Complete course and award XP
      const courseResult = completeCourse(courseId, course.skillTag);
      
      setTimeout(() => {
        toast({
          title: "🎉 Course Completed!",
          description: `Congratulations! You've completed the entire course. ${courseResult.xpAwarded ? `+${courseResult.xpAwarded} XP` : ''} ${courseResult.leveledUp ? `Level up to ${courseResult.newLevel}!` : ''}`,
          status: "success",
          duration: 8000,
          isClosable: true,
        });
        
        // Show certificate after a delay
        setTimeout(() => {
          setShowCertificate(true);
        }, 2000);
      }, 1000);
    }
  };
  
  // Get course progress
  const getCourseProgress = () => {
    if (!nodes || nodes.length === 0) return 0;
    
    const completedNodes = nodes.filter(node => 
      node.style.background === '#4CAF50' || isModuleCompleted(courseId, node.id)
    );
    
    return Math.round((completedNodes.length / nodes.length) * 100);
  };
  
  const courseProgress = getCourseProgress();
  const levelInfo = getCurrentLevelInfo();

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
          
          {/* Course Progress and Stats */}
          <HStack spacing={8} wrap="wrap" justify="center">
            <VStack>
              <Text fontSize="sm" opacity={0.8}>Course Progress</Text>
              <HStack>
                <Progress value={courseProgress} width="150px" colorScheme="green" />
                <Text fontSize="sm" fontWeight="bold">{courseProgress}%</Text>
              </HStack>
            </VStack>
            
            <VStack>
              <Text fontSize="sm" opacity={0.8}>Your Level</Text>
              <Badge colorScheme="purple" px={3} py={1} borderRadius="full">
                Level {levelInfo.level} - {levelInfo.title}
              </Badge>
            </VStack>
            
            <VStack>
              <Text fontSize="sm" opacity={0.8}>Total XP</Text>
              <HStack>
                <Icon as={FiTrendingUp} color="blue.400" />
                <Text fontSize="sm" fontWeight="bold">{(userXP?.totalXP || 0).toLocaleString()}</Text>
              </HStack>
            </VStack>
            
            {courseProgress === 100 && (
              <Button
                leftIcon={<Icon as={FiAward} />}
                colorScheme="gold"
                variant="outline"
                onClick={() => setShowCertificate(true)}
                size="sm"
              >
                View Certificate
              </Button>
            )}
          </HStack>
        </VStack>
        
        <Grid templateColumns="3fr 1fr" gap={4}>
          <GridItem>
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
          </GridItem>
          <GridItem>
            {selectedNodeId && (
              <ResourcesList nodeId={selectedNodeId} />
            )}
          </GridItem>
        </Grid>
        
        {selectedNodeId && quizOpen && (
          <NodeQuiz
            isOpen={quizOpen}
            onClose={() => setQuizOpen(false)}
            nodeId={selectedNodeId}
            onComplete={(score) => handleQuizComplete(score, selectedNodeId)}
          />
        )}
        
        {selectedNodeId && assignmentOpen && (
          <AssignmentFlow
            isOpen={assignmentOpen}
            onClose={() => setAssignmentOpen(false)}
            courseId={courseId}
            moduleId={selectedNodeId}
            assignmentId={`${course?.skillTag || 'general'}-${selectedNodeId}-1`}
            onComplete={(score) => handleAssignmentComplete(score, selectedNodeId)}
          />
        )}
        
        {showCertificate && course && (
          <CertificateGenerator
            isOpen={showCertificate}
            onClose={() => setShowCertificate(false)}
            courseData={course}
            userInfo={{ name: 'Student' }} // Replace with actual user data
            completionDate={new Date()}
          />
        )}
      </Box>
    </Box>
  );
};

export default CourseRoadmap;