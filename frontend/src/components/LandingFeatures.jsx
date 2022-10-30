import React from 'react';
import curve from '../assets/features.svg';
import {BiCheckShield} from 'react-icons/bi';
import {MdEmail} from 'react-icons/md';
import {ImStatsBars} from 'react-icons/im';

const LandingFeatures = () => {
  return (
    <div style={{backgroundImage: `url("${curve}")`}} className='flex flex-col items-center lg:px-28 md:px-10 px-4 min-h-[400px]  bg-no-repeat bg-cover bg-purple-400 w-full'>
      <h1 className='pt-12 text-[36px] text-purple-100 font-bold'>Excellent Features</h1>
      <div className='flex flex-col'>
        <div className='flex flex-col text-center items-center w-[300px] text-purple-200 pt-8'>
            <BiCheckShield className='text-[60px]' />
            <h2 className='text-[22px] font-medium'>Secure Voting</h2>
            <p>Each voter has a unique "Voter ID" and "Voter Key" and can only vote once.</p>
        </div>
        <div className='flex flex-col text-center items-center w-[300px] text-purple-200 pt-8'>
            <MdEmail className='text-[60px]' />
            <h2 className='text-[22px] font-medium'>Email Voters</h2>
            <p>Automatically sends to each voter his ID and key, and notifies them when the election starts via email</p>
        </div>
        <div className='flex flex-col text-center items-center w-[300px] text-purple-200 pt-8'>
            <ImStatsBars className='text-[60px]' />
            <h2 className='text-[22px] font-medium'>Statistical Overview</h2>
            <p>Checkout live statistical data over the ongoing election</p>
        </div>
      </div>
      <img src={curve} alt='/' className='w-full invisible ' />
    </div>
  );
}

export default LandingFeatures;
