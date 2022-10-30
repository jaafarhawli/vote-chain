import React from 'react';
import logo from '../assets/VOTE CHAIN-logo-white-horizantal.png';
import landingsm from '../assets/landing-sm.svg';
import landinglg from '../assets/landing-lg.svg';
import curve from '../assets/backgroundcurve.svg';
import {FaRegPlusSquare} from 'react-icons/fa';

const LandingHero = () => {
  return (
    <div className='hero flex flex-col bg-no-repeat bg-center bg-cover bg-purple-300 w-full' >
      <div className='flex w-full pt-4 items-center justify-between lg:px-28 md:px-10 px-4'>
        <img src={logo} alt="logo" className='w-48' />
        <div className='flex gap-4'>
            <button className='border-cyan border-2 bg-opacity-0 hover:border-white'>Login</button>
            <button>Register</button>
        </div>
      </div>
      <div className='flex h-full flex-1 lg:pl-28 md:pl-10 pl-4 justify-between'>
        <div className='flex flex-col justify-center'>
            <h1 className='text-4xl text-white md:text-5xl lg:text-6xl pt-12 md:pt-8'><span className='text-purple-100 font-semibold'>Blockchain-based</span><br/>online voting system </h1>
            <p className='text-white pt-6'>Create and launch your election securely<br/>from your own device</p>
            <button className='mt-6 max-w-[300px] gap-2'>Create a new election <FaRegPlusSquare className='text-[18px]' /> </button>
        </div>
        <img src={landingsm} alt="talents" className="w-[45%] md:hidden hidden sm:flex mt-5" />
        <img src={landinglg} alt="talents" className="w-[45%] hidden md:flex mt-5" />
      </div>
      <img src={curve} alt='/' className='w-full invisible max-h-[100px]' />
    </div>
  );
}

export default LandingHero;
