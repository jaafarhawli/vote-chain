import axios from "./axios/axios";

export const viewUser = async (token) => {
    const form = {
        token: token
    } 
    try {
        const data = await axios.post('app/token', form);
        return data;
      } catch (error) {
        console.log(error);
        return error.response.data.message;
      }
}