import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'react-flow-renderer';

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

  useEffect(() => {
    const fetchRoadmapData = async () => {
      try {
        setLoading(true);
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
  }, []);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)), [setEdges]);

  // Handle node click to update selected node
  const onNodeClick = useCallback((event, node) => {
    setSelectedNodeId(node.id);
  }, []);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  if (loading) {
    return <div>Loading roadmap...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!roadmapData) {
    return <div>No roadmap data available.</div>;
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', display: 'flex' }}>
      <div style={foggyBg} />
      {/* Roadmap left */}
      <div style={{ position: 'relative', zIndex: 1, width: '60vw', height: '100vh', borderRight: '2px solid #b3c6e0', background: 'transparent' }}>
        <ReactFlow
          nodes={nodes}
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
      </div>
      {/* Content right */}
      <div style={{ width: '40vw', height: '100vh', overflowY: 'auto', background: 'rgba(255,255,255,0.85)', padding: '48px 32px', zIndex: 2 }}>
        <h2 style={{ color: '#2563eb', fontSize: '2rem', fontWeight: 700, marginBottom: 16 }}>{selectedNode.data.label}</h2>
        <p style={{ color: '#334155', fontSize: '1.1rem', lineHeight: 1.7 }}>{selectedNode.data.description}</p>
      </div>
    </div>
  );
} 