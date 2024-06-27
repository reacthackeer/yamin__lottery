import { Box, Button, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UsersContainer = ({users}) => {
    const [numberIndex, setNumberIndex] = useState('');
    const navigate = useNavigate();
    return (
        <Box className='dashboard__container__items'>
            {
                users.map((info, index)=>{
                    return <Box key={index} className='single__result__item' style={{padding: '10px'}}> 
                                    <Box 
                                        onClick={()=> setNumberIndex(index)}
                                    > 
                                        <Text><b>Name:</b> {info.name}, <b>Country:</b> {info.country}, <b>Lottery:</b> {info.lottery}, <b>Earning:</b> {info.earning}, <b>Cost:</b> {info.cost}</Text>  
                                        {
                                            numberIndex === index &&
                                        <Box 
                                            display={'flex'} 
                                            justifyContent={'space-between'}
                                            mt='2'
                                        >
                                            <Button
                                                size={'xs'}
                                                colorScheme='yellow'
                                            >Update</Button>
                                            <Button
                                                size={'xs'}
                                                colorScheme='green'
                                            >Profile</Button>
                                            <Button
                                                size={'xs'}
                                                colorScheme='red'
                                                onClick={()=> setNumberIndex(()=> '')}
                                            >cancel</Button>
                                            <Button
                                                size={'xs'}
                                                colorScheme='red'
                                            >Block</Button>
                                        </Box>
                                    }
                                    </Box> 
                            </Box>
                })
            }
        </Box>
    );
};

export default UsersContainer;