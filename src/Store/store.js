import { apiSlice } from "./Api/ApiSlice";

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./feature/auth/authSlice";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer, 
        auth: authSlice,
    },
    devTools: false,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});

export {
    store
};

