import React from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from '../../api/axios';

const AdminParties = () => {

    const {data} = useQuery([], async () => {
        return axios.get(`user/parties/${localStorage.election_id}`, {
                    headers: {
                      Authorization: `bearer ${localStorage.token}`
                    }
                  }).then((res) => res.data);
    })

  return (
    <div>
      
    </div>
  );
}

export default AdminParties;
