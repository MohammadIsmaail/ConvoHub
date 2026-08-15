// import { RootState } from "@/redux/store";
// import { useRouter } from "next/navigation";
// import { ReactNode, useEffect } from "react";
// import { useSelector } from "react-redux";

// interface ProtectedRouteProps{
//     children:ReactNode;
// }

// const ProtectedRoute=({children}:ProtectedRouteProps)=>{
//       const router = useRouter()
//       const isAuthenticated = useSelector(
//         (state:RootState)=>
//             state.auth.isAuthenticated
//       );
//       useEffect(()=>{
//         if(!isAuthenticated){
//             router.push("/login")
//         }
//       },[isAuthenticated,router])
//       if(!isAuthenticated){
//         return null
//       }
//       return <>{children}</>

// }
// export default ProtectedRoute

"use client";

import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({
    children,
}: ProtectedRouteProps) => {

    const router = useRouter();

    const { isAuthenticated, isLoading } =
        useSelector(
            (state: RootState) => state.auth
        );

    useEffect(() => {

        if (!isLoading && !isAuthenticated) {
            router.push("/login");
        }

    }, [
        isAuthenticated,
        isLoading,
        router
    ]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
};

export default ProtectedRoute;