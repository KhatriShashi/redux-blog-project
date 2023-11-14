import { configureStore } from "@reduxjs/toolkit";
import { blogReducer } from "../features/blog/blogSlice";
import { authReducer } from "../features/blog/authSlice";
const store=configureStore({
    reducer:{
        auth:authReducer,
        blog:blogReducer
    }
});

export default store;