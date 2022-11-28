import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Reusable/Button';
import FormInput from '../../components/Reusable/FormInput';
import axios from '../../api/axios';
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { updateVoter } from '../../redux/voter';
import { viewElection } from '../../redux/election';
import AuthForm from './AuthForm';

const VoteLoginForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [code, setCode] = useState('');
  const [id, setId] = useState('');
  const [key, setKey] = useState('');
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    const form = {
        election_code: code,
        voter_id: id,
        voter_key: key
    };
    try {
        const data = await axios.post('auth/login/voter', form);
        const token = data.data;
        const decoded = jwt_decode(token);
        localStorage.setItem('token', token);
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
              } catch (error) {
                console.log(error.response.data.message);
              }
          } catch (error) {             
            console.log(error.response.data.message);
          }
            
    }
    catch (error) {
        setError(true);
        setMessage(error.response.data.message);
        console.log(error.response.data.message);
    }
  }

  return (
    <AuthForm title={'Welcome!'} error={error} message={message} content={
      <>
      <form className='w-4/5 flex flex-col gap-5 '>
          <FormInput type="text" error={error} required={true} textStyle='text-purple-200' className='border-0' onChange={e => setCode(e.target.value)}>Election Code</FormInput>          
          <FormInput type="text" error={error} required={true} textStyle='text-purple-200' className='border-0' onChange={e => setId(e.target.value)}>ID</FormInput>          
          <FormInput type="text" error={error} required={true} textStyle='text-purple-200' className='border-0' onChange={e => setKey(e.target.value)}>Key</FormInput>                
          <Button className='bg-cyan' onClick={handleSubmit}>Join</Button>
      </form> 
      </>}
      />
  );
}

export default VoteLoginForm;