import React from 'react';
import logo from '../assets/VOTE CHAIN-logo-white-horizantal.png';


const MainHeader = () => {
  return (
    <div>
      <div className='flex flex-col lg:px-28 md:px-10 px-4 bg-gradient-to-b from-black-100 to-black-200 w-full pt-6'>
        <div className='flex justify-between w-full items-center'>
            <img src={logo} alt="" className='w-36' />
            <button className=''>{localStorage.firstname} {localStorage.lastname}</button>
        </div>
        <h1 className='text-white text-[28px] md:text-[32px] lg:text-[36px] font-bold mt-8'>Your Elections</h1>
      </div>
      
    </div>
  );
}

export default MainHeader;
