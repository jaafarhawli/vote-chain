import axios from "./axios";

export const viewApplicants = async (election_id) => {
    return axios.get(`election/view/applyers/${election_id}`, {
                headers: {
                  Authorization: `bearer ${localStorage.token}`
                }
              }).then((res) => res.data.data);
}