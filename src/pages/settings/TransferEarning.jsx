import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetAllReferralIncomeQuery, useReferralBalanceTransferMutation } from '../../Store/feature/currency/api';
import SidebarProfileComponent from '../../components/Private/SidebarProfileComponent';
import '../../style/dashboardStyle.scss';
import '../../style/defaultPageBackground.scss';
const SettingsTransferEarning = () => { 
    const {userId} = useSelector((state)=> state.auth.auth);
    const [password, setPassword] = useState('');
    const [BackUpPassword, setBackUpPassword] = useState('');
    const {data, isSuccess} = useGetAllReferralIncomeQuery(userId); 
    const [provideTransferInfo] = useReferralBalanceTransferMutation();
    const handleSubmit = (e) => {
        e.preventDefault();
        if(userId && password && BackUpPassword && isSuccess && data.realBalance){
            let postData = {
                password, 
                backupPassword: BackUpPassword,
                balanceType: 'REAL',
                userId
            };
            provideTransferInfo(postData);
        }else{

        }
    }
    return (
        <Box className='default__page__background i__1 white'>
            <Box className='dashboard__page__container'>
                <SidebarProfileComponent/>
                <Box 
                    className='content__container'
                >          
                    {
                        isSuccess && data && data?.realBalance ?
                        
                        <form onSubmit={handleSubmit}>
                            <Box className='dashboard__container__items'> 
                                <FormControl>
                                    <FormLabel>Current Balance</FormLabel>
                                    <Input
                                        value={data.realBalance || ''}
                                        isDisabled={true}
                                    >
                                    </Input>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Password</FormLabel>
                                    <Input
                                        type='password'
                                        value={password || ''} 
                                        placeholder='Enter your password'
                                        onChange={(e)=> setPassword(()=> e.target.value)}
                                    >
                                    </Input>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>BackUp Password</FormLabel>
                                    <Input
                                        type='password'
                                        value={BackUpPassword || ''} 
                                        placeholder='Enter your backup password'
                                        onChange={(e)=> setBackUpPassword(()=> e.target.value)}
                                    >
                                    </Input>
                                </FormControl> 
                            </Box>
                            <Box
                                display={'flex'}
                                justifyContent={'flex-end'}
                            >
                                <Button 
                                    mt='3'
                                    type='submit'
                                >
                                    Transfer
                                </Button>
                            </Box>
                        </form>
                    : ''
                }
                </Box>
            </Box>
        </Box>
    );
};

export default SettingsTransferEarning;