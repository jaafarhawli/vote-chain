import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/VOTE CHAIN-logo-white.png';
import axios from '../../api/axios';
import Button from '../../components/Reusable/Button';
import FormInput from '../../components/Reusable/FormInput';

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
    <div className='bg-gradient-to-br from-bg/50 to-bg/30 w-[450px]  rounded-xl flex flex-col items-center p-6 pb-10 backdrop-blur-2xl shadow-2xl before:absolute before:bg-white/[15%] before:inset-0 before:rotate-[-5deg] before:-z-[1] before:rounded-xl neon'>
      <img src={logo} alt="logo" className='w-[180px]' />
      <div className='bg-white h-[2px] w-[180px]'></div>  
      <h1 className='my-4 text-2xl font-semibold text-white'>Create Account</h1>  
      <h1 className={error ? 'text-red pb-2' : 'text-green pb-2'}>{message}</h1>
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
    </div>
  );
}

export default RegisterForm;
