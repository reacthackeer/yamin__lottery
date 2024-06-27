import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const ShowInformationContainer = ({informationResult}) => {
    const [results, setResults] = useState([]);

    useEffect(()=>{
        let newResults = [];
        for(var info in informationResult){ 
            newResults.push({name: info, value: informationResult[info]})
        } 
        setResults(()=> newResults);
    },[]);  
    return (
        <Box className='dashboard__container__items'>
            {
                results.map((info, index)=>{
                    return <Box key={index} className='single__result__item input__box'>
                                <FormControl mb={4}>
                                    <FormLabel>{info.name.split('_').join(' ').toUpperCase()}</FormLabel>
                                        <Input 
                                            type='text'
                                            value={info.value}   
                                            isDisabled={true}
                                        />
                                </FormControl>
                            </Box>
                })
            }
        </Box>
    );
};

export default ShowInformationContainer;