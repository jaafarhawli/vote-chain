import React from 'react';
import Button from '../../components/Reusable/Button';
import logo from '../../assets/VOTE CHAIN-logo-white-horizantal.png';
import { useNavigate } from 'react-router-dom';
import landinglg from '../../assets/VoterLandingHero.svg';
import hero from '../../assets/Hero.jpg';

const VoteLanding = () => {

    const navigate = useNavigate();

  return (
    <div className='w-full h-screen flex flex-col bg-no-repeat bg-center bg-cover' style={{backgroundImage: `url("${hero}")`}}>
        <div className='flex pt-4 items-center justify-between lg:px-28 md:px-10 px-4'>
        <img src={logo} alt="logo" className='w-48' />
      </div>
      <div className='flex flex-1 lg:pl-28 md:pl-10 pl-4 sm:justify-between justify-center items-center flex-col sm:flex-row'>
        <div className='flex flex-col justify-center sm:items-start items-center text-center sm:text-left'>
            <h1 className='text-4xl text-white md:text-5xl lg:text-6xl pt-12 md:pt-8'><span className='text-white font-semibold'>Blockchain-based</span><br/>online voting system </h1>
            <p className='text-white pt-6'>Join election and vote for your candidate</p>
            <Button className={'mt-6 max-w-[300px] gap-2'} onClick={() => navigate('login')} >Join election</Button>
        </div>
        <img src={landinglg} alt="talents" className="w-[45%] flex mt-5" />
      </div>
    </div>
  );
}

export default VoteLanding;
