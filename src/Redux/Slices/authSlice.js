import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../Utils/axios";
import {toast} from "react-toastify";

const initialState = {
    user:null,
    token:null,
    status:null
}


//      -----------------Register---------------------------

export const registerUser = createAsyncThunk("auth/registerUser", async ({username,login,password, email})=>{

    try {
        let {data} = await axios.post("auth/register", {username,login,password, email});

        if (data.token)
        {
            window.localStorage.setItem("token", data.token)
        }

        return data;
    }
    catch (err)
    {
        console.log("Ошибка на клиентском уровне!");
        console.log(`Ошибка\n ${err}`);
    }

})


//        -----------------------Authoriz--------------------------

export const loginUser = createAsyncThunk("auth/loginUser", async ({login, password})=>{

    try {
        let {data} = await axios.post("/auth/login", {login,password})

        if (data.token)
        {
            window.localStorage.setItem("token",data.token);
        }

        return data;

    }
    catch (err)
    {
        console.log("Ошибка авторизации!");
        console.log(err);
    }

})


//     ----------------  GetMe  --------------

export const getMe = createAsyncThunk("auth/getMe", async ()=>{
    try {

        let {data} = await axios.get("/auth/getMe");
        return data;

    }
    catch (err)
    {
        toast(err);
    }
})


export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout:(state)=>{
            state.user = null;
            state.token = null;
            state.status = null;
        }
    },

    extraReducers:{

        // Register User

        [registerUser.pending]:(state)=>
        {
            state.status = null;
        },
        [registerUser.fulfilled]:(state, action)=>{
            state.user = action.payload.username;
            state.token = action.payload.token;
            state.status = action.payload.message;
        },
        [registerUser.rejected]:(state, action)=>{
            state.status = action.payload.message;
        },


        //  Login User

        [loginUser.pending]: (state)=>{
            state.status = null;
        },
        [loginUser.fulfilled]: (state, action)=>{
            state.user = action.payload.isUser?.username;
            state.token = action.payload?.token;
            state.status = action.payload.message;
        },
        [loginUser.rejected]: (state, action)=>{
            state.status = action.payload.message;
        },


        //   getMe

        [getMe.pending]: (state)=>{
            state.status = null;
        },
        [getMe.fulfilled]: (state, action)=>{
            state.user = action.payload.isUser?.username;
            state.token = action.payload?.token;
            state.status = null;
        },
        [getMe.rejected]: (state, action)=>{
            state.status = action.payload.message;
        }


    }

})

export const {logout} = authSlice.actions;

export const checkIsAuth = (state) => Boolean(state.authReducer.token);

export default authSlice.reducer;