import { Outlet } from "react-router-dom";
import axios from "../api/axios";
import VoteLogin from "../pages/Vote/VoteLogin";

const voterAuth = () => {
    if(!localStorage.token)
    return false;
    const form = {
        token: localStorage.token
    };
    try {
        axios.post('auth/token/voter', form);
        return true
    }
    catch (error) {
        return false
    }
};

const ProtectedVoterRoutes = () => {
    const isAuth = voterAuth();
    return isAuth ? <Outlet /> : <VoteLogin />
};

export default ProtectedVoterRoutes