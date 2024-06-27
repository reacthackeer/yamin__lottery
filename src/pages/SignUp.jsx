import { Box, Button, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uid } from 'uid';
import { useRegisterUserMutation } from '../Store/feature/auth/api';
import AccountTypeComponent from '../components/signup/AccountTypeComponent';
import AddAddressComponent from '../components/signup/AddAddress';
import Information from '../components/signup/Buyer';
import '../style/defaultPageBackground.scss';

const SignUp = () => {
  const [referralCode] = useState(localStorage.getItem('referralCode') || '');
  const navigate = useNavigate();
  const [formType, setFormType] = useState("information"); 
  const toast = useToast();
  const [provideUserInfo, {isError, isLoading, isSuccess, data, error} ] = useRegisterUserMutation();
  const [formData, setFormData] = useState({
    country: '',
    division: '',
    district: '',
    address_line_1: '',
    address_line_2: '',
    address_line_3: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '', 
    post_code: '',
    referral: referralCode
});

const handleValidateInput = () => {
  let result = false;
  for(var item in formData){
      if(!formData[item]){
        result = true;
      }
  }
  return result;
}   

  const handleSubmitForm = () => {
    if(!handleValidateInput()){
      if(formData.password === formData.confirmPassword){
        let postInfo = {...formData};
            delete postInfo.confirmPassword;
            let userInfo = {
              name: postInfo.name,
              email: postInfo.email,
              phone: postInfo.phone,
              password: postInfo.password,
              referralCode: postInfo.referral,
              userId: uid(12).toUpperCase(),
              role: 15,
              designation: 'user',
              block: 'false',
            }; 
            let addressInfo = {
              userId: userInfo.userId,
              country: postInfo.country,
              division: postInfo.division,
              district: postInfo.district,
              addressLineOne: postInfo.address_line_1,
              addressLineTwo: postInfo.address_line_2,
              addressLineThree: postInfo.address_line_3,
              postCode: postInfo.post_code
            }
            provideUserInfo({userInfo, addressInfo});
      }else{
        toast({title: 'Password not matched!', status: 'error', isClosable: true, duration: 4000, position: 'top-right'})
      }
    }else{
      toast({title: 'Fill up all the fields!', status: 'error', isClosable: true, duration: 4000, position: 'top-right'})
    }
  }

  useEffect(()=> {
    if(!isLoading && !isError && isSuccess && data && data.status__code === 201){
        document.querySelectorAll('input').forEach((info)=> {
          info.value = '';
        });
        setFormData({
          country: '',
          division: '',
          district: '',
          address_line_1: '',
          address_line_2: '',
          address_line_3: '',
          name: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '', 
          post_code: '',
          referral: referralCode
      });
      navigate('/login')
    }
    if(isError && !isLoading && !isSuccess){
      let message = error?.data?.error?.message || 'Internal server error!';
      toast({
          status: 'error', 
          title: message, 
          duration: 3000, 
          position: 'top-right',
          isClosable: true
      }); 
  }
  },[isError, data, isError, isLoading, navigate, error])

    return (
        <Box className='default__page__background i__1 white'>
            <Box className='page__container'>
                <Box  
                    minW={'300px'}
                    maxW={'450px'}
                > 
                  <AccountTypeComponent 
                    setFormType={setFormType}
                    formType={formType}
                  />
                      <Box
                        mt={4}
                      >
                        {
                          formType === 'information' && <Information formData={formData} setFormData={setFormData}/>
                        }
                        {
                          formType === 'address' && <AddAddressComponent formData={formData} setFormData={setFormData}/>
                        } 
                        <Button
                          isDisabled={handleValidateInput()} 
                          colorScheme={'blue'}
                          width={'100%'}
                          isLoading={isLoading}
                          onClick={handleSubmitForm}
                        >
                            Signup
                        </Button>
                      </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default SignUp;