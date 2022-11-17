import React, {useState} from 'react'
import Form from '../../../components/Complex/Form/Form'
import { register } from '../../../api/register'
import * as SecureStore from 'expo-secure-store';

const Register = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
      if(password!==confirm)
      return setMessage('Passwords didnt match');
      const token = await register(username, password);
      if(token.data) {
        await SecureStore.setItemAsync('token', token.data);
        let result = await SecureStore.getItemAsync('token');
        setMessage('');
        return console.log(result);
      }
      else
      setMessage(token)
  }

  return (
    <Form onSubmit={handleSubmit} setUsername={text => setUsername(text)} setPassword={text => setPassword(text)} setConfirm={text => setConfirm(text)} register={true} message={message} />
  )
}

export default Register
