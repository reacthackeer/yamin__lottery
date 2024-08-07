import {
  Box,
  Button,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetAllPrizeQuery } from '../Store/feature/prize/api';

const LandingPage = () => {
  const navigate = useNavigate();
  const sectionBgColor = { light: 'gray.50', dark: 'gray.800' };
  const {data, isSuccess} = useGetAllPrizeQuery();
  return (
    <Box>
      {/* Intro Section */}
      <Box py={10} px={4} bgGradient="linear(to-r, teal.500, green.500)">
        <Container maxW="container.lg" textAlign="center">
          <Heading as="h1" size="2xl" color="white" mb={4}>
            Welcome to Global Lottery
          </Heading>
          <Text fontSize="xl" color="whiteAlpha.800" mb={6}>
            Your gateway to the world's most exciting lotteries!
          </Text>
          <Button 
            colorScheme="teal" 
            size="lg"
            onClick={()=> navigate('/earning/buy-a-lottery')}
          >
            Buy A Lottery
          </Button>
        </Container>
      </Box>

      {/* About Us Section */}
      <Box py={10} px={4} bg={sectionBgColor}>
        <Container maxW="container.lg">
          <VStack spacing={8} textAlign="center">
            <Heading as="h2" size="xl" mb={4}>
              About Us
            </Heading>
            <Text fontSize="lg">
              At Global Lottery, we provide access to the most exciting lotteries worldwide, bringing you closer to your dreams with every ticket.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Latest Winners Section */}
      <Box py={10} px={4} bg={sectionBgColor}>
        <Container maxW="container.lg">
          <VStack spacing={8} textAlign="center">
            <Heading as="h2" size="xl" mb={4}>
              Latest Winners
            </Heading>
            <SimpleGrid columns={[1, 2, 3]} spacing={10}>
              <WinnerCard name="Alice Johnson" prize="$50,000" />
              <WinnerCard name="Bob Smith" prize="$20,000" />
              <WinnerCard name="Charlie Brown" prize="$10,000" />
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Prize Section */}
      <Box py={10} px={4} bg={sectionBgColor}>
        <Container maxW="container.lg">
          <VStack spacing={8} textAlign="center">
            <Heading as="h2" size="xl" mb={4}>
              Prizes
            </Heading>
            <Text fontSize="lg">
              Our prize structure offers amazing rewards for winners. Each draw brings you a step closer to winning big.
            </Text>
            { isSuccess && data && data.length > 0 ?
              <SimpleGrid columns={[1, 2, 3]} spacing={10}>
                {
                  data.map((info, index) => {
                    return <PrizeCard key={index} info={info}/> 
                  })
                }
              </SimpleGrid>
              : 
              ''
            }
          </VStack>
        </Container>
      </Box>

      {/* Check Lottery Section */}
      <Box py={10} px={4} bg={sectionBgColor}>
        <Container maxW="container.lg">
          <VStack spacing={8} textAlign="center">
            <Heading as="h2" size="xl" mb={4}>
              Check Your Lottery Validity
            </Heading>
            <Text fontSize="lg">
            Enter your phone number and see if your lottery has been entered on our server.
            </Text>
            <Button 
              colorScheme="teal" 
              size="lg"
              onClick={()=> navigate('/earning/check-lottery')}
            >
              Check Now
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box py={10} px={4} bg={sectionBgColor}>
        <Container maxW="container.lg">
          <VStack spacing={8} textAlign="center">
            <Heading as="h2" size="xl" mb={4}>
              How It Works
            </Heading>
            <SimpleGrid columns={[1, 2, 3]} spacing={10}>
              <HowItWorksStep
                stepNumber="1"
                description="Buy a ticket online from our website."
              />
              <HowItWorksStep
                stepNumber="2"
                description="Wait for the draw to be held."
              />
              <HowItWorksStep
                stepNumber="3"
                description="Check the results to see if you’ve won."
              />
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Affiliate Earning Section */}
      <Box py={10} px={4} bg={sectionBgColor}>
        <Container maxW="container.lg">
          <VStack spacing={8} textAlign="center">
            <Heading as="h2" size="xl" mb={4}>
              Affiliate Earning
            </Heading>
            <Text fontSize="lg">
              Earn commissions by referring others to our lottery platform. Join our affiliate program today!
            </Text>
            <Button 
              colorScheme="teal" 
              size="lg"
              onClick={()=> navigate('/affiliate-earning')}
            >
              Join Now
            </Button>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

// Reusable component for WinnerCard
const WinnerCard = ({ name, prize }) => (
  <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg">
    <Heading fontSize="xl">{name}</Heading>
    <Text mt={4}>{prize}</Text>
  </Box>
);

// Reusable component for PrizeCard
const PrizeCard = ({ info }) => (
  <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg">
    <Heading fontSize="xl">Prize Amount</Heading>
    <Text mt={4}>${parseFloat(info.amount).toLocaleString()}</Text>
  </Box>
);

// Reusable component for HowItWorksStep
const HowItWorksStep = ({ stepNumber, description }) => (
  <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg">
    <Heading fontSize="2xl" mb={2}>Step {stepNumber}</Heading>
    <Text>{description}</Text>
  </Box>
);

export default LandingPage;
