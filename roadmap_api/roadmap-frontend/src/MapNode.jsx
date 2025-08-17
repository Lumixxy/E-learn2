import React from 'react';
import { motion } from 'framer-motion';

const getX = node => node.position_x !== undefined ? node.position_x : 100;
const getY = node => node.position_y !== undefined ? node.position_y : 100;

function MapNode({ node, onClick, children, isCompleted, unlocked }) {
  let fill = '#1976d2'; // default blue
  if (isCompleted) fill = '#43a047'; // green
  else if (!unlocked) fill = '#888'; // gray for locked
  const opacity = unlocked ? 1 : 0.3;

  return (
    <g
      onClick={() => unlocked && onClick && onClick(node)}
      style={{ cursor: unlocked ? 'pointer' : 'default' }}
    >
      <motion.circle
        cx={getX(node)}
        cy={getY(node)}
        r={30}
        fill={fill}
        stroke="#fff"
        strokeWidth={3}
        whileHover={unlocked ? { scale: 1.15 } : false}
        transition={{ type: 'spring', stiffness: 300 }}
        opacity={opacity}
      />
      <text
        x={getX(node)}
        y={getY(node) + 5}
        textAnchor="middle"
        fill="#fff"
        fontSize="14"
        fontFamily="sans-serif"
        pointerEvents="none"
        opacity={opacity}
      >
        {node.label || node.title}
      </text>
      {children}
    </g>
  );
}

export default MapNode; 