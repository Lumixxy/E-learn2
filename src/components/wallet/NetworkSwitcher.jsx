import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Text,
  HStack,
  Icon,
  useColorModeValue,
  Badge,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { FaEthereum } from 'react-icons/fa';
import { SiPolygon } from 'react-icons/si';
import { useWeb3 } from '../../context/Web3Context';
import { SUPPORTED_NETWORKS } from '../../utils/networkUtils';

const NetworkSwitcher = () => {
  const { networkId, networkName, isNetworkSupported, switchToNetwork, isLoading } = useWeb3();
  
  const menuBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'white');
  const badgeBg = useColorModeValue('green.100', 'green.800');
  const badgeColor = useColorModeValue('green.800', 'green.100');
  const unsupportedBadgeBg = useColorModeValue('red.100', 'red.800');
  const unsupportedBadgeColor = useColorModeValue('red.800', 'red.100');

  // Get network icon based on network name
  const getNetworkIcon = (networkName) => {
    if (networkName.toLowerCase().includes('polygon') || networkName.toLowerCase().includes('matic')) {
      return SiPolygon;
    }
    return FaEthereum;
  };

  const handleNetworkSwitch = async (networkId) => {
    try {
      await switchToNetwork(networkId);
    } catch (error) {
      console.error('Failed to switch network:', error);
    }
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        leftIcon={<Icon as={getNetworkIcon(networkName)} />}
        size="md"
        variant="outline"
        colorScheme={isNetworkSupported ? "green" : "red"}
        isLoading={isLoading}
      >
        <HStack spacing={2}>
          <Text fontSize="sm">{networkName}</Text>
          <Badge 
            colorScheme={isNetworkSupported ? "green" : "red"}
            variant="subtle"
            fontSize="xs"
          >
            {isNetworkSupported ? 'Supported' : 'Unsupported'}
          </Badge>
        </HStack>
      </MenuButton>
      <MenuList bg={menuBg} borderColor={useColorModeValue('gray.200', 'gray.700')}>
        {Object.entries(SUPPORTED_NETWORKS).map(([id, network]) => (
          <MenuItem 
            key={id} 
            onClick={() => handleNetworkSwitch(parseInt(id))}
            isDisabled={parseInt(id) === networkId}
            color={textColor}
          >
            <HStack spacing={2}>
              <Icon as={getNetworkIcon(network.chainName)} />
              <Text>{network.chainName}</Text>
              {parseInt(id) === networkId && (
                <Badge colorScheme="green" variant="subtle" ml={2}>Current</Badge>
              )}
            </HStack>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default NetworkSwitcher;