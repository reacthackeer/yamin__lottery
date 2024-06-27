import { Box } from '@chakra-ui/react';
import React from 'react';
import EditDepositByWallet from '../../components/Deposit/EditDepositByWallet';
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
                    <EditDepositByWallet/> 
                </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default SettingsDeposit;