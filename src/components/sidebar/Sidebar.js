import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

// chakra imports
import {
  Box,
  Flex,
  Drawer,
  DrawerBody,
  Icon,
  useColorModeValue,
  DrawerOverlay,
  useDisclosure,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
} from "@chakra-ui/react";
import Content from "components/sidebar/components/Content";
import {
  renderThumb,
  renderTrack,
  renderView,
} from "components/scrollbar/Scrollbar";
import { Scrollbars } from "react-custom-scrollbars-2";
import PropTypes from "prop-types";

// Assets
import { IoMenuOutline } from "react-icons/io5";

function Sidebar(props) {
  const { routes, collapsed, setCollapsed, hoverToggleEnabled, setHoverToggleEnabled } = props;
  const location = useLocation();

  // Auto-collapse sidebar when route changes (when user clicks a link)
  useEffect(() => {
    // Only auto-collapse sidebar when hoverToggleEnabled is true
    if (hoverToggleEnabled) {
      setCollapsed(true);
    }
  }, [location.pathname, hoverToggleEnabled, setCollapsed]);

  let variantChange = "0.3s ease";
  let shadow = useColorModeValue(
    "none",
    "none"
  );
  // Chakra Color Mode
  let sidebarBg = useColorModeValue("white", "navy.800");
  let sidebarMargins = "0px";

  // SIDEBAR
  return (
    <Box
      display={{ sm: "none", xl: "block" }}
      h="100vh"
      minH="100vh"
      position="fixed"
      left="0"
      top="0"
      zIndex={1000}
    >
      <Box
        id="main-sidebar"
        bg={sidebarBg}
        transition="width 0.3s cubic-bezier(0.685, 0.0473, 0.346, 1)"
        w={collapsed ? '80px' : '300px'}
        h='100vh'
        m={sidebarMargins}
        minH='100vh'
        overflowX='hidden'
        boxShadow={shadow}
        position="relative"
        onMouseEnter={hoverToggleEnabled ? () => setCollapsed(false) : undefined}
        onMouseLeave={hoverToggleEnabled ? () => setCollapsed(true) : undefined}
        zIndex={1000}>
        <Scrollbars
          autoHide
          renderTrackVertical={renderTrack}
          renderThumbVertical={renderThumb}
          renderView={renderView}>
          <Content routes={routes} isCollapsed={collapsed} hoverToggleEnabled={hoverToggleEnabled} setHoverToggleEnabled={setHoverToggleEnabled} />
        </Scrollbars>
      </Box>
    </Box>
  );
}

// FUNCTIONS
export function SidebarResponsive(props) {
  let sidebarBackgroundColor = useColorModeValue("white", "navy.800");
  let menuColor = useColorModeValue("gray.400", "white");
  // // SIDEBAR
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const { routes } = props;
  // let isWindows = navigator.platform.startsWith("Win");
  //  BRAND

  return (
    <Flex display={{ sm: "flex", xl: "none" }} alignItems='center'>
      <Flex ref={btnRef} w='max-content' h='max-content' onClick={onOpen}>
        <Icon
          as={IoMenuOutline}
          color={menuColor}
          my='auto'
          w='20px'
          h='20px'
          me='10px'
          _hover={{ cursor: "pointer" }}
        />
      </Flex>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={document.documentElement.dir === "rtl" ? "right" : "left"}
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent w='285px' maxW='285px' bg={sidebarBackgroundColor}>
          <DrawerCloseButton
            zIndex='3'
            onClose={onClose}
            _focus={{ boxShadow: "none" }}
            _hover={{ boxShadow: "none" }}
          />
          <DrawerBody maxW='285px' px='0rem' pb='0'>
            <Scrollbars
              autoHide
              renderTrackVertical={renderTrack}
              renderThumbVertical={renderThumb}
              renderView={renderView}>
              <Content routes={routes} isCollapsed={false} />
            </Scrollbars>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
// PROPS

Sidebar.propTypes = {
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  variant: PropTypes.string,
  collapsed: PropTypes.bool,
  setCollapsed: PropTypes.func,
  hoverToggleEnabled: PropTypes.bool,
  setHoverToggleEnabled: PropTypes.func,
};

export default Sidebar;
