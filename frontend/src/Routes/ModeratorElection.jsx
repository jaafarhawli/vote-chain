import React from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from '../api/axios';
import {Route, Routes} from 'react-router-dom';
import Panel from '../components/Reusable/Panel';
import AdminDashboard from '../pages/Admin Election/AdminDashboard';
import AdminVoters from '../pages/Admin Election/AdminVoters';
import ElectionTitle from '../components/Reusable/ElectionTitle';


const ModeratorElection = () => {

    const {data} = useQuery([], async () => {
        return axios.get(`user/election/moderator/${localStorage.id}/${localStorage.election_id}`, {
                    headers: {
                      Authorization: `bearer ${localStorage.token}`
                    }
                  }).then((res) => res.data);
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
          <Route path='/dashboard' element={<AdminDashboard />} />
          <Route path='/voters' element={<AdminVoters />} />
      </Routes>
    </div>
  );
}

export default ModeratorElection;
