import axios from "./axios";
import { closeModal } from "../components/Modals";

export const deleteCandidate = async (election_id, user_id, setConfirmModal, refetch) => {
    const form = {
        candidate_id: localStorage.candidate_id,
        party_id: localStorage.party_id,
        election_id: election_id,
        user_id: user_id 
    }
    
    try {
        await axios.post('candidate/remove', form, {
            headers: {
              Authorization: `bearer ${localStorage.token}`
            }
          });
          closeModal(setConfirmModal);
          refetch();
        } catch (error) {
          console.log(error.response.data.message);
        }
    }