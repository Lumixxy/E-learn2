import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  VStack,
  HStack,
  Badge,
  Tooltip,
  IconButton,
  Select,
} from '@chakra-ui/react';
import { MdRefresh, MdFullscreen, MdFullscreenExit } from 'react-icons/md';

const AssignmentEvaluation3D = ({ evaluations = [], userScore = 0, passingScore = 85 }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [visualizationType, setVisualizationType] = useState('radar');
  
  // Color mode values
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const cardBg = useColorModeValue('white', 'gray.700');
  const sceneBgColor = useColorModeValue('#f7fafc', '#1a202c');
  const spriteTextColor = useColorModeValue('#1a202c', '#ffffff');
  
  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Setup scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(sceneBgColor);
    sceneRef.current = scene;
    
    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;
    
    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    rendererRef.current = renderer;
    
    // Setup controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      if (!canvasRef.current || !rendererRef.current || !cameraRef.current) return;
      
      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (sceneRef.current) {
        // Dispose of all geometries and materials
        sceneRef.current.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
    };
  }, []);
  
  // Update visualization when evaluations or type changes
  useEffect(() => {
    if (!sceneRef.current) return;
    
    // Clear previous visualization
    while (sceneRef.current.children.length > 0) {
      const object = sceneRef.current.children[0];
      if (object.geometry) object.geometry.dispose();
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach(material => material.dispose());
        } else {
          object.material.dispose();
        }
      }
      sceneRef.current.remove(object);
    }
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    sceneRef.current.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    sceneRef.current.add(directionalLight);
    
    // Create visualization based on type
    if (visualizationType === 'radar') {
      createRadarChart(evaluations, userScore, passingScore);
    } else if (visualizationType === 'bars') {
      createBarChart(evaluations, userScore, passingScore);
    } else if (visualizationType === 'sphere') {
      createSphereVisualization(evaluations, userScore, passingScore);
    }
  }, [evaluations, userScore, passingScore, visualizationType]);
  
  // Create radar chart visualization
  const createRadarChart = (evaluations, userScore, passingScore) => {
    if (!sceneRef.current) return;
    
    const scene = sceneRef.current;
    
    // Create radar chart
    const segments = 5; // Number of evaluation criteria
    const radius = 2;
    const height = 0.1;
    
    // Create base plate
    const baseGeometry = new THREE.CylinderGeometry(radius, radius, height, segments);
    const baseMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x333333,
      transparent: true,
      opacity: 0.2,
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    scene.add(base);
    
    // Create radar lines
    const lineGroup = new THREE.Group();
    scene.add(lineGroup);
    
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      
      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(x, 0, z),
      ]);
      
      const lineMaterial = new THREE.LineBasicMaterial({ color: 0xaaaaaa });
      const line = new THREE.Line(lineGeometry, lineMaterial);
      lineGroup.add(line);
      
      // Add label
      const criteria = ['Functionality', 'Code Quality', 'Documentation', 'Innovation', 'UX'];
      const textSprite = createTextSprite(criteria[i], spriteTextColor);
      textSprite.position.set(x * 1.2, 0, z * 1.2);
      scene.add(textSprite);
    }
    
    // Create user score polygon
    const userScorePoints = [];
    const userScoreValue = userScore / 100; // Normalize to 0-1
    
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const x = Math.cos(angle) * radius * userScoreValue;
      const z = Math.sin(angle) * radius * userScoreValue;
      userScorePoints.push(new THREE.Vector3(x, 0.05, z));
    }
    
    // Close the polygon
    userScorePoints.push(userScorePoints[0].clone());
    
    const userScoreGeometry = new THREE.BufferGeometry().setFromPoints(userScorePoints);
    const userScoreMaterial = new THREE.LineBasicMaterial({ color: 0xff4ecd, linewidth: 2 });
    const userScoreLine = new THREE.Line(userScoreGeometry, userScoreMaterial);
    scene.add(userScoreLine);
    
    // Create passing score circle
    const passingScorePoints = [];
    const passingScoreValue = passingScore / 100; // Normalize to 0-1
    
    for (let i = 0; i <= 32; i++) {
      const angle = (i / 32) * Math.PI * 2;
      const x = Math.cos(angle) * radius * passingScoreValue;
      const z = Math.sin(angle) * radius * passingScoreValue;
      passingScorePoints.push(new THREE.Vector3(x, 0.02, z));
    }
    
    const passingScoreGeometry = new THREE.BufferGeometry().setFromPoints(passingScorePoints);
    const passingScoreMaterial = new THREE.LineBasicMaterial({ 
      color: 0x48bb78, 
      linewidth: 1,
      transparent: true,
      opacity: 0.7,
    });
    const passingScoreLine = new THREE.Line(passingScoreGeometry, passingScoreMaterial);
    scene.add(passingScoreLine);
    
    // Add peer evaluations
    evaluations.forEach((evaluation, index) => {
      const peerScorePoints = [];
      const peerScoreValue = evaluation.score / 100; // Normalize to 0-1
      
      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        // Add some randomness to make each evaluation unique
        const randomFactor = 0.7 + Math.random() * 0.6;
        const adjustedScore = peerScoreValue * randomFactor;
        const x = Math.cos(angle) * radius * Math.min(adjustedScore, 1.0);
        const z = Math.sin(angle) * radius * Math.min(adjustedScore, 1.0);
        peerScorePoints.push(new THREE.Vector3(x, 0.03 + index * 0.01, z));
      }
      
      // Close the polygon
      peerScorePoints.push(peerScorePoints[0].clone());
      
      const peerScoreGeometry = new THREE.BufferGeometry().setFromPoints(peerScorePoints);
      const peerScoreMaterial = new THREE.LineBasicMaterial({ 
        color: 0x3182ce, 
        transparent: true,
        opacity: 0.5,
      });
      const peerScoreLine = new THREE.Line(peerScoreGeometry, peerScoreMaterial);
      scene.add(peerScoreLine);
    });
    
    // Position camera
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 4, 4);
      cameraRef.current.lookAt(0, 0, 0);
    }
  };
  
  // Create bar chart visualization
  const createBarChart = (evaluations, userScore, passingScore) => {
    if (!sceneRef.current) return;
    
    const scene = sceneRef.current;
    
    // Create base plate
    const baseGeometry = new THREE.BoxGeometry(5, 0.1, 3);
    const baseMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x333333,
      transparent: true,
      opacity: 0.2,
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    scene.add(base);
    
    // Create user score bar
    const userBarGeometry = new THREE.BoxGeometry(0.5, userScore / 20, 0.5);
    const userBarMaterial = new THREE.MeshStandardMaterial({ color: 0xff4ecd });
    const userBar = new THREE.Mesh(userBarGeometry, userBarMaterial);
    userBar.position.set(0, (userScore / 20) / 2, 0);
    scene.add(userBar);
    
    // Add user score label
    const userScoreLabel = createTextSprite(`Your Score: ${userScore}`, spriteTextColor);
    userScoreLabel.position.set(0, userScore / 20 + 0.3, 0);
    scene.add(userScoreLabel);
    
    // Create passing score line
    const passingLineGeometry = new THREE.BoxGeometry(5, 0.05, 0.05);
    const passingLineMaterial = new THREE.MeshStandardMaterial({ color: 0x48bb78 });
    const passingLine = new THREE.Mesh(passingLineGeometry, passingLineMaterial);
    passingLine.position.set(0, passingScore / 20, 0);
    scene.add(passingLine);
    
    // Add passing score label
    const passingScoreLabel = createTextSprite(`Passing: ${passingScore}`, spriteTextColor);
    passingScoreLabel.position.set(2.5, passingScore / 20 + 0.2, 0);
    scene.add(passingScoreLabel);
    
    // Create peer evaluation bars
    evaluations.forEach((evaluation, index) => {
      const position = -2 + (index + 1) * (4 / (evaluations.length + 1));
      
      const peerBarGeometry = new THREE.BoxGeometry(0.3, evaluation.score / 20, 0.3);
      const peerBarMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x3182ce,
        transparent: true,
        opacity: 0.7,
      });
      const peerBar = new THREE.Mesh(peerBarGeometry, peerBarMaterial);
      peerBar.position.set(position, (evaluation.score / 20) / 2, 0);
      scene.add(peerBar);
      
      // Add peer score label
      const peerScoreLabel = createTextSprite(`Peer ${index + 1}: ${evaluation.score}`);
      peerScoreLabel.position.set(position, evaluation.score / 20 + 0.3, 0);
      scene.add(peerScoreLabel);
    });
    
    // Position camera
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 3, 5);
      cameraRef.current.lookAt(0, 2, 0);
    }
  };
  
  // Create sphere visualization
  const createSphereVisualization = (evaluations, userScore, passingScore) => {
    if (!sceneRef.current) return;
    
    const scene = sceneRef.current;
    
    // Create central sphere (user score)
    const userSphereGeometry = new THREE.SphereGeometry(userScore / 50, 32, 32);
    const userSphereMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xff4ecd,
      transparent: true,
      opacity: 0.7,
    });
    const userSphere = new THREE.Mesh(userSphereGeometry, userSphereMaterial);
    scene.add(userSphere);
    
    // Create passing score wireframe sphere
    const passingGeometry = new THREE.SphereGeometry(passingScore / 50, 16, 16);
    const passingMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x48bb78, 
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const passingSphere = new THREE.Mesh(passingGeometry, passingMaterial);
    scene.add(passingSphere);
    
    // Create orbiting spheres for peer evaluations
    evaluations.forEach((evaluation, index) => {
      const orbitRadius = 2;
      const angle = (index / evaluations.length) * Math.PI * 2;
      const x = Math.cos(angle) * orbitRadius;
      const z = Math.sin(angle) * orbitRadius;
      
      // Create peer sphere
      const peerSphereGeometry = new THREE.SphereGeometry(evaluation.score / 100, 16, 16);
      const peerSphereMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x3182ce,
        transparent: true,
        opacity: 0.6,
      });
      const peerSphere = new THREE.Mesh(peerSphereGeometry, peerSphereMaterial);
      peerSphere.position.set(x, 0, z);
      scene.add(peerSphere);
      
      // Create connecting line
      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(x, 0, z),
      ]);
      const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0x3182ce,
        transparent: true,
        opacity: 0.3,
      });
      const line = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(line);
      
      // Add peer score label
      const peerScoreLabel = createTextSprite(`Peer ${index + 1}: ${evaluation.score}`);
      peerScoreLabel.position.set(x, 0.5, z);
      scene.add(peerScoreLabel);
    });
    
    // Position camera
    if (cameraRef.current) {
      cameraRef.current.position.set(3, 2, 3);
      cameraRef.current.lookAt(0, 0, 0);
    }
  };
  
  // Helper function to create text sprites
  const createTextSprite = (text, textColor) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 128;
    
    context.font = '24px Arial';
    context.fillStyle = textColor;
    context.textAlign = 'center';
    context.fillText(text, 128, 64);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(1, 0.5, 1);
    
    return sprite;
  };
  
  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    
    setIsFullscreen(!isFullscreen);
  };
  
  // Reset camera position
  const resetCamera = () => {
    if (!cameraRef.current || !controlsRef.current) return;
    
    if (visualizationType === 'radar') {
      cameraRef.current.position.set(0, 4, 4);
    } else if (visualizationType === 'bars') {
      cameraRef.current.position.set(0, 3, 5);
    } else if (visualizationType === 'sphere') {
      cameraRef.current.position.set(3, 2, 3);
    }
    
    cameraRef.current.lookAt(0, 0, 0);
    controlsRef.current.update();
  };
  
  return (
    <VStack spacing={4} align="stretch" w="100%">
      <Flex justify="space-between" align="center">
        <Heading size="md">Interactive 3D Evaluation Visualization</Heading>
        <HStack spacing={2}>
          <Select 
            size="sm" 
            value={visualizationType} 
            onChange={(e) => setVisualizationType(e.target.value)}
            width="120px"
          >
            <option value="radar">Radar Chart</option>
            <option value="bars">Bar Chart</option>
            <option value="sphere">Sphere View</option>
          </Select>
          <Tooltip label="Reset Camera">
            <IconButton 
              icon={<MdRefresh />} 
              size="sm" 
              onClick={resetCamera} 
              aria-label="Reset camera"
            />
          </Tooltip>
          <Tooltip label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}>
            <IconButton 
              icon={isFullscreen ? <MdFullscreenExit /> : <MdFullscreen />} 
              size="sm" 
              onClick={toggleFullscreen} 
              aria-label="Toggle fullscreen"
            />
          </Tooltip>
        </HStack>
      </Flex>
      
      <Box 
        ref={containerRef}
        position="relative"
        height="400px"
        borderRadius="md"
        overflow="hidden"
        borderWidth="1px"
        borderColor={borderColor}
        bg={bgColor}
      >
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
      </Box>
      
      <Flex justify="space-between" align="center">
        <HStack>
          <Badge colorScheme={userScore >= passingScore ? "green" : "red"} fontSize="sm">
            Your Score: {userScore}%
          </Badge>
          <Badge colorScheme="green" fontSize="sm">
            Passing: {passingScore}%
          </Badge>
        </HStack>
        <Text fontSize="sm" color={textColor}>
          Peer Evaluations: {evaluations.length}
        </Text>
      </Flex>
      
      <Text fontSize="sm" color="gray.500">
        Drag to rotate • Scroll to zoom • Right-click to pan
      </Text>
    </VStack>
  );
};

export default AssignmentEvaluation3D;
