import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useChangePasswordMutation } from '../../Store/feature/auth/api';
import { setUserLoggedOut } from '../../Store/feature/auth/authSlice';
import SidebarProfileComponent from '../../components/Private/SidebarProfileComponent';
import '../../style/dashboardStyle.scss';
import '../../style/defaultPageBackground.scss';
const SettingsUpdatePassword = () => { 
    const [information, setInformation] = useState({
        oldPassword: ``, 
        newPassword: '',
        confirmNewPassword: '', 
    });
    const navigate = useNavigate();

    const [providePasswordInfo, {data, isLoading, isError, isSuccess, error}] = useChangePasswordMutation();
    const {auth} = useSelector((state)=> state.auth);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInformation((prevData) => ({ ...prevData, [name]: value }));
    };
    const toast = useToast();
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault(); 
        let {newPassword, oldPassword, confirmNewPassword} = information;
        if(newPassword && oldPassword && confirmNewPassword){
            if(newPassword === confirmNewPassword){
                if(newPassword !== oldPassword){
                    let postInfo = {password: newPassword, oldPassword, userId: auth.userId};
                    providePasswordInfo(postInfo);
                }else{
                    toast({
                        status: 'error', 
                        title: 'Old Password and New Password must be different!', 
                        duration: 3000, 
                        position: 'top-right',
                        isClosable: true
                    })
                }
            }else{ 
                toast({
                    status: 'error', 
                    title: 'New Password and Confirm New Password Not Matched!', 
                    duration: 3000, 
                    position: 'top-right',
                    isClosable: true
                })
            }
        }else{
            toast({
                status: 'error', 
                title: 'Invalid request!', 
                duration: 3000, 
                position: 'top-right',
                isClosable: true
            })
        }
    }
    useEffect(()=>{ 
        if(!isError && !isLoading && isSuccess && data && data.status__code === 401){
            localStorage.removeItem('auth');
            dispatch(setUserLoggedOut());
        }
        if(isError && !isLoading && !isSuccess){
            let message = error?.data?.error?.message || 'Internal server error!';
            toast({
                status: 'error', 
                title: message, 
                duration: 3000, 
                position: 'top-right',
                isClosable: true
            }); 
        }
    },[data, isLoading, isSuccess, isError, error])
    return (
        <Box className='default__page__background i__1 white'>
            <Box className='dashboard__page__container'>
                <SidebarProfileComponent/>
                <form 
                    className='content__container'
                    onSubmit={handleSubmit}
                >      
                    <Box className='dashboard__container__items'>
                        <Box  className='single__result__item input__box'>
                            <FormControl>
                                <FormLabel>Old Password</FormLabel>
                                <Input
                                    type='password'
                                    placeholder='Enter old password'
                                    value={information.oldPassword || ''}
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
                                    value={information.newPassword || ''}
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
                                    value={information.confirmNewPassword || ''}
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