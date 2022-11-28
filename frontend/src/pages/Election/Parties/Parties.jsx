import React, {useState, useMemo} from 'react';
import {AddParty, ConfirmModal, AddCandidate, openModal, closeModal} from '../../../components/Modals';
import {Table, EmptyState, Loader, ElectionContainer} from '../../../components/Reusable';
import {useQuery} from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { viewParties } from '../../../api/viewParties';
import { deleteParty } from '../../../api/deleteParty';

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
        <ElectionContainer title={'Parties'}>
            <EmptyState title={'No Parties'} button={'Add party'} disabled={launched} onClick={() => openModal(setPartyModal)} >You don’t have any parties, add one now!</EmptyState>
        </ElectionContainer>
        </>
      :
    <>
      <ConfirmModal  open={confirmModal} closeModal={() => closeModal(setConfirmModal)} click={() => deleteParty(election.id, user.id, refetch, setConfirmModal)} text={"Are you sure you want to delete this party?"} />
      <AddParty open={partyModal} closeModal={() => closeModal(setPartyModal)}  refetch={refetch} />
      <AddCandidate open={candidateModal} closeModal={() => closeModal(setCandidateModal)} />
      <ElectionContainer title={'Parties'} button={true} onClick={() => openModal(setPartyModal)} disabled={launched} buttonContent={'Add Party'} >
              <input type="search" className='border-2 border-[#dddddd] w-1/3 rounded-md mt-4' placeholder='Search moderator by email' onChange={e => setSearch(e.target.value)} />
              <Table data={filteredData} party={true} remove={(id) => openConfirmModal(id)} addCandidate={(id) => openCandidateModal(id)} />
      </ElectionContainer>
      </>}
    </>
  );
}

export default Parties;