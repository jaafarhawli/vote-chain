import axios from "./axios";

export const userAuth = () => {
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