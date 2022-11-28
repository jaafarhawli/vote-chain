import React from 'react';
import Panel from '../components/Complex/Panel';
import ElectionTitle from '../components/Complex/ElectionTitle';
import {Route, Routes} from 'react-router-dom';
import {Dashboard, Voters, Applicants} from '../pages/Election';

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
