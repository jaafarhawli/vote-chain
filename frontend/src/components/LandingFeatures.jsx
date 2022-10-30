import React from 'react';
import curve from '../assets/features.svg';

const LandingFeatures = () => {
  return (
    <div style={{backgroundImage: `url("${curve}")`}} className='flex flex-col items-center lg:px-28 md:px-10 px-4 min-h-[400px]  bg-no-repeat bg-cover bg-purple-400 w-full'>
      <h1 className='pt-12 text-[36px] text-purple-100 font-bold'>Excellent Features</h1>
      
      <img src={curve} alt='/' className='w-full invisible ' />
    </div>
  );
}

export default LandingFeatures;
