// src/components/LandingPage.jsx
import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  VStack
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";


const LandingPage = () => {
  // Countdown Timer
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const drawDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1); // Next day
      const diff = drawDate - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Check Lottery
  const [ticketNumber, setTicketNumber] = useState("");

  const checkTicket = () => {
    // Replace this alert with actual logic for checking the ticket
    alert(`Checking ticket: ${ticketNumber}`);
  };

  // Check Seller
  const [sellerID, setSellerID] = useState("");

  const checkSeller = () => {
    // Replace this alert with actual logic for checking the seller
    alert(`Checking seller: ${sellerID}`);
  };

  return ( 
      <Box as="main" w="100%">
        {/* Intro Section */}
        <Box
          w="100%"
          h="100vh"
          bg="teal.500"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
        >
          <Box textAlign="center">
            <Heading>Welcome to the Grand Lottery!</Heading>
            <Text mt={4} fontSize="xl">
              Join us and stand a chance to win amazing prizes every day.
            </Text>
          </Box>
        </Box>

        {/* Draw Countdown Section */}
        <Box
          w="100%"
          h="100vh"
          bg="purple.500"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
        >
          <Box textAlign="center">
            <Heading>Next Draw Countdown</Heading>
            <Text fontSize="3xl" mt={4}>
              {timeLeft}
            </Text>
          </Box>
        </Box>

        {/* How It Works Section */}
        <Box
          w="100%"
          h="100vh"
          bg="green.500"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
        >
          <VStack spacing={8} textAlign="center">
            <Heading>How It Works</Heading>
            <Text fontSize="lg">
              1. Buy a lottery ticket from our authorized sellers.
            </Text>
            <Text fontSize="lg">
              2. Await the daily draw to see if you are a winner.
            </Text>
            <Text fontSize="lg">
              3. Check the results and claim your prize.
            </Text>
          </VStack>
        </Box>

        {/* Check Lottery Section */}
        <Box
          w="100%"
          h="100vh"
          bg="blue.500"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
        >
          <VStack spacing={4} textAlign="center">
            <Heading>Check Your Lottery Ticket</Heading>
            <Text fontSize="lg">
              Enter your ticket number below to see if you’ve won.
            </Text>
            <Input
              placeholder="Enter your ticket number"
              value={ticketNumber}
              onChange={(e) => setTicketNumber(e.target.value)}
              bg="white"
              color="black"
              maxW="400px"
            />
            <Button colorScheme="whiteAlpha" onClick={checkTicket}>
              Check Ticket
            </Button>
          </VStack>
        </Box>

        {/* Check Seller Section */}
        <Box
          w="100%"
          h="100vh"
          bg="orange.500"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
        >
          <VStack spacing={4} textAlign="center">
            <Heading>Verify Seller Information</Heading>
            <Text fontSize="lg">
              Enter the seller ID to verify their authorization status.
            </Text>
            <Input
              placeholder="Enter seller ID"
              value={sellerID}
              onChange={(e) => setSellerID(e.target.value)}
              bg="white"
              color="black"
              maxW="400px"
            />
            <Button colorScheme="whiteAlpha" onClick={checkSeller}>
              Check Seller
            </Button>
          </VStack>
        </Box>

        {/* Prizes Section */}
        <Box
          w="100%"
          h="100vh"
          bg="red.500"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
        >
          <VStack spacing={8} textAlign="center">
            <Heading>Prizes to be Won</Heading>
            <Text fontSize="lg">1st Prize: $1,000,000</Text>
            <Text fontSize="lg">2nd Prize: $100,000</Text>
            <Text fontSize="lg">3rd Prize: $10,000</Text>
            <Text fontSize="lg">Plus many more exciting prizes!</Text>
          </VStack>
        </Box>

        {/* Footer Section */}
        <Box
          w="100%"
          h="100vh"
          bg="gray.800"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
        >
          <Text>© 2024 Grand Lottery Company. All rights reserved.</Text>
        </Box>
      </Box> 
  );
};

export default LandingPage;
