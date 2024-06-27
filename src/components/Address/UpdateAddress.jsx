import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useUpdateSingleAddressMutation } from '../../Store/feature/auth/api';

const UpdateAddressComponents = ({informationResult, setInformationResult,setShowUpdateForm, showUpdateFrom}) => {  
    
    const [provideAddressInfo, {data, isLoading, isError, isSuccess, error}] = useUpdateSingleAddressMutation();
    const {userId} = useSelector((state)=> state.auth.auth);
    const handleChange = (e) => {
        const { name, value } = e.target;   
        setInformationResult((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let postInfo = {
            division: informationResult.division,
            country: informationResult.country,
            district: informationResult.district,
            postCode: informationResult.post__code,
            addressLineOne: informationResult.address__line__1,
            addressLineTwo: informationResult.address__line__2,
            addressLineThree: informationResult.address__line__3,
            userId
        };
        provideAddressInfo(postInfo); 
    }
    const toast = useToast();
    useEffect(()=>{ 
        if(!isError && !isLoading && isSuccess && data && data.status__code === 200){
            setShowUpdateForm(()=> false);
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
        <form
            onSubmit={handleSubmit}
        > 
            <Box className='dashboard__container__items'> 
                <Box className='single__result__item input__box'>
                    <FormControl mb={4}>
                        <FormLabel>Country</FormLabel>
                            <Input 
                                type='text'
                                name='country'
                                placeholder='Enter your address'
                                value={informationResult.country}     
                                onChange={handleChange}
                                required
                            />
                    </FormControl>
                </Box>  
                <Box className='single__result__item input__box'>
                    <FormControl mb={4}>
                        <FormLabel>Division</FormLabel>
                            <Input 
                                type='text'
                                name='division'
                                placeholder='Enter your division'
                                value={informationResult.division}     
                                onChange={handleChange}
                                required
                            />
                    </FormControl>
                </Box> 
                <Box className='single__result__item input__box'>
                    <FormControl mb={4}>
                        <FormLabel>District</FormLabel>
                            <Input 
                                type='text'
                                name='district'
                                placeholder='Enter your district'
                                value={informationResult.district}     
                                onChange={handleChange}
                                required
                            />
                    </FormControl>
                </Box> 
                <Box className='single__result__item input__box'>
                    <FormControl mb={4}>
                        <FormLabel>Post Code</FormLabel>
                            <Input 
                                type='text'
                                name='post__code'
                                placeholder='Enter your post code'
                                value={informationResult.post__code}     
                                onChange={handleChange}
                                required
                            />
                    </FormControl>
                </Box> 
                <Box className='single__result__item input__box'>
                    <FormControl mb={4}>
                        <FormLabel>Address Line 1</FormLabel>
                            <Input 
                                type='text'
                                name='address__line__1'
                                placeholder='Like as police station'
                                value={informationResult.address__line__1}     
                                onChange={handleChange}
                                required
                            />
                    </FormControl>
                </Box> 
                <Box className='single__result__item input__box'>
                    <FormControl mb={4}>
                        <FormLabel>Address Line 2</FormLabel>
                            <Input 
                                type='text'
                                name='address__line__2'
                                placeholder='Like as union'
                                value={informationResult.address__line__2}     
                                onChange={handleChange}
                                required
                            />
                    </FormControl>
                </Box> 
                <Box className='single__result__item input__box'>
                    <FormControl mb={4}>
                        <FormLabel>Address Line 3</FormLabel>
                            <Input 
                                type='text'
                                name='address__line__3'
                                placeholder='Street address like as village'
                                value={informationResult.address__line__3}     
                                onChange={handleChange}
                                required
                            />
                    </FormControl>
                </Box> 
            </Box>
            <Box
                display={'flex'}
                justifyContent={'flex-end'}
                mb='3'
            >
                <Button 
                    colorScheme='green' 
                    type='submit'
                >Save</Button>
            </Box> 
        </form>
    );
};

export default UpdateAddressComponents;