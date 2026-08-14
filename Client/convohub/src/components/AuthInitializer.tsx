// Redux Hydrate prefill ko kehete hai  Persist Login
"use client"

import { setToken,setUser,setIsAuthenticated} from "@/redux/slices/authSlice"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const AuthInitializer = ()=>{
    const dispatch = useDispatch()

    useEffect(()=>{
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        if(token && user){
            dispatch(setToken(token))
            dispatch(setUser(JSON.parse(user))) 
            dispatch(setIsAuthenticated(true))
        }
    },[dispatch])
    return null
}

export default AuthInitializer
