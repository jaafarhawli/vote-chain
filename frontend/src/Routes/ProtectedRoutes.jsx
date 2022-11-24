import { Outlet } from "react-router-dom";
import axios from "../api/axios";
import Login from "../pages/Login/Login";

const userAuth = () => {
    if(!localStorage.token)
    return false;
    const form = {
        token: localStorage.token
    };
    try {
        axios.post('auth/token', form);
        return true
    }
    catch (error) {
        return false
    }
};

const ProtectedRoutes = () => {
    const isAuth = userAuth();
    return isAuth ? <Outlet /> : <Login />
};

export default ProtectedRoutes;
