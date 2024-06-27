import { Button, HStack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
const DashboardSideBar = ({sidebarType, setSidebarType}) => { 
    useEffect(()=>{ 
        setSidebarType(()=> window.location.pathname.split('/')[1]); 
    },[])
    return (
        <HStack> 
            <Button
                colorScheme={sidebarType === 'account' ? 'blue' : 'gray'}
                onClick={()=> setSidebarType(()=> 'account')}
            >
                Acc
            </Button>
            <Button 
                colorScheme={sidebarType === 'history' ? 'blue' : 'gray'}
                onClick={()=> setSidebarType(()=> 'history')}
            >
                His
            </Button>
            <Button
                colorScheme={sidebarType === 'earning' ? 'blue' : 'gray'}
                onClick={()=> setSidebarType(()=> 'earning')}
            >
                Ear
            </Button>
            <Button
                colorScheme={sidebarType === 'settings' ? 'blue' : 'gray'}
                onClick={()=> setSidebarType(()=> 'settings')}
            >
                Sett
            </Button>
        </HStack>
    );
};

export default DashboardSideBar;