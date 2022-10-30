import React from 'react';
import logo from '../assets/VOTE CHAIN-logo-black.png';

const LoginForm = () => {
  return (
    <div className='bg-gradient-to-r from-white/40 to-white/20 w-[400px]  rounded-xl flex flex-col items-center p-6 pb-10 backdrop-blur-xl shadow-2xl'>
      <img src={logo} alt="logo" className='w-[180px]' />
      <div className='bg-black-100 h-[2px] w-[180px]'></div>  
      <h1 className='mt-4 text-2xl font-semibold text-purple-100'>Welcome!</h1>  
      <form className='w-4/5 flex flex-col gap-5 mt-4'>
          <label>
              <p className='font-medium'>Email</p>
              <input type="email"/>
          </label>
          <label>
              <p className='font-medium'>Password</p>
              <input type="password"/>
          </label>
          <button>Login</button>
      </form> 
      <p className='mt-4 text-[16px]'>New to Vote Chain? <span className='font-semibold text-purple-100 underline'>Sign up</span></p>
    </div>
  );
}

export default LoginForm;
