import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    isLoggedIn: false,  
    authChecked: false,
    auth: {tokenId: undefined},
    currency: {name: 'Usd', dollar: 1, currencyRate: 1}
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {  
        setLoginUser: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
            state.authChecked = true
        },
        setAuthChecked: (state, action) => {
            state.authChecked = action.payload
        },
        setUserLoggedOut: (state) => {
            state.isLoggedIn = false;
            state.auth = {tokenId: undefined}
        }
    }
});

export const { 
    setLoginUser,
    setAuthChecked,
    setUserLoggedOut
} = authSlice.actions;
export default authSlice.reducer;