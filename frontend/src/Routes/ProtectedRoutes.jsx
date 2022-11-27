import { Outlet } from "react-router-dom";

import { userAuth } from "../api/userAuth";
import Login from "../pages/Login/Login";

import { voterAuth } from "../api/voterAuth";
import VoteLogin from "../pages/Vote/VoteLogin";


export const ProtectedRoutes = () => {
    const isAuth = userAuth();
    return isAuth ? <Outlet /> : <Login />
};

export const ProtectedVoterRoutes = () => {
    const isAuth = voterAuth();
    return isAuth ? <Outlet /> : <VoteLogin />
};

