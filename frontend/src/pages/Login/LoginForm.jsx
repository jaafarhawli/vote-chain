import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/VOTE CHAIN-logo-black.png';
import axios from '../../api/axios';
import jwt_decode from "jwt-decode";
import Button from '../../components/Reusable/Button';

const LoginForm = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    const form = {
        email: email,
        password: password
    };
    try {
        const data = await axios.post('auth/login/user', form);
        const token = data.data;
        const decoded = jwt_decode(token);
        localStorage.setItem('token', token);
        localStorage.setItem('email', decoded.email);
        try {
          const user = await axios.get(`user/${decoded.email}`, {
            headers: {
              Authorization: `bearer ${localStorage.token}`
            }
          });
          localStorage.setItem('firstname', user.data.first_name);
          localStorage.setItem('lastname', user.data.last_name);
          localStorage.setItem('id', user.data._id);
          navigate('/main');
        } catch (error) {
          console.log(error);
        }
    }
    catch (error) {
        setError(true);
        console.log(error);
    }
  }

  return (
    <div className='bg-gradient-to-br from-white/70 to-white/30 w-[450px]  rounded-xl flex flex-col items-center p-6 pb-10 backdrop-blur-2xl shadow-2xl before:absolute before:bg-white/[15%] before:inset-0 before:rotate-[-5deg] before:-z-[1] before:rounded-xl'>
      <img src={logo} alt="logo" className='w-[180px]' />
      <div className='bg-black-100 h-[2px] w-[180px]'></div>  
      <h1 className='my-4 text-2xl font-semibold text-purple-100'>Welcome!</h1>  
      <h1 className={error? 'text-red ' : 'hidden'}>Invalid Credentials</h1>
      <form className='w-4/5 flex flex-col gap-5 '>
          <label>
              <p className='font-medium'>Email</p>
              <input type="email" onChange={e => setEmail(e.target.value)}/>
          </label>
          <label>
              <p className='font-medium'>Password</p>
              <input type="password" onChange={e => setPassword(e.target.value)}/>
          </label>
          <Button className='bg-cyan' onClick={handleSubmit}>Login</Button>
      </form> 
      <p className='mt-4 text-[16px]'>New to Vote Chain? <span className='font-semibold text-purple-100 select-none hover:underline' onClick={() => navigate('/register')}>Sign up</span></p>
    </div>
  );
}

export default LoginForm;
