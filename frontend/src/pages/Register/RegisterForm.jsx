import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/VOTE CHAIN-logo-black.png';
import axios from '../../api/axios';

const RegisterForm = () => {

  const navigate = useNavigate();

  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const [error, setError] = useState('');

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

  return (
    <div className='bg-gradient-to-br from-white/70 to-white/30 w-[450px]  rounded-xl flex flex-col items-center p-6 pb-10 backdrop-blur-2xl shadow-2xl before:absolute before:bg-white/[15%] before:inset-0 before:rotate-[-5deg] before:-z-[1] before:rounded-xl'>
      <img src={logo} alt="logo" className='w-[180px]' />
      <div className='bg-black-100 h-[2px] w-[180px]'></div>  
      <h1 className='my-4 text-2xl font-semibold text-purple-100'>Create Account</h1>  
      <h1 className='text-red pb-2'>{error}</h1>
      <form className='w-4/5 flex flex-col gap-5 '>
          <div className='flex gap-2'>
            <label>
                <p className='font-medium'>First Name</p>
                <input type="text" onChange={e => setFirstname(e.target.value)}/>
            </label>
            <label>
                <p className='font-medium'>Last Name</p>
                <input type="text" onChange={e => setLastname(e.target.value)}/>
            </label>
          </div>
          <label>
              <p className='font-medium'>Email</p>
              <input type="email" onChange={e => setEmail(e.target.value)}/>
          </label>
          <label>
              <p className='font-medium'>Password</p>
              <input type="password" onChange={e => setPassword(e.target.value)}/>
          </label>
          <label>
              <p className='font-medium'>Confirm Password</p>
              <input type="password" onChange={e => setConfirm(e.target.value)}/>
          </label>
          <button className='bg-cyan' type="button" onClick={handleSubmit} >Get Started</button>
      </form> 
      <p className='mt-4 text-[16px]'>Already have an account? <span className='font-semibold text-purple-100 select-none hover:underline' onClick={() => navigate('/login')}>Log in</span></p>
    </div>
  );
}

export default RegisterForm;
