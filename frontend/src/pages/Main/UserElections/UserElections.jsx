import React, {useState} from 'react';
import MainHeader from '../MainHeader/MainHeader';
import {CreateElection, openModal, closeModal} from '../../../components/Modals';
import {Loader, EmptyState, ElectionCard} from '../../../components/Reusable';
import { useNavigate } from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { viewElections } from '../../../api/viewElections';
import { openElection } from './openElection';

// This page displays all the elections created by the user
const UserElections = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [electionModal, setElectionModal] = useState(false);
  const [loadingElection, setLoadingElection] = useState(false);

  const {data: admin_elections, refetch, isLoading} = useQuery(["elections"], () => viewElections(user.id));

const viewElection = async (id) => {
    setLoadingElection(true);
    await openElection(id, user.id, dispatch);
    setLoadingElection(false);
    navigate('admin/election/dashboard')
}

return (
  <>
  {
  admin_elections?.length===0 ?
    <div>
      <CreateElection open={electionModal} closeModal={() => closeModal(setElectionModal)} refetch={refetch} />
      <div className='bg-bg lg:px-28 md:px-10 px-4 pt-6 min-h-screen'>
        <MainHeader title={'Your Elections'} empty={true} open={() => openModal(setElectionModal)} refetch={refetch} />
        <EmptyState title={'No Elections'} light={true} button={'Create a new election'} onClick={() => openModal(setElectionModal)} >You don’t have any elections, create one now!</EmptyState>
      </div>
      <ToastContainer autoClose={4000} hideProgressBar={true} position="top-right" limit={1} />
    </div>
    :
    <div>
      <CreateElection open={electionModal} closeModal={() => closeModal(setElectionModal)} refetch={refetch} />
      <div className='bg-bg lg:px-28 md:px-10 px-4 pt-6 min-h-screen flex flex-col'>
        <MainHeader empty={false} title={'Your Elections'} open={() => openModal(setElectionModal)} refetch={refetch} />
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