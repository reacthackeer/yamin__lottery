import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAdminApplicationMutation } from '../../../Store/feature/auth/api';
import SidebarProfileComponent from '../../../components/Private/SidebarProfileComponent';

const BecomeASellerFormContainer = ({setShowForm, adminType}) => {
    let [informationResult, setInformationResult] = useState({name: '', phone: '', link: '', birth: '', number: '', status: 'pending', type: adminType}); 
    const {userId, phone, email} = useSelector((state)=> state.auth.auth);
    const [provideAdminInformation, {data, isLoading, isError, isSuccess, error}] = useAdminApplicationMutation();
    const handleSubmit =  (e) => {
        e.preventDefault(); 
        let postInfo = {
            ...informationResult,
            userId,
            phone, 
            email
        };
        provideAdminInformation(postInfo);
    }
    const handleInputChange = (e) => {
        let {name, value} = e.target; 
        let newInfo =  {...informationResult};
            newInfo[name] = value; 
            setInformationResult(()=> newInfo)
    } 
    const toast = useToast();
    useEffect(()=>{ 
        if(!isError && !isLoading && isSuccess && data && data.status__code === 201){
            setInformationResult({name: '', phone: '', link: '', birth: '', number: '', status: 'pending', type: 'seller'});
        }
        if(isError && !isLoading && !isSuccess){
            let message = error?.data?.error?.message || 'Internal server error!';
            toast({
                status: 'error', 
                title: message, 
                duration: 3000, 
                position: 'top-right',
                isClosable: true
            }); 
        }
    },[data, isLoading, isSuccess, isError, error])

    return (
        <Box className='default__page__background i__1 white'>
            <Box className='dashboard__page__container'>
                <SidebarProfileComponent/>
                <Box 
                    className='content__container'
                >      
                <form 
                    onSubmit={handleSubmit}
                > 
                    <Box className='dashboard__container__items'>
                        <Box className='single__result__item input__box'>
                            <FormControl mb={4}>
                                <FormLabel>Name</FormLabel>
                                <Input 
                                    name='name'
                                    placeholder='John Doe'
                                    value={informationResult.name || ''}
                                    onChange={handleInputChange}
                                    required
                                ></Input> 
                            </FormControl> 
                        </Box> 
                        <Box className='single__result__item input__box'>
                            <FormControl mb={4}>
                                <FormLabel>Phone Number</FormLabel>
                                <Input 
                                    name='phone'
                                    placeholder='+8801333333333'
                                    value={informationResult.phone || ''}
                                    onChange={handleInputChange}
                                    required
                                ></Input> 
                            </FormControl> 
                        </Box>  
                        <Box className='single__result__item input__box'>
                            <FormControl mb={4}>
                                <FormLabel>Date Of Birth</FormLabel>
                                <Input 
                                    name='birth'
                                    placeholder='30/12/2000'
                                    value={informationResult.birth || ''}
                                    onChange={handleInputChange}
                                    required
                                ></Input> 
                            </FormControl> 
                        </Box>  
                        <Box className='single__result__item input__box'>
                            <FormControl mb={4}>
                                <FormLabel>NID Number</FormLabel>
                                <Input 
                                    name='number'
                                    placeholder='Enter your nid number'
                                    value={informationResult.number || ''}
                                    onChange={handleInputChange}
                                    required
                                ></Input> 
                            </FormControl> 
                        </Box>
                        <Box className='single__result__item input__box'>
                            <FormControl mb={4}>
                                <FormLabel>NID Link</FormLabel>
                                <Input 
                                    name='link'
                                    placeholder='Paste here your nid link'
                                    value={informationResult.link || ''}
                                    onChange={handleInputChange}
                                    required
                                ></Input> 
                            </FormControl> 
                        </Box>
                    </Box>
                    <Box
                        display={'flex'}
                        justifyContent={'flex-end'} 
                    >   
                        <Button
                            mr={'5px'}
                            colorScheme='yellow'
                            onClick={()=> setShowForm(()=> false)}
                        >
                            Show Table
                        </Button>
                        <Button   
                            type='submit'
                            colorScheme='green'
                            isLoading={isLoading}
                        >Submit Request</Button>
                    </Box> 
                </form> 
                </Box>
            </Box>
        </Box>
    );
};

export default BecomeASellerFormContainer;