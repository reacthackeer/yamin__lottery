import {
  Box,
  ChakraProvider,
  Container,
  Divider,
  Heading,
  Text,
  VStack,
  useColorModeValue
} from '@chakra-ui/react';
import React from 'react';

const AboutUsPage = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.200");

  return (
    <ChakraProvider>
      <Box py={10} px={4} bgGradient="linear(to-r, teal.500, green.500)">
        <Container maxW="container.md" textAlign="center">
          <Heading as="h1" size="2xl" color="white" mb={4}>
            About Us
          </Heading>
          <Text fontSize="xl" color="whiteAlpha.800">
            Welcome to Global Lottery! We are a leading global platform for lottery enthusiasts.
          </Text>
        </Container>
      </Box>

      <Box py={10} bg={bgColor}>
        <Container maxW="container.md">
          <VStack spacing={8} textAlign="center">
            <Box>
              <Heading as="h2" size="lg" mb={4}>
                Our Mission
              </Heading>
              <Text fontSize="md" color={textColor}>
                Our mission is to provide a safe, transparent, and enjoyable lottery experience to players around the world.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="lg" mb={4}>
                Our History
              </Heading>
              <Text fontSize="md" color={textColor}>
                Since our founding, we have aimed to revolutionize the lottery industry by bringing transparency and trust to our players. We are proud to have built a global community of satisfied lottery enthusiasts.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="lg" mb={4}>
                Contact Us
              </Heading>
              <Text fontSize="md" color={textColor}>
                For any inquiries or further information, please <a href="/contact-us" style={{ color: "teal" }}>contact us</a>.
              </Text>
            </Box>
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default AboutUsPage;
