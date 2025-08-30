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
import CertificateModal from '../../../components/certificate/CertificateModal';
import { mitPythonRoadmap } from '../../../data/mitPythonRoadmap';
import mitPythonQuizzes from '../../../data/mitPythonQuizzes';

const MITPythonRoadmap = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
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

  // Color mode values
  const bgGradient = useColorModeValue(
    'linear(to-br, blue.50, purple.50, pink.50)',
    'linear(to-br, gray.900, purple.900, blue.900)'
  );
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    const initializeRoadmap = () => {
      setLoading(true);
      
      // Create nodes from MIT roadmap data
      const roadmapNodes = mitPythonRoadmap.nodes.map((node) => {
        const nodeCompleted = isNodeCompleted('mit-python', node.id) || isModuleCompleted('mit-python', node.id);
        const hasQuiz = mitPythonQuizzes[node.id];
        const hasAssignment = node.assignment;
        
        return {
          id: node.id,
          type: 'default',
          data: { 
            label: node.title,
            description: node.description,
            lecture: node.lecture,
            topics: node.topics,
            hasQuiz,
            hasAssignment,
            estimatedTime: node.assignment?.estimatedTime || '2-3 hours'
          },
          position: node.position,
          style: {
            width: 220,
            height: 120,
            borderRadius: 16,
            padding: '16px',
            background: nodeCompleted 
              ? 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)' 
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: nodeCompleted ? '3px solid #4CAF50' : '3px solid #667eea',
            boxShadow: nodeCompleted 
              ? '0 8px 32px rgba(76, 175, 80, 0.3)' 
              : '0 8px 32px rgba(102, 126, 234, 0.3)',
            fontWeight: 'bold',
            fontSize: '14px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
          },
        };
      });

      // Create edges from MIT roadmap data
      const roadmapEdges = mitPythonRoadmap.edges.map((edge, index) => ({
        id: `edge-${index}`,
        source: edge.from,
        target: edge.to,
        animated: true,
        style: { 
          stroke: '#667eea', 
          strokeWidth: 3,
          strokeDasharray: '5,5'
        },
        type: 'smoothstep',
      }));

      setNodes(roadmapNodes);
      setEdges(roadmapEdges);
      setLoading(false);
    };

    initializeRoadmap();
  }, [isNodeCompleted, isModuleCompleted, setNodes, setEdges]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleNodeClick = (event, node) => {
    setSelectedNodeId(node.id);
    
    // Find the full node data from MIT roadmap
    const fullNodeData = mitPythonRoadmap.nodes.find(n => n.id === node.id);
    setSelectedNode(fullNodeData);
    
    // Don't auto-open quiz or assignment - let user choose from right panel
  };

  const handleQuizComplete = (score, nodeId) => {
    setQuizOpen(false);
    
    const quiz = mitPythonQuizzes[nodeId];
    
    if (score >= quiz.passingScore) {
      // Award XP for quiz completion
      const xpAmount = score === 100 ? 100 : 50;
      awardXP('quiz', xpAmount, {
        courseId: 'mit-python',
        moduleId: nodeId,
        score: score
      });
      
      // Mark node as completed
      completeLesson('mit-python', nodeId);
      completeModule('mit-python', nodeId);
      
      toast({
        title: "🎉 Quiz Completed!",
        description: `You scored ${score}%! +${xpAmount} XP earned!`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      
      // Force re-render of nodes to show completion
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              style: {
                ...node.style,
                background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                border: '3px solid #4CAF50',
                boxShadow: '0 8px 32px rgba(76, 175, 80, 0.3)',
              },
            };
          }
          return node;
        })
      );
      
      checkCourseCompletion();
    } else {
      toast({
        title: "Quiz Failed",
        description: `You scored ${score}%. You need at least ${quiz.passingScore}% to proceed.`,
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleAssignmentComplete = (score, nodeId) => {
    setAssignmentOpen(false);
    
    const xpResult = completeModule('mit-python', nodeId);
    
    if (score >= 85) {
      toast({
        title: "🎯 Assignment Submitted!",
        description: `Great work! Your assignment is now under peer review. +${xpResult.xpAwarded} XP`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      
      markNodeAsCompleted('mit-python', nodeId, score);
      
      // Update node style
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              style: {
                ...node.style,
                background: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
                border: '3px solid #FF9800',
                boxShadow: '0 8px 32px rgba(255, 152, 0, 0.3)',
              },
            };
          }
          return node;
        })
      );
    }
  };

  const checkCourseCompletion = () => {
    const completedNodes = nodes.filter(node => 
      node.style.background.includes('#4CAF50') || isModuleCompleted('mit-python', node.id)
    );
    
    if (completedNodes.length === nodes.length && !isCourseCompleted('mit-python')) {
      const courseResult = completeCourse('mit-python', 'python');
      
      setTimeout(() => {
        toast({
          title: "🏆 MIT Python Course Completed!",
          description: `Congratulations! You've mastered MIT's Python curriculum! +${courseResult.xpAwarded} XP ${courseResult.leveledUp ? `• Level up to ${courseResult.newLevel}!` : ''}`,
          status: "success",
          duration: 8000,
          isClosable: true,
        });
        
        setTimeout(() => {
          setShowCertificate(true);
        }, 2000);
      }, 1000);
    }
  };

  const getCourseProgress = () => {
    if (!nodes || nodes.length === 0) return 0;
    
    const completedNodes = nodes.filter(node => 
      node.style.background.includes('#4CAF50') || isModuleCompleted('mit-python', node.id)
    );
    
    return Math.round((completedNodes.length / nodes.length) * 100);
  };

  const courseProgress = getCourseProgress();
  const levelInfo = getCurrentLevelInfo();

  if (loading) {
    return (
      <Center minH="100vh" bgGradient={bgGradient}>
        <VStack spacing={4}>
          <Spinner size="xl" color="purple.500" thickness="4px" />
          <Text fontSize="xl" color={textColor}>Loading MIT Python Roadmap...</Text>
        </VStack>
      </Center>
    );
  }

  return (
    <Box minH="100vh" bgGradient={bgGradient}>
      <Container maxW="full" p={6}>
        {/* Header Section */}
        <Card bg={cardBg} shadow="xl" borderRadius="2xl" mb={8} border="1px" borderColor={borderColor}>
          <CardHeader pb={2}>
            <VStack spacing={4} align="center">
              <HStack spacing={3}>
                <Icon as={GiTrophy} color="yellow.500" boxSize={8} />
                <Heading size="xl" color={textColor} textAlign="center">
                  MIT 6.0001: Introduction to Computer Science and Programming in Python
                </Heading>
              </HStack>
              <Text fontSize="lg" color="gray.500" textAlign="center" maxW="2xl">
                Master Python programming through MIT's world-renowned curriculum with interactive quizzes, 
                peer-evaluated assignments, and real-world projects.
              </Text>
            </VStack>
          </CardHeader>
          
          <CardBody pt={2}>
            {/* Stats Grid */}
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6} mb={6}>
              <Stat textAlign="center">
                <StatLabel color="gray.500">Course Progress</StatLabel>
                <StatNumber color={textColor}>{courseProgress}%</StatNumber>
                <Progress value={courseProgress} colorScheme="green" size="lg" borderRadius="full" />
              </Stat>
              
              <Stat textAlign="center">
                <StatLabel color="gray.500">Your Level</StatLabel>
                <StatNumber color={textColor}>Level {levelInfo?.level || 1}</StatNumber>
                <StatHelpText color="purple.500">{levelInfo?.title || 'Beginner'}</StatHelpText>
              </Stat>
              
              <Stat textAlign="center">
                <StatLabel color="gray.500">Total XP</StatLabel>
                <StatNumber color={textColor}>{userXP?.totalXP || 0}</StatNumber>
                <StatHelpText color="blue.500">
                  <Icon as={FiTrendingUp} mr={1} />
                  Keep learning!
                </StatHelpText>
              </Stat>
              
              <Stat textAlign="center">
                <StatLabel color="gray.500">Completion</StatLabel>
                <CircularProgress value={courseProgress} color="green.400" size="60px">
                  <CircularProgressLabel fontSize="sm" fontWeight="bold">
                    {Math.round(courseProgress)}%
                  </CircularProgressLabel>
                </CircularProgress>
              </Stat>
            </SimpleGrid>

            {/* Course Info */}
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              <HStack spacing={3} justify="center">
                <Icon as={FiBook} color="blue.500" />
                <VStack spacing={0} align="start">
                  <Text fontWeight="bold" color={textColor}>12 Lectures</Text>
                  <Text fontSize="sm" color="gray.500">Comprehensive curriculum</Text>
                </VStack>
              </HStack>
              
              <HStack spacing={3} justify="center">
                <Icon as={FiClock} color="orange.500" />
                <VStack spacing={0} align="start">
                  <Text fontWeight="bold" color={textColor}>60+ Hours</Text>
                  <Text fontSize="sm" color="gray.500">Estimated completion</Text>
                </VStack>
              </HStack>
              
              <HStack spacing={3} justify="center">
                <Icon as={FiUsers} color="purple.500" />
                <VStack spacing={3} align="start">
                  <Text fontWeight="bold" color={textColor}>Peer Evaluation</Text>
                  <Text fontSize="sm" color="gray.500">Collaborative learning</Text>
                </VStack>
              </HStack>
            </SimpleGrid>
          </CardBody>
        </Card>

        {/* Main Content Grid */}
        <Grid templateColumns={{ base: '1fr', lg: '3fr 1fr' }} gap={6}>
          {/* Roadmap Section */}
          <GridItem>
            <Card bg={cardBg} shadow="xl" borderRadius="2xl" border="1px" borderColor={borderColor}>
              <CardHeader>
                <Heading size="lg" color={textColor}>
                  <Icon as={FiTarget} mr={3} color="purple.500" />
                  Learning Path
                </Heading>
              </CardHeader>
              <CardBody>
                <Box height="70vh" borderRadius="xl" overflow="hidden" border="2px" borderColor={borderColor}>
                  <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeClick={handleNodeClick}
                    fitView
                    attributionPosition="bottom-left"
                  >
                    <Controls 
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0'
                      }}
                    />
                    <MiniMap 
                      style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0'
                      }}
                      nodeColor="#667eea"
                    />
                    <Background variant="dots" gap={20} size={2} color="#e2e8f0" />
                  </ReactFlow>
                </Box>
              </CardBody>
            </Card>
          </GridItem>

          {/* Resources Panel */}
          <GridItem>
            {selectedNode ? (
              <Card bg={cardBg} shadow="xl" borderRadius="2xl" border="1px" borderColor={borderColor}>
                <CardHeader>
                  <VStack align="start" spacing={2}>
                    <Heading size="md" color={textColor}>{selectedNode.title}</Heading>
                    <Badge colorScheme="purple" borderRadius="full" px={3}>
                      {selectedNode.lecture}
                    </Badge>
                  </VStack>
                </CardHeader>
                
                <CardBody>
                  <VStack align="start" spacing={4}>
                    <Text color="gray.600" fontSize="sm">
                      {selectedNode.description}
                    </Text>
                    
                    <Divider />
                    
                    <VStack align="start" spacing={2} w="full">
                      <Text fontWeight="bold" color={textColor}>Topics Covered:</Text>
                      {selectedNode.topics?.slice(0, 4).map((topic, index) => (
                        <HStack key={index} spacing={2}>
                          <Icon as={FiCheckCircle} color="green.500" boxSize={3} />
                          <Text fontSize="sm" color="gray.600">{topic}</Text>
                        </HStack>
                      ))}
                    </VStack>
                    
                    <Divider />
                    
                    <VStack spacing={4} w="full">
                      {/* Learning Resources */}
                      <VStack spacing={2} w="full">
                        <Text fontWeight="bold" color={textColor} fontSize="sm">📚 Learning Resources</Text>
                        {selectedNode.resources?.map((resource, index) => (
                          <Button
                            key={index}
                            leftIcon={<FiPlay />}
                            variant="outline"
                            size="sm"
                            w="full"
                            onClick={() => window.open(resource.url, '_blank')}
                          >
                            {resource.title}
                          </Button>
                        ))}
                      </VStack>
                      
                      <Divider />
                      
                      {/* Assessment Section */}
                      <VStack spacing={2} w="full">
                        <Text fontWeight="bold" color={textColor} fontSize="sm">🎯 Assessments</Text>
                        
                        {mitPythonQuizzes[selectedNode.id] && (
                          <Button
                            leftIcon={<MdQuiz />}
                            colorScheme="purple"
                            size="sm"
                            w="full"
                            onClick={() => setQuizOpen(true)}
                          >
                            Take Quiz ({mitPythonQuizzes[selectedNode.id].questions.length} questions)
                          </Button>
                        )}
                        
                        {selectedNode.assignment && (
                          <Button
                            leftIcon={<MdAssignment />}
                            colorScheme="orange"
                            size="sm"
                            w="full"
                            onClick={() => setAssignmentOpen(true)}
                          >
                            Start Coding Assignment
                          </Button>
                        )}
                      </VStack>
                      
                      <Divider />
                      
                      {/* Peer Evaluation Section */}
                      <VStack spacing={2} w="full">
                        <Text fontWeight="bold" color={textColor} fontSize="sm">👥 Peer Learning</Text>
                        <Button
                          leftIcon={<FiUsers />}
                          colorScheme="teal"
                          variant="outline"
                          size="sm"
                          w="full"
                          onClick={() => setPeerEvalOpen(true)}
                        >
                          Evaluate Peer Submissions
                        </Button>
                        <Text fontSize="xs" color="gray.500" textAlign="center">
                          Complete 2 evaluations to earn certificates
                        </Text>
                      </VStack>
                    </VStack>
                  </VStack>
                </CardBody>
              </Card>
            ) : (
              <Card bg={cardBg} shadow="xl" borderRadius="2xl" border="1px" borderColor={borderColor}>
                <CardBody>
                  <Center h="300px">
                    <VStack spacing={4} color="gray.500">
                      <Icon as={FiTarget} boxSize={12} />
                      <Text textAlign="center">
                        Click on any node in the roadmap to view resources, take quizzes, and start assignments
                      </Text>
                    </VStack>
                  </Center>
                </CardBody>
              </Card>
            )}
          </GridItem>
        </Grid>

        {/* Certificate Button */}
        {courseProgress === 100 && (
          <Center mt={8}>
            <Button
              leftIcon={<Icon as={FiAward} />}
              colorScheme="yellow"
              size="lg"
              onClick={() => setShowCertificate(true)}
              shadow="xl"
              _hover={{ transform: 'translateY(-2px)', shadow: '2xl' }}
            >
              🏆 View Your MIT Certificate
            </Button>
          </Center>
        )}
        
        {/* Always show certificate button for demo purposes */}
        <Center mt={8}>
          <Button
            leftIcon={<Icon as={FiAward} />}
            colorScheme="gold"
            variant="outline"
            size="md"
            onClick={() => setShowCertificate(true)}
          >
            📜 View Certificate (Demo)
          </Button>
        </Center>
      </Container>

      {/* Modals */}
      {selectedNodeId && quizOpen && (
        <NodeQuiz
          isOpen={quizOpen}
          onClose={() => setQuizOpen(false)}
          nodeId={selectedNodeId}
          onComplete={(score) => handleQuizComplete(score, selectedNodeId)}
          quizData={mitPythonQuizzes[selectedNodeId]}
        />
      )}
      
      {selectedNodeId && assignmentOpen && (
        <CodingAssignment
          isOpen={assignmentOpen}
          onClose={() => setAssignmentOpen(false)}
          courseId="mit-python"
          moduleId={selectedNodeId}
          assignmentId={selectedNodeId}
          onComplete={(score) => handleAssignmentComplete(score, selectedNodeId)}
        />
      )}
      
      {peerEvalOpen && (
        <PeerEvaluation
          isOpen={peerEvalOpen}
          onClose={() => setPeerEvalOpen(false)}
          submissionId="sample-submission"
          courseId="mit-python"
          assignmentData={{
            title: 'MIT Python Problem Set',
            description: 'Evaluate peer coding submissions'
          }}
          onEvaluationComplete={(evaluationCount) => {
            toast({
              title: "🎉 Evaluation Complete!",
              description: `You've completed ${evaluationCount} peer evaluations. ${evaluationCount >= 2 ? 'You\'re now eligible for certificates!' : `${2 - evaluationCount} more needed for certificate eligibility.`}`,
              status: "success",
              duration: 5000,
              isClosable: true,
            });
          }}
        />
      )}
      
      {showCertificate && (
        <CertificateModal
          isOpen={showCertificate}
          onClose={() => setShowCertificate(false)}
          courseData={{
            title: 'MIT 6.0001: Introduction to Computer Science and Programming in Python',
            completionDate: new Date().toISOString(),
            studentName: 'Student Name',
            grade: 'A+'
          }}
          userStats={{
            completedModules: 12,
            quizzesPassed: 12,
            assignmentsSubmitted: 6,
            peerEvaluations: 2,
            overallScore: 95
          }}
        />
      )}
    </Box>
  );
};

export default MITPythonRoadmap;
