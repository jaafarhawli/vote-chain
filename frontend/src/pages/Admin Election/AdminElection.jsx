import React from 'react';
import {Route, Routes} from 'react-router-dom';
import AdminPanel from '../../components/AdminPanel';
import AdminDashboard from './AdminDashboard';

const AdminElection = () => {
  return (
    <div>
      <AdminPanel />
      <Routes>
          <Route path='/dashboard' element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default AdminElection;
