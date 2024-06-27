import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const HomePage = () => {
    let location = useLocation(); 
    useEffect(()=>{
        let searchInfo = location?.search;
        if(searchInfo){
            searchInfo = searchInfo.split('?ref=')[1];
            if(searchInfo){
                localStorage.setItem('referralCode', searchInfo);
            }
        }
    },[location])
    return (
        <div>
            <Box>
                <Link to='/account/dashboard'>dashboard</Link>
                    <Box/>
                <Link to='/winner'>Winner</Link>
                    <Box/>
                <Link to='/'>Home</Link>
                    <Box/>
                <Link to='/buy'>Buy</Link>
                    <Box/>
                <Link to='/prize'>Signup</Link>
                    <Box/>
                <Link to='/signup'>Signup</Link>
                    <Box/>
                <Link to='/login'>Login</Link>
                    <Box/>
                <Link to='/terms-and-condition'>Terms and condition</Link>
                    <Box/>
                <Link to='/refund-policy'>Refund Policy</Link>
                    <Box/>
                <Link to='/privacy-policy'>Privacy Policy</Link> 
                    <Box/>
            </Box>
        </div>
    );
};

export default HomePage;