import React, { useRef, useEffect, useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useColorModeValue,
  useToast,
  Badge,
  Divider,
  Icon,
} from '@chakra-ui/react';
import { FiDownload, FiShare2, FiAward, FiCalendar, FiUser } from 'react-icons/fi';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useXP } from '../../contexts/XPContext';

const CertificateGenerator = ({ 
  isOpen, 
  onClose, 
  courseData, 
  userInfo = {},
  completionDate = new Date()
}) => {
  const certificateRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const toast = useToast();
  const { userXP, getCurrentLevelInfo } = useXP();
  
  // Color mode values
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedColor = useColorModeValue('gray.600', 'gray.400');
  
  // User info with defaults
  const studentName = userInfo.name || 'Student Name';
  const instructorName = courseData?.author || courseData?.instructor || 'Course Instructor';
  const courseName = courseData?.title || 'Course Title';
  const courseId = courseData?.id || 'COURSE001';
  const levelInfo = getCurrentLevelInfo();

  // Certificate styles
  const certificateStyles = {
    width: '210mm',
    height: '297mm', // A4 size
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '40px',
    fontFamily: '"Times New Roman", serif',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    boxSizing: 'border-box'
  };

  // Generate certificate ID
  const generateCertificateId = () => {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `CERT-${date}-${random}`;
  };

  const certificateId = generateCertificateId();

  // Download as PDF
  const downloadPDF = async () => {
    if (!certificateRef.current) return;
    
    setIsGenerating(true);
    
    try {
      // Create canvas from certificate
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: null,
        width: 794, // A4 width in pixels at 96 DPI
        height: 1123 // A4 height in pixels at 96 DPI
      });
      
      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
      
      // Save PDF
      const fileName = `certificate-${courseName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}-${certificateId}.pdf`;
      pdf.save(fileName);
      
      toast({
        title: "Certificate Downloaded",
        description: "Your certificate has been saved as a PDF file.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Download Failed",
        description: "There was an error generating your certificate. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Download as image
  const downloadImage = async () => {
    if (!certificateRef.current) return;
    
    setIsGenerating(true);
    
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: null
      });
      
      // Create download link
      const link = document.createElement('a');
      link.download = `certificate-${courseName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}-${certificateId}.png`;
      link.href = canvas.toDataURL();
      link.click();
      
      toast({
        title: "Certificate Downloaded",
        description: "Your certificate has been saved as an image file.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      
    } catch (error) {
      console.error('Error generating image:', error);
      toast({
        title: "Download Failed",
        description: "There was an error generating your certificate. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Share certificate (copy link to clipboard)
  const shareCertificate = () => {
    const shareText = `🎓 I just completed "${courseName}" and earned my certificate! #ELearning #Achievement`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My E-Learning Certificate',
        text: shareText,
        url: window.location.origin
      });
    } else {
      navigator.clipboard.writeText(shareText).then(() => {
        toast({
          title: "Copied to Clipboard",
          description: "Share text has been copied to your clipboard.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent maxW="90vw" maxH="90vh" bg={bgColor}>
        <ModalCloseButton />
        <ModalBody p={8}>
          <VStack spacing={6}>
            {/* Certificate Preview */}
            <Box
              ref={certificateRef}
              style={certificateStyles}
              transform="scale(0.7)"
              transformOrigin="top center"
              border="1px solid #e2e8f0"
              borderRadius="lg"
              position="relative"
            >
              {/* Decorative border */}
              <Box
                position="absolute"
                top="20px"
                left="20px"
                right="20px"
                bottom="20px"
                border="3px solid rgba(255, 255, 255, 0.3)"
                borderRadius="lg"
              />
              
              {/* Header */}
              <VStack spacing={4} mb={8}>
                <Icon as={FiAward} boxSize={16} color="white" />
                <Text fontSize="48px" fontWeight="bold" letterSpacing="2px">
                  CERTIFICATE
                </Text>
                <Text fontSize="24px" fontWeight="normal" letterSpacing="1px">
                  OF COMPLETION
                </Text>
              </VStack>
              
              {/* Body */}
              <VStack spacing={6} flex={1} justify="center">
                <Text fontSize="18px" fontWeight="normal">
                  This is to certify that
                </Text>
                
                <Text 
                  fontSize="42px" 
                  fontWeight="bold" 
                  borderBottom="2px solid rgba(255, 255, 255, 0.5)"
                  pb={2}
                  minWidth="400px"
                  textAlign="center"
                >
                  {studentName}
                </Text>
                
                <Text fontSize="18px" fontWeight="normal" maxWidth="600px" textAlign="center">
                  has successfully completed the course
                </Text>
                
                <Text 
                  fontSize="32px" 
                  fontWeight="bold" 
                  textAlign="center"
                  maxWidth="700px"
                  lineHeight={1.2}
                >
                  {courseName}
                </Text>
                
                <HStack spacing={8} mt={6}>
                  <VStack>
                    <Text fontSize="14px" opacity={0.8}>Course Level</Text>
                    <Text fontSize="18px" fontWeight="bold">
                      {courseData?.level || 'Intermediate'}
                    </Text>
                  </VStack>
                  
                  <VStack>
                    <Text fontSize="14px" opacity={0.8}>Duration</Text>
                    <Text fontSize="18px" fontWeight="bold">
                      {courseData?.duration || '8 weeks'}
                    </Text>
                  </VStack>
                  
                  <VStack>
                    <Text fontSize="14px" opacity={0.8}>Student Level</Text>
                    <Text fontSize="18px" fontWeight="bold">
                      {levelInfo.title}
                    </Text>
                  </VStack>
                </HStack>
              </VStack>
              
              {/* Footer */}
              <HStack justify="space-between" width="100%" mt={8}>
                <VStack align="start">
                  <Text fontSize="16px" fontWeight="bold">
                    {instructorName}
                  </Text>
                  <Text fontSize="14px" opacity={0.8}>
                    Course Instructor
                  </Text>
                  <Box height="1px" width="150px" bg="rgba(255, 255, 255, 0.5)" />
                </VStack>
                
                <VStack align="center">
                  <Text fontSize="14px" opacity={0.8}>Completion Date</Text>
                  <Text fontSize="16px" fontWeight="bold">
                    {completionDate.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Text>
                </VStack>
                
                <VStack align="end">
                  <Text fontSize="14px" opacity={0.8}>Certificate ID</Text>
                  <Text fontSize="12px" fontFamily="monospace">
                    {certificateId}
                  </Text>
                  <Text fontSize="14px" fontWeight="bold">
                    E-Learn Platform
                  </Text>
                </VStack>
              </HStack>
              
              {/* Watermark */}
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%) rotate(-45deg)"
                fontSize="120px"
                fontWeight="bold"
                opacity={0.05}
                pointerEvents="none"
                whiteSpace="nowrap"
              >
                E-LEARNING
              </Box>
            </Box>
            
            {/* Action Buttons */}
            <HStack spacing={4} wrap="wrap" justify="center">
              <Button
                leftIcon={<Icon as={FiDownload} />}
                colorScheme="blue"
                onClick={downloadPDF}
                isLoading={isGenerating}
                loadingText="Generating..."
              >
                Download PDF
              </Button>
              
              <Button
                leftIcon={<Icon as={FiDownload} />}
                variant="outline"
                onClick={downloadImage}
                isLoading={isGenerating}
                loadingText="Generating..."
              >
                Download Image
              </Button>
              
              <Button
                leftIcon={<Icon as={FiShare2} />}
                variant="outline"
                onClick={shareCertificate}
              >
                Share Achievement
              </Button>
            </HStack>
            
            {/* Certificate Info */}
            <Box 
              p={4} 
              borderRadius="lg" 
              bg={useColorModeValue('gray.50', 'gray.700')} 
              width="100%"
              maxWidth="600px"
            >
              <VStack spacing={3}>
                <HStack justify="space-between" width="100%">
                  <HStack>
                    <Icon as={FiUser} color={mutedColor} />
                    <Text fontSize="sm" color={mutedColor}>Student:</Text>
                  </HStack>
                  <Text fontSize="sm" fontWeight="bold">{studentName}</Text>
                </HStack>
                
                <HStack justify="space-between" width="100%">
                  <HStack>
                    <Icon as={FiAward} color={mutedColor} />
                    <Text fontSize="sm" color={mutedColor}>Course:</Text>
                  </HStack>
                  <Text fontSize="sm" fontWeight="bold">{courseName}</Text>
                </HStack>
                
                <HStack justify="space-between" width="100%">
                  <HStack>
                    <Icon as={FiCalendar} color={mutedColor} />
                    <Text fontSize="sm" color={mutedColor}>Completed:</Text>
                  </HStack>
                  <Text fontSize="sm" fontWeight="bold">
                    {completionDate.toLocaleDateString()}
                  </Text>
                </HStack>
                
                <Divider />
                
                <HStack justify="center" width="100%">
                  <Badge colorScheme="green" px={3} py={1} borderRadius="full">
                    ✓ Verified Certificate
                  </Badge>
                  <Badge colorScheme="blue" px={3} py={1} borderRadius="full">
                    Level {levelInfo.level} Achievement
                  </Badge>
                </HStack>
              </VStack>
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CertificateGenerator;