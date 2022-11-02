import React from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from '../../api/axios';
import {Route, Routes} from 'react-router-dom';
import AdminPanel from '../../components/AdminPanel';
import AdminTitle from '../../components/AdminTitle';
import AdminDashboard from './AdminDashboard';

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

  return (
    <div>
      <AdminPanel />
      <AdminTitle />
      <Routes>
          <Route path='/dashboard' element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default AdminElection;
