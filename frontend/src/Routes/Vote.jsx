import React from 'react';
import {Route, Routes} from 'react-router-dom';
import VoteLanding from '../pages/Vote/VoteLanding';

const Vote = () => {
  return (
    <div>
      <Routes>
            <Route path='/' element={<VoteLanding />} />         
      </Routes>
    </div>
  );
}

export default Vote;
