import axios from "./axios/axios";

export const login = async (username, password) => {
    const form = {
        username: username,
        password: password
    } 
    try {
        const data = await axios.post('auth/login/account', form);
        return data.data;
      } catch (error) {
        console.log(error);
      }
}