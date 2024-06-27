import { Box } from '@chakra-ui/react';
import React from 'react';
import SidebarProfileComponent from '../../components/Private/SidebarProfileComponent';
import '../../style/dashboardStyle.scss';
import '../../style/defaultPageBackground.scss';
const SettingsUpdatePassword = () => { 
    
    return (
        <Box className='default__page__background i__1 white'>
            <Box className='dashboard__page__container'>
                <SidebarProfileComponent/>
                <Box 
                    className='content__container' 
                >       
                </Box>
            </Box>
        </Box>
    );
};

export default SettingsUpdatePassword;