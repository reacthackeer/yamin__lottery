import { Box, Button, FormControl, FormLabel, Input, Table, Tbody, Td, Thead, Tr, useToast } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { uid } from 'uid';
import { useAddSingleSystemLotteryMutation, useDeleteSingleSystemLotteryMutation, useGetAllSystemLotteryQuery, useUpdateSingleSystemLotteryMutation } from '../../Store/feature/lottery/api';
import SidebarProfileComponent from '../../components/Private/SidebarProfileComponent';
import '../../style/dashboardStyle.scss';
import '../../style/defaultPageBackground.scss';

const AddSystemLottery = () => { 
    const [wallet, setWallet] = useState('');
    const [idesType, setIdesType] = useState('');
    const [debounceLoading, setDebounceLoading] = useState(false);
    const [deleteDebounceLoading, setDeleteDebounceLoading] = useState(false);
    const [deletedId, setDeletedId] = useState('');
    const [ides, setIdes] = useState('');
    const [currency, setCurrency] = useState('');  
    const toast = useToast();
    const [provideCouponInfo, {data, isLoading, isError, isSuccess, error}] = useAddSingleSystemLotteryMutation();
    const [provideLotteryId, {isLoading: lotteryUpdateIsLoading}] = useUpdateSingleSystemLotteryMutation();
    const [provideWalletId] = useDeleteSingleSystemLotteryMutation();
    const {data: walletData, isSuccess: walletIsSuccess} = useGetAllSystemLotteryQuery();  
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setDebounceLoading(()=> false);
        if(wallet &&  currency){ 
            let postInfo = {
                name: wallet,
                price: currency,
                lotteryId: uid(8),
                totalSell: 0,
                amount: 0,
                status: 'pending',
                drawDate: ides
            }  
            provideCouponInfo(postInfo)  
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
            provideWalletId(id)
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
                                    <FormLabel>Lottery Name</FormLabel>
                                    <Input
                                        type="text"
                                        placeholder="Enter Lottery name"
                                        value={wallet}
                                        onChange={(e) => setWallet(e.target.value)}
                                        required
                                    />
                                </FormControl> 
                                <FormControl mb={3}>
                                    <FormLabel>Lottery Price</FormLabel>
                                    <Input
                                        type="number"
                                        placeholder="Enter Lottery price"
                                        value={currency}
                                        onChange={(e) => setCurrency(e.target.value)}
                                        required
                                    />
                                </FormControl> 
                                <FormControl mb={3}>
                                    <FormLabel>Lottery Draw Date</FormLabel>
                                    <Input
                                        type='datetime-local'
                                        placeholder="Enter Lottery draw date"
                                        value={ides}
                                        onChange={(e) => setIdes(e.target.value)}
                                        required
                                    />
                                </FormControl>
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
                                    Add Lottery
                                </Button> 
                            </Box>
                        </form>
                    </Box>
                    {
                        walletIsSuccess && walletData && walletData?.length > 0 &&
                        <Box className='content__data__view__table__container'> 
                            <Table width={'1800px'}>
                                <Thead>
                                    <Tr>
                                        <Td>Wallet Name</Td>
                                        <Td>Price</Td>  
                                        <Td>LotteryId</Td>  
                                        <Td>TotalSell</Td>  
                                        <Td>TotalCollection</Td>  
                                        <Td>AppCommission</Td>  
                                        <Td>UserCommission</Td>  
                                        <Td>Amount</Td>  
                                        <Td>status</Td>  
                                        <Td>drawDate</Td>  
                                        <Td>Action</Td>  
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        walletData.map((info,index)=>{
                                            return (
                                                <Tr key={index}>
                                                    <Td>{info.name}</Td>
                                                    <Td>{info.price}</Td> 
                                                    <Td>{info.lotteryId}</Td> 
                                                    <Td>{Number(info.totalSell).toFixed(2)}</Td> 
                                                    <Td>{Number(info.totalCollection).toFixed(2)}</Td> 
                                                    <Td>{Number(info.appCommission).toFixed(2)}</Td> 
                                                    <Td>{Number(info.userCommission).toFixed(2)}</Td> 
                                                    <Td>{Number(info.amount).toFixed(2)}</Td> 
                                                    <Td>{info.status}</Td> 
                                                    <Td>{new Date(info.drawDate).getFullYear()}-{new Date(info.drawDate).getMonth()}-{new Date(info.drawDate).getDate()}  {new Date(info.drawDate).getHours()}:{new Date(info.drawDate).getMinutes()}</Td> 
                                                    <Td>
                                                        <Button 
                                                            size='xs'
                                                            isDisabled={lotteryUpdateIsLoading}
                                                            width={'90px'} 
                                                            onClick={()=> provideLotteryId(info.id)}
                                                            isLoading={ lotteryUpdateIsLoading}
                                                        >Start Draw</Button>
                                                        <Button 
                                                            ml='1'
                                                            size='xs'
                                                            width={'90px'} 
                                                            onClick={()=> handleDebouncedDeleteSingleCurrency(info.id)}
                                                            isLoading={ info.id === deletedId || deleteDebounceLoading && info.id === deletedId}
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

export default AddSystemLottery;