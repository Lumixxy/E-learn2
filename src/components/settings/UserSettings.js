// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  useColorMode,
  VStack,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
  ScaleFade,
  Fade,
  SlideFade,
  Grid,
  GridItem,
  Divider,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Badge,
  Tooltip,
  Select,
  Switch,
  Card as ChakraCard,
  CardBody
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
// React imports
import React, { useState, useEffect } from "react";
// Assets
import { 
  MdSearch, 
  MdSettings, 
  MdVideoLibrary,
  MdAccessibility, 
  MdAnalytics, 
  MdNotifications, 
  MdSecurity, 
  MdPerson, 
  MdSchool, 
  MdLanguage, 
  MdSpeed, 
  MdFormatListBulleted, 
  MdHighQuality, 
  MdSubtitles, 
  MdVolumeUp, 
  MdTextFields, 
  MdTouchApp, 
  MdDownload, 
  MdCloudOff, 
  MdAutoAwesome, 
  MdGroup, 
  MdChat, 
  MdForum, 
  MdVisibility, 
  MdDataUsage, 
  MdShare, 
  MdEmail, 
  MdSms, 
  MdPushPin, 
  MdPalette, 
  MdDarkMode, 
  MdLightMode, 
  MdTranslate, 
  MdKeyboard, 
  MdMouse, 
  MdPsychology, 
  MdHearing, 
  MdScreenReader, 
  MdTextFormat 
} from "react-icons/md";
import LearningPreferences from "./LearningPreferences";
import AccessibilitySettings from "./AccessibilitySettings";
import AnalyticsSettings from "./AnalyticsSettings";
import ContentSettings from "./ContentSettings";
import CommunicationSettings from "./CommunicationSettings";
import PrivacySettings from './PrivacySettings';

