import React from 'react';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Card,
  CardHeader,
  CardBody,
  SimpleGrid,
  Icon,
  Button,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { FaEthereum, FaWallet } from 'react-icons/fa';
import { useWeb3 } from '../../../context/Web3Context';
import ConnectWallet from '../../../components/wallet/ConnectWallet';
import WalletInfo from '../../../components/wallet/WalletInfo';
import NetworkSwitcher from '../../../components/wallet/NetworkSwitcher';
import MetaMaskError from '../../../components/wallet/MetaMaskError';

const WalletDashboard = () => {
  const { isConnected, accounts, error, networkName, isNetworkSupported } = useWeb3();
  
  const textColor = useColorModeValue('navy.700', 'white');
  const cardBg = useColorModeValue('white', 'navy.800');
  const cardShadow = useColorModeValue('0px 18px 40px rgba(112, 144, 176, 0.12)', 'none');
  
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <Grid
        templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
        gap={8}
        mb={8}
      >
        <GridItem>
          <Heading as="h2" size="lg" mb={4} color={textColor}>
            Wallet Dashboard
          </Heading>
          <Text color={textColor} opacity={0.8} mb={6}>
            Connect your MetaMask wallet to access blockchain features in this application.
          </Text>
          
          {error && <MetaMaskError error={error} />}
          
          {!isConnected ? (
            <Card bg={cardBg} boxShadow={cardShadow} p={6} borderRadius="xl">
              <CardHeader pb={0}>
                <Flex align="center">
                  <Icon as={FaWallet} boxSize={8} color="orange.400" mr={4} />
                  <Heading size="md">Connect Your Wallet</Heading>
                </Flex>
              </CardHeader>
              <CardBody>
                <Text mb={6}>
                  To access blockchain features, please connect your MetaMask wallet.
                  This will allow you to interact with smart contracts and view your assets.
                </Text>
                <Flex justify="center">
                  <ConnectWallet />
                </Flex>
              </CardBody>
            </Card>
          ) : (
            <Card bg={cardBg} boxShadow={cardShadow} p={6} borderRadius="xl">
              <CardHeader pb={0}>
                <Flex align="center" justify="space-between">
                  <Flex align="center">
                    <Icon as={FaEthereum} boxSize={8} color="purple.400" mr={4} />
                    <Heading size="md">Wallet Connected</Heading>
                  </Flex>
                  <NetworkSwitcher />
                </Flex>
              </CardHeader>
              <CardBody>
                <WalletInfo />
                
                {!isNetworkSupported && (
                  <Alert status="warning" mt={4} borderRadius="md">
                    <AlertIcon />
                    <Box>
                      <AlertTitle>Unsupported Network</AlertTitle>
                      <AlertDescription>
                        You are connected to {networkName}, which is not fully supported.
                        Please switch to a supported network using the network selector above.
                      </AlertDescription>
                    </Box>
                  </Alert>
                )}
              </CardBody>
            </Card>
          )}
        </GridItem>
        
        <GridItem>
          {isConnected && (
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <Card bg={cardBg} boxShadow={cardShadow} p={4} borderRadius="xl">
                <CardHeader pb={0}>
                  <Heading size="sm">Account</Heading>
                </CardHeader>
                <CardBody>
                  <Text fontFamily="mono" fontSize="sm">
                    {accounts[0]?.substring(0, 6)}...{accounts[0]?.substring(accounts[0].length - 4)}
                  </Text>
                </CardBody>
              </Card>
              
              <Card bg={cardBg} boxShadow={cardShadow} p={4} borderRadius="xl">
                <CardHeader pb={0}>
                  <Heading size="sm">Network</Heading>
                </CardHeader>
                <CardBody>
                  <Text>{networkName}</Text>
                </CardBody>
              </Card>
              
              <Card bg={cardBg} boxShadow={cardShadow} p={4} borderRadius="xl" gridColumn={{ md: 'span 2' }}>
                <CardHeader pb={0}>
                  <Heading size="sm">Actions</Heading>
                </CardHeader>
                <CardBody>
                  <Button colorScheme="purple" size="sm" leftIcon={<Icon as={FaEthereum} />}>
                    View Transactions
                  </Button>
                </CardBody>
              </Card>
            </SimpleGrid>
          )}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default WalletDashboard;