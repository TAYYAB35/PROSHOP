import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Use ** query ** for fetching data(read- only).
        // Use ** mutation ** for modifying data(write operations).
        login: builder.mutation({
            query: (data) => ({
                url: USERS_URL/auth,
                method: 'POST',
                body: data,
            }),
        }),
        

    })
});

export const { useLoginMutation } = usersApiSlice
