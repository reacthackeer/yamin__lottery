import { Box, Button, HStack, Input, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import SidebarProfileComponent from '../../components/Private/SidebarProfileComponent';

import { useNavigate } from 'react-router-dom';
import { useBlockSingleUserMutation, useCancelSingleUserMutation, useGetAllUsersQuery } from '../../Store/feature/auth/api';
import '../../style/dashboardStyle.scss';
import '../../style/defaultPageBackground.scss';


const TableRow = ({userInfo}) => {

    const navigate = useNavigate();
    const [provideBlockId] = useBlockSingleUserMutation();
    const [provideCancelId] = useCancelSingleUserMutation();
    const handleBlockSingleUser = () => {
        provideBlockId(userInfo.id);
    }

    const handleCancelSingleUser = () => {
        provideCancelId(userInfo.id);
    }

    return (
        <Tr>    
                <Td>{userInfo.name}</Td>
                <Td>{userInfo.email}</Td>
                <Td>{userInfo.phone}</Td>
                <Td>{userInfo.userId}</Td>
                <Td> 
                    <Button
                        size={'xs'}
                        colorScheme='green'
                        mr={'1'}
                        onClick={()=> navigate('/view/profile')}
                    >Profile</Button>
                    <Button
                        size={'xs'}
                        colorScheme='red'
                        mr={'1'}
                        onClick={handleCancelSingleUser}
                    >cancel</Button>
                    <Button
                        size={'xs'}
                        colorScheme='red'
                        mr={'1'}
                        onClick={handleBlockSingleUser}
                    >Block</Button>
                </Td>
        </Tr>
    )
}

const MasterAdmin = () => { 

    const [userStatus, setUserStatus] = useState('all');
    const [filterInfo, setFilterInfo] = useState({
        email: '',
        phone: '',
        userId: '',
        referralCode: '',
    });
    const [filterItem, setFilterItem] = useState('email')
    



    const handleChange = (e) => {
        let {name, value} = e.target;
        let newInfo = {...filterInfo};
            newInfo[name]=value;
            setFilterInfo(()=> newInfo);
    }
    const [whereInfo, setWhereInfo] = useState('&designation=masterAdmin')
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [users, setUsers] = useState([]); 

    const [currentLimit] = useState(2); 

    useEffect(()=> {
        const conditionObject = {designation: 'masterAdmin'};
        if(userStatus){
            if(userStatus === 'all'){

            } else if (userStatus === 'filter'){

            } else {
                conditionObject[userStatus] = 'true';
            }

        }
        for(var item in filterInfo){
            let info = filterInfo[item];
            if(info){
                conditionObject[item] = info; 
            }
        }  
        let strArray = [];
        for(var infoItem in conditionObject){
            strArray.push(`&${infoItem}=${conditionObject[infoItem]}`)
        } 
        setWhereInfo(()=> strArray.join(''));
    }, [filterInfo, userStatus])

    const {data, isSuccess, isLoading, isError} = useGetAllUsersQuery({moreStr: whereInfo, page: currentPage, limit: currentLimit})

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
                
                    <HStack  
                        justifyContent={'space-between'}
                        alignItems={'center'} 
                    >
                    {
                        userStatus !== 'filter' ? 
                        
                        <HStack
                            mb='2'
                        >
                            <Button
                                colorScheme={userStatus === 'all' ? 'blue': 'gray'}
                                onClick={()=> setUserStatus(()=> 'all')}
                                size={'xs'}
                            >All</Button> 
                            <Button
                                colorScheme={userStatus === 'winner' ? 'blue': 'gray'}
                                onClick={()=> setUserStatus(()=> 'winner')}
                                size={'xs'}
                            >Winner</Button> 
                            <Button
                                colorScheme={userStatus === 'verified' ? 'blue': 'gray'}
                                onClick={()=> setUserStatus(()=> 'verified')}
                                size={'xs'}
                            >Verified</Button> 
                            <Button
                                colorScheme={userStatus === 'block' ? 'blue': 'gray'}
                                onClick={()=> setUserStatus(()=> 'block')}
                                size={'xs'}
                            >Blocked</Button> 
                            <Button
                                colorScheme={userStatus === 'filter' ? 'blue': 'gray'}
                                onClick={()=> setUserStatus(()=> 'filter')}
                                size={'xs'}
                            >Filter</Button>
                        </HStack>
                        :
                        <HStack
                            mb='2'
                        >
                            <Button
                                colorScheme={filterItem === 'email' ? 'blue': 'gray'}
                                onClick={()=> setFilterItem(()=> 'email')}
                                size={'xs'}
                            >Email</Button> 
                            <Button
                                colorScheme={filterItem === 'phone' ? 'blue': 'gray'}
                                onClick={()=> setFilterItem(()=> 'phone')}
                                size={'xs'}
                            >Phone</Button> 
                            <Button
                                colorScheme={filterItem === 'userId' ? 'blue': 'gray'}
                                onClick={()=> setFilterItem(()=> 'userId')}
                                size={'xs'}
                            >User ID</Button>  
                            <Button
                                colorScheme={filterItem === 'referralCode' ? 'blue': 'gray'}
                                onClick={()=> setFilterItem(()=> 'referralCode')}
                                size={'xs'}
                            >Referral Code</Button>  
                            <Button
                                colorScheme={'yellow'}
                                onClick={()=> setUserStatus(()=> 'all')}
                                size={'xs'}
                            >Cancel</Button>
                        </HStack>
                    }
                    {
                        userStatus === 'filter' &&
                        <Box
                            position={'relative'}
                            width={'100%'} 
                            mt='-2'
                        >
                            {filterItem === 'email' && <Input placeholder='Enter email'  size={'xs'} name='email' onChange={handleChange}></Input>}
                            {filterItem === 'phone' && <Input placeholder='Enter phone'  size={'xs'} name='phone' onChange={handleChange}></Input>}
                            {filterItem === 'userId' && <Input placeholder='Enter userId'  size={'xs'} name='userId' onChange={handleChange}></Input>}
                            {filterItem === 'referralCode' && <Input placeholder='Enter referral code'  size={'xs'} name='referralCode' onChange={handleChange}></Input>}
                        </Box>
                    }
                    </HStack> 
                    {
                        isSuccess && data && users && users.length ?

                        <Table>
                            <Thead>
                                <Tr>  
                                    <Th>Name</Th>
                                    <Th>Email</Th>
                                    <Th>Phone</Th>
                                    <Th>UserId</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody> 
                                {
                                    users.map((info, index) => <TableRow key={index} userInfo={info}></TableRow>)
                                }
                            </Tbody>
                        </Table> 

                        : ''
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
            </Box>
        </Box>
    );
};

export default MasterAdmin;

