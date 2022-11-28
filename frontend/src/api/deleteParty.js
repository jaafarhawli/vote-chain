import axios from "./axios";
import { closeModal } from "../components/Modals";

export const deleteParty = async (election_id, user_id, refetch, setConfirmModal) => {
    const form = {
        party_id: localStorage.party_id,
        election_id: election_id,
        user_id: user_id 
    }
    
    try {
        await axios.post('party/remove', form, {
            headers: {
              Authorization: `bearer ${localStorage.token}`
            }
          });
          refetch();
          closeModal(setConfirmModal);
        } catch (error) {
          console.log(error.response.data.message);
        }
    }