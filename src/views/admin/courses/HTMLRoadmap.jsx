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
import { FiAward, FiTarget, FiTrendingUp, FiBook, FiPlay, FiCheckCircle, FiClock, FiUsers, FiCode } from 'react-icons/fi';
import { GiAchievement, GiTrophy } from 'react-icons/gi';
import { MdQuiz, MdAssignment } from 'react-icons/md';
import NodeQuiz from '../../../components/roadmap/NodeQuiz';
import CodingAssignment from '../../../components/assignment/CodingAssignment';
import PeerEvaluation from '../../../components/assignment/PeerEvaluation';
import CertificateGenerator from '../../../components/certificate/CertificateGenerator';
import ResourcesList from '../../../components/roadmap/ResourcesList';
import { useCompletedNodes } from '../../../context/CompletedNodesContext';
import { useXP } from '../../../contexts/XPContext';
import { htmlRoadmap } from '../../../data/htmlRoadmap';
import htmlQuizzes from '../../../data/htmlQuizzes';
import htmlAssignments from '../../../data/htmlAssignments';

// Transform roadmap data to include quiz and assignment data
const htmlRoadmapData = {
  nodes: htmlRoadmap.nodes.map(node => {
    const transformedNode = { ...node };
    
    // Add quiz data if it's a quiz node
    if (node.data.type === 'quiz') {
      const quizId = node.id;
      if (htmlQuizzes[quizId]) {
        transformedNode.data.quiz = {
          questions: htmlQuizzes[quizId].questions.map(q => ({
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
      if (htmlAssignments[assignmentId]) {
        const assignment = htmlAssignments[assignmentId];
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
  edges: htmlRoadmap.edges
};

const HTMLRoadmap = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  
  // Transform nodes to use default React Flow node types
  const transformedNodes = htmlRoadmapData.nodes.map(node => ({
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

  // Log the courseId for debugging
  console.log('HTMLRoadmap mounted with courseId:', courseId);
  console.log('HTML roadmap data:', htmlRoadmapData);
  console.log('Transformed nodes:', transformedNodes);

  const [nodes, setNodes, onNodesChange] = useNodesState(transformedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(htmlRoadmapData.edges);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showAssignment, setShowAssignment] = useState(false);
  const [showPeerEvaluation, setShowPeerEvaluation] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [loading, setLoading] = useState(false);

  // Contexts
  const { getCompletedNodeIds, markNodeAsCompleted, isNodeCompleted } = useCompletedNodes();
  const { awardXP, userXP, completeLesson, completeQuiz, completeAssignment } = useXP();

  // Color mode values - Dark theme like MIT Python
  const bgGradient = useColorModeValue(
    'linear(to-br, blue.50, purple.50, pink.50)',
    'linear(to-br, gray.900, purple.900, blue.900)'
  );
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Get completed nodes for the specific course
  const roadmapId = `${courseId}-roadmap`;
  const completedNodeIds = getCompletedNodeIds(roadmapId) || [];

  // Calculate progress
  const totalNodes = nodes.length;
  const completedNodes = completedNodeIds.length;
  const progressPercentage = totalNodes > 0 ? (completedNodes / totalNodes) * 100 : 0;

  // Handle node click
  const onNodeClick = useCallback((event, node) => {
    setSelectedNodeId(node.id);
    
    switch (node.data.type) {
      case 'quiz':
        setShowQuiz(true);
        break;
      case 'assignment':
        setShowAssignment(true);
        break;
      case 'peer-evaluation':
        setShowPeerEvaluation(true);
        break;
      case 'certificate':
        setShowCertificate(true);
        break;
      default:
        // For lessons, mark as completed and award XP
        if (!completedNodeIds.includes(node.id)) {
          markNodeAsCompleted(roadmapId, node.id);
          completeLesson(courseId, node.data.label, 50);
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
  }, [completedNodeIds, markNodeAsCompleted, completeLesson, toast]);

  // Handle quiz completion
  const handleQuizComplete = useCallback((score, answers) => {
    const node = nodes.find(n => n.id === selectedNodeId);
    if (!node) return;

    const passed = score >= 70;
    if (passed && !completedNodeIds.includes(selectedNodeId)) {
      markNodeAsCompleted(roadmapId, selectedNodeId);
      completeQuiz(courseId, node.data.label, score);
      
      toast({
        title: 'Quiz Completed!',
        description: `You scored ${score}% and earned ${score} XP!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
    
    setShowQuiz(false);
    setSelectedNodeId(null);
  }, [selectedNodeId, nodes, completedNodeIds, markNodeAsCompleted, completeQuiz, toast]);

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
    
    setShowAssignment(false);
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
    
    setShowPeerEvaluation(false);
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

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  return (
    <Box bgGradient={bgGradient} minH="100vh" p={4}>
      <Container maxW="7xl">
        {/* Header */}
        <VStack spacing={6} mb={8}>
          <Heading size="2xl" textAlign="center">HTML Mastery Roadmap</Heading>
          
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
              <StatNumber>{completedNodes}/{totalNodes}</StatNumber>
              <StatHelpText>Lessons & Activities</StatHelpText>
            </Stat>
            
            <Stat textAlign="center">
              <StatLabel>Total XP</StatLabel>
              <StatNumber>{userXP.totalXP}</StatNumber>
              <StatHelpText>Experience Points</StatHelpText>
            </Stat>
            
            <Stat textAlign="center">
              <StatLabel>Course</StatLabel>
              <StatNumber>HTML</StatNumber>
              <StatHelpText>Frontend Development</StatHelpText>
            </Stat>
          </SimpleGrid>
        </VStack>

        {/* Main Content */}
        <Grid templateColumns="3fr 1fr" gap={6} h="600px">
          <GridItem>
            <Card bg={cardBg} h="full">
              <CardHeader>
                <Heading size="md">Interactive Roadmap</Heading>
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
            {selectedNodeId && selectedNode ? (
              <Card bg={cardBg} h="full">
                <CardHeader>
                  <VStack align="start" spacing={2}>
                    <Heading size="md" color={textColor}>{selectedNode.data.label}</Heading>
                    <Badge colorScheme="blue" borderRadius="full" px={3}>
                      {selectedNode.data.type}
                    </Badge>
                  </VStack>
                </CardHeader>
                
                <CardBody>
                  <VStack align="start" spacing={4}>
                    <Text color="gray.600" fontSize="sm">
                      {selectedNode.data.description}
                    </Text>
                    
                    <Divider />
                    
                    {selectedNode.data.topics && (
                      <VStack align="start" spacing={2} w="full">
                        <Text fontWeight="bold" color={textColor}>Topics Covered:</Text>
                        {selectedNode.data.topics.map((topic, index) => (
                          <HStack key={index} spacing={2}>
                            <Icon as={FiCheckCircle} color="green.500" boxSize={3} />
                            <Text fontSize="sm" color="gray.600">{topic}</Text>
                          </HStack>
                        ))}
                      </VStack>
                    )}
                    
                    {selectedNode.data.resources && (
                      <>
                        <Divider />
                        <VStack align="start" spacing={2} w="full">
                          <Text fontWeight="bold" color={textColor}>Learning Resources:</Text>
                          {selectedNode.data.resources.map((resource, index) => (
                            <Button
                              key={index}
                              size="sm"
                              variant="outline"
                              w="full"
                              leftIcon={<Icon as={resource.type === 'video' ? FiPlay : resource.type === 'article' ? FiBook : FiCode} />}
                              onClick={() => window.open(resource.url, '_blank')}
                            >
                              {resource.title}
                            </Button>
                          ))}
                        </VStack>
                      </>
                    )}
                    
                    <Divider />
                    
                    <VStack spacing={2} w="full">
                      {selectedNode.data.type === 'lesson' && (
                        <Button 
                          colorScheme="green" 
                          w="full"
                          onClick={() => {
                            if (!isNodeCompleted('html', selectedNode.id)) {
                              markNodeAsCompleted('html', selectedNode.id);
                              awardXP(50, `Completed: ${selectedNode.data.label}`);
                              completeLesson('html', selectedNode.data.label);
                              
                              toast({ 
                                title: 'Lesson Completed!',
                                description: `You earned 50 XP for completing ${selectedNode.data.label}`,
                                status: 'success',
                                duration: 3000,
                                isClosable: true,
                              });
                            }
                          }}
                          isDisabled={isNodeCompleted('html', selectedNode.id)}
                        >
                          {isNodeCompleted('html', selectedNode.id) ? 'Completed ✓' : 'Mark as Complete'}
                        </Button>
                      )}
                      
                      {selectedNode.data.type === 'quiz' && (
                        <Button 
                          colorScheme="blue" 
                          w="full"
                          onClick={() => setShowQuiz(true)}
                        >
                          Take Quiz
                        </Button>
                      )}
                      
                      {(selectedNode.data.type === 'assignment' || selectedNode.data.type === 'project') && (
                        <Button 
                          colorScheme="purple" 
                          w="full"
                          onClick={() => setShowAssignment(true)}
                        >
                          Start Assignment
                        </Button>
                      )}
                    </VStack>
                  </VStack>
                </CardBody>
              </Card>
            ) : (
              <Card bg={cardBg} h="full">
                <CardHeader>
                  <Heading size="md" color={textColor}>Course Resources</Heading>
                </CardHeader>
                <CardBody>
                  <VStack align="start" spacing={4}>
                    <Text color="gray.600" fontSize="sm">
                      Click on any node in the learning path to view specific resources and materials.
                    </Text>
                    
                    <Divider />
                    
                    <VStack align="start" spacing={2} w="full">
                      <Text fontWeight="bold" color={textColor}>Course Overview:</Text>
                      <HStack spacing={2}>
                        <Icon as={FiCheckCircle} color="green.500" boxSize={3} />
                        <Text fontSize="sm" color="gray.600">HTML Structure</Text>
                      </HStack>
                      <HStack spacing={2}>
                        <Icon as={FiCheckCircle} color="green.500" boxSize={3} />
                        <Text fontSize="sm" color="gray.600">Semantic Elements</Text>
                      </HStack>
                      <HStack spacing={2}>
                        <Icon as={FiCheckCircle} color="green.500" boxSize={3} />
                        <Text fontSize="sm" color="gray.600">Forms & Accessibility</Text>
                      </HStack>
                      <HStack spacing={2}>
                        <Icon as={FiCheckCircle} color="green.500" boxSize={3} />
                        <Text fontSize="sm" color="gray.600">Best Practices</Text>
                      </HStack>
                    </VStack>
                    
                    <Divider />
                    
                    <VStack spacing={2} w="full">
                      <Text fontWeight="bold" color={textColor}>Quick Links:</Text>
                      <Button size="sm" variant="outline" w="full" leftIcon={<Icon as={FiBook} />}>
                        HTML Documentation
                      </Button>
                      <Button size="sm" variant="outline" w="full" leftIcon={<Icon as={FiCode} />}>
                        Practice Exercises
                      </Button>
                      <Button size="sm" variant="outline" w="full" leftIcon={<Icon as={FiUsers} />}>
                        Community Forum
                      </Button>
                    </VStack>
                  </VStack>
                </CardBody>
              </Card>
            )}
          </GridItem>
        </Grid>

        {/* Modals */}
        {showQuiz && selectedNode && (
          <NodeQuiz
            isOpen={showQuiz}
            onClose={() => setShowQuiz(false)}
            quiz={selectedNode.data.quiz}
            onComplete={handleQuizComplete}
          />
        )}

        {showAssignment && selectedNode && (
          <CodingAssignment
            isOpen={showAssignment}
            onClose={() => setShowAssignment(false)}
            assignment={selectedNode.data.assignment}
            onComplete={handleAssignmentComplete}
          />
        )}

        {showPeerEvaluation && (
          <PeerEvaluation
            isOpen={showPeerEvaluation}
            onClose={() => setShowPeerEvaluation(false)}
            onComplete={handlePeerEvaluationComplete}
            courseId="html"
          />
        )}

        {showCertificate && (
          <CertificateGenerator
            isOpen={showCertificate}
            onClose={() => setShowCertificate(false)}
            courseId="html"
            courseName="HTML Mastery"
            completedNodes={completedNodeIds}
            totalNodes={totalNodes}
          />
        )}
      </Container>
    </Box>
  );
};

export default HTMLRoadmap;
