import {
  Badge,
  Box,
  Center,
  ChakraProvider,
  Heading,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  extendTheme,
} from '@chakra-ui/react';
import React from 'react';

// Prize database
const allPrizeDatabase = [
  {
    id: 1,
    name: `FIFTY-FIVE THOUSAND US DOLLAR`,
    price: 55000,
  },
  {
    id: 2,
    name: `TEN THOUSAND US DOLLAR`,
    price: 10000,
  },
  {
    id: 3,
    name: `FIVE THOUSAND US DOLLAR`,
    price: 5000,
  },
  {
    id: 4,
    name: `TWO THOUSAND US DOLLAR`,
    price: 2000,
  },
  {
    id: 5,
    name: `ONE THOUSAND US DOLLAR`,
    price: 1000,
  },
];

const theme = extendTheme({
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
});

const PrizeTable = () => {
  return (
    <ChakraProvider theme={theme}>
      <Center mt={10}>
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" w="80%">
          <Heading mb={5}>Prize List</Heading>
          <Table variant="striped" colorScheme="teal">
            <TableCaption placement="top">Available Prizes</TableCaption>
            <Thead>
              <Tr>
                <Th>Prize Name</Th>
                <Th isNumeric>Amount</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {allPrizeDatabase.map((prize) => (
                <Tr key={prize.id}>
                  <Td>{prize.name}</Td>
                  <Td isNumeric>${prize.price.toLocaleString()}</Td>
                  <Td>
                    <Badge colorScheme="green">Available</Badge>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Center>
    </ChakraProvider>
  );
};

export default PrizeTable;
