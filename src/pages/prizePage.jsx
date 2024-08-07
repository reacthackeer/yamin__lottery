import {
  Box,
  Container,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import React from 'react';
import { useGetAllPrizeQuery } from '../Store/feature/prize/api';


const PrizeCard = ({ amount, name, created_at }) => {
  const cardBg = useColorModeValue("white", "gray.700");
  const cardText = useColorModeValue("gray.700", "white");

  return (
    <Box
      bg={cardBg}
      p={4}
      borderRadius="md"
      boxShadow="lg"
      transition="transform 0.2s"
      _hover={{ transform: 'scale(1.05)' }}
    >
      <Heading as="h2" size="lg" color={cardText}>
        ${parseFloat(amount).toLocaleString()}
      </Heading>
      <Text color={cardText} mt={2} isTruncated>
        {name}
      </Text> 
    </Box>
  );
};

const PrizesPage = () => {
  const  {data, isSuccess} = useGetAllPrizeQuery();
  return ( 
      <Box py={8} minHeight={'100vh'} bgGradient="linear(to-r, teal.500, green.500)">
        <Container maxW="container.xl">
          <Box textAlign="center" mb={10}>
            <Heading as="h1" size="2xl" color="white" mb={4}>
              Discover Your Winning Prize!
            </Heading>
            <Text fontSize="xl" color="whiteAlpha.800">
              Explore our exciting prizes and see what you can win!
            </Text>
          </Box>

        { isSuccess && data && data.length > 0 ?
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {data.map(prize => (
              <GridItem key={prize.id}>
                <PrizeCard {...prize} />
              </GridItem>
            ))}
          </SimpleGrid>
          :
          ''
        }
        </Container>
      </Box> 
  );
};

export default PrizesPage;
