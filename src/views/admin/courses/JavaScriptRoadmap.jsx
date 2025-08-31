import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
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
import { useNavigate, useParams } from 'react-router-dom';
import { FiAward, FiTarget, FiTrendingUp, FiBook, FiPlay, FiCheckCircle, FiClock, FiUsers } from 'react-icons/fi';
import { GiAchievement, GiTrophy } from 'react-icons/gi';
import { MdQuiz, MdAssignment } from 'react-icons/md';
import NodeQuiz from '../../../components/roadmap/NodeQuiz';
import CodingAssignment from '../../../components/assignment/CodingAssignment';
import PeerEvaluation from '../../../components/assignment/PeerEvaluation';
import CertificateGenerator from '../../../components/certificate/CertificateGenerator';
import ResourcesList from '../../../components/roadmap/ResourcesList';
import { useCompletedNodes } from '../../../context/CompletedNodesContext';
import { useXP } from '../../../contexts/XPContext';
import { javascriptRoadmap } from '../../../data/javascriptRoadmap';
import javascriptQuizzes from '../../../data/javascriptQuizzes';
import javascriptAssignments from '../../../data/javascriptAssignments';

// Transform roadmap data to include quiz and assignment data
const javascriptRoadmapData = {
  nodes: javascriptRoadmap.nodes.map(node => {
    const transformedNode = { ...node };
    
    // Add quiz data if it's a quiz node
    if (node.data.type === 'quiz') {
      const quizId = node.id;
      if (javascriptQuizzes[quizId]) {
        transformedNode.data.quiz = {
          questions: javascriptQuizzes[quizId].questions.map(q => ({
            question: q.question,
            options: q.options,
            correct: q.correct,
            explanation: q.explanation
          }))
        };
      }
    }
    
    // Add assignment data if it's an assignment node
    if (node.data.type === 'assignment') {
      const assignmentId = node.id;
      if (javascriptAssignments[assignmentId]) {
        const assignment = javascriptAssignments[assignmentId];
        transformedNode.data.assignment = {
          title: assignment.title,
          description: assignment.description,
          requirements: assignment.requirements,
          starterCode: assignment.starterCode,
          testCases: assignment.rubric?.map(r => r.criterion) || []
        };
      }
    }
    
    return transformedNode;
  }),
  edges: javascriptRoadmap.edges
};

