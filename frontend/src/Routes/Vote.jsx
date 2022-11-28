import React from 'react';
import {Route, Routes} from 'react-router-dom';
import { VoteLanding, VoteMain, VoteResults, VoteSelect} from '../pages/Vote';
import {ProtectedVoterRoutes} from './ProtectedRoutes';
import Auth from '../pages/Auth/Auth';

const Vote = () => {
  return (
    <div>
      <Routes>
            <Route path='/' element={<VoteLanding />} />         
            <Route path='/login' element={<Auth voterLogin={true} />} />  
            <Route element={<ProtectedVoterRoutes />}>     
              <Route path='/main' element={<VoteMain />} />         
              <Route path='/main/select' element={<VoteSelect />} />         
              <Route path='/main/results' element={<VoteResults />} /> 
            </Route>          
      </Routes>
    </div>
  );
}

export default Vote;
