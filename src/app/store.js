import { configureStore } from "@reduxjs/toolkit";
import { blogReducer } from "../features/blog/blogSlice";
const store=configureStore({
    reducer:blogReducer
});

export default store;