import React from "react";

// Chakra imports
import { Flex, useColorModeValue, Box } from "@chakra-ui/react";

// Custom components
import { PygenicarcLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand({ isCollapsed = false }) {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  const smoothTransition = "all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)";

  return (
    <Flex align='center' direction='column' transition={smoothTransition}>
      <Box
        transition={smoothTransition}
        transform={isCollapsed ? "scale(0.9)" : "scale(1)"}
        opacity={isCollapsed ? 0.8 : 1}
      >
        {isCollapsed ? (
          // Show a smaller logo or just initials when collapsed
          <Box
            w='40px'
            h='40px'
            bg={logoColor}
            borderRadius='12px'
            display='flex'
            alignItems='center'
            justifyContent='center'
            my='32px'
            color='white'
            fontWeight='bold'
            fontSize='lg'
            transition={smoothTransition}
            _hover={{
              transform: "scale(1.05)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)"
            }}
          >
            P
          </Box>
        ) : (
          // Show full logo when expanded
          <Box
            transition={smoothTransition}
            transform="translateX(0)"
            opacity={1}
          >
            <PygenicarcLogo h='40px' w='280px' my='32px' color={logoColor} />
          </Box>
        )}
      </Box>

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