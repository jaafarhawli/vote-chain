import React, { useEffect} from 'react';
import './App.css';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Main from './Routes/Main';
import Vote from './Routes/Vote';
// eslint-disable-next-line
import { Chart as ChartJS } from 'chart.js/auto';
import EmailVerification from './pages/Verification/EmailVerification';
import { init } from './Web3Client';
import Survey from './pages/Survey/Survey';
import socketIO from "socket.io-client";
const socket = socketIO.connect("http://localhost:8000")

function App() {

	useEffect(() => {
	  init();  
	}, []);
	
	useEffect(() => {
		socket.emit('newUser', localStorage.email);
	}, []);

  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
    	<BrowserRouter>
				<Routes>
					<Route path='/' element={<Landing />} />
					<Route path='/login' element={<Login socket={socket} />} />
					<Route path='/register' element={<Register />} />
					<Route path='/main/*' element={<Main socket={socket} />} />
					<Route path='/vote/*' element={<Vote />} />
					<Route path='/survey/:code' element={<Survey />} />
					<Route path='/email/verify/:id/:token' element={<EmailVerification />} />
				</Routes>
    	</BrowserRouter>
	</QueryClientProvider>
  );
}

export default App;
