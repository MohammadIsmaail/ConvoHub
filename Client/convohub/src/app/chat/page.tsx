"use client"

import ProtectedRoute from "@/components/ProtectedRoute"

const Chat=()=>{
    return(
       <ProtectedRoute>
        <h1>chat</h1>
       </ProtectedRoute>
    )
}