import React, {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from '../../api/axios';
import EmptyState from '../../components/Reusable/EmptyState';
import Button from '../../components/Reusable/Button';
import Table from '../../components/Reusable/Table';

const AdminVoters = () => {

    const [search, setSearch] = useState('');

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
    : 
    <>
    <div className='pl-[330px] pt-[150px] pr-6'>
        <div className='flex justify-between items-center w-full'>
          <h1 className='text-[28px] font-bold'>Parties</h1>
          <Button add={true}>Add Party</Button>
        </div>
        <input type="search" className='border-2 border-[#dddddd] w-1/3 rounded-md mt-4' placeholder='Search moderator by email' onChange={e => setSearch(e.target.value)} />
        <Table data={data} voter={true} />
    </div>
    </>
    }     
    </>
  );
}

export default AdminVoters;
