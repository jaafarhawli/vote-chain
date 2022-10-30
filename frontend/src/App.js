import './App.css';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {

  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
    	<BrowserRouter>
				<Routes>
					<Route path='/' element={<Landing />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					{/* <Route path='/main/*' element={<MainPage />} /> */}
				</Routes>
    	</BrowserRouter>
	</QueryClientProvider>
  );
}

export default App;
