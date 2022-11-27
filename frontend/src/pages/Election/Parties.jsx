import React, {useState, useMemo} from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from '../../api/axios';
import Button from '../../components/Reusable/Button';
import AddPartyModal from '../../components/Modals/AddPartyModal';
import ConfirmModal from '../../components/Modals/ConfirmModal';
import EmptyState from '../../components/Reusable/EmptyState';
import Table from '../../components/Reusable/Table';
import AddCandidate from '../../components/Modals/AddCandidate/AddCandidate';
import { useSelector } from 'react-redux';
import Loader from '../../components/Reusable/Loader';

const Parties = () => {

    const election = useSelector((state) => state.election.value);
    const user = useSelector((state) => state.user.value);

    const [search, setSearch] = useState('');
    const [partyModal, setPartyModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    const [candidateModal, setCandidateModal] = useState(false);
    const launched = election.launched===true;

    const closeModal = () => {
        setPartyModal(false)
        document.body.style.overflow = 'unset';
      }
    
      const openModal = () => {
        setPartyModal(true);
        document.body.style.overflow = 'hidden';
      }


    const {data, refetch, isFetching} = useQuery(["parties"], async () => {
        return axios.get(`party/${election.id}`, {
                    headers: {
                      Authorization: `bearer ${localStorage.token}`
                    }
                  }).then((res) => res.data.data);
    })

    const filteredData = useMemo(() => {
        return data?.filter(row => {
          return row?.name?.toLowerCase().includes(search.toLowerCase())
        })
      }, [data, search])

    const closeConfirm = () => {
        setConfirmModal(false)
        document.body.style.overflow = 'unset';
      }
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

      const closeCandidateModal = () => {
        setCandidateModal(false)
        document.body.style.overflow = 'unset';
      }
      

      const deleteParty = async () => {
        const form = {
            party_id: localStorage.party_id,
            election_id: election.id,
            user_id: user.id 
        }
        
        try {
            await axios.post('party/remove', form, {
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

    return (
      <>
      {isFetching && !candidateModal ? 
      <Loader loading={isFetching} admin={true} />
      :
      data?.length === 0 ? 
        <>
        <AddPartyModal open={partyModal} closeModal={closeModal}    refetch={refetch} />
        <div className='pl-[250px] pt-[150px] w-full bg-purple-400 min-h-screen'>
        <div className='w-[98%] mx-auto px-8 '>
            <h1 className='text-[28px] font-bold'>Parties</h1>
            <EmptyState title={'No Parties'} button={'Add party'} disabled={launched} onClick={openModal} >You don’t have any parties, add one now!</EmptyState>
        </div>
        </div>
        </>
      :
    <>
    <ConfirmModal  open={confirmModal} closeModal={closeConfirm} click={deleteParty} text={"Are you sure you want to delete this party?"} />
    <AddPartyModal open={partyModal} closeModal={closeModal}  refetch={refetch} />
    <AddCandidate open={candidateModal} closeModal={closeCandidateModal} />
    <div className='pl-[250px] pt-[150px] w-full bg-purple-400 min-h-screen'>
    <div className='w-[98%] mx-auto px-8 '>
        <div className='flex justify-between items-center w-full'>
          <h1 className='text-[28px] font-bold'>Parties</h1>
          <Button onClick={openModal} add={true} disabled={launched}>Add Party</Button>
        </div>
            <input type="search" className='border-2 border-[#dddddd] w-1/3 rounded-md mt-4' placeholder='Search moderator by email' onChange={e => setSearch(e.target.value)} />
            <Table data={filteredData} party={true} remove={(id) => openConfirmModal(id)} addCandidate={(id) => openCandidateModal(id)} />
    </div>
    </div>
    </>}
    </>
  );
}

export default Parties;
