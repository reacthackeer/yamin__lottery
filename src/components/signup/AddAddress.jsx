import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import React from 'react';

const AddAddressComponent = ({formData, setFormData}) => {


    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    
    const handleSubmit = (e) => { 
        e.preventDefault();
        console.log(formData);
    };
    
    return (


        <form onSubmit={handleSubmit}>  
            <FormControl mb={4}>
                <FormLabel>Country</FormLabel>
                <Input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Enter your country"
                required
                />
            </FormControl>
            <FormControl mb={4}>
                <FormLabel>Division</FormLabel>
                <Input
                type="text"
                name="division"
                value={formData.division}
                onChange={handleChange}
                placeholder="Enter your division"
                required
                />
            </FormControl>
            <FormControl mb={4}>
                <FormLabel>District</FormLabel>
                <Input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                placeholder="Enter your district"
                required
                />
            </FormControl>
            <FormControl mb={4}>
                <FormLabel>Address line 1</FormLabel>
                <Input
                type="text"
                name="address_line_1"
                value={formData.address_line_1}
                onChange={handleChange}
                placeholder="Like as upazila"
                required
                />
            </FormControl>
            <FormControl mb={4}>
                <FormLabel>Address line 2</FormLabel>
                <Input
                type="text"
                name="address_line_2"
                value={formData.address_line_2}
                onChange={handleChange}
                placeholder="Like as union"
                required
                />
            </FormControl>
            <FormControl mb={4}>
                <FormLabel>Address line 3</FormLabel>
                <Input
                type="text"
                name="address_line_3"
                value={formData.address_line_3}
                onChange={handleChange}
                placeholder="Like as street address"
                required
                />
            </FormControl> 
            <FormControl mb={4}>
                <FormLabel>Post Code</FormLabel>
                <Input
                type="text"
                name="post_code"
                value={formData.post_code}
                onChange={handleChange}
                placeholder="Enter your post code"
                required
                />
            </FormControl> 
        </form>
    );
};

export default AddAddressComponent;