import {
    Box,
    ChakraProvider,
    Container,
    Divider,
    HStack,
    Heading,
    Icon,
    SimpleGrid,
    Text,
    VStack,
    useColorModeValue
} from '@chakra-ui/react';
import React from 'react';
import { FaGift, FaRegCheckCircle, FaRegCreditCard, FaTicketAlt } from 'react-icons/fa';

const steps = [
{
    icon: FaRegCreditCard,
    title: 'Step 1: Purchase Tickets',
    description: 'Choose your preferred lottery, select your numbers or let the system randomly select for you, and complete your purchase using our secure payment options.'
},
{
    icon: FaTicketAlt,
    title: 'Step 2: Wait for the Draw',
    description: 'After purchasing your ticket, wait for the draw date. You can view your ticket details in your account at any time.'
},
{
    icon: FaRegCheckCircle,
    title: 'Step 3: Check Results',
    description: 'Results are posted shortly after the draw. Check your numbers against the winning numbers to see if you have won.'
},
{
    icon: FaGift,
    title: 'Step 4: Claim Your Prize',
    description: 'If you win, follow the instructions to claim your prize. Smaller prizes are automatically credited to your account; larger prizes may require additional verification.'
}
];

const HowToPlayPage = () => {
const bgColor = useColorModeValue("white", "gray.800");
const textColor = useColorModeValue("gray.800", "gray.200");
const stepBg = useColorModeValue("gray.50", "gray.700");

return (
    <ChakraProvider>
    <Box py={10} px={4} bgGradient="linear(to-r, teal.500, green.500)">
        <Container maxW="container.md" textAlign="center">
        <Heading as="h1" size="2xl" color="white" mb={4}>
            How to Play
        </Heading>
        <Text fontSize="xl" color="whiteAlpha.800">
            Follow these simple steps to participate in our lottery.
        </Text>
        </Container>
    </Box>

    <Box py={10} bg={bgColor}>
        <Container maxW="container.md">
        <VStack spacing={8} textAlign="center">
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} alignItems="start">
            {steps.map((step) => (
                <HStack
                key={step.title}
                p={5}
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="md"
                bg={stepBg}
                spacing={4}
                alignItems="start"
                >
                <Icon as={step.icon} w={10} h={10} color="teal.500" />
                <VStack align="start">
                    <Heading as="h3" size="md">
                    {step.title}
                    </Heading>
                    <Text fontSize="sm" color={textColor}>
                    {step.description}
                    </Text>
                </VStack>
                </HStack>
            ))}
            </SimpleGrid>

            <Divider />

            <Box>
            <Heading as="h2" size="lg" mb={4}>
                Tips for Playing
            </Heading>
            <VStack spacing={4}>
                <Text fontSize="md" color={textColor}>
                - Always double-check your ticket numbers before and after the draw.
                </Text>
                <Text fontSize="md" color={textColor}>
                - Keep your ticket information secure.
                </Text>
                <Text fontSize="md" color={textColor}>
                - Follow all instructions carefully when claiming prizes.
                </Text>
                <Text fontSize="md" color={textColor}>
                - Contact our support team if you have any questions.
                </Text>
            </VStack>
            </Box>

            <Divider />

            <Box>
            <Heading as="h2" size="lg" mb={4}>
                Ready to Play?
            </Heading>
            <Text fontSize="md" color={textColor}>
                Visit our <a href="/earning/buy-a-lottery" style={{ color: "teal" }}>lottery page</a> to get started!
            </Text>
            </Box>
        </VStack>
        </Container>
    </Box>
    </ChakraProvider>
);
};

export default HowToPlayPage;
