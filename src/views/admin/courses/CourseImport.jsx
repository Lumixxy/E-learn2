import React, { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  Text,
  useToast,
  Card,
  CardBody,
  Heading,
  Progress,
  Badge,
  HStack,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaFileExcel, FaPlay, FaHistory } from 'react-icons/fa';
import axios from 'axios';

const CourseImport = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [importHistory, setImportHistory] = useState([]);
  const toast = useToast();
  
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setProgress(0);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append('file', file);

      // Upload file to backend
      const response = await axios.post('/api/courses/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        },
      });

      // Add to import history
      setImportHistory(prev => [{
        id: Date.now(),
        timestamp: new Date().toISOString(),
        status: 'success',
        message: `Successfully imported ${response.data.count} courses`,
      }, ...prev]);

      toast({
        title: 'Import Successful',
        description: `Successfully imported ${response.data.count} courses`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Import error:', error);
      
      setImportHistory(prev => [{
        id: Date.now(),
        timestamp: new Date().toISOString(),
        status: 'error',
        message: error.response?.data?.message || 'Failed to import courses',
      }, ...prev]);

      toast({
        title: 'Import Failed',
        description: error.response?.data?.message || 'Failed to import courses',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  const triggerWorkflow = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/workflows/trigger', {
        workflowId: 'course-import',
      });

      setImportHistory(prev => [{
        id: Date.now(),
        timestamp: new Date().toISOString(),
        status: 'success',
        message: 'Workflow triggered successfully',
      }, ...prev]);

      toast({
        title: 'Workflow Triggered',
        description: 'Course import workflow has been started',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Workflow trigger error:', error);
      
      setImportHistory(prev => [{
        id: Date.now(),
        timestamp: new Date().toISOString(),
        status: 'error',
        message: 'Failed to trigger workflow',
      }, ...prev]);

      toast({
        title: 'Workflow Failed',
        description: 'Failed to trigger course import workflow',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box p={8}>
      <VStack spacing={8} align="stretch">
        <Card bg={bgColor} borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <VStack spacing={6} align="stretch">
              <Heading size="lg" color={textColor}>Course Import</Heading>
              
              <HStack spacing={4}>
                <Button
                  leftIcon={<FaFileExcel />}
                  colorScheme="blue"
                  isLoading={isLoading}
                  onClick={() => document.getElementById('fileInput').click()}
                >
                  Upload Excel File
                </Button>
                <input
                  id="fileInput"
                  type="file"
                  accept=".xlsx"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
                
                <Button
                  leftIcon={<FaPlay />}
                  colorScheme="green"
                  isLoading={isLoading}
                  onClick={triggerWorkflow}
                >
                  Run Import Workflow
                </Button>
              </HStack>

              {isLoading && (
                <Box>
                  <Text mb={2}>Importing courses...</Text>
                  <Progress value={progress} size="sm" colorScheme="blue" />
                </Box>
              )}
            </VStack>
          </CardBody>
        </Card>

        <Card bg={bgColor} borderWidth="1px" borderColor={borderColor}>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <HStack>
                <Icon as={FaHistory} />
                <Heading size="md" color={textColor}>Import History</Heading>
              </HStack>

              <VStack spacing={3} align="stretch">
                {importHistory.map((item) => (
                  <Box
                    key={item.id}
                    p={4}
                    borderWidth="1px"
                    borderColor={borderColor}
                    borderRadius="md"
                  >
                    <HStack justify="space-between">
                      <Text color={textColor}>
                        {new Date(item.timestamp).toLocaleString()}
                      </Text>
                      <Badge
                        colorScheme={item.status === 'success' ? 'green' : 'red'}
                      >
                        {item.status}
                      </Badge>
                    </HStack>
                    <Text mt={2} color={textColor}>
                      {item.message}
                    </Text>
                  </Box>
                ))}
              </VStack>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  );
};

export default CourseImport; 