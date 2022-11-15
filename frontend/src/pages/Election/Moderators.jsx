import React, {useState, useMemo} from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from '../../api/axios';
import Button from '../../components/Reusable/Button';
import AddModerator from '../../components/Modals/AddModerator';
import ConfirmModal from '../../components/Modals/ConfirmModal';
import EmptyState from '../../components/Reusable/EmptyState';
import Table from '../../components/Reusable/Table';

const Moderators = ({socket}) => {

    const [moderatorModal, setModeratorModal] = useState(false);
    const [refetch, setRefetch] = useState(true);
    const [confirmModal, setConfirmModal] = useState(false);
    const [search, setSearch] = useState('');
    const launched = localStorage.election_launched==="true";

    const closeModal = () => {
        setModeratorModal(false)
        document.body.style.overflow = 'unset';
      }
    
      const closeConfirm = () => {
        setConfirmModal(false)
        document.body.style.overflow = 'unset';
      }
    
    const {data} = useQuery([refetch], async () => {
        return axios.get(`moderator/${localStorage.election_id}`, {
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
            election_id: localStorage.election_id,
            user_id: localStorage.id 
        }
        
        try {
            await axios.post('moderator/remove', form, {
                headers: {
                  Authorization: `bearer ${localStorage.token}`
                }
              });
              setRefetch(!refetch)
              closeConfirm()
            } catch (error) {
              console.log(error.response.data.message);
            }
        }

        
      

    if(data?.length === 0)
    return (
        <>
        <AddModerator open={moderatorModal} closeModal={closeModal}  refetch={() => setRefetch(!refetch)} socket={socket} />
        <div className='pl-[330px] pt-[150px] pr-6'>
            <h1 className='text-[28px] font-bold'>Moderators</h1>
            <EmptyState title={'No Moderators'} button={'Add moderator'} disabled={launched} onClick={openModal} >You don’t have any moderators, add one now!</EmptyState>
        </div>
        </>
    );

  return (
        <>
        <ConfirmModal  open={confirmModal} closeModal={closeConfirm} click={deleteModerator} text={"Are you sure you want to delete this moderator?"} />
        <AddModerator open={moderatorModal} closeModal={closeModal} refetch={() => setRefetch(!refetch)} socket={socket} />
    <div className='pl-[330px] pt-[150px] pr-6'>
        <div className='flex justify-between items-center w-full'>
          <h1 className='text-[28px] font-bold'>Moderators</h1>
          <Button onClick={openModal} add={true} disabled={launched}>Add Moderator</Button>
        </div>
            <input type="search" className='border-2 border-[#dddddd] w-1/3 rounded-md mt-4' placeholder='Search moderator by email' onChange={e => setSearch(e.target.value)} />
        <Table data={filteredData} moderator={true} remove={(id) => openConfirmModal(id)} />
    </div>
    </>
  );
}

export default Moderators;
