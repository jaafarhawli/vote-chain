import React, {useState, useMemo} from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from '../../api/axios';
import Button from '../../components/Reusable/Button';
import {HiOutlineXMark} from 'react-icons/hi2';
import AddModerator from '../../components/Modals/AddModerator';
import ConfirmModal from '../../components/Modals/ConfirmModal';
import EmptyState from '../../components/Reusable/EmptyState';

const AdminModerators = () => {

    const [moderatorModal, setModeratorModal] = useState(false);
    const [refetch, setRefetch] = useState(true);
    const [confirmModal, setConfirmModal] = useState(false);
    const [search, setSearch] = useState('');

    const closeModal = () => {
        setModeratorModal(false)
        document.body.style.overflow = 'unset';
      }
    
      const closeConfirm = () => {
        setConfirmModal(false)
        document.body.style.overflow = 'unset';
      }
    
const {data} = useQuery([refetch], async () => {
        return axios.get(`user/moderators/${localStorage.election_id}`, {
                    headers: {
                      Authorization: `bearer ${localStorage.token}`
                    }
                  }).then((res) => res.data);
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
        setConfirmModal(true);
        localStorage.setItem('moderator_id', id)
        document.body.style.overflow = 'hidden';
      }

      
      
      const deleteModerator = async () => {
        const form = {
            moderator_id: localStorage.moderator_id,
            election_id: localStorage.election_id 
        }
        
        try {
            await axios.post('user/moderator/remove', form, {
                headers: {
                  Authorization: `bearer ${localStorage.token}`
                }
              });
              setRefetch(!refetch)
                 closeConfirm()
            } catch (error) {
              console.log(error);
            }
        }

        
      

    if(data?.length === 0)
    return (
        <>
        <AddModerator open={moderatorModal} closeModal={closeModal}  refetch={() => setRefetch(!refetch)} />
        <div className='pl-[330px] pt-[150px] pr-6'>
            <h1 className='text-[28px] font-bold'>Moderators</h1>
            <EmptyState title={'No Moderators'} button={'Add moderator'} onClick={openModal} >You don’t have any moderators, add one now!</EmptyState>
        </div>
        </>
    );

  return (
        <>
        <ConfirmModal  open={confirmModal} closeModal={closeConfirm} click={deleteModerator} text={"Are you sure you want to delete this moderator?"} />
        <AddModerator open={moderatorModal} closeModal={closeModal} refetch={() => setRefetch(!refetch)} />
    <div className='pl-[330px] pt-[150px] pr-6'>
        <div className='flex justify-between items-center w-full'>
          <h1 className='text-[28px] font-bold'>Moderators</h1>
          <Button onClick={openModal} add={true}>Add Moderator</Button>
        </div>
            <input type="search" className='border-2 border-[#dddddd] w-1/3 rounded-md mt-4' placeholder='Search moderator by email' onChange={e => setSearch(e.target.value)} />
        <table className='mt-8'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
            {filteredData?.map((moderator) => (
                <tr className='relative' key={moderator.email}>
                    <td>{moderator.first_name} {moderator.last_name}</td>
                    <td>{moderator.email}</td>
                    <HiOutlineXMark className='absolute right-2 top-2 text-[25px] hover:text-red duration-150' onClick={() => openConfirmModal(moderator._id)} />
                </tr>
     ))}
                
            </tbody>
        </table>
    </div>
    </>
  );
}

export default AdminModerators;
