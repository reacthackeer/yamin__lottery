import { Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../../Store/feature/auth/api';
import { setLoginUser } from '../../Store/feature/auth/authSlice';
const LoginFormComponent = () => {
    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleValidateInput = () => {
        let result = false;
        for(var item in formData){
            if(!formData[item]){
                result = true;
            }
        }
        return result;
    } 

    let [provideLoginInfo, {data, isError, isLoading, isSuccess, error}] = useLoginUserMutation();
    const handleSubmit = (e) => { 
        e.preventDefault(); 
        let {email, password} = formData;
        if(email && password){
            provideLoginInfo({email, password})
        }
    };

    const dispatch = useDispatch();
    const toast = useToast();
    const navigate = useNavigate();

    useEffect(()=> {
        if(!isError && !isLoading && isSuccess && data && data.status__code === 200){
            document.querySelectorAll('input').forEach((info)=> {
            info.value = '';
            });
            setFormData({
                email: '',
                password: ''
            });  
            
            localStorage.setItem('auth', JSON.stringify(data.userInfo))
            dispatch(setLoginUser(data.userInfo));
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
            if(message === 'User not founded'){
                navigate('/signup')
            }
        }
    }, [data, isError, isLoading, isSuccess, error, navigate])

    return (
        <form 
            onSubmit={handleSubmit}
        > 
            <FormControl 
                mb={4} 
            >
                <FormLabel>Email address</FormLabel>
                <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
                />
            </FormControl>
            <FormControl mb={4}>
                <FormLabel>Password</FormLabel>
                <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                />
            </FormControl> 
            <Button 
                isDisabled={handleValidateInput()}
                type="submit" 
                colorScheme="blue"    
                width={'100%'}
                isLoading={isLoading}
            >
                Login
            </Button>
        </form>
    );
};

export default LoginFormComponent;