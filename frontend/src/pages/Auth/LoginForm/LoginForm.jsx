import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {AuthForm, FormInput, Button} from '../../../components/Reusable';
import { login } from './LoginFormFunction';

const LoginForm = ({socket}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = async () => {
    const res = await login(email, password, socket, dispatch, navigate);
    if(res) {
      setError(res.error);
      setMessage(res.message);
    }
  }

  useEffect(() => {
    if(email==='' || password==='')
    setDisabled(true)
    else
    setDisabled(false)
  }, [email, password]);

  return (
    <AuthForm title={'Welcome!'} error={error} message={message} content={
      <>
      <form className='w-4/5 flex flex-col gap-5 '>
          <FormInput type="email" error={error} required={true} className='border-0' textStyle='text-purple-200' onChange={e => setEmail(e.target.value)}>Email</FormInput>          
          <FormInput type="password" error={error} required={true} className='border-0' textStyle='text-purple-200' onChange={e => setPassword(e.target.value)}>Password</FormInput>                
          <Button className='bg-cyan' onClick={handleSubmit} disabled={disabled} >Login</Button>
      </form> 
      <p className='mt-4 text-[16px] text-white'>New to Vote Chain? <span className='font-semibold text-cyan select-none hover:underline' onClick={() => navigate('/register')}>Register</span></p>
      </>
    } />
  );
}

export default LoginForm
