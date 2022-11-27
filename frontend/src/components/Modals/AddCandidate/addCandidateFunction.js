import axios from "../../../api/axios";

export const addCandidate = async (name, election_id, user_id, image) => {

    const form = {
        name: name,
        party_id: localStorage.party_id,
        election_id: election_id,
        user_id: user_id
    }
    
    try {
         const data = await axios.post('candidate/', form, {
            headers: {
              Authorization: `bearer ${localStorage.token}`
            }
          });

          localStorage.setItem('candidate_id', data.data.data._id);
          if(image) {
            const formData = new FormData();

            formData.append('candidate_id',localStorage.candidate_id);
            formData.append('party_id', localStorage.party_id);
            formData.append('candidateImg',image, image.name);

            try {
                await axios.post('candidate/image', formData, {
                   headers: {
                     Authorization: `bearer ${localStorage.token}`
                   }
                 });
  
               } catch (error) {
                    console.log(error.resoonse.data.message);
                   return {
                       error: error.resoonse.data.message,
                       isError: true,
                       errorModal: true
                   }
               }
          }
          return {
            error: "Candidate added",
            isError: false,
            errorModal: true
            }
        } catch (error) {
            console.log(error.resoonse.data.message);
            return {
                error: error.resoonse.data.message,
                isError: true,
                errorModal: true
            }
        }
    }