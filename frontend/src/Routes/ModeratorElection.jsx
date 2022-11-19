import React from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from '../api/axios';
import {Route, Routes} from 'react-router-dom';
import Panel from '../components/Reusable/Panel';
import ElectionTitle from '../components/Reusable/ElectionTitle';
import Dashboard from '../pages/Election/Dashboard';
import Voters from '../pages/Election/Voters';


const ModeratorElection = () => {

    const {data} = useQuery([], async () => {
        return axios.get(`election/moderator/${localStorage.id}/${localStorage.election_id}`, {
                    headers: {
                      Authorization: `bearer ${localStorage.token}`
                    }
                  }).then((res) => res.data.data);
    })

    localStorage.setItem('election_title', data?.title);
    localStorage.setItem('start_time', data?.start_time);
    localStorage.setItem('end_time', data?.end_time);
    localStorage.setItem('election_code', data?.code);

  return (
    <div>
      <Panel />
      <ElectionTitle />
      <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/voters' element={<Voters />} />
      </Routes>
    </div>
  );
}

export default ModeratorElection;
