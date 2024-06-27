import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';

const DashBoardContainer = ({dashboardResult}) => { 
    const {realBalance} = useSelector((state)=> state.auth.auth);
    return (
        <Box className='dashboard__container__items'>
            <Box className='single__result__item'>
                <Text className='text__intro'>Total Users</Text>
                <Heading>{dashboardResult.totalUsers}</Heading>
            </Box>
            <Box className='single__result__item'>
                <Text className='text__intro'>Total Earning</Text>
                <Heading>{Number(dashboardResult.totalEarning).toFixed(2)} $</Heading>
            </Box>
            <Box className='single__result__item'>
                <Text className='text__intro'>Total Deposit</Text>
                <Heading>{Number(dashboardResult.totalDeposit).toFixed(2)} $</Heading>
            </Box>
            <Box className='single__result__item'>
                <Text className='text__intro'>Total Withdrawal</Text>
                <Heading>{Number(dashboardResult.totalWithdrawal).toFixed(2)} $</Heading>
            </Box>
            <Box className='single__result__item'>
                <Text className='text__intro'>Total Transfer</Text>
                <Heading>{Number(dashboardResult.totalTransfer).toFixed(2)} $</Heading>
            </Box>
            <Box className='single__result__item'>
                <Text className='text__intro'>Total Lottery</Text>
                <Heading>{Number(dashboardResult.totalLottery)}</Heading>
            </Box>
            <Box className='single__result__item'>
                <Text className='text__intro'>Total Win</Text>
                <Heading>{Number(dashboardResult.totalWin)}</Heading>
            </Box>
            <Box className='single__result__item'>
                <Text className='text__intro'>Total Invest</Text>
                <Heading>{Number(dashboardResult.totalInvest).toFixed(2)} $</Heading>
            </Box>
            <Box className='single__result__item'>
                <Text className='text__intro'>Total Invest Pending</Text>
                <Heading>{Number(dashboardResult.totalInvestPending).toFixed(2)} $</Heading>
            </Box>
            <Box className='single__result__item'>
                <Text className='text__intro'>Total Invest Profit</Text>
                <Heading>{Number(dashboardResult.totalInvestProfit).toFixed(2)} $</Heading>
            </Box>
            <Box className='single__result__item'>
                <Text className='text__intro'>Total Balance</Text>
                <Heading>{Number(dashboardResult.totalBalance).toFixed(2)} $</Heading>
            </Box>
            <Box className='single__result__item'>
                <Text className='text__intro'>Real Balance</Text>
                <Heading>{Number(realBalance).toFixed(2)} $</Heading>
            </Box>
            <Box className='single__result__item'>
                <Text className='text__intro'>Total In</Text>
                <Heading>{Number(dashboardResult.totalIn).toFixed(2)} $</Heading>
            </Box>
            <Box className='single__result__item'>
                <Text className='text__intro'>Total Out</Text>
                <Heading>{Number(dashboardResult.totalOut).toFixed(2)} $</Heading>
            </Box> 
        </Box>
    );
};

export default DashBoardContainer;