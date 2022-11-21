import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/VOTE CHAIN-logo-black.png';
import axios from '../../api/axios';
import jwt_decode from "jwt-decode";
import Button from '../../components/Reusable/Button';
import FormInput from '../../components/Reusable/FormInput';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/user';

const LoginForm = ({socket}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = async () => {
    const form = {
        email: email,
        password: password
    };
    try {
        const data = await axios.post('auth/login/user', form);
        const token = data.data;
        const decoded = jwt_decode(token);
        dispatch(updateUser({
          email: decoded.email
        }));
        localStorage.setItem('token', token);
        try {
          const user = await axios.get(`user/${decoded.email}`, {
            headers: {
              Authorization: `bearer ${localStorage.token}`
            }
          });
          socket.emit('login', decoded.email);
          dispatch(updateUser({
            firstName: user.data.data.first_name,
            lastName: user.data.data.last_name,
            id: user.data.data._id
          }));
          navigate('/main');
        } catch (error) {
          console.log(error);
        }
    }
    catch (error) {
        setError(true);
        setMessage(error.response.data.message);
        console.log(error.response.data.message);
    }
  }

  useEffect(() => {
    if(email==='' || password==='')
    setDisabled(true)
    else
    setDisabled(false)
  }, [email, password]);

  return (
    <div className='bg-gradient-to-br from-white/70 to-white/30 w-[450px]  rounded-xl flex flex-col items-center p-6 pb-10 backdrop-blur-2xl shadow-2xl before:absolute before:bg-white/[15%] before:inset-0 before:rotate-[-5deg] before:-z-[1] before:rounded-xl'>
      <img src={logo} alt="logo" className='w-[180px]' />
      <div className='bg-black-100 h-[2px] w-[180px]'></div>  
      <h1 className='my-4 text-2xl font-semibold text-purple-100'>Welcome!</h1>  
      <h1 className={error? 'text-red ' : 'hidden'}>{message}</h1>
      <form className='w-4/5 flex flex-col gap-5 '>
          <FormInput type="email" className='border-0' onChange={e => setEmail(e.target.value)}>Email</FormInput>          
          <FormInput type="password" className='border-0' onChange={e => setPassword(e.target.value)}>Password</FormInput>                
          <Button className='bg-cyan' onClick={handleSubmit} disabled={disabled} >Login</Button>
      </form> 
      <p className='mt-4 text-[16px]'>New to Vote Chain? <span className='font-semibold text-purple-100 select-none hover:underline' onClick={() => navigate('/register')}>Sign up</span></p>
    </div>
  );
}

export default LoginForm
