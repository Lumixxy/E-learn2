import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'react-flow-renderer';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, useToast, Box, Text, Flex, Icon, VStack, Link } from '@chakra-ui/react';
import { loadCourseById } from 'utils/courseDataLoader';
import WebWarriorAPI from 'api/webwarrior';
import NodeQuiz from '../../../components/roadmap/NodeQuiz';
import NodeAssignment from '../../../components/roadmap/NodeAssignment';
import ResourcesList from '../../../components/roadmap/ResourcesList';
import { useCompletedNodes } from '../../../context/CompletedNodesContext';
import nodeQuizzes from '../../../data/nodeQuizzes';
import { FaCertificate, FaLock, FaUnlock, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';

const foggyBg = {
  background: 'linear-gradient(120deg, #e0f2ff 0%, #b3c6e0 100%)',
  filter: 'blur(0px)',
  minHeight: '100vh',
  width: '100vw',
  position: 'absolute',
  zIndex: 0,
};

export default function PythonRoadmap() {
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
  const [certificateEligible, setCertificateEligible] = useState(false);
  const toast = useToast();
  const { isNodeCompleted, markNodeAsCompleted } = useCompletedNodes();

  // Function to check if a node is unlockable based on its dependencies
  const isNodeUnlockable = useCallback((roadmapId, nodeId, dependencies) => {
    // If there are no dependencies, the node is unlockable
    if (!dependencies || dependencies.length === 0) return true;
    
    // Check if all dependencies are completed with at least 85% score
    return dependencies.every(depId => {
      const formattedDepId = depId.startsWith('node-') ? depId : `node-${depId}`;
      return isNodeCompleted(roadmapId, formattedDepId);
    });
  }, [isNodeCompleted]);

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
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#fff',
                textAlign: 'center',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                backgroundColor: isNodeCompleted(rm?.id || 'python-roadmap', `node-${n.node_id}`) ? '#4ade80' : '#60a5fa',
                border: isNodeCompleted(rm?.id || 'python-roadmap', `node-${n.node_id}`) ? '2px solid #16a34a' : undefined
              }
            }));
            
            const nodeIdSet = new Set(apiNodes.map((n) => n.id));
            const apiEdges = [];
            (rm?.nodes || []).forEach((n) => {
              (n.dependencies || []).forEach((dep) => {
                if (nodeIdSet.has(String(dep))) {
                  apiEdges.push({ id: `${dep}->${n.node_id}`, source: String(dep), target: n.node_id, animated: true });
                }
              });
            });
            
            setNodes(apiNodes);
            setEdges(apiEdges);
            if (apiNodes.length > 0) setSelectedNodeId(apiNodes[0].id);
            setRoadmapData(null); // not using static
            return;
          }
        } catch (error) {
          console.warn('Failed to load roadmap from backend API, trying WebWarriorAPI:', error);
          
          // Try WebWarriorAPI as fallback
          if (c?.title) {
            try {
              console.log('Attempting to load roadmap for course:', c.title);
              const rm = await WebWarriorAPI.getRoadmapByTitle(c.title);
              console.log('Roadmap loaded from WebWarriorAPI:', rm);
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
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#fff',
                  textAlign: 'center',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  backgroundColor: isNodeCompleted(rm?.id || 'python-roadmap', `node-${n.node_id}`) ? '#4ade80' : '#60a5fa',
                  border: isNodeCompleted(rm?.id || 'python-roadmap', `node-${n.node_id}`) ? '2px solid #16a34a' : undefined
                }
              }));
              const nodeIdSet = new Set(apiNodes.map((n) => n.id));
              const apiEdges = [];
              (rm?.nodes || []).forEach((n) => {
                (n.dependencies || []).forEach((dep) => {
                  if (nodeIdSet.has(String(dep))) {
                    apiEdges.push({ id: `${dep}->${n.node_id}`, source: String(dep), target: n.node_id, animated: true });
                  }
                });
              });
              setNodes(apiNodes);
              setEdges(apiEdges);
              if (apiNodes.length > 0) setSelectedNodeId(apiNodes[0].id);
              setRoadmapData(null); // not using static
              return;
            } catch (error) {
              console.warn('Failed to load roadmap from WebWarriorAPI, falling back to static data:', error);
              // fall through to static
            }
          }
        }

        // Fallback to static JSON
        const response = await fetch('/data/python/python_roadmap.json');
        if (!response.ok) throw new Error('Failed to fetch python roadmap data');
        const data = await response.json();
        setRoadmapData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRoadmapData();
  }, [courseId, setNodes, setEdges, isNodeCompleted]);

  // Initialize nodes/edges after static roadmap data loads
  useEffect(() => {
    if (!roadmapData) return;
    
    // Transform static nodes to have consistent styling
    if (Array.isArray(roadmapData.nodes)) {
      const styledNodes = roadmapData.nodes.map(node => ({
        ...node,
        type: node.type || 'default',
        style: {
          width: 180,
          height: 60,
          borderRadius: 8,
          padding: '10px',
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#fff',
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          backgroundColor: isNodeCompleted('python-roadmap', node.id.startsWith('node-') ? node.id : `node-${node.id}`) ? '#4ade80' : '#60a5fa',
          border: isNodeCompleted('python-roadmap', node.id.startsWith('node-') ? node.id : `node-${node.id}`) ? '2px solid #16a34a' : undefined,
          ...node.style
        }
      }));
      setNodes(styledNodes);
    }
    
    if (Array.isArray(roadmapData.edges)) setEdges(roadmapData.edges);
    if (roadmapData.nodes && roadmapData.nodes.length > 0) {
      setSelectedNodeId(roadmapData.nodes[0].id);
    }
  }, [roadmapData, setNodes, setEdges, isNodeCompleted]);

  // Load the course to resolve website links for modules/lessons
  useEffect(() => {
    const load = async () => {
      try {
        const c = await loadCourseById(courseId);
        setCourse(c || null);
      } catch (_) {
        setCourse(null);
      }
    };
    load();
  }, [courseId]);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)), [setEdges]);

  // Separate function to handle navigation based on node label
  const handleNodeNavigation = useCallback((label) => {
    if (course?.modules) {
      const matchModuleIndex = course.modules.findIndex((m) => {
        const inModuleTitle = String(m.title).toLowerCase().includes(label);
        const inLessons = (m.lessons || []).some((l) => String(l.title).toLowerCase().includes(label));
        return inModuleTitle || inLessons;
      });
      if (matchModuleIndex >= 0) {
        const module = course.modules[matchModuleIndex];
        const matchingLesson = (module.lessons || []).find((l) => String(l.title).toLowerCase().includes(label));
        const firstLessonWithLink = matchingLesson?.websiteLink ? matchingLesson : (module.lessons || []).find((l) => l.websiteLink);
        const targetUrl = firstLessonWithLink?.websiteLink;
        if (targetUrl) {
          window.open(targetUrl, '_blank', 'noopener,noreferrer');
          return;
        }
        navigate(`/admin/courses/${courseId}/learn?moduleIndex=${matchModuleIndex}`);
        return;
      }
    }
  }, [course, courseId, navigate]);

  // Handle node click: Show node info in right panel, with option to take quiz
  const onNodeClick = useCallback(async (event, node) => {
    // Get node dependencies from the edges
    const nodeId = node.id;
    const nodeDependencies = edges
      .filter(edge => edge.target === nodeId)
      .map(edge => edge.source);
    
    // Format dependencies to match the format used in CompletedNodesContext
    const formattedDependencies = nodeDependencies.map(depId => 
      depId.startsWith('node-') ? depId : `node-${depId}`
    );
    
    // Check if the node is unlockable (all dependencies completed)
    const roadmapId = apiRoadmap?.id || 'python-roadmap';
    const formattedNodeId = nodeId.startsWith('node-') ? nodeId : `node-${nodeId}`;
    const isUnlockable = isNodeCompleted(roadmapId, formattedNodeId) || 
                        nodeDependencies.length === 0 || 
                        isNodeUnlockable(roadmapId, formattedNodeId, formattedDependencies);
    
    if (!isUnlockable) {
      // Show a toast notification that the node is locked
      toast({
        title: "Node Locked",
        description: "You need to complete the prerequisite nodes with at least 85% score first.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    // If the node is unlockable or already completed, proceed with selection
    setSelectedNodeId(node.id);
    
    // We don't automatically open the quiz anymore, just select the node
    // This allows users to see the resources in the right panel first
    
    // We no longer automatically open external links
    // Resources are displayed in the ResourcesList component in the right panel

    const label = String(node?.data?.label || '').toLowerCase();
    handleNodeNavigation(label);
  }, [edges, toast, apiRoadmap, isNodeCompleted, isNodeUnlockable, handleNodeNavigation]);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  if (loading) {
    return <div>Loading roadmap...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!roadmapData && !apiRoadmap) {
    return <div>No roadmap data available.</div>;
  }

  // Determine if the selected node is completed
  const isSelectedNodeCompleted = selectedNodeId ? 
    isNodeCompleted(
      apiRoadmap?.id || 'python-roadmap', 
      selectedNodeId.startsWith('node-') ? selectedNodeId : `node-${selectedNodeId}`
    ) : false;
    
  // Debug information
  console.log('Nodes:', nodes);
  console.log('Edges:', edges);
  console.log('API Roadmap:', apiRoadmap);
    
  // Handle quiz completion
  const handleQuizComplete = (score, xp, passed) => {
    if (passed && selectedNodeId) {
      // After passing the quiz, show the assignment
      setQuizOpen(false);
      setAssignmentOpen(true);
      return;
    }
    setQuizOpen(false);
  };

  // Handle assignment completion
  const handleAssignmentComplete = (score, passed) => {
    if (selectedNodeId) {
      // Only mark as completed if passed
      if (passed) {
        setCompletedAssignments(prev => ({
          ...prev,
          [selectedNodeId]: true
        }));

        // Mark the node as completed in the CompletedNodesContext
        const roadmapId = apiRoadmap?.id || 'python-roadmap';
        const nodeId = selectedNodeId.startsWith('node-') ? selectedNodeId : `node-${selectedNodeId}`;
        markNodeAsCompleted(roadmapId, nodeId);
        
        // Update the nodes to reflect completion status
        setNodes(nodes => nodes.map(node => {
          if (node.id === selectedNodeId) {
            return {
              ...node,
              style: {
                ...node.style,
                background: '#4ade80',
                border: '2px solid #16a34a'
              }
            };
          }
          return node;
        }));
        
        toast({
          title: "Assignment completed",
          description: `You scored ${score}% on this assignment.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        
        // Check if all nodes are completed to enable certificate
        const allNodesCompleted = nodes.every(node => {
          const nodeId = node.id.startsWith('node-') ? node.id : `node-${node.id}`;
          return isNodeCompleted(apiRoadmap?.id || 'python-roadmap', nodeId);
        });
        
        // Get assignment scores from localStorage
        const storedAssignmentScores = localStorage.getItem(`assignmentScores_${courseId}`);
        let assignmentScores = {};
        let averageScore = 0;
        
        if (storedAssignmentScores) {
          assignmentScores = JSON.parse(storedAssignmentScores);
          
          // Calculate average score if there are any assignments completed
          if (Object.keys(assignmentScores).length > 0) {
            const totalScore = Object.values(assignmentScores).reduce((sum, score) => sum + score, 0);
            averageScore = totalScore / Object.keys(assignmentScores).length;
          }
        }
        
        // Update assignment scores with the current assignment
        // Always update the score to allow for retaking assignments
        assignmentScores[nodeId] = score;
        localStorage.setItem(`assignmentScores_${courseId}`, JSON.stringify(assignmentScores));
        
        // Recalculate average after adding or updating score
        const totalScore = Object.values(assignmentScores).reduce((sum, score) => sum + score, 0);
        averageScore = totalScore / Object.keys(assignmentScores).length;
        
        // Check if all nodes are completed AND average score is at least 85%
        if (allNodesCompleted && averageScore >= 85) {
          setCertificateEligible(true);
          toast({
            title: "Congratulations!",
            description: "You've completed all assignments with an average score of " + averageScore.toFixed(1) + "%. You are now eligible for a certificate!",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } else if (allNodesCompleted && averageScore < 85) {
          toast({
            title: "Almost there!",
            description: "You've completed all assignments, but your average score is " + averageScore.toFixed(1) + "%. You need at least 85% to earn your certificate.",
            status: "warning",
            duration: 5000,
            isClosable: true,
          });
        }
      } else {
        toast({
          title: "Assignment not passed",
          description: `You scored ${score}%. You need at least 85% to pass this assignment.`,
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      }
    }
    setAssignmentOpen(false);
  };

  // If we have nodes but no roadmapData, we're using API data
  const hasNodes = nodes && nodes.length > 0;

  return (
    <>
      <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', display: 'flex' }}>
        <div style={foggyBg} />
        {/* Roadmap left */}
        <div style={{ position: 'relative', zIndex: 1, width: '60vw', height: '100vh', borderRight: '2px solid #b3c6e0', background: 'transparent' }}>
          {hasNodes ? (
            <ReactFlow
              nodes={nodes.map(node => {
                // Get node dependencies from the edges
                const nodeId = node.id;
                const nodeDependencies = edges
                  .filter(edge => edge.target === nodeId)
                  .map(edge => edge.source);
                
                // Format dependencies to match the format used in CompletedNodesContext
                const formattedDependencies = nodeDependencies.map(depId => 
                  depId.startsWith('node-') ? depId : `node-${depId}`
                );
                
                // Check if the node is unlockable (all dependencies completed)
                const roadmapId = apiRoadmap?.id || 'python-roadmap';
                const formattedNodeId = nodeId.startsWith('node-') ? nodeId : `node-${nodeId}`;
                const isCompleted = isNodeCompleted(roadmapId, formattedNodeId);
                const isUnlockable = isCompleted || 
                                    nodeDependencies.length === 0 || 
                                    isNodeUnlockable(roadmapId, formattedNodeId, formattedDependencies);
                
                // Determine node style based on completion and unlockable status
                let backgroundColor = '#60a5fa'; // Default blue for unlocked nodes
                let border = undefined;
                let opacity = 1;
                let cursor = 'pointer';
                
                if (isCompleted) {
                  backgroundColor = '#4ade80'; // Green for completed nodes
                  border = '2px solid #16a34a';
                } else if (!isUnlockable) {
                  backgroundColor = '#9ca3af'; // Gray for locked nodes
                  opacity = 0.7;
                  cursor = 'not-allowed';
                }
                
                return {
                  ...node,
                  style: {
                    ...node.style,
                    backgroundColor,
                    border,
                    opacity,
                    cursor
                  }
                };
              })}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              fitView
              style={{ background: 'transparent', width: '100%', height: '100%' }}
              onNodeClick={onNodeClick}
            >
              <MiniMap nodeColor={() => '#60a5fa'} maskColor="#e0f2ff88" />
              <Controls />
              <Background color="#b3d8fd" gap={32} />
            </ReactFlow>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <div>No roadmap data available.</div>
            </div>
          )}
        </div>
        {/* Content right */}
        <div style={{ width: '40vw', height: '100vh', overflowY: 'auto', background: 'rgba(255,255,255,0.95)', padding: '32px', zIndex: 2, borderLeft: '1px solid #e2e8f0' }}>
          {selectedNode ? (
            <>
              {/* Node Header */}
              <Box mb={6}>
                <Text fontSize="2xl" fontWeight="bold" color="blue.600" mb={2}>
                  {selectedNode?.data?.label}
                  {isSelectedNodeCompleted && (
                    <Icon as={FaCheckCircle} color="green.500" ml={3} boxSize={6} />
                  )}
                </Text>
                <Text color="gray.600" fontSize="md" lineHeight="1.6">
                  {selectedNode?.data?.description || `Learn the fundamentals and build your skills.`}
                </Text>
              </Box>
              
              {/* Take Quiz Button - Green button exactly like screenshot */}
              <Box mb={6}>
                <Button
                  onClick={() => {
                    const hasQuiz = nodeQuizzes[selectedNodeId?.startsWith('node-') ? selectedNodeId : `node-${selectedNodeId}`];
                    if (hasQuiz) {
                      setQuizOpen(true);
                    } else {
                      toast({
                        title: "Quiz completed!",
                        description: "Great job! You can now proceed to the next node.",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                      });
                    }
                  }}
                  bg="green.500"
                  color="white"
                  size="lg"
                  width="200px"
                  height="50px"
                  fontSize="16px"
                  fontWeight="bold"
                  borderRadius="8px"
                  _hover={{
                    bg: "green.600",
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                  }}
                  _active={{
                    bg: "green.700",
                    transform: 'translateY(0px)'
                  }}
                  transition="all 0.2s"
                >
                  Take Quiz
                </Button>
              </Box>
              
              {/* Resources Section */}
              <Box>
                <Text fontSize="xl" fontWeight="bold" color="gray.800" mb={4}>
                  Resources
                </Text>
                
                {/* Documentation */}
                <Box mb={4}>
                  <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb={2}>
                    Documentation
                  </Text>
                  <ResourcesList nodeId={selectedNodeId} />
                </Box>
                
                {/* Tutorial */}
                <Box mb={4}>
                  <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb={2}>
                    Tutorial
                  </Text>
                  <VStack spacing={1} align="stretch">
                    <Link 
                      href="https://realpython.com/" 
                      isExternal 
                      color="blue.600" 
                      fontSize="sm"
                      _hover={{ color: 'blue.800', textDecoration: 'underline' }}
                    >
                      Real Python Tutorials ↗
                    </Link>
                    <Text fontSize="xs" color="gray.500">
                      Real Python
                    </Text>
                  </VStack>
                </Box>
              </Box>
            </>
          ) : (
            <Box textAlign="center" py={20}>
              <Icon as={FaInfoCircle} boxSize={16} color="gray.400" mb={4} />
              <Text fontSize="lg" color="gray.500" fontWeight="medium">
                Select a node to view resources and assignments
              </Text>
              <Text fontSize="md" color="gray.400" mt={2}>
                Click on any node in the roadmap to get started
              </Text>
            </Box>
          )}
        </div>
      </div>

      {/* Node Quiz Modal */}
      {selectedNodeId && (
        <NodeQuiz 
          nodeId={selectedNodeId.startsWith('node-') ? selectedNodeId : `node-${selectedNodeId}`}
          roadmapId={apiRoadmap?.id || 'python-roadmap'}
          isOpen={quizOpen}
          onClose={() => setQuizOpen(false)}
          onQuizComplete={handleQuizComplete}
        />
      )}
      
      {/* Node Assignment Modal */}
      {selectedNodeId && (
        <NodeAssignment
          nodeId={selectedNodeId}
          nodeName={selectedNode?.data?.label}
          isOpen={assignmentOpen}
          onClose={() => setAssignmentOpen(false)}
          onAssignmentComplete={handleAssignmentComplete}
        />
      )}
    </>
  );
}