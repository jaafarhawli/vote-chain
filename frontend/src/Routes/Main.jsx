import React from 'react';
import {Route, Routes} from 'react-router-dom';
import AdminElection from './AdminElection';
import ModeratorElections from '../pages/Main/ModeratorElections';
import UserElections from '../pages/Main/UserElections';
import UserSettings from '../pages/Main/UserSettings';
import ModeratorElection from './ModeratorElection';

const Main = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<UserElections />} />
            <Route path='/moderator' element={<ModeratorElections />} />
            <Route path='/settings' element={<UserSettings />} />
            <Route path='/admin/election/*' element={<AdminElection />} />
            <Route path='/moderator/election/*' element={<ModeratorElection />} />
        </Routes>
    </div>
  );
}

export default Main;
