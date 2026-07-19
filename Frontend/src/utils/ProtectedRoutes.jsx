import React, { useContext } from 'react'
import { AuthContext } from './AuthContext'
import {Navigate, Outlet} from 'react-router-dom';

const ProtectedRoutes = () => {
    const {user, loading} = useContext(AuthContext);
    if(loading){
        return <h2>Loading...</h2>
    }

    if(user){
        return <Outlet/>
    }

    return <Navigate to="/" replace />

};
export default ProtectedRoutes;
