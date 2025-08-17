import React, { useEffect, useState } from 'react';
import { fetchRoadmaps } from './api.js';
import './App.css';

export default function AdventureRoadmap() {
  const [nodes, setNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchRoadmaps()
      .then(data => {
        console.log('API Response:', data);
        const roadmapData = Array.isArray(data) ? data[0] : data;
        console.log('Roadmap Data:', roadmapData);
        setRoadmap(roadmapData);
        setNodes(roadmapData.nodes || []);
        if (roadmapData.nodes && roadmapData.nodes.length > 0) {
          setSelectedNode(roadmapData.nodes[0]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('API Error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#f5f7fa',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      boxSizing: 'border-box',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        <h1 style={{
          color: '#2c3e50',
          fontSize: '32px',
          fontWeight: 'bold',
          margin: '0'
        }}>
          Course Roadmap
        </h1>
      </div>

      {/* Main Content */}
      <div style={{
        display: 'flex',
        flex: 1,
        gap: '30px',
        maxHeight: 'calc(100vh - 120px)'
      }}>
        {loading && (
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            color: '#666'
          }}>
            Loading roadmap data...
          </div>
        )}
        
        {error && (
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            color: '#d32f2f',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <div>Error loading roadmap: {error}</div>
            <button 
              onClick={() => window.location.reload()}
              style={{
                padding: '10px 20px',
                background: '#2196f3',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Retry
            </button>
          </div>
        )}
        
        {!loading && !error && (
          <>
            {/* Left Section - Flow Diagram */}
            <div style={{
              flex: '1',
              background: 'white',
              borderRadius: '12px',
              padding: '30px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Flow Diagram */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px'
              }}>
                {nodes.map((node, index) => (
                  <div key={node.node_id} style={{ width: '100%' }}>
                    {/* Node */}
                    <div
                      style={{
                        background: selectedNode?.node_id === node.node_id ? '#e3f2fd' : 'white',
                        border: `2px solid ${selectedNode?.node_id === node.node_id ? '#2196f3' : '#e0e0e0'}`,
                        borderRadius: '8px',
                        padding: '20px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: selectedNode?.node_id === node.node_id ? '0 4px 12px rgba(33, 150, 243, 0.2)' : '0 2px 4px rgba(0, 0, 0, 0.1)'
                      }}
                      onClick={() => setSelectedNode(node)}
                    >
                      <h3 style={{
                        margin: '0 0 10px 0',
                        color: '#2c3e50',
                        fontSize: '18px',
                        fontWeight: '600'
                      }}>
                        {node.label}
                      </h3>
                      <p style={{
                        margin: '0',
                        color: '#666',
                        fontSize: '14px',
                        lineHeight: '1.4'
                      }}>
                        {node.description}
                      </p>
                    </div>
                    
                    {/* Connection Line */}
                    {index < nodes.length - 1 && (
                      <div style={{
                        width: '2px',
                        height: '20px',
                        background: '#e0e0e0',
                        margin: '0 auto',
                        marginTop: '10px'
                      }} />
                    )}
                  </div>
                ))}
              </div>

              {/* Toolbar */}
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <button style={{
                  width: '40px',
                  height: '40px',
                  border: 'none',
                  borderRadius: '6px',
                  background: '#f8f9fa',
                  cursor: 'pointer',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>+</button>
                <button style={{
                  width: '40px',
                  height: '40px',
                  border: 'none',
                  borderRadius: '6px',
                  background: '#f8f9fa',
                  cursor: 'pointer',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>-</button>
                <button style={{
                  width: '40px',
                  height: '40px',
                  border: 'none',
                  borderRadius: '6px',
                  background: '#f8f9fa',
                  cursor: 'pointer',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>⤢</button>
                <button style={{
                  width: '40px',
                  height: '40px',
                  border: 'none',
                  borderRadius: '6px',
                  background: '#f8f9fa',
                  cursor: 'pointer',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>🔒</button>
              </div>

              {/* Minimap */}
              <div style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                background: '#f8f9fa',
                borderRadius: '6px',
                padding: '8px',
                fontSize: '12px',
                color: '#666'
              }}>
                React Flow
              </div>
            </div>

            {/* Right Section - Details Panel */}
            {selectedNode && (
              <div style={{
                width: '400px',
                background: 'white',
                borderRadius: '12px',
                padding: '30px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                overflowY: 'auto'
              }}>
                {/* Course Title */}
                <h2 style={{
                  color: '#2196f3',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  margin: '0 0 10px 0'
                }}>
                  {roadmap?.title || 'Course Roadmap'}
                </h2>
                
                {/* Course Description */}
                <p style={{
                  color: '#666',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  margin: '0 0 30px 0'
                }}>
                  {roadmap?.description || 'Course description'}
                </p>

                {/* Selected Node Title */}
                <h3 style={{
                  color: '#2196f3',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  margin: '0 0 15px 0'
                }}>
                  {selectedNode.label}
                </h3>

                {/* Node Description */}
                <p style={{
                  color: '#333',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  margin: '0 0 25px 0'
                }}>
                  {selectedNode.description}
                </p>

                {/* Resources */}
                {selectedNode.resources && selectedNode.resources.length > 0 && (
                  <div>
                    <h4 style={{
                      color: '#2c3e50',
                      fontSize: '16px',
                      fontWeight: '600',
                      margin: '0 0 15px 0'
                    }}>
                      Resources:
                    </h4>
                    <ul style={{
                      listStyle: 'none',
                      padding: '0',
                      margin: '0'
                    }}>
                      {selectedNode.resources.map((resource, index) => (
                        <li key={index} style={{
                          marginBottom: '12px',
                          padding: '12px',
                          background: '#f8f9fa',
                          borderRadius: '6px',
                          border: '1px solid #e9ecef'
                        }}>
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: '#2196f3',
                              textDecoration: 'none',
                              fontWeight: '500',
                              fontSize: '14px',
                              display: 'block',
                              marginBottom: '4px'
                            }}
                          >
                            {resource.title}
                          </a>
                          <span style={{
                            color: '#666',
                            fontSize: '12px'
                          }}>
                            {resource.type && `${resource.type}`}
                            {resource.source && ` - ${resource.source}`}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 