import { apiSlice } from "../../Api/ApiSlice";
export const walletApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({ 
        addSingleInvestRequest: builder.mutation({
            query: (walletInfo) => ({
                url: `/invest-request/create/`,
                method: 'POST', 
                body: walletInfo
            }),
            invalidatesTags: ()=> [{type: 'getAllInvestRequest'}]
        }), 
        getAllInvestRequest: builder.query({
            query: ({page, limit}) => ({
                url: `/invest-request/get-all?page=${page}&limit=${limit}`,
                method: 'GET'
            }),
            providesTags: ()=> [{type: 'getAllInvestRequest'}]
        }), 
        deleteSingleInvestRequest: builder.mutation({
            query: (walletId) => ({
                url: `/invest-request/delete`,
                method: 'DELETE', 
                body: walletId
            }),
            invalidatesTags: ()=> [{type: 'getAllInvestRequest'}]
        }),  
        confirmSingleInvestRequest: builder.mutation({
            query: (walletId) => ({
                url: `/invest-request/confirm`,
                method: 'POST', 
                body: walletId
            }),
            invalidatesTags: ()=> [{type: 'getAllInvestRequest'}]
        }), 
        finishSingleInvestRequest: builder.mutation({
            query: (walletId) => ({
                url: `/invest-request/finish`,
                method: 'POST', 
                body: walletId
            }),
            invalidatesTags: ()=> [{type: 'getAllInvestRequest'}]
        }), 
        blockSingleInvestRequest: builder.mutation({
            query: (walletId) => ({
                url: `/invest-request/block`,
                method: 'DELETE', 
                body: walletId
            }),
            invalidatesTags: ()=> [{type: 'getAllInvestRequest'}]
        }), 
    })
})
                                                                                                
export const {   
    useAddSingleInvestRequestMutation,
    useGetAllInvestRequestQuery,
    useConfirmSingleInvestRequestMutation,
    useDeleteSingleInvestRequestMutation,
    useBlockSingleInvestRequestMutation,
    useFinishSingleInvestRequestMutation
} = walletApi;