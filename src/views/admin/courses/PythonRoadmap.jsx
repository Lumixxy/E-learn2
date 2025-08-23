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
import { Button, useToast } from '@chakra-ui/react';
import { loadCourseById } from 'utils/courseDataLoader';
import WebWarriorAPI from 'api/webwarrior';
import NodeQuiz from '../../../components/roadmap/NodeQuiz';
import NodeAssignment from '../../../components/roadmap/NodeAssignment';
import ResourcesList from '../../../components/roadmap/ResourcesList';
import { useCompletedNodes } from '../../../context/CompletedNodesContext';
import nodeQuizzes from '../../../data/nodeQuizzes';

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
  const [assignmentScores, setAssignmentScores] = useState({});
  const toast = useToast();
  const { isNodeCompleted, markNodeAsCompleted } = useCompletedNodes();

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
  }, [courseId, setNodes, setEdges]);

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
  }, [roadmapData, setNodes, setEdges]);

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

  // Handle node click: Show node info in right panel, with option to take quiz
  const onNodeClick = useCallback(async (event, node) => {
    setSelectedNodeId(node.id);
    
    // We don't automatically open the quiz anymore, just select the node
    // This allows users to see the resources in the right panel first
    
    // We no longer automatically open external links
    // Resources are displayed in the ResourcesList component in the right panel

    const label = String(node?.data?.label || '').toLowerCase();
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
  const handleAssignmentComplete = (score) => {
    if (selectedNodeId) {
      // Store the assignment score
      setAssignmentScores(prev => ({
        ...prev,
        [selectedNodeId]: score
      }));
      
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
              nodes={nodes.map(node => ({
                ...node,
                style: {
                  ...node.style,
                  // Add visual indicator for completed nodes
                  backgroundColor: isNodeCompleted(apiRoadmap?.id || 'python-roadmap', 
                    node.id.startsWith('node-') ? node.id : `node-${node.id}`) 
                    ? '#4ade80' : '#60a5fa',
                  border: isNodeCompleted(apiRoadmap?.id || 'python-roadmap', 
                    node.id.startsWith('node-') ? node.id : `node-${node.id}`) 
                    ? '2px solid #16a34a' : undefined
                }
              }))}
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
        <div style={{ width: '40vw', height: '100vh', overflowY: 'auto', background: 'rgba(255,255,255,0.85)', padding: '48px 32px', zIndex: 2 }}>
          <h2 style={{ color: '#2563eb', fontSize: '2rem', fontWeight: 700, marginBottom: 16 }}>
            {selectedNode?.data?.label}
            {isSelectedNodeCompleted && (
              <span style={{ marginLeft: '10px', color: '#16a34a', fontSize: '1rem' }}>✓ Completed</span>
            )}
          </h2>
          <p style={{ color: '#334155', fontSize: '1.1rem', lineHeight: 1.7 }}>{selectedNode?.data?.description}</p>
          
          {/* Mark as Read/Take Quiz button - always show when a node is selected */}
          {selectedNode && (
            <div style={{ display: 'flex', marginTop: '20px' }}>
              {!isSelectedNodeCompleted && (
                <Button
                  onClick={() => {
                    const roadmapId = apiRoadmap?.id || 'python-roadmap';
                    const nodeId = selectedNodeId.startsWith('node-') ? selectedNodeId : `node-${selectedNodeId}`;
                    
                    // Check if there's a quiz for this node
                    const hasQuiz = nodeQuizzes[nodeId];
                    
                    if (hasQuiz) {
                      // If there's a quiz, open it instead of marking as read directly
                      setQuizOpen(true);
                    } else {
                      // If no quiz, mark as read directly
                      markNodeAsCompleted(roadmapId, nodeId);
                      
                      // Update the nodes to reflect completion status
                      setNodes(nodes => nodes.map(node => {
                        if (node.id === selectedNodeId) {
                          return {
                            ...node,
                            style: {
                              ...node.style,
                              backgroundColor: '#4ade80',
                              border: '2px solid #16a34a'
                            }
                          };
                        }
                        return node;
                      }));
                    }
                  }}
                  colorScheme="green"
                  size="md"
                  mr={2}
                  leftIcon={<span role="img" aria-label="mark-read">✓</span>}
                >
                  {nodeQuizzes[selectedNodeId?.startsWith('node-') ? selectedNodeId : `node-${selectedNodeId}`] ? 'Take Quiz' : 'Mark as Read'}
                </Button>
              )}
              
              {/* Quiz button - show only if a quiz exists for this node and the node is already completed */}
              {isSelectedNodeCompleted && nodeQuizzes[selectedNodeId?.startsWith('node-') ? selectedNodeId : `node-${selectedNodeId}`] && (
                <Button
                  onClick={() => setQuizOpen(true)}
                  colorScheme="blue"
                  size="md"
                  mt={4}
                  leftIcon={<span role="img" aria-label="quiz">📝</span>}
                >
                  Retake Quiz
                </Button>
              )}
            </div>
          )}
          
          {/* Resources section - always show when a node is selected */}
          {selectedNodeId && (
            <div style={{ marginTop: '30px' }}>
              <h3 style={{ color: '#2c3e50', fontSize: '1.5rem', fontWeight: '600', marginBottom: '15px' }}>
                Resources:
              </h3>
              <ResourcesList nodeId={selectedNodeId} />
            </div>
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
    </>
  );
}