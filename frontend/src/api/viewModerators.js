import axios from "./axios";

export const viewModerators = async (election_id) => {
    return axios.get(`moderator/${election_id}`, {
                headers: {
                  Authorization: `bearer ${localStorage.token}`
                }
              }).then((res) => res.data.data);
}