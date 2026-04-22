import { useAuth } from "../context/authContext";
import React from 'react' ;
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = ({children , requiredRole}) =>{
    const {user,loading} = useAuth()

    if(loading){
        return <div>...Loading!</div>
    }
    if(!requiredRole.includes(user.Role)){
         <Navigate to="/unauthorized"/>
    }
    return user ? children : <Navigate to= "/login"/>
}

export default ProtectedRoutes;