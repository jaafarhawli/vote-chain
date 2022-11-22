import React from 'react';
import {BiCheckShield} from 'react-icons/bi';
import {MdEmail} from 'react-icons/md';
import {ImStatsBars} from 'react-icons/im';

const LandingFeatures = () => {
  return (
    <div className='lg:px-28 md:px-10 px-4 bg-bg w-full lg:py-12'>
    <div className='flex flex-col items-center bg-gradient-to-br from-purple-100/30 to-purple-100/10 rounded-xl p-6 pb-10 backdrop-blur-2xl shadow-2xl w-full'>
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
    </div>
  );
}

export default LandingFeatures;
