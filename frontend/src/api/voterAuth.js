import axios from "./axios";

export const voterAuth = () => {
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