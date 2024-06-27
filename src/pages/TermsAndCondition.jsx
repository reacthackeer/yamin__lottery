// src/TermsAndCondition.js
import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { useLocation } from 'react-router-dom';

const TermsAndCondition = () => {
    const location = useLocation();

    return (
        <Box minH="100vh" display="flex" flexDirection="column" p={4}>
            <Box maxW="container.lg" mx="auto" flex="1">
                <Heading mb={8}>Terms and Conditions</Heading>
                <Text mb={4}>
                    Welcome! Here are the terms and conditions for using our lottery website and mobile applications.
                </Text>

                <Heading size="lg" mb={4}>Terms of Use:</Heading>
                <Text mb={4}>
                    To use our website, you must be 18 years or older.
                </Text>
                <Text mb={4}>
                    If you are involved in any fraudulent or prohibited activities, you are not allowed to use this website.
                </Text>

                <Heading size="lg" mb={4}>Lottery Winner Selection:</Heading>
                <Text mb={4}>
                    We select winners through a computer program. We usually select 50 winners. If the amount collected exceeds the prize value, we count the next 20 people as winners.
                </Text>
                <Text mb={4}>
                    Our lottery draw is open for public viewing. Any visitor can check our draw system at any time. We conduct our draws live on YouTube, so all participants can watch.
                </Text>

                <Heading size="lg" mb={4}>Prize Distribution:</Heading>
                <Text mb={4}>
                    We stop selling lottery tickets at 11:30 PM. After calculating the collected amount, we purchase the prizes and conduct the draw at 11:59 PM. Prizes are purchased starting from the lowest price to the highest, using the collected amount. The first name drawn receives the most valuable prize, and prizes are distributed accordingly.
                </Text>
                <Text mb={4}>
                    We record a video of each winner’s name, address, and identification and publish it on YouTube and Facebook. Without video recording, we do not award any prizes. After recording, we send the prizes or prize money to the winners' addresses, via mobile banking, or bank transfer.
                </Text>

                <Heading size="lg" mb={4}>Our Charges:</Heading>
                <Text mb={4}>
                    We charge 10 out of 30 units of the lottery price, which covers promotion, development, website, apps, server charges, employee salaries, leaflet distribution, and poster distribution.
                </Text>

                <Heading size="lg" mb={4}>Login Information:</Heading>
                <Text mb={4}>
                    To use our website, you must provide a card and password to securely protect your personal login information.
                </Text>

                <Heading size="lg" mb={4}>Security and Privacy:</Heading>
                <Text mb={4}>
                    We do not share your personal information with any third party.
                </Text>
            </Box>
        </Box>
    );
};

export default TermsAndCondition;

