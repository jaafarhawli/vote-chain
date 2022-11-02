import React from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from '../../api/axios';
import AddButton from '../../components/AddButton';
import {AiOutlineSearch} from 'react-icons/ai';

const AdminModerators = () => {


    
const {data} = useQuery(["moderators"], async () => {
        return axios.get(`user/moderators/${localStorage.election_id}`, {
                    headers: {
                      Authorization: `bearer ${localStorage.token}`
                    }
                  }).then((res) => res.data);
    })

    

  return (
    <div className='pl-[330px] pt-[150px] pr-6'>
        <div className='flex justify-between items-center w-full'>
          <h1 className='text-[28px] font-bold'>Moderators</h1>
          <AddButton text={"Add Moderator"} />
        </div>
        <div className='flex gap-2 items-center mt-4'>
            <input type="text" className='border-2 border-black-200 w-1/3 rounded-md' placeholder='Search moderator by email' />
            <AiOutlineSearch className='text-black-200 p-2 border-black-200 border-2 w-[40px] h-[40px] rounded-lg' />
        </div>
        <table className='mt-8'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                
                
            </tbody>
        </table>
    </div>
  );
}

export default AdminModerators;
