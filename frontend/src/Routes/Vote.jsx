import React from 'react';
import {Route, Routes} from 'react-router-dom';
import VoteLanding from '../pages/Vote/VoteLanding';
import VoteLogin from '../pages/Vote/VoteLogin';
import VoteMain from '../pages/Vote/VoteMain';
import VoteSelect from '../pages/Vote/VoteSelect';
import VoteResults from '../pages/Vote/VoteResults';
import {ProtectedVoterRoutes} from './ProtectedRoutes';

const Vote = () => {
  return (
    <div>
      <Routes>
            <Route path='/' element={<VoteLanding />} />         
            <Route path='/login' element={<VoteLogin />} />  
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
