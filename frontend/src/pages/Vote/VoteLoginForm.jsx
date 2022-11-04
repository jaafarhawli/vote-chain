import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/VOTE CHAIN-logo-black.png';
import Button from '../../components/Reusable/Button';
import FormInput from '../../components/Reusable/FormInput';

const VoteLoginForm = () => {

  const navigate = useNavigate();

  const [code, setCode] = useState('');
  const [id, setId] = useState('');
  const [key, setKey] = useState('');
  const [error, setError] = useState(false);

  return (
    <div className='bg-gradient-to-br from-white/70 to-white/30 w-[450px]  rounded-xl flex flex-col items-center p-6 pb-10 backdrop-blur-2xl shadow-2xl before:absolute before:bg-white/[15%] before:inset-0 before:rotate-[-5deg] before:-z-[1] before:rounded-xl'>
      <img src={logo} alt="logo" className='w-[180px]' />
      <div className='bg-black-100 h-[2px] w-[180px]'></div>  
      <h1 className='my-4 text-2xl font-semibold text-purple-100'>Welcome!</h1>  
      <h1 className={error? 'text-red ' : 'hidden'}>Invalid Credentials</h1>
      <form className='w-4/5 flex flex-col gap-5 '>
          <FormInput type="text" className='border-0' onChange={e => setCode(e.target.value)}>Election Code</FormInput>          
          <FormInput type="text" className='border-0' onChange={e => setId(e.target.value)}>ID</FormInput>          
          <FormInput type="text" className='border-0' onChange={e => setKey(e.target.value)}>Key</FormInput>                
          <Button className='bg-cyan'>Login</Button>
      </form> 
    </div>
  );
}

export default VoteLoginForm;