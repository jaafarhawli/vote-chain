import axios from "./axios";

export const deleteModerator = async (election_id, user_id, refetch, closeConfirm) => {
    const form = {
        moderator_id: localStorage.moderator_id,
        election_id: election_id,
        user_id: user_id 
    }
    
    try {
        await axios.post('moderator/remove', form, {
            headers: {
              Authorization: `bearer ${localStorage.token}`
            }
          });
          refetch();
          closeConfirm();
        } catch (error) {
          console.log(error.response.data.message);
        }
    }