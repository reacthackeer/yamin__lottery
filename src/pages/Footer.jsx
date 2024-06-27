// src/Footer.js
import {
    Box,
    Button,
    Container,
    Divider,
    Flex,
    HStack,
    Heading,
    Icon, Input,
    Stack,
    Text, VStack
} from '@chakra-ui/react';
import React from 'react';
import { FaEnvelope, FaFacebook, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
return (
    <Box bg="gray.900" color="gray.200" py={{ base: 10, md: 16 }}>
    <Container maxW="container.lg">
        <Flex direction={{ base: "column", md: "row" }} justify="space-between" mb={{ base: 10, md: 16 }}>
        {/* Company Info */}
        <VStack align={{ base: "center", md: "flex-start" }} spacing={4} mb={{ base: 8, md: 0 }}>
            <Heading size="md" color="white">Lottery Company</Heading>
            <Text textAlign={{ base: "center", md: "left" }} fontSize="sm">
            Welcome to our lottery website. Your dreams are just a ticket away!
            </Text>
        </VStack>

        {/* Navigation Links */}
        <VStack align={{ base: "center", md: "flex-start" }} spacing={2} mb={{ base: 8, md: 0 }}>
            <Heading size="sm" color="white">Quick Links</Heading>
            <Link to="/" style={{ textDecoration: 'none', color: 'gray.200' }}>
            Home
            </Link>
            <Link to="/how-to-play" style={{ textDecoration: 'none', color: 'gray.200' }}>
            How to Play
            </Link>
            <Link to="/results" style={{ textDecoration: 'none', color: 'gray.200' }}>
            Results
            </Link>
            <Link to="/about" style={{ textDecoration: 'none', color: 'gray.200' }}>
            About Us
            </Link>
            <Link to="/contact" style={{ textDecoration: 'none', color: 'gray.200' }}>
            Contact Us
            </Link>
        </VStack>

        {/* Contact Information */}
        <VStack align={{ base: "center", md: "flex-start" }} spacing={2} mb={{ base: 8, md: 0 }}>
            <Heading size="sm" color="white">Contact Us</Heading>
            <HStack>
            <Icon as={FaPhoneAlt} />
            <Text>+123-456-7890</Text>
            </HStack>
            <HStack>
            <Icon as={FaEnvelope} />
            <Text>support@lottery.com</Text>
            </HStack>
            <HStack>
            <Icon as={FaMapMarkerAlt} />
            <Text>123 Lottery St, Winning City, WC 12345</Text>
            </HStack>
        </VStack>

        {/* Social Media Links */}
        <VStack align={{ base: "center", md: "flex-start" }} spacing={2}>
            <Heading size="sm" color="white">Follow Us</Heading>
            <HStack spacing={4}>
            <Link to="#" style={{ color: 'gray.200' }}><Icon as={FaFacebook} boxSize={6} /></Link>
            <Link to="#" style={{ color: 'gray.200' }}><Icon as={FaTwitter} boxSize={6} /></Link>
            <Link to="#" style={{ color: 'gray.200' }}><Icon as={FaInstagram} boxSize={6} /></Link>
            <Link to="#" style={{ color: 'gray.200' }}><Icon as={FaLinkedin} boxSize={6} /></Link>
            </HStack>
        </VStack>
        </Flex>

        <Divider my={8} borderColor="gray.600" />

        <Stack direction={{ base: "column", md: "row" }} justify="space-between" align="center">
        {/* Newsletter Signup */}
        <VStack align={{ base: "center", md: "flex-start" }} spacing={4}>
            <Heading size="sm" color="white">Newsletter Signup</Heading>
            <Flex direction={{ base: "column", md: "row" }} w="full" maxW="md">
            <Input placeholder="Your email address" mb={{ base: 2, md: 0 }} mr={{ md: 2 }} />
            <Button colorScheme="blue">Subscribe</Button>
            </Flex>
        </VStack>

        {/* Legal Information */}
        <HStack spacing={4} mt={{ base: 4, md: 0 }}>
            <Link to="/privacy-policy" style={{ textDecoration: 'none', color: 'gray.200' }}>Privacy Policy</Link>
            <Link to="/terms-of-service" style={{ textDecoration: 'none', color: 'gray.200' }}>Terms of Service</Link>
        </HStack>
        </Stack>
    </Container>
    </Box>
);
};

export default Footer;
