import React from "react";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "components/card/Card.js";
import HistoryItem from "./HistoryItem";

// Mock Data for demonstration
const historyData = [
  {
    image: "https://via.placeholder.com/150/92c952",
    name: "Abstract Art & Design",
    author: "By Esthera Jackson",
    date: "30s ago",
    price: "0.91 ETH",
  },
  {
    image: "https://via.placeholder.com/150/771796",
    name: "Python for Beginners",
    author: "By Nick Wilson",
    date: "5m ago",
    price: "0.52 ETH",
  },
  {
    image: "https://via.placeholder.com/150/24f355",
    name: "Modern Web Development",
    author: "By Manny Gates",
    date: "1h ago",
    price: "1.08 ETH",
  },
];

export default function History() {
  const textColor = useColorModeValue("navy.700", "white");

  return (
    <Card>
      <Flex direction="column" w="100%" px="22px" py="18px">
        <Text color={textColor} fontSize="xl" fontWeight="600" mb="12px">
          History
        </Text>
        <Box>
          {historyData.map((item, index) => (
            <HistoryItem
              key={index}
              name={item.name}
              author={item.author}
              date={item.date}
              image={item.image}
              price={item.price}
            />
          ))}
        </Box>
      </Flex>
    </Card>
  );
}