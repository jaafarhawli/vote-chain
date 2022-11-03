import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/VOTE CHAIN-logo-black.png';
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
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = async() => {
      if(confirm!==password) {
          setError('Passwords didnt match');
          return;
      }
      const form = {
          first_name: firstname,
          last_name: lastname,
          email: email,
          password: password
      }
      try {
        const signup = await axios.post('auth/signup/user', form);
        console.log(signup.data.user._id);
        localStorage.setItem('firstname', firstname);
        localStorage.setItem('lastname', lastname);
        localStorage.setItem('email', email);
        localStorage.setItem('token', signup.data.token);
        localStorage.setItem('id', signup.data.user._id);
        navigate('/main');
      } catch (error) {
        setError(error.message);
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
    <div className='bg-gradient-to-br from-white/70 to-white/30 w-[450px]  rounded-xl flex flex-col items-center p-6 pb-10 backdrop-blur-2xl shadow-2xl before:absolute before:bg-white/[15%] before:inset-0 before:rotate-[-5deg] before:-z-[1] before:rounded-xl'>
      <img src={logo} alt="logo" className='w-[180px]' />
      <div className='bg-black-100 h-[2px] w-[180px]'></div>  
      <h1 className='my-4 text-2xl font-semibold text-purple-100'>Create Account</h1>  
      <h1 className='text-red pb-2'>{error}</h1>
      <form className='w-4/5 flex flex-col gap-5 '>
          <div className='flex gap-2'>
            <FormInput type="text" className='border-0' onChange={e => setFirstname(e.target.value)}>First Name</FormInput> 
            <FormInput type="text" className='border-0' onChange={e => setLastname(e.target.value)}>Last Name</FormInput> 
          </div>
          <FormInput type="email" className='border-0' onChange={e => setEmail(e.target.value)}>Email</FormInput> 
          <FormInput type="password" className='border-0' onChange={e => setPassword(e.target.value)}>Password</FormInput> 
          <FormInput type="password" className='border-0' onChange={e => setConfirm(e.target.value)}>Confirm Password</FormInput> 
          <Button className='bg-cyan' onClick={handleSubmit} disabled={disabled} >Get Started</Button>
      </form> 
      <p className='mt-4 text-[16px]'>Already have an account? <span className='font-semibold text-purple-100 select-none hover:underline' onClick={() => navigate('/login')}>Log in</span></p>
    </div>
  );
}

export default RegisterForm;
