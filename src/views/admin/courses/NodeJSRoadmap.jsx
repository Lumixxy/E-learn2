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
import { nodejsRoadmap } from '../../../data/nodejsRoadmap';
import nodejsQuizzes from '../../../data/nodejsQuizzes';
import nodejsAssignments from '../../../data/nodejsAssignments';

// Transform roadmap data to include quiz and assignment data
const nodejsRoadmapData = {
  nodes: nodejsRoadmap.nodes.map(node => {
    const transformedNode = { ...node };
    
    // Add quiz data if it's a quiz node
    if (node.data.type === 'quiz') {
      const quizId = node.id;
      if (nodejsQuizzes[quizId]) {
        transformedNode.data.quiz = {
          questions: nodejsQuizzes[quizId].questions.map(q => ({
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
      if (nodejsAssignments[assignmentId]) {
        const assignment = nodejsAssignments[assignmentId];
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
  edges: nodejsRoadmap.edges
};

const NodeJSRoadmap = () => {
  // Transform nodes to use default React Flow node types
  const transformedNodes = nodejsRoadmapData.nodes.map(node => ({
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
  const [edges, setEdges, onEdgesChange] = useEdgesState(nodejsRoadmapData.edges);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
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
    completeQuiz, 
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

  // Get completed nodes for Node.js roadmap
  const completedNodeIds = Object.keys(nodejsRoadmapData.nodes).filter(id => 
    isNodeCompleted('nodejs', id)
  );

  // Calculate progress
  const totalNodes = nodejsRoadmapData.nodes.length;
  const completedNodes = completedNodeIds.length;
  const progressPercentage = totalNodes > 0 ? Math.round((completedNodes / totalNodes) * 100) : 0;

  // Initialize roadmap data
  useEffect(() => {
    const initializeRoadmap = () => {
      setLoading(true);
      
      // Create nodes from roadmap data
      const roadmapNodes = nodejsRoadmapData.nodes.map((node) => {
        const nodeCompleted = isNodeCompleted('nodejs', node.id);
        const hasQuiz = node.data.type === 'quiz';
        const hasAssignment = node.data.type === 'assignment' || node.data.type === 'project';
        
        return {
          id: node.id,
          type: 'default',
          data: {
            ...node.data,
            completed: nodeCompleted,
            hasQuiz,
            hasAssignment,
            onNodeClick: (e) => onNodeClick(e, node)
          },
          position: node.position,
          style: {
            background: nodeCompleted ? '#48BB78' : '#4299E1',
            color: 'white',
            border: '2px solid #CBD5E0',
            borderRadius: '8px',
            padding: '10px',
            width: '200px',
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
      setEdges(nodejsRoadmapData.edges);
      setLoading(false);
    };

    initializeRoadmap();
  }, [isNodeCompleted]);

  // Handle node click
  const onNodeClick = useCallback((event, node) => {
    setSelectedNodeId(node.id);
    // Find the original node data with resources from nodejsRoadmapData
    const originalNode = nodejsRoadmapData.nodes.find(n => n.id === node.id);
    setSelectedNode(originalNode || node);

    switch (node.data.type) {
      case 'quiz':
        setQuizOpen(true);
        break;
      case 'assignment':
      case 'project':
        setAssignmentOpen(true);
        break;
      case 'peer-evaluation':
        setPeerEvalOpen(true);
        break;
      case 'certificate':
        // Check if all required nodes are completed
        const allCompleted = nodejsRoadmapData.nodes.every(n => 
          n.id === node.id || isNodeCompleted('nodejs', n.id)
        );
        
        if (allCompleted) {
          setShowCertificate(true);
          completeCourse('nodejs', 'Node.js Mastery', 1000);
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
        // For lessons, just show resources - don't auto-complete
        break;
    }
  }, [isNodeCompleted, markNodeAsCompleted, awardXP, completeLesson, completeCourse, toast]);

  // Handle quiz completion
  const handleQuizComplete = useCallback((score, answers) => {
    const node = nodejsRoadmapData.nodes.find(n => n.id === selectedNodeId);
    if (!node) return;

    const passed = score >= 70;
    if (passed && !isNodeCompleted('nodejs', selectedNodeId)) {
      markNodeAsCompleted('nodejs', selectedNodeId);
      completeQuiz('nodejs', node.data.label, score);
      
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
  }, [selectedNodeId, isNodeCompleted, markNodeAsCompleted, completeQuiz, toast]);

  // Handle assignment completion
  const handleAssignmentComplete = useCallback((code, score) => {
    const node = nodejsRoadmapData.nodes.find(n => n.id === selectedNodeId);
    if (!node) return;

    // Store assignment score
    const assignmentScores = JSON.parse(localStorage.getItem('assignmentScores_nodejs') || '{}');
    assignmentScores[selectedNodeId] = score;
    localStorage.setItem('assignmentScores_nodejs', JSON.stringify(assignmentScores));

    if (score >= 70 && !isNodeCompleted('nodejs', selectedNodeId)) {
      markNodeAsCompleted('nodejs', selectedNodeId);
      
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
  }, [selectedNodeId, isNodeCompleted, markNodeAsCompleted, toast]);

  // Handle peer evaluation completion
  const handlePeerEvaluationComplete = useCallback(() => {
    if (!isNodeCompleted('nodejs', selectedNodeId)) {
      markNodeAsCompleted('nodejs', selectedNodeId);
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
  }, [selectedNodeId, isNodeCompleted, markNodeAsCompleted, awardXP, toast]);

  const { level, progress, xp, xpToNextLevel } = getCurrentLevelInfo(userXP);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  const selectedNodeData = nodejsRoadmapData.nodes.find(n => n.id === selectedNodeId);

  return (
    <Box bgGradient={bgGradient} minH="100vh" p={4}>
      <Container maxW="7xl" py={8}>
        {/* Header */}
        <VStack spacing={6} mb={8}>
          <Heading size="2xl" textAlign="center" color={textColor}>
            Node.js Backend Development
          </Heading>
          
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
              <StatNumber>{completedNodes}/{totalNodes}</StatNumber>
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
              <StatNumber>Node.js</StatNumber>
              <StatHelpText>Backend Development</StatHelpText>
            </Stat>
          </SimpleGrid>
        </VStack>

        {/* Main Content */}
        <Grid templateColumns="3fr 1fr" gap={6} h="600px">
          <GridItem>
            <Card bg={cardBg} h="full">
              <CardHeader>
                <Heading size="md" color={textColor}>Learning Path</Heading>
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
                            if (!isNodeCompleted('nodejs', selectedNode.id)) {
                              markNodeAsCompleted('nodejs', selectedNode.id);
                              awardXP(50, `Completed: ${selectedNode.data.label}`);
                              completeLesson('nodejs', selectedNode.data.label);
                              
                              toast({ 
                                title: 'Lesson Completed!',
                                description: `You earned 50 XP for completing ${selectedNode.data.label}`,
                                status: 'success',
                                duration: 3000,
                                isClosable: true,
                              });
                            }
                          }}
                          isDisabled={isNodeCompleted('nodejs', selectedNode.id)}
                        >
                          {isNodeCompleted('nodejs', selectedNode.id) ? 'Completed ✓' : 'Mark as Complete'}
                        </Button>
                      )}
                      
                      {selectedNode.data.type === 'quiz' && (
                        <Button 
                          colorScheme="blue" 
                          w="full"
                          onClick={() => setQuizOpen(true)}
                        >
                          Take Quiz
                        </Button>
                      )}
                      
                      {(selectedNode.data.type === 'assignment' || selectedNode.data.type === 'project') && (
                        <Button 
                          colorScheme="purple" 
                          w="full"
                          onClick={() => setAssignmentOpen(true)}
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
                        <Text fontSize="sm" color="gray.600">Node.js Fundamentals</Text>
                      </HStack>
                      <HStack spacing={2}>
                        <Icon as={FiCheckCircle} color="green.500" boxSize={3} />
                        <Text fontSize="sm" color="gray.600">Express.js Framework</Text>
                      </HStack>
                      <HStack spacing={2}>
                        <Icon as={FiCheckCircle} color="green.500" boxSize={3} />
                        <Text fontSize="sm" color="gray.600">Database Integration</Text>
                      </HStack>
                      <HStack spacing={2}>
                        <Icon as={FiCheckCircle} color="green.500" boxSize={3} />
                        <Text fontSize="sm" color="gray.600">API Development</Text>
                      </HStack>
                    </VStack>
                    
                    <Divider />
                    
                    <VStack spacing={2} w="full">
                      <Text fontWeight="bold" color={textColor}>Quick Links:</Text>
                      <Button size="sm" variant="outline" w="full" leftIcon={<Icon as={FiBook} />}>
                        Node.js Documentation
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
        {quizOpen && selectedNodeData && (
          <NodeQuiz
            nodeId={selectedNodeData.id}
            roadmapId="nodejs"
            isOpen={quizOpen}
            onClose={() => setQuizOpen(false)}
            onQuizComplete={handleQuizComplete}
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
            courseId="nodejs"
          />
        )}

        {showCertificate && (
          <CertificateGenerator
            isOpen={showCertificate}
            onClose={() => setShowCertificate(false)}
            courseId="nodejs"
            courseName="Node.js Backend Development"
            completedNodes={completedNodeIds}
            totalNodes={totalNodes}
          />
        )}
      </Container>
    </Box>
  );
};

export default NodeJSRoadmap;
