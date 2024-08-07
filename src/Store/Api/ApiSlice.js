import {
    createApi,
    fetchBaseQuery
} from '@reduxjs/toolkit/query/react';
import { setUserLoggedOut } from '../feature/auth/authSlice';
// import { userLoggedOut } from '../auth/authSlice';
const baseQuery = fetchBaseQuery({
    baseUrl: `http://localhost:11111/api/v1`,
    prepareHeaders: async (headers,{getState}) => {
        let tokenId = getState()?.auth?.auth?.tokenId || ''; 
        let userId = getState()?.auth?.auth?.userId || ''; 
        if(tokenId && userId){
            let token = tokenId+"__"+userId
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers;
    }
})

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: async (args, api, extraOptions) => {
        let result = await baseQuery(args, api, extraOptions);
        // todo validate user authentication
        if(result?.error?.status === 401){
            api.dispatch(setUserLoggedOut())
            localStorage.removeItem('auth') 
            window.location.assign('/login'); 
        }
        return result;
    },
    tagTypes: [],
    endpoints: (builder) => ({})
})