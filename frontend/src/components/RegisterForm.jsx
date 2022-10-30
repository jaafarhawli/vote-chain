import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/VOTE CHAIN-logo-black.png';
import axios from '../api/axios';

const RegisterForm = () => {

  const navigate = useNavigate();

  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const [error, setError] = useState(false);

  return (
    <div>
      
    </div>
  );
}

export default RegisterForm;
