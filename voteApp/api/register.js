import axios from "./axios/axios";

export const register = async (username, password) => {
    const form = {
        username: username,
        password: password,
    } 
    try {
        const data = await axios.post('app/register', form);
        return data.data;
      } catch (error) {
        console.log(error);
        return error.response.data.message;
      }
}