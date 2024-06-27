import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import SidebarProfileComponent from '../../components/Private/SidebarProfileComponent';
import '../../style/dashboardStyle.scss';
import '../../style/defaultPageBackground.scss';
const SettingsUpdatePassword = () => { 
    const [information, setInformation] = useState({
        oldPassword: ``, 
        newPassword: '',
        confirmNewPassword: '', 
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInformation((prevData) => ({ ...prevData, [name]: value }));
    };
    return (
        <Box className='default__page__background i__1 white'>
            <Box className='dashboard__page__container'>
                <SidebarProfileComponent/>
                <form 
                    className='content__container'
                >      
                    <Box className='dashboard__container__items'>
                        <Box  className='single__result__item input__box'>
                            <FormControl>
                                <FormLabel>Old Password</FormLabel>
                                <Input
                                    type='password'
                                    placeholder='Enter old password'
                                    name='oldPassword'
                                    onChange={handleChange}
                                    required
                                /> 
                            </FormControl>
                        </Box> 
                        <Box  className='single__result__item input__box'>
                            <FormControl>
                                <FormLabel>New Password</FormLabel>
                                <Input
                                    type='password'
                                    placeholder='Enter old password'
                                    name='newPassword'
                                    onChange={handleChange}
                                    required
                                /> 
                            </FormControl>
                        </Box> 
                        <Box  className='single__result__item input__box'>
                            <FormControl>
                                <FormLabel>Confirm New Password</FormLabel>
                                <Input
                                    type='password'
                                    placeholder='Enter old password'
                                    name='confirmNewPassword'
                                    onChange={handleChange}
                                    required
                                /> 
                            </FormControl>
                        </Box> 
                    </Box>
                    <Box 
                        display={'flex'}
                        justifyContent={'flex-end'}
                    >
                        <Button
                            type='submit'
                            colorScheme='green'
                        >Update</Button>
                    </Box>
                </form>
            </Box>
        </Box>
    );
};

export default SettingsUpdatePassword;