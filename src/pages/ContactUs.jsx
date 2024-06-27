// src/components/ContactUs.js
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Text,
    Textarea,
    VStack,
    useToast,
} from "@chakra-ui/react";
import React from "react";

const ContactUs = () => {
  const toast = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Simulate form submission
    toast({
      title: "Message sent.",
      description: "We've received your message and will get back to you soon.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box
      p={[4, 8]}
      bg="gray.100"
      borderRadius="md"
      boxShadow="lg"
      maxW="600px"
      mx="auto"
      mt={[4, 8]}
    >
      <Heading as="h1" mb={6} textAlign="center">
        Contact Us
      </Heading>
      <Text mb={4} textAlign="center">
        We would love to hear from you!
      </Text>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input placeholder="Your name" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Your email" />
          </FormControl>
          <FormControl>
            <FormLabel>Message</FormLabel>
            <Textarea placeholder="Your message" />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full">
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default ContactUs;
