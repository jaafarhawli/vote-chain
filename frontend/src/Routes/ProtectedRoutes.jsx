import { Outlet } from "react-router-dom";

import { userAuth } from "../api/userAuth";

import { voterAuth } from "../api/voterAuth";
import Auth from "../pages/Auth/Auth";


export const ProtectedRoutes = ({socket}) => {
    const isAuth = userAuth();
    return isAuth ? <Outlet /> : <Auth login={true} socket={socket} />
};

export const ProtectedVoterRoutes = () => {
    const isAuth = voterAuth();
    return isAuth ? <Outlet /> : <Auth voterLogin={true} />
};

