import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../Utils/axios";

const initialState = {
    posts: [],
    status: null,
}

// ------------------ create New Post --------------------

export const createPost = createAsyncThunk('post/createPost', async (params)=>{
    try {
        const {data} = await axios.post('/post/createPost', params );
        return data;
    }
    catch (err)
    {
        console.log(err)
    }
})

//  ----------------------Get All Posts ----------------------

export const getAllPosts = createAsyncThunk("post/getAllPosts", async ()=>{
    try {
        const {data} = await axios.get("/post/getAllPosts");
        return data;
    }
    catch (err)
    {
        console.log(err);
    }
})

//  ----------------------Delete Post ----------------------

export const deletePost = createAsyncThunk("post/deletePost", async (postID)=>{
    const {data} = await axios.delete(`post/deletePost/${postID}`);
    return data;
})

//  ----------------------Edit Post ----------------------

export const editPost = createAsyncThunk("post/editPost", async (postID, updatedPost)=>{
    console.log(postID);
    console.log(updatedPost);
    const {data} = await axios.put(`post/editPost/${postID}`, updatedPost);
    return data;
})



export const postSlice = createSlice({
    name:"post",
    initialState,
    reducers:{
        clearStatus:(state)=>{
            console.log("status is cleared!");
            state.status = null;
        },
        initialStatus:(state, action)=>{
            state.status = action.payload;
        }
    },

    extraReducers:{

        // ---------Create Post -----------------
        [createPost.pending]:(state)=>{
            state.status = null;
        },
        [createPost.fulfilled]:(state, action)=>{
            state.posts.push(action.payload.newPost);
            state.status = action.payload.message;
        },
        [createPost.rejected]:(state,action)=>{
            state.status = action.payload.message;
        },


        // ---------Get All Post's -----------------
        [getAllPosts.pending]:(state)=>{
            state.status = null;
        },
        [getAllPosts.fulfilled]:(state, action)=>{
            state.posts = action.payload?.posts || 0;
            state.status = action.payload.message;
        },
        [getAllPosts.rejected]:(state,action)=>{
            state.status = action.payload.message;
        },


        // ---------Delete Post -----------------
        [deletePost.pending]:(state)=>{
            state.status = null;
        },
        [deletePost.fulfilled]:(state, action)=>{
            state.status = action.payload.message;
        },
        [deletePost.rejected]:(state,action)=>{
            state.status = action.payload.message;
        },


        // ---------Edit Post -----------------
        [editPost.pending]:(state)=>{
            state.status = null;
        },
        [editPost.fulfilled]:(state, action)=>{
            state.status = action.payload.message;
            const index = state.posts.findIndex((post)=> post._id === action.payload._id);
            state.posts[index] = action.payload;
        },
        [editPost.rejected]:(state,action)=>{
            state.status = action.payload.message;
        },

    }
})

export const {clearStatus, initialStatus} = postSlice.actions;

export default postSlice.reducer;