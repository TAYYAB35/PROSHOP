import { createSlice } from "@reduxjs/toolkit";
import {updateCart} from "../utils/cartUtlis.js";

const initialState = localStorage.getItem('Cart') ? JSON.parse(localStorage.getItem('Cart')) : { cartItems: [] , shippingAddress: {} , paymentMethod: 'PayPal'};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {

            const item = action.payload;// Extract the item from action.payload
            const existingItem = state.cartItems.find(i => i._id === item._id);

            if (existingItem) {
                // state.cartItems = state.cartItems.map((x) => item._id === existingItem._id ? x : item);// Update existing item
                state.cartItems = state.cartItems.map((x) =>
                    x._id === existingItem._id ? { ...existingItem, qty: item.qty } : x
                  );
                  
            } else {
                state.cartItems = [...state.cartItems, item]
            }

            return updateCart(state);

        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(i => i._id !== action.payload);
            return updateCart(state);
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            return updateCart(state);
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            return updateCart(state);
        }

    }
})

export const { addToCart ,removeFromCart ,saveShippingAddress , savePaymentMethod} = cartSlice.actions;

export default cartSlice.reducer