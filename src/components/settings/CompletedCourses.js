import React from 'react';
import {
  VStack,
  Text,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  Badge,
  Icon,
  useToast,
  Box
} from "@chakra-ui/react";
import { MdDownload, MdVerified } from "react-icons/md";

export default function CompletedCourses() {
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.500", "secondaryGray.400");
  const toast = useToast();

  // Mock data for completed courses
  const completedCourses = [
    {
      id: 1,
      name: "Python Fundamentals",
      completionDate: "2024-03-15",
      certificate: "python_fundamentals_cert.pdf",
      grade: "A+"
    },
    {
      id: 2,
      name: "Web Development Bootcamp",
      completionDate: "2024-02-28",
      certificate: "web_dev_cert.pdf",
      grade: "A"
    },
    {
      id: 3,
      name: "Data Science Essentials",
      completionDate: "2024-01-20",
      certificate: "data_science_cert.pdf",
      grade: "A-"
    }
  ];

  const handleDownload = (certificate) => {
    // Mock download functionality
    toast({
      title: "Certificate Downloaded",
      description: "Your certificate has been downloaded successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box>
      <HStack justify="space-between" mb={4}>
        <Text fontWeight="bold" color={textColorPrimary} fontSize="lg">
          Completed Courses
        </Text>
        <Badge colorScheme="green" fontSize="sm" px={2} py={1}>
          {completedCourses.length} Courses
        </Badge>
      </HStack>

      <Box overflowX="auto">
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th color={textColorSecondary} fontSize="xs">Course</Th>
              <Th color={textColorSecondary} fontSize="xs">Date</Th>
              <Th color={textColorSecondary} fontSize="xs">Grade</Th>
              <Th color={textColorSecondary} fontSize="xs">Certificate</Th>
            </Tr>
          </Thead>
          <Tbody>
            {completedCourses.map((course) => (
              <Tr key={course.id}>
                <Td>
                  <HStack spacing={2}>
                    <Icon as={MdVerified} color="green.500" boxSize={4} />
                    <Text color={textColorPrimary} fontSize="sm" noOfLines={1}>
                      {course.name}
                    </Text>
                  </HStack>
                </Td>
                <Td color={textColorSecondary} fontSize="sm">
                  {course.completionDate}
                </Td>
                <Td>
                  <Badge
                    colorScheme={
                      course.grade === "A+" ? "green" :
                      course.grade === "A" ? "blue" :
                      course.grade === "A-" ? "teal" : "gray"
                    }
                    fontSize="xs"
                  >
                    {course.grade}
                  </Badge>
                </Td>
                <Td>
                  <Button
                    size="xs"
                    leftIcon={<Icon as={MdDownload} boxSize={3} />}
                    onClick={() => handleDownload(course.certificate)}
                    colorScheme="brand"
                    variant="ghost"
                  >
                    Download
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
} 