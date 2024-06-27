import { Box, Text } from '@chakra-ui/react';
import { useState } from 'react';
    
import React from 'react';
import { Link } from 'react-router-dom';
import BackupPasswordComponent from '../../components/BackupPassword/BackupPassword';
import SidebarProfileComponent from '../../components/Private/SidebarProfileComponent';
import '../../style/dashboardStyle.scss';
import '../../style/defaultPageBackground.scss';
const AddBackupPassword = () => { 

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
        email: '',
        mainPassword: ''
    });

    return (
        <Box className='default__page__background i__1 white'>
            <Box className='dashboard__page__container'>
                <SidebarProfileComponent/>
                <Box 
                    className='content__container' 
                >       
                <Text textAlign={'justify'}>Your account is 100% safe if you setup a backup password. By setting this password, no one else can access your account. No one can withdraw money from your account. No one can change your password and you will need this backup password if you want to forget your password.</Text>
                <Text textAlign={'justify'} color={'red'} fontWeight={'bold'}>You must remember your email and backup password well or write it down somewhere if you forget your email and backup password you will lose your account forever.</Text>
                <Box mt='5'>
                    <BackupPasswordComponent 
                        formData={formData} 
                        setFormData={setFormData}
                    />
                    <Box p={5} display={'flex'} justifyContent={'flex-end'}>
                        <Link to='/profile'>Profile</Link>
                    </Box>
                </Box> 
                </Box>
            </Box>
        </Box>
    );
};

export default AddBackupPassword;