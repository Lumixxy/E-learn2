import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import UserSettings from "components/settings/UserSettings.js";
import ProfileSettings from "components/profile/ProfileSettings.js";

export default function Profile() {
  const bgColor = useColorModeValue("secondaryGray.300", "navy.900");
  const cardBg = useColorModeValue("white", "navy.800");

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Box mb='20px'>
        <ProfileSettings
          avatar={require("assets/img/avatars/avatar4.png")}
          name="Adela Parkson"
        />
      </Box>
    </Box>
  );
} 