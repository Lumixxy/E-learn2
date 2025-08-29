import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Box, useColorModeValue, Flex, Text, Button, VStack, Heading, useDisclosure, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Badge } from '@chakra-ui/react';
import { useLearning } from '../../contexts/LearningContext';
import { useNavigate } from 'react-router-dom';
import * as Tone from 'tone';

// Define the roadmap data structure
const initialRoadmapData = {
  id: 'root',
  name: 'Start Journey',
  icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>',
  children: [
    {
      id: 'frontend',
      name: 'Front-End',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',
      children: [
        {
          id: 'html',
          name: 'HTML',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>',
          children: []
        },
        {
          id: 'css',
          name: 'CSS',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>',
          children: []
        },
        {
          id: 'javascript',
          name: 'JavaScript',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z"></path><path d="M8 17v-8"></path><path d="M12 17v-8"></path><path d="M16 17v-8"></path></svg>',
          children: []
        },
        {
          id: 'react',
          name: 'React',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"></circle><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path></svg>',
          children: []
        }
      ]
    },
    {
      id: 'backend',
      name: 'Backend',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>',
      children: [
        {
          id: 'java',
          name: 'Java',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>',
          children: []
        },
        {
          id: 'python',
          name: 'Python',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" /></svg>',
          children: []
        },
        {
          id: 'nodejs',
          name: 'Node.js',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M2 6h20M2 12h20M2 18h20"></path></svg>',
          children: []
        },
        {
          id: 'database',
          name: 'Database',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>',
          children: []
        }
      ]
    },
    {
      id: 'ai',
      name: 'AI Eng',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path><path d="M12 2a10 10 0 0 1 10 10h-10V2z"></path><path d="M12 22v-10h10"></path><path d="M12 12v10"></path></svg>',
      children: [
        {
          id: 'machine-learning',
          name: 'ML',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"></path><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path></svg>',
          children: []
        },
        {
          id: 'deep-learning',
          name: 'Deep Learning',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>',
          children: []
        }
      ]
    },
    {
      id: 'devops',
      name: 'DevOps',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-4V4h-4v6H6l6 6 6-6z"></path><path d="M2 18h20"></path></svg>',
      children: [
        {
          id: 'docker',
          name: 'Docker',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12.5c0 1.757-4.254 3.182-9.5 3.182-5.247 0-9.5-1.425-9.5-3.182S7.253 9.318 12.5 9.318c5.247 0 9.5 1.425 9.5 3.182z"></path><path d="M22 12.5v4c0 1.757-4.254 3.182-9.5 3.182-5.247 0-9.5-1.425-9.5-3.182v-4"></path></svg>',
          children: []
        },
        {
          id: 'kubernetes',
          name: 'Kubernetes',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>',
          children: []
        }
      ]
    },
    {
      id: 'mobile',
      name: 'Mobile Dev',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>',
      children: [
        {
          id: 'flutter',
          name: 'Flutter',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3L4 10l4 4 8-8.5V3z"></path><path d="M12 12l-4 4 8 5V12z"></path></svg>',
          children: []
        },
        {
          id: 'react-native',
          name: 'React Native',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"></circle><path d="M12 2a10 10 0 1 0 10 10H12V2z"></path></svg>',
          children: []
        }
      ]
    }
  ]
};

