import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Panel from '../components/Complex/Panel';
import ElectionTitle from '../components/Complex/ElectionTitle';
import {Dashboard, Moderators, Parties, Candidates, Voters, Applicants, Settings, Launch} from '../pages/Election';

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
