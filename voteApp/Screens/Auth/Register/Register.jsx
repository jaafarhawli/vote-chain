import React, {useState} from 'react'
import Form from '../../../components/Complex/Form/Form'

const Register = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = () => {
      console.log(username, password, confirm);
  }

  return (
    <Form onSubmit={handleSubmit} setUsername={text => setUsername(text)} setPassword={text => setPassword(text)} setConfirm={text => setConfirm(text)} register={true} />
  )
}

export default Register
