import React, {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import MainHeader from './MainHeader';
import CreateElection from '../../components/Modals/CreateElection';
import ElectionCard from '../../components/Reusable/ElectionCard';
import EmptyState from '../../components/Reusable/EmptyState';
import { useDispatch } from 'react-redux';
import { viewElection as view } from '../../redux/election';
import { ToastContainer } from 'react-toastify';
import { checkIfLaunched } from '../../Web3Client';
import { useSelector } from 'react-redux';
import Loader from '../../components/Reusable/Loader';

const UserElections = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [electionModal, setElectionModal] = useState(false);
  const [loadingElection, setLoadingElection] = useState(false);

  const {data: admin_elections, refetch, isLoading} = useQuery(["elections"], async () => {
    return axios.get(`election/${user.id}`, {
                headers: {
                  Authorization: `bearer ${localStorage.token}`
                }
              }).then((res) => res.data.data);
  })

const viewElection = async (id) => {
    setLoadingElection(true);
    const election = await axios.get(`election/${user.id}/${id}`, {
    headers: {
      Authorization: `bearer ${localStorage.token}`
    }
  });
  let isLaunched = false;
  await checkIfLaunched(election.data.data.contract_address).then((launched) => isLaunched = launched);
    dispatch(view({
      id: id,
      title: election.data.data.title,
      startTime: election.data.data.start_time,
      endTime: election.data.data.end_time,
      code: election.data.data.code,
      launched: isLaunched,
      description: election.data.data.description,
      address: election.data.data.contract_address
    }));
    setLoadingElection(false);
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



return (
  <>
  {
  admin_elections?.length===0 ?
    <div>
      <CreateElection open={electionModal} closeModal={closeModal} refetch={refetch} />
      <div className='bg-bg lg:px-28 md:px-10 px-4 pt-6 min-h-screen'>
        <MainHeader title={'Your Elections'} empty={true} open={openModal} refetch={refetch} />
        <EmptyState title={'No Elections'} light={true} button={'Create a new election'} onClick={openModal} >You don’t have any elections, create one now!</EmptyState>
      </div>
      <ToastContainer autoClose={4000} hideProgressBar={true} position="top-right" limit={1} />
    </div>
    :
    <div>
      <CreateElection open={electionModal} closeModal={closeModal} refetch={refetch} />
      <div className='bg-bg lg:px-28 md:px-10 px-4 pt-6 min-h-screen flex flex-col'>
        <MainHeader empty={false} title={'Your Elections'} open={openModal} refetch={refetch} />
        {isLoading || loadingElection ? 
        <Loader />
        :
        <div className='grid md:grid-cols-2 gap-4  w-full py-8'>
        {admin_elections?.map((election) => (
            <ElectionCard onClick={() => viewElection(election._id)} id={election._id} title={election.title} start_time={election.start_time} end_time={election.end_time} key={election._id} />
        ))}
      </div>
      }
      </div>
      <ToastContainer autoClose={4000} hideProgressBar={true} position="top-right" limit={1} />
    </div>}
    </>
  );
}

export default UserElections;