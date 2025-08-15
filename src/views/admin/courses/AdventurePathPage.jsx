import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, HStack, Progress, VStack, Button } from '@chakra-ui/react';
import WebWarriorGrid from './WebWarriorGrid';
import { WebWarriorAPI } from '../../../api/webwarrior';

const AdventurePathPage = () => {
  const [overall, setOverall] = useState({ percent: 0, completed: 0, total: 8 });

  useEffect(() => {
    (async () => {
      try {
        const quests = await WebWarriorAPI.getQuests();
        const percent = quests.length ? Math.round(quests.reduce((a, q) => a + (q.progress || 0), 0) / quests.length) : 0;
        const completed = quests.filter(q => Math.round(q.progress || 0) >= 100).length;
        setOverall({ percent, completed, total: quests.length || 8 });
      } catch (_) {}
    })();
  }, []);

  return (
    <Box bg="#0F172A" color="#E2E8F0" minH="100vh" p={{ base: 4, md: 6 }}>
      <VStack align="stretch" spacing={6}>
        <Box>
          <Heading size="lg">Web Warrior Adventure Path</Heading>
          <Text opacity={0.85}>Complete quests, earn XP, and unlock your certificate.</Text>
        </Box>
        <Box bg="#111827" rounded="xl" p={5} border="1px solid #1f2937">
          <HStack justify="space-between" mb={3}>
            <Text fontWeight="700">Your Progress</Text>
            <HStack spacing={4}>
              <Text>Courses: {overall.completed} / {overall.total}</Text>
              <Text>{overall.percent}%</Text>
            </HStack>
          </HStack>
          <Progress value={overall.percent} colorScheme="purple" height="10px" rounded="full" />
          {overall.completed === overall.total && (
            <Button mt={4} colorScheme="purple" onClick={() => window.location.assign('/admin/final-assessment')}>
              Take Final Assessment
            </Button>
          )}
        </Box>
        <WebWarriorGrid />
      </VStack>
    </Box>
  );
};

export default AdventurePathPage;


