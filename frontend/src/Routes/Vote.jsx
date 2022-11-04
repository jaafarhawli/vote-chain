import React from 'react';
import {Route, Routes} from 'react-router-dom';
import VoteLanding from '../pages/Vote/VoteLanding';
import VoteLogin from '../pages/Vote/VoteLogin';

const Vote = () => {
  return (
    <div>
      <Routes>
            <Route path='/' element={<VoteLanding />} />         
            <Route path='/login' element={<VoteLogin />} />         
      </Routes>
    </div>
  );
}

export default Vote;
