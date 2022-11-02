import React, {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from '../../api/axios';
import AddButton from '../../components/AddButton';
import {AiOutlineSearch} from 'react-icons/ai';
import {HiOutlineXMark} from 'react-icons/hi2';
import AddModerator from '../../components/AddModerator';
import ConfirmModal from '../../components/ConfirmModal';

const AdminModerators = () => {

    const [moderatorModal, setModeratorModal] = useState(false);
    const [refetch, setRefetch] = useState(true);
    const [confirmModal, setConfirmModal] = useState(false);

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
            <div className='flex flex-col w-full items-center gap-4 mt-[150px]'>
                <div className='text-center'>
                    <h2 className='text-[24px] font-semibold text-black-200'>No Moderators</h2>
                    <p className='text-[18px] w-64 mt-1'>You don’t have any moderators, add one now!</p>
                </div>
                <AddButton text={"Add moderator"} click={openModal} />
            </div>
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
          <AddButton text={"Add Moderator"} click={openModal} />
        </div>
        <div className='flex gap-2 items-center mt-4'>
            <input type="text" className='border-2 border-[#dddddd] w-1/3 rounded-md' placeholder='Search moderator by email' />
            <AiOutlineSearch className='text-black-200 p-2 border-[#dddddd] border-2 w-[40px] h-[40px] rounded-lg' />
        </div>
        <table className='mt-8'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
            {data?.map((moderator) => (
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
