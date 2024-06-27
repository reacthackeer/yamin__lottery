import { Box, Button, FormControl, FormLabel, Input, Table, Tbody, Td, Thead, Tr, useToast } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddSingleInvestRequestMutation, useBlockSingleInvestRequestMutation, useConfirmSingleInvestRequestMutation, useDeleteSingleInvestRequestMutation, useFinishSingleInvestRequestMutation, useGetAllInvestRequestQuery } from '../../Store/feature/InvestRequest/api';
import SidebarProfileComponent from '../../components/Private/SidebarProfileComponent';
import '../../style/dashboardStyle.scss';
import '../../style/defaultPageBackground.scss';

const InvestSystem = ({setShowForm}) => { 
    const {userId} = useSelector((state)=> state.auth.auth);
    const [provideInfo, {data, isError, isSuccess, isLoading, error}] = useAddSingleInvestRequestMutation();
    let [informationResult, setInformationResult] = useState({amount: '', duration: '', profit: '', password: '', backupPassword: ''});  
    const handleSubmit =  (e) => {
        e.preventDefault();  
        let postInfo = {...informationResult, userId, status: 'pending', currency: 'Usd'};
        provideInfo(postInfo);
    };
    const handleInputChange = (e) => {
        let {name, value} = e.target; 
        let newInfo =  {...informationResult};
            newInfo[name] = value;
            
        let estimatedProfit = Number(newInfo.amount) / 100 * 15 / 30 * Number(newInfo.duration);
            newInfo.profit = estimatedProfit;
            setInformationResult(()=> newInfo);
    }; 

    const toast = useToast();

    useEffect(()=>{ 
        if(!isLoading && isSuccess && !isError){
        if(data && data?.id){
            setInformationResult({amount: '', duration: '', profit: '', password: '', backupPassword: ''}); 
            toast({
                title: "Successfully Invest Request submitted!",
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
        <form
        onSubmit={handleSubmit} > 
        <Box className='dashboard__container__items'>
            <Box className='single__result__item input__box'>
                <FormControl mb={4} isRequired>
                    <FormLabel>Amount</FormLabel>
                    <Input 
                        type='number'
                        name='amount'
                        placeholder='100 USD'
                        value={informationResult.amount || ''}
                        onChange={handleInputChange}
                    ></Input> 
                </FormControl> 
            </Box> 
            <Box className='single__result__item input__box'>
                <FormControl mb={4} isRequired>
                    <FormLabel>Duration</FormLabel>
                    <Input 
                        type='number'
                        name='duration'
                        placeholder='7 DAYS'
                        value={informationResult.duration || ''}
                        onChange={handleInputChange}
                    ></Input> 
                </FormControl> 
            </Box>   
            <Box className='single__result__item input__box'>
                <FormControl mb={4}>
                    <FormLabel>Estimated profit</FormLabel>
                    <Input 
                        type='number'
                        isDisabled={true}
                        name='profit'
                        placeholder='3.5 USD' 
                        value={informationResult.profit || ''}
                        onChange={handleInputChange}
                    ></Input> 
                </FormControl> 
            </Box> 
            <Box className='single__result__item input__box'>
                <FormControl mb={4} isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input 
                        type='password'
                        name='password'
                        placeholder='*9263|lLs73$%@'
                        value={informationResult.password || ''}
                        onChange={handleInputChange}
                    ></Input> 
                </FormControl> 
            </Box>  
            <Box className='single__result__item input__box'>
                <FormControl mb={4} isRequired>
                    <FormLabel>Backup Password</FormLabel>
                    <Input 
                        type='password'
                        name='backupPassword'
                        placeholder='*9263|lLs73$%@s'
                        value={informationResult.backupPassword || ''}
                        onChange={handleInputChange}
                    ></Input> 
                </FormControl> 
            </Box> 
        </Box>  
        <Box
            display={'flex'}
            justifyContent={'flex-end'} 
        >
            <Button   
                type='button'
                colorScheme='green'
                onClick={()=> setShowForm(()=> false)}
            >Show Table</Button>
            <Button   
                ml='1'
                type='submit'
                colorScheme='green'
            >Submit</Button>
        </Box>  
    </form>
    );
};

const InvestSystemTable = ({setShowForm}) => {
    const {userId} = useSelector((state)=> state.auth.auth);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [users, setUsers] = useState([]); 
    const [currentLimit] = useState(3); 
    const {data, isSuccess, isLoading, isError} = useGetAllInvestRequestQuery({page: currentPage, limit: currentLimit});
    useEffect(()=>{
        if(isSuccess && !isError && !isLoading){
        if(data && data?.users?.length > 0){  
            if(users.length === 0 && currentPage === 1){
            setCurrentPage(()=> data?.currentPage);
            setTotalPage(()=> data?.pages);
            setUsers(()=> data?.users);
            }else{
            if(data.currentPage === currentPage){
                setCurrentPage(()=> data?.currentPage);
                setTotalPage(()=> data?.pages);
                setUsers(()=> data?.users);
            }
            }
        }
        }
    },[data, isSuccess, isError, isLoading, currentPage]) 

    const [debounceConfirmLoading, setDebounceConfirmLoading] = useState(false);
    const [debounceFinishLoading, setDebounceFinishLoading] = useState(false);
    const [debounceBlockLoading, setDebounceBlockLoading] = useState(false);
    const [debounceCancelLoading, setDebounceCancelLoading] = useState(false);
    const [cancelId, setCancelId] = useState('');
    const [confirmId, setConfirmId] = useState('');
    const [finishId, setFinishId] = useState('');
    const [blockId, setBlockId] = useState(''); 

    
    const [provideCancelId, {isLoading: cancelIsLoading}] = useDeleteSingleInvestRequestMutation();
    const [provideBlockId, {isLoading: blockIsLoading}] = useBlockSingleInvestRequestMutation();
    let [provideConfirmIdAndUserId,{ isLoading: confirmIsLoading}] = useConfirmSingleInvestRequestMutation();
    let [provideFinishIdAndUserId,{ isLoading: finishIsLoading}] = useFinishSingleInvestRequestMutation();
    
    const handleCancelSingleRequest = (id) => {
            setDebounceCancelLoading(()=> false);
            provideCancelId({id});
    };

    const handleBlockSingleRequest = (id, userId) => {
            setDebounceBlockLoading(()=> false);
            provideBlockId({id, userId});
    };
    
    const handleConfirmSingleRequest = (id, userId) => {
            setDebounceConfirmLoading(()=> false);
            provideConfirmIdAndUserId({id, userId});
    };

    const handleFinishSingleRequest = (id, userId) => {
        setDebounceFinishLoading(()=> false);
        provideFinishIdAndUserId({id, userId});
};

    const confirmDebounce = _.debounce(handleConfirmSingleRequest, 1000);
    const finishDebounce = _.debounce(handleFinishSingleRequest, 1000);
    const blockDebounce = _.debounce(handleBlockSingleRequest, 1000);
    const cancelDebounce = _.debounce(handleCancelSingleRequest, 1000);

    const handleCancelSingleRequestFirst = (id) => {
        let result = window.confirm('Are you sure to cancel this request?');
        if(id && result){ 
            setCancelId(()=> id);
            setDebounceCancelLoading(()=> true);
            cancelDebounce(id);
        }
    };

    const handleBlockSingleRequestFirst = (id, userId) => {
        let result = window.confirm('Are you sure to block this user?');
        if(id && result && userId){
            setBlockId(()=> id);
            setDebounceBlockLoading(()=> true)
            blockDebounce(id, userId)
        }
    };
    
    const handleConfirmSingleRequestFirst = (id, userId) => {
        let result = window.confirm('Are you sure to confirm this request?');
        if(id && result && userId){
            setConfirmId(()=> id);
            setDebounceConfirmLoading(()=> true);
            confirmDebounce(id, userId);
        }
    };

    const handleFinishSingleRequestFirst = (id, userId) => {
        let result = window.confirm('Are you sure to finish this request?');
        if(id && result && userId){
            setFinishId(()=> id);
            setDebounceFinishLoading(()=> true);
            finishDebounce(id, userId);
        }
    };

    return (
        <Box>
            {isSuccess && data && data.users.length && users && users.length ?

                <Table>
                    <Thead>
                        <Tr>
                            <Td>User Id</Td>
                            <Td>Amount</Td>
                            <Td>Duration</Td>
                            <Td>Profit</Td>
                            <Td>Status</Td>
                            <Td>Actions</Td>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            users.map((info, index)=> {
                                return  <Tr key={index}>
                                            <Td>{info.userId}</Td>
                                            <Td>{info.amount} $</Td>
                                            <Td>{info.duration} Days</Td>
                                            <Td>{info.profit} $</Td>
                                            <Td>{info.status}</Td>
                                            <Td>
                                                <Button  
                                                    colorScheme='orange'
                                                    onClick={()=> handleCancelSingleRequestFirst(info.id)}
                                                    size={'xs'}
                                                    isLoading={cancelId === info.id && cancelIsLoading || cancelId === info.id && debounceCancelLoading}
                                                >Cancel</Button> 
                                                <Button  
                                                    colorScheme='red' 
                                                    ml='1'
                                                    onClick={()=> handleBlockSingleRequestFirst(info.id, userId)}
                                                    size={'xs'}
                                                    isLoading={blockId === info.id && blockIsLoading || debounceBlockLoading && blockId === info.id}
                                                >BLOCK</Button> 
                                                <Button 
                                                    colorScheme='green'
                                                    ml='1'
                                                    onClick={()=> handleConfirmSingleRequestFirst(info.id, userId)}
                                                    size={'xs'}
                                                    isLoading={confirmId === info.id && confirmIsLoading || confirmId === info.id && debounceConfirmLoading}
                                                >Confirm</Button> 
                                                <Button 
                                                    colorScheme='green'
                                                    ml='1'
                                                    onClick={()=> handleFinishSingleRequestFirst(info.id, userId)}
                                                    size={'xs'}
                                                    isLoading={finishId === info.id && finishIsLoading || finishId === info.id && debounceFinishLoading}
                                                >Finish</Button> 
                                            </Td>
                                        </Tr>
                            })
                        }
                    </Tbody>
                </Table>

                :

                ""
            }
            {
                isSuccess && data && totalPage > 1 ? 
                <Box 
                    mt='5'
                    display={'flex'}
                    justifyContent={'flex-end'}
                >
                    <Button 
                        isDisabled={currentPage === 1} 
                        size='sm' 
                        colorScheme='green' 
                        onClick={()=> setCurrentPage((prevPage)=> prevPage - 1)}
                    >Prev</Button>
                    <Button
                        size={'sm'}
                        ml='10px'
                    >{totalPage} of {currentPage}</Button>
                    <Button 
                        isDisabled={totalPage === currentPage} 
                        size='sm' 
                        colorScheme='green' 
                        ml='10px'
                        onClick={()=> setCurrentPage((prevPage)=> prevPage + 1)}
                    >Next</Button>
                </Box>
            : ''
            }
        </Box>
    )
}

const InvestSystemPage = () => {
    const [showForm, setShowForm] = useState(true);
    return (
        <Box className='default__page__background i__1 white'>
            <Box className='dashboard__page__container'>
                <SidebarProfileComponent/>
                <Box 
                    className='content__container'
                >       
                {
                    showForm ? <InvestSystem setShowForm={setShowForm}/> : <InvestSystemTable setShowForm={setShowForm}/>
                }
                </Box>
            </Box>
        </Box>
    )
}
export default InvestSystemPage;