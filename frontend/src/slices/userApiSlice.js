import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Use ** query ** for fetching data(read- only).
        // Use ** mutation ** for modifying data(write operations).
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            }),
        }),
        profile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data,
            }),
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/${id}`,
                method: 'DELETE',
            }),
        }),
        getUser: builder.query({
            query: (id) => ({
                url: USERS_URL
            }),
            providesTags: ['Users'],
            keepUnusedDataFor: 5
        }),
        getUserDetails: builder.query({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`
            }),
            keepUnusedDataFor: 5
        }),
        updateUser: builder.mutation({
            query: (user ) => ({
                url: `${USERS_URL}/${user?._id}`,
                method: 'PUT',
                body: user
            }),
            invalidatesTags: ['Users']
        })

    })
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation, useGetUserQuery, useDeleteUserMutation ,useGetUserDetailsQuery,useUpdateUserMutation} = usersApiSlice
