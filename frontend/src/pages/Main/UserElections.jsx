import React from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import MainHeader from '../../components/MainHeader';

const UserElections = () => {

  const navigate = useNavigate();

  const {data} = useQuery(["admin"], async () => {
    return axios.get(`user/elections/${localStorage.id}`, {
                headers: {
                  Authorization: `bearer ${localStorage.token}`
                }
              }).then((res) => res.data);
})



  return (
    <div>
      <MainHeader />
      
    </div>
  );
}

export default UserElections;



