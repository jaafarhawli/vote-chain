import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import logo from '../../assets/VOTE CHAIN-logo-black.png';
import Button from '../../components/Reusable/Button';

const EmailVerification = () => {

    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);


  return (
    <div className='flex flex-col w-screen h-screen bg-purple-300 justify-center items-center gap-3'>
      <img src={logo} alt="" className='w-[300px]' />
      <Button>Login</Button>
      <p className={error ? 'text-center text-[24px] text-red' : 'text-center text-[24px] text-green'}>{message}</p>
    </div>
  );
}

export default EmailVerification;
