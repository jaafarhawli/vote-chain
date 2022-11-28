import axios from "./axios";

export const viewCandidates = async (election_id) => {
    return axios.get(`candidate/${election_id}`, {
                headers: {
                  Authorization: `bearer ${localStorage.token}`
                }
              }).then((res) => res.data.data);
}