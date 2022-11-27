import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Panel from '../components/Complex/Panel';
import ElectionTitle from '../components/Complex/ElectionTitle';
import Dashboard from '../pages/Election/Dashboard';
import Voters from '../pages/Election/Voters';
import Applicants from '../pages/Election/Applicants';

const ModeratorElection = () => {

  return (
    <div>
      <Panel />
      <ElectionTitle />
      <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/voters' element={<Voters />} />
          <Route path='/applicants' element={<Applicants />} />
      </Routes>
    </div>
  );
}

export default ModeratorElection;
