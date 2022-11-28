import React, {useState} from 'react';
import MainHeader from '../MainHeader/MainHeader';
import {useQuery} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {Loader, EmptyState, ElectionCard} from '../../../components/Reusable';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { viewModeratorElections } from '../../../api/viewModeratorElections';
import { openElection } from './openElection';

// This page displays all the elections the user is a moderator for
const ModeratorElections = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loadingElection, setLoadingElection] = useState(false);
    const user = useSelector((state) => state.user.value);

    const {data, refetch, isLoading} = useQuery(["moderatorElections"], () => viewModeratorElections(user.id));

    const viewElection = async (id) => {
      setLoadingElection(true);
      await openElection(id, user.id, dispatch);
      setLoadingElection(false);
      navigate('/main/moderator/election/dashboard');
    }

    return (
        <>
        {data?.length===0 ? 
        <div>
          <div className='bg-bg lg:px-28 md:px-10 px-4 pt-6 min-h-screen'>
            <MainHeader empty={true} title={'Moderator Elections'} refetch={refetch} />
            <EmptyState title={'No Elections'} light={true}>You're not assigned as moderator to any election</EmptyState>
          </div>
            <ToastContainer autoClose={4000} hideProgressBar={true} position="top-right" limit={1} />
        </div>
        :
        <div>
          <div className='bg-bg lg:px-28 md:px-10 px-4 pt-6 min-h-screen'>
          <MainHeader empty={true} title={'Moderator Elections'} refetch={refetch} />
          {isLoading || loadingElection ? 
          <Loader />
          :
          <div className=' grid md:grid-cols-2 gap-4 mt-8'>
          {data?.map((election) => (
              <ElectionCard onClick={() => viewElection(election._id)} id={election._id} title={election.title} start_time={election.start_time} end_time={election.end_time} key={election._id} />
         ))}
          </div>}
          </div>
          <ToastContainer autoClose={4000} hideProgressBar={true} position="top-right" limit={1} />
        </div>}
        </>
      );
}

export default ModeratorElections;
