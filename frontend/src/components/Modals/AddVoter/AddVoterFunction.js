import axios from "../../../api/axios";

export const addVoter = async (name, email, address, election_id, refetch, closeModal) => {

    const form = {
        name: name,
        email: email,
        wallet_address: address,
        election_id: election_id,
    }     
    try {
         await axios.post('voter', form, {
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
                success: error.response.data.message,
                successModal: true
            }
        }   
}