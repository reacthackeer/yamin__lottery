import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SettingsLinkBar = () => {
    const {role, designation} = useSelector((state)=> state.auth.auth);
    const [currentLink, setCurrentLink] = useState('');
    useEffect(()=>{ 
        setCurrentLink(()=> window.location.pathname.split('/')[2]);
    },[]);
    return (
        <Box className='link__item__container'>
            <Link className={`link__item ${currentLink === 'deposit' && 'current__link'}`}    to='/settings/deposit'>Deposit</Link>
            <Link className={`link__item ${currentLink === 'withdrawal' && 'current__link'}`} to='/settings/withdrawal'>Withdrawal</Link>
            <Link className={`link__item ${currentLink === 'transfer-earning' && 'current__link'}`} to='/settings/transfer-earning'>Transfer earning</Link> 
            <Link className={`link__item ${currentLink === 'balance-transfer' && 'current__link'}`} to='/settings/balance-transfer'>Balance Transfer</Link>
            <Link className={`link__item ${currentLink === 'backup-password' && 'current__link'}`} to='/settings/backup-password'>Backup Password</Link>
            <Link className={`link__item ${currentLink === 'update-password' && 'current__link'}`} to='/settings/update-password'>Update password</Link>  

            {role === 1 && designation === 'admin' ?  <Link className={`link__item ${currentLink === 'add-currency' && 'current__link'}`}    to='/settings/add-currency'>Add Currency</Link> : '' }
            {role === 1 && designation === 'admin' ?  <Link className={`link__item ${currentLink === 'add-system-lottery' && 'current__link'}`}    to='/settings/add-system-lottery'>Add Lottery</Link> : '' }
            {role === 1 && designation === 'admin' ?  <Link className={`link__item ${currentLink === 'add-wallet' && 'current__link'}`}    to='/settings/add-wallet'>Add Wallet</Link> : '' }
            {role === 1 && designation === 'admin' ?  <Link className={`link__item ${currentLink === 'add-coupon' && 'current__link'}`}    to='/settings/add-coupon'>Add Coupon</Link> : '' }
            {role === 1 && designation === 'admin' ?  <Link className={`link__item ${currentLink === 'deposit-request' && 'current__link'}`}    to='/settings/deposit-request'>Deposit Request</Link> : '' }
            {role === 1 && designation === 'admin' ?  <Link className={`link__item ${currentLink === 'withdrawal-request' && 'current__link'}`} to='/settings/withdrawal-request'>Withdrawal Request</Link> : '' }
        </Box>
    );
};

export default SettingsLinkBar;