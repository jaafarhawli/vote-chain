import React from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import MainHeader from './MainHeader';
import ElectionCard from '../../components/Reusable/ElectionCard';

const ModeratorElections = () => {

    const navigate = useNavigate();

    const {data: moderator_elections} = useQuery(["moderator"], async () => {
        return axios.get(`user/elections/moderator/${localStorage.id}`, {
                    headers: {
                      Authorization: `bearer ${localStorage.token}`
                    }
                  }).then((res) => res.data);
    })

    const viewElection = (id) => {
        localStorage.setItem('election_id', id);
        navigate('moderator/election')
    }

    if(moderator_elections?.length===0) 
    return (
        <div>
            <MainHeader empty={true} title={'Moderator Elections'} />
            <div className='flex flex-col w-full text-center items-center gap-1 mt-20'>
                <h1 className='text-[24px] font-semibold text-black-200'>No Elections</h1>
                <p className='w-[220px]'>You're not assigned as moderator to any election</p>
            </div>
        </div>
    );

    return (
        <div>
          <MainHeader empty={true} title={'Moderator Elections'} />
          <div className=' grid md:grid-cols-2 gap-4 lg:px-28 md:px-10 px-4 mt-8'>
          {moderator_elections?.map((election) => (
              <ElectionCard onClick={() => viewElection(election._id)} id={election._id} title={election.title} start_time={election.start_time} end_time={election.end_time} />
         ))}
          </div>
        </div>
      );
}

export default ModeratorElections;
