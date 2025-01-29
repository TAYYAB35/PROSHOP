import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentails: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
        }
        ,
        clearCredentails: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem("userInfo");
        }
    }
})

export const { setCredentails, clearCredentails } = authSlice.actions;

export default authSlice.reducer;