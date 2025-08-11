import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  VStack,
  HStack,
  Text,
  Image,
  IconButton,
  Box,
  Divider,
  useColorModeValue,
  Flex,
  Badge,
} from '@chakra-ui/react';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '../../contexts/CartContext';
import { convertToINR } from '../../utils/priceUtils';

const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
  } = useCart();

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const itemBgColor = useColorModeValue('gray.50', 'gray.700');

  const handleCheckout = () => {
    // Implement checkout logic here
    console.log('Checkout clicked');
    closeCart();
  };

  return (
    <Drawer isOpen={isCartOpen} placement="right" onClose={closeCart} size="md">
      <DrawerOverlay />
      <DrawerContent bg={bgColor}>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px" color={textColor}>
          Shopping Cart ({cart.length} items)
        </DrawerHeader>

        <DrawerBody>
          {cart.length === 0 ? (
            <VStack spacing={4} align="center" justify="center" h="200px">
              <Text color="gray.500" fontSize="lg">
                Your cart is empty
              </Text>
              <Text color="gray.400" fontSize="sm" textAlign="center">
                Add some courses to get started!
              </Text>
            </VStack>
          ) : (
            <VStack spacing={4} align="stretch">
              {cart.map((item) => (
                <Box
                  key={item.id}
                  p={4}
                  borderWidth="1px"
                  borderRadius="lg"
                  borderColor={borderColor}
                  bg={itemBgColor}
                >
                  <HStack spacing={3} align="start">
                    <Image
                      src={item.image}
                      alt={item.title}
                      boxSize="60px"
                      objectFit="cover"
                      borderRadius="md"
                      fallbackSrc="https://via.placeholder.com/60x60?text=Course"
                    />
                    <VStack align="start" flex={1} spacing={1}>
                      <Text fontWeight="bold" fontSize="sm" color={textColor}>
                        {item.title}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {item.author}
                      </Text>
                      <Text fontSize="sm" fontWeight="semibold" color="blue.500">
                        {convertToINR(item.price || 0)}
                      </Text>
                    </VStack>
                    <VStack spacing={1}>
                      <HStack spacing={1}>
                        <IconButton
                          size="xs"
                          icon={<FiMinus />}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        />
                        <Badge colorScheme="blue" variant="solid" minW="30px" textAlign="center">
                          {item.quantity}
                        </Badge>
                        <IconButton
                          size="xs"
                          icon={<FiPlus />}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        />
                      </HStack>
                      <IconButton
                        size="xs"
                        icon={<FiTrash2 />}
                        colorScheme="red"
                        variant="ghost"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                      />
                    </VStack>
                  </HStack>
                </Box>
              ))}
            </VStack>
          )}
        </DrawerBody>

        {cart.length > 0 && (
          <DrawerFooter borderTopWidth="1px" borderColor={borderColor}>
            <VStack spacing={4} w="full">
              <HStack justify="space-between" w="full">
                <Text fontWeight="bold" color={textColor}>
                  Total:
                </Text>
                <Text fontWeight="bold" color="blue.500" fontSize="lg">
                  {convertToINR(getCartTotal())}
                </Text>
              </HStack>
              <Divider />
              <HStack spacing={3} w="full">
                <Button
                  variant="outline"
                  onClick={clearCart}
                  flex={1}
                  colorScheme="red"
                >
                  Clear Cart
                </Button>
                <Button
                  colorScheme="blue"
                  onClick={handleCheckout}
                  flex={2}
                >
                  Checkout
                </Button>
              </HStack>
            </VStack>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer; 