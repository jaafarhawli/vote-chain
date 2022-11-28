import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {AuthForm, FormInput, Button} from '../../../components/Reusable';
import { login } from './VoterLoginFormFunction';

const VoteLoginForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [code, setCode] = useState('');
  const [id, setId] = useState('');
  const [key, setKey] = useState('');
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    const res = await login(code, id, key, dispatch, navigate);
    if(res) {
      setError(res.error);
      setMessage(res.message);
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