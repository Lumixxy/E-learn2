/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Text,
  useColorModeValue,
  SimpleGrid,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  HStack,
  Checkbox,
  useToast,
  IconButton,
  Collapse,
  Divider,
  Card,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Icon,
  Select,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Badge,
  CardBody,
  CheckboxGroup,
} from "@chakra-ui/react";
import { SearchIcon, ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useCart } from "contexts/CartContext";
import { courses, categories, levels, priceRanges } from "data/courses";
import { convertToINR, formatPrice } from "utils/priceUtils";
import NFT from "components/card/NFT";
import Banner from "./components/Banner";

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [minRating, setMinRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Chakra UI hooks
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const bgColor = useColorModeValue("white", "navy.800");
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "0px 0px 0px 0px rgba(112, 144, 176, 0.08)"
  );
  const inputBg = useColorModeValue("gray.100", "whiteAlpha.100");
  const inputHoverBg = useColorModeValue("gray.200", "whiteAlpha.200");
  const inputFocusBg = useColorModeValue("white", "whiteAlpha.300");

  const coursesPerPage = 12;

  // Extract unique categories, levels, and skills
  const allCategories = [...new Set(courses.map((course) => course.category))];
  const allLevels = [...new Set(courses.map((course) => course.level))];
  const allSkills = [...new Set(courses.flatMap((course) => course.tags))]; // Assuming 'tags' are skills

  // Initialize filtered courses on component mount
  useEffect(() => {
    console.log('Initial courses:', courses);
    setFilteredCourses(courses);
  }, []);

  useEffect(() => {
    filterCourses();
  }, [searchQuery, selectedCategories, selectedLevels, selectedSkills, priceRange, minRating]);

  const filterCourses = () => {
    let filtered = [...courses];
    console.log('Starting filter with courses:', filtered.length);

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
      console.log('After search filter:', filtered.length);
    }

    // Apply category filter (multiple selection)
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((course) =>
        selectedCategories.includes(course.category)
      );
      console.log('After category filter:', filtered.length);
    }

    // Apply level filter (multiple selection)
    if (selectedLevels.length > 0) {
      filtered = filtered.filter((course) =>
        selectedLevels.includes(course.level)
      );
      console.log('After level filter:', filtered.length);
    }

    // Apply skills filter (multiple selection)
    if (selectedSkills.length > 0) {
      filtered = filtered.filter((course) =>
        selectedSkills.some((skill) => course.tags.includes(skill))
      );
      console.log('After skills filter:', filtered.length);
    }

    // Apply price range filter
    filtered = filtered.filter(
      (course) => {
        const coursePrice = convertToINR(course.price);
        return coursePrice >= priceRange[0] && coursePrice <= priceRange[1];
      }
    );
    console.log('After price filter:', filtered.length);

    // Apply rating filter
    if (minRating > 0) {
      filtered = filtered.filter((course) => course.rating >= minRating);
      console.log('After rating filter:', filtered.length);
    }

    console.log('Final filtered courses:', filtered.length);
    setFilteredCourses(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const currentCourses = filteredCourses.slice(startIndex, endIndex);

  console.log('Current Courses:', currentCourses.length);
  console.log('Total Pages:', totalPages);
  console.log('Current Page:', currentPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Banner />
      
      <Box maxW="100%" mx="auto" px={{ base: "20px", md: "40px" }}>
        <Card mb="20px" boxShadow={shadow}>
          <CardBody>
            <Flex
              direction={{ base: "column", md: "row" }}
              gap="20px"
              align="center"
            >
              <InputGroup flex="1">
                <InputLeftElement pointerEvents="none">
                  <Icon as={SearchIcon} color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  borderRadius="70px"
                  bg={inputBg}
                  _hover={{
                    bg: inputHoverBg,
                  }}
                  _focus={{
                    bg: inputFocusBg,
                    borderColor: "brand.500",
                  }}
                />
              </InputGroup>
              <Button
                leftIcon={<Icon as={ChevronDownIcon} />}
                onClick={onOpen}
                variant="brand"
                borderRadius="70px"
                px="30px"
              >
                Filters
              </Button>
            </Flex>
          </CardBody>
        </Card>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap="20px">
          {currentCourses && currentCourses.length > 0 ? (
            currentCourses.map((course) => (
              <NFT
                key={course.id}
                id={course.id}
                image={course.image}
                title={course.title}
                author={course.author}
                currentPrice={course.price}
                originalPrice={course.originalPrice}
                discount={course.discountPercentage}
                rating={course.rating}
                level={course.level}
                category={course.category}
                tags={course.tags}
                isFree={course.isFree}
              />
            ))
          ) : (
            <Text textAlign="center" fontSize="lg" color={textColor}>
              No courses found
            </Text>
          )}
        </SimpleGrid>

        {totalPages > 1 && (
          <Flex justify="center" mt="40px" gap="10px">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              isDisabled={currentPage === 1}
              variant="outline"
            >
              Previous
            </Button>
            {[...Array(totalPages)].map((_, index) => (
              <Button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                variant={currentPage === index + 1 ? "brand" : "outline"}
              >
                {index + 1}
              </Button>
            ))}
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              isDisabled={currentPage === totalPages}
              variant="outline"
            >
              Next
            </Button>
          </Flex>
        )}
      </Box>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Filter Courses</DrawerHeader>
          <DrawerBody>
            <VStack spacing="20px" align="stretch">
              <Box>
                <Text fontWeight="bold" mb="10px">
                  Subject
                </Text>
                <CheckboxGroup value={selectedCategories} onChange={setSelectedCategories}>
                  <VStack align="start">
                    {allCategories.map((category) => (
                      <Checkbox key={category} value={category}>
                        {category}
                      </Checkbox>
                    ))}
                  </VStack>
                </CheckboxGroup>
              </Box>

              <Box>
                <Text fontWeight="bold" mb="10px">
                  Skills
                </Text>
                <CheckboxGroup value={selectedSkills} onChange={setSelectedSkills}>
                  <VStack align="start">
                    {allSkills.map((skill) => (
                      <Checkbox key={skill} value={skill}>
                        {skill}
                      </Checkbox>
                    ))}
                  </VStack>
                </CheckboxGroup>
              </Box>

              <Box>
                <Text fontWeight="bold" mb="10px">
                  Level
                </Text>
                <CheckboxGroup value={selectedLevels} onChange={setSelectedLevels}>
                  <VStack align="start">
                    {allLevels.map((level) => (
                      <Checkbox key={level} value={level}>
                        {level}
                      </Checkbox>
                    ))}
                  </VStack>
                </CheckboxGroup>
              </Box>

              <Box>
                <Text fontWeight="bold" mb="10px">
                  Price Range (₹)
                </Text>
                <Slider
                  defaultValue={[0, 50000]}
                  min={0}
                  max={50000}
                  step={1000}
                  onChange={(val) => setPriceRange(val)}
                  value={priceRange}
                >
                  <SliderMark value={0} mt="2" fontSize="sm">
                    ₹0
                  </SliderMark>
                  <SliderMark value={25000} mt="2" fontSize="sm">
                    ₹25k
                  </SliderMark>
                  <SliderMark value={50000} mt="2" fontSize="sm">
                    ₹50k
                  </SliderMark>
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <Text fontSize="sm" textAlign="center" mt="2">
                  ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                </Text>
              </Box>

              <Box>
                <Text fontWeight="bold" mb="10px">
                  Minimum Rating
                </Text>
                <Slider
                  defaultValue={0}
                  min={0}
                  max={5}
                  step={0.5}
                  onChange={(val) => setMinRating(val)}
                  value={minRating}
                >
                  <SliderMark value={0} mt="2" fontSize="sm">
                    0
                  </SliderMark>
                  <SliderMark value={2.5} mt="2" fontSize="sm">
                    2.5
                  </SliderMark>
                  <SliderMark value={5} mt="2" fontSize="sm">
                    5
                  </SliderMark>
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
                <Text fontSize="sm" textAlign="center" mt="2">
                  {minRating} Stars
                </Text>
              </Box>

              <Button
                colorScheme="blue"
                onClick={() => {
                  filterCourses();
                  onClose();
                }}
              >
                Apply Filters
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}