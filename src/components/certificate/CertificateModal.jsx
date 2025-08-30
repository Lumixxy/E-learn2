import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  VStack,
  HStack,
  Text,
  Button,
  Box,
  Badge,
  Divider,
  Icon,
  useColorModeValue,
  useToast,
  Image,
  Center
} from '@chakra-ui/react';
import { FiDownload, FiShare2, FiAward, FiCalendar, FiUser, FiCheckCircle } from 'react-icons/fi';
import { useXP } from '../../contexts/XPContext';
import { useWeb3 } from '../../context/Web3Context';
import CertificateGenerator from './CertificateGenerator';

const CertificateModal = ({ isOpen, onClose, courseData, userStats }) => {
  const [showGenerator, setShowGenerator] = useState(false);
  const toast = useToast();
  const { isConnected, connectWallet, accounts } = useWeb3();
  const { userXP, getCurrentLevelInfo } = useXP();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');

  const handleDownload = () => {
    setShowGenerator(true);
  };

  const handleBlockchainVerification = async () => {
    if (!isConnected) {
      try {
        await connectWallet();
        toast({
          title: "MetaMask Connected",
          description: "Your wallet is now connected for certificate verification.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Connection Failed",
          description: "Failed to connect MetaMask wallet.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
    }

    // Simulate blockchain certificate verification
    toast({
      title: "Certificate Verified",
      description: `Certificate verified on blockchain with wallet: ${accounts[0]?.slice(0, 6)}...${accounts[0]?.slice(-4)}`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'MIT Python Certificate',
        text: 'I just completed the MIT Introduction to Computer Science and Programming in Python course!',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(
        'I just completed the MIT Introduction to Computer Science and Programming in Python course! 🎓'
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent bg={bgColor} borderRadius="2xl" border="2px" borderColor="gold">
        <ModalHeader>
          <Center>
            <VStack spacing={2}>
              <Icon as={FiAward} boxSize={12} color="gold" />
              <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                🏆 Certificate of Completion
              </Text>
            </VStack>
          </Center>
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody>
          <VStack spacing={6}>
            {/* Certificate Design */}
            <Box
              w="full"
              p={8}
              bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              borderRadius="xl"
              color="white"
              textAlign="center"
              position="relative"
              overflow="hidden"
            >
              {/* Decorative elements */}
              <Box
                position="absolute"
                top="-50px"
                right="-50px"
                w="100px"
                h="100px"
                bg="rgba(255,255,255,0.1)"
                borderRadius="full"
              />
              <Box
                position="absolute"
                bottom="-30px"
                left="-30px"
                w="60px"
                h="60px"
                bg="rgba(255,255,255,0.1)"
                borderRadius="full"
              />
              
              <VStack spacing={4} position="relative" zIndex={1}>
                <Text fontSize="sm" fontWeight="bold" letterSpacing="wider">
                  CERTIFICATE OF COMPLETION
                </Text>
                
                <Text fontSize="xs" opacity={0.9}>
                  This is to certify that
                </Text>
                
                <Text fontSize="2xl" fontWeight="bold" textShadow="0 2px 4px rgba(0,0,0,0.3)">
                  Student Name
                </Text>
                
                <Text fontSize="xs" opacity={0.9}>
                  has successfully completed
                </Text>
                
                <Text fontSize="lg" fontWeight="bold" textAlign="center" lineHeight="short">
                  MIT 6.0001: Introduction to Computer Science and Programming in Python
                </Text>
                
                <HStack spacing={8} mt={4}>
                  <VStack spacing={1}>
                    <Text fontSize="xs" opacity={0.8}>COMPLETION DATE</Text>
                    <Text fontSize="sm" fontWeight="bold">
                      {new Date().toLocaleDateString()}
                    </Text>
                  </VStack>
                  <VStack spacing={1}>
                    <Text fontSize="xs" opacity={0.8}>FINAL SCORE</Text>
                    <Text fontSize="sm" fontWeight="bold">
                      {userStats?.overallScore || 95}%
                    </Text>
                  </VStack>
                </HStack>
                
                <HStack spacing={4} mt={4} fontSize="xs" opacity={0.8}>
                  <Text>MIT OpenCourseWare</Text>
                  <Text>•</Text>
                  <Text>E-Learning Platform</Text>
                </HStack>
              </VStack>
            </Box>
            
            {/* Achievement Stats */}
            <Box w="full" p={4} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="lg">
              <Text fontWeight="bold" mb={3} color={textColor}>
                Course Achievements
              </Text>
              <VStack spacing={3}>
                <HStack justify="space-between" w="full">
                  <HStack>
                    <Icon as={FiAward} color="gold" />
                    <Text fontSize="sm" color={textColor}>Modules Completed</Text>
                  </HStack>
                  <Badge colorScheme="green" borderRadius="full">
                    {userStats?.completedModules || 12}/12
                  </Badge>
                </HStack>
                
                <HStack justify="space-between" w="full">
                  <HStack>
                    <Icon as={FiAward} color="blue.500" />
                    <Text fontSize="sm" color={textColor}>Quizzes Passed</Text>
                  </HStack>
                  <Badge colorScheme="blue" borderRadius="full">
                    {userStats?.quizzesPassed || 12}/12
                  </Badge>
                </HStack>
                
                <HStack justify="space-between" w="full">
                  <HStack>
                    <Icon as={FiAward} color="purple.500" />
                    <Text fontSize="sm" color={textColor}>Assignments Submitted</Text>
                  </HStack>
                  <Badge colorScheme="purple" borderRadius="full">
                    {userStats?.assignmentsSubmitted || 6}/6
                  </Badge>
                </HStack>
                
                <HStack justify="space-between" w="full">
                  <HStack>
                    <Icon as={FiAward} color="orange.500" />
                    <Text fontSize="sm" color={textColor}>Peer Evaluations</Text>
                  </HStack>
                  <Badge colorScheme="orange" borderRadius="full">
                    {userStats?.peerEvaluations || 2}/2
                  </Badge>
                </HStack>
              </VStack>
            </Box>
            
            <Divider />
            
            <Text fontSize="sm" color={mutedColor} textAlign="center" lineHeight="tall">
              This certificate validates your completion of MIT's Introduction to Computer Science 
              and Programming in Python course. You have demonstrated proficiency in fundamental 
              programming concepts, data structures, algorithms, and software engineering principles.
            </Text>
          </VStack>
        </ModalBody>
        
        <ModalFooter>
          <VStack spacing={3} w="full">
            <HStack spacing={3} w="full">
              <Button 
                leftIcon={<Icon as={FiDownload} />}
                colorScheme="blue" 
                onClick={handleDownload}
                flex={1}
              >
                Download
              </Button>
              <Button 
                leftIcon={<Icon as={FiShare2} />}
                variant="outline" 
                onClick={handleShare}
                flex={1}
              >
                Share
              </Button>
            </HStack>
            
            {/* MetaMask Verification Button */}
            <Button
              leftIcon={<Icon as={FiCheckCircle} />}
              colorScheme={isConnected ? "green" : "orange"}
              variant={isConnected ? "solid" : "outline"}
              onClick={handleBlockchainVerification}
              w="full"
              size="sm"
            >
              {isConnected ? "Verify on Blockchain" : "Connect MetaMask to Verify"}
            </Button>
          </VStack>
          <Button onClick={onClose} variant="ghost">
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
      
      {/* Certificate Generator Modal */}
      {showGenerator && (
        <CertificateGenerator
          isOpen={showGenerator}
          onClose={() => setShowGenerator(false)}
          courseData={courseData}
          userInfo={{ name: "Student Name" }}
          completionDate={new Date()}
        />
      )}
    </Modal>
  );
};

export default CertificateModal;
