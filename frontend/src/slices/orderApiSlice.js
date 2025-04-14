import { ORDER_URL, PAYPAL_URL } from "../constants";
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
        }),
        // By default the method is GET
        getOrderDetails: builder.query({
            query: (orderId) => ({
                url: `${ORDER_URL}/${orderId}`,
            }),
            keepUnsuedDataFor: 5
        }),
        getPayPalClientId : builder.query({
            query: () => ({
                url: PAYPAL_URL,
            }),
            keepUnsuedDataFor: 5
        }), 
        getMyOrders: builder.query({
            query: (orderId) => ({
                url: `/orders/mine`,
            }),
            keepUnsuedDataFor: 5
        }), 
        payOrder: builder.mutation({
            query: ({orderId,details}) => ({
                url: `/orders/${orderId}/pay`,
                method: 'PUT',
                body : {...details}
            }),
        }),
        getOrders: builder.query({
            query: (orderId) => ({
                url: ORDER_URL,
            }),
            keepUnsuedDataFor: 5
        }),
        deliverOrder: builder.mutation({
            query: (orderId) => ({
                url: `${ORDER_URL}/${orderId}/deliverd`,
                method: 'PUT',
            }),
        }),
    })
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery , usePayOrderMutation , useGetPayPalClientIdQuery,useGetMyOrdersQuery,useGetOrdersQuery,useDeliverOrderMutation} = orderApiSlice
