import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const UpdateInformationComponents = ({informationResult, setInformationResult,setShowUpdateForm, showUpdateFrom}) => { 
    const [results, setResults] = useState([]);
    useEffect(()=>{
        let newResults = [];
        for(var info in informationResult){ 
            newResults.push({name: info, value: informationResult[info]})
        } 
        setResults(()=> newResults); 
    },[]);  

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInformation((prevData) => ({ ...prevData, [name]: value }));
    };
    return (
        <Box>

        <Box className='dashboard__container__items'>
            {
                results.map((info, index)=>{
                    return <Box key={index} className='single__result__item input__box'>
                                <FormControl mb={4}>
                                    <FormLabel>{info.name.split('_').join(' ').toUpperCase()}</FormLabel>
                                        <Input 
                                            type='text'
                                            name={info.name}
                                            value={info.value}     
                                            onChange={handleChange}
                                            required
                                        />
                                </FormControl>
                            </Box>
                })
            }
        </Box>
            
        <Box
            display={'flex'}
            justifyContent={'flex-end'}
            mb='3'
        >
            <Button 
                colorScheme='green'
                onClick={()=> setShowUpdateForm(()=> !showUpdateFrom)}
            >Save</Button>
        </Box> 
        </Box>
    );
};

export default UpdateInformationComponents;