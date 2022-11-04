import React from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from '../../api/axios';
import EmptyState from '../../components/Reusable/EmptyState';

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
    {data?.length===0 ?
    <div className='pl-[330px] pt-[150px] pr-6'>
        <h1 className='text-[28px] font-bold'>Voters</h1>
        <EmptyState title={'No Voters'} button={'Add voter'}>You don’t have any voters, add one now!</EmptyState>
    </div>
    : null
    }     
    </>
  );
}

export default AdminVoters;
