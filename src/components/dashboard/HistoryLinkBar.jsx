import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HistoryLinkBar = () => {
    const [currentLink, setCurrentLink] = useState('');
    useEffect(()=>{ 
        setCurrentLink(()=> window.location.pathname.split('/')[2]);
    },[]);
    return (
        <Box className='link__item__container'>
            <Link className={`link__item ${currentLink === 'transaction-history' && 'current__link'}`} to='/history/transaction-history'>Transaction history</Link>
            <Link className={`link__item ${currentLink === 'earning-history' && 'current__link'}`} to='/history/earning-history'>Earning history</Link>
            <Link className={`link__item ${currentLink === 'deposit-history' && 'current__link'}`} to='/history/deposit-history'>Deposit history</Link>
            <Link className={`link__item ${currentLink === 'withdrawal-history' && 'current__link'}`} to='/history/withdrawal-history'>Withdrawal history</Link>
            <Link className={`link__item ${currentLink === 'transfer-history' && 'current__link'}`} to='/history/transfer-history'>Transfer history</Link>
            <Link className={`link__item ${currentLink === 'lottery-history' && 'current__link'}`} to='/history/lottery-history'>Lottery history</Link>
            <Link className={`link__item ${currentLink === 'buying-history' && 'current__link'}`} to='/history/buying-history'>Buying history</Link>
        </Box>
    );
};

export default HistoryLinkBar;