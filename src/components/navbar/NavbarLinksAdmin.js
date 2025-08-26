// Chakra Imports
import {
  Avatar,
  Button,
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useColorMode,
  HStack,
  Progress,
  Tooltip,
  Box,
} from '@chakra-ui/react';
// Custom Components
import { ItemContent } from 'components/menu/ItemContent';
import { SearchBar } from 'components/navbar/searchBar/SearchBar';
import { SidebarResponsive } from 'components/sidebar/Sidebar';
import PropTypes from 'prop-types';
import React from 'react';
// Assets
import { MdNotificationsNone } from 'react-icons/md';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import { GiAchievement } from 'react-icons/gi';
import { FiZap } from "react-icons/fi";
import routes from 'routes';
import CartIcon from '../cart/CartIcon';
import { useXP } from 'contexts/XPContext';
import ConnectWallet from '../wallet/ConnectWallet';
import NetworkSwitcher from '../wallet/NetworkSwitcher';



export default function HeaderLinks(props) {
  const { secondary } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  // Chakra Color Mode
  const navbarIcon = useColorModeValue('gray.400', 'white');
  let menuBg = useColorModeValue('white', 'navy.800');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorBrand = useColorModeValue('brand.700', 'brand.400');
  const ethColor = useColorModeValue('gray.700', 'white');
  const ethBg = useColorModeValue('secondaryGray.300', 'navy.800');
  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
    '14px 17px 40px 4px rgba(112, 144, 176, 0.06)',
  );

  // Get XP from XPContext
  const { totalXP } = useXP();
  const maxXP = 1500;
  const xpPercentage = (totalXP / maxXP) * 100;
  const xpNeededToLevelUp = maxXP - totalXP;
  const dayStreak = 7; // Hardcoded Day Streak value

  const progressGradient = `linear-gradient(to right, ${useColorModeValue("brand.500", "brand.400")}, ${useColorModeValue("blue.500", "blue.300")})`;

  return (
    <Flex
      w={{ sm: '100%', md: 'auto' }}
      alignItems='center'
      flexDirection='row'
      bg={menuBg}
      flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
      p='10px'
      borderRadius='0px'
      boxShadow='none'
      justifyContent="flex-end"
      gap="16px"
    >
      <SearchBar
        mb={() => {
          if (secondary) {
            return { base: '10px', md: 'unset' };
          }
          return 'unset';
        }}
        me={{ base: '0px', md: '16px' }}
        borderRadius='30px'
      />

      <HStack spacing='8px'>
        <Tooltip label={`${dayStreak}-day learning streak!`} aria-label='Day streak'>
          <HStack
            bg={ethBg}
            borderRadius='30px'
            p='6px 10px'
            align='center'
            cursor="pointer"
            _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
            transition="all 0.2s ease-in-out"
          >
            <Icon as={FiZap} color="orange.400" w='18px' h='18px' me='4px' />
            <Text color={textColor} fontSize='sm' fontWeight='700'>
              {dayStreak} Day Streak
            </Text>
          </HStack>
        </Tooltip>

        <Tooltip label={`You need ${xpNeededToLevelUp} XP to level up!`} aria-label='XP progress'>
          <HStack
            bg={ethBg}
            borderRadius='30px'
            p='6px 10px'
            align='center'
            display={{ base: 'none', lg: 'flex' }}
          >
            <Icon as={GiAchievement} color={ethColor} w='18px' h='18px' me='4px' />
            <Text fontSize="sm" color={textColor} whiteSpace="nowrap">
              {totalXP}/{maxXP}
            </Text>
            <Box w='100px' ml="8px">
              <Progress
                value={xpPercentage}
                colorScheme='purple'
                size='sm'
                borderRadius='full'
                hasStripe
                sx={{
                  "& > div": {
                    background: progressGradient,
                    transition: "width 0.5s ease-in-out",
                  },
                }}
              />
            </Box>

          </HStack>
        </Tooltip>

        <SidebarResponsive routes={routes} />
        <CartIcon />
        <NetworkSwitcher />
        <ConnectWallet />
        <Menu>
          <MenuButton p='0px'>
            <Icon
              mt='6px'
              as={MdNotificationsNone}
              color={navbarIcon}
              w='18px'
              h='18px'
              me='10px'
            />
          </MenuButton>
          <MenuList
            boxShadow={shadow}
            p='20px'
            borderRadius='20px'
            bg={menuBg}
            border='none'
            mt='22px'
            me={{ base: '30px', md: 'unset' }}
            minW={{ base: 'unset', md: '400px', xl: '450px' }}
            maxW={{ base: '360px', md: 'unset' }}
          >
            <Flex w='100%' mb='20px'>
              <Text fontSize='md' fontWeight='600' color={textColor}>
                Notifications
              </Text>
              <Text
                fontSize='sm'
                fontWeight='500'
                color={textColorBrand}
                ms='auto'
                cursor='pointer'
              >
                Mark all read
              </Text>
            </Flex>
            <Flex flexDirection='column'>
              <MenuItem
                _hover={{ bg: 'none' }}
                _focus={{ bg: 'none' }}
                px='0'
                borderRadius='8px'
                mb='10px'
              >
                <ItemContent info='Horizon UI Dashboard PRO' />
              </MenuItem>
              <MenuItem
                _hover={{ bg: 'none' }}
                _focus={{ bg: 'none' }}
                px='0'
                borderRadius='8px'
                mb='10px'
              >
                <ItemContent info='Horizon Design System Free' />
              </MenuItem>
            </Flex>
          </MenuList>
        </Menu>

        <Button
          variant='no-hover'
          bg='transparent'
          p='0px'
          minW='unset'
          minH='unset'
          h='18px'
          w='max-content'
          onClick={toggleColorMode}
        >
          <Icon
            me='10px'
            h='18px'
            w='18px'
            color={navbarIcon}
            as={colorMode === 'light' ? IoMdMoon : IoMdSunny}
          />
        </Button>
        <Menu>
          <MenuButton p='0px'>
            <Avatar
              _hover={{ cursor: 'pointer' }}
              color="white"
              name="Adela Parkson"
              src="https://i.pravatar.cc/150?img=7"
              bg="#11047A"
              size="sm"
              w="40px"
              h="40px"
            />
          </MenuButton>
          <MenuList
            boxShadow={shadow}
            p='20px'
            borderRadius='20px'
            bg={menuBg}
            border='none'
            mt='22px'
            minW={{ base: 'unset', md: '400px', xl: '450px' }}
            maxW={{ base: '360px', md: 'unset' }}
          >
            <Flex flexDirection='column'>
              <MenuItem borderRadius='8px' mb='10px'>
                <Image borderRadius='full' boxSize='48px' src='https://i.pravatar.cc/150?img=7' alt='Adela Parkson' mr='12px' />
                <Flex flexDirection='column'>
                  <Text fontSize='sm' fontWeight='bold' color={textColor}>
                    Adela Parkson
                  </Text>
                  <Text fontSize='xs' color='gray.500'>
                    adela@example.com
                  </Text>
                </Flex>
              </MenuItem>
              <MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} color='red.500' px='0' borderRadius='8px'>
                Log out
              </MenuItem>
            </Flex>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
