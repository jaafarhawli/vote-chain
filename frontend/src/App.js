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


function App() {

  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
    	<BrowserRouter>
				<Routes>
					<Route path='/' element={<Landing />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/main/*' element={<Main />} />
					<Route path='/vote/*' element={<Vote />} />
					<Route path='/email/verify/:id/:token' element={<EmailVerification />} />
				</Routes>
    	</BrowserRouter>
	</QueryClientProvider>
  );
}

export default App;
