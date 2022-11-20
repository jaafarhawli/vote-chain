import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Panel from '../components/Reusable/Panel';
import ElectionTitle from '../components/Reusable/ElectionTitle';
import Dashboard from '../pages/Election/Dashboard';
import Voters from '../pages/Election/Voters';

const ModeratorElection = () => {

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
