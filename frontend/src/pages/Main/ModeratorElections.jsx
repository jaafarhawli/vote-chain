import React, {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import MainHeader from './MainHeader/MainHeader';
import ElectionCard from '../../components/Reusable/ElectionCard';
import EmptyState from '../../components/Reusable/EmptyState';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { viewElection as view } from '../../redux/election';
import { checkIfLaunched } from '../../Web3';
import { useSelector } from 'react-redux';
import Loader from '../../components/Reusable/Loader';
import { viewModeratorElections } from '../../api/viewModeratorElections';

const ModeratorElections = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loadingElection, setLoadingElection] = useState(false);
    const user = useSelector((state) => state.user.value);

    const {data, refetch, isLoading} = useQuery(["moderatorElections"], () => viewModeratorElections(user.id));

    const viewElection = async (id) => {
      setLoadingElection(true);
      const election = await axios.get(`election/moderator/${user.id}/${id}`, {
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
        address: election.data.data.contract_address
      }));
      setLoadingElection(false);
      navigate('/main/moderator/election/dashboard')
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
