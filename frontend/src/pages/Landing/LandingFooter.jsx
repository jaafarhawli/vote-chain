import React from 'react';
import {SiGmail} from 'react-icons/si';
import {FaFacebookSquare} from 'react-icons/fa';
import {BsInstagram} from 'react-icons/bs';

const LandingFooter = () => {
  return (
    <div>
      <div className='flex flex-col items-center lg:px-28 md:px-10 px-4 bg-gradient-to-b from-bg to-[#3801D3] w-full pb-4 lg:pt-24'>
          <div className='flex flex-col items-center text-center md:items-start md:text-left md:flex-row w-full pb-8'>
              <div className='flex flex-col flex-1 pb-8'>
                  <h1 className='text-[28px] font-semibold text-purple-200'>About us</h1>
                  <p className='md:w-2/3 text-purple-400'>Vote Chain is a decentralized online voting wesbite that is built to run any election using blockchain. Any user can create an account and launch elections by adding parties, candidates, voters, and moderators in order to help him take control of te election</p>
              </div>
              <div className='flex flex-col flex-1 pb-8'>
                  <h1 className='text-[28px] font-semibold text-purple-200'>Vote Chain</h1>
                  <p className='text-purple-400'>Contact us</p>
                  <p className=' text-purple-400'>Reviews</p>
                  <div className='flex gap-4 text-purple-400 text-[22px] pt-4 justify-center md:justify-start'>
                    <SiGmail className='hover:text-purple-200 transition-[200]' />
                    <FaFacebookSquare className='hover:text-purple-200 transition-[200]' />
                    <BsInstagram className='hover:text-purple-200 transition-[200]' />  
                  </div>
              </div>
          </div>
          <p className='text-purple-400'>Copyright © 2022 Vote Chain</p>
      </div>
    </div>
  );
}

export default LandingFooter;
