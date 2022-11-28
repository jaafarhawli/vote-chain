import axios from "../../../api/axios";
import jwt_decode from "jwt-decode";
import { updateVoter } from '../../../redux/voter';
import { viewElection } from '../../../redux/election';

export const login = async (code, id, key, dispatch, navigate) => {
    const form = {
        election_code: code,
        voter_id: id,
        voter_key: key
    };
    // Get jwt if credentials are correct
    try {
        const data = await axios.post('auth/login/voter', form);
        const token = data.data;
        const decoded = jwt_decode(token);
        localStorage.setItem('token', token);
        // Get the voter id from the jwt and load the rest of the voter's data
        try {
            const user = await axios.get(`voter/${decoded.voter_id}`, {
              headers: {
                Authorization: `bearer ${localStorage.token}`
              }
            });
            dispatch(updateVoter({
              id: user.data.data._id,
              email: user.data.data.email,
              election_id: user.data.data.election_id,
              voted: user.data.data.voted,
              chosenParty: user.data.data.chosenParty,
              chosenCandidate: user.data.data.chosenCandidate
            }));
            // Get the data of the election which the voter is accessing 
            try {
                const election = await axios.get(`voter/election/${user.data.data.email}/${user.data.data.election_id}`, {
                  headers: {
                    Authorization: `bearer ${localStorage.token}`
                  }
                });  
                dispatch(viewElection({
                  id: election.data.data._id,
                  title: election.data.data.title,
                  startTime: election.data.data.start_time,
                  endTime: election.data.data.end_time,
                  description: election.data.data.description,
                  address: election.data.data.contract_address
                }));         
                navigate('/vote/main');
                return null;
              } catch (error) {
                console.log(error.response.data.message);
                return {
                    error: true,
                    message: error.response.data.message
                }
              }
          } catch (error) {             
            console.log(error.response.data.message);
            return {
                error: true,
                message: error.response.data.message
            }
          }         
    }
    catch (error) {
        console.log(error.response.data.message);
        return {
            error: true,
            message: error.response.data.message
        }
    }
  }