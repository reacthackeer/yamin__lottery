import { Box, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetSingleAddressQuery } from '../../Store/feature/auth/api';
import ShowInformationContainer from '../../components/Address/ShowInformation';
import UpdateAddressComponents from '../../components/Address/UpdateAddress';
import SidebarProfileComponent from '../../components/Private/SidebarProfileComponent';
import '../../style/dashboardStyle.scss';
import '../../style/defaultPageBackground.scss';
const AccountAddress = () => { 
    const {userId} = useSelector((state)=> state.auth.auth);
    const {data, isLoading, isError, isSuccess, error} = useGetSingleAddressQuery(userId);
    const [informationResult, setInformationResult] = useState({
        country: ``,
        division: '',
        district: '',
        address__line__3: '',
        address__line__2: '',
        address__line__1: '', 
        post__code: ''
    });
    const [showUpdateFrom, setShowUpdateForm] = useState(false);

    useEffect(()=>{
        if(!isLoading && !isError && isSuccess && data && data?.division){
            setInformationResult(data); 
        }
    },[data, isLoading, isError, isSuccess, error])
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
                    {showUpdateFrom === true && <UpdateAddressComponents 
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

export default AccountAddress;