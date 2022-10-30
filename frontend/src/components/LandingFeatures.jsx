import React from 'react';
import curve from '../assets/feature-curve.svg';
import {BiCheckShield} from 'react-icons/bi';
import {MdEmail} from 'react-icons/md';
import {ImStatsBars} from 'react-icons/im';

const LandingFeatures = () => {
  return (
    <div>
        <div className='aspect-960/200 w-full  bg-no-repeat bg-cover bg-center h-[150px]' style={{backgroundImage: `url("${curve}")`}}></div>
    <div className='flex flex-col items-center lg:px-28 md:px-10 px-4 bg-[#3D3C3C] w-full lg:pb-12'>
      <h1 className='md:text-[36px] text-purple-100 font-bold lg:text-[40px] lg:pb-4 text-[32px]'>Excellent Features</h1>
      <div className='flex flex-col items-center lg:flex-row lg:justify-between w-full'>
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
    </div>
      <div className='aspect-960/200 w-full  bg-no-repeat bg-cover bg-center rotate-180 h-[150px]' style={{backgroundImage: `url("${curve}")`}}></div>
    </div>
  );
}

export default LandingFeatures;
