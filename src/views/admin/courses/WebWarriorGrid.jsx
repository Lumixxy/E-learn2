import React, { useEffect, useState } from 'react';
import { Box, SimpleGrid, Text, Badge, Progress, Flex, Icon, Tooltip, Spinner } from '@chakra-ui/react';
import { LockIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { WebWarriorAPI } from '../../../api/webwarrior';

const Card = ({ quest }) => {
  const navigate = useNavigate();
  const locked = quest.locked;
  return (
    <Box bg='white' rounded='xl' boxShadow='lg' overflow='hidden' position='relative'
      cursor={locked ? 'not-allowed' : 'pointer'}
      onClick={() => !locked && navigate(`/admin/adventure-path/courses/${quest.id}`)}
      _hover={!locked ? { transform: 'translateY(-2px)', boxShadow: 'xl' } : {}} transition='all 0.2s'>
      <Box h='120px' bg='#7F7CFF' />
      {locked && (
        <Tooltip label='Complete the previous course to unlock.'>
          <Flex position='absolute' inset={0} bg='blackAlpha.400' align='center' justify='center'>
            <Icon as={LockIcon} w={8} h={8} color='white' />
          </Flex>
        </Tooltip>
      )}
      <Box p={5}>
        <Flex justify='space-between' align='center' mb={2}>
          <Text fontWeight='bold' color='navy.700'>Quest {quest.quest_number}: {quest.title}</Text>
          <Badge colorScheme='purple'>{Math.round(quest.progress || 0)}%</Badge>
        </Flex>
        <Progress value={quest.progress || 0} colorScheme='purple' rounded='full' h='8px' />
      </Box>
    </Box>
  );
};

const WebWarriorGrid = () => {
  const [quests, setQuests] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    (async () => {
      try {
        const data = await WebWarriorAPI.getQuests();
        setQuests(data);
      } catch (e) {
        setError('Failed to load courses');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Flex minH='40vh' align='center' justify='center'><Spinner size='xl' /></Flex>;
  if (error) return <Flex minH='40vh' align='center' justify='center'><Text color='red.400'>{error}</Text></Flex>;

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        {(quests || []).map(q => (<Card key={q.id} quest={q} />))}
      </SimpleGrid>
    </Box>
  );
};

export default WebWarriorGrid;

 

