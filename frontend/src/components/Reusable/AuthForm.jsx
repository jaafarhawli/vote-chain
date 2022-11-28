import React from 'react';
import logo from '../../assets/VOTE CHAIN-logo-white.png';

const AuthForm = ({title, content, error, message}) => {
  return (
    <div className='bg-gradient-to-br from-bg/50 to-bg/30 w-[450px]  rounded-xl flex flex-col items-center p-6 pb-10 backdrop-blur-2xl shadow-2xl before:absolute before:bg-white/[15%] before:inset-0 before:rotate-[-5deg] before:-z-[1] before:rounded-xl neon'>
      <img src={logo} alt="logo" className='w-[180px]' />
      <div className='bg-white h-[2px] w-[180px]'></div>  
      <h1 className='my-4 text-2xl font-semibold text-white'>{title}</h1>  
      <h1 className={error ? 'text-red pb-6' : 'text-green pb-6'}>{message}</h1>
      {content}
    </div>
  );
}

export default AuthForm;
