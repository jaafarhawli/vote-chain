import { Outlet } from "react-router-dom";

import { userAuth } from "../api/userAuth";

import { voterAuth } from "../api/voterAuth";
import Auth from "../pages/Auth/Auth";

// User protected routes
// Return to login page if not authenticated when trying to access the route
export const ProtectedRoutes = ({socket}) => {
    const isAuth = userAuth();
    return isAuth ? <Outlet /> : <Auth login={true} socket={socket} />
};

// Voter protected routes
// Return to voter login page if not authenticated when trying to access the route
export const ProtectedVoterRoutes = () => {
    const isAuth = voterAuth();
    return isAuth ? <Outlet /> : <Auth voterLogin={true} />
};

