import React from 'react';
import LoginForm from './LoginForm';
import bg from '../../assets/AuthBg.png';

const Login = ({socket}) => {
  return (
    <div className='bg-no-repeat bg-center bg-cover  flex w-full h-screen justify-center items-center md:justify-between' style={{backgroundImage: `url("${bg}")`}}>
      <div className='flex md:w-1/2 justify-center items-center'>
          <LoginForm className='' socket={socket} />
      </div>
    </div>
  );
}

export default Login;
