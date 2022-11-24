import React, {useState, useEffect} from 'react';
import logo from '../../assets/VOTE CHAIN-logo-white.png';
import axios from '../../api/axios';
import Button from '../../components/Reusable/Button';
import FormInput from '../../components/Reusable/FormInput';
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
    <div className='bg-gradient-to-br from-bg/30 to-bg/10 w-[450px]  rounded-xl flex flex-col items-center p-6 pb-10 backdrop-blur-2xl shadow-2xl before:absolute before:bg-white/[15%] before:inset-0 before:rotate-[-5deg] before:-z-[1] before:rounded-xl neon'>
      <img src={logo} alt="logo" className='w-[180px]' />
      <div className='bg-white h-[2px] w-[180px]'></div>  
      <h1 className='my-4 text-2xl font-semibold text-white'>Welcome!</h1>  
      <h1 className={error? 'text-red ' : 'text-green'}>{message}</h1>
      <form className='w-4/5 flex flex-col gap-5 '>
          <FormInput type="email" error={error} required={true} textStyle='text-purple-200' className='border-0' onChange={e => setEmail(e.target.value)}>Email</FormInput>          
          <FormInput type="text" error={error} required={true} textStyle='text-purple-200' className='border-0' onChange={e => setAddress(e.target.value)}>Wallet Account Address</FormInput>                
          <Button className='bg-cyan' onClick={handleSubmit} disabled={disabled} >Send</Button>
      </form> 
    </div>
  );
}

export default SurveyForm;
