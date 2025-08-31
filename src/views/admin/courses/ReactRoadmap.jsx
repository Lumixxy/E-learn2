import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'react-flow-renderer';
import { useParams, useNavigate } from 'react-router-dom';
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
  Center,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Flex,
  Divider,
  useColorModeValue,
  Container,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  CircularProgress,
  CircularProgressLabel
} from '@chakra-ui/react';
import { FiAward, FiTarget, FiTrendingUp, FiBook, FiPlay, FiCheckCircle, FiClock, FiUsers } from 'react-icons/fi';
import { GiAchievement, GiTrophy } from 'react-icons/gi';
import { MdQuiz, MdAssignment } from 'react-icons/md';
import NodeQuiz from '../../../components/roadmap/NodeQuiz';
import NodeAssignment from '../../../components/roadmap/NodeAssignment';
import PeerEvaluation from '../../../components/assignment/PeerEvaluation';
import CertificateGenerator from '../../../components/roadmap/CertificateGenerator';
import ResourcesList from '../../../components/roadmap/ResourcesList';
import { useCompletedNodes } from '../../../context/CompletedNodesContext';
import { useXP } from '../../../contexts/XPContext';
import { completeAssignment } from '../../../services/assignmentService';
import { completeQuiz } from '../../../services/quizService';
import reactRoadmapData from '../../../data/reactRoadmap';
import reactQuizzes from '../../../data/reactQuizzes';

