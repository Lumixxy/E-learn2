import './assets/css/App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import RTLLayout from './layouts/rtl';
import { XPProvider } from './contexts/XPContext';
import { CompletedNodesProvider } from './context/CompletedNodesContext';
import { Web3Provider } from './context/Web3Context';
import { LearningProvider } from './contexts/LearningContext';
import {
  ChakraProvider,
  useToast
} from '@chakra-ui/react';
import initialTheme from './theme/theme'; //  { themeGreen }
import { useState, useEffect } from 'react';
import { CartProvider } from './contexts/CartContext';
import { checkAndResetState } from './utils/stateResetManager';
import { getServerVersion } from './api/serverVersion';

// Chakra imports




//imports done
export default function Main() {
  // eslint-disable-next-line
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  const toast = useToast();
  
  // Check if server has restarted and reset state if needed
  useEffect(() => {
    const checkServerVersion = async () => {
      try {
        // Get the current server version
        const serverVersion = await getServerVersion();
        
        // Check if state needs to be reset
        const wasReset = checkAndResetState(serverVersion);
        
        if (wasReset) {
          toast({
            title: "Course state reset",
            description: "Your course progress has been reset due to server restart.",
            status: "info",
            duration: 5000,
            isClosable: true,
            position: "top"
          });
        }
      } catch (error) {
        console.error('Error checking server version:', error);
      }
    };
    
    checkServerVersion();
  }, [toast]);
  return (
    <ChakraProvider theme={currentTheme}>
      <Web3Provider>
        <XPProvider>
          <CompletedNodesProvider>
            <LearningProvider>
              <CartProvider>
              <Routes>
                <Route path="auth/*" element={<AuthLayout />} />
                <Route
                  path="admin/*"
                  element={
                    <AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />
                  }
                />
                <Route
                  path="rtl/*"
                  element={
                    <RTLLayout theme={currentTheme} setTheme={setCurrentTheme} />
                  }
                />
                <Route path="/" element={<Navigate to="/admin/home" replace />} />
              </Routes>
              </CartProvider>
            </LearningProvider>
          </CompletedNodesProvider>
        </XPProvider>
      </Web3Provider>
    </ChakraProvider>
  );
}
