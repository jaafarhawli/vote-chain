import axios from "../../../api/axios";
import { voteCandidate } from "../../../Web3";
import { updateVoter } from "../../../redux/voter";

export const vote = async (selectedCandidateId, election_address, voter_id, selectedParty, selectedPartyName, selectedCandidate, selectedCandidateName, dispatch, navigate) => {

    // Await adding the vote to the blockchain
    await voteCandidate(selectedCandidateId, election_address);
    const form = {
        id: voter_id,
        party_id: selectedParty,
        candidate_id: selectedCandidate
    }     
    try {
         await axios.post('voter/vote', form, {
            headers: {
              Authorization: `bearer ${localStorage.token}`
            }
          });
          dispatch(updateVoter({
            chosenParty: selectedPartyName,
            chosenCandidate: selectedCandidateName, 
            voted: true
          }));
          navigate('/vote/main/results');
        } catch (error) {
            console.log(error.response.data.message);
        }  
}