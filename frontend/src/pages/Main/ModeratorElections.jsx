import React from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import MainHeader from './MainHeader';
import ElectionCard from '../../components/Reusable/ElectionCard';
import EmptyState from '../../components/Reusable/EmptyState';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { viewElection as view } from '../../redux/election';
import { checkIfLaunched } from '../../Web3Client';

const ModeratorElections = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {data, refetch} = useQuery(["moderators"], async () => {
        return axios.get(`election/moderator/${localStorage.id}`, {
                    headers: {
                      Authorization: `bearer ${localStorage.token}`
                    }
                  }).then((res) => res.data.data);
    })

    const viewElection = async (id) => {
      const election = await axios.get(`election/moderator/${localStorage.id}/${id}`, {
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
      navigate('/main/moderator/election/dashboard')
    }

    if(data?.length===0) 
    return (
        <div>
            <MainHeader empty={true} title={'Moderator Elections'} refetch={refetch} />
            <EmptyState title={'No Elections'} >You're not assigned as moderator to any election</EmptyState>
            <ToastContainer autoClose={4000} hideProgressBar={true} position="top-right" limit={1} />
        </div>
    );

    return (
        <div>
          <MainHeader empty={true} title={'Moderator Elections'} refetch={refetch} />
          <div className=' grid md:grid-cols-2 gap-4 lg:px-28 md:px-10 px-4 mt-8'>
          {data?.map((election) => (
              <ElectionCard onClick={() => viewElection(election._id)} id={election._id} title={election.title} start_time={election.start_time} end_time={election.end_time} key={election._id} />
         ))}
          </div>
          <ToastContainer autoClose={4000} hideProgressBar={true} position="top-right" limit={1} />
        </div>
      );
}

export default ModeratorElections;
