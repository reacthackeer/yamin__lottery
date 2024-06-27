import { Box, Button, FormControl, FormLabel, Input, Table, Tbody, Td, Thead, Tr, useToast } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddCouponMutation, useDeleteSingleCouponMutation, useGetAllCouponQuery } from '../../Store/feature/coupon/api';
import SidebarProfileComponent from '../../components/Private/SidebarProfileComponent';
import '../../style/dashboardStyle.scss';
import '../../style/defaultPageBackground.scss';


const AddCouponCode = () => { 

    const [couponCode, setCouponCode] = useState('');
    const [amount, setAmount] = useState('');
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState('empty');
    const [debounceLoading, setDebounceLoading] = useState(false);
    const [balanceType, setBalanceType] = useState('');
    const adminId = useSelector((state)=> state.auth.auth.userId);

    const toast = useToast();
    
    const [provideCouponInfo, {data, isLoading, isError, isSuccess, error}] = useAddCouponMutation();
    const [deletedId, setDeletedId] = useState('');
    const {data: couponData, isSuccess: couponIsSuccess} = useGetAllCouponQuery();
    const [provideCouponId, {isLoading: deleteCouponIsLoading}] = useDeleteSingleCouponMutation();
    const [deleteDebounceLoading, setDeleteDebounceLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault(); 
        setDebounceLoading(()=> false);
        if (couponCode && amount && email && balanceType && adminId && userId) {
            if (['DEMO', 'REAL', 'OFFLINE'].includes(balanceType)) {
            let postData = {
                couponCode,
                amount,
                email,
                balanceType,
                adminId,
                userId,
            };
            provideCouponInfo(postData);
            } else {
            toast({
                title: 'Invalid Request',
                duration: 4000,
                isClosable: true,
                status: 'warning',
            });
            }
        } else {
            toast({
            title: 'Invalid Request',
            duration: 4000,
            isClosable: true,
            status: 'warning',
            });
        }
    };
    
    // Create a debounced version of handleSubmit
    const debouncedHandleSubmit = _.debounce(handleSubmit, 1000); // Adjust the debounce wait time as needed
    
    // Use the debounced function in your code
    const handleDebouncedSubmit = (event) => {
        event.preventDefault();
        setDebounceLoading(()=> true);
        debouncedHandleSubmit(event);
        };
        
        useEffect(()=>{  
        if(!isLoading && isSuccess && !isError){
            if(data && data?.id > 0){ 
            setCouponCode('');
            setAmount('');
            setEmail('');
            setUserId('');
            setBalanceType('');
            // navigate('/profile');
            toast({
                title: "Successfully coupon added!",
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
    
    // const handleDeleteSingleCoupon = (id) => {
    //     let result = window.confirm('Are you sure to delete this item?');
    //     if(result && id){
    //         provideCouponId({id});
    //     }
    // }
    
        // Your original handleDeleteSingleCurrency function
    const handleDeleteSingleCurrency = (id) => {
        setDeleteDebounceLoading(()=> false); 
        if (id) {
        provideCouponId({ id });
        }
    };
    
    // Create a debounced version of handleDeleteSingleCurrency
    const debouncedHandleDeleteSingleCoupon = _.debounce(handleDeleteSingleCurrency, 1000); // Adjust the debounce wait time as needed
    
    // Use the debounced function in your code
    const handleDebouncedDeleteSingleCoupon = (id) => {
        setDeletedId(()=> id);
        setDeleteDebounceLoading(()=> true);
        debouncedHandleDeleteSingleCoupon(id);
    };
    
    return (
        <Box className='default__page__background i__1 white'>
            <Box className='dashboard__page__container'>
                <SidebarProfileComponent/>
                <Box 
                    className='content__container' 
                >        
                    <Box p={2} bg="white"> 
                        <form onSubmit={handleDebouncedSubmit}>
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
                                    isLoading={debounceLoading || isLoading}
                                >
                                    Add Coupon
                                </Button> 
                            </Box>
                        </form>
                    </Box>
                    {
                        couponIsSuccess && couponData && couponData?.length > 0 &&
                        <Box className='content__data__view__table__container'> 
                        <Table width={'1000px'}>
                            <Thead>
                                <Tr>
                                    <Td>Coupon Code</Td>
                                    <Td>BalanceType</Td>
                                    <Td>Amount</Td>
                                    <Td>UserId</Td>
                                    <Td>Email</Td>
                                    <Td>Action</Td>
                                </Tr>
                            </Thead>
                            <Tbody>
                            {
                                couponData.map((info, index)=> {
                                    return ( 
                                        <Tr key={index}>
                                            <Td>{info.coupon}</Td>
                                            <Td>{info.balanceType}</Td>
                                            <Td>{Number(info.amount).toFixed(2)}</Td>
                                            <Td>{info.userId}</Td> 
                                            <Td>{info.email}</Td> 
                                            <Td> 
                                                <Button 
                                                    size='sm'
                                                    onClick={()=> handleDebouncedDeleteSingleCoupon(info.id)}
                                                    isLoading={deleteCouponIsLoading || deleteDebounceLoading && info.id === deletedId}
                                                >DELETE</Button>  
                                            </Td>  
                                        </Tr>
                                    )
                                })
                                }
                            </Tbody>
                        </Table>  
                        </Box>
                    } 
                </Box>
            </Box>
        </Box>
    );
};

export default AddCouponCode;

