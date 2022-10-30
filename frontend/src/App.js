import './App.css';
import Landing from './pages/Landing Page/Landing';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (

    	<BrowserRouter>
				<Routes>
					<Route path='/' element={<Navigate to={<Landing />} />} />
			
				</Routes>
    	</BrowserRouter>

  );
}

export default App;
