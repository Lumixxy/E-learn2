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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure
} from "@chakra-ui/react";
import { useRef } from "react";

export default function PrivacySettings({ settings, onChange }) {
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.500", "secondaryGray.400");
  const cardBg = useColorModeValue("white", "navy.800");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleChange = (category, field, value) => {
    onChange('privacy', category, field, value);
  };

  const handleDataExport = () => {
    // Implement data export functionality
    console.log('Exporting data...');
  };

  const handleAccountDeletion = () => {
    // Implement account deletion functionality
    console.log('Deleting account...');
    onClose();
  };

  return (
    <Card variant="panel" bg={cardBg} p={4}>
      <VStack spacing={6} align="stretch">
        {/* Data Sharing */}
        <Text fontWeight="bold" color={textColorPrimary} fontSize="lg">
          Data Sharing
        </Text>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Learning Data</FormLabel>
          <Switch
            isChecked={settings.privacy.dataSharing.learningData}
            onChange={(e) => handleChange('dataSharing', 'learningData', e.target.checked)}
          />
        </FormControl>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Progress Data</FormLabel>
          <Switch
            isChecked={settings.privacy.dataSharing.progressData}
            onChange={(e) => handleChange('dataSharing', 'progressData', e.target.checked)}
          />
        </FormControl>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Analytics Data</FormLabel>
          <Switch
            isChecked={settings.privacy.dataSharing.analyticsData}
            onChange={(e) => handleChange('dataSharing', 'analyticsData', e.target.checked)}
          />
        </FormControl>

        <Divider />

        {/* Visibility */}
        <Text fontWeight="bold" color={textColorPrimary} fontSize="lg">
          Visibility
        </Text>

        <FormControl>
          <FormLabel>Learning Activity</FormLabel>
          <Select
            value={settings.privacy.visibility.learningActivity}
            onChange={(e) => handleChange('visibility', 'learningActivity', e.target.value)}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="selective">Selective</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Achievements</FormLabel>
          <Select
            value={settings.privacy.visibility.achievements}
            onChange={(e) => handleChange('visibility', 'achievements', e.target.value)}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="selective">Selective</option>
          </Select>
        </FormControl>

        <Divider />

        {/* Security */}
        <Text fontWeight="bold" color={textColorPrimary} fontSize="lg">
          Security
        </Text>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Two-Factor Authentication</FormLabel>
          <Switch
            isChecked={settings.privacy.security.twoFactorAuth}
            onChange={(e) => handleChange('security', 'twoFactorAuth', e.target.checked)}
          />
        </FormControl>

        {settings.privacy.security.twoFactorAuth && (
          <FormControl>
            <FormLabel>Two-Factor Method</FormLabel>
            <Select
              value={settings.privacy.security.twoFactorMethod}
              onChange={(e) => handleChange('security', 'twoFactorMethod', e.target.value)}
            >
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="authenticator">Authenticator App</option>
            </Select>
          </FormControl>
        )}

        <FormControl>
          <FormLabel>Auto-Logout (minutes)</FormLabel>
          <NumberInput
            value={settings.privacy.security.autoLogout}
            onChange={(value) => handleChange('security', 'autoLogout', parseInt(value))}
            min={5}
            max={120}
            step={5}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Device Management</FormLabel>
          <Switch
            isChecked={settings.privacy.security.deviceManagement}
            onChange={(e) => handleChange('security', 'deviceManagement', e.target.checked)}
          />
        </FormControl>

        <Divider />

        {/* Data Control */}
        <Text fontWeight="bold" color={textColorPrimary} fontSize="lg">
          Data Control
        </Text>

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Enable Data Export</FormLabel>
          <Switch
            isChecked={settings.privacy.dataControl.exportEnabled}
            onChange={(e) => handleChange('dataControl', 'exportEnabled', e.target.checked)}
          />
        </FormControl>

        {settings.privacy.dataControl.exportEnabled && (
          <Button
            colorScheme="brand"
            onClick={handleDataExport}
            isDisabled={!settings.privacy.dataControl.exportEnabled}
          >
            Export My Data
          </Button>
        )}

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel mb="0">Enable Account Deletion</FormLabel>
          <Switch
            isChecked={settings.privacy.dataControl.deletionEnabled}
            onChange={(e) => handleChange('dataControl', 'deletionEnabled', e.target.checked)}
          />
        </FormControl>

        {settings.privacy.dataControl.deletionEnabled && (
          <Button
            colorScheme="red"
            onClick={onOpen}
            isDisabled={!settings.privacy.dataControl.deletionEnabled}
          >
            Delete My Account
          </Button>
        )}

        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Account
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? This action cannot be undone. All your data will be permanently deleted.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={handleAccountDeletion} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </VStack>
    </Card>
  );
} 