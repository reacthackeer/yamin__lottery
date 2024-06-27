import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AccountLinkBar = () => {
    const {role, designation} = useSelector((state)=> state.auth.auth);
    const [currentLink, setCurrentLink] = useState('');
    useEffect(()=>{ 
        setCurrentLink(()=> window.location.pathname.split('/')[2]);
    },[]);
    return (
        <Box className='link__item__container'>
            <Link className={`link__item ${currentLink === 'dashboard' && 'current__link'}`} to='/account/dashboard'>Dashboard</Link>
            <Link className={`link__item ${currentLink === 'information' && 'current__link'}`} to='/account/information'>Information</Link> 
            <Link className={`link__item ${currentLink === 'address' && 'current__link'}`} to='/account/address'>address</Link>
            {role === 1 && designation === 'admin' ?  <Link className={`link__item ${currentLink === 'users' && 'current__link'}`} to='/account/users'>users</Link> : ''}
            {role === 1 && designation === 'admin' ?  <Link className={`link__item ${currentLink === 'admin' && 'current__link'}`} to='/account/admin'>Admin</Link> : ''} 
            {role === 1 && designation === 'admin' ?  <Link className={`link__item ${currentLink === 'super-admin' && 'current__link'}`} to='/account/super-admin'>Super Admin</Link>  : ''} 
            {role === 1 && designation === 'admin' ?  <Link className={`link__item ${currentLink === 'master-admin' && 'current__link'}`} to='/account/master-admin'>Master Admin</Link>  : ''}
            {role === 1 && designation === 'admin' ?  <Link className={`link__item ${currentLink === 'local-admin' && 'current__link'}`} to='/account/local-admin'>Local Admin</Link>  : ''}
            {role === 1 && designation === 'admin' ?  <Link className={`link__item ${currentLink === 'seller' && 'current__link'}`} to='/account/seller'>Seller</Link> : ''}
            {role === 1 && designation === 'admin' ?  <Link className={`link__item ${currentLink === 'publisher' && 'current__link'}`} to='/account/publisher'>Publisher</Link> : ''}
            {role === 1 && designation === 'admin' ?  <Link className={`link__item ${currentLink === 'peddler' && 'current__link'}`} to='/account/peddler'>Peddler</Link> : ''}
            {role === 1 && designation === 'admin' ?  <Link className={`link__item ${currentLink === 'partner' && 'current__link'}`} to='/account/partner'>Partner</Link> : ''}
        </Box>
    );
};

export default AccountLinkBar;