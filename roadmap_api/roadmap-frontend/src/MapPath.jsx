import React from 'react';

function MapPath({ fromNode, toNode, completed }) {
  if (!fromNode || !toNode) return null;
  return (
    <line
      x1={fromNode.position_x}
      y1={fromNode.position_y}
      x2={toNode.position_x}
      y2={toNode.position_y}
      stroke={completed ? '#43a047' : '#888'}
      strokeWidth={3}
      markerEnd="url(#arrowhead)"
    />
  );
}

export default MapPath; 