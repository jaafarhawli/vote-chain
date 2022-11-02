import React from 'react';
import {Route, Routes} from 'react-router-dom';
import AdminElection from '../Admin Election/AdminElection';
import ModeratorElections from './ModeratorElections';
import UserElections from './UserElections';
import UserSettings from './UserSettings';

const Main = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<UserElections />} />
            <Route path='/moderator' element={<ModeratorElections />} />
            <Route path='/settings' element={<UserSettings />} />
            <Route path='/admin/election/*' element={<AdminElection />} />
        </Routes>
    </div>
  );
}

export default Main;
