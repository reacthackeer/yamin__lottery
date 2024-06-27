import { Box, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetSingleInfoQuery } from '../../Store/feature/auth/api';
import ShowInformationContainer from '../../components/Information/ShowInformation';
import UpdateInformationContainer from '../../components/Information/UpdateInformation';
import SidebarProfileComponent from '../../components/Private/SidebarProfileComponent';
import '../../style/dashboardStyle.scss';
import '../../style/defaultPageBackground.scss';
const Dashboard = () => { 
    const {userId} = useSelector((state)=> state.auth.auth);
    const [informationResult, setInformationResult] = useState({});
    const {data, isSuccess} = useGetSingleInfoQuery(userId);
    const [showUpdateFrom, setShowUpdateForm] = useState(false);
    useEffect(()=>{
        if(isSuccess && data && data.id){
            setInformationResult(()=> data) 
        }
    },[data,isSuccess])
    return (
        <Box className='default__page__background i__1 white'>
            <Box className='dashboard__page__container'>
                <SidebarProfileComponent/>
                <Box 
                    className='content__container'
                >      
                    {showUpdateFrom === false && <ShowInformationContainer 
                                                    informationResult={informationResult}
                                                />}
                    {showUpdateFrom === true && <UpdateInformationContainer 
                                                    informationResult={informationResult}
                                                    setInformationResult={setInformationResult}
                                                    showUpdateFrom={showUpdateFrom}
                                                    setShowUpdateForm={setShowUpdateForm}
                                                />}
                    <Box
                        display={'flex'}
                        justifyContent={'flex-end'}
                        
                    >
                        <Button 
                            isDisabled={true}
                            colorScheme={showUpdateFrom === false ? 'blue' : 'red'}
                            onClick={()=> setShowUpdateForm(()=> !showUpdateFrom)}
                        >{showUpdateFrom === false ? 'Update' : 'Cancel'}</Button>
                    </Box>  
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;