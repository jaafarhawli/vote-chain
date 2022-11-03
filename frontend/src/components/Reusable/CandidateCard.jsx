import React from 'react';
import {HiOutlineXMark} from 'react-icons/hi2';

const CandidateCard = () => {
  return (
    <div className='w-[200px] h-[240px] bg-purple-200 rounded-lg flex flex-col p-4 items-center relative'>
      <HiOutlineXMark className='absolute left-2 top-2 text-[25px] hover:text-red duration-150' />
      <img src="" alt="" className='rounded-full w-[130px] h-[130px] bg-white' />
      <h2 className='mt-2 font-bold text-[18px]'>Candidate Name</h2>
      <h3>Party Name</h3>
    </div>
  );
}

export default CandidateCard;
