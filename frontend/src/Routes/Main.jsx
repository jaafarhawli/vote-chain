import React, { useState,useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import AdminElection from './AdminElection';
import ModeratorElections from '../pages/Main/ModeratorElections';
import UserElections from '../pages/Main/UserElections';
import UserSettings from '../pages/Main/UserSettings';
import ModeratorElection from './ModeratorElection';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Main = ({socket}) => {

  const [notification, setNotification] = useState(false);
  const [message, setMessage] = useState('');

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
            <Route path='/' element={<UserElections />} />
            <Route path='/moderate' element={<ModeratorElections />} />
            <Route path='/settings' element={<UserSettings socket={socket} />} />
            <Route path='/admin/election/*' element={<AdminElection socket={socket} />} />
            <Route path='/moderator/election/*' element={<ModeratorElection />} />
        </Routes>
        <ToastContainer autoClose={4000} hideProgressBar={true} position="top-right" limit={1} />
    </div>
  );
}

export default Main;
