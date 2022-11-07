import React, {useState, useMemo} from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from '../../api/axios';
import Button from '../../components/Reusable/Button';
import AddPartyModal from '../../components/Modals/AddPartyModal';
import ConfirmModal from '../../components/Modals/ConfirmModal';
import EmptyState from '../../components/Reusable/EmptyState';
import Table from '../../components/Reusable/Table';
import AddCandidate from '../../components/Modals/AddCandidate';

const Parties = () => {

    const [search, setSearch] = useState('');
    const [partyModal, setPartyModal] = useState(false);
    const [refetch, setRefetch] = useState(true);
    const [confirmModal, setConfirmModal] = useState(false);
    const [candidateModal, setCandidateModal] = useState(false);

    const closeModal = () => {
        setPartyModal(false)
        document.body.style.overflow = 'unset';
      }
    
      const openModal = () => {
        setPartyModal(true);
        document.body.style.overflow = 'hidden';
      }


    const {data} = useQuery([refetch], async () => {
        return axios.get(`party/${localStorage.election_id}`, {
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
        setConfirmModal(true);
        localStorage.setItem('party_id', id);
        document.body.style.overflow = 'hidden';
      }

      const openCandidateModal = (id) => {
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
            election_id: localStorage.election_id,
            user_id: localStorage.id 
        }
        
        try {
            await axios.post('party/remove', form, {
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
        <AddPartyModal open={partyModal} closeModal={closeModal}    refetch={() => setRefetch(!refetch)} />
        <div className='pl-[330px] pt-[150px] pr-6'>
            <h1 className='text-[28px] font-bold'>Parties</h1>
            <EmptyState title={'No Parties'} button={'Add party'} onClick={openModal} >You don’t have any parties, add one now!</EmptyState>
        </div>
        </>
    );


  return (
    <>
    <ConfirmModal  open={confirmModal} closeModal={closeConfirm} click={deleteParty} text={"Are you sure you want to delete this party?"} />
    <AddPartyModal open={partyModal} closeModal={closeModal}  refetch={() => setRefetch(!refetch)} />
    <AddCandidate open={candidateModal} closeModal={closeCandidateModal} />
    <div className='pl-[330px] pt-[150px] pr-6'>
        <div className='flex justify-between items-center w-full'>
          <h1 className='text-[28px] font-bold'>Parties</h1>
          <Button onClick={openModal} add={true}>Add Party</Button>
        </div>
            <input type="search" className='border-2 border-[#dddddd] w-1/3 rounded-md mt-4' placeholder='Search moderator by email' onChange={e => setSearch(e.target.value)} />
            <Table data={filteredData} party={true} remove={(id) => openConfirmModal(id)} addCandidate={(id) => openCandidateModal(id)} />
    </div>
    </>
  );
}

export default Parties;
