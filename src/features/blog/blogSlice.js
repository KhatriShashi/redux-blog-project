import { createSlice } from "@reduxjs/toolkit";

const initialState={
    articles:{}
}

export const  blogSlice = createSlice({
    name:"blog",
    initialState,
    reducers:{
        createBlog:(state,action)=>{
            const article={
                title:action.payload.title,
                content:action.payload.content,
                featuredImage:action.payload.featuredImage,
                status:"inactive",
                userId:action.payload.userId,
                slug:action.payload.slug
            }
            state.articles=article;
        },
        updateBlog:(state,action)=>{
            const article={
                title:action.payload.title,
                content:action.payload.content,
                featuredImage:action.payload.featuredImage,
                status:"inactive",
                userId:action.payload.userId,
                slug:action.payload.slug
            }
            state.articles=article;
        }
        
    }
})

export const {createBlog,updateBlog} = blogSlice.actions;
export const blogReducer = blogSlice.reducer;