const JavaScriptRoadmap = () => {
  // Transform nodes to use default React Flow node types
  const transformedNodes = javascriptRoadmapData.nodes.map(node => ({
    ...node,
    type: 'default', // Use default node type for React Flow compatibility
    style: {
      background: node.data.type === 'certificate' ? '#FFD700' : 
                 node.data.type === 'quiz' ? '#4299E1' :
                 node.data.type === 'assignment' ? '#48BB78' : '#E2E8F0',
      color: node.data.type === 'certificate' || node.data.type === 'quiz' || node.data.type === 'assignment' ? 'white' : 'black',
      border: '2px solid #CBD5E0',
      borderRadius: '8px',
      padding: '10px',
      fontSize: '12px',
      width: 180,
      height: 60
    }
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState(transformedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(javascriptRoadmapData.edges);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const [assignmentOpen, setAssignmentOpen] = useState(false);
  const [peerEvalOpen, setPeerEvalOpen] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  // Contexts
  const { completedNodes, markNodeAsCompleted } = useCompletedNodes();
  const { awardXP, completeQuiz, completeAssignment } = useXP();
  const navigate = useNavigate();
  const toast = useToast();

  // Color mode
  const bgGradient = useColorModeValue(
    'linear(to-br, blue.50, purple.50, pink.50)',
    'linear(to-br, gray.900, purple.900, blue.900)'
  );

  // Constants
  const roadmapId = 'javascript';
  const courseId = 'javascript';
  const completedNodeIds = completedNodes[roadmapId] || [];
  const totalNodes = transformedNodes.length;
  const completedCount = completedNodeIds.length;
  const progressPercentage = totalNodes > 0 ? (completedCount / totalNodes) * 100 : 0;

  // Get selected node data
  const selectedNodeData = nodes.find(n => n.id === selectedNodeId);

  // Handle node click
  const onNodeClick = useCallback((event, node) => {
    setSelectedNodeId(node.id);
    
    if (node.data.type === 'quiz') {
      setQuizOpen(true);
    } else if (node.data.type === 'assignment') {
      setAssignmentOpen(true);
    } else if (node.data.type === 'certificate') {
      setShowCertificate(true);
    }
  }, []);

  // Handle quiz completion
  const handleQuizComplete = useCallback((score) => {
    if (score >= 70 && !completedNodeIds.includes(selectedNodeId)) {
      markNodeAsCompleted(roadmapId, selectedNodeId);
      completeQuiz(courseId, selectedNodeData.data.label, score);
      
      toast({
        title: 'Quiz Completed!',
        description: `You scored ${score}% and earned ${score} XP!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
    
    setQuizOpen(false);
    setSelectedNodeId(null);
  }, [selectedNodeId, selectedNodeData, completedNodeIds, markNodeAsCompleted, completeQuiz, toast]);

  // Handle assignment completion
  const handleAssignmentComplete = useCallback((code, score) => {
    const node = nodes.find(n => n.id === selectedNodeId);
    if (!node) return;

    // Store assignment score
    const storageKey = `assignmentScores_${courseId}`;
    const assignmentScores = JSON.parse(localStorage.getItem(storageKey) || '{}');
    assignmentScores[selectedNodeId] = score;
    localStorage.setItem(storageKey, JSON.stringify(assignmentScores));

    if (score >= 70 && !completedNodeIds.includes(selectedNodeId)) {
      markNodeAsCompleted(roadmapId, selectedNodeId);
      completeAssignment(courseId, node.data.label, score);
      
      toast({
        title: 'Assignment Completed!',
        description: `You scored ${score}% and earned ${score} XP!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
    
    setAssignmentOpen(false);
    setSelectedNodeId(null);
  }, [selectedNodeId, nodes, completedNodeIds, markNodeAsCompleted, completeAssignment, toast]);

  // Handle peer evaluation completion
  const handlePeerEvaluationComplete = useCallback(() => {
    if (!completedNodeIds.includes(selectedNodeId)) {
      markNodeAsCompleted(roadmapId, selectedNodeId);
      awardXP(100, 'Peer Evaluation Completed');
      
      toast({
        title: 'Peer Evaluation Completed!',
        description: 'You earned 100 XP for helping your peers!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
    
    setPeerEvalOpen(false);
    setSelectedNodeId(null);
  }, [selectedNodeId, completedNodeIds, markNodeAsCompleted, awardXP, toast]);

  // Update node styles based on completion
  useEffect(() => {
    setNodes(nodes => 
      nodes.map(node => ({
        ...node,
        style: {
          ...node.style,
          backgroundColor: completedNodeIds.includes(node.id) ? '#48BB78' : '#E2E8F0',
          color: completedNodeIds.includes(node.id) ? 'white' : 'black',
          border: selectedNodeId === node.id ? '3px solid #3182CE' : '1px solid #CBD5E0'
        }
      }))
    );
  }, [completedNodeIds, selectedNodeId, setNodes]);

  return (
    <Box bgGradient={bgGradient} minH="100vh" p={4}>
      <Container maxW="7xl">
        {/* Header */}
        <VStack spacing={6} mb={8}>
          <Heading size="2xl" textAlign="center">JavaScript Mastery Roadmap</Heading>
          
          {/* Progress Stats */}
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6} w="full">
            <Stat textAlign="center">
              <StatLabel>Progress</StatLabel>
              <StatNumber>{Math.round(progressPercentage)}%</StatNumber>
              <StatHelpText>
                <CircularProgress value={progressPercentage} color="green.400" size="60px">
                  <CircularProgressLabel>{Math.round(progressPercentage)}%</CircularProgressLabel>
                </CircularProgress>
              </StatHelpText>
            </Stat>
            
            <Stat textAlign="center">
              <StatLabel>Completed</StatLabel>
              <StatNumber>{completedCount}/{totalNodes}</StatNumber>
              <StatHelpText>Lessons & Activities</StatHelpText>
            </Stat>
            
            <Stat textAlign="center">
              <StatLabel>Course</StatLabel>
              <StatNumber>JavaScript</StatNumber>
              <StatHelpText>Frontend Development</StatHelpText>
            </Stat>
            
            <Stat textAlign="center">
              <StatLabel>Difficulty</StatLabel>
              <StatNumber>Beginner</StatNumber>
              <StatHelpText>to Intermediate</StatHelpText>
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

        {/* Modals */}
        {quizOpen && selectedNodeData && (
          <NodeQuiz
            isOpen={quizOpen}
            onClose={() => setQuizOpen(false)}
            quiz={selectedNodeData.data.quiz}
            onComplete={handleQuizComplete}
          />
        )}

        {assignmentOpen && selectedNodeData && (
          <CodingAssignment
            isOpen={assignmentOpen}
            onClose={() => setAssignmentOpen(false)}
            assignment={selectedNodeData.data.assignment}
            onComplete={handleAssignmentComplete}
          />
        )}

        {peerEvalOpen && (
          <PeerEvaluation
            isOpen={peerEvalOpen}
            onClose={() => setPeerEvalOpen(false)}
            onComplete={handlePeerEvaluationComplete}
            courseId="javascript"
          />
        )}

        {showCertificate && (
          <CertificateGenerator
            isOpen={showCertificate}
            onClose={() => setShowCertificate(false)}
            courseId="javascript"
            courseName="JavaScript Frontend Development"
            completedNodes={completedNodeIds}
            totalNodes={totalNodes}
          />
        )}
      </Container>
    </Box>
  );
};

export default JavaScriptRoadmap;
