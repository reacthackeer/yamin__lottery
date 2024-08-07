import {
    Box,
    Container,
    Heading,
    Icon,
    SimpleGrid,
    Stack,
    Text,
    VStack,
    useColorModeValue
} from '@chakra-ui/react';
import React from 'react';
import { FaDollarSign, FaMoneyBillWave, FaPercent, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AffiliateEarningPage = () => {
  const sectionBgColor = useColorModeValue('gray.50', 'gray.800');
  const iconColor = useColorModeValue('teal.500', 'teal.300');
  const bgColor = useColorModeValue("white", "gray.800");
  const navigate = useNavigate();
  return (
    <Box>
      <Box py={10} px={4} bgGradient="linear(to-r, teal.500, green.500)">
        <Container maxW="container.lg" textAlign="center">
          <Heading as="h1" size="2xl" color="white" mb={4}>
            Affiliate Earnings
          </Heading>
          <Text fontSize="xl" color="whiteAlpha.800" mb={6}>
            Discover how you can earn commissions by promoting our lottery.
          </Text>
        </Container>
      </Box>

      <Box py={10} px={4} bg={sectionBgColor}>
        <Container maxW="container.lg">
          <VStack spacing={8} textAlign="center">
            <Heading as="h2" size="xl" mb={4}>
              Earning Details
            </Heading>
            <SimpleGrid columns={[1, 1, 2, 2]} spacing={10}>
              <EarningDetail
                title="$0.043 per Lottery Sale"
                description="Earn a commission of $0.043 on every lottery ticket sold through your affiliate link."
                icon={FaDollarSign}
                iconColor={iconColor}
              />
              <EarningDetail
                title="5% of Winner's Prize"
                description="Receive a 5% commission from the prize of each winner you referred."
                icon={FaPercent}
                iconColor={iconColor}
              />
              <EarningDetail
                title="Monthly Lottery of $3,000"
                description="Participate in a monthly lottery of $3,000 shared among top sellers."
                icon={FaMoneyBillWave}
                iconColor={iconColor}
              />
              <EarningDetail
                title="Lottery Price: $0.26"
                description="Promote lotteries with an attractive price point of just $0.26 per ticket."
                icon={FaUsers}
                iconColor={iconColor}
              />
            </SimpleGrid>
            <Stack direction={['column', 'row']} spacing={4} mt={10}> 
                <Box
                  as="button"
                  height="40px"
                  lineHeight="1.2"
                  transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                  border="1px"
                  px="8px"
                  borderRadius="2px"
                  fontSize="14px"
                  fontWeight="semibold"
                  bg={bgColor}
                  borderColor={iconColor}
                  color={iconColor}
                  _hover={{ bg: iconColor, color: 'white' }}
                  onClick={()=> navigate('/earning/become-a-seller')}
                >
                  Join Now
                </Box> 
            </Stack>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

// Reusable component for EarningDetail
const EarningDetail = ({ title, description, icon, iconColor }) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.200");

  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg={cardBg}>
      <Box mb={4} textAlign="center">
        <Icon as={icon} w={12} h={12} color={iconColor} />
      </Box>
      <Heading fontSize="lg" mb={2} color={textColor}>
        {title}
      </Heading>
      <Text color={textColor}>{description}</Text>
    </Box>
  );
};

export default AffiliateEarningPage;
