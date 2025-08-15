import React, { useEffect, useState } from 'react';
import { Box, Heading, VStack, Text, Radio, RadioGroup, Stack, Button, Spinner } from '@chakra-ui/react';
import { WebWarriorAPI } from '../../../api/webwarrior';

const FinalAssessment = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [certReady, setCertReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await WebWarriorAPI.getFinal();
        if (data.questions) setQuestions(data.questions);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const submit = async () => {
    const arr = questions.map((_, idx) => answers[idx] ?? -1);
    const r = await WebWarriorAPI.submitFinal(arr);
    setResult(r);
    if (r.passed) setCertReady(true);
  };

  const downloadCert = async () => {
    const res = await WebWarriorAPI.getCertificate();
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'web_warrior_certificate.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) return <Box minH='40vh' display='flex' alignItems='center' justifyContent='center'><Spinner size='xl' /></Box>;

  if (result) return (
    <Box>
      <Heading size='lg' mb={3}>Final Assessment Result</Heading>
      <Text mb={4}>Score: {Math.round(result.score)}% — {result.passed ? 'Passed' : 'Failed'}</Text>
      {certReady && (
        <Button colorScheme='green' onClick={downloadCert}>Download Certificate</Button>
      )}
    </Box>
  );

  return (
    <Box>
      <Heading size='lg' mb={4}>Final Assessment</Heading>
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

export default FinalAssessment;

 

