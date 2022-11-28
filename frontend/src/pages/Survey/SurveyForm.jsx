import React, {useState, useEffect} from 'react';
import axios from '../../api/axios';
import {AuthForm, Button, FormInput} from '../../components/Reusable';
import { useParams } from 'react-router-dom';

const SurveyForm = () => {

  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  const param = useParams();

  const handleSubmit = async () => {
    const form = {
        email: email,
        address: address,
        election_code: param.code
    };
    try {
        await axios.post('voter/apply', form);
        setEmail('');
        setAddress('');
        setMessage('Request is sent');
        setError(false);
    }
    catch (error) {
        setError(true);
        console.log(error.response.data.message);
        setMessage(error.response.data.message);
    }
  }

  useEffect(() => {
    if(email==='' || address==='')
    setDisabled(true)
    else
    setDisabled(false)
  }, [email, address]);

  return (
    <AuthForm title={'Welcome!'} error={error} message={message} content={
      <form className='w-4/5 flex flex-col gap-5 '>
          <FormInput type="email" error={error} required={true} textStyle='text-purple-200' className='border-0' onChange={e => setEmail(e.target.value)}>Email</FormInput>          
          <FormInput type="text" error={error} required={true} textStyle='text-purple-200' className='border-0' onChange={e => setAddress(e.target.value)}>Wallet Account Address</FormInput>                
          <Button className='bg-cyan' onClick={handleSubmit} disabled={disabled} >Send</Button>
      </form> 
    } />    
  );
}

export default SurveyForm;