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
import { databaseRoadmap } from '../../../data/databaseRoadmap';
import databaseQuizzes from '../../../data/databaseQuizzes';
import databaseAssignments from '../../../data/databaseAssignments';

// Transform roadmap data to include quiz and assignment data
const databaseRoadmapData = {
  nodes: databaseRoadmap.nodes.map(node => {
    const transformedNode = { ...node };
    
    // Add quiz data if it's a quiz node
    if (node.data.type === 'quiz') {
      const quizId = node.id;
      if (databaseQuizzes[quizId]) {
        transformedNode.data.quiz = {
          questions: databaseQuizzes[quizId].questions.map(q => ({
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
      if (databaseAssignments[assignmentId]) {
        const assignment = databaseAssignments[assignmentId];
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
  edges: databaseRoadmap.edges
};

const DatabaseRoadmap = () => {
  // Transform nodes to use default React Flow node types
  const transformedNodes = databaseRoadmapData.nodes.map(node => ({
    ...node,
    type: 'default',
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
  const [edges, setEdges, onEdgesChange] = useEdgesState(databaseRoadmapData.edges);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const [assignmentOpen, setAssignmentOpen] = useState(false);
  const [peerEvalOpen, setPeerEvalOpen] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  // Contexts
  const { completedNodes, markNodeAsCompleted, isNodeCompleted } = useCompletedNodes();
  const { awardXP, completeQuiz, completeAssignment, completeLesson } = useXP();
  const navigate = useNavigate();
  const toast = useToast();

  // Color mode
  const bgGradient = useColorModeValue(
    'linear(to-br, teal.50, cyan.50, blue.50)',
    'linear(to-br, gray.900, teal.900, cyan.900)'
  );
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'white');

  // Constants
  const roadmapId = 'database';
  const courseId = 'database';
  const completedNodeIds = completedNodes[roadmapId] || [];
  const totalNodes = transformedNodes.length;
  const completedCount = completedNodeIds.length;
  const progressPercentage = totalNodes > 0 ? (completedCount / totalNodes) * 100 : 0;

  // Get selected node data from original roadmap data
  const selectedNodeData = selectedNodeId ? databaseRoadmapData.nodes.find(n => n.id === selectedNodeId) : null;

  // Handle node click
  const onNodeClick = useCallback((event, node) => {
    setSelectedNodeId(node.id);
    // Don't auto-open modals, let user choose from right panel
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
          <Heading size="2xl" textAlign="center">Database Management Mastery</Heading>
          
          {/* Progress Stats */}
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6} w="full">
            <Stat textAlign="center">
              <StatLabel>Progress</StatLabel>
              <StatNumber>{Math.round(progressPercentage)}%</StatNumber>
              <StatHelpText>
                <CircularProgress value={progressPercentage} color="teal.400" size="60px">
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
              <StatNumber>Database</StatNumber>
              <StatHelpText>SQL & NoSQL</StatHelpText>
            </Stat>
            
            <Stat textAlign="center">
              <StatLabel>Difficulty</StatLabel>
              <StatNumber>Intermediate</StatNumber>
              <StatHelpText>to Advanced</StatHelpText>
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
            {selectedNodeId && selectedNodeData ? (
              <Card bg={cardBg} h="full">
                <CardHeader>
                  <VStack align="start" spacing={2}>
                    <Heading size="md" color={textColor}>{selectedNodeData.data.label}</Heading>
                    <Badge colorScheme="blue" borderRadius="full" px={3}>
                      {selectedNodeData.data.type}
                    </Badge>
                  </VStack>
                </CardHeader>
                
                <CardBody>
                  <VStack align="start" spacing={4}>
                    <Text color="gray.600" fontSize="sm">
                      {selectedNodeData.data.description}
                    </Text>
                    
                    <Divider />
                    
                    {selectedNodeData.data.topics && (
                      <VStack align="start" spacing={2} w="full">
                        <Text fontWeight="bold" color={textColor}>Topics Covered:</Text>
                        {selectedNodeData.data.topics.map((topic, index) => (
                          <HStack key={index} spacing={2}>
                            <Icon as={FiCheckCircle} color="green.500" boxSize={3} />
                            <Text fontSize="sm" color="gray.600">{topic}</Text>
                          </HStack>
                        ))}
                      </VStack>
                    )}
                    
                    {selectedNodeData.data.resources && (
                      <>
                        <Divider />
                        <VStack align="start" spacing={2} w="full">
                          <Text fontWeight="bold" color={textColor}>Learning Resources:</Text>
                          {selectedNodeData.data.resources.map((resource, index) => (
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
                      {selectedNodeData.data.type === 'lesson' && (
                        <Button 
                          colorScheme="green" 
                          w="full"
                          onClick={() => {
                            if (!isNodeCompleted('database', selectedNodeData.id)) {
                              markNodeAsCompleted('database', selectedNodeData.id);
                              awardXP(50, `Completed: ${selectedNodeData.data.label}`);
                              completeLesson('database', selectedNodeData.data.label);
                              
                              toast({ 
                                title: 'Lesson Completed!',
                                description: `You earned 50 XP for completing ${selectedNodeData.data.label}`,
                                status: 'success',
                                duration: 3000,
                                isClosable: true,
                              });
                            }
                          }}
                          isDisabled={isNodeCompleted('database', selectedNodeData.id)}
                        >
                          {isNodeCompleted('database', selectedNodeData.id) ? 'Completed ✓' : 'Mark as Complete'}
                        </Button>
                      )}
                      
                      {selectedNodeData.data.type === 'quiz' && (
                        <Button 
                          colorScheme="blue" 
                          w="full"
                          onClick={() => setQuizOpen(true)}
                        >
                          Take Quiz
                        </Button>
                      )}
                      
                      {(selectedNodeData.data.type === 'assignment' || selectedNodeData.data.type === 'project') && (
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
                        <Text fontSize="sm" color="gray.600">SQL Fundamentals</Text>
                      </HStack>
                      <HStack spacing={2}>
                        <Icon as={FiCheckCircle} color="green.500" boxSize={3} />
                        <Text fontSize="sm" color="gray.600">Database Design</Text>
                      </HStack>
                      <HStack spacing={2}>
                        <Icon as={FiCheckCircle} color="green.500" boxSize={3} />
                        <Text fontSize="sm" color="gray.600">NoSQL Databases</Text>
                      </HStack>
                      <HStack spacing={2}>
                        <Icon as={FiCheckCircle} color="green.500" boxSize={3} />
                        <Text fontSize="sm" color="gray.600">Performance Optimization</Text>
                      </HStack>
                    </VStack>
                    
                    <Divider />
                    
                    <VStack spacing={2} w="full">
                      <Text fontWeight="bold" color={textColor}>Quick Links:</Text>
                      <Button size="sm" variant="outline" w="full" leftIcon={<Icon as={FiBook} />}>
                        Database Documentation
                      </Button>
                      <Button size="sm" variant="outline" w="full" leftIcon={<Icon as={FiCode} />}>
                        Practice Exercises
                      </Button>
                      <Button size="sm" variant="outline" w="full" leftIcon={<Icon as={FiUsers} />}>
                        Community Forum
                      </Button>
                      <Button 
                        size="sm" 
                        colorScheme="yellow" 
                        w="full" 
                        leftIcon={<Icon as={FiAward} />}
                        onClick={() => setShowCertificate(true)}
                      >
                        View Certificate
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
            courseId="database"
          />
        )}

        {showCertificate && (
          <CertificateGenerator
            isOpen={showCertificate}
            onClose={() => setShowCertificate(false)}
            courseId="database"
            courseName="Database Management Mastery"
            completedNodes={completedNodeIds}
            totalNodes={totalNodes}
          />
        )}
      </Container>
    </Box>
  );
};

export default DatabaseRoadmap;
