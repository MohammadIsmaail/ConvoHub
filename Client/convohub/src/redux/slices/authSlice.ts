import { createSlice } from "@reduxjs/toolkit"

const initialState={
    token:null,
    user: null,
    isAuthenticated: false
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
            state.isAuthenticated=false
         }
    }
})
export const {setToken,setUser,setIsAuthenticated,logout}=authSlice.actions
export default authSlice.reducer