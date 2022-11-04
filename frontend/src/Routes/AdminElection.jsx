import React from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from '../api/axios';
import {Route, Routes} from 'react-router-dom';
import Panel from '../components/Reusable/Panel';
import AdminTitle from '../components/Reusable/AdminTitle';
import AdminDashboard from '../pages/Admin Election/AdminDashboard';
import AdminModerators from '../pages/Admin Election/AdminModerators';
import AdminParties from '../pages/Admin Election/AdminParties';
import AdminCandidate from '../pages/Admin Election/AdminCandidate';
import AdminVoters from '../pages/Admin Election/AdminVoters';
import AdminSettings from '../pages/Admin Election/AdminSettings';
import AdminLaunch from '../pages/Admin Election/AdminLaunch';

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
      <AdminTitle />
      <Routes>
          <Route path='/dashboard' element={<AdminDashboard />} />
          <Route path='/moderators' element={<AdminModerators />} />
          <Route path='/parties' element={<AdminParties />} />
          <Route path='/candidates' element={<AdminCandidate />} />
          <Route path='/voters' element={<AdminVoters admin={true} />} />
          <Route path='/settings' element={<AdminSettings />} />
          <Route path='/launch' element={<AdminLaunch />} />
      </Routes>
    </div>
  );
}

export default AdminElection;
