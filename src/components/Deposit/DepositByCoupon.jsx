import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useApplyCouponMutation } from '../../Store/feature/coupon/api';
    

    const DepositByCoupon = () => {
    const [couponCode, setCouponCode] = useState('');
    const [amount, setAmount] = useState('');
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState('empty');
    const [debounceLoading, setDebounceLoading] = useState(false);
    const [balanceType, setBalanceType] = useState('');
    const {userId:adminId, referralCode, email: adminEmail} = useSelector((state)=> state.auth.auth);

    const dispatch = useDispatch();
    const toast = useToast();
    const [provideCouponInfo, {data, isLoading, isError, isSuccess, error}] = useApplyCouponMutation();
    const handleSubmit = (event) => {
        event.preventDefault();
        setDebounceLoading(()=> false);
        if(couponCode && amount && email && balanceType && adminId && userId && adminEmail){
        if(balanceType === 'DEMO' || balanceType === 'REAL' || balanceType === 'OFFLINE'){
            let postData = {
                couponCode,
                amount,
                email,
                balanceType,
                adminId,
                userId,
                refId: referralCode,
                adminEmail
            }  
            provideCouponInfo(postData);
        }else{
            toast({
            title: 'Invalid Request',
            duration: 4000,
            isClosable: true,
            status: 'warning'
            })
        }
        }else{
        toast({
            title: 'Invalid Request',
            duration: 4000,
            isClosable: true,
            status: 'warning'
        })
        }
    };

    const couponDebounce =_.debounce(handleSubmit, 1000)

    const handleSubmitFirst = (e) => {
        e.preventDefault();
        setDebounceLoading(()=> true);
        couponDebounce(e);
    }
    const navigate = useNavigate();
    useEffect(()=>{   
        if(!isLoading && isSuccess && !isError){
        if(data && data?.id){  
            setCouponCode('');
            setAmount('');
            setEmail('');
            setUserId('');
            setBalanceType(''); 
            toast({
            title: "Successfully coupon recharged!",
            duration: 4000,
            isClosable: true,
            status: 'success'
            })
            navigate('/account/dashboard');
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
        <Box bg="white"> 
        <form onSubmit={handleSubmitFirst}>
            <Box className='dashboard__container__items'>
                <FormControl mb={3}>
                    <FormLabel>Coupon Code</FormLabel>
                    <Input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        required
                    />
                </FormControl>
                <FormControl mb={3}>
                    <FormLabel>Balance Type</FormLabel>
                    <Input
                        type="text"
                        placeholder="Enter Balance Type"
                        value={balanceType}
                        onChange={(e) => setBalanceType(e.target.value)}
                        required
                    />
                </FormControl>
                <FormControl mb={3}>
                    <FormLabel>Amount</FormLabel>
                    <Input
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </FormControl>
                <FormControl mb={3}>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </FormControl>
                <FormControl mb={3}>
                    <FormLabel>User ID</FormLabel>
                    <Input
                        type="text"
                        placeholder="Enter user ID"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                </FormControl>
            </Box>
            <Box
                display={'flex'}
                justifyContent={'flex-end'}
            >
                <Button 
                    type="submit" 
                    colorScheme="blue"
                    isLoading={isLoading || debounceLoading}
                >
                    Apply Coupon
                </Button>
            </Box>
        </form>
        </Box>
    );
    };


    export default DepositByCoupon;