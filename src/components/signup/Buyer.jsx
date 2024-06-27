import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import React, { useState } from 'react';

const Information = ({formData, setFormData}) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    
  const [referralCode] = useState(localStorage.getItem('referralCode') || '');
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
                <FormLabel>Email</FormLabel>
                <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
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
                <FormLabel>Password</FormLabel>
                <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                />
            </FormControl>
            <FormControl mb={4}>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                />
            </FormControl>  
            <FormControl mb={4}>
                <FormLabel>Referral Code</FormLabel>
                <Input
                type="text"
                name="referral"
                isDisabled={referralCode ? true : false}
                value={formData.referral}
                onChange={handleChange}
                placeholder="Enter your referral code"
                required
                />
            </FormControl>
            </form>

    );
};

export default Information;