const ReactRoadmap = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showAssignment, setShowAssignment] = useState(false);
  const [showPeerEvaluation, setShowPeerEvaluation] = useState(false);
  const [certificateEligible, setCertificateEligible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quizOpen, setQuizOpen] = useState(false);
  const [assignmentOpen, setAssignmentOpen] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [peerEvalOpen, setPeerEvalOpen] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  
  const { isNodeCompleted, markNodeAsCompleted } = useCompletedNodes();
  
  const { 
    userXP, 
    awardXP, 
    completeLesson, 
    completeModule, 
    completeQuiz: completeQuizXP, 
    completeCourse, 
    isCourseCompleted,
    isModuleCompleted,
    getCurrentLevelInfo 
  } = useXP();

  // Color mode values - Dark theme like MIT Python
  const bgGradient = useColorModeValue(
    'linear(to-br, blue.50, purple.50, pink.50)',
    'linear(to-br, gray.900, purple.900, blue.900)'
  );
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  // Get completed nodes for React roadmap
  const completedNodeIds = useMemo(
    () => Object.keys(reactRoadmapData.nodes).filter(id => isNodeCompleted('react', id)),
    [isNodeCompleted]
  );
  
  // Calculate progress - using single declaration
  const { totalNodes, completedNodesCount, progressPercentage } = useMemo(() => {
    const total = reactRoadmapData.nodes.length;
    const completed = reactRoadmapData.nodes.filter(node => 
      isNodeCompleted('react', node.id)
    ).length;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return {
      totalNodes: total,
      completedNodesCount: completed,
      progressPercentage: progress
    };
  }, [isNodeCompleted]);

  // Handle quiz completion
  const handleQuizComplete = useCallback((score) => {
    if (!selectedNode) return;

    const passed = score >= 70;
    if (passed && !isNodeCompleted('react', selectedNode.id)) {
      markNodeAsCompleted('react', selectedNode.id);
      completeQuiz('react', selectedNode.data.label, score);
      
      toast({
        title: 'Quiz Passed!',
        description: `You scored ${score}% and earned ${score} XP!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else if (!passed) {
      toast({
        title: 'Quiz Failed',
        description: `You scored ${score}%. Please review the material and try again.`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    
    setShowQuiz(false);
    setSelectedNodeId(null);
  }, [selectedNode, isNodeCompleted, markNodeAsCompleted, toast]);

  // Handle peer evaluation completion
  const handlePeerEvaluationComplete = useCallback(() => {
    if (!selectedNode) return;

    if (!isNodeCompleted('react', selectedNode.id)) {
      markNodeAsCompleted('react', selectedNode.id);
      awardXP(100, 'Completed Peer Evaluation');
      
      toast({
        title: 'Evaluation Submitted!',
        description: 'Thank you for completing the peer evaluation.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
    
    setShowPeerEvaluation(false);
    setSelectedNodeId(null);
  }, [selectedNode, isNodeCompleted, markNodeAsCompleted, awardXP, toast]);

  // Handle assignment completion
  const handleAssignmentComplete = useCallback((code, score) => {
    if (!selectedNode) return;

    // Store assignment score in localStorage
    const assignmentScores = JSON.parse(localStorage.getItem('react-assignment-scores') || '{}');
    assignmentScores[selectedNode.id] = score;
    localStorage.setItem('react-assignment-scores', JSON.stringify(assignmentScores));

    if (score >= 70 && !isNodeCompleted('react', selectedNode.id)) {
      markNodeAsCompleted('react', selectedNode.id);
      completeAssignment('react', selectedNode.data.label, score);
      
      toast({
        title: 'Assignment Submitted!',
        description: `You scored ${score}% and earned ${score} XP!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
    
    setShowAssignment(false);
    setSelectedNodeId(null);
  }, [selectedNode, isNodeCompleted, markNodeAsCompleted, toast]);

  // Handle assignment submission
  const handleAssignmentSubmit = useCallback((code, score) => {
    if (!selectedNode) return;

    // Store assignment score in localStorage
    const assignmentScores = JSON.parse(localStorage.getItem('react-assignment-scores') || '{}');
    assignmentScores[selectedNode.id] = score;
    localStorage.setItem('react-assignment-scores', JSON.stringify(assignmentScores));

    if (score >= 70 && !isNodeCompleted('react', selectedNode.id)) {
      markNodeAsCompleted('react', selectedNode.id);
      completeAssignment('react', selectedNode.data.label, score);
      
      toast({
        title: 'Assignment Submitted!',
        description: `You scored ${score}% and earned ${score} XP!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
    
    setAssignmentOpen(false);
    setSelectedNodeId(null);
  }, [selectedNode, isNodeCompleted, markNodeAsCompleted, toast]);

  // Handle node click
  const onNodeClick = useCallback((event, node) => {
    setSelectedNodeId(node.id);
    setSelectedNode(node);

    switch (node.data.type) {
      case 'quiz':
        setShowQuiz(true);
        break;
      case 'assignment':
      case 'project':
        setShowAssignment(true);
        break;
      case 'peer-evaluation':
        setShowPeerEvaluation(true);
        break;
      case 'certificate':
        // Check if all required nodes are completed
        const allCompleted = reactRoadmapData.nodes.every(n => 
          n.id === node.id || isNodeCompleted('react', n.id)
        );
        
        if (allCompleted) {
          setShowCertificate(true);
          setCertificateEligible(true);
          completeCourse('react', 'React Mastery', 1000);
          toast({ 
            title: 'Course Completed!', 
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({ 
            title: 'Complete all requirements',
            description: 'Please complete all lessons and assignments to unlock the certificate',
            status: 'warning',
            duration: 3000,
            isClosable: true,
          });
        }
        break;
      default:
        // For lessons, mark as completed and award XP
        if (!isNodeCompleted('react', node.id)) {
          markNodeAsCompleted('react', node.id);
          awardXP(50, `Completed: ${node.data.label}`);
          completeLesson('react', node.data.label);
          
          toast({ 
            title: 'Lesson Completed!',
            description: `You earned 50 XP for completing ${node.data.label}`,
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        }
        break;
    }
  }, [isNodeCompleted, markNodeAsCompleted, awardXP, completeLesson, completeCourse, toast]);

  // Initialize roadmap data
  useEffect(() => {
    const initializeRoadmap = () => {
      setLoading(true);
      
      // Create nodes from roadmap data
      const roadmapNodes = reactRoadmapData.nodes.map((node) => {
        const nodeCompleted = isNodeCompleted('react', node.id);
        const hasQuiz = reactQuizzes[node.id];
        const hasAssignment = node.data.type === 'assignment' || node.data.type === 'project';
        const isModule = node.type === 'module';
        
        return {
          id: node.id,
          type: isModule ? 'default' : node.data.type,
          data: {
            ...node.data,
            completed: nodeCompleted,
            hasQuiz,
            hasAssignment,
            onNodeClick: (e) => onNodeClick(e, node)
          },
          position: node.position,
          style: {
            background: nodeCompleted ? '#48BB78' : isModule ? '#4299E1' : '#E2E8F0',
            color: nodeCompleted || isModule ? 'white' : 'black',
            border: '2px solid #CBD5E0',
            borderRadius: '8px',
            padding: '10px',
            width: isModule ? '250px' : '200px',
            cursor: 'pointer',
            boxShadow: 'md',
            transition: 'all 0.2s',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }
          }
        };
      });

      setNodes(roadmapNodes);
      setEdges(reactRoadmapData.edges);
      setLoading(false);
    };

    initializeRoadmap();
  }, [isNodeCompleted, onNodeClick]);

  const { level, progress, xp, xpToNextLevel } = getCurrentLevelInfo(userXP);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box bgGradient={bgGradient} minH="100vh" p={4}>
      <Container maxW="7xl" py={8}>
        {/* Header */}
        <VStack spacing={6} mb={8}>
          <Heading size="2xl" textAlign="center" color={textColor}>React Frontend Development</Heading>
          
          {/* Progress Stats */}
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6} w="full">
            <Stat textAlign="center">
              <StatLabel>Progress</StatLabel>
              <StatNumber>{progressPercentage}%</StatNumber>
              <StatHelpText>
                <CircularProgress value={progressPercentage} color="blue.400" size="60px">
                  <CircularProgressLabel>{progressPercentage}%</CircularProgressLabel>
                </CircularProgress>
              </StatHelpText>
            </Stat>
            
            <Stat textAlign="center">
              <StatLabel>Completed</StatLabel>
              <StatNumber>{completedNodesCount}/{totalNodes}</StatNumber>
              <StatHelpText>Lessons & Activities</StatHelpText>
            </Stat>
            
            <Stat textAlign="center">
              <StatLabel>Level</StatLabel>
              <StatNumber>{level}</StatNumber>
              <StatHelpText>
                {xp} / {xpToNextLevel} XP
              </StatHelpText>
            </Stat>
            
            <Stat textAlign="center">
              <StatLabel>Course</StatLabel>
              <StatNumber>React</StatNumber>
              <StatHelpText>Frontend Development</StatHelpText>
            </Stat>
          </SimpleGrid>
        </VStack>

        {/* Main Content Grid */}
        <Grid templateColumns="3fr 1fr" gap={6} h="600px">
          <GridItem>
            <Card h="full">
              <CardHeader>
                <Heading size="md">Interactive Learning Path</Heading>
              </CardHeader>
              <CardBody p={0}>
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onNodeClick={onNodeClick}
                  fitView
                >
                  <Controls />
                  <MiniMap />
                  <Background variant="dots" gap={12} size={1} />
                </ReactFlow>
              </CardBody>
            </Card>
          </GridItem>
          
          <GridItem>
            {selectedNodeId && (
              <ResourcesList 
                nodeId={selectedNodeId}
              />
            )}
          </GridItem>
        </Grid>
      </Container>

      {/* Modals */}
      {showQuiz && selectedNode && (
        <NodeQuiz
          isOpen={showQuiz}
          onClose={() => setShowQuiz(false)}
          onComplete={handleQuizComplete}
          quiz={selectedNode.data.quiz}
        />
      )}

      {showAssignment && selectedNode && (
        <NodeAssignment
          isOpen={showAssignment}
          onClose={() => setShowAssignment(false)}
          onComplete={handleAssignmentComplete}
          assignment={selectedNode.data.assignment}
        />
      )}

      {showPeerEvaluation && selectedNode && (
        <PeerEvaluation
          isOpen={showPeerEvaluation}
          onClose={() => setShowPeerEvaluation(false)}
          onComplete={handlePeerEvaluationComplete}
        />
      )}

      {showCertificate && (
        <CertificateGenerator
          isOpen={showCertificate}
          onClose={() => setShowCertificate(false)}
          courseName="React Mastery"
          studentName="Your Name"
          date={new Date().toLocaleDateString()}
          isEligible={certificateEligible}
        />
      )}
    </Box>
  );
};

export default ReactRoadmap;