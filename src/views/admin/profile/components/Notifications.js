// Chakra imports
import {
  Box,
  Button,
  Flex,
  Text,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Switch,
  VStack,
  HStack,
  Icon,
  Badge,
  useDisclosure,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
// Custom components
import React, { useState } from "react";
// Assets
import { MdNotifications, MdNotificationsOff, MdSettings, MdFocus } from "react-icons/md";
import CourseProgress from "components/course/CourseProgress";

export default function EnhancedNotifications(props) {
  const { ...rest } = props;
  const [focusMode, setFocusMode] = useState(false);
  const [notifications, setNotifications] = useState({
    courseUpdates: true,
    assignments: true,
    grades: false,
    messages: true,
    achievements: true,
    reminders: false,
    newsletter: true,
    social: false,
    system: true,
    marketing: false,
  });

  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const brandColor = useColorModeValue("brand.500", "brand.400");
  const menuBg = useColorModeValue("white", "navy.800");
  const focusBg = useColorModeValue("orange.50", "orange.900");
  const focusColor = useColorModeValue("orange.500", "orange.300");

  const enabledCount = Object.values(notifications).filter(Boolean).length;

  const handleFocusMode = (enabled) => {
    setFocusMode(enabled);
    if (enabled) {
      // Turn off all notifications when focus mode is enabled
      const allDisabled = Object.keys(notifications).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});
      setNotifications(allDisabled);
    }
  };

  const handleNotificationToggle = (key) => {
    if (focusMode) return; // Don't allow changes in focus mode
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <Card {...rest} mb="20px" p="20px">
      <VStack spacing={4} align="stretch">
        {/* Focus Mode Toggle */}
        <Card 
          bg={focusMode ? focusBg : "transparent"} 
          border={focusMode ? "2px solid" : "1px solid"}
          borderColor={focusMode ? focusColor : "transparent"}
          p={4}
        >
          <Flex justify="space-between" align="center">
            <HStack>
              <Icon as={MdFocus} color={focusMode ? focusColor : textColorSecondary} />
              <Box>
                <Text color={textColorPrimary} fontWeight="600" fontSize="md">
                  Focus Mode
                </Text>
                <Text color={textColorSecondary} fontSize="sm">
                  {focusMode ? "All notifications disabled" : "Disable all distractions"}
                </Text>
              </Box>
            </HStack>
            <Switch
              colorScheme="orange"
              isChecked={focusMode}
              onChange={(e) => handleFocusMode(e.target.checked)}
              size="lg"
            />
          </Flex>
        </Card>

        {/* Notification Settings Dropdown */}
        <Card p={4}>
          <Flex justify="space-between" align="center">
            <HStack>
              <Icon 
                as={focusMode ? MdNotificationsOff : MdNotifications} 
                color={focusMode ? textColorSecondary : brandColor} 
              />
              <Box>
                <Text color={textColorPrimary} fontWeight="600" fontSize="md">
                  Notification Settings
                </Text>
                <Text color={textColorSecondary} fontSize="sm">
                  {focusMode ? "Focus mode is active" : `${enabledCount} notifications enabled`}
                </Text>
              </Box>
            </HStack>
            
            <Menu>
              <MenuButton
                as={Button}
                variant="ghost"
                size="sm"
                rightIcon={<Icon as={MdSettings} />}
                isDisabled={focusMode}
                opacity={focusMode ? 0.5 : 1}
              >
                Configure
                {!focusMode && enabledCount > 0 && (
                  <Badge ml={2} colorScheme="brand" size="sm">
                    {enabledCount}
                  </Badge>
                )}
              </MenuButton>
              
              <MenuList bg={menuBg} border="1px solid" borderColor="gray.200" minW="300px">
                <MenuGroup title="Learning Notifications">
                  <MenuItem closeOnSelect={false}>
                    <Flex justify="space-between" align="center" w="100%">
                      <Box>
                        <Text fontSize="sm" fontWeight="500">Course Updates</Text>
                        <Text fontSize="xs" color={textColorSecondary}>
                          New lessons and content
                        </Text>
                      </Box>
                      <Switch
                        colorScheme="brand"
                        size="sm"
                        isChecked={notifications.courseUpdates}
                        onChange={() => handleNotificationToggle('courseUpdates')}
                      />
                    </Flex>
                  </MenuItem>
                  
                  <MenuItem closeOnSelect={false}>
                    <Flex justify="space-between" align="center" w="100%">
                      <Box>
                        <Text fontSize="sm" fontWeight="500">Assignment Reminders</Text>
                        <Text fontSize="xs" color={textColorSecondary}>
                          Due dates and submissions
                        </Text>
                      </Box>
                      <Switch
                        colorScheme="brand"
                        size="sm"
                        isChecked={notifications.assignments}
                        onChange={() => handleNotificationToggle('assignments')}
                      />
                    </Flex>
                  </MenuItem>
                  
                  <MenuItem closeOnSelect={false}>
                    <Flex justify="space-between" align="center" w="100%">
                      <Box>
                        <Text fontSize="sm" fontWeight="500">Grade Updates</Text>
                        <Text fontSize="xs" color={textColorSecondary}>
                          Scores and feedback
                        </Text>
                      </Box>
                      <Switch
                        colorScheme="brand"
                        size="sm"
                        isChecked={notifications.grades}
                        onChange={() => handleNotificationToggle('grades')}
                      />
                    </Flex>
                  </MenuItem>
                </MenuGroup>
                
                <MenuDivider />
                
                <MenuGroup title="Social & Communication">
                  <MenuItem closeOnSelect={false}>
                    <Flex justify="space-between" align="center" w="100%">
                      <Box>
                        <Text fontSize="sm" fontWeight="500">Messages</Text>
                        <Text fontSize="xs" color={textColorSecondary}>
                          Direct messages from peers
                        </Text>
                      </Box>
                      <Switch
                        colorScheme="brand"
                        size="sm"
                        isChecked={notifications.messages}
                        onChange={() => handleNotificationToggle('messages')}
                      />
                    </Flex>
                  </MenuItem>
                  
                  <MenuItem closeOnSelect={false}>
                    <Flex justify="space-between" align="center" w="100%">
                      <Box>
                        <Text fontSize="sm" fontWeight="500">Achievements</Text>
                        <Text fontSize="xs" color={textColorSecondary}>
                          Badges and milestones
                        </Text>
                      </Box>
                      <Switch
                        colorScheme="brand"
                        size="sm"
                        isChecked={notifications.achievements}
                        onChange={() => handleNotificationToggle('achievements')}
                      />
                    </Flex>
                  </MenuItem>
                  
                  <MenuItem closeOnSelect={false}>
                    <Flex justify="space-between" align="center" w="100%">
                      <Box>
                        <Text fontSize="sm" fontWeight="500">Social Activity</Text>
                        <Text fontSize="xs" color={textColorSecondary}>
                          Likes, comments, follows
                        </Text>
                      </Box>
                      <Switch
                        colorScheme="brand"
                        size="sm"
                        isChecked={notifications.social}
                        onChange={() => handleNotificationToggle('social')}
                      />
                    </Flex>
                  </MenuItem>
                </MenuGroup>
                
                <MenuDivider />
                
                <MenuGroup title="System & Marketing">
                  <MenuItem closeOnSelect={false}>
                    <Flex justify="space-between" align="center" w="100%">
                      <Box>
                        <Text fontSize="sm" fontWeight="500">Study Reminders</Text>
                        <Text fontSize="xs" color={textColorSecondary}>
                          Daily learning reminders
                        </Text>
                      </Box>
                      <Switch
                        colorScheme="brand"
                        size="sm"
                        isChecked={notifications.reminders}
                        onChange={() => handleNotificationToggle('reminders')}
                      />
                    </Flex>
                  </MenuItem>
                  
                  <MenuItem closeOnSelect={false}>
                    <Flex justify="space-between" align="center" w="100%">
                      <Box>
                        <Text fontSize="sm" fontWeight="500">Newsletter</Text>
                        <Text fontSize="xs" color={textColorSecondary}>
                          Weekly learning digest
                        </Text>
                      </Box>
                      <Switch
                        colorScheme="brand"
                        size="sm"
                        isChecked={notifications.newsletter}
                        onChange={() => handleNotificationToggle('newsletter')}
                      />
                    </Flex>
                  </MenuItem>
                  
                  <MenuItem closeOnSelect={false}>
                    <Flex justify="space-between" align="center" w="100%">
                      <Box>
                        <Text fontSize="sm" fontWeight="500">System Updates</Text>
                        <Text fontSize="xs" color={textColorSecondary}>
                          Platform maintenance
                        </Text>
                      </Box>
                      <Switch
                        colorScheme="brand"
                        size="sm"
                        isChecked={notifications.system}
                        onChange={() => handleNotificationToggle('system')}
                      />
                    </Flex>
                  </MenuItem>
                  
                  <MenuItem closeOnSelect={false}>
                    <Flex justify="space-between" align="center" w="100%">
                      <Box>
                        <Text fontSize="sm" fontWeight="500">Marketing</Text>
                        <Text fontSize="xs" color={textColorSecondary}>
                          Promotions and offers
                        </Text>
                      </Box>
                      <Switch
                        colorScheme="brand"
                        size="sm"
                        isChecked={notifications.marketing}
                        onChange={() => handleNotificationToggle('marketing')}
                      />
                    </Flex>
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Flex>
        </Card>

        <CourseProgress />
      </VStack>
    </Card>
  );
}