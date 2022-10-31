import React from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import MainHeader from '../../components/MainHeader';

const UserElections = () => {

  const navigate = useNavigate();

  const {data: admin_elections} = useQuery(["admin"], async () => {
    return axios.get(`user/elections/${localStorage.id}`, {
                headers: {
                  Authorization: `bearer ${localStorage.token}`
                }
              }).then((res) => res.data);
})
  
const {data: moderator_elections} = useQuery(["moderator"], async () => {
    return axios.get(`user/elections/moderator/${localStorage.id}`, {
                headers: {
                  Authorization: `bearer ${localStorage.token}`
                }
              }).then((res) => res.data);
})

if(admin_elections?.length===0 && moderator_elections?.length===0) 
return (
    <div>
        <MainHeader />
        <div className='flex flex-col w-full text-center items-center gap-1 mt-20'>
            <h1 className='text-[24px] font-semibold text-black-200'>No Elections</h1>
            <p className='w-[220px]'>You don’t have any elections, create one now!</p>
            <button className='mt-6'>Create a new election</button>
        </div>
    </div>
)

  return (
    <div>
      <MainHeader />
      
    </div>
  );
}

export default UserElections;



