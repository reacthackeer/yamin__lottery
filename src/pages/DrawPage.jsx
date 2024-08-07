import {
    Box,
    Button,
    Container,
    Heading,
    Skeleton,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    VStack,
    useColorModeValue
} from '@chakra-ui/react';
import React, { useState } from 'react';

// Sample data for winners
const sampleWinners = [
  { id: 1, name: 'Alice Johnson', prize: '50,000' },
  { id: 2, name: 'Bob Smith', prize: '20,000' },
  { id: 3, name: 'Charlie Brown', prize: '10,000' },
  { id: 4, name: 'David Wilson', prize: '5,000' },
  { id: 5, name: 'Emma Davis', prize: '2,000' }
];

const CheckDrawPage = () => {
  const [winners, setWinners] = useState([]);
  const [isDrawCompleted, setIsDrawCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDrawNow = () => {
    // Simulate fetching data
    setIsLoading(true);
    setTimeout(() => {
      setWinners(sampleWinners);
      setIsDrawCompleted(true);
      setIsLoading(false);
    }, 1500); // Simulate network delay
  };

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.200");

  return (
    <Box>
      <Box py={10} px={4} bgGradient="linear(to-r, teal.500, green.500)">
        <Container maxW="container.md" textAlign="center">
          <Heading as="h1" size="2xl" color="white" mb={4}>
            Check Latest Draw Results
          </Heading>
          <Text fontSize="xl" color="whiteAlpha.800" mb={6}>
            Discover the winners of the latest lottery draw. Click the button below to perform the draw and see the results.
          </Text>
          <Button colorScheme="teal" size="lg" onClick={handleDrawNow}>
            Draw Now
          </Button>
        </Container>
      </Box>

      <Box py={10} bg={bgColor}>
        <Container maxW="container.md">
          {!isDrawCompleted && !isLoading && (
            <VStack spacing={8} textAlign="center">
              <Heading as="h2" size="lg" color={textColor} mb={4}>
                Awaiting Draw
              </Heading>
              <Text fontSize="md" color={textColor}>
                No draw results available yet. Please initiate the draw to see the winners.
              </Text>
            </VStack>
          )}

          {isLoading && (
            <VStack spacing={8} textAlign="center">
              <Heading as="h2" size="lg" color={textColor} mb={4}>
                Loading Draw Results...
              </Heading>
              <Skeleton height="20px" width="80%" mb={4} />
              <Skeleton height="20px" width="80%" mb={4} />
              <Skeleton height="20px" width="80%" mb={4} />
              <Skeleton height="20px" width="80%" mb={4} />
              <Skeleton height="20px" width="80%" mb={4} />
            </VStack>
          )}

          {isDrawCompleted && !isLoading && (
            <VStack spacing={8} textAlign="center">
              <Heading as="h2" size="lg" color={textColor} mb={4}>
                Winners List
              </Heading>
              {winners.length > 0 ? (
                <Box>
                    <Table variant="simple" size="md">
                        <Thead>
                        <Tr>
                            <Th>Winner ID</Th>
                            <Th>Name</Th>
                            <Th>Prize</Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                        {winners.map((winner) => (
                            <Tr key={winner.id}>
                            <Td>{winner.id}</Td>
                            <Td>{winner.name}</Td>
                            <Td>${winner.prize}</Td>
                            </Tr>
                        ))}
                        </Tbody>
                    </Table>
                    <Box textAlign={'right'} mt='5'>
                        <Button isDisabled='true'>Add Winner</Button>
                    </Box>
                </Box>
              ) : (
                <Text fontSize="md" color={textColor}>
                  No winners available. Please try again later.
                </Text>
              )}
            </VStack>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default CheckDrawPage;
