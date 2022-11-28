import React from 'react';
import LoginForm from './LoginForm/LoginForm';
import bg from '../../assets/AuthBg.png';
import RegisterForm from './RegisterForm/RegisterForm';
import VoteLoginForm from './VoteLoginForm';

const Auth = ({socket, login, register, voterLogin}) => {
  return (
    <div className='bg-no-repeat bg-center bg-cover  flex w-full h-screen justify-center items-center md:justify-between' style={{backgroundImage: `url("${bg}")`}}>
      <div className='flex md:w-1/2 justify-center items-center'>
      {login ? 
          <LoginForm className='' socket={socket} />
        : 
        register ?
        <RegisterForm className='' />
        : 
        voterLogin ? 
        <VoteLoginForm />
        : null}
      </div>
    </div>
  );
}

export default Auth;
