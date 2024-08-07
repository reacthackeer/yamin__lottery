import { apiSlice } from "../../Api/ApiSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addPrize: builder.mutation({
            query: (data) => ({
                url: '/prize/add',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ()=> [{type: 'getAllPrize'}]
        }),  
        subsCribeChannel: builder.mutation({
            query: (data) => ({
                url: '/prize/subscribe',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ()=> [{type: 'getAllPrize'}]
        }), 
        getAllPrize: builder.query({
            query: () => ({
                url: `/prize/get-all`,
                method: 'GET'
            }),
            providesTags: ()=> [{type: 'getAllPrize'}]
        }), 
        deleteSinglePrize: builder.mutation({
            query: (walletId) => ({
                url: `/prize/delete`,
                method: 'DELETE', 
                body: walletId
            }),
            invalidatesTags: ()=> [{type: 'getAllPrize'}]
        })
    })
})

export const {
    useAddPrizeMutation,
    useDeleteSinglePrizeMutation,
    useGetAllPrizeQuery,
    useSubsCribeChannelMutation
} = authApi;