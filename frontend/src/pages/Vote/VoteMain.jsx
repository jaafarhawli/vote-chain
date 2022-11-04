import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/VOTE CHAIN-logo-white-horizantal.png';
import landingsm from '../../assets/landing-sm.svg';
import landinglg from '../../assets/landing-lg.svg';
import curve from '../../assets/backgroundcurve.svg';
import Button from '../../components/Reusable/Button';
import LandingFooter from '../Landing/LandingFooter';


const VoteMain = () => {

  const navigate = useNavigate();

  return (
    <>
    <div className='hero flex flex-col bg-no-repeat bg-center bg-cover bg-purple-300 w-full' >
      <div className='flex w-full pt-4 items-center justify-between lg:px-28 md:px-10 px-4'>
        <img src={logo} alt="logo" className='w-48' />
      </div>
      <div className='flex h-full flex-1 lg:pl-28 md:pl-10 pl-4 sm:justify-between justify-center'>
        <div className='flex flex-col justify-center sm:items-start items-center text-center sm:text-left'>
            <h1 className='text-4xl text-purple-100 font-bold md:text-5xl lg:text-6xl pt-12 md:pt-8'>{localStorage.election_title}</h1>
            <p className='text-white pt-6 max-w-[400px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta eum odit quam quis! Aspernatur, laudantium nam facere eum ut et autem cum natus ex voluptates eligendi magnam, quia vero iste?</p>
            <div className='flex gap-4 mt-6'>
                <Button onClick={() => navigate('select')} >Vote now</Button>              
                <Button className={'border-cyan border-2 bg-opacity-0 hover:bg-cyan'} >Check Results</Button>
            </div> 
        </div>
        <img src={landingsm} alt="talents" className="w-[45%] md:hidden hidden sm:flex mt-5" />
        <img src={landinglg} alt="talents" className="w-[45%] hidden md:flex mt-5" />
      </div>
      <img src={curve} alt='/' className='w-full invisible max-h-[110px]' />
    </div>
    <div className='flex flex-col justify-center items-center w-full h-[300px] bg-gradient-to-b from-purple-300 to-purple-400'>
        <h1 className='text-[34px] font-bold mb-8'>Time Left For Election</h1>
        <div className='flex gap-8'>
            <div className='w-[90px] h-[90px] bg-purple-100'></div>
            <div className='w-[90px] h-[90px] bg-purple-100'></div>
            <div className='w-[90px] h-[90px] bg-purple-100'></div>
            <div className='w-[90px] h-[90px] bg-purple-100'></div>
        </div>
    </div>
    <LandingFooter />
    </>
  );
}

export default VoteMain;