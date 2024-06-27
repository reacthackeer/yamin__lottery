import { Box, Button, FormControl, FormLabel, HStack, Input, Select, useToast } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddSingleDepositRequestMutation } from '../../Store/feature/depositRequest/api';
import { useGetAllWalletQuery } from '../../Store/feature/wallet/api';

const EditDepositByWallet = () => {
    
        let {data, isSuccess} = useGetAllWalletQuery(); 
        const [selectedWallet, setSelectedWallet] = useState('');
        const [selectedIdType, setSelectedIdType] = useState(''); 
        const [reference, setReference] = useState('');
        const authInfo = useSelector((state)=> state.auth.auth);
        const [amount, setAmount] = useState('');
        const [debounceLoading, setDebounceLoading] = useState(false);

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

        
        const [provideDepositRequestInfo,{data: drData, isLoading: drIsLoading, isSuccess: drIsSuccess, isError: drIsError, error: drError}] = useAddSingleDepositRequestMutation();

        const handleSubmit = (e) => {
            e.preventDefault(); 
            setDebounceLoading(()=> false);
            let postInfo = {
                wallet: selectedWallet,
                idType: selectedIdType,
                account: getSelectedWalletInfo(),
                currency: getSelectedWalletCurrency(),
                amount: amount,
                referrance: reference,
                userId: authInfo.userId
            };   
            let {wallet,idType, account, currency, amount: pAmount, referrance, userId} = postInfo;
            if(wallet && idType && account && currency && pAmount && referrance && userId){
                provideDepositRequestInfo(postInfo);
            }else{
                toast({
                    title: 'Invalid post request!',
                    duration: 4000,
                    isClosable: true,
                    status: 'error'
                })
            }
        };

        const depositWalletDebounce = _.debounce(handleSubmit, 1000);

        const handleSubmitFirst = (e) => {
            e.preventDefault();
            setDebounceLoading(()=> true);
            let result = window.confirm('If you not send money and submit deposit request then your account will be permanently disabled and your are going to jail room and you cannot access your account and your all amount will be freeze. You agree my condition?');
            if(result){
                depositWalletDebounce(e);
            }else{
                setDebounceLoading(()=> false);
            }
        }
        useEffect(()=>{  
            if(!drIsLoading && drIsSuccess && !drIsError){
                if(drData && drData?.id > 0){ 
                    setSelectedIdType('');
                    setSelectedWallet('');
                    setReference('');
                    setAmount('')
                    // navigate('/profile')
                    toast({
                    title: "Successfully deposit request submitted!",
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
        <Box> 
            <form onSubmit={handleSubmitFirst}>
                <Box className='dashboard__container__items'> 
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
                        <FormLabel>Deposit {selectedWallet} wallet {selectedIdType}:</FormLabel>
                        <Input type="text" disabled placeholder='Enter your user ID' value={getSelectedWalletInfo()} />
                    </FormControl>
                }
                
                {selectedIdType && selectedWallet && getSelectedWalletInfo() && getSelectedWalletCurrency() &&
                <FormControl mt='2'>
                    <FormLabel>how much {getSelectedWalletCurrency()} did you send?</FormLabel>
                    <Input type="number" placeholder='Enter amount' value={amount} onChange={(e) => setAmount(e.target.value)} />
                </FormControl>}
                {  selectedIdType && selectedWallet && getSelectedWalletInfo() && getSelectedWalletCurrency() &&
                <FormControl mt='2'>
                    <FormLabel>Enter your reference code</FormLabel>
                    <Input type="text" placeholder='Enter Your User ID' value={reference} onChange={(e) => setReference(e.target.value)} />
                </FormControl>}
                </Box>
                <HStack mt={6} spacing={4} justify="end">
                    <Button 
                        type="submit" 
                        colorScheme="blue"
                        isLoading={drIsLoading || debounceLoading}
                    >Submit Deposit Request</Button> 
                </HStack>
            </form>
        </Box>
        )
    }


export default EditDepositByWallet;