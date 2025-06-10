import React from 'react';
import {
  VStack,
  FormControl,
  FormLabel,
  Switch,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  Card,
  useColorModeValue,
  Divider
} from "@chakra-ui/react";

export default function AccessibilitySettings({ settings, onChange }) {
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.500", "secondaryGray.400");
  const cardBg = useColorModeValue("white", "navy.800");

  const handleChange = (category, field, value) => {
    onChange('accessibility', category, field, value);
  };

  return (
    <Card variant="panel" bg={cardBg} p={4}>
      <VStack spacing={6} align="stretch">
        {/* Visual Accessibility */}
        <Text fontWeight="bold" color={textColorPrimary} fontSize="lg">
          Visual Accessibility
        </Text>
        
        <FormControl>
          <FormLabel>Font Size</FormLabel>
          <Slider
            value={settings.accessibility.visual.fontSize}
            onChange={(value) => handleChange('visual', 'fontSize', value)}
            min={12}
            max={24}
            step={1}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </FormControl>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">High Contrast Mode</FormLabel>
          <Switch
            isChecked={settings.accessibility.visual.highContrast}
            onChange={(e) => handleChange('visual', 'highContrast', e.target.checked)}
          />
        </FormControl>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Color Blind Friendly Mode</FormLabel>
          <Switch
            isChecked={settings.accessibility.visual.colorBlindMode}
            onChange={(e) => handleChange('visual', 'colorBlindMode', e.target.checked)}
          />
        </FormControl>

        <Divider />

        {/* Motor Accessibility */}
        <Text fontWeight="bold" color={textColorPrimary} fontSize="lg">
          Motor Accessibility
        </Text>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Enhanced Keyboard Navigation</FormLabel>
          <Switch
            isChecked={settings.accessibility.motor.keyboardNavigation}
            onChange={(e) => handleChange('motor', 'keyboardNavigation', e.target.checked)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Click-and-Hold Duration (ms)</FormLabel>
          <NumberInput
            value={settings.accessibility.motor.clickHoldTime}
            onChange={(value) => handleChange('motor', 'clickHoldTime', parseInt(value))}
            min={100}
            max={2000}
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

        {/* Cognitive Accessibility */}
        <Text fontWeight="bold" color={textColorPrimary} fontSize="lg">
          Cognitive Accessibility
        </Text>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Simplified Interface</FormLabel>
          <Switch
            isChecked={settings.accessibility.cognitive.simplifiedInterface}
            onChange={(e) => handleChange('cognitive', 'simplifiedInterface', e.target.checked)}
          />
        </FormControl>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Reduced Motion</FormLabel>
          <Switch
            isChecked={settings.accessibility.cognitive.reducedMotion}
            onChange={(e) => handleChange('cognitive', 'reducedMotion', e.target.checked)}
          />
        </FormControl>

        <Divider />

        {/* Hearing Accessibility */}
        <Text fontWeight="bold" color={textColorPrimary} fontSize="lg">
          Hearing Accessibility
        </Text>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Auto-Captions</FormLabel>
          <Switch
            isChecked={settings.accessibility.hearing.autoCaptions}
            onChange={(e) => handleChange('hearing', 'autoCaptions', e.target.checked)}
          />
        </FormControl>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Visual Notification Alerts</FormLabel>
          <Switch
            isChecked={settings.accessibility.hearing.visualAlerts}
            onChange={(e) => handleChange('hearing', 'visualAlerts', e.target.checked)}
          />
        </FormControl>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Transcripts</FormLabel>
          <Switch
            isChecked={settings.accessibility.hearing.transcripts}
            onChange={(e) => handleChange('hearing', 'transcripts', e.target.checked)}
          />
        </FormControl>

        <Divider />

        {/* Screen Reader */}
        <Text fontWeight="bold" color={textColorPrimary} fontSize="lg">
          Screen Reader Support
        </Text>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Enhanced ARIA Labels</FormLabel>
          <Switch
            isChecked={settings.accessibility.screenReader.enhancedLabels}
            onChange={(e) => handleChange('screenReader', 'enhancedLabels', e.target.checked)}
          />
        </FormControl>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Navigation Shortcuts</FormLabel>
          <Switch
            isChecked={settings.accessibility.screenReader.navigationShortcuts}
            onChange={(e) => handleChange('screenReader', 'navigationShortcuts', e.target.checked)}
          />
        </FormControl>

        <Divider />

        {/* Dyslexia Support */}
        <Text fontWeight="bold" color={textColorPrimary} fontSize="lg">
          Dyslexia Support
        </Text>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Dyslexia-Friendly Font</FormLabel>
          <Switch
            isChecked={settings.accessibility.dyslexia.specialFont}
            onChange={(e) => handleChange('dyslexia', 'specialFont', e.target.checked)}
          />
        </FormControl>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Reading Ruler</FormLabel>
          <Switch
            isChecked={settings.accessibility.dyslexia.readingRuler}
            onChange={(e) => handleChange('dyslexia', 'readingRuler', e.target.checked)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Text Spacing</FormLabel>
          <Slider
            value={settings.accessibility.dyslexia.textSpacing}
            onChange={(value) => handleChange('dyslexia', 'textSpacing', value)}
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
      </VStack>
    </Card>
  );
} 