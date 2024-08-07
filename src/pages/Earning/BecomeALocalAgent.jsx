
import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import BecomeASellerFormContainer from '../../components/Earning/BecomeASeller/FormContainer';
import UserTable from '../../components/Earning/BecomeASeller/UserTable';
import '../../style/dashboardStyle.scss';
import '../../style/defaultPageBackground.scss';
const BecomeALocalAgent = () => { 
    const [showForm, setShowForm] = useState(true);
    const [adminType] = useState('localAgent');
    return (
        <Box> 
            {showForm ? <BecomeASellerFormContainer showForm={showForm} adminType={adminType} setShowForm={setShowForm} /> : <UserTable setShowForm={setShowForm} adminType={adminType}/>}
        </Box>
    )
};

export default BecomeALocalAgent;