import { Box, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import SidebarProfileComponent from '../../components/Private/SidebarProfileComponent';
import ShowInformationContainer from '../../components/Transfer/ShowInformation';
import UpdateInformationContainer from '../../components/Transfer/UpdateInformation';
import '../../style/dashboardStyle.scss';
import '../../style/defaultPageBackground.scss';
const SettingsTransfer = () => { 
    const [informationResult, setInformationResult] = useState({
        user_id: `339939362936`, 
        email: 'dearvayu@gmail.com',
        amount: '50 USDT',
        remark: 'lottery deposit',  
    });
    const [showUpdateFrom, setShowUpdateForm] = useState(true);
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
                            colorScheme={showUpdateFrom === false ? 'blue' : 'red'}
                            onClick={()=> setShowUpdateForm(()=> !showUpdateFrom)}
                        >{showUpdateFrom === false ? 'Update' : 'Cancel'}</Button>
                    </Box>  
                </Box>
            </Box>
        </Box>
    );
};

export default SettingsTransfer;