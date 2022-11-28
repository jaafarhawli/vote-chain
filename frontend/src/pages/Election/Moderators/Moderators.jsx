import React, {useState, useMemo} from 'react';
import {ConfirmModal, AddModerator, closeModal, openModal} from '../../../components/Modals';
import {Loader, Table, EmptyState, ElectionContainer} from '../../../components/Reusable';
import {useQuery} from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { viewModerators } from '../../../api/viewModerators';
import { deleteModerator } from '../../../api/deleteModerator';

const Moderators = ({socket}) => {

    const election = useSelector((state) => state.election.value);
    const user = useSelector((state) => state.user.value);

    const [moderatorModal, setModeratorModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [search, setSearch] = useState('');
    const launched = election.launched===true;

    const {data, refetch, isFetching} = useQuery(["moderators"], () => viewModerators(election.id))

    const filteredData = useMemo(() => {
        return data?.filter(row => {
          return row?.email?.toLowerCase().includes(search.toLowerCase())
        })
      }, [data, search])
    
      const openConfirmModal = (id) => {
        if(launched)
        return
        setConfirmModal(true);
        localStorage.setItem('moderator_id', id)
        document.body.style.overflow = 'hidden';
      }

    return (
        <>
        {
        isFetching && !moderatorModal ? 
        <Loader loading={isFetching} admin={true} />
        :
        data?.length === 0 ?
        <>
        <AddModerator open={moderatorModal} closeModal={() => closeModal(setModeratorModal)} refetch={refetch} socket={socket} />
        <ElectionContainer title={'Moderators'}>
            <EmptyState title={'No Moderators'} button={'Add moderator'} disabled={launched} onClick={() => openModal(setModeratorModal)} >You don’t have any moderators, add one now!</EmptyState>
        </ElectionContainer>
        </>
        :
        <>
        <ConfirmModal  open={confirmModal} closeModal={() => closeModal(setConfirmModal)} click={() => deleteModerator(election.id, user.id, refetch, closeModal(setConfirmModal))} text={"Are you sure you want to delete this moderator?"} />
        <AddModerator open={moderatorModal} closeModal={() => closeModal(setModeratorModal)} refetch={refetch} socket={socket} />
        <ElectionContainer button={true} title={'Moderators'} buttonContent={'Add Moderator'} onClick={() => openModal(setModeratorModal)} disabled={launched} >
            <input type="search" className='border-2 border-[#dddddd] w-1/3 rounded-md mt-4' placeholder='Search moderator by email' onChange={e => setSearch(e.target.value)} />
            <Table data={filteredData} moderator={true} remove={(id) => openConfirmModal(id)} />
        </ElectionContainer>
    </>}
    </>
  );
}

export default Moderators;