const UserSettings = () => {
  // State hooks
  const [activeTab, setActiveTab] = useState(0);
  const [settings, setSettings] = useState({
    // Learning Preferences
    learningPreferences: {
      style: "visual",
      primaryLanguage: "english",
      skillLevel: "intermediate",
      learningPace: "moderate",
      preferredSessionDuration: 45,
      preferredContentFormat: ["video", "text"]
    },
    
    // Accessibility
    accessibility: {
      visual: {
        fontSize: 16,
        highContrast: false,
        colorBlindMode: "none",
        reducedMotion: false
      },
      motor: {
        keyboardNavigation: true,
        clickAndHoldDuration: 500,
        touchTargetSize: "medium"
      },
      cognitive: {
        simplifiedInterface: false,
        readingGuide: false,
        focusMode: false
      },
      hearing: {
        autoCaptions: true,
        volumeBoost: false,
        visualAlerts: true
      },
      screenReader: {
        enabled: true,
        voiceSpeed: 1,
        voiceType: "female"
      },
      dyslexia: {
        enabled: false,
        fontType: "opendyslexic",
        letterSpacing: 1.2,
        wordSpacing: 1.5
      }
    },
    
    // Analytics & Progress
    analytics: {
      progressTracking: {
        granularity: "detailed",
        studyStreaks: true,
        performanceInsights: true
      },
      studyTracking: {
        timeTracking: true,
        focusSessions: true,
        breakReminders: true
      },
      reports: {
        frequency: "weekly",
        shareProgress: true,
        achievementSharing: true
      }
    },
    
    // Content Interaction
    contentInteraction: {
      video: {
        quality: "auto",
        playbackSpeed: 1,
        autoPlay: false,
        subtitles: true
      },
      audio: {
        quality: "high",
        volumeBoost: false,
        backgroundPlay: true
      },
      reading: {
        fontSize: 16,
        lineHeight: 1.5,
        fontFamily: "default",
        darkMode: false
      },
      interactive: {
        animations: true,
        hoverEffects: true,
        dragAndDrop: true
      },
      offline: {
        downloadQuality: "high",
        autoDownload: false,
        storageLimit: 2
      }
    },
    
    // Communication & Collaboration
    communication: {
      forum: {
        notifications: true,
        participationLevel: "active",
        topicSubscriptions: true
      },
      peer: {
        studyGroups: true,
        peerReviews: true,
        messaging: true
      },
      instructor: {
        officeHours: true,
        feedbackRequests: true,
        progressUpdates: true
      },
      aiAssistant: {
        enabled: true,
        responseStyle: "detailed",
        learningSuggestions: true
      },
      studyBuddy: {
        matching: true,
        availability: "flexible",
        preferences: ["same-subject", "similar-level"]
      },
      community: {
        events: true,
        challenges: true,
        achievements: true
      }
    },
    
    // Privacy & Security
    privacy: {
      profile: {
        visibility: "public",
        showProgress: true,
        showAchievements: true
      },
      data: {
        usageAnalytics: true,
        personalizedContent: true,
        thirdPartySharing: false
      },
      security: {
        twoFactorAuth: false,
        sessionTimeout: 30,
        loginNotifications: true
      }
    },
    
    // Notifications
    notifications: {
      email: {
        enabled: true,
        frequency: "daily",
        types: ["progress", "achievements", "reminders"]
      },
      push: {
        enabled: true,
        types: ["messages", "updates", "reminders"]
      },
      sms: {
        enabled: false,
        types: ["important", "urgent"]
      },
      inApp: {
        enabled: true,
        types: ["all"]
      }
    },
    
    // Platform Customization
    customization: {
      theme: {
        mode: "light",
        primaryColor: "blue",
        accentColor: "purple"
      },
      layout: {
        density: "comfortable",
        sidebar: "left",
        navigation: "top"
      },
      language: {
        interface: "english",
        content: "english",
        subtitles: "english"
      }
    }
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [originalSettings, setOriginalSettings] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();
  
  // Color mode values
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.500", "secondaryGray.400");
  const brandColor = useColorModeValue("brand.500", "brand.400");
  const cardBg = useColorModeValue("white", "navy.800");
  const cardShadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  const hoverBg = useColorModeValue("gray.100", "navy.700");
  const activeBg = useColorModeValue("gray.200", "navy.700");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!originalSettings) {
      setOriginalSettings(JSON.parse(JSON.stringify(settings)));
    }
  }, [settings]);

  const handleChange = (category, key1, key2, val) => {
    setSettings(prevSettings => {
      const newSettings = { ...prevSettings };

      if (val !== undefined) {
        // This is the case for nested properties (4 arguments: category, subcategory, field, value)
        // e.g., handleChange("accessibility", "visual", "fontSize", 16)
        newSettings[category] = {
          ...newSettings[category],
          [key1]: {
            ...newSettings[category][key1],
            [key2]: val
          }
        };
      } else {
        // This is the case for direct properties under a category (3 arguments: category, field, value)
        // e.g., handleChange("learningPreferences", "style", "visual") from LearningPreferences.js
        // or handleChange("learningPreferences", "style", style) from UserSettings.js's own buttons.
        newSettings[category] = {
          ...newSettings[category],
          [key1]: key2 // key1 is the field name, key2 is the value
        };
      }
      return newSettings;
    });
    setHasChanges(true);
  };

  const handleSave = () => {
    setOriginalSettings(JSON.parse(JSON.stringify(settings)));
    setHasChanges(false);
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleReset = () => {
    setSettings(JSON.parse(JSON.stringify(originalSettings)));
    setHasChanges(false);
    toast({
      title: "Settings Reset",
      description: "Your settings have been reset to their original values.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const tabs = [
    {
      name: "Learning Preferences",
      icon: MdSchool,
      component: (
        <ScaleFade initialScale={0.9} in={true}>
          <VStack spacing={6} align="stretch">
            <ChakraCard p={6} bg={cardBg} borderWidth="1px" borderColor={borderColor} _hover={{ shadow: "lg" }}>
              <VStack spacing={4} align="stretch">
                <HStack>
                  <Icon as={MdSchool} color={brandColor} boxSize={6} />
                  <Text fontSize="lg" fontWeight="bold" color={textColorPrimary}>
                    Learning Style
                  </Text>
                </HStack>
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  {["visual", "auditory", "reading", "kinesthetic"].map((style) => (
                    <GridItem key={style}>
                      <Button
                        w="100%"
                        variant={settings.learningPreferences.style === style ? "solid" : "outline"}
                        colorScheme="brand"
                        onClick={() => handleChange("learningPreferences", "style", style)}
                        _hover={{ transform: "translateY(-2px)", shadow: "md" }}
                        transition="all 0.2s"
                      >
                        {style.charAt(0).toUpperCase() + style.slice(1)}
                      </Button>
                    </GridItem>
                  ))}
                </Grid>
              </VStack>
            </ChakraCard>

            <ChakraCard p={6} bg={cardBg} borderWidth="1px" borderColor={borderColor} _hover={{ shadow: "lg" }}>
              <VStack spacing={4} align="stretch">
                <HStack>
                  <Icon as={MdLanguage} color={brandColor} boxSize={6} />
                  <Text fontSize="lg" fontWeight="bold" color={textColorPrimary}>
                    Language & Level
                  </Text>
                </HStack>
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <GridItem>
                    <VStack align="stretch" spacing={2}>
                      <Text color={textColorSecondary}>Primary Language</Text>
                      <Select
                        value={settings.learningPreferences.primaryLanguage}
                        onChange={(e) => handleChange("learningPreferences", "primaryLanguage", e.target.value)}
                        bg={cardBg}
                        borderColor={borderColor}
                      >
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                        <option value="french">French</option>
                        <option value="german">German</option>
                      </Select>
                    </VStack>
                  </GridItem>
                  <GridItem>
                    <VStack align="stretch" spacing={2}>
                      <Text color={textColorSecondary}>Skill Level</Text>
                      <Select
                        value={settings.learningPreferences.skillLevel}
                        onChange={(e) => handleChange("learningPreferences", "skillLevel", e.target.value)}
                        bg={cardBg}
                        borderColor={borderColor}
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </Select>
                    </VStack>
                  </GridItem>
                </Grid>
              </VStack>
            </ChakraCard>

            <ChakraCard p={6} bg={cardBg} borderWidth="1px" borderColor={borderColor} _hover={{ shadow: "lg" }}>
              <VStack spacing={4} align="stretch">
                <HStack>
                  <Icon as={MdSpeed} color={brandColor} boxSize={6} />
                  <Text fontSize="lg" fontWeight="bold" color={textColorPrimary}>
                    Learning Pace
                  </Text>
                </HStack>
                <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                  {["slow", "moderate", "fast"].map((pace) => (
                    <GridItem key={pace}>
                      <Button
                        w="100%"
                        variant={settings.learningPreferences.learningPace === pace ? "solid" : "outline"}
                        colorScheme="brand"
                        onClick={() => handleChange("learningPreferences", "learningPace", pace)}
                        _hover={{ transform: "translateY(-2px)", shadow: "md" }}
                        transition="all 0.2s"
                      >
                        {pace.charAt(0).toUpperCase() + pace.slice(1)}
                      </Button>
                    </GridItem>
                  ))}
                </Grid>
              </VStack>
            </ChakraCard>
          </VStack>
        </ScaleFade>
      )
    },
    {
      name: "Accessibility",
      icon: MdAccessibility,
      component: (
        <SlideFade in={true} offsetY="20px">
          <VStack spacing={6} align="stretch">
            <ChakraCard p={6} bg={cardBg} borderWidth="1px" borderColor={borderColor} _hover={{ shadow: "lg" }}>
              <VStack spacing={4} align="stretch">
                <HStack>
                  <Icon as={MdTextFormat} color={brandColor} boxSize={6} />
                  <Text fontSize="lg" fontWeight="bold" color={textColorPrimary}>
                    Visual Settings
                  </Text>
                </HStack>
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <GridItem>
                    <VStack align="stretch" spacing={2}>
                      <Text color={textColorSecondary}>Font Size</Text>
                      <Input
                        type="number"
                        value={settings.accessibility.visual.fontSize}
                        onChange={(e) => handleChange("accessibility", "visual", "fontSize", parseInt(e.target.value))}
                        bg={cardBg}
                        borderColor={borderColor}
                      />
                    </VStack>
                  </GridItem>
                  <GridItem>
                    <VStack align="stretch" spacing={2}>
                      <Text color={textColorSecondary}>High Contrast</Text>
                      <Switch
                        isChecked={settings.accessibility.visual.highContrast}
                        onChange={(e) => handleChange("accessibility", "visual", "highContrast", e.target.checked)}
                        colorScheme="brand"
                      />
                    </VStack>
                  </GridItem>
                </Grid>
              </VStack>
            </ChakraCard>

            <ChakraCard p={6} bg={cardBg} borderWidth="1px" borderColor={borderColor} _hover={{ shadow: "lg" }}>
              <VStack spacing={4} align="stretch">
                <HStack>
                  <Icon as={MdKeyboard} color={brandColor} boxSize={6} />
                  <Text fontSize="lg" fontWeight="bold" color={textColorPrimary}>
                    Motor Settings
                  </Text>
                </HStack>
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <GridItem>
                    <VStack align="stretch" spacing={2}>
                      <Text color={textColorSecondary}>Keyboard Navigation</Text>
                      <Switch
                        isChecked={settings.accessibility.motor.keyboardNavigation}
                        onChange={(e) => handleChange("accessibility", "motor", "keyboardNavigation", e.target.checked)}
                        colorScheme="brand"
                      />
                    </VStack>
                  </GridItem>
                  <GridItem>
                    <VStack align="stretch" spacing={2}>
                      <Text color={textColorSecondary}>Touch Target Size</Text>
                      <Select
                        value={settings.accessibility.motor.touchTargetSize}
                        onChange={(e) => handleChange("accessibility", "motor", "touchTargetSize", e.target.value)}
                        bg={cardBg}
                        borderColor={borderColor}
                      >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </Select>
                    </VStack>
                  </GridItem>
                </Grid>
              </VStack>
            </ChakraCard>
          </VStack>
        </SlideFade>
      )
    },
    {
      name: "Content & Media",
      icon: MdVideoLibrary,
      component: (
        <Fade in={true}>
          <VStack spacing={6} align="stretch">
            <ChakraCard p={6} bg={cardBg} borderWidth="1px" borderColor={borderColor} _hover={{ shadow: "lg" }}>
              <VStack spacing={4} align="stretch">
                <HStack>
                  <Icon as={MdHighQuality} color={brandColor} boxSize={6} />
                  <Text fontSize="lg" fontWeight="bold" color={textColorPrimary}>
                    Video Settings
                  </Text>
                </HStack>
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <GridItem>
                    <VStack align="stretch" spacing={2}>
                      <Text color={textColorSecondary}>Quality</Text>
                      <Select
                        value={settings.contentInteraction.video.quality}
                        onChange={(e) => handleChange("contentInteraction", "video", "quality", e.target.value)}
                        bg={cardBg}
                        borderColor={borderColor}
                      >
                        <option value="auto">Auto</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </Select>
                    </VStack>
                  </GridItem>
                  <GridItem>
                    <VStack align="stretch" spacing={2}>
                      <Text color={textColorSecondary}>Subtitles</Text>
                      <Switch
                        isChecked={settings.contentInteraction.video.subtitles}
                        onChange={(e) => handleChange("contentInteraction", "video", "subtitles", e.target.checked)}
                        colorScheme="brand"
                      />
                    </VStack>
                  </GridItem>
                </Grid>
              </VStack>
            </ChakraCard>

            <ChakraCard p={6} bg={cardBg} borderWidth="1px" borderColor={borderColor} _hover={{ shadow: "lg" }}>
              <VStack spacing={4} align="stretch">
                <HStack>
                  <Icon as={MdVolumeUp} color={brandColor} boxSize={6} />
                  <Text fontSize="lg" fontWeight="bold" color={textColorPrimary}>
                    Audio Settings
                  </Text>
                </HStack>
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <GridItem>
                    <VStack align="stretch" spacing={2}>
                      <Text color={textColorSecondary}>Quality</Text>
                      <Select
                        value={settings.contentInteraction.audio.quality}
                        onChange={(e) => handleChange("contentInteraction", "audio", "quality", e.target.value)}
                        bg={cardBg}
                        borderColor={borderColor}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </Select>
                    </VStack>
                  </GridItem>
                  <GridItem>
                    <VStack align="stretch" spacing={2}>
                      <Text color={textColorSecondary}>Background Play</Text>
                      <Switch
                        isChecked={settings.contentInteraction.audio.backgroundPlay}
                        onChange={(e) => handleChange("contentInteraction", "audio", "backgroundPlay", e.target.checked)}
                        colorScheme="brand"
                      />
                    </VStack>
                  </GridItem>
                </Grid>
              </VStack>
            </ChakraCard>
          </VStack>
        </Fade>
      )
    },
    {
      name: "Notifications",
      icon: MdNotifications,
      component: (
        <ScaleFade initialScale={0.9} in={true}>
          <VStack spacing={6} align="stretch">
            <ChakraCard p={6} bg={cardBg} borderWidth="1px" borderColor={borderColor} _hover={{ shadow: "lg" }}>
              <VStack spacing={4} align="stretch">
                <HStack>
                  <Icon as={MdEmail} color={brandColor} boxSize={6} />
                  <Text fontSize="lg" fontWeight="bold" color={textColorPrimary}>
                    Email Notifications
                  </Text>
                </HStack>
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <GridItem>
                    <VStack align="stretch" spacing={2}>
                      <Text color={textColorSecondary}>Enabled</Text>
                      <Switch
                        isChecked={settings.notifications.email.enabled}
                        onChange={(e) => handleChange("notifications", "email", "enabled", e.target.checked)}
                        colorScheme="brand"
                      />
                    </VStack>
                  </GridItem>
                  <GridItem>
                    <VStack align="stretch" spacing={2}>
                      <Text color={textColorSecondary}>Frequency</Text>
                      <Select
                        value={settings.notifications.email.frequency}
                        onChange={(e) => handleChange("notifications", "email", "frequency", e.target.value)}
                        bg={cardBg}
                        borderColor={borderColor}
                      >
                        <option value="realtime">Real-time</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                      </Select>
                    </VStack>
                  </GridItem>
                </Grid>
              </VStack>
            </ChakraCard>

            <ChakraCard p={6} bg={cardBg} borderWidth="1px" borderColor={borderColor} _hover={{ shadow: "lg" }}>
              <VStack spacing={4} align="stretch">
                <HStack>
                  <Icon as={MdPushPin} color={brandColor} boxSize={6} />
                  <Text fontSize="lg" fontWeight="bold" color={textColorPrimary}>
                    Push Notifications
                  </Text>
                </HStack>
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <GridItem>
                    <VStack align="stretch" spacing={2}>
                      <Text color={textColorSecondary}>Enabled</Text>
                      <Switch
                        isChecked={settings.notifications.push.enabled}
                        onChange={(e) => handleChange("notifications", "push", "enabled", e.target.checked)}
                        colorScheme="brand"
                      />
                    </VStack>
                  </GridItem>
                  <GridItem>
                    <VStack align="stretch" spacing={2}>
                      <Text color={textColorSecondary}>Types</Text>
                      <Select
                        value={settings.notifications.push.types[0]}
                        onChange={(e) => handleChange("notifications", "push", "types", [e.target.value])}
                        bg={cardBg}
                        borderColor={borderColor}
                      >
                        <option value="all">All</option>
                        <option value="important">Important Only</option>
                        <option value="none">None</option>
                      </Select>
                    </VStack>
                  </GridItem>
                </Grid>
              </VStack>
            </ChakraCard>
          </VStack>
        </ScaleFade>
      )
    }
  ];

  return (
    <ChakraCard p='20px' bg={cardBg}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Flex justify="space-between" align="center">
          <HStack spacing={2}>
            <Icon as={MdSettings} color={brandColor} boxSize={6} />
            <Text fontSize="2xl" fontWeight="bold" color={textColorPrimary}>
              Settings
            </Text>
          </HStack>
          <HStack spacing={4}>
            {hasChanges && (
              <>
                <Button
                  variant="outline"
                  colorScheme="brand"
                  onClick={handleReset}
                  _hover={{ transform: "translateY(-2px)", shadow: "md" }}
                  transition="all 0.2s"
                >
                  Reset
                </Button>
                <Button
                  colorScheme="brand"
                  onClick={handleSave}
                  _hover={{ transform: "translateY(-2px)", shadow: "md" }}
                  transition="all 0.2s"
                >
                  Save Changes
                </Button>
              </>
            )}
          </HStack>
        </Flex>

        <Divider />

        {/* Search */}
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={MdSearch} color={textColorSecondary} />
          </InputLeftElement>
          <Input
            placeholder="Search settings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            bg={cardBg}
            borderColor={borderColor}
            _hover={{ borderColor: brandColor }}
            _focus={{ borderColor: brandColor, boxShadow: "0 0 0 1px " + brandColor }}
          />
        </InputGroup>

        {/* Tabs */}
        <Tabs
          variant="enclosed"
          colorScheme="brand"
          index={activeTab}
          onChange={setActiveTab}
          isLazy
        >
          <TabList
            overflowX="auto"
            css={{
              '&::-webkit-scrollbar': {
                height: '4px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                background: brandColor,
                borderRadius: '4px',
              },
            }}
            position="relative"
            _after={{
              content: '""',
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "40px",
              background: `linear-gradient(to right, transparent, ${cardBg})`,
              pointerEvents: "none",
            }}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                _selected={{ 
                  color: brandColor, 
                  borderColor: brandColor,
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                transition="all 0.2s"
                minW="max-content"
                px={4}
                py={3}
                mx={1}
                borderRadius="md"
                position="relative"
                bg={hoverBg}
                _hover={{ 
                  transform: "translateY(-2px)",
                }}
              >
                <HStack spacing={2}>
                  <Icon as={tab.icon} />
                  <Text whiteSpace="nowrap">{tab.name}</Text>
                </HStack>
              </Tab>
            ))}
          </TabList>

          <TabPanels>
            {tabs.map((tab, index) => (
              <TabPanel key={index}>
                {tab.component}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </VStack>
    </ChakraCard>
  );
};

export default UserSettings; 