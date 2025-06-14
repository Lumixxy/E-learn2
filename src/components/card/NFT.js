// Chakra imports
import {
  AvatarGroup,
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Link,
  Text,
  useColorModeValue,
  Badge,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
// Assets
import React, { useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

export default function NFT(props) {
  const { 
    image, 
    name, 
    author, 
    bidders = [],
    download, 
    currentPrice, 
    originalPrice, 
    discount, 
    buttonText = "Buy the Course" 
  } = props;
  
  const [like, setLike] = useState(false);
  const textColor = useColorModeValue("navy.700", "white");
  const textColorBid = useColorModeValue("brand.500", "white");
  
  return (
    <Card p='20px'>
      <Flex direction={{ base: "column" }} justify='center'>
        <Box mb={{ base: "20px", "2xl": "20px" }} position='relative'>
          <Image
            src={image}
            w={{ base: "100%", "3xl": "100%" }}
            h={{ base: "100%", "3xl": "100%" }}
            borderRadius='20px'
          />
          {discount && (
            <Badge
              position='absolute'
              top='10px'
              left='10px'
              colorScheme='green'
              fontSize='sm'
              px='8px'
              py='4px'
              borderRadius='full'
              fontWeight='bold'>
              {discount} OFF
            </Badge>
          )}
          <Button
            position='absolute'
            bg='white'
            _hover={{ bg: "whiteAlpha.900" }}
            _active={{ bg: "white" }}
            _focus={{ bg: "white" }}
            p='0px !important'
            top='14px'
            right='14px'
            borderRadius='50%'
            minW='36px'
            h='36px'
            onClick={() => {
              setLike(!like);
            }}>
            <Icon
              transition='0.2s linear'
              w='20px'
              h='20px'
              as={like ? IoHeart : IoHeartOutline}
              color='brand.500'
            />
          </Button>
        </Box>
        <Flex flexDirection='column' justify='space-between' h='100%'>
          <Flex
            justify='space-between'
            direction={{
              base: "row",
              md: "column",
              lg: "row",
              xl: "column",
              "2xl": "row",
            }}
            mb='auto'>
            <Flex direction='column'>
              <Text
                color={textColor}
                fontSize={{
                  base: "xl",
                  md: "lg",
                  lg: "lg",
                  xl: "lg",
                  "2xl": "md",
                  "3xl": "lg",
                }}
                mb='5px'
                fontWeight='bold'
                me='14px'>
                {name}
              </Text>
              <Text
                color='secondaryGray.600'
                fontSize={{
                  base: "sm",
                }}
                fontWeight='400'
                me='14px'>
                {author}
              </Text>
            </Flex>
            {bidders.length > 0 && (
              <AvatarGroup
                max={3}
                color={textColorBid}
                size='sm'
                mt={{
                  base: "0px",
                  md: "10px",
                  lg: "0px",
                  xl: "10px",
                  "2xl": "0px",
                }}
                fontSize='12px'>
                {bidders.map((avt, key) => (
                  <Avatar key={key} src={avt} />
                ))}
              </AvatarGroup>
            )}
          </Flex>
          <Flex
            align='start'
            justify='space-between'
            direction={{
              base: "row",
              md: "column",
              lg: "row",
              xl: "column",
              "2xl": "row",
            }}
            mt='25px'>
            <Flex direction='column'>
              <Text fontWeight='700' fontSize='sm' color={textColorBid} mb='5px'>
                Current Price
              </Text>
              <Flex align='center' gap='10px'>
                <Text fontWeight='700' fontSize='lg' color={textColor}>
                  {currentPrice}
                </Text>
                {originalPrice && (
                  <Text
                    fontWeight='400'
                    fontSize='sm'
                    color='secondaryGray.600'
                    textDecoration='line-through'>
                    {originalPrice}
                  </Text>
                )}
              </Flex>
            </Flex>
            <Button
              variant='darkBrand'
              color='white'
              fontSize='sm'
              fontWeight='500'
              borderRadius='70px'
              px='24px'
              py='5px'>
              Buy the Course
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}