import { Box, Button, Table, Tbody, Td, Thead, Tr } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useState } from 'react';
import { useBlockSingleDepositRequestMutation, useConfirmSingleDepositRequestMutation, useDeleteSingleDepositRequestMutation, useGetAllDepositRequestQuery } from '../../Store/feature/depositRequest/api';
import SidebarProfileComponent from '../../components/Private/SidebarProfileComponent';
import '../../style/dashboardStyle.scss';
import '../../style/defaultPageBackground.scss';
const DepositRequest = () => { 
    const {data: prevWalletData, isSuccess: prevWalletIsSuccess} = useGetAllDepositRequestQuery(); 
    
    const [debounceConfirmLoading, setDebounceConfirmLoading] = useState(false);
    const [debounceBlockLoading, setDebounceBlockLoading] = useState(false);
    const [debounceCancelLoading, setDebounceCancelLoading] = useState(false);
    const [cancelId, setCancelId] = useState('');
    const [confirmId, setConfirmId] = useState('');
    const [blockId, setBlockId] = useState(''); 

    
    const [provideCancelId, {isLoading: cancelIsLoading}] = useDeleteSingleDepositRequestMutation();
    const [provideBlockId, {isLoading: blockIsLoading}] = useBlockSingleDepositRequestMutation();
    let [provideConfirmIdAndUserId,{ isLoading: confirmIsLoading}] = useConfirmSingleDepositRequestMutation();
    
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

    const confirmDebounce = _.debounce(handleConfirmSingleRequest, 1000);
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
    
    return (
        <Box className='default__page__background i__3 white'>
            <Box className='dashboard__page__container'>
                <SidebarProfileComponent/>
                <Box 
                    className='content__container' 
                >       
                    {
                        prevWalletIsSuccess && prevWalletData && prevWalletData.length > 0 ?
                    <Box className='content__data__view__table__container'>
                        <Table width={'1400px'}>
                            <Thead>
                                <Tr>
                                    <Td>Wallet</Td> 
                                    <Td>IdType</Td>  
                                    <Td>Account</Td> 
                                    <Td>Amount</Td> 
                                    <Td>Currency</Td> 
                                    <Td>Referrance</Td> 
                                    <Td>UserId</Td> 
                                    <Td>Actions</Td> 
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    prevWalletData.map((info, index) => {
                                        return <Tr key={index}>
                                                    <Td>{info.wallet}</Td>
                                                    <Td>{info.idType}</Td>
                                                    <Td>{info.account}</Td>
                                                    <Td>{info.amount}</Td>
                                                    <Td>{info.currency}</Td>
                                                    <Td>{info.referrance}</Td>
                                                    <Td>{info.userId}</Td>
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
                                                            onClick={()=> handleBlockSingleRequestFirst(info.id, info.userId)}
                                                            size={'xs'}
                                                            isLoading={blockId === info.id && blockIsLoading || debounceBlockLoading && blockId === info.id}
                                                        >BLOCK</Button> 
                                                        <Button 
                                                            colorScheme='green'
                                                            ml='1'
                                                            onClick={()=> handleConfirmSingleRequestFirst(info.id, info.userId)}
                                                            size={'xs'}
                                                            isLoading={confirmId === info.id && confirmIsLoading || confirmId === info.id && debounceConfirmLoading}
                                                        >Confirm</Button> 
                                                    </Td>
                                                </Tr>
                                    })
                                }
                            </Tbody>
                        </Table>
                    </Box>
                    :
                    ''
                    }
                </Box>
            </Box>
        </Box>
    );
};

export default DepositRequest;