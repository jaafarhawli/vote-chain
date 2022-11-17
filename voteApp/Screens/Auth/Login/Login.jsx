import React, {useState} from 'react'
import { login } from '../../../api/login';
import * as SecureStore from 'expo-secure-store';
import Form from '../../../components/Complex/Form/Form';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    const token = await login(username, password);
    await SecureStore.setItemAsync('token', token);
    let result = await SecureStore.getItemAsync('token');
    console.log(result);
  }

  return (
    <Form onSubmit={handleSubmit} setUsername={text => setUsername(text)} setPassword={text => setPassword(text)} />
  )
}

export default Login

