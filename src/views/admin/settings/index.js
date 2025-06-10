import React from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  Heading,
  useColorModeValue,
  Icon,
  Switch,
  FormControl,
  FormLabel,
  Select,
  Button,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  Divider,
  HStack,
  Avatar,
  IconButton,
} from "@chakra-ui/react";
import {
  MdNotifications,
  MdLanguage,
  MdSecurity,
  MdPerson,
  MdSchool,
  MdPayment,
  MdAccessibility,
  MdEdit,
} from "react-icons/md";

export default function Settings() {
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("white", "gray.800");
  const toast = useToast();

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex direction="column" gap="20px">
        <Box>
          <Heading size="lg" color={textColor} mb="20px">
            Settings
          </Heading>
        </Box>

        <Box bg={bgColor} p="20px" borderRadius="15px" boxShadow="sm">
          <Tabs variant="enclosed">
            <TabList>
              <Tab>
                <Icon as={MdPerson} mr="2" />
                Profile
              </Tab>
              <Tab>
                <Icon as={MdNotifications} mr="2" />
                Notifications
              </Tab>
              <Tab>
                <Icon as={MdSchool} mr="2" />
                Learning
              </Tab>
              <Tab>
                <Icon as={MdSecurity} mr="2" />
                Security
              </Tab>
              <Tab>
                <Icon as={MdPayment} mr="2" />
                Payment
              </Tab>
              <Tab>
                <Icon as={MdAccessibility} mr="2" />
                Accessibility
              </Tab>
            </TabList>

            <TabPanels>
              {/* Profile Settings */}
              <TabPanel>
                <VStack spacing="20px" align="stretch">
                  <Flex align="center" gap="4">
                    <Avatar size="xl" name="User Name" />
                    <IconButton
                      aria-label="Edit profile picture"
                      icon={<MdEdit />}
                      size="sm"
                    />
                  </Flex>
                  <FormControl>
                    <FormLabel>Display Name</FormLabel>
                    <Input placeholder="Enter your display name" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" placeholder="Enter your email" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Bio</FormLabel>
                    <Input placeholder="Tell us about yourself" />
                  </FormControl>
                </VStack>
              </TabPanel>

              {/* Notification Settings */}
              <TabPanel>
                <VStack spacing="20px" align="stretch">
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="email-notifications" mb="0">
                      Email Notifications
                    </FormLabel>
                    <Switch id="email-notifications" />
                  </FormControl>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="course-updates" mb="0">
                      Course Updates
                    </FormLabel>
                    <Switch id="course-updates" />
                  </FormControl>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="achievement-alerts" mb="0">
                      Achievement Alerts
                    </FormLabel>
                    <Switch id="achievement-alerts" />
                  </FormControl>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="marketing-emails" mb="0">
                      Marketing Emails
                    </FormLabel>
                    <Switch id="marketing-emails" />
                  </FormControl>
                </VStack>
              </TabPanel>

              {/* Learning Settings */}
              <TabPanel>
                <VStack spacing="20px" align="stretch">
                  <FormControl>
                    <FormLabel>Default Course View</FormLabel>
                    <Select>
                      <option value="list">List View</option>
                      <option value="grid">Grid View</option>
                      <option value="calendar">Calendar View</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Learning Path</FormLabel>
                    <Select>
                      <option value="self-paced">Self-Paced</option>
                      <option value="structured">Structured</option>
                      <option value="hybrid">Hybrid</option>
                    </Select>
                  </FormControl>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="auto-play" mb="0">
                      Auto-play Next Lesson
                    </FormLabel>
                    <Switch id="auto-play" />
                  </FormControl>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="download-lessons" mb="0">
                      Allow Lesson Downloads
                    </FormLabel>
                    <Switch id="download-lessons" />
                  </FormControl>
                </VStack>
              </TabPanel>

              {/* Security Settings */}
              <TabPanel>
                <VStack spacing="20px" align="stretch">
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="two-factor" mb="0">
                      Two-Factor Authentication
                    </FormLabel>
                    <Switch id="two-factor" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Change Password</FormLabel>
                    <Input type="password" placeholder="Enter new password" />
                  </FormControl>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="login-notifications" mb="0">
                      Login Notifications
                    </FormLabel>
                    <Switch id="login-notifications" />
                  </FormControl>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="session-timeout" mb="0">
                      Auto Logout (30 minutes)
                    </FormLabel>
                    <Switch id="session-timeout" />
                  </FormControl>
                </VStack>
              </TabPanel>

              {/* Payment Settings */}
              <TabPanel>
                <VStack spacing="20px" align="stretch">
                  <FormControl>
                    <FormLabel>Payment Method</FormLabel>
                    <Select>
                      <option value="credit">Credit Card</option>
                      <option value="paypal">PayPal</option>
                      <option value="bank">Bank Transfer</option>
                    </Select>
                  </FormControl>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="auto-renewal" mb="0">
                      Auto-Renewal
                    </FormLabel>
                    <Switch id="auto-renewal" />
                  </FormControl>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="billing-notifications" mb="0">
                      Billing Notifications
                    </FormLabel>
                    <Switch id="billing-notifications" />
                  </FormControl>
                </VStack>
              </TabPanel>

              {/* Accessibility Settings */}
              <TabPanel>
                <VStack spacing="20px" align="stretch">
                  <FormControl>
                    <FormLabel>Text Size</FormLabel>
                    <Select>
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </Select>
                  </FormControl>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="high-contrast" mb="0">
                      High Contrast Mode
                    </FormLabel>
                    <Switch id="high-contrast" />
                  </FormControl>
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="screen-reader" mb="0">
                      Screen Reader Support
                    </FormLabel>
                    <Switch id="screen-reader" />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Color Theme</FormLabel>
                    <Select>
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System Default</option>
                    </Select>
                  </FormControl>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <Divider my="20px" />
          
          <HStack justify="flex-end" spacing="4">
            <Button variant="outline">Cancel</Button>
            <Button colorScheme="blue" onClick={handleSave}>
              Save Changes
            </Button>
          </HStack>
        </Box>
      </Flex>
    </Box>
  );
} 