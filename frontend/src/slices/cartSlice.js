import { createSlice } from "@reduxjs/toolkit";
import {updateCart} from "../utils/cartUtlis.js";

const initialState = localStorage.getItem('Cart') ? JSON.parse(localStorage.getItem('Cart')) : { cartItems: [] };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {

            const item = action.payload;// Extract the item from action.payload
            const existingItem = state.cartItems.find(i => i._id === item._id);

            if (existingItem) {
                state.cartItems = state.cartItems.map((x) => item._id === existingItem._id ? item : x);// Update existing item
            } else {
                state.cartItems = [...state.cartItems, item]
            }

            return updateCart(state);

        }
    }
})

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer