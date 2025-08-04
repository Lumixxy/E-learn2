// Chakra imports
import { Portal, Box, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react';
import Footer from 'components/footer/FooterAdmin.js';
// Layout components
import Navbar from 'components/navbar/NavbarAdmin.js';
import Sidebar from 'components/sidebar/Sidebar.js';
import { SidebarContext } from 'contexts/SidebarContext';
import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import routes from 'routes.js';
import { MessageCircle } from "lucide-react";
import AIAssistant from 'components/ai/AIAssistant.jsx';
import CartDrawer from 'components/cart/CartDrawer';

// Custom Chakra theme
export default function Dashboard(props) {
  const { ...rest } = props;
  // Sidebar collapsed state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true); // collapsed by default
  const [hoverToggleEnabled, setHoverToggleEnabled] = useState(true); // new state for hover toggle
  const [aiOpen, setAiOpen] = useState(false);

  // functions for changing the states from components
  const getRoute = () => {
    return window.location.pathname !== '/admin/full-screen-maps';
  };
  const getActiveRoute = (routes) => {
    let activeRoute = 'Default Brand Text';
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].items);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (routes[i].category) {
        let categoryActiveRoute = getActiveRoute(routes[i].items);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbar(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].secondary;
        }
      }
    }
    return activeNavbar;
  };
  const getActiveNavbarText = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveNavbar = getActiveNavbarText(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbarText(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].messageNavbar;
        }
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes) => {
    return routes.map((route, key) => {
      if (route.layout === '/admin') {
        return (
          <Route path={`${route.path}`} element={route.component} key={key} />
        );
      }
      if (route.collapse) {
        return getRoutes(route.items);
      } else {
        return null;
      }
    });
  };
  document.documentElement.dir = 'ltr';
  const { onOpen } = useDisclosure();
  document.documentElement.dir = 'ltr';
  return (
    <Box w="100vw" minH="100vh" display="flex" flexDirection="row">
      <SidebarContext.Provider
        value={{
          sidebarCollapsed,
          setSidebarCollapsed,
        }}
      >
        <Sidebar
          routes={routes}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          hoverToggleEnabled={hoverToggleEnabled}
          setHoverToggleEnabled={setHoverToggleEnabled}
          {...rest}
        />
        <Box
          as="main"
          flex="1"
          minH="100vh"
          height="100%"
          overflow="auto"
          position="relative"
          transition="margin-left 0.3s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          marginLeft={{ base: "0", md: sidebarCollapsed ? "80px" : "300px" }}
          pt="110px"
        >
          <Navbar
            onOpen={onOpen}
            logoText={'Horizon UI Dashboard PRO'}
            brandText={getActiveRoute(routes)}
            secondary={getActiveNavbar(routes)}
            message={getActiveNavbarText(routes)}
            fixed={true}
            sidebarCollapsed={sidebarCollapsed}
            {...rest}
          />
          {getRoute() ? (
            <Box
              mx="auto"
              p={{ base: '20px', md: '30px' }}
              pe="20px"
              minH="100vh"
              pt={{ base: '0px', md: '0px' }}
            >
              <Routes>
                {getRoutes(routes)}
                <Route
                  path="/"
                  element={<Navigate to="/admin/default" replace />}
                />
              </Routes>
            </Box>
          ) : null}
          <Box>
            <Footer />
          </Box>
        </Box>
      </SidebarContext.Provider>
      {/* Floating AI Button */}
      <Box
        position="fixed"
        right={10}
        bottom={8}
        zIndex={200}
      >
        <Box
          as="button"
          onClick={() => setAiOpen(true)}
          w={16}
          h={16}
          borderRadius="full"
          bgGradient="linear(to-br, #7F7CFF, #3FE0D0)"
          boxShadow="0 4px 32px 0 #3FE0D099"
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="4px solid #181c2f"
          _hover={{ boxShadow: "0 0 0 4px #a259ff55", transform: "scale(1.08)" }}
          transition="all 0.2s"
          cursor="pointer"
        >
          <MessageCircle size={36} color="white" />
        </Box>
      </Box>
      {/* AI Assistant Modal */}
      <Modal isOpen={aiOpen} onClose={() => setAiOpen(false)} size="xl">
        <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
        <ModalContent 
          bg="#181c2f" 
          color="white" 
          borderRadius="xl"
          boxShadow="0 20px 60px rgba(0, 0, 0, 0.5)"
          maxW="700px"
          mx={4}
          h="600px"
          position="fixed"
          bottom="120px"
          right="40px"
          top="auto"
          left="auto"
          transform="none"
          margin="0"
        >
          <ModalCloseButton 
            color="white" 
            _hover={{ bg: "whiteAlpha.200" }}
            top={4}
            right={4}
            zIndex={10}
          />
          <AIAssistant />
        </ModalContent>
      </Modal>
      <CartDrawer />
    </Box>
  );
}