import React, {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import axios from '../../api/axios';
import AddButton from '../../components/AddButton';
import {HiOutlineXMark} from 'react-icons/hi2';

const AdminParties = () => {

    const [search, setSearch] = useState('');

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
    <>
    <div className='pl-[330px] pt-[150px] pr-6'>
        <div className='flex justify-between items-center w-full'>
          <h1 className='text-[28px] font-bold'>Parties</h1>
          <AddButton text={"Add Moderator"} />
        </div>
            <input type="search" className='border-2 border-[#dddddd] w-1/3 rounded-md mt-4' placeholder='Search moderator by email' onChange={e => setSearch(e.target.value)} />
        <table className='mt-8'>
            <thead>
                <tr>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
            {data?.map((party) => (
                <tr className='relative' key={party.name}>
                    <td>{party.name}</td>
                    <HiOutlineXMark className='absolute right-2 top-2 text-[25px] hover:text-red duration-150' />
                </tr>
     ))}
                
            </tbody>
        </table>
    </div>
    </>
  );
}

export default AdminParties;
