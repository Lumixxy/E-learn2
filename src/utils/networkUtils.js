/**
 * Network utility functions for Ethereum blockchain interactions
 */

// Supported networks configuration
export const SUPPORTED_NETWORKS = {
  // Ethereum Mainnet
  1: {
    chainId: '0x1',
    chainName: 'Ethereum Mainnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://mainnet.infura.io/v3/'],
    blockExplorerUrls: ['https://etherscan.io']
  },
  // Goerli Testnet
  5: {
    chainId: '0x5',
    chainName: 'Goerli Testnet',
    nativeCurrency: {
      name: 'Goerli Ether',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://goerli.infura.io/v3/'],
    blockExplorerUrls: ['https://goerli.etherscan.io']
  },
  // Sepolia Testnet
  11155111: {
    chainId: '0xaa36a7',
    chainName: 'Sepolia Testnet',
    nativeCurrency: {
      name: 'Sepolia Ether',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://sepolia.infura.io/v3/'],
    blockExplorerUrls: ['https://sepolia.etherscan.io']
  },
  // Polygon Mainnet
  137: {
    chainId: '0x89',
    chainName: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    },
    rpcUrls: ['https://polygon-rpc.com/'],
    blockExplorerUrls: ['https://polygonscan.com/']
  },
  // Mumbai Testnet (Polygon)
  80001: {
    chainId: '0x13881',
    chainName: 'Mumbai Testnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    },
    rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
    blockExplorerUrls: ['https://mumbai.polygonscan.com/']
  }
};

/**
 * Check if the current network is supported
 * @param {number} chainId - The current chain ID
 * @returns {boolean} - Whether the network is supported
 */
export const isNetworkSupported = (chainId) => {
  return Object.keys(SUPPORTED_NETWORKS).includes(chainId.toString());
};

/**
 * Switch to a supported network
 * @param {number} networkId - The network ID to switch to
 * @returns {Promise} - Promise that resolves when network is switched
 */
export const switchNetwork = async (networkId = 1) => {
  if (!window.ethereum) {
    throw new Error('MetaMask is not installed');
  }

  const networkConfig = SUPPORTED_NETWORKS[networkId];
  if (!networkConfig) {
    throw new Error(`Network ID ${networkId} is not supported`);
  }

  try {
    // Try to switch to the network
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: networkConfig.chainId }],
    });
  } catch (error) {
    // This error code indicates that the chain has not been added to MetaMask
    if (error.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [networkConfig],
        });
      } catch (addError) {
        throw new Error(`Failed to add network: ${addError.message}`);
      }
    } else {
      throw new Error(`Failed to switch network: ${error.message}`);
    }
  }
};

/**
 * Get network name from chain ID
 * @param {number} chainId - The chain ID
 * @returns {string} - The network name
 */
export const getNetworkName = (chainId) => {
  const network = SUPPORTED_NETWORKS[chainId];
  return network ? network.chainName : 'Unknown Network';
};