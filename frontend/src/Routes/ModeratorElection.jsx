import React, {useEffect} from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from '../api/axios';
import {Route, Routes} from 'react-router-dom';
import Panel from '../components/Reusable/Panel';
import ElectionTitle from '../components/Reusable/ElectionTitle';
import Dashboard from '../pages/Election/Dashboard';
import Voters from '../pages/Election/Voters';
import { useSelector, useDispatch } from 'react-redux';
import { viewElection } from '../redux/election';


const ModeratorElection = () => {

  const election = useSelector((state) => state.election.value);
    const dispatch = useDispatch();

    const {data} = useQuery([], async () => {
        return axios.get(`election/moderator/${localStorage.id}/${election.id}`, {
                    headers: {
                      Authorization: `bearer ${localStorage.token}`
                    }
                  }).then((res) => res.data.data);
    })

    useEffect(() => {
      dispatch(viewElection({
        id: data?._id,
        title: data?.title,
        startTime: data?.start_time,
        endTime: data?.end_time,
        code: data?.code,
        launched: data?.launched,
        description: data?.description,
        address: data?.contract_address
      }));
    }, [data, dispatch]);

  return (
    <div>
      <Panel />
      <ElectionTitle />
      <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/voters' element={<Voters />} />
      </Routes>
    </div>
  );
}

export default ModeratorElection;
