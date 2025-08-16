import React, { createContext, useState, useContext, useEffect } from 'react';
import { useXP } from '../contexts/XPContext';

const CompletedNodesContext = createContext();

export const CompletedNodesProvider = ({ children }) => {
  const [completedNodes, setCompletedNodes] = useState({});
  const { addXP } = useXP();

  // Load completed nodes from localStorage on mount
  useEffect(() => {
    const savedNodes = localStorage.getItem('completedNodes');
    if (savedNodes) {
      try {
        setCompletedNodes(JSON.parse(savedNodes));
      } catch (error) {
        console.error('Error parsing completed nodes from localStorage:', error);
      }
    }
  }, []);

  // Save to localStorage whenever completedNodes changes
  useEffect(() => {
    localStorage.setItem('completedNodes', JSON.stringify(completedNodes));
  }, [completedNodes]);

  // Mark a node as completed
  const markNodeAsCompleted = (roadmapId, nodeId) => {
    setCompletedNodes(prev => {
      // Create a new object to ensure state update
      const updated = { ...prev };
      
      // Initialize roadmap entry if it doesn't exist
      if (!updated[roadmapId]) {
        updated[roadmapId] = [];
      }
      
      // Add nodeId if not already in the array
      if (!updated[roadmapId].includes(nodeId)) {
        updated[roadmapId] = [...updated[roadmapId], nodeId];
        // Award XP for completing a new node
        addXP(50, `Completed roadmap node: ${nodeId}`);
      }
      
      return updated;
    });
  };

  // Check if a node is completed
  const isNodeCompleted = (roadmapId, nodeId) => {
    return completedNodes[roadmapId]?.includes(nodeId) || false;
  };

  // Get all completed nodes for a roadmap
  const getCompletedNodesForRoadmap = (roadmapId) => {
    return completedNodes[roadmapId] || [];
  };

  // Calculate completion percentage for a roadmap
  const getRoadmapCompletionPercentage = (roadmapId, totalNodes) => {
    if (!totalNodes || totalNodes === 0) return 0;
    const completed = getCompletedNodesForRoadmap(roadmapId).length;
    return Math.round((completed / totalNodes) * 100);
  };

  return (
    <CompletedNodesContext.Provider
      value={{
        completedNodes,
        markNodeAsCompleted,
        isNodeCompleted,
        getCompletedNodesForRoadmap,
        getRoadmapCompletionPercentage
      }}
    >
      {children}
    </CompletedNodesContext.Provider>
  );
};

export const useCompletedNodes = () => useContext(CompletedNodesContext);