import './App.css';
import Landing from './pages/Landing Page/Landing';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {

  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
    	<BrowserRouter>
				<Routes>
					<Route path='/' element={<Navigate to={<Landing />} />} />
					{/* <Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/main/*' element={<MainPage />} /> */}
				</Routes>
    	</BrowserRouter>
	</QueryClientProvider>
  );
}

export default App;
