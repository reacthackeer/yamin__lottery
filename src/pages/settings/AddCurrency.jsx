import { Box, Button, FormControl, FormLabel, Input, Table, Tbody, Td, Thead, Tr, useToast } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useAddSingleCurrencyMutation, useDeleteSingleCurrencyMutation, useGetAllCurrencyQuery } from '../../Store/feature/currency/api';
import SidebarProfileComponent from '../../components/Private/SidebarProfileComponent';
import '../../style/dashboardStyle.scss';
import '../../style/defaultPageBackground.scss';

const AddCurrency = () => { 

    const [name, setName] = useState('');
    const [dollar, setDollar] = useState('');
    const [currencyRate, setCurrencyRate] = useState('');
    const [provideCurrencyId, {isLoading: deleteIsLoading}] = useDeleteSingleCurrencyMutation();
    const [debounceLoading, setDebounceLoading] = useState(false);
    const [deletedId, setDeletedId] = useState("")
    const [deleteDebounceLoading, setDeleteDebounceLoading] = useState(false);
    const [provideCurrencyInfo, {data, isLoading, isError, isSuccess, error}] = useAddSingleCurrencyMutation();
    const toast = useToast();

    const handleSubmit = (event) => {
        setDebounceLoading(()=> false);
        event.preventDefault();
        if (name && dollar && currencyRate) {
        let postData = { name, dollar, currencyRate };
        provideCurrencyInfo(postData);
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
        setDebounceLoading(()=> true);
        event.preventDefault();
        debouncedHandleSubmit(event);
    };


    const {isSuccess: currencyIsSuccess, data: currencyData} = useGetAllCurrencyQuery();


    useEffect(()=>{  
        if(!isLoading && isSuccess && !isError){
        if(data && data?.id > 0){ 
            setName('');
            setDollar('');
            setCurrencyRate(''); 
            // navigate('/profile')
            toast({
            title: "Successfully currency added!",
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


    // Your original handleDeleteSingleCurrency function
    const handleDeleteSingleCurrency = (id) => {
        setDeleteDebounceLoading(()=> false); 
        if (id) {
        provideCurrencyId({ id });
        }
    };

    // Create a debounced version of handleDeleteSingleCurrency
    const debouncedHandleDeleteSingleCurrency = _.debounce(handleDeleteSingleCurrency, 1000); // Adjust the debounce wait time as needed

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
                    <form 
                        onSubmit={handleDebouncedSubmit}
                    >   
                    <Box className='dashboard__container__items'>
                        <FormControl mb={3}>
                            <FormLabel>Currency Name</FormLabel>
                            <Input
                                type="text"
                                placeholder="Enter currency name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </FormControl>
                        <FormControl mb={3}>
                            <FormLabel>Enter dollar rate</FormLabel>
                            <Input
                                type="number"
                                placeholder="Enter dollar rate"
                                value={dollar}
                                onChange={(e) => setDollar(e.target.value)}
                                required
                            />
                        </FormControl>
                        <FormControl mb={3}>
                            <FormLabel>Enter currency rate</FormLabel>
                            <Input
                                type="number"
                                placeholder="Enter currency rate"
                                value={currencyRate}
                                onChange={(e) => setCurrencyRate(e.target.value)}
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
                            Add Currency
                        </Button> 
                    </Box>
                    </form>
                    {
                        currencyIsSuccess && currencyData && currencyData?.length > 0 &&
                        <Box className='content__data__view__table__container'>
                            <Table width={'700px'}>
                                <Thead>
                                    <Tr>
                                        <Td>Currency Name</Td>
                                        <Td>Dollar Rate</Td>
                                        <Td>Currency Rate</Td>
                                        <Td>Action</Td>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        currencyData.map((info,index)=>{
                                            return (
                                                <Tr key={index}>
                                                    <Td>{info.name}</Td>
                                                    <Td>{Number(info.dollar).toFixed(2)}</Td>
                                                    <Td>{Number(info.currencyRate).toFixed(2)}</Td>
                                                    <Td>
                                                        <Button 
                                                            size={'xs'}
                                                            width={'90px'} 
                                                            onClick={()=> handleDebouncedDeleteSingleCurrency(info.id)}
                                                            isLoading={deleteDebounceLoading && info.id === deletedId || deleteIsLoading && info.id === deletedId}
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

export default AddCurrency;