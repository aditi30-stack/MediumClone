import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { Navigate } from "react-router-dom"

export const ProtectedRoute = ({children}: {children: React.ReactNode}) =>{
    
    const LoggedStatus = useSelector((state: RootState) => state.auth.isLoggedIn)

    if (!LoggedStatus) {
        return <Navigate to="/signin"  />;
    }
    return <>
    {children}
    </>

}