import { ORDER_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Use ** query ** for fetching data(read- only).
        // Use ** mutation ** for modifying data(write operations).
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDER_URL,
                method: 'POST',
                body: { ...order }
            }),
            keepUnusedDataFor: 5 // Retain unused data for 5 seconds before removing it from the cache
        }),
    })
});

export const { useCreateOrderMutation } = orderApiSlice
