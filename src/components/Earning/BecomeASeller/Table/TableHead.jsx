import { Td, Thead, Tr } from '@chakra-ui/react';
import React from 'react';

const TableHead = () => {
    return (
        <Thead>
            <Tr>
                <Td>Status</Td>
                <Td>Designation</Td>
                <Td>Name</Td>
                <Td>Email</Td> 
                <Td>NID Number</Td> 
                <Td>NID Link</Td> 
                <Td>BIRTH</Td> 
                <Td>Action</Td> 
            </Tr>
        </Thead>
    );
};

export default TableHead;