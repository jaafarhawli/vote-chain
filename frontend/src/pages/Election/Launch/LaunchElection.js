import axios from '../../../api/axios';
import { addCandidates, addVotersToBlockchain as addVoters, launchElection as launchToBlockchain } from '../../../Web3';
import { viewElection } from '../../../redux/election';

// Add the election candidates list inside the database to the blockchain
const addCandidatesToBlockchain = async (data, election_address) => {
    let candidates = [];
    let parties = [];
    for(let candidate of data) {
      candidates.push(candidate.name);
      parties.push(candidate.party);
    }
    await addCandidates(candidates, parties, election_address);
  }

// Add the election moderators list inside the database to the blockchain
const addVotersToBlockChain = async (voters, election_address) => {
  let voters_addresses = [];
  for(let voter of voters) {
    voters_addresses.push(voter.voter_wallet_address);
  }
  await addVoters(voters_addresses, election_address);
}

// Launch the election in blockchain and database
export const launchElection = async (election_id, user_id, election_address, data, voters, dispatch, setDisabled, setConfirmModal) => {
    const form = {
        election_id: election_id,
        user_id: user_id 
    }
    await addCandidatesToBlockchain(data, election_address);
    await addVotersToBlockChain(voters, election_address);
    await launchToBlockchain(election_address);     
    try {
        await axios.put('election/launch', form, {
            headers: {
              Authorization: `bearer ${localStorage.token}`
            }
          });
          dispatch(viewElection({
            launched: true,
          }));
          setDisabled(true);
          setConfirmModal(false);
        } catch (error) {
          console.log(error);
        }
    }