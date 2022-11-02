import React from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from '../../api/axios';
import AddButton from '../../components/AddButton';

const AdminParties = () => {

    const {data} = useQuery([], async () => {
        return axios.get(`user/parties/${localStorage.election_id}`, {
                    headers: {
                      Authorization: `bearer ${localStorage.token}`
                    }
                  }).then((res) => res.data);
    })

    if(data?.length === 0)
    return (
        <>
        <div className='pl-[330px] pt-[150px] pr-6'>
            <h1 className='text-[28px] font-bold'>Parties</h1>
            <div className='flex flex-col w-full items-center gap-4 mt-[150px]'>
                <div className='text-center'>
                    <h2 className='text-[24px] font-semibold text-black-200'>No Parties</h2>
                    <p className='text-[18px] w-64 mt-1'>You don’t have any party, add one now!</p>
                </div>
                <AddButton text={"Add party"} />
            </div>
        </div>
        </>
    );


  return (
    <div>
      
    </div>
  );
}

export default AdminParties;
