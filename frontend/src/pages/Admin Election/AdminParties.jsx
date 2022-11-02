import React, {useState, useMemo} from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from '../../api/axios';
import AddButton from '../../components/AddButton';
import {HiOutlineXMark} from 'react-icons/hi2';
import AddPartyModal from '../../components/Modals/AddPartyModal';
import ConfirmModal from '../../components/Modals/ConfirmModal';

const AdminParties = () => {

    const [search, setSearch] = useState('');
    const [partyModal, setPartyModal] = useState(false);
    const [refetch, setRefetch] = useState(true);
    const [confirmModal, setConfirmModal] = useState(false);

    const closeModal = () => {
        setPartyModal(false)
        document.body.style.overflow = 'unset';
      }
    
      const openModal = () => {
        setPartyModal(true);
        document.body.style.overflow = 'hidden';
      }


    const {data} = useQuery([refetch], async () => {
        return axios.get(`user/parties/${localStorage.election_id}`, {
                    headers: {
                      Authorization: `bearer ${localStorage.token}`
                    }
                  }).then((res) => res.data);
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
        localStorage.setItem('party_id', id)
        document.body.style.overflow = 'hidden';
      }

      const deleteParty = async () => {
        const form = {
            party_id: localStorage.party_id,
            election_id: localStorage.election_id 
        }
        
        try {
            await axios.post('user/party/remove', form, {
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
        <AddPartyModal open={partyModal} closeModal={closeModal}    refetch={() => setRefetch(!refetch)} />
        <div className='pl-[330px] pt-[150px] pr-6'>
            <h1 className='text-[28px] font-bold'>Parties</h1>
            <div className='flex flex-col w-full items-center gap-4 mt-[150px]'>
                <div className='text-center'>
                    <h2 className='text-[24px] font-semibold text-black-200'>No Parties</h2>
                    <p className='text-[18px] w-64 mt-1'>You don’t have any party, add one now!</p>
                </div>
                <AddButton text={"Add party"} click={openModal} />
            </div>
        </div>
        </>
    );

    


  return (
    <>
    <ConfirmModal  open={confirmModal} closeModal={closeConfirm} click={deleteParty} text={"Are you sure you want to delete this party?"} />
    <AddPartyModal open={partyModal} closeModal={closeModal}  refetch={() => setRefetch(!refetch)} />
    <div className='pl-[330px] pt-[150px] pr-6'>
        <div className='flex justify-between items-center w-full'>
          <h1 className='text-[28px] font-bold'>Parties</h1>
          <AddButton text={"Add Moderator"}  click={openModal} />
        </div>
            <input type="search" className='border-2 border-[#dddddd] w-1/3 rounded-md mt-4' placeholder='Search moderator by email' onChange={e => setSearch(e.target.value)} />
        <table className='mt-8'>
            <thead>
                <tr>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
            {filteredData?.map((party) => (
                <tr className='relative' key={party.name}>
                    <td className='w-full'>{party.name}</td>
                    <HiOutlineXMark className='absolute right-2 top-2 text-[25px] hover:text-red duration-150' onClick={() => openConfirmModal(party._id)} />
                </tr>
     ))}     
            </tbody>
        </table>
    </div>
    </>
  );
}

export default AdminParties;
