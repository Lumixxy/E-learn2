import React from 'react';
import {
  VStack,
  FormControl,
  FormLabel,
  Select,
  Radio,
  RadioGroup,
  Stack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Checkbox,
  Text,
  Card,
  useColorModeValue
} from "@chakra-ui/react";

export default function LearningPreferences({ settings, onChange }) {
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.500", "secondaryGray.400");
  const cardBg = useColorModeValue("white", "navy.800");

  const handleChange = (field, value) => {
    onChange('learningPreferences', field, value);
  };

  return (
    <Card variant="panel" bg={cardBg} p={4}>
      <VStack spacing={6} align="stretch">
        <Text fontWeight="bold" color={textColorPrimary} fontSize="lg">
          Learning Style
        </Text>
        
        <FormControl>
          <FormLabel>Learning Style Preference</FormLabel>
          <Select
            value={settings.learningPreferences.style}
            onChange={(e) => handleChange('style', e.target.value)}
          >
            <option value="visual">Visual</option>
            <option value="auditory">Auditory</option>
            <option value="kinesthetic">Kinesthetic</option>
            <option value="reading">Reading/Writing</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Primary Language</FormLabel>
          <Select
            value={settings.learningPreferences.primaryLanguage}
            onChange={(e) => handleChange('primaryLanguage', e.target.value)}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="zh">Chinese</option>
            <option value="ja">Japanese</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Skill Level</FormLabel>
          <RadioGroup
            value={settings.learningPreferences.skillLevel}
            onChange={(value) => handleChange('skillLevel', value)}
          >
            <Stack direction="row" spacing={4}>
              <Radio value="beginner">Beginner</Radio>
              <Radio value="intermediate">Intermediate</Radio>
              <Radio value="advanced">Advanced</Radio>
              <Radio value="expert">Expert</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        <FormControl>
          <FormLabel>Learning Pace</FormLabel>
          <Select
            value={settings.learningPreferences.learningPace}
            onChange={(e) => handleChange('learningPace', e.target.value)}
          >
            <option value="self-paced">Self-paced</option>
            <option value="structured">Structured</option>
            <option value="intensive">Intensive</option>
            <option value="weekend-only">Weekend-only</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Preferred Session Duration (minutes)</FormLabel>
          <NumberInput
            value={settings.learningPreferences.sessionDuration}
            onChange={(value) => handleChange('sessionDuration', parseInt(value))}
            min={15}
            max={180}
            step={15}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel>Preferred Content Format</FormLabel>
          <Stack spacing={2}>
            <Checkbox
              isChecked={settings.learningPreferences.contentFormat.includes('video')}
              onChange={(e) => {
                const newFormats = e.target.checked
                  ? [...settings.learningPreferences.contentFormat, 'video']
                  : settings.learningPreferences.contentFormat.filter(f => f !== 'video');
                handleChange('contentFormat', newFormats);
              }}
            >
              Video
            </Checkbox>
            <Checkbox
              isChecked={settings.learningPreferences.contentFormat.includes('text')}
              onChange={(e) => {
                const newFormats = e.target.checked
                  ? [...settings.learningPreferences.contentFormat, 'text']
                  : settings.learningPreferences.contentFormat.filter(f => f !== 'text');
                handleChange('contentFormat', newFormats);
              }}
            >
              Text
            </Checkbox>
            <Checkbox
              isChecked={settings.learningPreferences.contentFormat.includes('interactive')}
              onChange={(e) => {
                const newFormats = e.target.checked
                  ? [...settings.learningPreferences.contentFormat, 'interactive']
                  : settings.learningPreferences.contentFormat.filter(f => f !== 'interactive');
                handleChange('contentFormat', newFormats);
              }}
            >
              Interactive
            </Checkbox>
            <Checkbox
              isChecked={settings.learningPreferences.contentFormat.includes('mixed')}
              onChange={(e) => {
                const newFormats = e.target.checked
                  ? [...settings.learningPreferences.contentFormat, 'mixed']
                  : settings.learningPreferences.contentFormat.filter(f => f !== 'mixed');
                handleChange('contentFormat', newFormats);
              }}
            >
              Mixed Media
            </Checkbox>
          </Stack>
        </FormControl>
      </VStack>
    </Card>
  );
} 