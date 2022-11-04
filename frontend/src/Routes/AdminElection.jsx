import React from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from '../api/axios';
import {Route, Routes} from 'react-router-dom';
import Panel from '../components/Reusable/Panel';
import ElectionTitle from '../components/Reusable/ElectionTitle';
import Dashboard from '../pages/Election/Dashboard';
import Moderators from '../pages/Election/Moderators';
import Parties from '../pages/Election/Parties';
import Candidates from '../pages/Election/Candidates';
import Voters from '../pages/Election/Voters';
import Settings from '../pages/Election/Settings';
import Launch from '../pages/Election/Launch';

const AdminElection = () => {

    const {data} = useQuery(["election"], async () => {
        return axios.get(`user/election/${localStorage.id}/${localStorage.election_id}`, {
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
      <Panel admin={true} />
      <ElectionTitle />
      <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/moderators' element={<Moderators />} />
          <Route path='/parties' element={<Parties />} />
          <Route path='/candidates' element={<Candidates />} />
          <Route path='/voters' element={<Voters admin={true} />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/launch' element={<Launch />} />
      </Routes>
    </div>
  );
}

export default AdminElection;
