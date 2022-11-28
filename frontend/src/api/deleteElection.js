import axios from "./axios";

export const deleteElection = async (election_id, user_id, navigate) => {
    const form = {
        election_id: election_id, 
        user_id: user_id 
    }
    
    try {
        await axios.post('election/delete', form, {
            headers: {
              Authorization: `bearer ${localStorage.token}`
            }
          });
          navigate('/main');
        } catch (error) {
          console.log(error.response.data.message);
        }
}