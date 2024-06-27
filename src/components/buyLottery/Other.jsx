import { Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';

const OtherLotteryForm = () => {

        const [debounceIsLoading, setDebounceIsLoading] = useState(false);
        const toast = useToast();
    
        const [formData, setFormData] = useState({
        name: '', 
        phone: '',   
        number: '',
        wish: ''
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
                setDebounceIsLoading(()=> true);
                setTimeout(() => {
                setDebounceIsLoading(()=> false);
                }, 2000);
            }else{
            toast({title: 'Password not matched!', status: 'error', isClosable: true, duration: 4000, position: 'top-right'})
            }
        }else{
            toast({title: 'Fill up all the fields!', status: 'error', isClosable: true, duration: 4000, position: 'top-right'})
        }
        }

        

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault(); 
        console.log('Form submitted:', formData);
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
                <FormLabel>Name</FormLabel>
                <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                />
            </FormControl> 
            <FormControl mb={4}>
                <FormLabel>Phone</FormLabel>
                <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
                />
            </FormControl>
            <FormControl mb={4}>
                <FormLabel>Lottery number</FormLabel>
                <Input
                type="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                placeholder="Enter your lottery number"
                required
                />
            </FormControl>  
            <FormControl mb={4}>
                <FormLabel>Wish</FormLabel>
                <Input
                type="text"
                name="wish"
                value={formData.wish}
                onChange={handleChange}
                placeholder="Enter your wish"
                required
                />
            </FormControl> 
            <Button
                isDisabled={handleValidateInput()}
                isLoading={debounceIsLoading}
                colorScheme={'blue'}
                width={'100%'}
                onClick={handleSubmitForm}
            >
                Payment
            </Button>
            </form>

    );
};

export default OtherLotteryForm;