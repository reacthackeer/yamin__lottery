import { Box, Button, Table, Tbody } from '@chakra-ui/react';
import React from 'react';
import { useGetAllAdminApplicationQuery } from '../../../Store/feature/auth/api';
import SidebarProfileComponent from '../../Private/SidebarProfileComponent';
import TableHead from './Table/TableHead';
import TableRow from './Table/TableRow';

const UserTable = ({setShowForm, adminType}) => {
    let {data, isSuccess, isError} = useGetAllAdminApplicationQuery(adminType)
    
    return (
        <Box className='default__page__background i__1 white'>
            <Box className='dashboard__page__container'>
                <SidebarProfileComponent/>
                <Box 
                    className='content__container'
                >        
                    {   isSuccess && !isError && data && data.length > 0 &&
                        <Box className='content__data__view__table__container'>
                            <Table width={'1400px'}>
                                <TableHead/>
                                <Tbody>
                                    {
                                        data.map((info, index) => { 
                                                return <TableRow key={index} info={info}/>
                                        })
                                    }
                                </Tbody>
                            </Table>
                        </Box>
                    }
                    <Box
                        display={'flex'}
                        justifyContent={'flex-end'} 
                    >   
                        <Button 
                            mt='2'
                            colorScheme='yellow'
                            onClick={()=> setShowForm(()=> true)}
                        >
                            Show form
                        </Button> 
                    </Box>  
                </Box>
            </Box>
        </Box>
    );
};

export default UserTable;