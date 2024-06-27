import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react';
import React from 'react';

const ShowInformationContainer = ({informationResult}) => {
    
    return (
        <Box className='dashboard__container__items'>
            <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                    defaultValue={informationResult.name || ''}
                    isDisabled
                ></Input>
            </FormControl>
            <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                    defaultValue={informationResult.email || ''}
                    isDisabled
                ></Input>
            </FormControl>
            <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input
                    defaultValue={informationResult.phone || ''}
                    isDisabled
                ></Input>
            </FormControl>
            <FormControl>
                <FormLabel>UserId</FormLabel>
                <Input
                    defaultValue={informationResult.userId || ''}
                    isDisabled
                ></Input>
            </FormControl>
            <FormControl>
                <FormLabel>Designation</FormLabel>
                <Input
                    defaultValue={informationResult.designation || ''}
                    isDisabled
                ></Input>
            </FormControl>
            <FormControl>
                <FormLabel>Balance</FormLabel>
                <Input
                    defaultValue={informationResult.realBalance || ''}
                    isDisabled
                ></Input>
            </FormControl>
            <FormControl>
                <FormLabel>Referral Code</FormLabel>
                <Input
                    defaultValue={informationResult.referralCode || ''}
                    isDisabled
                ></Input>
            </FormControl>
        </Box>
    );
};

export default ShowInformationContainer;