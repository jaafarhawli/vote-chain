import React, {useState, useMemo} from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from '../../api/axios';
import EmptyState from '../../components/Reusable/EmptyState';
import Button from '../../components/Reusable/Button';
import Table from '../../components/Reusable/Table';
import AddVoter from '../../components/Modals/AddVoter';
import ConfirmModal from '../../components/Modals/ConfirmModal';

const AdminVoters = () => {

    const [search, setSearch] = useState('');
    const [voterModal, setVoterModal] = useState(false);
    const [refetch, setRefetch] = useState(true);
    const [confirmModal, setConfirmModal] = useState(false);

    const closeModal = () => {
        setVoterModal(false)
        document.body.style.overflow = 'unset';
      }
    
    const openModal = () => {
      setVoterModal(true);
      document.body.style.overflow = 'hidden';
    }

    const openConfirmModal = (id) => {
        setConfirmModal(true);
        localStorage.setItem('voter_id', id)
        document.body.style.overflow = 'hidden';
      }

    const closeConfirm = () => {
      setConfirmModal(false)
      document.body.style.overflow = 'unset';
    }

    const deleteVoter = () => {
        console.log('delete');
    }

    const {data} = useQuery([refetch], async () => {
        return axios.get(`user/voters/${localStorage.election_id}`, {
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


  return (
    <>
    {data?.length===0 ?
    <>
    <AddVoter open={voterModal} closeModal={closeModal}  refetch={() => setRefetch(!refetch)} />
    <div className='pl-[330px] pt-[150px] pr-6'>
        <h1 className='text-[28px] font-bold'>Voters</h1>
        <EmptyState title={'No Voters'} button={'Add voter'} onClick={openModal}>You don’t have any voters, add one now!</EmptyState>
    </div>
    </>
    : 
    <>
    <ConfirmModal  open={confirmModal} closeModal={closeConfirm} click={deleteVoter} text={"Are you sure you want to delete this voter?"} />
    <AddVoter open={voterModal} closeModal={closeModal}  refetch={() => setRefetch(!refetch)} />
    <div className='pl-[330px] pt-[150px] pr-6'>
        <div className='flex justify-between items-center w-full'>
          <h1 className='text-[28px] font-bold'>Voters</h1>
          <Button add={true} onClick={openModal} >Add Voter</Button>
        </div>
        <input type="search" className='border-2 border-[#dddddd] w-1/3 rounded-md mt-4' placeholder='Search voter by email' onChange={e => setSearch(e.target.value)} />
        {filteredData?.length===0 ? <EmptyState title={'No Voters'}>You don’t have any voters</EmptyState> : 
        <Table data={filteredData} voter={true} remove={(id) => openConfirmModal(id)} />
        }
    </div>
    </>
    }     
    </>
  );
}

export default AdminVoters;
