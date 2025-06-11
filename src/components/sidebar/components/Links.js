/* eslint-disable */
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
// chakra imports
import { Box, Flex, HStack, Text, useColorModeValue, Tooltip } from "@chakra-ui/react";

export function SidebarLinks(props) {
  //   Chakra color mode
  let location = useLocation();
  let activeColor = useColorModeValue("gray.700", "white");
  let inactiveColor = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.600"
  );
  let activeIcon = useColorModeValue("brand.500", "white");
  let textColor = useColorModeValue("secondaryGray.500", "white");
  let brandColor = useColorModeValue("brand.500", "brand.400");
  let hoverBg = useColorModeValue("gray.50", "navy.700");
  let collapsedHoverBg = useColorModeValue("brand.50", "navy.600");

  const { routes, isCollapsed = false } = props;

  // Enhanced transition
  const smoothTransition = "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)";
  const iconTransition = "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)";

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
  const createLinks = (routes) => {
    return routes.map((route, index) => {
      // Check if the route should be hidden
      if (route.hidden) {
        return null;
      }
      if (route.category) {
        // Skip categories in collapsed mode
        if (isCollapsed) return null;

        return (
          <React.Fragment key={index}>
            <Text
              fontSize={"md"}
              color={activeColor}
              fontWeight='bold'
              mx='auto'
              ps={{
                sm: "10px",
                xl: "16px",
              }}
              pt='18px'
              pb='12px'
              transition={smoothTransition}
              opacity={isCollapsed ? 0 : 1}
              transform={isCollapsed ? "translateX(-10px)" : "translateX(0)"}
            >
              {route.name}
            </Text>
            {createLinks(route.items)}
          </React.Fragment>
        );
      } else if (
        route.layout === "/admin" ||
        route.layout === "/auth" ||
        route.layout === "/rtl"
      ) {
        const isActive = activeRoute(route.path.toLowerCase());
        
        const linkContent = (
          <NavLink key={index} to={route.layout + route.path}>
            {route.icon ? (
              <Box mb="6px">
                {isCollapsed ? (
                  // Enhanced Icon-only layout
                  <Flex
                    w='52px'
                    h='52px'
                    alignItems='center'
                    justifyContent='center'
                    borderRadius='16px'
                    bg={isActive ? brandColor : "transparent"}
                    transition={iconTransition}
                    position="relative"
                    mx="auto"
                    cursor="pointer"
                    _hover={{ 
                      bg: isActive ? brandColor : collapsedHoverBg,
                      transform: "scale(1.08) translateY(-1px)",
                      boxShadow: isActive 
                        ? "0 8px 25px rgba(67, 24, 255, 0.4)" 
                        : "0 4px 15px rgba(0,0,0,0.1)"
                    }}
                    _active={{
                      transform: "scale(0.98)"
                    }}
                    // Glow effect for active state
                    _before={isActive ? {
                      content: '""',
                      position: 'absolute',
                      top: '-2px',
                      left: '-2px',
                      right: '-2px',
                      bottom: '-2px',
                      background: `linear-gradient(45deg, ${brandColor}, transparent, ${brandColor})`,
                      borderRadius: '18px',
                      zIndex: -1,
                      opacity: 0.3,
                      animation: 'pulse 2s infinite'
                    } : {}}
                  >
                    <Box
                      color={isActive ? "white" : textColor}
                      fontSize="22px"
                      transition={iconTransition}
                      transform="scale(1)"
                      _groupHover={{
                        transform: "scale(1.1)",
                        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
                      }}
                    >
                      {route.icon}
                    </Box>
                    
                    {/* Subtle indicator dot */}
                    {isActive && (
                      <Box
                        position="absolute"
                        top="-3px"
                        right="-3px"
                        w="8px"
                        h="8px"
                        bg="white"
                        borderRadius="50%"
                        boxShadow="0 2px 8px rgba(0,0,0,0.2)"
                        animation="fadeInScale 0.3s ease-out"
                      />
                    )}
                  </Flex>
                ) : (
                  // Enhanced Full layout
                  <Box
                    transition={smoothTransition}
                    borderRadius="12px"
                    px="12px"
                    py="8px"
                    bg={isActive ? `${brandColor}15` : "transparent"}
                    border={isActive ? `2px solid ${brandColor}30` : "2px solid transparent"}
                    _hover={{ 
                      bg: isActive ? `${brandColor}20` : hoverBg,
                      transform: "translateX(4px)",
                      borderColor: isActive ? `${brandColor}40` : "transparent"
                    }}
                    position="relative"
                    overflow="hidden"
                  >
                    <HStack
                      spacing={
                        isActive ? "16px" : "20px"
                      }
                      transition={smoothTransition}
                    >
                      <Flex w='100%' alignItems='center' justifyContent='flex-start'>
                        <Box
                          color={isActive ? activeIcon : textColor}
                          me='16px'
                          fontSize="20px"
                          transition={iconTransition}
                          transform="scale(1)"
                          _groupHover={{
                            transform: "scale(1.1) rotate(5deg)",
                            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
                          }}
                        >
                          {route.icon}
                        </Box>
                        <Text
                          me='auto'
                          color={isActive ? activeColor : textColor}
                          fontWeight={isActive ? "bold" : "normal"}
                          fontSize="sm"
                          transition={smoothTransition}
                          transform="translateX(0)"
                          _groupHover={{
                            transform: "translateX(2px)"
                          }}
                        >
                          {route.name}
                        </Text>
                      </Flex>
                      
                      {/* Animated indicator bar */}
                      <Box
                        h='28px'
                        w='4px'
                        bg={isActive ? brandColor : "transparent"}
                        borderRadius='8px'
                        transition={smoothTransition}
                        transform={isActive ? "scaleY(1)" : "scaleY(0.3)"}
                        opacity={isActive ? 1 : 0}
                        boxShadow={isActive ? `0 0 10px ${brandColor}50` : "none"}
                      />
                    </HStack>
                    
                    {/* Subtle background animation */}
                    {isActive && (
                      <Box
                        position="absolute"
                        top="0"
                        left="0"
                        right="0"
                        bottom="0"
                        bg={`linear-gradient(90deg, transparent 0%, ${brandColor}08 50%, transparent 100%)`}
                        animation="slideRight 3s ease-in-out infinite"
                        zIndex={-1}
                      />
                    )}
                  </Box>
                )}
              </Box>
            ) : (
              // Routes without icons (only show in full mode)
              !isCollapsed && (
                <Box mb="4px">
                  <Box
                    borderRadius="8px"
                    px="12px"
                    py="6px"
                    transition={smoothTransition}
                    _hover={{ 
                      bg: hoverBg,
                      transform: "translateX(4px)"
                    }}
                  >
                    <HStack
                      spacing={isActive ? "16px" : "20px"}
                      transition={smoothTransition}
                    >
                      <Text
                        me='auto'
                        color={isActive ? activeColor : inactiveColor}
                        fontWeight={isActive ? "bold" : "normal"}
                        fontSize="sm"
                        transition={smoothTransition}
                      >
                        {route.name}
                      </Text>
                      <Box 
                        h='24px' 
                        w='3px' 
                        bg={isActive ? brandColor : "transparent"}
                        borderRadius='4px'
                        transition={smoothTransition}
                      />
                    </HStack>
                  </Box>
                </Box>
              )
            )}
          </NavLink>
        );

        // Enhanced tooltip in collapsed mode
        if (isCollapsed && route.icon) {
          return (
            <Box
              key={index}
              role="group"
              transition={smoothTransition}
              opacity={1}
              transform="translateX(0)"
              _hover={{
                transform: "translateX(2px)"
              }}
            >
              <Tooltip
                label={route.name}
                placement="right"
                hasArrow
                bg={useColorModeValue("white", "navy.700")}
                color={useColorModeValue("gray.700", "white")}
                boxShadow="0 4px 20px rgba(0,0,0,0.15)"
                borderRadius="8px"
                px="12px"
                py="6px"
                fontSize="sm"
                fontWeight="medium"
                openDelay={200}
                arrowShadowColor={useColorModeValue("gray.200", "navy.600")}
              >
                {linkContent}
              </Tooltip>
            </Box>
          );
        }

        return (
          <Box
            key={index}
            role="group"
            transition={smoothTransition}
            opacity={1}
            transform="translateX(0)"
          >
            {linkContent}
          </Box>
        );
      }
      return null;
    });
  };

  //  Add keyframe animations via style tag
  React.useEffect(() => {
    if (!document.getElementById('sidebar-animations')) {
      const style = document.createElement('style');
      style.id = 'sidebar-animations';
      style.textContent = `
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes slideRight {
          0%, 100% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <Box
      transition={smoothTransition}
      opacity={1}
      transform="translateY(0)"
    >
      {createLinks(routes)}
    </Box>
  );
}

export default SidebarLinks;
