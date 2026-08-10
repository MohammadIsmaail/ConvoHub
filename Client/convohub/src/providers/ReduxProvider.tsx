"use client"
import { ReactNode } from "react"
import store from "@/redux/store"
import { Provider } from "react-redux"

type ReduxProviderProps={
    children:ReactNode
}

const ReduxProvider=({children}:ReduxProviderProps)=>{
    return(
        <>
        <Provider store={store}>
            {children}
        </Provider>
        </>
    )
}

export default ReduxProvider




// import { ReactNode } from "react";

// const ReduxProvider = ({ children }: { children: ReactNode }) => {
//     return <>{children}</>;
// };