import React from 'react';
import banner from '../assets/voting.png';
import {MdBallot} from 'react-icons/md';

const LandingSteps = () => {
  return (
    <div className='flex flex-col bg-gradient-to-b from-purple-300 to-purple-400 h-[600px] lg:px-28 md:px-10 px-4 items-center lg:flex-row'>
      <img src={banner} alt="/" className='lg:w-2/5 w-1/2 h-[250px] lg:h-full object-cover rounded-full lg:mt-12 mt-6' />
      <div className='flex flex-col  text-center lg:pl-4 lg:w-3/5'>
        <h1 className='pt-6 font-bold text-[36px] text-purple-100'>Build your own election</h1>
        <p className='pt-2 font-medium text-[20px] text-black-200'>Take control over the election, add some moderators to help you out</p>
        <div className='flex mt-8 gap-4 text-left h-fit'>
            <div className='w-[70px] h-[70px] bg-purple-100 rounded-full flex justify-center items-center flex-shrink-0'>
                <MdBallot className='text-white text-[30px]' />
            </div>
            <div>
                <h2 className='font-medium text-[18px] text-purple-100'>Create your Election</h2>
                <p>Add as many parties as you want to the election, with candidates for each party</p>
            </div>
        </div>
        <div className='flex mt-8 gap-4 text-left h-fit'>
            <div className='w-[70px] h-[70px] bg-purple-100 rounded-full flex justify-center items-center flex-shrink-0'>
                <MdBallot className='text-white text-[30px]' />
            </div>
            <div>
                <h2 className='font-medium text-[18px] text-purple-100'>Add Voters</h2>
                <p>Add voters to your election blockchain, create a unique password and id for each voter and sent it to them by email </p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default LandingSteps;
