import React, {useState} from 'react';
import ElectionCard from '../../components/Reusable/ElectionCard';
import VoteHeader from './VoteHeader';
import axios from '../../api/axios';
import {useQuery} from '@tanstack/react-query';
import CandidateCard from '../../components/Reusable/CandidateCard';

const VoteSelect = () => {

    const [candidates, setCandidates] = useState([]);
    const [selectedParty, setSelectedParty] = useState('');

    const {data} = useQuery([], async () => {
        return axios.get(`user/parties/${localStorage.election_id}`, {
                    headers: {
                      Authorization: `bearer ${localStorage.token}`
                    }
                  }).then((res) => res.data);
    })

    const showCandidates = async (data, party_name) => {
        setCandidates(data);
        setSelectedParty(party_name);
        console.log(data);
    }
   

  return (
    <div>
      <VoteHeader />
      <div className='lg:px-28 md:px-10 px-4'>
        <ElectionCard id={localStorage.election_id} title={localStorage.election_title} start_time={localStorage.election_start} end_time={localStorage.election_end} className='!bg-black-300 mt-4' title_size='text-[28px]' date_size='!text-[15px]' />
        <h2 className='mt-8 text-[24px] font-bold'>Choose your party</h2>
        <div className='grid grid-cols-2 mt-4 gap-4'>
         {data?.map((party) => (
             selectedParty===party.name ? 
             <ElectionCard className='border-[6px] border-cyan' title={party.name} party={true} onClick={() => showCandidates(party.candidates, party.name)} key={party._id} /> :
             <ElectionCard title={party.name} party={true} onClick={() => showCandidates(party.candidates, party.name)} key={party._id} /> 
        ))}
        </div>
        <div className='grid grid-cols-4 gap-4 justify-between my-8'>
            {candidates?.map(candidate => (
                <CandidateCard name={candidate.name} image={candidate.picture_url} id={candidate._id} party_id={candidate.party_id} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default VoteSelect;
