import { PRODUCT_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Use ** query ** for fetching data(read- only).
        // Use ** mutation ** for modifying data(write operations).
        getProducts: builder.query({
            query: () => ({
                url: PRODUCT_URL,
            }),
            providesTags: ['Products'],
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
                url: `${PRODUCT_URL}/${data._id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Products']
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}`,
                method: 'POST',
                body: data
            }),
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `${PRODUCT_URL}/${id}`,
                method: 'DELETE',
            }),
        }),
        getProductDetails: builder.query({
            query: (id) => ({
                url: `/products/${id}` // Fallback
            }),
            keepUnusedDataFor: 5
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: `/products/${data.productId}/reviews`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Products'], // Invalidate the 'Products' tag to refetch the product list after creating a review
            // This will ensure that the product list is updated with the new review data
        }),

    })
});

export const { useGetProductsQuery, useGetProductDetailsQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation,
    useUploadProductImageMutation , useCreateReviewMutation
} = productApiSlice
