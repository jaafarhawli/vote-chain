import React from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from '../../api/axios';

const AdminVoters = () => {

    const {data} = useQuery([], async () => {
        return axios.get(`user/voters/${localStorage.election_id}`, {
                    headers: {
                      Authorization: `bearer ${localStorage.token}`
                    }
                  }).then((res) => res.data);
    })


  return (
    <>
    </>
  );
}

export default AdminVoters;
