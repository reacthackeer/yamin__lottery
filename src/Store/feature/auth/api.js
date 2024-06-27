import { apiSlice } from "../../Api/ApiSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (data) => ({
                url: '/auth/register',
                method: 'POST',
                body: data
            })
        }), 
        loginUser: builder.mutation({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: data
            })
        }), 
        validateUser: builder.mutation({
            query: (data) => ({
                url: '/auth/validate/'+data,
                method: 'POST', 
            })
        }),
        changePassword: builder.mutation({
            query: (data) => ({
                url: '/auth/update/password',
                method: "POST",
                body: data
            })
        }),
        getSingleAddress: builder.query({
            query: (userId) => ({
                url: `/auth/address/${userId}`
            }),
            providesTags: () => [{type: 'getSingleAddress'}]
        }),
        getSingleInfo: builder.query({
            query: (userId) => ({
                url: `/auth/info/${userId}`
            }),
            providesTags: () => [{type: 'getSingleAddress'}]
        }),
        updateSingleAddress: builder.mutation({
            query: (data) => ({
                url: '/auth/update/address',
                method: "POST",
                body: data
            }),
            invalidatesTags: () => [{type: 'getSingleAddress'}]
        }),
        getAllAdminApplication: builder.query({
            query: (adminType) => ({
                url: `/auth/get/admin/${adminType}`,  
            }),
            providesTags: () => [{type: 'getAllAdmin'}]
        }),
        adminApplication: builder.mutation({
            query: (data) => ({
                url: '/auth/add/admin',
                method: "POST",
                body: data
            }),
            invalidatesTags: () => [{type: 'getAllAdmin'}]
        }),
        deleteSingleAdmin: builder.mutation({
            query: (adminId) => ({
                url: '/auth/delete/admin/'+adminId,
                method: "DELETE", 
            }),
            invalidatesTags: () => [{type: 'getAllAdmin'}]
        }),
        deleteSingleAdmin: builder.mutation({
            query: (adminId) => ({
                url: '/auth/delete/admin/'+adminId,
                method: "DELETE", 
            }),
            invalidatesTags: () => [{type: 'getAllAdmin'}]
        }),
        confirmSingleAdmin: builder.mutation({
            query: (adminId) => ({
                url: '/auth/confirm/admin/'+adminId,
                method: "PUT", 
            }),
            invalidatesTags: () => [{type: 'getAllAdmin'}]
        }),
        getAllUsers: builder.query({
            query: ({page, limit, moreStr}) => ({
                url: `/auth/get-all/user?page=${page}&limit=${limit}${moreStr}`,  
            }),
            providesTags: () => [{type: 'getAllUser'}]
        }),
        blockSingleUser: builder.mutation({
            query: (itemId) => ({
                url: `/auth/block/user/${itemId}`,
                method: 'PUT'
            }),
            invalidatesTags: () => [{type: 'getAllUser'}]
        }),
        cancelSingleUser: builder.mutation({
            query: (itemId) => ({
                url: `/auth/cancel/user/${itemId}`,
                method: 'PUT'
            }),
            invalidatesTags: () => [{type: 'getAllUser'}]
        }),
        balanceTransfer: builder.mutation({
            query: (data) => ({
                url: '/auth/balance-transfer',
                method: 'PUT',
                body: data
            })
        }),
        addBackupPassword: builder.mutation({
            query: (data) => ({
                url: '/auth/add',
                method: 'POST',
                body: data
            })
        }), 
        getSingleDashboardInfo: builder.query({
            query: (itemId) => ({
                url: `/dashboard/get-single/${itemId}`,
                method: 'GET'
            }), 
            providesTags: () => [{type: 'getDashboardInfo'}]
        }),
    })
})

export const { 
    useRegisterUserMutation,
    useGetAllUsersQuery,
    useLoginUserMutation,
    useValidateUserMutation,
    useChangePasswordMutation,
    useGetSingleAddressQuery,
    useUpdateSingleAddressMutation,
    useAdminApplicationMutation, 
    useGetAllAdminApplicationQuery,
    useDeleteSingleAdminMutation,
    useConfirmSingleAdminMutation,
    useBlockSingleUserMutation,
    useCancelSingleUserMutation, 
    useGetSingleDashboardInfoQuery,
    useBalanceTransferMutation,
    useAddBackupPasswordMutation,
    useGetSingleInfoQuery
} = authApi;