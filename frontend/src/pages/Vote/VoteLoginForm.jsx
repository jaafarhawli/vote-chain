import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/VOTE CHAIN-logo-black.png';
import Button from '../../components/Reusable/Button';
import FormInput from '../../components/Reusable/FormInput';
import axios from '../../api/axios';
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { updateVoter } from '../../redux/voter';
import { viewElection } from '../../redux/election';

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
    <div className='bg-gradient-to-br from-white/70 to-white/30 w-[450px]  rounded-xl flex flex-col items-center p-6 pb-10 backdrop-blur-2xl shadow-2xl before:absolute before:bg-white/[15%] before:inset-0 before:rotate-[-5deg] before:-z-[1] before:rounded-xl'>
      <img src={logo} alt="logo" className='w-[180px]' />
      <div className='bg-black-100 h-[2px] w-[180px]'></div>  
      <h1 className='my-4 text-2xl font-semibold text-purple-100'>Welcome!</h1>  
      <h1 className={error? 'text-red ' : 'hidden'}>{message}</h1>
      <form className='w-4/5 flex flex-col gap-5 '>
          <FormInput type="text" className='border-0' onChange={e => setCode(e.target.value)}>Election Code</FormInput>          
          <FormInput type="text" className='border-0' onChange={e => setId(e.target.value)}>ID</FormInput>          
          <FormInput type="text" className='border-0' onChange={e => setKey(e.target.value)}>Key</FormInput>                
          <Button className='bg-cyan' onClick={handleSubmit}>Join</Button>
      </form> 
    </div>
  );
}

export default VoteLoginForm;