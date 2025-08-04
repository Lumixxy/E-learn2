import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Text,
  Avatar,
  Progress,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";

export default function TopCreatorsTable(props) {
  const { columnsData, tableData } = props;
  const textColor = useColorModeValue("navy.700", "white");

  return (
    <Card>
      <Flex direction="column" w="100%" px="22px" py="18px">
        <Text color={textColor} fontSize="xl" fontWeight="600" mb="12px">
          Top Creators
        </Text>
        <Table variant="simple" color="gray.500" mb="24px">
          <Thead>
            <Tr>
              {columnsData.map((column, index) => (
                <Th key={index} pe="10px" borderColor="transparent">
                  <Text
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >
                    {column.Header}
                  </Text>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map((row, index) => (
              <Tr key={index}>
                <Td>
                  <Flex align="center">
                    <Avatar
                      src={row.name[1]}
                      w="30px"
                      h="30px"
                      me="16px"
                    />
                    <Text
                      color={textColor}
                      fontSize="sm"
                      fontWeight="600"
                    >
                      {row.name[0]}
                    </Text>
                  </Flex>
                </Td>
                <Td>
                  <Text color={textColor} fontSize="sm" fontWeight="500">
                    {row.artworks}
                  </Text>
                </Td>
                <Td>
                  <Flex align="center">
                    <Text
                      color={textColor}
                      fontSize="sm"
                      fontWeight="500"
                      me="12px"
                    >
                      {row.rating}%
                    </Text>
                    <Progress
                      variant="table"
                      colorScheme="brandScheme"
                      value={row.rating}
                      w="80px"
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
    </Card>
  );
}