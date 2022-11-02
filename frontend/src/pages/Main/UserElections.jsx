import React, {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import MainHeader from '../../components/MainHeader';
import CreateElection from '../../components/CreateElection';

const UserElections = () => {

  const navigate = useNavigate();

  const [electionModal, setElectionModal] = useState(false);
  const [refetch, setRefetch] = useState(true);

  const {data: admin_elections} = useQuery([refetch], async () => {
    return axios.get(`user/elections/${localStorage.id}`, {
                headers: {
                  Authorization: `bearer ${localStorage.token}`
                }
              }).then((res) => res.data);
})
  

const viewElection = (id) => {
    localStorage.setItem('election_id', id);
    navigate('admin/election/dashboard')
}

const openModal = () => {
  setElectionModal(true);
  document.body.style.overflow = 'hidden';
}

const closeModal = () => {
  setElectionModal(false)
  document.body.style.overflow = 'unset';
}

if(admin_elections?.length===0) 
return (
    <div>
      <CreateElection open={electionModal} closeModal={closeModal} refetch={() => setRefetch(!refetch)} />
        <MainHeader title={'Your Elections'} empty={true} open={openModal} />
        <div className='flex flex-col w-full text-center items-center gap-1 mt-20'>
            <h1 className='text-[24px] font-semibold text-black-200'>No Elections</h1>
            <p className='w-[220px]'>You don’t have any elections, create one now!</p>
            <button className='mt-6' onClick={openModal}>Create a new election</button>
        </div>
    </div>
)

  return (
    <div>
      <CreateElection open={electionModal} closeModal={closeModal} refetch={() => setRefetch(!refetch)} />
      <MainHeader empty={false} title={'Your Elections'} open={openModal} />
      <div className=' grid md:grid-cols-2 gap-4 lg:px-28 md:px-10 px-4 my-8'>
      {admin_elections?.map((election) => (
          <div className='px-4 py-8 bg-purple-100/75 rounded-lg text-white' onClick={() => viewElection(election._id)} key={election._id}>
              <h2 className='font-semibold text-[20px]'>{election.title}</h2>
              <div className='flex flex-col lg:w-full lg:flex-row mt-2 lg:gap-2'>
                <div className='flex-1'>
                    <p className='text-[13px]'><span className=' font-semibold'>Starts on</span> {election.start_time}</p>
                </div>
                <div className='flex-1'>
                    <p className='text-[13px]'><span className=' font-semibold '>Ends on</span> {election.end_time}</p>
                </div>
              </div>
          </div>
     ))}
      </div>
    </div>
  );
}

export default UserElections;



