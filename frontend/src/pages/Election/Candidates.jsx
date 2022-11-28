import React, {useState, useMemo} from 'react';
import axios from '../../api/axios';
import {ConfirmModal, closeModal} from '../../components/Modals';
import {useQuery} from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import {Loader, EmptyState, CandidateCard} from '../../components/Reusable';
import { viewCandidates } from '../../api/viewCandidates';

const Candidates = () => {

    const election = useSelector((state) => state.election.value);
    const user = useSelector((state) => state.user.value);

    const [search, setSearch] = useState('');
    const [confirmModal, setConfirmModal] = useState(false);
    const launched = election.launched===true;
    
    const {data, refetch, isFetching} = useQuery(["candidates"], () => viewCandidates(election.id));

    const filteredData = useMemo(() => {
      return data?.filter(row => {
        return row?.name?.toLowerCase().includes(search.toLowerCase())
      })
    }, [data, search])

    const openConfirmModal = (id, party) => {
      if(launched)
      return
      localStorage.setItem('candidate_id', id);
      localStorage.setItem('party_id', party);
      
      setConfirmModal(true);
      document.body.style.overflow = 'hidden';
    }

    const deleteCandidate = async () => {
      const form = {
          candidate_id: localStorage.candidate_id,
          party_id: localStorage.party_id,
          election_id: election.id,
          user_id: user.id 
      }
      
      try {
          await axios.post('candidate/remove', form, {
              headers: {
                Authorization: `bearer ${localStorage.token}`
              }
            });
            closeModal(setConfirmModal);
            refetch();
          } catch (error) {
            console.log(error.response.data.message);
          }
      }

    return (
      <>
      {
      isFetching ? 
      <Loader loading={isFetching} admin={true} />
      :
      data?.length===0 ? <>
        <div className='pl-[250px] pt-[150px] w-full bg-purple-400 min-h-screen'>
        <div className='w-[98%] mx-auto px-8 '>
            <h1 className='text-[28px] font-bold'>Candidates</h1>
            <EmptyState title={'No Candidates'}>You don’t have any candidates</EmptyState>
        </div>
        </div>
        </> : 
        <>
        <ConfirmModal  open={confirmModal} closeModal={() => closeModal(setConfirmModal)} click={deleteCandidate} text={"Are you sure you want to delete this candidate?"} />
        <div className='pl-[250px] pt-[150px] w-full bg-purple-400 min-h-screen'>
        <div className='w-[98%] mx-auto px-8 '>
        <div className='flex justify-between items-center w-full'>
          <h1 className='text-[28px] font-bold'>Candidates</h1>
        </div>
            <input type="search" className='border-2 border-[#dddddd] w-1/3 rounded-md mt-4' placeholder='Search candidate by name' onChange={e => setSearch(e.target.value)} />
            {filteredData?.length===0 ? <EmptyState title={'No Candidates'}>You don’t have any candidates</EmptyState> : null}
        <div className='flex flex-wrap gap-6 w-full my-8'>
            {filteredData?.map(candidate => (
                <CandidateCard name={candidate.name} party={candidate.party} image={candidate.image} id={candidate.id} party_id={candidate.party_id} remove={(id, party) => openConfirmModal(id, party)} key={candidate.id} />
            ))}
        </div>
    </div>
    </div>
    </>
      }
  </>
  );
}

export default Candidates;