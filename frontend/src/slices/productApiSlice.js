import { PRODUCT_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Use ** query ** for fetching data(read- only).
        // Use ** mutation ** for modifying data(write operations).
        getProducts: builder.query({
            query: () => ({
                url: PRODUCT_URL,
            }),
            keepUnusedDataFor: 5 // Retain unused data for 5 seconds before removing it from the cache
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCT_URL,
                method: 'POST',
            }),
            invalidatesTags: ['Products']
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCT_URL}/${data.id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Products']
        }),
        getProductDetails: builder.query({
            query: (id) => ({
                url: `/products/${id}` // Fallback
            }),
            keepUnusedDataFor: 5
        })

    })
});

export const { useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation ,useUpdateProductMutation } = productApiSlice
