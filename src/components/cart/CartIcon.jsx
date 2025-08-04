import React from 'react';
import {
  IconButton,
  Badge,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../../contexts/CartContext';

const CartIcon = () => {
  const { getCartItemCount, openCart } = useCart();
  const itemCount = getCartItemCount();
  
  const iconColor = useColorModeValue('gray.600', 'white');
  const badgeBg = useColorModeValue('red.500', 'red.400');

  return (
    <Tooltip label="Shopping Cart" placement="bottom">
      <IconButton
        aria-label="Shopping Cart"
        icon={
          <Badge
            colorScheme="red"
            variant="solid"
            position="absolute"
            top="-1"
            right="-1"
            borderRadius="full"
            fontSize="xs"
            minW="20px"
            h="20px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            opacity={itemCount > 0 ? 1 : 0}
            transition="opacity 0.2s"
          >
            {itemCount}
          </Badge>
        }
        variant="ghost"
        color={iconColor}
        _hover={{
          bg: useColorModeValue('gray.100', 'whiteAlpha.200'),
        }}
        onClick={openCart}
        position="relative"
        size="md"
      >
        <FiShoppingCart size={20} />
      </IconButton>
    </Tooltip>
  );
};

export default CartIcon; 