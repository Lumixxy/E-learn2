import React from "react";
import { Text, useColorModeValue } from "@chakra-ui/react";
import Card from "../card/Card";

const CompletedCoursesCard = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const textColorSecondary = useColorModeValue("gray.400", "whiteAlpha.600");

  return (
    <Card>
      <Text fontWeight="bold" fontSize="lg" mb={3} color={textColor}>Completed Courses</Text>
      <Text color={textColorSecondary}>No completed courses yet.</Text>
    </Card>
  );
};

export default CompletedCoursesCard; 