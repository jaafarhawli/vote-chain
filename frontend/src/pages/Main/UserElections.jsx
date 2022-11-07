import React, {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import MainHeader from './MainHeader';
import CreateElection from '../../components/Modals/CreateElection';
import ElectionCard from '../../components/Reusable/ElectionCard';
import EmptyState from '../../components/Reusable/EmptyState';

const UserElections = () => {

  const navigate = useNavigate();

  const [electionModal, setElectionModal] = useState(false);
  const [refetch, setRefetch] = useState(true);

  const {data: admin_elections} = useQuery([refetch], async () => {
    return axios.get(`election/${localStorage.id}`, {
                headers: {
                  Authorization: `bearer ${localStorage.token}`
                }
              }).then((res) => res.data.data);
})

const viewElection = (id, start_time, end_time, description, launched) => {
    localStorage.setItem('election_id', id);
    localStorage.setItem('election_start', start_time);
    localStorage.setItem('election_end', end_time);
    localStorage.setItem('election_description', description);
    localStorage.setItem('election_launched', launched);
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
        <EmptyState title={'No Elections'} button={'Create a new election'} onClick={openModal} >You don’t have any elections, create one now!</EmptyState>
    </div>
)

  return (
    <div>
      <CreateElection open={electionModal} closeModal={closeModal} refetch={() => setRefetch(!refetch)} />
      <MainHeader empty={false} title={'Your Elections'} open={openModal} />
      <div className=' grid md:grid-cols-2 gap-4 lg:px-28 md:px-10 px-4 my-8'>
      {admin_elections?.map((election) => (
          <ElectionCard onClick={() => viewElection(election._id, election.start_time, election.end_time, election.description, election.launched)} id={election._id} title={election.title} start_time={election.start_time} end_time={election.end_time} key={election._id} />
     ))}
      </div>
    </div>
  );
}

export default UserElections;



