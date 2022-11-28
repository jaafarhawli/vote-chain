import React, {useState, useEffect} from 'react';
import logo from '../../assets/VOTE CHAIN-logo-white.png';
import Button from '../../components/Reusable/Button';
import axios from '../../api/axios';
import {useParams, useNavigate} from 'react-router-dom';

// This page pops up when you click on the link sent to you by email to verify your account on register
const EmailVerification = () => {

    const [message, setMessage] = useState();
    const [error, setError] = useState(false);

    const param = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      const verifyEmailUrl = async () => {
          try {
            const data = await axios.get(`/email/verify/${param.id}/${param.token}`);
            setMessage(data);
              
            } catch (error) {
               setMessage(error);
               setError(true); 
              console.log(error);
            }  
          }
          verifyEmailUrl();
    }, [param]);


  return (
    <div className='flex flex-col w-screen h-screen bg-bg justify-center items-center gap-3'>
      <img src={logo} alt="" className='w-[300px]' />
      <Button onClick={() => navigate('/login')} >Login</Button>
      <p className={error ? 'text-center text-[24px] text-red' : 'text-center text-[24px] text-green'}>{error ? message : "Email verified"}</p>
    </div>
  );
}

export default EmailVerification;
