import React from 'react';
import logo from '../assets/VOTE CHAIN-logo-white-horizantal.png';

const Hero = () => {
  return (
    <div className='bg-gradient-to-b from-black-100 to to-black-200 h-96 px-16'>
      <div className='flex w-full py-2'>
        <img src={logo} alt="logo" className='w-48' />
        <button className=''>Login</button>
        <button className=''>Register</button>
      </div>
    </div>
  );
}

export default Hero;
