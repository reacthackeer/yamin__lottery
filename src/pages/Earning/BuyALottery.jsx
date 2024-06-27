import { Box, Button, Checkbox, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { uid } from 'uid';
import { useAddMultipleArrayMutation } from '../../Store/feature/lottery/api';
import SidebarProfileComponent from '../../components/Private/SidebarProfileComponent';
import '../../style/dashboardStyle.scss';
import '../../style/defaultPageBackground.scss';

const BuyALottery = () => { 
    const [provideLotteryInfo, {data, isLoading, isSuccess, isError, error}] = useAddMultipleArrayMutation();
    const {userId} = useSelector((state)=> state.auth.auth);
    let [informationResult, setInformationResult] = useState({ phones: '', name: '', phone: '', multiple: false, quantity: 1}); 
    const handleGetRandomLotteryNumber = () => {
        let num_1 = Math.floor(Math.random()*10); 
        let num_2 = Math.floor(Math.random()*10); 
        let num_3 = Math.floor(Math.random()*10); 
        let num_4 = Math.floor(Math.random()*10); 
        let num_5 = Math.floor(Math.random()*10); 
        let num_6 = Math.floor(Math.random()*10); 
        let num_7 = Math.floor(Math.random()*10); 
        let num_8 = Math.floor(Math.random()*10); 
        let num_9 = Math.floor(Math.random()*10); 
        let num_10 = Math.floor(Math.random()*10); 
        let num_11 = Math.floor(Math.random()*10); 
        let num_12 = Math.floor(Math.random()*10); 
        let num_13 = Math.floor(Math.random()*10); 
        let num_14 = Math.floor(Math.random()*10); 
        let num_15 = Math.floor(Math.random()*10); 

        return `${num_1}${num_2}${num_3}${num_4}${num_5}${num_6}${num_7}${num_8}${num_9}${num_10}${num_11}${num_12}${num_13}${num_14}${num_15}`;
    }
    const handleSubmit =  (e) => {
        e.preventDefault(); 
        let lotteryArray = [];  
        let lengthArray = uid(Number(informationResult.quantity)).split('');
        lengthArray.forEach(()=> {
            let postInfo = {
                userId: userId,
                phone: informationResult.phone,
                lotteryNumber: handleGetRandomLotteryNumber(), 
                name: informationResult.name,
                phones: informationResult.multiple ? informationResult.phones : 'false',
                multiple: informationResult.multiple ? 'true' : 'false',
                status: 'accept'
            }
            lotteryArray.push(postInfo);
        }); 
        let postInfo = {quantity: Number(informationResult.quantity), userId, lotteryArray};
        provideLotteryInfo(postInfo);
    }
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setInformationResult(prevInfo => ({
            ...prevInfo,
            [name]: type === 'checkbox' ? checked : value  // Handle checkbox differently
        }));
    } 

    const toast = useToast();
    useEffect(()=>{  
        if(!isLoading && isSuccess && !isError){
        if(data && data?.id > 0){ 
            setInformationResult({ phones: '', name: '', phone: '', multiple: false, quantity: 1})
            toast({
            title: "Successfully lottery added!",
            duration: 4000,
            isClosable: true,
            status: 'success'
            })
        }else{
            toast({
            title: error?.data?.error?.message || "Internal server error!",
            duration: 4000,
            isClosable: true,
            status: 'error'
            })
        }
        }
        if(!isLoading && isError && !isSuccess){
        toast({
            title: error?.data?.error?.message || "Internal server error!",
            duration: 4000,
            isClosable: true,
            status: 'error'
        })
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
                        <FormControl mb={4} isRequired>
                            <FormLabel>Lottery Holder Name</FormLabel>
                            <Input 
                                name='name'
                                placeholder='John Doe'
                                value={informationResult.name || ''}
                                onChange={handleInputChange}
                            ></Input> 
                        </FormControl>  
                        <FormControl mb={4} isRequired>
                            <FormLabel>Root Phone Number</FormLabel>
                            <Input 
                                type='tel'
                                name='phone'
                                placeholder='+8801333333333'
                                value={informationResult.phone || ''}
                                onChange={handleInputChange}
                            ></Input> 
                        </FormControl>  
                        <FormControl mb={4} isRequired>
                            <FormLabel>Lottery Quantity</FormLabel>
                            <Input 
                                type='number'
                                name='quantity'
                                placeholder='Enter lottery quantity'
                                value={informationResult.quantity || ''}
                                onChange={handleInputChange}
                            ></Input> 
                        </FormControl>  
                        <FormControl mb={4}>
                            <FormLabel>Multiple Owner</FormLabel>
                            <Checkbox 
                                value={informationResult.multiple || false}
                                name='multiple'
                                onChange={handleInputChange}
                            />
                        </FormControl>  
                        <FormControl mb={4}>
                            <FormLabel>Add More Phone Number</FormLabel>
                            <Input 
                                name='phones'
                                placeholder='Num1&Num2&Num3'
                                value={informationResult.phones}
                                onChange={handleInputChange}
                            ></Input> 
                        </FormControl> 
                    </Box> 
                    <Box
                        display={'flex'}
                        justifyContent={'flex-end'} 
                    >
                        <Button   
                            type='submit'
                            colorScheme='green'
                        >Buy</Button>
                    </Box>  
            </form>
                </Box>
            </Box>
        </Box>
    );
};

export default BuyALottery;