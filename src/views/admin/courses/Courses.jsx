import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import CoursesGrid from "./CoursesGrid";

const Courses = () => {
  return (
    <Box>
      <Box>
        <Heading size="lg" mb={4}>All Courses</Heading>
        <CoursesGrid />
      </Box>
    </Box>
  );
};

export default Courses;