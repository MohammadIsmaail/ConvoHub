import { createSlice } from "@reduxjs/toolkit"

const initialState={
    token:null,
    user: null,
    isAuthenticated: false,
    isLoading: true
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
         setToken:(state,action)=>{
            state.token=action.payload
         },
         setUser:(state,action)=>{
            state.user=action.payload
         },
         setIsAuthenticated:(state,action)=>{
            state.isAuthenticated=action.payload
         },
         logout:(state,action)=>{
            state.token=null,
            state.user=null,
            state.isAuthenticated=false,
            state.isLoading = false;
         },
         setLoading:(state,action)=>{
            state.isLoading = action.payload;
         }
    }
})
export const {setToken,setUser,setIsAuthenticated,logout,setLoading}=authSlice.actions
export default authSlice.reducer