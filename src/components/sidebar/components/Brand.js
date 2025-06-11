import React from "react";

// Chakra imports
import { Flex, useColorModeValue, Box, Image, Text, HStack } from "@chakra-ui/react";

// Custom components
import { HSeparator } from "components/separator/Separator";
import favicon from "assets/img/logo/favicon.ico";

export function SidebarBrand({ isCollapsed = false }) {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  const smoothTransition = "all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)";

  return (
    <Flex align='center' direction='column' transition={smoothTransition}>
      <HStack
        spacing={isCollapsed ? "0" : "12px"}
        align="center"
        my="32px"
        justifyContent={isCollapsed ? "center" : "flex-start"}
        w="100%"
      >
        <Image
          src={favicon}
          alt="Logo"
          w={isCollapsed ? "32px" : "40px"}
          h={isCollapsed ? "32px" : "40px"}
          objectFit="contain"
        />
        <Text
          fontSize="2xl"
          fontWeight="900"
          color={logoColor}
          transition={smoothTransition}
          opacity={isCollapsed ? 0 : 1}
          transform={isCollapsed ? "translateX(-10px)" : "translateX(0)"}
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="clip"
        >
          PyGenicArc
        </Text>
      </HStack>

      <Box
        w="100%"
        transition={smoothTransition}
        opacity={isCollapsed ? 0.6 : 1}
        transform={isCollapsed ? "scaleX(0.5)" : "scaleX(1)"}
      >
        <HSeparator mb='20px' />
      </Box>
    </Flex>
  );
}

export default SidebarBrand; 