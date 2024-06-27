import { Box, Button, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetAllSingleUserDepositHistoryQuery } from '../../Store/feature/lottery/api';
import SidebarProfileComponent from '../../components/Private/SidebarProfileComponent';
import '../../style/dashboardStyle.scss';
import '../../style/defaultPageBackground.scss';



const SingleUserRow = ({userInfo}) => {
    return (
        <Tr>  
            <Td>{userInfo.txrId}</Td>
            <Td>{userInfo.isIn}</Td>
            <Td>{userInfo.typeName}</Td>
            <Td>{userInfo.sourceId}</Td> 
            <Td>{userInfo.used}</Td>  
            <Td>{Number(userInfo.amount).toFixed(1)} $</Td>  
        </Tr>
    )
}



const DepositHistory = () => { 
    const {userId} = useSelector((state)=> state.auth.auth);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [users, setUsers] = useState([{id: 1, date: '30/12/2024', type: "Lottery", amount: '1', status: 'success', phone: '+8801333333333', number: '838393949302'}]); 
    const [currentLimit] = useState(10); 
    const {data, isSuccess, isLoading, isError} = useGetAllSingleUserDepositHistoryQuery({userId, page: currentPage, limit: currentLimit});
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
    

    

    return (
        <Box className='default__page__background i__1 white'>
            <Box className='dashboard__page__container'>
                <SidebarProfileComponent/>
                <Box 
                    className='content__container'
                >      
                {
                    isSuccess && data && users && users.length > 0
                ?
                <Box className='content__data__view__table__container'>
                    <Table width={'1000px'}>
                        <Thead>
                            <Tr>  
                                <Th>TxrId</Th>
                                <Th>IsIn</Th>
                                <Th>Type</Th>
                                <Th>SourceId</Th>
                                <Th>Used</Th>
                                <Th>Amount</Th> 
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                users.map((info, index) => {
                                    return <SingleUserRow key={index} userInfo={info}></SingleUserRow>
                                })
                            }
                        </Tbody>
                    </Table> 
                </Box>
                : 
                
                ''}
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
            </Box>
        </Box>
    );
};

export default DepositHistory;