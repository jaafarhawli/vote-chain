import React from 'react';
import ElectionCard from '../../components/Reusable/ElectionCard';
import VoteHeader from './VoteHeader';
import axios from '../../api/axios';
import {useQuery} from '@tanstack/react-query';

const VoteSelect = () => {

    const {data} = useQuery([], async () => {
        return axios.get(`user/parties/${localStorage.election_id}`, {
                    headers: {
                      Authorization: `bearer ${localStorage.token}`
                    }
                  }).then((res) => res.data);
    })

    console.log(data);

  return (
    <div>
      <VoteHeader />
      <div className='lg:px-28 md:px-10 px-4'>
        <ElectionCard id={localStorage.election_id} title={localStorage.election_title} start_time={localStorage.election_start} end_time={localStorage.election_end} className='!bg-black-300 mt-4' title_size='text-[28px]' date_size='!text-[15px]' />
        <h2 className='mt-8 text-[24px] font-bold'>Choose your party</h2>
        
      </div>
    </div>
  );
}

export default VoteSelect;
