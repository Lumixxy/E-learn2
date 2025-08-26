import React from 'react';
import {
  Box,
  Text,
  Flex,
  Badge,
  Tooltip,
  Link,
  Icon,
  useColorModeValue,
  VStack,
  HStack,
  Button,
} from '@chakra-ui/react';
import { ExternalLinkIcon, CopyIcon } from '@chakra-ui/icons';
import { FaEthereum } from 'react-icons/fa';
import { useWeb3 } from '../../context/Web3Context';

const WalletInfo = () => {
  const { accounts, networkName, isNetworkSupported } = useWeb3();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'white');
  const mutedColor = useColorModeValue('gray.500', 'gray.400');
  
  // Format address to show only first 6 and last 4 characters
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  // Copy address to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };
  
  // Get explorer URL based on network
  const getExplorerUrl = (address) => {
    // Default to Ethereum mainnet
    let baseUrl = 'https://etherscan.io/address/';
    
    // Adjust for different networks
    if (networkName.toLowerCase().includes('polygon') || networkName.toLowerCase().includes('matic')) {
      baseUrl = 'https://polygonscan.com/address/';
    } else if (networkName.toLowerCase().includes('goerli')) {
      baseUrl = 'https://goerli.etherscan.io/address/';
    } else if (networkName.toLowerCase().includes('sepolia')) {
      baseUrl = 'https://sepolia.etherscan.io/address/';
    } else if (networkName.toLowerCase().includes('mumbai')) {
      baseUrl = 'https://mumbai.polygonscan.com/address/';
    }
    
    return `${baseUrl}${address}`;
  };
  
  if (!accounts || accounts.length === 0) {
    return null;
  }
  
  const address = accounts[0];
  
  return (
    <Box
      p={4}
      bg={bgColor}
      borderRadius="md"
      borderWidth="1px"
      borderColor={borderColor}
      boxShadow="sm"
      width="100%"
    >
      <VStack spacing={3} align="stretch">
        <Flex justify="space-between" align="center">
          <HStack>
            <Icon as={FaEthereum} color={textColor} />
            <Text fontWeight="bold" color={textColor}>Connected Wallet</Text>
          </HStack>
          <Badge colorScheme={isNetworkSupported ? 'green' : 'red'}>
            {networkName}
          </Badge>
        </Flex>
        
        <Box>
          <Text fontSize="sm" color={mutedColor} mb={1}>Account Address</Text>
          <HStack spacing={2}>
            <Text fontFamily="mono" fontSize="md">{formatAddress(address)}</Text>
            <Tooltip label="Copy address" placement="top">
              <Button
                size="xs"
                variant="ghost"
                onClick={() => copyToClipboard(address)}
                aria-label="Copy address"
              >
                <Icon as={CopyIcon} />
              </Button>
            </Tooltip>
            <Tooltip label="View on explorer" placement="top">
              <Link href={getExplorerUrl(address)} isExternal>
                <Button
                  size="xs"
                  variant="ghost"
                  aria-label="View on explorer"
                >
                  <Icon as={ExternalLinkIcon} />
                </Button>
              </Link>
            </Tooltip>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default WalletInfo;