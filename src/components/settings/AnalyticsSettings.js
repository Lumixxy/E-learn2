import React from 'react';
import {
  VStack,
  FormControl,
  FormLabel,
  Select,
  Switch,
  Text,
  Card,
  useColorModeValue,
  Divider,
  Radio,
  RadioGroup,
  Stack
} from "@chakra-ui/react";

export default function AnalyticsSettings({ settings, onChange }) {
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.500", "secondaryGray.400");
  const cardBg = useColorModeValue("white", "navy.800");

  const handleChange = (field, value) => {
    onChange('analytics', field, value);
  };

  return (
    <Card variant="panel" bg={cardBg} p={4}>
      <VStack spacing={6} align="stretch">
        <Text fontWeight="bold" color={textColorPrimary} fontSize="lg">
          Progress Tracking
        </Text>

        <FormControl>
          <FormLabel>Tracking Granularity</FormLabel>
          <RadioGroup
            value={settings.analytics.trackingLevel}
            onChange={(value) => handleChange('trackingLevel', value)}
          >
            <Stack direction="row" spacing={4}>
              <Radio value="basic">Basic</Radio>
              <Radio value="detailed">Detailed</Radio>
              <Radio value="advanced">Advanced</Radio>
            </Stack>
          </RadioGroup>
          <Text fontSize="sm" color={textColorSecondary} mt={2}>
            {settings.analytics.trackingLevel === 'basic' && 'Track only essential progress metrics'}
            {settings.analytics.trackingLevel === 'detailed' && 'Track detailed progress with performance insights'}
            {settings.analytics.trackingLevel === 'advanced' && 'Track comprehensive metrics with detailed analytics'}
          </Text>
        </FormControl>

        <Divider />

        <Text fontWeight="bold" color={textColorPrimary} fontSize="lg">
          Study Tracking
        </Text>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Study Streaks</FormLabel>
          <Switch
            isChecked={settings.analytics.studyStreaks}
            onChange={(e) => handleChange('studyStreaks', e.target.checked)}
          />
        </FormControl>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Performance Insights</FormLabel>
          <Switch
            isChecked={settings.analytics.performanceInsights}
            onChange={(e) => handleChange('performanceInsights', e.target.checked)}
          />
        </FormControl>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Time Tracking</FormLabel>
          <Switch
            isChecked={settings.analytics.timeTracking}
            onChange={(e) => handleChange('timeTracking', e.target.checked)}
          />
        </FormControl>

        <Divider />

        <Text fontWeight="bold" color={textColorPrimary} fontSize="lg">
          Reports & Sharing
        </Text>

        <FormControl>
          <FormLabel>Report Frequency</FormLabel>
          <Select
            value={settings.analytics.reportFrequency}
            onChange={(e) => handleChange('reportFrequency', e.target.value)}
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </Select>
        </FormControl>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Share Achievements</FormLabel>
          <Switch
            isChecked={settings.analytics.achievementSharing}
            onChange={(e) => handleChange('achievementSharing', e.target.checked)}
          />
        </FormControl>

        <Text fontSize="sm" color={textColorSecondary}>
          {settings.analytics.achievementSharing
            ? 'Your achievements will be visible to other learners'
            : 'Your achievements will be private'}
        </Text>
      </VStack>
    </Card>
  );
} 