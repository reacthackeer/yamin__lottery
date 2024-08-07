import {
  Box,
  ChakraProvider,
  Container,
  Heading,
  Link,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

const winners = [
  {
    name: 'Alice Johnson',
    videoLink: 'https://www.youtube.com/watch?v=example1',
    amount: '50,000',
    address: '123 Main St, Springfield',
    lotteryNumber: '123456789',
  },
  {
    name: 'Bob Smith',
    videoLink: 'https://www.youtube.com/watch?v=example2',
    amount: '20,000',
    address: '456 Oak St, Metropolis',
    lotteryNumber: '987654321',
  },
  {
    name: 'Charlie Brown',
    videoLink: 'https://www.youtube.com/watch?v=example3',
    amount: '10,000',
    address: '789 Pine St, Gotham',
    lotteryNumber: '456123789',
  },
  // Add more winners here
];

const WinnersPage = () => {
  const bgColor = useColorModeValue("gray.50", "gray.900");

  return (
    <ChakraProvider>
      <Box py={10} px={4} bgGradient="linear(to-r, teal.500, green.500)">
        <Container maxW="container.lg" textAlign="center">
          <Heading as="h1" size="2xl" color="white" mb={4}>
            Recent Lottery Winners
          </Heading>
          <Text fontSize="xl" color="whiteAlpha.800" mb={6}>
            Meet our latest winners and watch their stories of success!
          </Text>
        </Container>
      </Box>

      <Box py={10} bg={bgColor}>
        <Container maxW="container.lg">
          <SimpleGrid columns={[1, 1, 2]} spacing={10}>
            {winners.map((winner, index) => (
              <WinnerCard key={index} {...winner} />
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    </ChakraProvider>
  );
};

const WinnerCard = ({ name, videoLink, amount, address, lotteryNumber }) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.200");
  const linkColor = useColorModeValue("teal.500", "teal.200");

  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg={cardBg}>
      <Heading fontSize="xl" mb={2} color={textColor}>
        {name}
      </Heading>
      <Text fontSize="md" color={textColor} mb={2}>
        <strong>Amount:</strong> ${amount}
      </Text>
      <Text fontSize="md" color={textColor} mb={2}>
        <strong>Address:</strong> {address}
      </Text>
      <Text fontSize="md" color={textColor} mb={2}>
        <strong>Lottery Number:</strong> {lotteryNumber}
      </Text>
      <Link href={videoLink} isExternal color={linkColor}>
        Watch Video
      </Link>
    </Box>
  );
};

export default WinnersPage;
