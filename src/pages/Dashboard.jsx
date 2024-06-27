import { Box } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useGetSingleDashboardInfoQuery } from '../Store/feature/auth/api';
import SidebarProfileComponent from '../components/Private/SidebarProfileComponent';
import DashBoardContainer from '../components/dashboard/DashBoardContainer';
import '../style/dashboardStyle.scss';
import '../style/defaultPageBackground.scss';
const Dashboard = () => { 
    
    const {userId} = useSelector((state)=> state.auth.auth);
    const {data, isSuccess} = useGetSingleDashboardInfoQuery(userId);
    
    return (
        <Box className='default__page__background i__1 white'>
            <Box className='dashboard__page__container'>
                <SidebarProfileComponent/>
                <Box 
                    className='content__container'
                >    
                    {isSuccess && data && data?.id  ? <DashBoardContainer dashboardResult={data}/> : ''}
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;