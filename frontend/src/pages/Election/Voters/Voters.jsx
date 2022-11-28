import React, {useState, useMemo} from 'react';
import {AddVoter, ConfirmModal, closeModal, openModal} from '../../../components/Modals';
import {useQuery} from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import {Loader, ElectionContainer, EmptyState, Table} from '../../../components/Reusable';
import { viewVoters } from '../../../api/viewVoters';
import { deleteVoter } from '../../../api/deleteVoter';

// Election voters list
const Voters = (props) => {

    const election = useSelector((state) => state.election.value);
    const user = useSelector((state) => state.user.value);

    const [search, setSearch] = useState('');
    const [voterModal, setVoterModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const launched = election.launched===true;
    
    const {data, refetch, isFetching} = useQuery(["voters"], () => viewVoters(election.id));

    // Filter voters upon searching
    const filteredData = useMemo(() => {
        return data?.filter(row => {
          return row?.email?.toLowerCase().includes(search.toLowerCase())
        })
      }, [data, search])
    
      // Open modal to confirm removing a voter
    const openConfirmModal = (id) => {
        if(launched)
        return
        setConfirmModal(true);
        localStorage.setItem('voter_id', id)
        document.body.style.overflow = 'hidden';
      }

  return (
    <>
    {
    isFetching && !voterModal ? 
    <Loader loading={isFetching} admin={true} />
    :
    data?.length===0 ?
    <>
    <AddVoter open={voterModal} closeModal={() => closeModal(setVoterModal)}  refetch={refetch} />
    <ElectionContainer>
        <EmptyState title={'No Voters'} button={'Add voter'} disabled={launched} onClick={() => openModal(setVoterModal)}>You don’t have any voters, add one now!</EmptyState>
    </ElectionContainer>
    </>
    : 
    <>
    <ConfirmModal  open={confirmModal} closeModal={() => closeModal(setConfirmModal)} click={() => deleteVoter(election.id, user.id, refetch, setConfirmModal)} text={"Are you sure you want to delete this voter?"} />
    <AddVoter open={voterModal} closeModal={() => closeModal(setVoterModal)}  refetch={refetch} />
    <ElectionContainer title={'Voters'} button={true} onClick={() => openModal(setVoterModal)} disabled={launched} buttonContent={'Add Voter'} >
        <input type="search" className='border-2 border-[#dddddd] w-1/3 rounded-md mt-4' placeholder='Search voter by email' onChange={e => setSearch(e.target.value)} />
        {filteredData?.length===0 ? <EmptyState title={'No Voters'}>You don’t have any voters</EmptyState> : 
        props.admin ? 
        <Table admin={true} data={filteredData} voter={true} remove={(id) => openConfirmModal(id)} />
        :
        <Table data={filteredData} voter={true} remove={(id) => openConfirmModal(id)} />
        }
    </ElectionContainer>
    </>
    }     
    </>
  );
}

export default Voters;