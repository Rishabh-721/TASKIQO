import React,{useState, useEffect, createContext} from "react";
import API from "../components/API";
import { Navigate } from 'react-router-dom';


const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const logout = () => {
        setUser(null);
        setLoading(true);
    }

    const checkAuth = async() => {
        try {
            const response = await API('GET', "auth/profile");
            setUser(response.data?.data);
            return true;
        } catch (error) {
            logout()
            return false;
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        checkAuth();
    }, []);

    return <AuthContext.Provider value={{user, loading, checkAuth, logout}}>
        {children}
    </AuthContext.Provider>
}

export {AuthContext, AuthProvider}