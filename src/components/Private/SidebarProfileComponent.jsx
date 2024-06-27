import { Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import AccountLinkBar from '../dashboard/AccountLinkBar';
import DashboardSideBar from '../dashboard/DashboardSideBar';
import EarningLinkBar from '../dashboard/EarningLinkBar';
import HistoryLinkBar from '../dashboard/HistoryLinkBar';
import SettingsLinkBar from '../dashboard/SettingsLinkBar';

const SidebarProfileComponent = () => {
    const [sidebarType, setSidebarType] = useState('');
    return (
        <Box 
            className='profile__container'
        >  
            <DashboardSideBar sidebarType={sidebarType} setSidebarType={setSidebarType}/>
            {sidebarType === 'account' && <AccountLinkBar/>}
            {sidebarType === 'history' && <HistoryLinkBar/>}
            {sidebarType === 'earning' && <EarningLinkBar/>}
            {sidebarType === 'settings' && <SettingsLinkBar/>}
        </Box>
    );
};

export default SidebarProfileComponent;