const SkillTreeRoadmap = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const skillTreeRef = useRef(null);
  const rocketRef = useRef(null);
  const navigate = useNavigate();
  const [roadmapData, setRoadmapData] = useState(initialRoadmapData);
  const [selectedNodeId, setSelectedNodeId] = useState('root');
  const [rocketPosition, setRocketPosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [openNodes, setOpenNodes] = useState(new Set(['root']));
  const [nodePositions, setNodePositions] = useState({});
  const nodeRefs = useRef({});
  const [audioInitialized, setAudioInitialized] = useState(false);
  const synth = useRef(null);
  const noise = useRef(null);
  const ambientSynth = useRef(null);
  
  // Function to create particle trail effect
  const createParticleTrail = useCallback((position) => {
    const numParticles = 4; // Increased number of particles for more dramatic effect
    const newParticles = [];
    
    for (let i = 0; i < numParticles; i++) {
      // Add some randomness
      const randomOffset = 12; // Increased offset for wider spread
      const randomX = position.x + (Math.random() * randomOffset * 2 - randomOffset);
      const randomY = position.y + (Math.random() * randomOffset * 2 - randomOffset);
      
      // Add more variety to particle colors
      let particleColor;
      if (i % 3 === 0) {
        particleColor = '#3FE0D0'; // Teal
      } else if (i % 3 === 1) {
        particleColor = '#7F7CFF'; // Purple
      } else {
        particleColor = '#FF4ECD'; // Pink
      }
      
      newParticles.push({
        id: Date.now() + i + Math.random(),
        x: randomX,
        y: randomY,
        size: Math.random() * 6 + 2, // Slightly larger particles
        opacity: 0.8 + Math.random() * 0.2,
        color: particleColor
      });
    }
    
    setParticles(prev => [...prev, ...newParticles]);
    
    // Fade out particles with slightly longer duration
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.some(np => np.id === p.id)));
    }, 1000); // Increased from 800ms to 1000ms
  }, []);
  
  // Learning context for personalization
  const { 
    selectedSkills, 
    updateSelectedSkills, 
    recommendedCourses, 
    generateRecommendations,
    learningPreferences,
    availableCourses
  } = useLearning();
  
  // For recommendations drawer
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // Background colors
  const bgColor = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(23, 25, 35, 0.8)');
  const borderColor = useColorModeValue('rgba(63, 224, 208, 0.3)', 'rgba(127, 124, 255, 0.3)');
  const nodeColor = useColorModeValue('rgba(127, 124, 255, 0.2)', 'rgba(127, 124, 255, 0.3)');
  const nodeBorderColor = useColorModeValue('#7F7CFF', '#3FE0D0');
  const nodeTextColor = useColorModeValue('#2D3748', 'white');
  const connectorColor = useColorModeValue('#3FE0D0', '#7F7CFF');
  
  // Initialize canvas for space background
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let stars = [];
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      if (containerRef.current) {
        canvas.width = containerRef.current.offsetWidth;
        canvas.height = containerRef.current.offsetHeight;
        
        // Create stars
        stars = [];
        const starCount = Math.floor((canvas.width * canvas.height) / 1000);
        for (let i = 0; i < starCount; i++) {
          stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5,
            speed: Math.random() * 0.3 + 0.1
          });
        }
      }
    };
    
    // Animation loop for stars
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      stars.forEach(star => {
        ctx.fillStyle = 'rgba(255, 255, 255, ' + (0.5 + Math.random() * 0.5) + ')';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Move stars upward
        star.y -= star.speed;
        
        // Reset stars that go off screen
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Initialize
    resizeCanvas();
    animate();
    
    // Handle resize
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  // Initialize audio
  const initializeAudio = useCallback(async () => {
    if (audioInitialized) return;
    
    try {
      await Tone.start();
      
      // Create a synth for node clicks
      synth.current = new Tone.Synth({
        oscillator: { type: 'sine' },
        envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 0.5 }
      }).toDestination();
      synth.current.volume.value = -10; // Lower volume
      
      // Create a noise synth for rocket movement
      noise.current = new Tone.NoiseSynth({
        noise: { type: 'white' },
        envelope: { attack: 0.01, decay: 0.1, sustain: 0.05, release: 0.2 }
      }).toDestination();
      noise.current.volume.value = -20; // Lower volume
      
      // Create ambient background synth
      ambientSynth.current = new Tone.PolySynth({
        oscillator: { type: 'sine' },
        envelope: { attack: 0.5, decay: 0.5, sustain: 0.8, release: 2 }
      }).toDestination();
      ambientSynth.current.volume.value = -25; // Very low volume
      
      // Start ambient sound
      const loop = new Tone.Loop(() => {
        ambientSynth.current.triggerAttackRelease(['C3', 'G3', 'E4'], '8n');
      }, '8m').start(0);
      
      Tone.Transport.start();
      setAudioInitialized(true);
    } catch (error) {
      console.error('Failed to initialize audio:', error);
    }
  }, [audioInitialized]);
  
  // Play node click sound
  const playNodeClickSound = useCallback(() => {
    if (!audioInitialized || !synth.current) return;
    
    // Play a bell-like sound
    synth.current.triggerAttackRelease('C5', '16n');
  }, [audioInitialized]);
  
  // Play rocket movement sound
  const playRocketSound = useCallback(() => {
    if (!audioInitialized || !noise.current) return;
    
    // Play a whoosh sound
    noise.current.triggerAttackRelease('16n');
  }, [audioInitialized]);

  // Function to calculate node positions
  const calculateNodePositions = useCallback(() => {
    const positions = {};
    const horizontalSpacing = 200;
    const verticalSpacing = 120;
    const rootX = skillTreeRef.current ? skillTreeRef.current.offsetWidth / 2 : 400;
    const rootY = 80;
    
    // Position the root node
    positions.root = { x: rootX, y: rootY };
    
    // Recursive function to position child nodes
    const positionChildren = (node, parentX, parentY, level, startX) => {
      if (!node.children || node.children.length === 0 || !openNodes.has(node.id)) {
        return { width: 0, lastX: startX };
      }
      
      let currentX = startX;
      const childY = parentY + verticalSpacing;
      let totalWidth = 0;
      
      // First pass: calculate total width needed
      node.children.forEach(child => {
        const childWidth = child.children && child.children.length > 0 && openNodes.has(child.id) ? 
          child.children.length * horizontalSpacing : 
          horizontalSpacing;
        totalWidth += childWidth;
      });
      
      // Center the children under the parent
      currentX = parentX - totalWidth / 2;
      
      // Second pass: position each child
      node.children.forEach(child => {
        const childWidth = child.children && child.children.length > 0 && openNodes.has(child.id) ? 
          child.children.length * horizontalSpacing : 
          horizontalSpacing;
        
        const childX = currentX + childWidth / 2;
        positions[child.id] = { x: childX, y: childY };
        
        // Position this child's children
        if (child.children && child.children.length > 0 && openNodes.has(child.id)) {
          positionChildren(child, childX, childY, level + 1, currentX);
        }
        
        currentX += childWidth;
      });
      
      return { width: totalWidth, lastX: currentX };
    };
    
    // Start positioning from the root
    if (roadmapData.children && roadmapData.children.length > 0) {
      positionChildren(roadmapData, rootX, rootY, 1, 0);
    }
    
    return positions;
  }, [openNodes]);
  
  // Update node positions when openNodes changes
  useEffect(() => {
    if (skillTreeRef.current) {
      const positions = calculateNodePositions();
      setNodePositions(positions);
      
      // If we have a selected node, update rocket position without animation
      if (selectedNodeId && positions[selectedNodeId]) {
        const newPosition = positions[selectedNodeId];
        setRocketPosition(newPosition);
      }
    }
  }, [openNodes, calculateNodePositions, selectedNodeId]);
  
  // Function to toggle node expansion
  const toggleNode = useCallback((nodeId) => {
    // Initialize audio on first interaction
    if (!audioInitialized) {
      initializeAudio();
    }
    
    // Play node click sound
    playNodeClickSound();
    
    setOpenNodes(prev => {
      const newOpenNodes = new Set(prev);
      if (newOpenNodes.has(nodeId)) {
        newOpenNodes.delete(nodeId);
      } else {
        newOpenNodes.add(nodeId);
      }
      return newOpenNodes;
    });
  }, [audioInitialized, initializeAudio, playNodeClickSound]);
  
  // Function to animate rocket movement
   const animateRocket = useCallback((startPos, endPos) => {
     // Calculate angle for rocket rotation
     const angle = Math.atan2(endPos.y - startPos.y, endPos.x - startPos.x);
     
     // Update rocket rotation
     if (rocketRef.current) {
       rocketRef.current.style.transform = `rotate(${angle + Math.PI / 2}rad)`;
     }
     
     // Play rocket movement sound
     if (audioInitialized && noise.current) {
       try {
         noise.current.triggerAttackRelease('16n');
       } catch (error) {
         console.log('Audio error:', error);
       }
     }
     
     // Set the new position after rotation with animation
     const startTime = Date.now();
     const duration = 800; // 800ms animation
     
     const animatePosition = () => {
       const elapsed = Date.now() - startTime;
       const progress = Math.min(elapsed / duration, 1);
       
       // Ease in-out function for smoother animation
       const easeInOut = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
       const easedProgress = easeInOut(progress);
       
       // Calculate current position
       const currentX = startPos.x + (endPos.x - startPos.x) * easedProgress;
       const currentY = startPos.y + (endPos.y - startPos.y) * easedProgress;
       
       // Update rocket position
       setRocketPosition({ x: currentX, y: currentY });
       
       // Create particle at current position with enhanced trail effect
       if (progress < 1) {
         // Create more particles for a more dramatic effect
         createParticleTrail({ x: currentX, y: currentY });
         // Add a second trail with slight offset for richer visual effect
         if (progress > 0.2 && progress < 0.8) {
           createParticleTrail({ 
             x: currentX + (Math.random() * 10 - 5), 
             y: currentY + (Math.random() * 10 - 5) 
           });
           // Add a third trail for even more dramatic effect during peak animation
           if (progress > 0.4 && progress < 0.6) {
             createParticleTrail({ 
               x: currentX + (Math.random() * 15 - 7.5), 
               y: currentY + (Math.random() * 15 - 7.5) 
             });
           }
         }
         requestAnimationFrame(animatePosition);
       } else {
         // Final position reached - create a burst effect
         for (let i = 0; i < 12; i++) {
           setTimeout(() => {
             createParticleTrail({
               x: endPos.x + (Math.random() * 20 - 10),
               y: endPos.y + (Math.random() * 20 - 10)
             });
           }, i * 40);
         }
         setRocketPosition(endPos);
       }
     };
     
     // Start animation
     requestAnimationFrame(animatePosition);
   }, [audioInitialized, createParticleTrail, noise]);
  
  // Function to handle node click
  const handleNodeClick = useCallback((nodeId, node) => {
    // First handle animation and node expansion regardless of node type
    
    // Update selected node
    setSelectedNodeId(nodeId);
    
    // Add pulse animation to the clicked node
    const nodeElement = document.getElementById(`node-${nodeId}`);
    if (nodeElement) {
      // Add and remove the class to trigger animation
      nodeElement.classList.add('node-pulse');
      setTimeout(() => {
        nodeElement.classList.remove('node-pulse');
      }, 500);
    }
    
    // Animate rocket to the clicked node
    if (nodePositions[nodeId]) {
      animateRocket(rocketPosition, nodePositions[nodeId]);
      // Play rocket movement sound
      playRocketSound();
      
      // Create a visual pulse effect at node position
      const nodePosition = nodePositions[nodeId];
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          createParticleTrail({ 
            x: nodePosition.x + (Math.random() * 20 - 10), 
            y: nodePosition.y + (Math.random() * 20 - 10) 
          });
        }, i * 30);
      }
    }
    
    // If node has children, toggle expansion
    if (node.children && node.children.length > 0) {
      toggleNode(nodeId);
    }
    
    // Only redirect if this is a leaf node (no children) or if it's explicitly marked as a redirect node
    if (node.name && (!node.children || node.children.length === 0 || node.forceRedirect)) {
      // Delay redirection to allow animation to complete
      setTimeout(() => {
        navigate(`/admin/courses?skill=${nodeId}`);
      }, 1000); // Delay redirection by 1 second to allow animation to complete
      return;
    }
    
    // If we're here, this is a node with children (subnodes) and we want the user to be able to select them

    // Auto-scroll to bring the node into view if needed
    if (nodeRefs.current[nodeId]) {
      // Use position data instead of DOM element scrollIntoView
      const position = nodeRefs.current[nodeId];
      // Auto-scroll logic could be implemented here if needed
    }
    
    // Update selected skills based on node clicked
    // Map node IDs to skills for personalization
    const skillMap = {
      'html': 'html',
      'css': 'css',
      'javascript': 'javascript',
      'react': 'react',
      'frontend': 'frontend',
      'backend': 'backend',
      'java': 'java',
      'python': 'python',
      'nodejs': 'nodejs',
      'database': 'database',
      'ai': 'ai',
      'machine-learning': 'machine-learning',
      'deep-learning': 'deep-learning',
      'devops': 'devops',
      'mobile': 'mobile-dev'
    };
    
    if (skillMap[nodeId]) {
      // Update selected skills
      const skill = skillMap[nodeId];
      const updatedSkills = selectedSkills.includes(skill) 
        ? selectedSkills.filter(s => s !== skill) // Remove if already selected
        : [...selectedSkills, skill]; // Add if not selected
      
      updateSelectedSkills(updatedSkills);
      
      // Generate recommendations based on selected skills
      generateRecommendations(updatedSkills);
      
      // Open recommendations drawer if we have recommendations
      if (updatedSkills.length > 0) {
        onOpen();
      }
    }
  }, [nodePositions, playRocketSound, rocketPosition, toggleNode, animateRocket, selectedSkills, updateSelectedSkills, generateRecommendations, onOpen, createParticleTrail]);
  
  // Particle trail effect function is now defined earlier in the component
  
  // Recursive function to render nodes
  const renderNode = useCallback((node, parentId = null) => {
    const isOpen = openNodes.has(node.id);
    const isSelected = selectedNodeId === node.id;
    const position = nodePositions[node.id] || { x: 0, y: 0 };
    const hasChildren = node.children && node.children.length > 0;
    
    return (
      <React.Fragment key={node.id}>
        {/* Connector line from parent to this node */}
        {parentId && nodePositions[parentId] && (
          <svg 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 1
            }}
          >
            <path
              d={`M ${nodePositions[parentId].x} ${nodePositions[parentId].y + 25} 
                  C ${nodePositions[parentId].x} ${(nodePositions[parentId].y + position.y) / 2}, 
                    ${position.x} ${(nodePositions[parentId].y + position.y) / 2}, 
                    ${position.x} ${position.y - 25}`}
              stroke={connectorColor}
              strokeWidth="2"
              fill="none"
              strokeDasharray={isOpen ? "none" : "5,5"}
              style={{
                transition: 'all 0.5s ease-in-out',
                animation: isOpen ? 'drawConnector 1s ease forwards' : 'none'
              }}
            />
          </svg>
        )}
        
        {/* Node */}
        <Box
          id={`node-${node.id}`}
          ref={el => {
            if (el) {
              nodeRefs.current[node.id] = { x: position.x, y: position.y };
            }
          }}
          position="absolute"
          left={`${position.x}px`}
          top={`${position.y}px`}
          transform="translate(-50%, -50%)"
          display="inline-flex"
          alignItems="center"
          bg={nodeColor}
          color={nodeTextColor}
          borderRadius="full"
          px={4}
          py={2}
          border="2px solid"
          borderColor={isSelected ? '#FF4ECD' : nodeBorderColor}
          cursor="pointer"
          sx={{ '&:hover': { bg: 'rgba(127, 124, 255, 0.4)' } }}
          boxShadow={isSelected ? '0 0 15px rgba(255, 78, 205, 0.7)' : '0 0 10px rgba(127, 124, 255, 0.5)'}
          transition="all 0.3s ease"
          onClick={() => handleNodeClick(node.id, node)}
          zIndex={2}
          className={isSelected ? 'selected-node' : ''}
          animation={isSelected ? 'pulse 2s infinite' : 'fadeIn 0.5s ease-out'}
          style={{
            opacity: 1,
            transform: 'translate(-50%, -50%) scale(1)',
            animationFillMode: 'forwards'
          }}
        >
          {/* Node icon */}
          <Box 
            dangerouslySetInnerHTML={{ __html: node.icon }} 
            mr={2} 
            color={isSelected ? '#FF4ECD' : nodeBorderColor}
          />
          
          {/* Node name */}
          <Box fontWeight="medium">{node.name}</Box>
          
          {/* Expansion indicator for nodes with children */}
          {hasChildren && (
            <Box ml={2} fontSize="lg" transition="transform 0.3s ease">
              {isOpen ? '−' : '+'}
            </Box>
          )}
        </Box>
        
        {/* Render children if node is open */}
        {isOpen && hasChildren && node.children.map(child => renderNode(child, node.id))}
      </React.Fragment>
    );
  }, [nodePositions, selectedNodeId, openNodes, handleNodeClick, nodeColor, nodeTextColor, nodeBorderColor, connectorColor, createParticleTrail]);
  
  // Define CSS animations for particles and nodes
  const animationStyles = `
    @keyframes fadeOut {
      0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      100% { opacity: 0; transform: translate(-50%, -50%) scale(0.3); }
    }
    
    @keyframes pulse {
      0% { box-shadow: 0 0 15px rgba(255, 78, 205, 0.7); }
      50% { box-shadow: 0 0 25px rgba(255, 78, 205, 0.9); }
      100% { box-shadow: 0 0 15px rgba(255, 78, 205, 0.7); }
    }
    
    @keyframes nodePulse {
      0% { box-shadow: 0 0 0 0 rgba(124, 77, 255, 0.7); transform: translate(-50%, -50%) scale(1); }
      50% { box-shadow: 0 0 15px 5px rgba(124, 77, 255, 0.4); transform: translate(-50%, -50%) scale(1.1); }
      100% { box-shadow: 0 0 0 0 rgba(124, 77, 255, 0); transform: translate(-50%, -50%) scale(1); }
    }
    
    @keyframes recommendationPulse {
      0% { box-shadow: 0 0 0 0 rgba(63, 224, 208, 0.7); transform: translate(-50%, -50%) scale(1); }
      50% { box-shadow: 0 0 20px 8px rgba(63, 224, 208, 0.6); transform: translate(-50%, -50%) scale(1.15); }
      100% { box-shadow: 0 0 0 0 rgba(63, 224, 208, 0); transform: translate(-50%, -50%) scale(1); }
    }
    
    .node-pulse {
      animation: nodePulse 0.5s ease-out;
    }
    
    .recommendation-pulse {
      animation: recommendationPulse 1.2s ease-out;
    }
  `;

  // Render particles for rocket trail
  const renderParticles = useCallback(() => {
    return particles.map(particle => (
      <Box
        key={particle.id}
        position="absolute"
        left={`${particle.x}px`}
        top={`${particle.y}px`}
        width={`${particle.size}px`}
        height={`${particle.size}px`}
        borderRadius="full"
        bg={particle.color}
        opacity={particle.opacity}
        transform="translate(-50%, -50%)"
        zIndex={1}
        style={{
          animation: 'fadeOut 1s forwards',
          transition: 'opacity 1s ease-out, transform 1s ease-out',
          boxShadow: `0 0 ${particle.size * 1.5}px ${particle.color}` // Add glow effect to particles
        }}
      />
    ));
  }, [particles]);
  
  // Render rocket
  const renderRocket = useCallback(() => {
    return (
      <Box
        ref={rocketRef}
        position="absolute"
        left={`${rocketPosition.x}px`}
        top={`${rocketPosition.y}px`}
        transform="translate(-50%, -50%) rotate(0deg)"
        zIndex={3}
        transition="left 0.8s ease-in-out, top 0.8s ease-in-out, transform 0.3s ease"
        width="30px"
        height="30px"
        filter="drop-shadow(0 0 8px rgba(255, 78, 205, 0.7))" // Add glow effect to rocket
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2.5C12 2.5 7 5.5 7 12.5C7 16.5 9.5 19.5 12 20.5C14.5 19.5 17 16.5 17 12.5C17 5.5 12 2.5 12 2.5Z" fill="#FF4ECD" stroke="white" strokeWidth="1.5"/>
          <path d="M12 5.5V17.5" stroke="white" strokeWidth="1.5"/>
          <path d="M8.5 10L12 7L15.5 10" stroke="white" strokeWidth="1.5"/>
          <path d="M10 22L12 20L14 22" stroke="#FF4ECD" strokeWidth="1.5"/>
          <path d="M8 20L12 17L16 20" stroke="#FF4ECD" strokeWidth="1.5"/>
          {/* Enhanced rocket flame animation */}
          <path d="M10 22L12 24L14 22" fill="#FF7700" stroke="#FFAA00" strokeWidth="1" style={{animation: 'pulse 0.8s infinite alternate'}}/>
          <path d="M11 22.5L12 23.5L13 22.5" fill="#FFDD00" stroke="#FFFF00" strokeWidth="0.5" style={{animation: 'pulse 0.6s infinite alternate'}}/>
        </svg>
      </Box>
    );
  }, [rocketPosition]);

  // Add CSS animations
  useEffect(() => {
    // Add keyframes for animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0% { box-shadow: 0 0 15px rgba(255, 78, 205, 0.7); }
        50% { box-shadow: 0 0 25px rgba(255, 78, 205, 0.9); }
        100% { box-shadow: 0 0 15px rgba(255, 78, 205, 0.7); }
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      }
      
      @keyframes fadeOut {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.5); }
      }
      
      @keyframes drawConnector {
        from { stroke-dasharray: 1000; stroke-dashoffset: 1000; }
        to { stroke-dasharray: 1000; stroke-dashoffset: 0; }
      }
      
      @keyframes sparkle {
        0% { opacity: 0; transform: scale(0.8) rotate(0deg); }
        50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
        100% { opacity: 0; transform: scale(0.8) rotate(360deg); }
      }
      
      @keyframes recommendationPulse {
        0% { box-shadow: 0 0 15px rgba(63, 224, 208, 0.7); transform: scale(1); }
        50% { box-shadow: 0 0 30px rgba(63, 224, 208, 0.9); transform: scale(1.05); }
        100% { box-shadow: 0 0 15px rgba(63, 224, 208, 0.7); transform: scale(1); }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  // Define color values outside the renderCourseCard function
  const cardBgColor = useColorModeValue('white', 'gray.700');
  
  // Render course recommendation card
  const renderCourseCard = useCallback((course) => {
    return (
      <Box 
        key={course.id}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        mb={4}
        bg={cardBgColor}
        boxShadow="md"
        transition="transform 0.3s, box-shadow 0.3s"
        _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
      >
        <Flex direction="column" height="100%">
          <Heading size="md" mb={2}>{course.title}</Heading>
          
          <Flex mb={2}>
            <Badge colorScheme={course.difficulty === 'beginner' ? 'green' : course.difficulty === 'intermediate' ? 'blue' : 'purple'} mr={2}>
              {course.difficulty}
            </Badge>
            <Badge colorScheme="gray">{course.duration}</Badge>
          </Flex>
          
          <Text mb={4} flex="1">{course.description}</Text>
          
          <Button 
            colorScheme="blue" 
            size="sm"
            onClick={() => {
              // Navigate to courses page with selected skills as filter
              if (selectedSkills && selectedSkills.length > 0) {
                // Use the first selected skill as the filter
                const skillToFilter = selectedSkills[0];
                // Find the corresponding node ID for this skill
                const skillMap = {
                  'html': 'html',
                  'css': 'css',
                  'javascript': 'javascript',
                  'react': 'react',
                  'frontend': 'frontend',
                  'backend': 'backend',
                  'java': 'java',
                  'python': 'python',
                  'nodejs': 'nodejs',
                  'database': 'database',
                  'ai': 'ai',
                  'machine-learning': 'machine-learning',
                  'deep-learning': 'deep-learning',
                  'devops': 'devops',
                  'mobile': 'mobile-dev'
                };
                const nodeId = Object.keys(skillMap).find(key => skillMap[key] === skillToFilter) || skillToFilter;
                navigate(`/admin/courses?skill=${nodeId}`);
              } else {
                navigate('/admin/courses');
              }
            }}
          >
            Start Learning
          </Button>
        </Flex>
      </Box>
    );
  }, [navigate, cardBgColor]);

  return (
    <Box
      ref={containerRef}
      position="relative"
      height="100vh"
      width="100%"
      overflow="auto"
      borderRadius="xl"
      boxShadow="xl"
    >
      {/* Add animation styles */}
      <style>{animationStyles}</style>
      {/* Space background */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0
        }}
      />
      
      {/* Glassmorphism container */}
      <Box
        position="relative"
        zIndex={1}
        bg="transparent"
        borderRadius="xl"
        border="1px solid"
        borderColor={borderColor}
        p={6}
        m={6}
        height="calc(100% - 48px)"
        overflow="auto"
      >
        <Box textAlign="center" mb={8}>
          <Box
            as="h2"
            fontSize="2xl"
            fontWeight="bold"
            bgGradient="linear(to-r, #7F7CFF, #3FE0D0)"
            bgClip="text"
          >
            Interactive Skill Tree
          </Box>
          
          <Text mt={2} mb={4} color={useColorModeValue('gray.600', 'gray.300')}>
            Select skills to get personalized course recommendations
          </Text>
          
          {selectedSkills.length > 0 && (
            <Flex justify="center" flexWrap="wrap" gap={2} mb={4}>
              {selectedSkills.map(skill => (
                <Badge 
                  key={skill} 
                  colorScheme="purple" 
                  fontSize="0.8em" 
                  p={2} 
                  borderRadius="full"
                >
                  {skill}
                </Badge>
              ))}
            </Flex>
          )}
        </Box>
        
        {/* Skill tree container */}
        <Box 
          id="skill-tree-container" 
          ref={skillTreeRef}
          position="relative" 
          minHeight="800px"
          width="100%"
          overflowX="auto"
          overflowY="visible"
          pb={20}
        >
          {/* Render all nodes */}
          {renderNode(roadmapData)}
          
          {/* Render particles */}
          {renderParticles()}
          
          {/* Render rocket */}
          {renderRocket()}
        </Box>
      </Box>
      
      {/* Personalized Recommendations Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bgGradient="linear(to-r, #7F7CFF, #3FE0D0)" bgClip="text">
            Your Personalized Learning Path
          </DrawerHeader>
          
          <DrawerBody>
            {recommendedCourses.length > 0 ? (
              <VStack spacing={4} align="stretch">
                <Text mb={4}>
                  Based on your selected skills and learning preferences, we recommend these courses to help you achieve your goals:
                </Text>
                
                {recommendedCourses.map(course => renderCourseCard(course))}
                
                <Button colorScheme="blue" onClick={() => navigate('/admin/courses')} mt={4}>
                  View All Courses
                </Button>
              </VStack>
            ) : (
              <VStack spacing={4} align="stretch">
                <Text>Select skills from the skill tree to get personalized recommendations.</Text>
              </VStack>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default SkillTreeRoadmap;