import React from 'react';
import logo from '../assets/VOTE CHAIN-logo-white-horizantal.png';

const Hero = () => {
  return (
    <div className='bg-gradient-to-b from-black-100 to to-black-200 h-96 px-16'>
      <div className='flex w-full py-4 items-center justify-between'>
        <img src={logo} alt="logo" className='w-48' />
        <div className='flex gap-4'>
            <button className='border-cyan border-2 bg-opacity-0 hover:border-white'>Login</button>
            <button>Register</button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
