import React, { useState,useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import AdminElection from './AdminElection';
import { ModeratorElections, UserElections, UserSettings } from '../pages/Main';
import ModeratorElection from './ModeratorElection';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ProtectedRoutes} from './ProtectedRoutes';

const Main = ({socket}) => {

  const [notification, setNotification] = useState(false);
  const [message, setMessage] = useState('');

  // Notify the user when he's requested to be a moderator to another election
  socket.on('getNotification', (sender_email, election_title) => {
    setMessage(`${sender_email} wants to add you as a moderator to his election ${election_title}`);
    setNotification(true);
  });

  useEffect(() => {
    if(notification === true) {
    toast(message);
    setNotification(false); 
    }
  }, [message, notification]);

  return (
    <div>
        <Routes>
          <Route element={<ProtectedRoutes socket={socket} />}>
            <Route path='/' element={<UserElections />} />
            <Route path='/moderate' element={<ModeratorElections />} />
            <Route path='/settings' element={<UserSettings socket={socket} />} />
            <Route path='/admin/election/*' element={<AdminElection socket={socket} />} />
            <Route path='/moderator/election/*' element={<ModeratorElection />} />
          </Route>
        </Routes>
    </div>
  );
}

export default Main;
