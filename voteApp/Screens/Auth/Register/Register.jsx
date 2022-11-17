import React, {useState} from 'react'
import Form from '../../../components/Complex/Form/Form'
import register from '../../../api/register'

const Register = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
      if(password!==confirm)
      return setMessage('Passwords didnt match');
      const token = await register(username, password);
      console.log(token);
  }

  return (
    <Form onSubmit={handleSubmit} setUsername={text => setUsername(text)} setPassword={text => setPassword(text)} setConfirm={text => setConfirm(text)} register={true} message={message} />
  )
}

export default Register
