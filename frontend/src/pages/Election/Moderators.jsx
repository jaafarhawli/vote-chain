import React, {useState, useMemo} from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from '../../api/axios';
import Button from '../../components/Reusable/Button';
import AddModerator from '../../components/Modals/AddModerator/AddModerator';
import ConfirmModal from '../../components/Modals/ConfirmModal';
import EmptyState from '../../components/Reusable/EmptyState';
import Table from '../../components/Reusable/Table';
import { useSelector } from 'react-redux';
import Loader from '../../components/Reusable/Loader';

const Moderators = ({socket}) => {

    const election = useSelector((state) => state.election.value);
    const user = useSelector((state) => state.user.value);

    const [moderatorModal, setModeratorModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [search, setSearch] = useState('');
    const launched = election.launched===true;

    const closeModal = () => {
        setModeratorModal(false)
        document.body.style.overflow = 'unset';
      }
    
      const closeConfirm = () => {
        setConfirmModal(false)
        document.body.style.overflow = 'unset';
      }
    
    const {data, refetch, isFetching} = useQuery(["moderators"], async () => {
        return axios.get(`moderator/${election.id}`, {
                    headers: {
                      Authorization: `bearer ${localStorage.token}`
                    }
                  }).then((res) => res.data.data);
    })

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

      
      
      const deleteModerator = async () => {
        const form = {
            moderator_id: localStorage.moderator_id,
            election_id: election.id,
            user_id: user.id 
        }
        
        try {
            await axios.post('moderator/remove', form, {
                headers: {
                  Authorization: `bearer ${localStorage.token}`
                }
              });
              refetch();
              closeConfirm();
            } catch (error) {
              console.log(error.response.data.message);
            }
        }

    return (
        <>
        {
        isFetching && !moderatorModal ? 
        <Loader loading={isFetching} admin={true} />
        :
        data?.length === 0 ?
        <>
        <AddModerator open={moderatorModal} closeModal={closeModal} refetch={refetch} socket={socket} />
        <div className='pl-[250px] pt-[150px] w-full bg-purple-400 min-h-screen'>
        <div className='w-[98%] mx-auto px-8 '>
            <h1 className='text-[28px] font-bold'>Moderators</h1>
            <EmptyState title={'No Moderators'} button={'Add moderator'} disabled={launched} onClick={openModal} >You don’t have any moderators, add one now!</EmptyState>
        </div>
        </div>
        </>
        :
        <>
        <ConfirmModal  open={confirmModal} closeModal={closeConfirm} click={deleteModerator} text={"Are you sure you want to delete this moderator?"} />
        <AddModerator open={moderatorModal} closeModal={closeModal} refetch={refetch} socket={socket} />
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
