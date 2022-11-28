import axios from "../../../api/axios";
import { checkIfLaunched } from "../../../Web3";
import { viewElection as view } from '../../../redux/election';

// Open moderator panel page for the election 
export const openElection = async (id, user_id, dispatch) => {
    const election = await axios.get(`election/moderator/${user_id}/${id}`, {
    headers: {
      Authorization: `bearer ${localStorage.token}`
    }
  });
  let isLaunched = false;
  // Check is the election is launched in the blockchain
  await checkIfLaunched(election.data.data.contract_address).then((launched) => isLaunched = launched);
    dispatch(view({
        id: id,
        title: election.data.data.title,
        startTime: election.data.data.start_time,
        endTime: election.data.data.end_time,
        code: election.data.data.code,
        launched: isLaunched,
        address: election.data.data.contract_address
    }));
}