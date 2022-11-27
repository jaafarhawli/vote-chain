import React from 'react';
import VoteLoginForm from './VoteLoginForm';
import bg from '../../assets/AuthBg.png';

const VoteLogin = () => {
  return (
    <div className='bg-no-repeat bg-center bg-cover  flex w-full h-screen justify-center items-center md:justify-between' style={{backgroundImage: `url("${bg}")`}}>
      <div className='flex md:w-1/2 justify-center items-center'>
        <VoteLoginForm />
      </div>
    </div>
  );
}

export default VoteLogin;
