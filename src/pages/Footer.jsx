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
import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaFacebook, FaMapMarkerAlt, FaYoutube } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useSubsCribeChannelMutation } from '../Store/feature/prize/api';

const Footer = () => {
    const [provideEmailObject, {isSuccess, data}]  = useSubsCribeChannelMutation();
    const [email, setEmail] = useState('');
    const handleSubscribeEmail = (e) => {
        e.preventDefault();
        if(email){
            provideEmailObject({email})
        }
    }

    useEffect(()=>{ 
        if(isSuccess){
            document.getElementById('subscribe__email').value=''
        }
    },[data, isSuccess])
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
            <Link to="/affiliate-earning" style={{ textDecoration: 'none', color: 'gray.200' }}>
                Affiliate Earning
            </Link>
            <Link to="/draw" style={{ textDecoration: 'none', color: 'gray.200' }}>
                Draw And Check Our System
            </Link>
            <Link to="/about-us" style={{ textDecoration: 'none', color: 'gray.200' }}>
            About Us
            </Link>
            <Link to="/contact-us" style={{ textDecoration: 'none', color: 'gray.200' }}>
            Contact Us
            </Link>
        </VStack>

        {/* Contact Information */}
        <VStack align={{ base: "center", md: "flex-start" }} spacing={2} mb={{ base: 8, md: 0 }}>
            <Heading size="sm" color="white">Contact Us</Heading>
            <HStack> 
            </HStack>
            <HStack>
            <Icon as={FaEnvelope} />
            <Text>teencard@gmail.com</Text>
            </HStack>
            <HStack>
            <Icon as={FaMapMarkerAlt} />
            <VStack>
                <Text>4501 15th Ave S #108, Fargo,</Text>
                <Text>ND 58103, United States</Text>
            </VStack>
            </HStack>
        </VStack>

        {/* Social Media Links */}
        <VStack align={{ base: "center", md: "flex-start" }} spacing={2}>
            <Heading size="sm" color="white">Follow Us</Heading>
            <HStack spacing={4}>
            <Link to="https://facebook.com/globallotterry" target='_blank' style={{ color: 'gray.200' }}><Icon as={FaFacebook} boxSize={6} /></Link>
            <Link to="https://youtube.com/@globallotto" target='_blank' style={{ color: 'gray.200' }}><Icon as={FaYoutube} boxSize={6} /></Link>
            <Link to="mailto:teeencard@gmail.com" target='_blank' style={{ color: 'gray.200' }}><Icon as={MdEmail} boxSize={6} /></Link> 
            </HStack>
        </VStack>
        </Flex>

        <Divider my={8} borderColor="gray.600" />

        <Stack direction={{ base: "column", md: "row" }} justify="space-between" align="center">
        {/* Newsletter Signup */}
        <VStack align={{ base: "center", md: "flex-start" }} spacing={4}>
            <Heading size="sm" color="white">Newsletter Signup</Heading>
            <form onSubmit={handleSubscribeEmail}>
                <Flex direction={{ base: "column", md: "row" }} w="full" maxW="md">
                    
                    <Input 
                        isRequired
                        placeholder="Your email address" 
                        id='subscribe__email'
                        type='email'
                        name='email'
                        mb={{ base: 2, md: 0 }} 
                        mr={{ md: 2 }} 
                        onChange={(e)=> setEmail(e.target.value)}
                    />
                    <Button colorScheme="blue" type='submit'>Subscribe</Button>
                    
                </Flex>
            </form>
        </VStack>

        {/* Legal Information */}
        <HStack spacing={4} mt={{ base: 4, md: 0 }}>
            <Link to="/privacy-policy" style={{ textDecoration: 'none', color: 'gray.200' }}>Privacy Policy</Link>
            <Link to="/terms-and-condition" style={{ textDecoration: 'none', color: 'gray.200' }}>Terms of Service</Link>
            <Link to="/refund-policy" style={{ textDecoration: 'none', color: 'gray.200' }}>Refund Policy</Link>
        </HStack>
        </Stack>
    </Container>
    </Box>
);
};

export default Footer;
