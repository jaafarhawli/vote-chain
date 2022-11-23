import React, {useState, useMemo} from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from '../../api/axios';
import EmptyState from '../../components/Reusable/EmptyState';
import Button from '../../components/Reusable/Button';
import Table from '../../components/Reusable/Table';
import AddVoter from '../../components/Modals/AddVoter';
import ConfirmModal from '../../components/Modals/ConfirmModal';
import { useSelector } from 'react-redux';
import Loader from '../../components/Reusable/Loader';

const Voters = (props) => {

    const election = useSelector((state) => state.election.value);
    const user = useSelector((state) => state.user.value);

    const [search, setSearch] = useState('');
    const [voterModal, setVoterModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const launched = election.launched===true;

    const closeModal = () => {
        setVoterModal(false)
        document.body.style.overflow = 'unset';
      }
    
    const openModal = () => {
      setVoterModal(true);
      document.body.style.overflow = 'hidden';
    }

    const openConfirmModal = (id) => {
        if(launched)
        return
        setConfirmModal(true);
        localStorage.setItem('voter_id', id)
        document.body.style.overflow = 'hidden';
      }

    const closeConfirm = () => {
      setConfirmModal(false)
      document.body.style.overflow = 'unset';
    }

    const deleteVoter = async () => {
        const form = {
            voter_id: localStorage.voter_id,
            election_id: election.id,
            user_id: user.id 
        }
        
        try {
            await axios.post('voter/remove', form, {
                headers: {
                  Authorization: `bearer ${localStorage.token}`
                }
              });
              refetch();
              closeConfirm()
            } catch (error) {
              console.log(error.response.data.message);
            }
    }

    const {data, refetch, isLoading} = useQuery(["voters"], async () => {
        return axios.get(`voter/voters/${election.id}`, {
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


  return (
    <>
    {
    isLoading ? 
    <div className='pl-[250px] pt-[150px] w-full bg-purple-400 min-h-screen'>
        <Loader loading={isLoading} />
    </div>
    :
    data?.length===0 ?
    <>
    <AddVoter open={voterModal} closeModal={closeModal}  refetch={refetch} />
    <div className='pl-[250px] pt-[150px] w-full bg-purple-400 min-h-screen'>
    <div className='w-[98%] mx-auto px-8 '>
        <h1 className='text-[28px] font-bold'>Voters</h1>
        <EmptyState title={'No Voters'} button={'Add voter'} disabled={launched} onClick={openModal}>You don’t have any voters, add one now!</EmptyState>
    </div>
    </div>
    </>
    : 
    <>
    <ConfirmModal  open={confirmModal} closeModal={closeConfirm} click={deleteVoter} text={"Are you sure you want to delete this voter?"} />
    <AddVoter open={voterModal} closeModal={closeModal}  refetch={refetch} />
    <div className='pl-[250px] pt-[150px] w-full bg-purple-400 min-h-screen'>
    <div className='w-[98%] mx-auto px-8 '>
        <div className='flex justify-between items-center w-full'>
          <h1 className='text-[28px] font-bold'>Voters</h1>
          <Button add={true} onClick={openModal} disabled={launched} >Add Voter</Button>
        </div>
        <input type="search" className='border-2 border-[#dddddd] w-1/3 rounded-md mt-4' placeholder='Search voter by email' onChange={e => setSearch(e.target.value)} />
        {filteredData?.length===0 ? <EmptyState title={'No Voters'}>You don’t have any voters</EmptyState> : 
        props.admin ? 
        <Table admin={true} data={filteredData} voter={true} remove={(id) => openConfirmModal(id)} />
        :
        <Table data={filteredData} voter={true} remove={(id) => openConfirmModal(id)} />
        }
    </div>
    </div>
    </>
    }     
    </>
  );
}

export default Voters;
