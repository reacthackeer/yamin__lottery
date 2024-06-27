// src/RefundPolicy.js
import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

const RefundPolicy = () => {
    return (
        <Box minH="100vh" p={4} display="flex" flexDirection="column">
            <Box maxW="container.lg" mx="auto" flex="1">
                <Heading mb={8}>Refund Policy</Heading>

                <Text mb={4}>
                    **1.1)** You can request a refund within a maximum of 7 hours of purchasing the lottery. If you request a refund within 7 hours of purchase, 90% of your money will be refunded unconditionally. After 7 hours have passed since purchasing the lottery, you cannot request a refund for the lottery money.
                </Text>

                <Text mb={4}>
                    **1.2)** Refunds will not be done directly via cash transactions. You can use your preferred payment channel from our platform for payments, and we will try to refund through the same channel you used for payment. Any service charge applicable through the respective channel must be borne by the customer.
                </Text>

                <Text mb={4}>
                    **1.3)** You can request a refund directly from our website. After a refund request is successfully processed and approved by the lottery authority, the money will be refunded to the same channel used for payment within a maximum of 7 to 10 hours. The user will be informed via confirmation email. Any service charge applicable during the refund must be borne by the customer.
                </Text>

                <Text mb={4}>
                    **1.4)** Once your lottery money refund request is successful, you will lose all rights to the lottery and will not be able to log in or purchase lotteries on our platform.
                </Text>

                <Text mb={4}>
                    **1.5)** Please review the lottery curriculum before purchasing. Otherwise, no refund request will be accepted due to complaints about the lottery curriculum after purchasing. Requests such as "I didn't see this section on the website, didn't read it properly, didn't have time, missed it" will not be acceptable.
                </Text>
            </Box>
        </Box>
    );
};

export default RefundPolicy;
