import React, {useState, useMemo} from 'react';
import {ConfirmModal, AddModerator} from '../../components/Modals';
import {Loader, Table, EmptyState, Button} from '../../components/Reusable';
import {useQuery} from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { viewModerators } from '../../api/viewModerators';
import { deleteModerator } from '../../api/deleteModerator';
import { closeModal } from '../../components/Modals/closeModal';

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
    
    const openModal = () => {
        setModeratorModal(true);
        document.body.style.overflow = 'hidden';
      }
    
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
        <div className='pl-[250px] pt-[150px] w-full bg-purple-400 min-h-screen'>
        <div className='w-[98%] mx-auto px-8 '>
            <h1 className='text-[28px] font-bold'>Moderators</h1>
            <EmptyState title={'No Moderators'} button={'Add moderator'} disabled={launched} onClick={openModal} >You don’t have any moderators, add one now!</EmptyState>
        </div>
        </div>
        </>
        :
        <>
        <ConfirmModal  open={confirmModal} closeModal={() => closeModal(setConfirmModal)} click={() => deleteModerator(election.id, user.id, refetch, closeModal(setConfirmModal))} text={"Are you sure you want to delete this moderator?"} />
        <AddModerator open={moderatorModal} closeModal={() => closeModal(setModeratorModal)} refetch={refetch} socket={socket} />
        <div className='pl-[250px] pt-[150px] w-full bg-purple-400 min-h-screen'>
        <div className='w-[98%] mx-auto px-8 '> 
        <div className='flex justify-between items-center w-full'>
          <h1 className='text-[28px] font-bold'>Moderators</h1>
          <Button onClick={openModal} add={true} disabled={launched}>Add Moderator</Button>
        </div>
            <input type="search" className='border-2 border-[#dddddd] w-1/3 rounded-md mt-4' placeholder='Search moderator by email' onChange={e => setSearch(e.target.value)} />
        <Table data={filteredData} moderator={true} remove={(id) => openConfirmModal(id)} />
        </div>
    </div>
    </>}
    </>
  );
}

export default Moderators;
