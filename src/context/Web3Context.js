import React, { createContext, useContext, useState, useEffect } from 'react';
import web3Provider from '../utils/web3Provider';
import { switchNetwork, getNetworkName, isNetworkSupported } from '../utils/networkUtils';

// Create context
const Web3Context = createContext(null);

// Provider component
export const Web3Provider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [networkId, setNetworkId] = useState(null);
  const [networkName, setNetworkName] = useState('Unknown Network');
  const [isNetworkSupported, setIsNetworkSupported] = useState(true);

  // Initialize Web3 provider
  useEffect(() => {
    const initWeb3 = async () => {
      try {
        setIsLoading(true);
        const initialized = await web3Provider.init();
        
        if (initialized) {
          // Check if already connected
          if (web3Provider.isMetaMaskConnected()) {
            const accounts = await web3Provider.getAccounts();
            setAccounts(accounts);
            setIsConnected(accounts.length > 0);
            
            // Set network information
            const networkId = await web3Provider.getNetworkId();
            setNetworkId(networkId);
            setNetworkName(getNetworkName(networkId));
            setIsNetworkSupported(isNetworkSupported(networkId));
          }
        }
      } catch (err) {
        console.error('Error initializing Web3:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    initWeb3();
  }, []);

  // Connect to MetaMask
  const connectWallet = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const accounts = await web3Provider.connect();
      
      setAccounts(accounts);
      setIsConnected(accounts.length > 0);
      
      // Update network information after connection
      const networkId = await web3Provider.getNetworkId();
      setNetworkId(networkId);
      setNetworkName(getNetworkName(networkId));
      setIsNetworkSupported(isNetworkSupported(networkId));
      
      return accounts;
    } catch (err) {
      console.error('Error connecting wallet:', err);
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Switch to a different network
  const switchToNetwork = async (networkId) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await switchNetwork(networkId);
      // The page will reload due to chainChanged event
      return true;
    } catch (err) {
      console.error('Failed to switch network:', err);
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Get current accounts
  const getAccounts = async () => {
    try {
      const accounts = await web3Provider.getAccounts();
      setAccounts(accounts);
      setIsConnected(accounts.length > 0);
      return accounts;
    } catch (err) {
      console.error('Error getting accounts:', err);
      setError(err.message);
      throw err;
    }
  };

  // Context value
  const value = {
    isConnected,
    accounts,
    isLoading,
    error,
    networkId,
    networkName,
    isNetworkSupported,
    connectWallet,
    getAccounts,
    switchToNetwork,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

// Custom hook to use the Web3 context
export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (context === null) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};