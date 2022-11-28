import axios from "./axios";

export const viewModeratorElections = async (user_id) => {
    return axios.get(`election/moderator/${user_id}`, {
        headers: {
          Authorization: `bearer ${localStorage.token}`
        }
      }).then((res) => res.data.data);
}