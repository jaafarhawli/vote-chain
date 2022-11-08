import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import logo from '../../assets/VOTE CHAIN-logo-black.png';
import Button from '../../components/Reusable/Button';
import axios from '../../api/axios';

const EmailVerification = () => {

    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);

    const param = useParams();

    useEffect(() => {
      const verifyEmailUrl = async () => {
          try {
            const data = await axios.get(`/email/verify/${param.id}/${param.token}`);
            console.log(data);
              
            } catch (error) {
               setMessage(error);
               setError(true); 
              console.log(error);
            }  
          }
          verifyEmailUrl();
    }, [param]);


  return (
    <div className='flex flex-col w-screen h-screen bg-purple-300 justify-center items-center gap-3'>
      <img src={logo} alt="" className='w-[300px]' />
      <Button>Login</Button>
      {/* <p className={error ? 'text-center text-[24px] text-red' : 'text-center text-[24px] text-green'}>{message}</p> */}
    </div>
  );
}

export default EmailVerification;
