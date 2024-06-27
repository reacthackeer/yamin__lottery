import { Button, HStack } from '@chakra-ui/react';
import React from 'react';

const LotteryBuyType = ({setFormType, formType}) => {
    return (
            <HStack  

            >
                <Button
                    onClick={()=> setFormType(()=> 'myself')}
                    colorScheme={formType === 'myself' ? 'blue' : "gray"}
                    width={'50%'}
                >
                    Myself
                </Button>
                <Button
                    onClick={()=> setFormType(()=> 'other')}
                    colorScheme={formType === 'other' ? 'blue' : "gray"}
                    width={'50%'}
                >
                    Other
                </Button> 
            </HStack>
    );
};

export default LotteryBuyType;