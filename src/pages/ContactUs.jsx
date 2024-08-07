import {
  Box,
  Button,
  ChakraProvider,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  IconButton,
  Input,
  Textarea,
  VStack,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaEnvelope, FaFacebook, FaYoutube } from 'react-icons/fa';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct mailto link
    const mailtoLink = `mailto:teeencard@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=Name:%20${encodeURIComponent(
      formData.name
    )}%0AEmail:%20${encodeURIComponent(formData.email)}%0APhone:%20${encodeURIComponent(
      formData.phone
    )}%0AMessage:%20${encodeURIComponent(formData.message)}`;

    // Open mailto link
    window.location.href = mailtoLink;

    toast({
      title: "Opening Email Client",
      description: "Redirecting to your default email client...",
      status: "info",
      duration: 5000,
      isClosable: true
    });

    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const formBg = useColorModeValue("white", "gray.700");
  const buttonBg = useColorModeValue("teal.500", "teal.300");

  return (
    <ChakraProvider>
      <Box py={8} bgGradient="linear(to-r, teal.500, green.500)">
        <Container maxW="container.md">
          <Box textAlign="center" mb={10}>
            <Heading as="h1" size="2xl" color="white" mb={4}>
              Contact Us
            </Heading>
            <Heading as="h2" size="lg" color="whiteAlpha.800" fontWeight="normal">
              We'd love to hear from you!
            </Heading>
          </Box>

          <Box bg={formBg} p={8} borderRadius="md" boxShadow="lg">
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl id="name" isRequired>
                  <FormLabel>Your Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel>Your Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="phone" isRequired>
                  <FormLabel>Your Phone Number</FormLabel>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="subject" isRequired>
                  <FormLabel>Subject</FormLabel>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="message" isRequired>
                  <FormLabel>Your Message</FormLabel>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </FormControl>
                <Button
                  type="submit"
                  colorScheme="teal"
                  bg={buttonBg}
                  size="lg"
                  w="full"
                >
                  Send Message
                </Button>
              </VStack>
            </form>
          </Box>

          <Box textAlign="center" mt={10}>
            <HStack justify="center" spacing={8}>
              <IconButton
                as="a"
                href="https://facebook.com/globallotterry" // Replace with your Facebook link
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                icon={<FaFacebook />}
                colorScheme="facebook"
                variant="outline"
                size="lg"
              />
              <IconButton
                as="a"
                href="https://youtube.com/@globallotto" // Replace with your YouTube link
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                icon={<FaYoutube />}
                colorScheme="red"
                variant="outline"
                size="lg"
              />
              <IconButton
                as="a"
                href="mailto:teeencard@gmail.com" // Replace with your email link
                aria-label="Email"
                icon={<FaEnvelope />}
                colorScheme="blue"
                variant="outline"
                size="lg"
              />
            </HStack>
          </Box>
        </Container>
      </Box>
    </ChakraProvider>
  );
};

export default ContactUsPage;
