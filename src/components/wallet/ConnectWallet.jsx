import React, { useState, useEffect } from 'react';
import {
  Button,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  VStack,
  HStack,
  Icon,
  Box,
} from '@chakra-ui/react';
import { FaEthereum } from 'react-icons/fa';
import { useWeb3 } from '../../context/Web3Context';
import MetaMaskError from './MetaMaskError';

const ConnectWallet = () => {
  const { isConnected, accounts, connectWallet, isLoading, error } = useWeb3();
  const [address, setAddress] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      const addr = accounts[0];
      // Format address to show only first 6 and last 4 characters
      setAddress(`${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`);
    } else {
      setAddress('');
    }
  }, [accounts]);

  const handleConnect = async () => {
    try {
      await connectWallet();
      toast({
        title: 'Wallet Connected',
        description: 'Your MetaMask wallet has been connected successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (err) {
      // Don't show toast for user rejections as we'll show the error component instead
      if (!err.message?.includes('User rejected the request')) {
        toast({
          title: 'Connection Failed',
          description: err.message || 'Failed to connect to MetaMask',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
      // Error will be displayed via the MetaMaskError component
    }
  };

  return (
    <>
      <Button
        onClick={isConnected ? null : onOpen}
        colorScheme={isConnected ? 'green' : 'orange'}
        variant="solid"
        size="md"
        isLoading={isLoading}
        leftIcon={<Icon as={FaEthereum} />}
      >
        {isConnected ? address : 'Connect Wallet'}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Connect Your Wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Text>
                Connect your MetaMask wallet to access blockchain features in this application.
              </Text>
              {error && <MetaMaskError error={error} resetError={() => handleConnect()} />}
              <HStack justify="center">
                <Button
                  onClick={handleConnect}
                  colorScheme="orange"
                  size="lg"
                  leftIcon={<Icon as={FaEthereum} />}
                  isLoading={isLoading}
                >
                  Connect MetaMask
                </Button>
              </HStack>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConnectWallet;