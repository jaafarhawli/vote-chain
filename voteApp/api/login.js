import axios from "./axios/axios";

export const login = async (code, id, key) => {
    const form = {
      election_code: code,
      voter_id: id,
      voter_key: key
    };
    try {
      const data = await axios.post('auth/login/voter', form);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }