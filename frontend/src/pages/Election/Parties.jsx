import React, {useState, useMemo} from 'react';
import {AddParty, ConfirmModal, AddCandidate, openModal, closeModal} from '../../components/Modals';
import {Table, EmptyState, Button, Loader} from '../../components/Reusable';
import {useQuery} from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { viewParties } from '../../api/viewParties';
import { deleteParty } from '../../api/deleteParty';

const Parties = () => {

    const election = useSelector((state) => state.election.value);
    const user = useSelector((state) => state.user.value);

    const [search, setSearch] = useState('');
    const [partyModal, setPartyModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [candidateModal, setCandidateModal] = useState(false);
    const launched = election.launched===true;

    const {data, refetch, isFetching} = useQuery(["parties"], () => viewParties(election.id));

    const filteredData = useMemo(() => {
        return data?.filter(row => {
          return row?.name?.toLowerCase().includes(search.toLowerCase())
        })
      }, [data, search])

    const openConfirmModal = (id) => {
        if(launched)
        return;
        setConfirmModal(true);
        localStorage.setItem('party_id', id);
        document.body.style.overflow = 'hidden';
      }

      const openCandidateModal = (id) => {
        if(launched)
        return;
        setCandidateModal(true);
        localStorage.setItem('party_id', id);
        document.body.style.overflow = 'hidden';
      }

    return (
      <>
      {isFetching && !candidateModal ? 
      <Loader loading={isFetching} admin={true} />
      :
      data?.length === 0 ? 
        <>
        <AddParty open={partyModal} closeModal={() => closeModal(setPartyModal)}    refetch={refetch} />
        <div className='pl-[250px] pt-[150px] w-full bg-purple-400 min-h-screen'>
        <div className='w-[98%] mx-auto px-8 '>
            <h1 className='text-[28px] font-bold'>Parties</h1>
            <EmptyState title={'No Parties'} button={'Add party'} disabled={launched} onClick={() => openModal(setPartyModal)} >You don’t have any parties, add one now!</EmptyState>
        </div>
        </div>
        </>
      :
    <>
    <ConfirmModal  open={confirmModal} closeModal={() => closeModal(setConfirmModal)} click={() => deleteParty(election.id, user.id, refetch, setConfirmModal)} text={"Are you sure you want to delete this party?"} />
    <AddParty open={partyModal} closeModal={() => closeModal(setPartyModal)}  refetch={refetch} />
    <AddCandidate open={candidateModal} closeModal={() => closeModal(setCandidateModal)} />
    <div className='pl-[250px] pt-[150px] w-full bg-purple-400 min-h-screen'>
    <div className='w-[98%] mx-auto px-8 '>
        <div className='flex justify-between items-center w-full'>
          <h1 className='text-[28px] font-bold'>Parties</h1>
          <Button onClick={() => openModal(setPartyModal)} add={true} disabled={launched}>Add Party</Button>
        </div>
            <input type="search" className='border-2 border-[#dddddd] w-1/3 rounded-md mt-4' placeholder='Search moderator by email' onChange={e => setSearch(e.target.value)} />
            <Table data={filteredData} party={true} remove={(id) => openConfirmModal(id)} addCandidate={(id) => openCandidateModal(id)} />
    </div>
    </div>
    </>}
    </>
  );
}

export default Parties;