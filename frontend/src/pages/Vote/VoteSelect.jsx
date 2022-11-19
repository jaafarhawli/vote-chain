import React, {useState, useEffect} from 'react';
import ElectionCard from '../../components/Reusable/ElectionCard';
import VoteHeader from './VoteHeader';
import axios from '../../api/axios';
import {useQuery} from '@tanstack/react-query';
import CandidateCard from '../../components/Reusable/CandidateCard';
import Button from '../../components/Reusable/Button';
import { useNavigate } from 'react-router-dom';
import { voteCandidate } from '../../Web3Client';

const VoteSelect = () => {

    const [candidates, setCandidates] = useState([]);
    const [selectedParty, setSelectedParty] = useState('');
    const [selectedCandidate, setSelectedCandidate] = useState('');
    const [selectedPartyName, setSelectedPartyName] = useState('');
    const [selectedCandidateName, setSelectedCandidateName] = useState('');
    const [selectedCandidateId, setSelectedCandidateId] = useState();
    const [disabled, setDisabled] = useState(true);

    const navigate = useNavigate();

    const {data} = useQuery([], async () => {
        return axios.get(`party/${localStorage.election_id}`, {
                    headers: {
                      Authorization: `bearer ${localStorage.token}`
                    }
                  }).then((res) => res.data.data);
    })

    const showCandidates = async (data, party_id, party_name) => {
        setCandidates(data);
        setSelectedParty(party_id);
        setSelectedPartyName(party_name);
    }

    const selectCandidate = (id, candidate_name, blockchain_candidate_id) => {
        setSelectedCandidate(id);
        setSelectedCandidateName(candidate_name);
        setSelectedCandidateId(blockchain_candidate_id);
    }

    const handleSubmit = async () => {

        await voteCandidate(selectedCandidateId, localStorage.election_address);
        const form = {
            id: localStorage.voter_id,
            party_id: selectedParty,
            candidate_id: selectedCandidate
        }     
        try {
             await axios.post('voter/vote', form, {
                headers: {
                  Authorization: `bearer ${localStorage.token}`
                }
              });
              localStorage.setItem('candidate', selectedCandidateName);
              localStorage.setItem('party', selectedPartyName);
              localStorage.setItem('chosen_party', selectedPartyName);
              localStorage.setItem('chosen_candidate', selectedCandidateName);
              navigate('/vote/main/results');
            } catch (error) {
                console.log(error.response.data.message);
            }  
    }

    useEffect(() => {
      if(selectedCandidate !== '' && selectedParty !== '')
      setDisabled(false);
      else
      setDisabled(true);
    }, [selectedCandidate, selectedParty]);
   

  return (
    <div className=' min-h-screen flex flex-col justify-between'>
        <>
      <VoteHeader>Voting is live now!</VoteHeader>
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
                <CandidateCard name={candidate.name} image={candidate.picture_url} id={candidate._id} party_id={candidate.party_id} vote={true} selected={true} key={candidate._id} /> :
                <CandidateCard name={candidate.name} image={candidate.picture_url} id={candidate._id} party_id={candidate.party_id} vote={true} select={() => selectCandidate(candidate._id, candidate.name, candidate.id)} key={candidate._id} /> 
            ))}
        </div>
      </div>
      </>
      <div className='w-full h-[100px] bg-purple-100 flex justify-between lg:px-28 md:px-10 px-4 items-center'>
          <div className='w-2/3'>
            <p className='text-white text-[20px]'>You have selected</p>
            <div className='flex w-full'>
                <p className='flex-1 text-[24px] font-bold text-white'>{selectedPartyName}</p>
                <p className='flex-1 text-[24px] font-bold text-white'>{selectedCandidateName}</p>
            </div>
          </div>
        <Button disabled={disabled} onClick={handleSubmit}>Submit vote</Button>
      </div>
    </div>
  );
}

export default VoteSelect;
