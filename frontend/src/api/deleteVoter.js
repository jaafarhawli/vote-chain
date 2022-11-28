import axios from "./axios";
import { closeModal } from "../components/Modals";

export const deleteVoter = async (election_id, user_id, refetch, setConfirmModal) => {
    const form = {
        voter_id: localStorage.voter_id,
        election_id: election_id,
        user_id: user_id 
    }
    
    try {
        await axios.post('voter/remove', form, {
            headers: {
              Authorization: `bearer ${localStorage.token}`
            }
          });
          refetch();
          closeModal(setConfirmModal)
        } catch (error) {
          console.log(error.response.data.message);
        }
}
