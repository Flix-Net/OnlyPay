import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../Redux/Slices/authSlice";
import postReducer from "../Redux/Slices/postSlice";

export const store  = configureStore({
    reducer:{
        authReducer,
        postReducer
    }
})