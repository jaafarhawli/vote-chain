import React from 'react';
import VoteHeader from './VoteHeader';
import ElectionCard from '../../components/Reusable/ElectionCard';
import BlockchainStatistics from '../../components/Reusable/BlockchainStatistics';
import { useSelector } from 'react-redux';

const VoteResults = () => {

  const election = useSelector((state) => state.election.value);
  const voter = useSelector((state) => state.voter.value);

  return (
    <div>
      <VoteHeader>Election Results</VoteHeader>
      <div className='lg:px-28 md:px-10 px-4'>
        <div className='flex w-full mt-4 gap-8'>
        <ElectionCard id={election.id} title={election.title} start_time={election.startTime} end_time={election.endTime} className='!bg-black-300  flex-1' title_size='text-[28px]' date_size='!text-[15px]' />
        <div className='flex-1 rounded-lg bg-purple-100 flex justify-between items-center px-4'>
          <div className='w-2/3'>
            <p className='text-white text-[20px]'>You have selected</p>
            <div className='flex w-full'>
                <p className='flex-1 text-[24px] font-bold text-white'>{voter.chosenParty}</p>
                <p className='flex-1 text-[24px] font-bold text-white'>{voter.chosenCandidate}</p>
            </div>
          </div>
      </div>
        </div>
        {localStorage.ended ?
        <BlockchainStatistics electionAddress={election.address}  />
        : null}
      </div>
    </div>
  );
}

export default VoteResults;
