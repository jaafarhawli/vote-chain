import React from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import MainHeader from './MainHeader';
import ElectionCard from '../../components/Reusable/ElectionCard';
import EmptyState from '../../components/Reusable/EmptyState';

const ModeratorElections = () => {

    const navigate = useNavigate();

    const {data} = useQuery(["moderator"], async () => {
        return axios.get(`election/moderator/${localStorage.id}`, {
                    headers: {
                      Authorization: `bearer ${localStorage.token}`
                    }
                  }).then((res) => res.data.data);
    })

    const viewElection = (id, timezone, start_time, end_time) => {
      localStorage.setItem('election_id', id);
      localStorage.setItem('election_start', start_time);
      localStorage.setItem('election_end', end_time);
      localStorage.setItem('election_timezone', timezone);
      navigate('/main/moderator/election/dashboard')
    }

    if(data?.length===0) 
    return (
        <div>
            <MainHeader empty={true} title={'Moderator Elections'} />
            <EmptyState title={'No Elections'} >You're not assigned as moderator to any election</EmptyState>
        </div>
    );

    return (
        <div>
          <MainHeader empty={true} title={'Moderator Elections'} />
          <div className=' grid md:grid-cols-2 gap-4 lg:px-28 md:px-10 px-4 mt-8'>
          {data?.map((election) => (
              <ElectionCard onClick={() => viewElection(election._id, election.timezone, election.start_time, election.end_time)} id={election._id} title={election.title} start_time={election.start_time} end_time={election.end_time} />
         ))}
          </div>
        </div>
      );
}

export default ModeratorElections;
