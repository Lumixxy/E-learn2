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
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from "@chakra-ui/react";

export default function ContentSettings({ settings, onChange }) {
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.500", "secondaryGray.400");
  const cardBg = useColorModeValue("white", "navy.800");

  const handleChange = (category, field, value) => {
    onChange('contentInteraction', category, field, value);
  };

  return (
    <Card variant="panel" bg={cardBg} p={4}>
      <VStack spacing={6} align="stretch">
        {/* Video Settings */}
        <Text fontWeight="bold" color={textColorPrimary} fontSize="lg">
          Video Settings
        </Text>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Auto-Play Videos</FormLabel>
          <Switch
            isChecked={settings.contentInteraction.video.autoPlay}
            onChange={(e) => handleChange('video', 'autoPlay', e.target.checked)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Playback Speed</FormLabel>
          <Slider
            value={settings.contentInteraction.video.playbackSpeed}
            onChange={(value) => handleChange('video', 'playbackSpeed', value)}
            min={0.5}
            max={2}
            step={0.25}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Text fontSize="sm" color={textColorSecondary}>
            {settings.contentInteraction.video.playbackSpeed}x speed
          </Text>
        </FormControl>

        <FormControl>
          <FormLabel>Video Quality</FormLabel>
          <Select
            value={settings.contentInteraction.video.quality}
            onChange={(e) => handleChange('video', 'quality', e.target.value)}
          >
            <option value="auto">Auto</option>
            <option value="1080p">1080p</option>
            <option value="720p">720p</option>
            <option value="480p">480p</option>
          </Select>
        </FormControl>

        <Divider />

        {/* Audio Settings */}
        <Text fontWeight="bold" color={textColorPrimary} fontSize="lg">
          Audio Settings
        </Text>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Volume Normalization</FormLabel>
          <Switch
            isChecked={settings.contentInteraction.audio.volumeNormalization}
            onChange={(e) => handleChange('audio', 'volumeNormalization', e.target.checked)}
          />
        </FormControl>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Background Noise Reduction</FormLabel>
          <Switch
            isChecked={settings.contentInteraction.audio.noiseReduction}
            onChange={(e) => handleChange('audio', 'noiseReduction', e.target.checked)}
          />
        </FormControl>

        <Divider />

        {/* Reading Settings */}
        <Text fontWeight="bold" color={textColorPrimary} fontSize="lg">
          Reading Settings
        </Text>

        <FormControl>
          <FormLabel>Line Spacing</FormLabel>
          <Slider
            value={settings.contentInteraction.reading.lineSpacing}
            onChange={(value) => handleChange('reading', 'lineSpacing', value)}
            min={1}
            max={2}
            step={0.1}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </FormControl>

        <FormControl>
          <FormLabel>Text Justification</FormLabel>
          <Select
            value={settings.contentInteraction.reading.textJustification}
            onChange={(e) => handleChange('reading', 'textJustification', e.target.value)}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
            <option value="justify">Justify</option>
          </Select>
        </FormControl>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Reading Mode</FormLabel>
          <Switch
            isChecked={settings.contentInteraction.reading.readingMode}
            onChange={(e) => handleChange('reading', 'readingMode', e.target.checked)}
          />
        </FormControl>

        <Divider />

        {/* Interactive Elements */}
        <Text fontWeight="bold" color={textColorPrimary} fontSize="lg">
          Interactive Elements
        </Text>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Enable Animations</FormLabel>
          <Switch
            isChecked={settings.contentInteraction.interactive.animations}
            onChange={(e) => handleChange('interactive', 'animations', e.target.checked)}
          />
        </FormControl>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Hover Effects</FormLabel>
          <Switch
            isChecked={settings.contentInteraction.interactive.hoverEffects}
            onChange={(e) => handleChange('interactive', 'hoverEffects', e.target.checked)}
          />
        </FormControl>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Auto-Advance</FormLabel>
          <Switch
            isChecked={settings.contentInteraction.interactive.autoAdvance}
            onChange={(e) => handleChange('interactive', 'autoAdvance', e.target.checked)}
          />
        </FormControl>

        <Divider />

        {/* Offline Access */}
        <Text fontWeight="bold" color={textColorPrimary} fontSize="lg">
          Offline Access
        </Text>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Auto-Download</FormLabel>
          <Switch
            isChecked={settings.contentInteraction.offline.autoDownload}
            onChange={(e) => handleChange('offline', 'autoDownload', e.target.checked)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Storage Limit (MB)</FormLabel>
          <NumberInput
            value={settings.contentInteraction.offline.storageLimit}
            onChange={(value) => handleChange('offline', 'storageLimit', parseInt(value))}
            min={100}
            max={5000}
            step={100}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <Divider />

        {/* Note-Taking */}
        <Text fontWeight="bold" color={textColorPrimary} fontSize="lg">
          Note-Taking
        </Text>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Built-in Notes</FormLabel>
          <Switch
            isChecked={settings.contentInteraction.notes.builtInNotes}
            onChange={(e) => handleChange('notes', 'builtInNotes', e.target.checked)}
          />
        </FormControl>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">External App Sync</FormLabel>
          <Switch
            isChecked={settings.contentInteraction.notes.externalSync}
            onChange={(e) => handleChange('notes', 'externalSync', e.target.checked)}
          />
        </FormControl>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Annotations</FormLabel>
          <Switch
            isChecked={settings.contentInteraction.notes.annotations}
            onChange={(e) => handleChange('notes', 'annotations', e.target.checked)}
          />
        </FormControl>
      </VStack>
    </Card>
  );
} 