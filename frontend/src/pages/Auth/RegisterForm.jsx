import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import {AuthForm, FormInput, Button} from '../../components/Reusable';

const RegisterForm = () => {

  const navigate = useNavigate();

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = async() => {
      if(confirm!==password) {
          setMessage('Passwords didnt match');
          setError(true);
          return;
      }
      if(password.length<8) {
          setMessage('Password should be 8 characters atleast');
          setError(true);
          return;
      }
      const form = {
          first_name: firstname,
          last_name: lastname,
          email: email,
          password: password
      }
      try {
        const signup = await axios.post('email', form);
        setMessage(signup.data);
        setError(false);
      } catch (error) {
        setMessage(error.data);
        setError(true);
        console.log(error);
      }
  }

  useEffect(() => {
    if(email==='' || password.length<8 || confirm.length<8 || firstname==='' || lastname==='')
    setDisabled(true)
    else
    setDisabled(false)
  }, [email, password, confirm, firstname, lastname]);

  return (
    <AuthForm title={'Create Account'} error={error} message={message} content={
      <>
      <form className='w-4/5 flex flex-col gap-5 '>
          <div className='flex gap-2'>
            <FormInput type="text" error={error} required={true} textStyle='text-purple-200' className='border-0' onChange={e => setFirstname(e.target.value)}>First Name</FormInput> 
            <FormInput type="text" error={error} required={true} textStyle='text-purple-200' className='border-0' onChange={e => setLastname(e.target.value)}>Last Name</FormInput> 
          </div>
          <FormInput type="email" error={error} required={true} textStyle='text-purple-200' className='border-0' onChange={e => setEmail(e.target.value)}>Email</FormInput> 
          <FormInput type="password" error={error} required={true} textStyle='text-purple-200' className='border-0' onChange={e => setPassword(e.target.value)}>Password</FormInput> 
          <FormInput type="password" error={error} required={true} textStyle='text-purple-200' className='border-0' onChange={e => setConfirm(e.target.value)}>Confirm Password</FormInput> 
          <Button className='bg-cyan' onClick={handleSubmit} disabled={disabled} >Get Started</Button>
      </form> 
      <p className='mt-4 text-[16px] text-white'>Already have an account? <span className='font-semibold text-cyan select-none hover:underline' onClick={() => navigate('/login')}>Login</span></p>
      </>}
      />
  );
}

export default RegisterForm;
