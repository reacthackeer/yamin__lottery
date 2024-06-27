import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const EarningLinkBar = () => {
    const {role, designation} = useSelector((state)=> state.auth.auth);
    const [currentLink, setCurrentLink] = useState('');
    useEffect(()=>{ 
        setCurrentLink(()=> window.location.pathname.split('/')[2]);
    },[]);
    return (
        <Box className='link__item__container'>
            <Link className={`link__item ${currentLink === 'buy-a-lottery' && 'current__link'}`} to='/earning/buy-a-lottery'>Buy a lottery</Link> 
            <Link className={`link__item ${currentLink === 'check-lottery' && 'current__link'}`} to='/earning/check-lottery'>Check Lottery</Link>
            <Link className={`link__item ${currentLink === 'invest-system' && 'current__link'}`} to='/earning/invest-system'>Invest System</Link>
            <Link className={`link__item ${currentLink === 'become-a-seller' && 'current__link'}`} to='/earning/become-a-seller'>Become a seller</Link>
            <Link className={`link__item ${currentLink === 'become-a-peddler' && 'current__link'}`} to='/earning/become-a-peddler'>Become a peddler</Link> 
            <Link className={`link__item ${currentLink === 'become-a-publisher' && 'current__link'}`} to='/earning/become-a-publisher'>Become a publisher</Link>
            { role <= 5 ? <Link className={`link__item ${currentLink === 'become-a-admin' && 'current__link'}`} to='/earning/become-a-admin'>Become a admin</Link> : ''}
            { role <= 5 ? <Link className={`link__item ${currentLink === 'become-a-local-agent' && 'current__link'}`} to='/earning/become-a-local-agent'>Become a local agent</Link> : ''}
            { role <= 5 ? <Link className={`link__item ${currentLink === 'become-a-master-agent' && 'current__link'}`} to='/earning/become-a-master-agent'>Become a master agent</Link> : ''}
            { role <= 5 ? <Link className={`link__item ${currentLink === 'become-a-super-agent' && 'current__link'}`} to='/earning/become-a-super-agent'>Become a super agent</Link> : ''}
            { role <= 5 ? <Link className={`link__item ${currentLink === 'become-a-partner' && 'current__link'}`} to='/earning/become-a-partner'>Become a partner</Link>  : ''}
        </Box>
    );
};

export default EarningLinkBar;