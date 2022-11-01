import React from 'react';
import {Route, Routes} from 'react-router-dom';
import AdminDashboard from './AdminDashboard';

const AdminElection = () => {
  return (
    <div>
      <Routes>
          <Route path='/' element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default AdminElection;
