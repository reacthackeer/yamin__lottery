import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useBalanceTransferMutation } from '../../Store/feature/auth/api';
import { setUserLoggedOut } from '../../Store/feature/auth/authSlice';
import SidebarProfileComponent from '../../components/Private/SidebarProfileComponent';
import '../../style/dashboardStyle.scss';
import '../../style/defaultPageBackground.scss';
const BalanceTransfer = () => { 
    const {realBalance, userId} = useSelector((state)=> state.auth.auth);
    const currency = useSelector((state)=> state.auth.currency);
    const toast = useToast();
    const [ID, setID] = useState('');
    const [amount, setAmount] = useState('');
    const [backupPassword, setBackupPassword] = useState('');
    const [debounceLoading, setDebounceLoading] = useState(false);
    const [password, setPassword] = useState('');

    const [provideTransferInfo,{data, isLoading, isSuccess, isError, error}] = useBalanceTransferMutation();

    const handleSubmit = (e) => {
    e.preventDefault();
    setDebounceLoading(()=> false);
    if(backupPassword !== password){
        if(ID && amount && backupPassword && password && userId){
            if(Number(amount) / Number(currency.currencyRate) <= Number(realBalance)){
                let postInfo = {
                    userId,
                    backupPassword,
                    password,
                    amount: Number(amount),
                    receiverId: ID,
                    currency: currency.name
                }
                provideTransferInfo(postInfo);
            }else{
                toast({
                title: 'You have not enough balance!',
                status: 'warning',
                isClosable: true
                })
            }
        }else{
            toast({
            title: 'Invalid post request',
            status: 'warning',
            isClosable: true
            })
        }
    }else{
        toast({
        title: 'Password and backup password must different!',
        status: 'warning',
        isClosable: true
        })
    }
    };

    const debounceTransfer = _.debounce(handleSubmit,1000);
    const handleSubmitFirst = (e) => {
    e.preventDefault();
    setDebounceLoading(()=> true);
    debounceTransfer(e);
    }
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{  
    if(!isLoading && isSuccess && !isError){
    if(data && data?.senderUpdate){ 
        setID('');
        setAmount('');
        setBackupPassword('');
        setPassword(''); 
        dispatch(setUserLoggedOut())
        localStorage.removeItem('auth');
        navigate('/login');
        toast({
        title: "Successfully transfer!",
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
                <form onSubmit={handleSubmitFirst}>
                    <Box 
                        className='dashboard__container__items'
                    >
                        <FormControl mt='2'>
                            <FormLabel>Enter Receiver User ID.</FormLabel>
                            <Input type="text" placeholder='User ID' value={ID} onChange={(e) => setID(e.target.value)} required/>
                        </FormControl>
                        <FormControl mt='2'>
                            <FormLabel>How much {currency.name.toUpperCase()} do you want to transfer?</FormLabel>
                            <Input type="number" placeholder='Enter amount' value={amount} onChange={(e) => setAmount(e.target.value)} required/>
                        </FormControl>
                        <FormControl mt='2'>
                            <FormLabel>Enter Backup Password</FormLabel>
                            <Input type="password" placeholder='Enter backup password' value={backupPassword} onChange={(e) => setBackupPassword(e.target.value)} required/>
                        </FormControl>
                        <FormControl mt='2'>
                            <FormLabel>Password</FormLabel>
                            <Input type="password" placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        </FormControl>
                    </Box>
                    <Box display={'flex'} justifyContent={'flex-end'} mt='3'>
                        <Button 
                            type="submit" 
                            size='sm'
                            colorScheme="blue" 
                            isLoading={isLoading || debounceLoading}
                        >Transfer</Button> 
                    </Box>
                </form>
                </Box>
            </Box>
        </Box>
    );
};

export default BalanceTransfer;