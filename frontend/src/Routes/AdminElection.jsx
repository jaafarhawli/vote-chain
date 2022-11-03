import React from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from '../api/axios';
import {Route, Routes} from 'react-router-dom';
import AdminPanel from '../components/Reusable/AdminPanel';
import AdminTitle from '../components/Reusable/AdminTitle';
import AdminDashboard from '../pages/Admin Election/AdminDashboard';
import AdminModerators from '../pages/Admin Election/AdminModerators';
import AdminParties from '../pages/Admin Election/AdminParties';

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
      <AdminPanel />
      <AdminTitle />
      <Routes>
          <Route path='/dashboard' element={<AdminDashboard />} />
          <Route path='/moderators' element={<AdminModerators />} />
          <Route path='/parties' element={<AdminParties />} />
      </Routes>
    </div>
  );
}

export default AdminElection;