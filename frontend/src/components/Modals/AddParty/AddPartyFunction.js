import axios from "../../../api/axios";

export const addParty = async (name, election_id, user_id, refetch, closeModal) => {

    const form = {
        name: name,
        election_id: election_id,
        user_id: user_id
    }
    
    try {
         await axios.post('party', form, {
            headers: {
              Authorization: `bearer ${localStorage.token}`
            }
          });
          refetch();
          closeModal();
          return null;
        } catch (error) {
            console.log(error.response.data.message);
            return {
                error: error.response.data.message,
                errorModal: true
            }
        }  
}