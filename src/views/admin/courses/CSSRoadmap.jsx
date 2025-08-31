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
  Badge,
  Icon,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  Heading,
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
import { useNavigate, useParams, useNav } from 'react-router-dom';
import { FiCheckCircle, FiPlay, FiBook, FiCode, FiUsers } from 'react-icons/fi';
import NodeQuiz from '../../../components/roadmap/NodeQuiz';
import CodingAssignment from '../../../components/assignment/CodingAssignment';
import PeerEvaluation from '../../../components/assignment/PeerEvaluation';
import CertificateGenerator from '../../../components/certificate/CertificateGenerator';
import ResourcesList from '../../../components/roadmap/ResourcesList';
import { useCompletedNodes } from '../../../context/CompletedNodesContext';
import { useXP } from '../../../contexts/XPContext';
import { cssRoadmap } from '../../../data/cssRoadmap';
import cssQuizzes from '../../../data/cssQuizzes';
import cssAssignments from '../../../data/cssAssignments';

// Transform roadmap data to include quiz and assignment data
const cssRoadmapData = {
  nodes: cssRoadmap.nodes.map(node => {
    const transformedNode = { ...node };
    
    // Add quiz data if it's a quiz node
    if (node.data.type === 'quiz') {
      const quizId = node.id;
      if (cssQuizzes[quizId]) {
        transformedNode.data.quiz = {
          questions: cssQuizzes[quizId].questions.map(q => ({
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
      if (cssAssignments[assignmentId]) {
        const assignment = cssAssignments[assignmentId];
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
  edges: cssRoadmap.edges
};

const CSSRoadmap = () => {
  const navigate = useNavigate();
  const toast = useToast();
  // Transform nodes to use default React Flow node types
  const transformedNodes = cssRoadmapData.nodes.map(node => ({
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
  const [edges, setEdges, onEdgesChange] = useEdgesState(cssRoadmapData.edges);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showAssignment, setShowAssignment] = useState(false);
  const [showPeerEvaluation, setShowPeerEvaluation] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  // Contexts
  const { getCompletedNodeIds, markNodeAsCompleted, isNodeCompleted } = useCompletedNodes();
  const { awardXP, userXP, completeLesson, completeQuiz, completeAssignment } = useXP();

  // Color mode - using dark theme like MIT Python
  const bgGradient = 'linear(to-br, gray.900, blue.900, purple.900)';
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'white');

  // Get completed nodes for CSS roadmap
  const completedNodeIds = getCompletedNodeIds('css-roadmap') || [];

  // Calculate progress
  const totalNodes = nodes.length;
  const completedNodes = completedNodeIds.length;
  const progressPercentage = totalNodes > 0 ? (completedNodes / totalNodes) * 100 : 0;

  // Handle node click
  const onNodeClick = useCallback((event, node) => {
    setSelectedNodeId(node.id);
    setSelectedNode(node);
    
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
        // For lessons, just show resources - don't auto-complete
        break;
    }
  }, []);

  // Handle quiz completion
  const handleQuizComplete = useCallback((score, answers) => {
    const node = nodes.find(n => n.id === selectedNodeId);
    if (!node) return;

    const passed = score >= 70;
    if (passed && !completedNodeIds.includes(selectedNodeId)) {
      markNodeAsCompleted('css-roadmap', selectedNodeId);
      completeQuiz('css', node.data.label, score);
      
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
    const assignmentScores = JSON.parse(localStorage.getItem('assignmentScores_css') || '{}');
    assignmentScores[selectedNodeId] = score;
    localStorage.setItem('assignmentScores_css', JSON.stringify(assignmentScores));

    if (score >= 70 && !completedNodeIds.includes(selectedNodeId)) {
      markNodeAsCompleted('css-roadmap', selectedNodeId);
      completeAssignment('css', node.data.label, score);
      
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
      markNodeAsCompleted('css-roadmap', selectedNodeId);
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

  const currentSelectedNode = nodes.find(n => n.id === selectedNodeId);

  return (
    <Box bgGradient={bgGradient} minH="100vh" p={4}>
      <Container maxW="7xl">
        {/* Header */}
        <VStack spacing={6} mb={8}>
          <Heading size="2xl" textAlign="center">CSS Mastery Roadmap</Heading>
          
          {/* Progress Stats */}
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6} w="full">
            <Stat textAlign="center">
              <StatLabel>Progress</StatLabel>
              <StatNumber>{Math.round(progressPercentage)}%</StatNumber>
              <StatHelpText>
                <CircularProgress value={progressPercentage} color="blue.400" size="60px">
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
              <StatNumber>CSS</StatNumber>
              <StatHelpText>Frontend Styling</StatHelpText>
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
            {selectedNodeId && currentSelectedNode ? (
              <Card bg={cardBg} h="full">
                <CardHeader>
                  <VStack align="start" spacing={2}>
                    <Heading size="md" color={textColor}>{currentSelectedNode.data.label}</Heading>
                    <Badge colorScheme="blue" borderRadius="full" px={3}>
                      {currentSelectedNode.data.type}
                    </Badge>
                  </VStack>
                </CardHeader>
                
                <CardBody>
                  <VStack align="start" spacing={4}>
                    <Text color="gray.600" fontSize="sm">
                      {currentSelectedNode.data.description}
                    </Text>
                    
                    <Divider />
                    
                    {currentSelectedNode.data.topics && (
                      <VStack align="start" spacing={2} w="full">
                        <Text fontWeight="bold" color={textColor}>Topics Covered:</Text>
                        {currentSelectedNode.data.topics.map((topic, index) => (
                          <HStack key={index} spacing={2}>
                            <Icon as={FiCheckCircle} color="green.500" boxSize={3} />
                            <Text fontSize="sm" color="gray.600">{topic}</Text>
                          </HStack>
                        ))}
                      </VStack>
                    )}
                    
                    {currentSelectedNode.data.resources && (
                      <>
                        <Divider />
                        <VStack align="start" spacing={2} w="full">
                          <Text fontWeight="bold" color={textColor}>Learning Resources:</Text>
                          {currentSelectedNode.data.resources.map((resource, index) => (
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
                      {currentSelectedNode.data.type === 'lesson' && (
                        <Button 
                          colorScheme="green" 
                          w="full"
                          onClick={() => {
                            if (!isNodeCompleted('css', currentSelectedNode.id)) {
                              markNodeAsCompleted('css', currentSelectedNode.id);
                              awardXP(50, `Completed: ${currentSelectedNode.data.label}`);
                              completeLesson('css', currentSelectedNode.data.label);
                              
                              toast({ 
                                title: 'Lesson Completed!',
                                description: `You earned 50 XP for completing ${currentSelectedNode.data.label}`,
                                status: 'success',
                                duration: 3000,
                                isClosable: true,
                              });
                            }
                          }}
                          isDisabled={isNodeCompleted('css', currentSelectedNode.id)}
                        >
                          {isNodeCompleted('css', currentSelectedNode.id) ? 'Completed ✓' : 'Mark as Complete'}
                        </Button>
                      )}
                      
                      {currentSelectedNode.data.type === 'quiz' && (
                        <Button 
                          colorScheme="blue" 
                          w="full"
                          onClick={() => setShowQuiz(true)}
                        >
                          Take Quiz
                        </Button>
                      )}
                      
                      {(currentSelectedNode.data.type === 'assignment' || currentSelectedNode.data.type === 'project') && (
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
                        <Text fontSize="sm" color="gray.600">CSS Fundamentals</Text>
                      </HStack>
                      <HStack spacing={2}>
                        <Icon as={FiCheckCircle} color="green.500" boxSize={3} />
                        <Text fontSize="sm" color="gray.600">Flexbox & Grid</Text>
                      </HStack>
                      <HStack spacing={2}>
                        <Icon as={FiCheckCircle} color="green.500" boxSize={3} />
                        <Text fontSize="sm" color="gray.600">Responsive Design</Text>
                      </HStack>
                      <HStack spacing={2}>
                        <Icon as={FiCheckCircle} color="green.500" boxSize={3} />
                        <Text fontSize="sm" color="gray.600">Animations & Effects</Text>
                      </HStack>
                    </VStack>
                    
                    <Divider />
                    
                    <VStack spacing={2} w="full">
                      <Text fontWeight="bold" color={textColor}>Quick Links:</Text>
                      <Button size="sm" variant="outline" w="full" leftIcon={<Icon as={FiBook} />}>
                        CSS Documentation
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
            courseId="css"
          />
        )}

        {showCertificate && (
          <CertificateGenerator
            isOpen={showCertificate}
            onClose={() => setShowCertificate(false)}
            courseId="css"
            courseName="CSS Mastery"
            completedNodes={completedNodeIds}
            totalNodes={totalNodes}
          />
        )}
      </Container>
    </Box>
  );
};

export default CSSRoadmap;
