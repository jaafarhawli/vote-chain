import './App.css';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Landing from './pages/Landing/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Main from './pages/Main/Main';


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
				</Routes>
    	</BrowserRouter>
	</QueryClientProvider>
  );
}

export default App;
