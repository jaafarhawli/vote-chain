import axios from "./axios";

export const viewParties = async (election_id) => {
    return axios.get(`party/${election_id}`, {
                headers: {
                  Authorization: `bearer ${localStorage.token}`
                }
              }).then((res) => res.data.data);
}