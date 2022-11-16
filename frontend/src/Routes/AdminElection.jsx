import React, {useEffect} from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from '../api/axios';
import {Route, Routes} from 'react-router-dom';
import Panel from '../components/Reusable/Panel';
import ElectionTitle from '../components/Reusable/ElectionTitle';
import Dashboard from '../pages/Election/Dashboard';
import Moderators from '../pages/Election/Moderators';
import Parties from '../pages/Election/Parties';
import Candidates from '../pages/Election/Candidates';
import Voters from '../pages/Election/Voters';
import Settings from '../pages/Election/Settings';
import Launch from '../pages/Election/Launch';
import Applicants from '../pages/Election/Applicants';
import { useSelector, useDispatch } from 'react-redux';
import { viewElection } from '../redux/election';

const AdminElection = ({socket}) => {

    const election = useSelector((state) => state.election.value);
    const dispatch = useDispatch();

    const {data} = useQuery([], async () => {
        return axios.get(`election/${localStorage.id}/${election.id}`, {
                    headers: {
                      Authorization: `bearer ${localStorage.token}`
                    }
                  }).then((res) => res.data.data);
    })

    useEffect(() => {
      dispatch(viewElection({
        title: data?.title,
        startTime: data?.start_time,
        endTime: data?.end_time,
        code: data?.code
      }));
    }, [data, dispatch]);

  return (
    <div>
      <Panel admin={true} />
      <ElectionTitle />
      <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/moderators' element={<Moderators socket={socket} />} />
          <Route path='/parties' element={<Parties />} />
          <Route path='/candidates' element={<Candidates />} />
          <Route path='/voters' element={<Voters admin={true} />} />
          <Route path='/applicants' element={<Applicants admin={true} />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/launch' element={<Launch />} />
      </Routes>
    </div>
  );
}

export default AdminElection;
