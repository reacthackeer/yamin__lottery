import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import React, { useState } from 'react';

const BuyALotteryComponents = () => {
    const [debounceIsLoading, setDebounceIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        phone: '', 
        
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleValidateInput = () => {
        let result = false;
        for(var item in formData){
            if(!formData[item]){
                result = true;
            }
        }
        return result;
    }
    
    const handleSubmit = (e) => { 
        e.preventDefault();
        console.log(formData);
        setDebounceIsLoading(()=> true);

        setTimeout(() => {
            setDebounceIsLoading(()=> false);
        }, 2000);
    };




    return (
        <form 
            onSubmit={handleSubmit}
        > 
            <FormControl 
                mb={4} 
            >
                <FormLabel>Phone number</FormLabel>
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
                type='number'
                name="lotteryNumber"
                value={formData.lotteryNumber}
                onChange={handleChange}
                placeholder="Enter your lottery number"
                required
                />
            </FormControl> 
            <Button 
                isDisabled={handleValidateInput()}
                type="submit" 
                colorScheme="blue"   
                isLoading={debounceIsLoading}
                width={'100%'}
            >
                Check
            </Button>
        </form>
    );
};

export default BuyALotteryComponents;