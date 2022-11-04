import React from 'react';
import banner from '../../assets/banner.png';

const VoteLogin = () => {
  return (
    <div className='bg-gradient-to-r from-purple-100 to-purple-200  flex w-full h-screen justify-center items-center md:justify-between'>
      <div className='flex md:w-1/2 justify-center items-center'>

      </div>
      <img src={banner} alt="/" className='hidden md:flex w-1/2 object-cover h-full' />
    </div>
  );
}

export default VoteLogin;
