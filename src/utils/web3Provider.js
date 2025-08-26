import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import { isNetworkSupported, switchNetwork, getNetworkName } from './networkUtils';

// Web3 Provider Configuration
class Web3Provider {
  constructor() {
    this.web3 = null;
    this.provider = null;
    this.isConnected = false;
    this.accounts = [];
    this.networkId = null;
    this.chainId = null;
    this.initialized = false;
    this.networkName = 'Unknown Network';
  }

  /**
   * Initialize the Web3 provider
   * @returns {Promise<boolean>} - True if initialization was successful
   */
  async init() {
    try {
      // Detect the provider (MetaMask)
      this.provider = await detectEthereumProvider({
        mustBeMetaMask: true,
        silent: false,
        timeout: 3000, // Add timeout to prevent hanging
      });

      // Check if provider exists
      if (!this.provider) {
        console.error('Please install MetaMask!');
        throw new Error('MetaMask is not installed');
      }

      // Initialize Web3 with the provider
      this.web3 = new Web3(this.provider);
      
      // Check if already connected
      const accounts = await this.web3.eth.getAccounts();
      if (accounts.length > 0) {
        this.accounts = accounts;
        this.isConnected = true;
      }

      try {
        // Get network information with timeout
        const networkIdPromise = this.web3.eth.net.getId();
        const chainIdPromise = this.web3.eth.getChainId();
        
        // Set timeout for network requests
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Network detection timed out')), 5000);
        });
        
        // Race the network requests against the timeout
        this.networkId = await Promise.race([networkIdPromise, timeoutPromise]);
        this.chainId = await Promise.race([chainIdPromise, timeoutPromise]);
        this.networkName = getNetworkName(this.networkId);

        // Check if the network is supported
        if (!isNetworkSupported(this.networkId)) {
          console.warn(`Connected to unsupported network: ${this.networkName}`);
        }
      } catch (networkError) {
        console.warn('Error detecting network:', networkError);
        // Set default values if network detection fails
        this.networkId = 0;
        this.chainId = 0;
        this.networkName = 'Network Detection Failed';
      }
      
      // Set up event listeners
      this.setupEventListeners();
      
      this.initialized = true;
      return true;
    } catch (error) {
      console.error('Error initializing Web3 provider:', error);
      return false;
    }
  }

  /**
   * Connect to MetaMask
   * @returns {Promise<string[]>} - Array of accounts if connection was successful
   */
  async connect() {
    try {
      if (!this.provider) {
        try {
          const initialized = await this.init();
          if (!initialized) {
            throw new Error('Failed to initialize Web3 provider');
          }
        } catch (initError) {
          throw new Error(`MetaMask initialization failed: ${initError.message}`);
        }
      }

      // Request accounts from MetaMask with timeout
      try {
        const accountsPromise = this.provider.request({ method: 'eth_requestAccounts' });
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Connection request timed out')), 10000);
        });
        
        this.accounts = await Promise.race([accountsPromise, timeoutPromise]);
        this.isConnected = this.accounts && this.accounts.length > 0;
        
        if (!this.isConnected) {
          throw new Error('No accounts returned from MetaMask');
        }
        
        // Update network information after successful connection
        try {
          this.networkId = await this.web3.eth.net.getId();
          this.chainId = await this.web3.eth.getChainId();
          this.networkName = getNetworkName(this.networkId);
          
          // Check if the network is supported after connecting
          if (!isNetworkSupported(this.networkId)) {
            console.warn(`Connected to unsupported network: ${this.networkName}. Attempting to switch...`);
            // Attempt to switch to a supported network (Ethereum mainnet by default)
            try {
              await switchNetwork(1);
            } catch (switchError) {
              console.warn(`Failed to switch network: ${switchError.message}`);
              // Continue with unsupported network rather than failing completely
            }
          }
        } catch (networkError) {
          console.warn('Error updating network information:', networkError);
          // Don't fail the connection just because network detection failed
        }
        
        return this.accounts;
      } catch (connectionError) {
        console.error('Failed to connect to MetaMask:', connectionError);
        throw new Error(`Failed to connect to MetaMask: ${connectionError.message}`);
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
      throw error;
    }
  }

  /**
   * Get the current connected accounts
   * @returns {Promise<string[]>} - Array of accounts
   */
  async getAccounts() {
    try {
      if (!this.isConnected) {
        return await this.connect();
      }
      return this.accounts;
    } catch (error) {
      console.error('Error getting accounts:', error);
      throw error;
    }
  }

  /**
   * Check if MetaMask is connected
   * @returns {boolean} - True if connected
   */
  isMetaMaskConnected() {
    return this.isConnected;
  }

  /**
   * Set up event listeners for the provider
   */
  setupEventListeners() {
    if (!this.provider) return;

    // Handle chain changes
    this.provider.on('chainChanged', async (chainId) => {
      console.log('Chain changed to:', chainId);
      // Update network information
      this.chainId = parseInt(chainId, 16);
      this.networkId = this.chainId;
      this.networkName = getNetworkName(this.networkId);
      
      // Check if the new network is supported
      const supported = isNetworkSupported(this.networkId);
      console.log(`Network ${this.networkName} is ${supported ? 'supported' : 'not supported'}`);
      
      // Reload the page on chain change as recommended by MetaMask
      window.location.reload();
    });

    // Handle account changes
    this.provider.on('accountsChanged', (accounts) => {
      console.log('Accounts changed:', accounts);
      this.accounts = accounts;
      this.isConnected = accounts.length > 0;
      
      // If no accounts, user has disconnected
      if (accounts.length === 0) {
        console.log('User disconnected from MetaMask');
      }
    });

    // Handle disconnect
    this.provider.on('disconnect', () => {
      console.log('MetaMask disconnected');
      this.isConnected = false;
      this.accounts = [];
    });
  }
}

// Create a singleton instance
const web3Provider = new Web3Provider();

export default web3Provider;