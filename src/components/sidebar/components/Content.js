// chakra imports
import { Box, Flex, Stack } from "@chakra-ui/react";
//   Custom components
import Brand from "components/sidebar/components/Brand";
import Links from "components/sidebar/components/Links";
import SidebarCard from "components/sidebar/components/SidebarCard";
import React from "react";

// FUNCTIONS

function SidebarContent(props) {
  const { routes, isCollapsed = false, contentVisible = true, hoverToggleEnabled, setHoverToggleEnabled } = props;

  const smoothTransition = "all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)";

  // SIDEBAR
  return (
    <Flex
      direction='column'
      height='100%'
      pt='25px'
      px={isCollapsed ? "8px" : "12px"}
      borderRadius='30px'
      maxW={isCollapsed ? '80px' : '300px'}
      minW={isCollapsed ? '60px' : '280px'}
      transition={smoothTransition}
      transform={isCollapsed ? "scale(0.98)" : "scale(1)"}
    >
      <Box
        transition={smoothTransition}
        opacity={contentVisible ? 1 : 0}
        transform={contentVisible ? "translateY(0)" : "translateY(-5px)"}
      >
        <Brand isCollapsed={isCollapsed} hoverToggleEnabled={hoverToggleEnabled} setHoverToggleEnabled={setHoverToggleEnabled} />
      </Box>

      <Stack
        direction='column'
        mb='auto'
        mt='8px'
        transition={smoothTransition}
        opacity={contentVisible ? 1 : 0}
        transform={contentVisible ? "translateY(0)" : "translateY(5px)"}
      >
        <Box
          ps={isCollapsed ? '4px' : '12px'}
          pe={isCollapsed ? '4px' : { md: "8px", "2xl": "1px" }}
          transition={smoothTransition}
        >
          <Links routes={routes} isCollapsed={isCollapsed} />
        </Box>
      </Stack>

      <Box
        mt='60px'
        mb='40px'
        borderRadius='30px'
        transition={smoothTransition}
        opacity={contentVisible && !isCollapsed ? 1 : 0}
        transform={contentVisible && !isCollapsed ? "translateY(0) scale(1)" : "translateY(15px) scale(0.9)"}
        visibility={contentVisible && !isCollapsed ? "visible" : "hidden"}
        height={contentVisible && !isCollapsed ? "auto" : "0"}
        overflow="hidden"
      >
        {!isCollapsed && <SidebarCard />}
      </Box>
    </Flex>
  );
}

export default SidebarContent;
