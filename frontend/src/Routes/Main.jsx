import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import AdminElection from './AdminElection';
import ModeratorElections from '../pages/Main/ModeratorElections';
import UserElections from '../pages/Main/UserElections';
import UserSettings from '../pages/Main/UserSettings';
import ModeratorElection from './ModeratorElection';

const Main = ({socket}) => {

  useEffect(() => {
    socket.on('getNotification', () => {
      console.log('received');
    });
  }, []);

  return (
    <div>
        <Routes>
            <Route path='/' element={<UserElections />} />
            <Route path='/moderate' element={<ModeratorElections />} />
            <Route path='/settings' element={<UserSettings socket={socket} />} />
            <Route path='/admin/election/*' element={<AdminElection socket={socket} />} />
            <Route path='/moderator/election/*' element={<ModeratorElection />} />
        </Routes>
    </div>
  );
}

export default Main;
