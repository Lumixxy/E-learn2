import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  VStack,
  Image,
  Box,
  useToast,
} from '@chakra-ui/react';

const CertificateGenerator = ({ isOpen, onClose, courseName, studentName, date, isEligible = true }) => {
  const toast = useToast();

  const handleDownload = () => {
    // In a real implementation, this would generate and download a PDF
    toast({
      title: 'Certificate Downloaded',
      description: 'Your certificate has been downloaded successfully!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  if (!isEligible) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Certificate Not Available</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Please complete all course requirements to unlock your certificate.</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Your Certificate of Completion</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} p={4} borderWidth="1px" borderRadius="lg">
            <Box textAlign="center" mb={4}>
              <Text fontSize="2xl" fontWeight="bold" mb={2}>
                Certificate of Completion
              </Text>
              <Text fontSize="lg" mb={4}>
                This is to certify that
              </Text>
              <Text fontSize="xl" fontWeight="bold" color="blue.500" mb={6}>
                {studentName || 'Student Name'}
              </Text>
              <Text mb={4}>
                has successfully completed the course
              </Text>
              <Text fontSize="xl" fontWeight="bold" mb={6}>
                {courseName || 'Course Name'}
              </Text>
              <Text fontSize="sm" color="gray.500">
                Issued on: {date || new Date().toLocaleDateString()}
              </Text>
            </Box>
            <Box borderTopWidth="1px" pt={4} w="100%" textAlign="center">
              <Text fontSize="sm" color="gray.500">
                Certificate ID: {`${Date.now()}-${Math.random().toString(36).substr(2, 9)}`}
              </Text>
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="blue" onClick={handleDownload}>
            Download Certificate
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CertificateGenerator;
