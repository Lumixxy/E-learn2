// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  VStack,
  HStack,
  Avatar,
  Input,
  FormControl,
  FormLabel,
  Switch,
  Divider,
  SimpleGrid,
  Badge,
  useToast,
  ScaleFade,
  Fade,
  SlideFade,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React, { useState } from "react";
// Assets
import { MdEdit, MdSave, MdCancel, MdPhotoCamera, MdDownload, MdVerified, MdSchool } from "react-icons/md";
import UserSettings from "../settings/UserSettings";

export default function ProfileSettings(props) {
  const { avatar, name, ...rest } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: name || "Adela Parkson",
    usn: "1xx22CS30",
    email: "adela.parkson@example.com",
    phone: "+91 98765 43210"
  });
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const brandColor = useColorModeValue("brand.500", "white");
  const textColorSecondary = "gray.400";
  const inputBg = useColorModeValue("white", "navy.800");
  const cardBg = useColorModeValue("white", "navy.800");
  const toast = useToast();

  // Mock data for completed courses
  const completedCourses = [
    {
      id: 1,
      name: "Python Fundamentals",
      completionDate: "2024-03-15",
      certificate: "python_fundamentals_cert.pdf",
      grade: "A+",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Web Development Bootcamp",
      completionDate: "2024-02-28",
      certificate: "web_dev_cert.pdf",
      grade: "A",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "Data Science Essentials",
      completionDate: "2024-01-20",
      certificate: "data_science_cert.pdf",
      grade: "A-",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];
  
  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  
  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleCertificateClick = (certificate) => {
    setSelectedCertificate(certificate);
    onOpen();
  };

  const handleDownload = (certificate) => {
    toast({
      title: "Certificate Downloaded",
      description: "Your certificate has been downloaded successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  
  return (
    <Card {...rest} mb='20px' p='20px'>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Flex justify="space-between" align="center">
          <Text
            color={textColorPrimary}
            fontWeight='bold'
            fontSize='2xl'>
            Profile Settings
          </Text>
          {!isEditing ? (
            <Button
              variant="outline"
              colorScheme="brand"
              size="sm"
              leftIcon={<Icon as={MdEdit} />}
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          ) : (
            <HStack>
              <Button
                variant="solid"
                colorScheme="brand"
                size="sm"
                leftIcon={<Icon as={MdSave} />}
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<Icon as={MdCancel} />}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </HStack>
          )}
        </Flex>
        
        <Divider />
        
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {/* Left Column - Profile Info */}
          <VStack spacing={6} align="stretch">
            {/* Avatar Section */}
            <Flex direction="column" align="center">
              <Box position="relative">
                <Avatar
                  src={avatar}
                  size="xl"
                  mb={4}
                />
                {isEditing && (
                  <Button
                    position="absolute"
                    bottom={2}
                    right={-2}
                    size="sm"
                    colorScheme="brand"
                    borderRadius="full"
                    p={2}
                    minW="auto"
                  >
                    <Icon as={MdPhotoCamera} />
                  </Button>
                )}
              </Box>
              <Text color={textColorSecondary} fontSize="sm">
                {isEditing ? "Click camera icon to change photo" : "Profile Photo"}
              </Text>
            </Flex>
            
            {/* Profile Information */}
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel color={textColorSecondary} fontSize="sm">Full Name</FormLabel>
                {isEditing ? (
                  <Input
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    bg={inputBg}
                  />
                ) : (
                  <Text color={textColorPrimary} fontWeight="500">{profileData.name}</Text>
                )}
              </FormControl>

              <FormControl>
                <FormLabel color={textColorSecondary} fontSize="sm">USN</FormLabel>
                {isEditing ? (
                  <Input
                    value={profileData.usn}
                    onChange={(e) => setProfileData({...profileData, usn: e.target.value})}
                    bg={inputBg}
                    placeholder="1xx22CS30"
                  />
                ) : (
                  <Text color={textColorPrimary} fontWeight="500">{profileData.usn}</Text>
                )}
              </FormControl>
              
              <FormControl>
                <FormLabel color={textColorSecondary} fontSize="sm">Email</FormLabel>
                {isEditing ? (
                  <Input
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    bg={inputBg}
                  />
                ) : (
                  <Text color={textColorPrimary} fontWeight="500">{profileData.email}</Text>
                )}
              </FormControl>
              
              <FormControl>
                <FormLabel color={textColorSecondary} fontSize="sm">Phone</FormLabel>
                {isEditing ? (
                  <Input
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    bg={inputBg}
                    placeholder="+91 XXXXX XXXXX"
                  />
                ) : (
                  <Text color={textColorPrimary} fontWeight="500">{profileData.phone}</Text>
                )}
              </FormControl>
            </VStack>
          </VStack>

          {/* Right Column - Certifications */}
          <VStack spacing={6} align="stretch">
            <Text color={textColorPrimary} fontWeight="bold" fontSize="lg">
              Certifications
            </Text>
            <VStack spacing={4} align="stretch">
              {completedCourses.map((course) => (
                <Card key={course.id} p={4} variant="outline">
                  <HStack spacing={4}>
                    <Image
                      src={course.image}
                      alt={course.name}
                      boxSize="60px"
                      borderRadius="md"
                      objectFit="cover"
                    />
                    <VStack align="start" flex={1}>
                      <Text color={textColorPrimary} fontWeight="bold">
                        {course.name}
                      </Text>
                      <Text color={textColorSecondary} fontSize="sm">
                        Completed: {course.completionDate}
                      </Text>
                      <HStack>
                        <Badge colorScheme="green">{course.grade}</Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          colorScheme="brand"
                          leftIcon={<Icon as={MdDownload} />}
                          onClick={() => handleDownload(course)}
                        >
                          Download
                        </Button>
                      </HStack>
                    </VStack>
                  </HStack>
                </Card>
              ))}
            </VStack>
          </VStack>
        </SimpleGrid>

        <Divider />

        {/* Settings Section */}
        <UserSettings />
      </VStack>

      {/* Certificate Preview Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Certificate Preview</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedCertificate && (
              <VStack spacing={4}>
                <Image
                  src={selectedCertificate.image}
                  alt={selectedCertificate.name}
                  borderRadius="md"
                />
                <Text color={textColorPrimary} fontWeight="bold">
                  {selectedCertificate.name}
                </Text>
                <Text color={textColorSecondary}>
                  Completed: {selectedCertificate.completionDate}
                </Text>
                <Button
                  colorScheme="brand"
                  leftIcon={<Icon as={MdDownload} />}
                  onClick={() => handleDownload(selectedCertificate)}
                >
                  Download Certificate
                </Button>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Card>
  );
} 