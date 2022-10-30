import React from 'react';
import banner from '../assets/voting.png'

const LandingSteps = () => {
  return (
    <div className='flex flex-col bg-gradient-to-b from-purple-300 to-purple-400 h-[600px] lg:px-28 md:px-10 px-4 items-center lg:flex-row'>
      <img src={banner} alt="/" className='lg:w-2/5 w-1/2 h-[250px] lg:h-full object-cover rounded-full lg:mt-12 mt-6' />
    </div>
  );
}

export default LandingSteps;
