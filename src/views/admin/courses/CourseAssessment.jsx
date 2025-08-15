import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Heading, VStack, Text, Radio, RadioGroup, Stack, Button, Spinner } from '@chakra-ui/react';
import { WebWarriorAPI } from '../../../api/webwarrior';

const CourseAssessment = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await WebWarriorAPI.getAssessment(courseId);
        setQuestions(data.questions || []);
      } finally {
        setLoading(false);
      }
    })();
  }, [courseId]);

  const submit = async () => {
    const arr = questions.map((_, idx) => answers[idx] ?? -1);
    const r = await WebWarriorAPI.submitAssessment(courseId, arr);
    setResult(r);
  };

  if (loading) return <Box minH='40vh' display='flex' alignItems='center' justifyContent='center'><Spinner size='xl' /></Box>;
  if (result) return (
    <Box>
      <Heading size='lg' mb={3}>Result</Heading>
      <Text mb={4}>Score: {Math.round(result.score)}% — {result.passed ? 'Passed' : 'Failed'}</Text>
      <Button colorScheme='purple' onClick={() => navigate(`/admin/adventure-path`)}>Back to Adventure Path</Button>
    </Box>
  );

  return (
    <Box>
      <Heading size='lg' mb={4}>Course Assessment</Heading>
      <VStack align='stretch' spacing={6}>
        {questions.map((q, idx) => (
          <Box key={idx} bg='white' borderWidth='1px' rounded='xl' p={5}>
            <Text fontWeight='600' mb={3}>{idx + 1}. {q.question}</Text>
            <RadioGroup onChange={(v) => setAnswers(a => ({ ...a, [idx]: parseInt(v) }))} value={answers[idx]}>
              <Stack>
                {q.options.map((opt, i) => (
                  <Radio key={i} value={i}>{opt}</Radio>
                ))}
              </Stack>
            </RadioGroup>
          </Box>
        ))}
      </VStack>
      <Button mt={6} colorScheme='purple' onClick={submit}>Submit</Button>
    </Box>
  );
};

export default CourseAssessment;

 

