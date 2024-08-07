// src/Intro.js
import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react';
import React from 'react';

const Intro = () => {
  return (
    <Box
      bg="teal.500"
      color="white"
      py={10}
      px={6}
      textAlign="center"
      borderRadius="md"
      boxShadow="xl"
    >
      <Stack spacing={5}>
        <Heading as="h1" size="2xl">
          Welcome to Global Lottery!
        </Heading>
        <Text fontSize="xl">
          Join millions of players worldwide and stand a chance to win big! 
          Whether you're buying tickets or becoming a seller, our platform offers the best lottery experience.
        </Text>
        <Button
          colorScheme="yellow"
          size="lg"
          onClick={() => alert('Redirecting to Buy Now')}
        >
          Buy Now
        </Button>
      </Stack>
    </Box>
  );
};

export default Intro;
