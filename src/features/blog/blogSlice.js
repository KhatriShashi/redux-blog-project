import { createSlice } from "@reduxjs/toolkit";

const initialState={
    articles:[],
    allActiveArticles:[]
}

export const  blogSlice = createSlice({
    name:"blog",
    initialState,
    reducers:{
        userAllBlog:(state,action)=>{
            state.articles=[...action.payload];
        },
        allActiveBlog:(state,action)=>{
            state.allActiveArticles=[...action.payload];
        }
    }
})

export const {userAllBlog,allActiveBlog} = blogSlice.actions;
export const blogReducer = blogSlice.reducer;