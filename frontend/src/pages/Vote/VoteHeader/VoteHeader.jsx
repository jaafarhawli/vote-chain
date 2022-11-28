import React from 'react';
import logo from '../../../assets/VOTE CHAIN-logo-white-horizantal.png';

const VoteHeader = (props) => {

    return (
    <div>
      <div className='flex flex-col md:px-10 px-4 bg-gradient-to-b from-purple-100/30 to-purple-100/10 w-full py-6 rounded-lg'>
        <div className='flex justify-between w-full items-center'>
            <img src={logo} alt="" className='w-48' />
        </div>
        <div className='flex justify-between w-full items-center mt-8'>
            <h1 className='text-white text-[28px] md:text-[32px] lg:text-[36px] font-bold '>{props.children}</h1>
        </div>
      </div>
    </div>
  );
}

export default VoteHeader;