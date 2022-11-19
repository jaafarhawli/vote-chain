import React from 'react';
import VoteHeader from './VoteHeader';
import ElectionCard from '../../components/Reusable/ElectionCard';
import Statistics from '../../components/Reusable/Statistics';

const VoteResults = () => {
  return (
    <div>
      <VoteHeader>Election Results</VoteHeader>
      <div className='lg:px-28 md:px-10 px-4'>
        <div className='flex w-full mt-4 gap-8'>
        <ElectionCard id={localStorage.election_id} title={localStorage.election_title} start_time={localStorage.election_start} end_time={localStorage.election_end} className='!bg-black-300  flex-1' title_size='text-[28px]' date_size='!text-[15px]' />
        <div className='flex-1 rounded-lg bg-purple-100 flex justify-between items-center px-4'>
          <div className='w-2/3'>
            <p className='text-white text-[20px]'>You have selected</p>
            <div className='flex w-full'>
                <p className='flex-1 text-[24px] font-bold text-white'>{localStorage.party}</p>
                <p className='flex-1 text-[24px] font-bold text-white'>{localStorage.candidate}</p>
            </div>
          </div>
      </div>
        </div>
      {/* <Statistics /> */}
      </div>
    </div>
  );
}

export default VoteResults;
