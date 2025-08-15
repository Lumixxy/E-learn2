import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Heading, VStack, HStack, Checkbox, Text, Badge, Button, Progress, Spinner } from '@chakra-ui/react';
import { WebWarriorAPI } from '../../../api/webwarrior';

const WebWarriorCourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const refresh = async () => {
    try {
      const data = await WebWarriorAPI.getModules(courseId);
      setModules(data);
    } catch (e) {
      setError('Failed to load modules');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); /* eslint-disable-next-line */ }, [courseId]);

  const onToggle = async (idx) => {
    await WebWarriorAPI.completeModule(courseId, idx);
    refresh();
  };

  const allComplete = modules.length > 0 && modules.every(m => m.completed);
  const progress = (modules.filter(m => m.completed).length / Math.max(modules.length,1)) * 100;

  if (loading) return <Box minH='40vh' display='flex' alignItems='center' justifyContent='center'><Spinner size='xl' /></Box>;
  if (error) return <Box><Text color='red.400'>{error}</Text></Box>;

  return (
    <Box>
      <Heading size='lg' mb={4}>Modules</Heading>
      <VStack align='stretch' spacing={3}>
        {modules.map(m => (
          <HStack key={m.index} bg='white' borderWidth='1px' borderColor='brand.200' rounded='xl' p={4} justify='space-between'>
            <HStack>
              <Checkbox isChecked={m.completed} onChange={() => onToggle(m.index)} />
              <Text color='navy.700' fontWeight='600'>{m.title}</Text>
            </HStack>
            <Badge colorScheme={m.completed ? 'green' : 'gray'}>{m.completed ? 'Done' : 'Pending'}</Badge>
          </HStack>
        ))}
      </VStack>
      <Box mt={6}><Progress value={progress} h='10px' rounded='full' colorScheme='purple' /></Box>
      <Button mt={6} colorScheme='purple' isDisabled={!allComplete} onClick={() => navigate(`/admin/adventure-path/courses/${courseId}/assessment`)}>
        {allComplete ? 'Start Assessment' : 'Complete all modules to unlock assessment'}
      </Button>
    </Box>
  );
};

export default WebWarriorCourseDetail;

 

