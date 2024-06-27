import { Box, Button, FormControl, FormLabel, Input, Select, Table, Tbody, Td, Thead, Tr, useToast } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useGetAllCurrencyQuery } from '../../Store/feature/currency/api';
import { useAddSingleWalletMutation, useDeleteSingleWalletMutation, useGetAllWalletQuery } from '../../Store/feature/wallet/api';
import SidebarProfileComponent from '../../components/Private/SidebarProfileComponent';
import '../../style/dashboardStyle.scss';
import '../../style/defaultPageBackground.scss';

const AddDepositWallet = () => { 
    const [wallet, setWallet] = useState('');
    const [idesType, setIdesType] = useState('');
    const [debounceLoading, setDebounceLoading] = useState(false);
    const [deleteDebounceLoading, setDeleteDebounceLoading] = useState(false);
    const [deletedId, setDeletedId] = useState('');
    const [ides, setIdes] = useState('');
    const [currency, setCurrency] = useState('');  
    const toast = useToast();
    const [provideCouponInfo, {data, isLoading, isError, isSuccess, error}] = useAddSingleWalletMutation();
    const {data: walletData, isSuccess: walletIsSuccess} = useGetAllWalletQuery();
    const [provideWalletId,{isLoading: deleteIsLoading}] = useDeleteSingleWalletMutation();
    const {data: currencyData, isSuccess: currencyIsSuccess} = useGetAllCurrencyQuery();
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setDebounceLoading(()=> false);
        if(wallet && ides && currency){
            let newIdesType = idesType.split('=');
            let newIdes = ides.split('=');
            let postData = {wallet, idesType: newIdesType, ides: newIdes, currency};
            provideCouponInfo(postData)  
        }else{
            toast({
                title: 'Invalid Request',
                duration: 4000,
                isClosable: true,
                status: 'warning'
            })
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
            setWallet('');
            setIdes('');
            setIdesType('');
            setCurrency(""); 
            toast({
            title: "Successfully wallet added!",
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
    
    const handleDeleteSingleWallet = (id) => { 
        setDeleteDebounceLoading(()=> false);
        if(id){
            provideWalletId({id})
        }
    }
    
    
    // Create a debounced version of handleDeleteSingleCurrency
    const debouncedHandleDeleteSingleCurrency = _.debounce(handleDeleteSingleWallet, 1000); // Adjust the debounce wait time as needed
    
    // Use the debounced function in your code
    const handleDebouncedDeleteSingleCurrency = (id) => {
        setDeletedId(()=> id);
        setDeleteDebounceLoading(()=> true);
        debouncedHandleDeleteSingleCurrency(id);
    };
    return (
        <Box className='default__page__background i__1 white'>
            <Box className='dashboard__page__container'>
                <SidebarProfileComponent/>
                <Box 
                    className='content__container' 
                >       
                <React.Fragment>
                    <Box p={2} bg="white"> 
                        <form onSubmit={handleDebouncedSubmit}>
                            <Box className='dashboard__container__items'>
                                <FormControl mb={3}>
                                    <FormLabel>Wallet Name</FormLabel>
                                    <Input
                                        type="text"
                                        placeholder="Enter wallet name"
                                        value={wallet}
                                        onChange={(e) => setWallet(e.target.value)}
                                        required
                                    />
                                </FormControl>
                                <FormControl mb={3}>
                                    <FormLabel>Enter your ides Type</FormLabel>
                                    <Input
                                        type="text"
                                        placeholder="example email=ID"
                                        value={idesType}
                                        onChange={(e) => setIdesType(e.target.value)}
                                        required
                                    />
                                </FormControl>
                                <FormControl mb={3}>
                                    <FormLabel>Enter your ides</FormLabel>
                                    <Input
                                        type="text"
                                        placeholder="example mail@gmail.com=2222222"
                                        value={ides}
                                        onChange={(e) => setIdes(e.target.value)}
                                        required
                                    />
                                </FormControl> 
                                {currencyIsSuccess && currencyData && currencyData?.length > 0 && 
                                    <FormControl mb='3'>
                                        <FormLabel>Select ID type:</FormLabel>
                                        <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                                            <option value="">Select Currency</option>
                                            {
                                                currencyData.map((info, index)=> <option value={info.name} key={index}>{info.name}</option>)
                                            } 
                                        </Select>
                                    </FormControl>
                                }
                            </Box>
                            <Box
                                display="flex"
                                justifyContent="flex-end"
                            >
                                <Button 
                                    type="submit" 
                                    colorScheme="blue"
                                    isLoading={isLoading || debounceLoading}
                                >
                                    Add Wallet
                                </Button> 
                            </Box>
                        </form>
                    </Box>
                    {
                        walletIsSuccess && walletData && walletData?.length > 0 &&
                        <Box className='content__data__view__table__container'> 
                            <Table width='500px'>
                                <Thead>
                                    <Tr>
                                        <Td>Wallet Name</Td>
                                        <Td>Currency</Td> 
                                        <Td>Action</Td>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        walletData.map((info,index)=>{
                                            return (
                                                <Tr key={index}>
                                                    <Td>{info.name}</Td>
                                                    <Td>{info.currency}</Td> 
                                                    <Td>
                                                        <Button 
                                                            size='sm'
                                                            width={'90px'} 
                                                            onClick={()=> handleDebouncedDeleteSingleCurrency(info.id)}
                                                            isLoading={deleteIsLoading && info.id === deletedId || deleteDebounceLoading && info.id === deletedId}
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
                </React.Fragment>
                </Box>
            </Box>
        </Box>
    );
};

export default AddDepositWallet;