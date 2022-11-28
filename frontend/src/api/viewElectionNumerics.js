import axios from "./axios";

export const viewElectionNumerics = async (election_id) => {
    return axios.get(`statistics/${election_id}`, {
               headers: {
                 Authorization: `bearer ${localStorage.token}`
               }
             }).then((res) => res.data.numerics);     
 }