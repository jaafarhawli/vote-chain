import React from 'react';
import RegisterForm from './RegisterForm';
import bg from '../../assets/register2.png';

const Register = () => {
  return (
    <div className='bg-no-repeat bg-center bg-cover  flex w-full h-screen justify-center items-center md:justify-between' style={{backgroundImage: `url("${bg}")`}}>
      <div className='flex md:w-1/2 justify-center items-center'>
          <RegisterForm className='' />
      </div>
    </div>
  );
}

export default Register;
