// Chakra imports
import { Avatar, Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import React from "react";
import { OrbitingCircles } from "../../../../components/magicui/orbiting-circles";
import { Moon, Flame, Bell, Database } from "lucide-react";

export default function Banner(props) {
  const { banner, avatar, name, job, posts, followers, following } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );
  return (
    <Card mb={{ base: "0px", lg: "20px" }} align='center'>
      <Box position="relative" w="full" h="250px">
        {/* Orbiting settings icons */}
        <Box className="absolute inset-0 pointer-events-none" h="250px" w="full">
          <OrbitingCircles>
            <Moon />
            <Flame />
            <Bell />
            <Database />
          </OrbitingCircles>
        </Box>
        {/* Profile content */}
        <Box position="absolute" top="0" left="0" w="full" h="full" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Box
            bg={`url(${banner})`}
            bgSize='cover'
            borderRadius='16px'
            h='131px'
            w='100%'
          />
          <Avatar
            mx='auto'
            src={avatar}
            h='87px'
            w='87px'
            mt='-43px'
            border='4px solid'
            borderColor={borderColor}
          />
          <Text color={textColorPrimary} fontWeight='bold' fontSize='xl' mt='10px'>
            {name}
          </Text>
          <Text color={textColorSecondary} fontSize='sm'>
            {job}
          </Text>
          <Flex w='max-content' mx='auto' mt='26px'>
            <Flex mx='auto' me='60px' align='center' direction='column'>
              <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
                {posts}
              </Text>
              <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
                Posts
              </Text>
            </Flex>
            <Flex mx='auto' me='60px' align='center' direction='column'>
              <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
                {followers}
              </Text>
              <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
                Followers
              </Text>
            </Flex>
            <Flex mx='auto' align='center' direction='column'>
              <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
                {following}
              </Text>
              <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
                Following
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Card>
  );
}
