import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Panel from '../components/Complex/Panel';
import ElectionTitle from '../components/Complex/ElectionTitle';
import Dashboard from '../pages/Election/Dashboard';
import Moderators from '../pages/Election/Moderators';
import Parties from '../pages/Election/Parties';
import Candidates from '../pages/Election/Candidates';
import Voters from '../pages/Election/Voters';
import Settings from '../pages/Election/Settings';
import Launch from '../pages/Election/Launch';
import Applicants from '../pages/Election/Applicants';

const AdminElection = ({socket}) => {

  return (
    <div>
      <Panel admin={true} />
      <ElectionTitle />
      <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/moderators' element={<Moderators socket={socket} />} />
          <Route path='/parties' element={<Parties />} />
          <Route path='/candidates' element={<Candidates />} />
          <Route path='/voters' element={<Voters admin={true} />} />
          <Route path='/applicants' element={<Applicants admin={true} />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/launch' element={<Launch />} />
      </Routes>
    </div>
  );
}

export default AdminElection;
