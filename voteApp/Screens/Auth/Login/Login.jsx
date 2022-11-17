import React, {useState} from 'react'
import { login } from '../../../api/login';
import * as SecureStore from 'expo-secure-store';
import Form from '../../../components/Complex/Form/Form';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    const token = await login(username, password);
    if(token.data) {
      await SecureStore.setItemAsync('token', token.data);
      setMessage('');
      let result = await SecureStore.getItemAsync('token');
      return console.log(result);
    }
    else 
    setMessage(token);
  }

  return (
    <Form onSubmit={handleSubmit} setUsername={text => setUsername(text)} setPassword={text => setPassword(text)} message={message} />
  )
}

export default Login