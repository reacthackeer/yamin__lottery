import { Button, Td, Tr } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useConfirmSingleAdminMutation, useDeleteSingleAdminMutation } from '../../../../Store/feature/auth/api';

const TableRow = ({info}) => { 
    const [provideAdminId, {isLoading}] = useDeleteSingleAdminMutation();
    const [provideConfirmId, {isLoading: cIsLoading}] = useConfirmSingleAdminMutation();
    const handleConfirmAdmin = () => {
        provideConfirmId(info.id);
    }
    const handleDeleteAdmin = () => { 
        provideAdminId(info.id);
    }
    return (
        <Tr>
            <Td>{info.status}</Td>
            <Td>{info.type}</Td>
            <Td>{info.name}</Td>
            <Td>{info.email}</Td>
            <Td>{info.number}</Td>
            <Td>
                <Link to={info.link} target='_blank'>Enter</Link>
            </Td>
            <Td>{info.birth}</Td>
            <Td>
                <Button 
                    onClick={handleConfirmAdmin}
                    isLoading={cIsLoading}
                    size={'xs'} colorScheme='green' mr='2'>Confirm</Button>
                <Button 
                    onClick={handleDeleteAdmin}
                    isLoading={isLoading}
                    size={'xs'} colorScheme='red'>Delete</Button>
            </Td>
        </Tr>
    );
};

export default TableRow;