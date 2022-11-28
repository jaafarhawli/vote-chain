import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/user';
import {AuthForm, FormInput, Button} from '../../components/Reusable';

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
