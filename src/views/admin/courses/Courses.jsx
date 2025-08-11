import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import CoursesGrid from "./CoursesGrid";
import WebWarrior from "./WebWarrior";

const Courses = () => {
  return (
    <Box>
      {/* Web Warrior Adventure Path */}
      <Box mb={10}>
        <Heading size="lg" mb={4}>Web Warrior Adventure Path</Heading>
        <WebWarrior />
      </Box>
      
      {/* Existing Courses Grid */}
      <Box>
        <Heading size="lg" mb={4}>All Courses</Heading>
        <CoursesGrid />
      </Box>
    </Box>
  );
};

export default Courses;