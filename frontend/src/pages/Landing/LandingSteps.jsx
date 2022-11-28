import React from 'react';
import banner from '../../assets/stepsBanner.gif';
import steps from '../../JSON/LandingSteps'

const LandingSteps = () => {
  return (
    <div className='flex flex-col bg-bg lg:px-28 md:px-10 px-4 items-center lg:flex-row lg:justify-between py-12'>
      <img src={banner} alt="/" className='lg:w-2/5 w-1/2 h-[250px] lg:h-[400px] object-cover rounded-lg opacity-90 min-w-[340px] lg:mt-12 mt-6' />
      <div className='flex flex-col  text-center lg:w-1/2 border-[2px] rounded-xl border-purple-100 p-6 neon'>
        <h1 className='font-bold text-[32px] md:text-[36px] text-purple-100 lg:text-[40px]'>Build your own election</h1>
        <p className='pt-2 font-medium text-[20px] text-black-200'>Take control over the election, add some moderators to help you out</p>
        {steps.map((step, index) => {
        return(
        <div className='flex mt-8 gap-4 text-left h-fit' key={index}>
            <div className='w-[70px] h-[70px] bg-purple-100 rounded-full flex justify-center items-center flex-shrink-0'>
                {step.icon}
            </div>
            <div>
                <h2 className='font-bold text-[18px] text-purple-100'>{step.title}</h2>
                <p className='text-purple-200'>{step.content}</p>
            </div>
        </div>);
        })}
      </div>
    </div>
  );
}

export default LandingSteps;
