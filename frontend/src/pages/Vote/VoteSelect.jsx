import React, {useState} from 'react';
import ElectionCard from '../../components/Reusable/ElectionCard';
import VoteHeader from './VoteHeader';
import axios from '../../api/axios';
import {useQuery} from '@tanstack/react-query';
import CandidateCard from '../../components/Reusable/CandidateCard';
import Button from '../../components/Reusable/Button';

const VoteSelect = () => {

    const [candidates, setCandidates] = useState([]);
    const [selectedParty, setSelectedParty] = useState('');
    const [selectedCandidate, setSelectedCandidate] = useState('');
    const [selectedPartyName, setSelectedPartyName] = useState('');
    const [selectedCandidateName, setSelectedCandidateName] = useState('');

    const {data} = useQuery([], async () => {
        return axios.get(`user/parties/${localStorage.election_id}`, {
                    headers: {
                      Authorization: `bearer ${localStorage.token}`
                    }
                  }).then((res) => res.data);
    })

    const showCandidates = async (data, party_id, party_name) => {
        setCandidates(data);
        setSelectedParty(party_id);
        setSelectedPartyName(party_name);
        console.log(data);
    }

    const selectCandidate = (id, candidate_name) => {
        setSelectedCandidate(id);
        setSelectedCandidateName(candidate_name);
    }
   

  return (
    <div className=' min-h-screen flex flex-col justify-between'>
        <>
      <VoteHeader />
      <div className='lg:px-28 md:px-10 px-4'>
        <ElectionCard id={localStorage.election_id} title={localStorage.election_title} start_time={localStorage.election_start} end_time={localStorage.election_end} className='!bg-black-300 mt-4' title_size='text-[28px]' date_size='!text-[15px]' />
        <h2 className='mt-8 text-[24px] font-bold'>Choose your party</h2>
        <div className='grid grid-cols-2 mt-4 gap-4'>
         {data?.map((party) => (
             selectedParty===party._id ? 
             <ElectionCard className='border-[6px] border-cyan !bg-purple-100' title={party.name} party={true} key={party._id} /> :
             <ElectionCard title={party.name} party={true} onClick={() => showCandidates(party.candidates, party._id, party.name)} key={party._id} /> 
        ))}
        </div>
        <div className='grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 w-full justify-between my-8'>
            {candidates?.map(candidate => (
                selectedCandidate===candidate._id ?
                <CandidateCard name={candidate.name} image={candidate.picture_url} id={candidate._id} party_id={candidate.party_id} vote={true} selected={true} /> :
                <CandidateCard name={candidate.name} image={candidate.picture_url} id={candidate._id} party_id={candidate.party_id} vote={true} select={() => selectCandidate(candidate._id, candidate.name)} /> 
            ))}
        </div>
      </div>
      </>
      <div className='w-full h-[100px] bg-purple-100 flex'>
          <div>
            <p>You have selected</p>
            <div className='flex'>
                <p>{selectedPartyName}</p>
                <p>{selectedCandidateName}</p>
            </div>
          </div>
        <Button>Submit vote</Button>
      </div>
    </div>
  );
}

export default VoteSelect;
