import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "@/redux/slices/authSlice"

const rootReducer=combineReducers({
    auth:authSlice
    // {
    //     token:"",
    //     user:{},
    //     isAuthenticated:true

    // }
})

export default rootReducer