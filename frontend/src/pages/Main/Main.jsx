import React from 'react';
import {Route, Routes} from 'react-router-dom';
import UserElections from './UserElections';
import UserSettings from './UserSettings';

const Main = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<UserElections />} />
            <Route path='/settings' element={<UserSettings />} />
        </Routes>
    </div>
  );
}

export default Main;
