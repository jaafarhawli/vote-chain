import React, { useEffect} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import {Main, Vote} from './Routes';
// eslint-disable-next-line
import { Chart as ChartJS } from 'chart.js/auto';
import EmailVerification from './pages/Verification/EmailVerification';
import { init } from './Web3Client';
import Survey from './pages/Survey/Survey';
import socketIO from "socket.io-client";
import { useSelector } from 'react-redux';
const socket = socketIO.connect("http://localhost:8000")

function App() {

	const user = useSelector((state) => state.user.value);

	useEffect(() => {
	  init();  
	}, []);
	
	useEffect(() => {
		if(user.email)
		socket.emit('newUser', user.email);
	}, [user.email]);

  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
    	<BrowserRouter>
				<Routes>
					<Route path='/' element={<Landing />} />
					<Route path='/login' element={<Login socket={socket} />} />
					<Route path='/register' element={<Register />} />
					<Route path='/vote/*' element={<Vote />} />
					<Route path='/survey/:code' element={<Survey />} />
					<Route path='api/email/verify/:id/:token' element={<EmailVerification />} />			
					<Route path='/main/*' element={<Main socket={socket} />} />					
				</Routes>
    	</BrowserRouter>
	</QueryClientProvider>
  );
}

export default App;
