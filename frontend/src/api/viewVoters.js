import axios from "./axios";

export const viewVoters = async (election_id) => {
    return axios.get(`voter/voters/${election_id}`, {
                headers: {
                  Authorization: `bearer ${localStorage.token}`
                }
              }).then((res) => res.data.data);
}