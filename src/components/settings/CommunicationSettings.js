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

export default function CommunicationSettings({ settings, onChange }) {
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.500", "secondaryGray.400");
  const cardBg = useColorModeValue("white", "navy.800");

  const handleChange = (category, field, value) => {
    onChange('communication', category, field, value);
  };

  return (
    <Card variant="panel" bg={cardBg} p={4}>
      <VStack spacing={6} align="stretch">
        {/* Forum Settings */}
        <Text fontWeight="bold" color={textColorPrimary} fontSize="lg">
          Discussion Forum
        </Text>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Forum Notifications</FormLabel>
          <Switch
            isChecked={settings.communication.forum.notifications}
            onChange={(e) => handleChange('forum', 'notifications', e.target.checked)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Participation Level</FormLabel>
          <Select
            value={settings.communication.forum.participationLevel}
            onChange={(e) => handleChange('forum', 'participationLevel', e.target.value)}
          >
            <option value="active">Active</option>
            <option value="passive">Passive</option>
            <option value="none">None</option>
          </Select>
        </FormControl>

        <Divider />

        {/* Peer Interaction */}
        <Text fontWeight="bold" color={textColorPrimary} fontSize="lg">
          Peer Interaction
        </Text>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Study Groups</FormLabel>
          <Switch
            isChecked={settings.communication.peerInteraction.studyGroups}
            onChange={(e) => handleChange('peerInteraction', 'studyGroups', e.target.checked)}
          />
        </FormControl>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Collaboration Tools</FormLabel>
          <Switch
            isChecked={settings.communication.peerInteraction.collaboration}
            onChange={(e) => handleChange('peerInteraction', 'collaboration', e.target.checked)}
          />
        </FormControl>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Peer Feedback</FormLabel>
          <Switch
            isChecked={settings.communication.peerInteraction.peerFeedback}
            onChange={(e) => handleChange('peerInteraction', 'peerFeedback', e.target.checked)}
          />
        </FormControl>

        <Divider />

        {/* Instructor Communication */}
        <Text fontWeight="bold" color={textColorPrimary} fontSize="lg">
          Instructor Communication
        </Text>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Office Hours</FormLabel>
          <Switch
            isChecked={settings.communication.instructor.officeHours}
            onChange={(e) => handleChange('instructor', 'officeHours', e.target.checked)}
          />
        </FormControl>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Direct Messaging</FormLabel>
          <Switch
            isChecked={settings.communication.instructor.directMessaging}
            onChange={(e) => handleChange('instructor', 'directMessaging', e.target.checked)}
          />
        </FormControl>

        <Divider />

        {/* AI Learning Assistant */}
        <Text fontWeight="bold" color={textColorPrimary} fontSize="lg">
          AI Learning Assistant
        </Text>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Personalized Recommendations</FormLabel>
          <Switch
            isChecked={settings.communication.aiAssistant.recommendations}
            onChange={(e) => handleChange('aiAssistant', 'recommendations', e.target.checked)}
          />
        </FormControl>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Help Suggestions</FormLabel>
          <Switch
            isChecked={settings.communication.aiAssistant.helpSuggestions}
            onChange={(e) => handleChange('aiAssistant', 'helpSuggestions', e.target.checked)}
          />
        </FormControl>

        <Divider />

        {/* Study Buddy */}
        <Text fontWeight="bold" color={textColorPrimary} fontSize="lg">
          Study Buddy Matching
        </Text>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Automatic Matching</FormLabel>
          <Switch
            isChecked={settings.communication.studyBuddy.autoMatching}
            onChange={(e) => handleChange('studyBuddy', 'autoMatching', e.target.checked)}
          />
        </FormControl>

        <Text fontSize="sm" color={textColorSecondary}>
          {settings.communication.studyBuddy.autoMatching
            ? 'You will be automatically matched with study partners based on your learning preferences'
            : 'You can manually find study partners'}
        </Text>

        <Divider />

        {/* Community Features */}
        <Text fontWeight="bold" color={textColorPrimary} fontSize="lg">
          Community Features
        </Text>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Public Profile</FormLabel>
          <Switch
            isChecked={settings.communication.community.publicProfile}
            onChange={(e) => handleChange('community', 'publicProfile', e.target.checked)}
          />
        </FormControl>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Share Achievements</FormLabel>
          <Switch
            isChecked={settings.communication.community.achievementSharing}
            onChange={(e) => handleChange('community', 'achievementSharing', e.target.checked)}
          />
        </FormControl>

        <Text fontSize="sm" color={textColorSecondary}>
          {settings.communication.community.publicProfile
            ? 'Your profile and achievements will be visible to other learners'
            : 'Your profile will be private'}
        </Text>
      </VStack>
    </Card>
  );
} 