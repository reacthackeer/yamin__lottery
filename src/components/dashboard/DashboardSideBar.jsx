import { Button, HStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
const DashboardSideBar = ({sidebarType, setSidebarType}) => { 
    useEffect(()=>{ 
        setSidebarType(()=> window.location.pathname.split('/')[1]); 
    },[])

    const handleSetSideBarType = (type) => {
        if(sidebarType !== type){
            setSidebarType(()=> type);
        }else{ 
            document.querySelector('.profile__container').classList.toggle('active')
        }
    }
    return (
        <HStack> 
            <Button
                colorScheme={sidebarType === 'account' ? 'blue' : 'gray'}
                onClick={()=> handleSetSideBarType('account')}
            >
                Acc
            </Button>
            <Button 
                colorScheme={sidebarType === 'history' ? 'blue' : 'gray'}
                onClick={()=> handleSetSideBarType('history')}
            >
                His
            </Button>
            <Button
                colorScheme={sidebarType === 'earning' ? 'blue' : 'gray'}
                onClick={()=> handleSetSideBarType('earning')}
            >
                Ear
            </Button>
            <Button
                colorScheme={sidebarType === 'settings' ? 'blue' : 'gray'}
                onClick={()=> handleSetSideBarType('settings')}
            >
                Sett
            </Button>
        </HStack>
    );
};

export default DashboardSideBar;