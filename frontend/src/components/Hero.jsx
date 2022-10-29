import React from 'react';
import logo from '../assets/VOTE CHAIN-logo-white-horizantal.png';
import {FaRegPlusSquare} from 'react-icons/fa';

const Hero = () => {
  return (
    <div className='flex flex-col bg-gradient-to-b from-black-100 to to-black-200 min-h-[500px] lg:px-16 md:px-10 px-4'>
      <div className='flex w-full py-4 items-center justify-between'>
        <img src={logo} alt="logo" className='w-48' />
        <div className='flex gap-4'>
            <button className='border-cyan border-2 bg-opacity-0 hover:border-white'>Login</button>
            <button>Register</button>
        </div>
      </div>
      <div className='flex h-full flex-1'>
        <div className='flex flex-col  justify-center'>
            <h1 className='text-4xl text-white '><span className='text-purple font-semibold'>Blockchain-based</span><br/>online voting system </h1>
            <p className='text-white pt-6'>Create and launch your election securely<br/>from your own device</p>
            <button className='mt-6 max-w-[300px] gap-2'>Create a new election <FaRegPlusSquare className='text-[18px]' /> </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
