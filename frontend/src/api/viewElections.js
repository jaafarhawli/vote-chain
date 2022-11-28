import axios from "./axios";

export const viewElections = async (user_id) => {
    return axios.get(`election/${user_id}`, {
        headers: {
          Authorization: `bearer ${localStorage.token}`
        }
      }).then((res) => res.data.data);
}