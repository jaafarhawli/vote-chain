import axios from "./axios";

export const removeApplicant = async (id, election_id, user_id, refetch) => {
    const form = {
        applier_id: id,
        election_id: election_id,
        user_id: user_id 
    }
    try {
        await axios.post('voter/remove/applicant', form, {
            headers: {
              Authorization: `bearer ${localStorage.token}`
            }
        });
        refetch();
    } 
    catch (error) {
        console.log(error.response.data.message);
    }
}