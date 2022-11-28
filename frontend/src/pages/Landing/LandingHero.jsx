import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/VOTE CHAIN-logo-white-horizantal.png';
import curve from '../../assets/LandingHero.svg';
import Button from '../../components/Reusable/Button';

const LandingHero = () => {

  const navigate = useNavigate();

  return (
    <div className='hero flex flex-col bg-no-repeat bg-center bg-cover bg-bg w-full h-screen' >
      <div className='flex w-full pt-4 items-center justify-between lg:px-28 md:px-10 px-4'>
        <img src={logo} alt="logo" className='w-48' />
        <div className='flex gap-4'>
            <Button className={'border-cyan border-2 bg-opacity-0 hover:bg-cyan'} onClick={() => navigate('/login')}>Login</Button>
            <Button onClick={() => navigate('/register')}>Register</Button>
        </div>
      </div>
      <div className='flex h-full flex-1 lg:pl-28 md:pl-10 pl-4 sm:justify-between justify-center'>
        <div className='flex flex-col justify-center sm:items-start items-center text-center sm:text-left'>
            <h1 className='text-4xl text-white md:text-5xl lg:text-6xl pt-12 md:pt-8'><span className='text-white font-semibold'>Blockchain-based</span><br/>online voting system </h1>
            <p className='text-white pt-6'>Create and launch your election securely<br/>from your own device</p>
            <Button className={'mt-6 max-w-[300px] gap-2'} onClick={() => navigate('/login')} add={true} >Create a new election</Button>
        </div>
      </div>
      <img src={curve} alt='/' className='w-full invisible max-h-[110px]' />
    </div>
  );
}

export default LandingHero;
