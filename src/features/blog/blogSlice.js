import { createSlice } from "@reduxjs/toolkit";

const initialState={
    articles:[]
}

export const  blogSlice = createSlice({
    name:"blog",
    initialState,
    reducers:{
        userAllBlog:(state,action)=>{
            state.articles=[...action.payload];
        }
    }
})

export const {userAllBlog} = blogSlice.actions;
export const blogReducer = blogSlice.reducer;