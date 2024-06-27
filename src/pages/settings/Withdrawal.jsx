import { Box, Button, FormControl, FormLabel, Input, Select, useToast } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetAllWalletQuery } from '../../Store/feature/wallet/api';
import { useAddSingleWithdrawalRequestMutation } from '../../Store/feature/withdrawalRequest/api';
import SidebarProfileComponent from '../../components/Private/SidebarProfileComponent';
import '../../style/dashboardStyle.scss';
import '../../style/defaultPageBackground.scss';
const WithdrawalPage = () => { 
    const currency = useSelector((state)=> state.auth.currency)
    let {data, isSuccess} = useGetAllWalletQuery(); 
    const [selectedWallet, setSelectedWallet] = useState('');
    const [password, setPassword] = useState('');
    const [backupPassword, setBackupPassword] = useState('');
    const [debounceLoading, setDebounceLoading] = useState(false);
    const [selectedIdType, setSelectedIdType] = useState(''); 
    const [reference, setReference] = useState('');
    const [wallet, setWallet] = useState("");
    const authInfo = useSelector((state)=> state.auth.auth); 
    const [amount, setAmount] = useState('');
    const toast = useToast();

    const getSelectedWalletIdType = () => {
        let idesType = [];
        
        if(isSuccess && data && data?.length > 0 && selectedWallet){
            data.forEach((info)=>{
                if(info.name === selectedWallet){
                    idesType = info.idesType
                }
            })
        }

        return idesType;
    };
    
    const getSelectedWalletInfo = () => {
        let accountNumber = '';
        if(isSuccess && data && data?.length > 0 && selectedWallet && selectedIdType){
            data.forEach((info)=>{
                if(info.name === selectedWallet){
                    let idesTypeIndex = info.idesType.indexOf(selectedIdType);
                    accountNumber = info.ides[idesTypeIndex];
                }
            })
        }

        return accountNumber;
    }; 

    const getSelectedWalletCurrency = () => {
        let walletCurrency = '';
        if(isSuccess && data && data?.length > 0 && selectedWallet && selectedIdType){
            data.forEach((info)=>{
                if(info.name === selectedWallet){
                    walletCurrency = info.currency;
                }
            })
        }

        return walletCurrency;
    }; 

    const [provideDepositRequestInfo,{data: drData, isLoading: drIsLoading, isSuccess: drIsSuccess, isError: drIsError, error: drError}] = useAddSingleWithdrawalRequestMutation();

    const handleSubmit = (e) => {
        e.preventDefault(); 
        setDebounceLoading(()=> false);
        if(selectedIdType && selectedWallet && password && backupPassword && wallet && amount && reference && authInfo?.userId){
        if(Number(authInfo.realBalance) > Number(amount) / Number(currency.currencyRate) || Number(authInfo.realBalance) === Number(amount) / Number(currency.currencyRate)){
            let postInfo = {
                wallet: selectedWallet,
                idType: selectedIdType,
                account: wallet,
                amount,
                reference,
                currency: currency.name,
                userId: authInfo.userId,
                extra: {password, backupPassword}
            }  
            provideDepositRequestInfo(postInfo);
          }else{
            toast({
              title: 'Balance low!',
              status: 'warning',
              isClosable: true
            })
          }
        }else{
          toast({
            title: 'Invalid post request!',
            status: 'warning',
            isClosable: true
          })
        }
    };

    const debounceWithdrawal = _.debounce(handleSubmit, 1000);
    
    const handleSubmitFirst = (e) => {
        e.preventDefault();
        setDebounceLoading(()=> true);
        debounceWithdrawal(e);
    }

    useEffect(()=>{  
        if(!drIsLoading && drIsSuccess && !drIsError){
            if(drData && drData?.id > 0){ 
                setSelectedIdType('');
                setSelectedWallet('');
                setReference('');
                setAmount('');
                setWallet('')
                // navigate('/profile')
                toast({
                title: "Successfully withdrawal request submitted!",
                duration: 4000,
                isClosable: true,
                status: 'success'
                })
            }else{
                toast({
                title: drError?.data?.error?.message || "Internal server error!",
                duration: 4000,
                isClosable: true,
                status: 'error'
                })
            }
        }
        if(!drIsLoading && drIsError && !drIsSuccess){
            toast({
                title: drError?.data?.error?.message || "Internal server error!",
                duration: 4000,
                isClosable: true,
                status: 'error'
            })
        }
    },[drData, drIsLoading, drIsSuccess, drIsError, drError])
    
    return (
        <Box className='default__page__background i__1 white'>
            <Box className='dashboard__page__container'>
                <SidebarProfileComponent/>
                <Box 
                    className='content__container' 
                >         
                    <form onSubmit={handleSubmitFirst}>
                        <Box className='dashboard__container__items'>
                            <FormControl isRequired>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type='password'
                                    placeholder='Enter your password'
                                    value={password || ''}
                                    onChange={(e)=> setPassword(e.target.value)}
                                >
                                </Input>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Backup Password</FormLabel>
                                <Input
                                    type='password'
                                    placeholder='Enter your backup password'
                                    value={backupPassword || ''}
                                    onChange={(e)=> setBackupPassword(e.target.value)}
                                >
                                </Input>
                            </FormControl>
                        {isSuccess&& data && data?.length > 0 && <FormControl mt='2'>
                            <FormLabel>Select your wallet type:</FormLabel>
                            <Select value={selectedWallet} onChange={(e) => setSelectedWallet(e.target.value)}>
                                <option value="">Select Wallet</option> 
                                {
                                    isSuccess && data && data?.length > 0 && data.map((info, index)=> <option value={info.name} key={index}>{info.name}</option>)
                                }
                            </Select>
                        </FormControl>}
            
                        {selectedWallet && <FormControl mt='2'>
                            <FormLabel>Select ID type:</FormLabel>
                            <Select value={selectedIdType} onChange={(e) => setSelectedIdType(e.target.value)}>
                                <option value="">Select ID Type</option>
                                {
                                    getSelectedWalletIdType().map((info, index)=> <option value={info} key={index}>{info}</option>)
                                } 
                            </Select>
                        </FormControl>}
                        
                        {selectedIdType && selectedWallet && getSelectedWalletInfo() &&
                            <FormControl mt='2'>
                                <FormLabel>Withdrawal {selectedWallet} wallet {selectedIdType}:</FormLabel>
                                <Input type="text" placeholder='Enter your wallet info' value={wallet} onChange={(e) => setWallet(e.target.value)}/>
                            </FormControl>
                        }
                        
                        {selectedIdType && selectedWallet && getSelectedWalletInfo() && getSelectedWalletCurrency() &&
                        <FormControl mt='2'>
                            <FormLabel>how much {currency.name.toUpperCase()} do you want to withdrawal ?</FormLabel>
                            <Input type="number" placeholder='Enter amount' value={amount} onChange={(e) => setAmount(e.target.value)} />
                        </FormControl>}
                        {  selectedIdType && selectedWallet && getSelectedWalletInfo() && getSelectedWalletCurrency() &&
                        <FormControl mt='2'>
                            <FormLabel>Enter your reference code that we use</FormLabel>
                            <Input type="text" placeholder='Enter Your User ID' value={reference} onChange={(e) => setReference(e.target.value)} />
                        </FormControl>}
                        </Box>
                        <Box 
                            mt='3'
                            display='flex'
                            justifyContent='flex-end'
                        >
                            <Button 
                                type="submit" 
                                colorScheme="blue"
                                size='sm'
                                isLoading={drIsLoading || debounceLoading}
                            >Submit Deposit Request</Button> 
                        </Box>
                    </form> 
                </Box>
            </Box>
        </Box>
    );
};

export default WithdrawalPage;