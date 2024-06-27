import { Button, HStack } from '@chakra-ui/react';
import React from 'react';

const AccountTypeComponent = ({setFormType, formType}) => {
    return (
            <HStack  

            >
                <Button
                    onClick={()=> setFormType(()=> 'information')}
                    colorScheme={formType === 'information' ? 'blue' : "gray"}
                    width={'50%'}
                >
                    Information
                </Button>
                <Button
                    onClick={()=> setFormType(()=> 'address')}
                    colorScheme={formType === 'address' ? 'blue' : "gray"}
                    width={'50%'}
                >
                    Address
                </Button> 
            </HStack>
    );
};

export default AccountTypeComponent;