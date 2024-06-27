import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    isLoggedIn: false,
    isFilled: false,
    token: '',
    auth: {}
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {  
        
    }
});

export const { 
} = authSlice.actions;
export default authSlice.reducer;