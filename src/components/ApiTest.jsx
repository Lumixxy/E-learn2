import React, { useState, useEffect } from 'react';
import { Box, Button, Text, VStack, useToast } from '@chakra-ui/react';
import WebWarriorAPI from '../api/webwarrior';

const ApiTest = () => {
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const testApiConnection = async () => {
    setLoading(true);
    try {
      console.log('Testing API connection...');
      const roadmaps = await WebWarriorAPI.getAllRoadmaps();
      console.log('API test successful:', roadmaps);
      setTestResult({ success: true, data: roadmaps });
      toast({
        title: "API Test Successful",
        description: `Found ${roadmaps?.length || 0} roadmaps`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('API test failed:', error);
      setTestResult({ success: false, error: error.message });
      toast({
        title: "API Test Failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={4} border="1px solid" borderColor="gray.200" borderRadius="md">
      <VStack spacing={4}>
        <Text fontSize="lg" fontWeight="bold">Roadmap API Test</Text>
        <Button 
          onClick={testApiConnection} 
          isLoading={loading}
          colorScheme="blue"
        >
          Test API Connection
        </Button>
        {testResult && (
          <Box p={3} bg={testResult.success ? "green.50" : "red.50"} borderRadius="md">
            <Text fontWeight="bold" color={testResult.success ? "green.600" : "red.600"}>
              {testResult.success ? "Success" : "Error"}
            </Text>
            <Text fontSize="sm" mt={1}>
              {testResult.success 
                ? `Found ${testResult.data?.length || 0} roadmaps`
                : testResult.error
              }
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default ApiTest;
