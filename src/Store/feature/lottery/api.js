import { apiSlice } from "../../Api/ApiSlice";


export const currencyApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({ 
        addSingleSystemLottery: builder.mutation({
            query: (walletInfo) => ({
                url: `/lottery/system/add`,
                method: 'POST', 
                body: walletInfo
            }),
            invalidatesTags: ()=> [{type: 'getAlSystemLottery'}, {type: 'getAlLottery'}]
        }), 
        getAllSystemLottery: builder.query({
            query: () => ({
                url: `/lottery/system/get-all`,
                method: 'GET'
            }),
            providesTags: ()=> [{type: 'getAlSystemLottery'}]
        }),  
        deleteSingleSystemLottery: builder.mutation({
            query: (walletId) => ({
                url: `/lottery/system/single/${walletId}`,
                method: 'DELETE',  
            }),
            invalidatesTags: ()=> [{type: 'getAlSystemLottery'},{type: 'getAlLottery'}]
        }),
        updateSingleSystemLottery: builder.mutation({
            query: (walletId) => ({
                url: `/lottery/system/single/${walletId}`,
                method: 'PUT',  
            }),
            invalidatesTags: ()=> [{type: 'getAlSystemLottery'},{type: 'getAlLottery'}]
        }),
        addMultipleArray: builder.mutation({
            query: (postInfo) => ({
                url: `/lottery/buy`,
                method: 'POST',  
                body: postInfo
            }),
            invalidatesTags: ()=> [{type: 'getAlSystemLottery'},{type: 'getAlLottery'}]
        }),
        getAllSingleUserLottery: builder.query({
            query: ({userId, page, limit}) => ({
                url: `/lottery/get-all/${userId}?page=${page}&limit=${limit}`
            }),
            providesTags: ()=> [{type: 'getAlLottery'}]
        }),
        getAllSingleUserLotteryBuyHistory: builder.query({
            query: ({userId, page, limit}) => ({
                url: `/lottery/buy-history/get-all/${userId}?page=${page}&limit=${limit}`
            }),
            providesTags: ()=> [{type: 'getAlLottery'}]
        }),
        getAllSingleUserTransactionHistory: builder.query({
            query: ({userId, page, limit}) => ({
                url: `/lottery/transaction-history/get-all/${userId}?page=${page}&limit=${limit}`
            }),
            providesTags: ()=> [{type: 'getAlLottery'}]
        }),
        getAllSingleUserEarningHistory: builder.query({
            query: ({userId, page, limit}) => ({
                url: `/lottery/earning-history/get-all/${userId}?page=${page}&limit=${limit}`
            }),
            providesTags: ()=> [{type: 'getAlLottery'}]
        }),
        getAllSingleUserDepositHistory: builder.query({
            query: ({userId, page, limit}) => ({
                url: `/lottery/deposit-history/get-all/${userId}?page=${page}&limit=${limit}`
            }),
            providesTags: ()=> [{type: 'getAlLottery'}]
        }),
        getAllSingleUserTransferHistory: builder.query({
            query: ({userId, page, limit}) => ({
                url: `/lottery/transfer-history/get-all/${userId}?page=${page}&limit=${limit}`
            }),
            providesTags: ()=> [{type: 'getAlLottery'}]
        }),
        getAllSingleUserWithdrawalHistory: builder.query({
            query: ({userId, page, limit}) => ({
                url: `/lottery/withdrawal-history/get-all/${userId}?page=${page}&limit=${limit}`
            }),
            providesTags: ()=> [{type: 'getAlLottery'}]
        }),
        getAllSingleUserLotteryHistory: builder.mutation({
            query: ({userId, page, limit}) => ({
                url: `/lottery/lottery-history/get-all/${userId}?page=${page}&limit=${limit}`,
                method: 'POST'
            }),
            providesTags: ()=> [{type: 'getAlLottery'}]
        }),
    })
})
                                                                                                
export const {    
    useAddSingleSystemLotteryMutation,
    useGetAllSystemLotteryQuery,
    useDeleteSingleSystemLotteryMutation,
    useUpdateSingleSystemLotteryMutation,
    useAddMultipleArrayMutation,
    useGetAllSingleUserLotteryQuery,
    useGetAllSingleUserLotteryBuyHistoryQuery,
    useGetAllSingleUserTransactionHistoryQuery,
    useGetAllSingleUserEarningHistoryQuery,
    useGetAllSingleUserDepositHistoryQuery,
    useGetAllSingleUserTransferHistoryQuery,
    useGetAllSingleUserWithdrawalHistoryQuery,
    useGetAllSingleUserLotteryHistoryMutation
} = currencyApi;