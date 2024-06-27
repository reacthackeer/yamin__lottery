import { Box, Button, FormControl, FormLabel, Input, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useGetAllSingleUserLotteryHistoryMutation } from '../../Store/feature/lottery/api';
import SidebarProfileComponent from '../../components/Private/SidebarProfileComponent';
import '../../style/dashboardStyle.scss';
import '../../style/defaultPageBackground.scss';

const SingleUserRow = ({userInfo}) => {
    return (
        <Tr> 
            <Td>{userInfo.phone}</Td>
            <Td>{userInfo.lotteryNumber}</Td>
            <Td>{userInfo.name}</Td>
            <Td>{userInfo.multiple}</Td>
            <Td>{userInfo.phones.split('&').join(', \n')}</Td> 
            <Td>{userInfo.status}</Td>  
        </Tr>
    )
}

const CheckLottery = () => { 
    const [providePhoneNumber, {data, isSuccess}] = useGetAllSingleUserLotteryHistoryMutation();
    console.log({data, isSuccess});
    let [informationResult, setInformationResult] = useState({ phone: ''}); 
    const handleSubmit =  (e) => {
        e.preventDefault();
        providePhoneNumber({userId: informationResult.phone})
    }
    const handleInputChange = (e) => {
        let {name, value} = e.target; 
        let newInfo =  {...informationResult};
            newInfo[name] = value;
            setInformationResult(()=> newInfo);
    }
    return (
        <Box className='default__page__background i__1 white'>
            <Box className='dashboard__page__container'>
                <SidebarProfileComponent/>
                <Box 
                    className='content__container'
                >      
                <form 
                    className='dashboard__container__items'
                    onSubmit={handleSubmit}
                >  
                    <Box className='single__result__item input__box'>
                        <FormControl mb={4} isRequired>
                            <FormLabel>Root Phone Number</FormLabel>
                            <Input 
                                name='phone'
                                placeholder='+8801333333333'
                                value={informationResult.phone}
                                onChange={handleInputChange}
                            ></Input> 
                        </FormControl> 
                    </Box>  
                    <Box
                        display={'flex'}
                        justifyContent={'flex-end'} 
                    >
                        <Button   
                            type='submit'
                            colorScheme='green'
                        >Check</Button>
                    </Box>  
            </form>
                {
                    isSuccess && data && data.length > 0
                ?
                <Box className='content__data__view__table__container'>
                    <Table width={'1000px'}>
                        <Thead>
                            <Tr>  
                                <Th>Phone</Th>
                                <Th>Lottery Number</Th>
                                <Th>Name</Th>
                                <Th>Multiple</Th>
                                <Th>Phones</Th>
                                <Th>Status</Th> 
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                data.map((info, index) => {
                                    return <SingleUserRow key={index} userInfo={info}></SingleUserRow>
                                })
                            }
                        </Tbody>
                    </Table> 
                </Box>
                : 
                
                ''}
                </Box>
            </Box>
        </Box>
    );
};

export default CheckLottery;