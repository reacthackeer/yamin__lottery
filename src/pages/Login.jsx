import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginFormComponent from '../components/login/LoginFormComponents';
import '../style/defaultPageBackground.scss';
const Login = () => { 

    let authInfo = useSelector((state)=> state.auth);
    let {isLoggedIn, authChecked, auth} = authInfo;
    const navigate = useNavigate();
    useEffect(()=>{   
        if(isLoggedIn && authChecked && auth && auth?.tokenId){
            navigate('/account/dashboard');
        }
    },[authInfo, navigate])

    return (
        <Box className='default__page__background i__1 white'>
            <Box className='page__container'>
                <Box 
                    minW={'300px'}
                    maxW={'450px'}
                > 
                    <LoginFormComponent/>
                </Box>
            </Box>
        </Box>
    );
};

export default Login;