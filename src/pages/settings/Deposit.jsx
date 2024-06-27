import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';
import DepositByCoupon from '../../components/Deposit/DepositByCoupon';
import DepositByWallet from '../../components/Deposit/DepositByWallet';
import SidebarProfileComponent from '../../components/Private/SidebarProfileComponent';
import '../../style/dashboardStyle.scss';
import '../../style/defaultPageBackground.scss';
const SettingsDeposit = () => { 
    
    return (
        <Box className='default__page__background i__1 white'>
            <Box className='dashboard__page__container'>
                <SidebarProfileComponent/>
                <Box 
                    className='content__container'
                >      
                <Box mx="auto"> 
                    <Tabs isFitted variant="enclosed-colored">
                    <TabList width={'200px'}>
                        <Tab _selected={{ color: 'white', bg: 'blue.500' }}>WALLET</Tab>
                        <Tab _selected={{ color: 'white', bg: 'blue.500' }}>COUPON</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <DepositByWallet/>
                        </TabPanel>
                        <TabPanel>  
                            <DepositByCoupon/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
                    
                </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default SettingsDeposit;